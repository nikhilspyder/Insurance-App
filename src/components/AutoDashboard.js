import React, { useEffect, useState } from 'react';
import './HealthDashboard.css'; // Import CSS file for styling
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import userImage from './userlogo.png';
import InsauraceImage from './carlogo.png';
import MuiAlert from '@mui/material/Alert'; // Import Alert component from Material-UI
import { Button, TextField, Snackbar } from '@mui/material'; // Import Material-UI components

const AutoDashboard = () => {
    const [autoInsurances, setAutoInsurances] = useState([]);
    const [autoInsuranceQuote, setAutoInsuranceQuote] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Number of items per page
    const [selectedInsurance, setSelectedInsurance] = useState(null);
    const [openRecommendDialog, setOpenRecommendDialog] = useState(false);
    const [userQuery, setUserQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [requestId, setRequestId] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const handleOpenRecommendDialog = () => {
        setOpenRecommendDialog(true);
    };

    const handleCloseRecommendDialog = () => {
        setOpenRecommendDialog(false);
    };

    const handleClosePopup = () => {
        setSelectedInsurance(null);
    };

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/autoInsurance');
            const data = await response.json();
            setAutoInsurances(data);
        } catch (error) {
            console.error('Error fetching auto insurance data:', error);
        }
    };

    const generateQuery = (insuranceData) => {
        // Generate the user query based on form data
        const query = `Based on the data below:
        Age: ${insuranceData.age},
        Gender: ${insuranceData.gender},
        Smoker: ${insuranceData.smoker},
        Annual Income: ${insuranceData.annualIncome},
        Marriage Status: ${insuranceData.marriageStatus},
        Zip Code: ${insuranceData.zipCode},
        Vehicle Make: ${insuranceData.vehicleMake},
        Vehicle Model: ${insuranceData.vehicleModel},
        Vehicle Year: ${insuranceData.vehicleYear},
        Vehicle Value: ${insuranceData.vehicleValue},
        Coverage Amount: ${insuranceData.coverageAmount},
        Vehicle Type: ${insuranceData.vehicleType},
        Miles Driven: ${insuranceData.milesDriven}.
        Prepare 5 auto insurance quotes to display it to the user. Strictly return these statements as a JSON Object with the structure:
        [
            {
                "type": "auto_insurance_quote",
                "Name": "Example Auto Insurance Company",
                "Address": "123 Main Street, Anytown, USA",
                "Description": "Comprehensive auto insurance coverage",
                "Deductible": "Deductible amount",
                "Coverage Type": "Coverage type (e.g., liability, collision)",
                "Roadside Assistance": "Yes/No",
                "Rental Car Reimbursement": "Yes/No",
                "Total Coverage": "Total coverage amount",
                "Total Premium": "Total premium amount",
                "Monthly Premium Payment": "Monthly premium amount"
            }
        ].
        Do not return any non-JSON text or numbering.`;
        setUserQuery(query);
        return query;
    };

    const handlePrepareQuotes = () => {
        fetchOpenAiResponse();
    };

    const fetchOpenAiResponse = async () => {
        setIsLoading(true); // Set loading state to true
        const prompt = generateQuery(selectedInsurance);
        const apiKey = 'Bearer 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';
        const apiUrl = 'https://api.openai.com/v1/completions';
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `${apiKey}`
        };
        const data = {
            model: 'gpt-3.5-turbo-instruct',
            prompt: prompt,
            max_tokens: 1800,
            temperature: 0.7,
            top_p: 1
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Failed to fetch OpenAI response');
            }

            const responseData = await response.json();

            if (responseData && responseData.choices && responseData.choices.length > 0) {
                const text = responseData.choices[0].text;
                if (text) {
                    const parsedJson = tryParseJson(text);
                    setAutoInsuranceQuote(parsedJson);
                    console.log(parsedJson);
                }
            }
        } catch (error) {
            console.error('Error fetching OpenAI response:', error);
        } finally {
            setIsLoading(false); // Set loading state to false after response
        }
    };

    const tryParseJson = (text) => {
        try {
            return JSON.parse(text);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return null;
        }
    };
    

    const handleView = async (requestID) => {
        try {
            setRequestId(requestID);
            const response = await fetch(`http://localhost:8000/api/autoInsurance/status/${requestID}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: 'Reviewed' })
            });

            if (response.ok) {
                const updatedInsurances = autoInsurances.map(insurance => {
                    if (insurance.requestID === requestID) {
                        return { ...insurance, status: 'Reviewed' };
                    }
                    return insurance;
                });
                setAutoInsurances(updatedInsurances);

                const selected = autoInsurances.find(insurance => insurance.requestID === requestID);
                setSelectedInsurance(selected);

                handleOpenRecommendDialog();
            }
        } catch (error) {
            console.error('Error updating auto insurance request:', error);
        }
    };

    const updateStatusForQuote = async (requestID) => {
        try {
            const response = await fetch(`http://localhost:8000/api/autoInsurance/status/${requestId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: 'Quotes Ready' })
            });

            if (response.ok) {
                const updatedInsurances = autoInsurances.map(insurance => {
                    if (insurance.requestID === requestID) {
                        return { ...insurance, status: 'Quotes Ready' };
                    }
                    return insurance;
                });
                setAutoInsurances(updatedInsurances);
            }
        } catch (error) {
            console.error('Error updating auto insurance request:', error);
        }
    };


    const handleSubmitQuotes = async () => {
        try {
            const checkedQuotes = autoInsuranceQuote.filter(quote => quote.checked);
            const response = await fetch(`http://localhost:8000/api/autoInsurance/quotes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    requestID: requestId,
                    quotes: checkedQuotes
                })
            });
    
            if (response.ok) {
                console.log('Quotes submitted successfully');
                updateStatusForQuote(requestId);
                setSuccessMessage('Quotes submitted successful!');
            } else {
                console.error('Failed to submit quotes');
            }
        } catch (error) {
            console.error('Error submitting quotes:', error);
        }
    };
    
    // const handleSubmitQuotes = async () => {
    //     try {
    //         const response = await fetch(`http://localhost:8000/api/autoInsurance/quotes`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 requestID: requestId,
    //                 quotes: selectedInsurance.quotes // Assuming the selected insurance object has a "quotes" field containing the generated quotes
    //             })
    //         });

    //         if (response.ok) {
    //             console.log('Quotes submitted successfully');
    //             updateStatusForQuote(requestId);
    //         } else {
    //             console.error('Failed to submit quotes');
    //         }
    //     } catch (error) {
    //         console.error('Error submitting quotes:', error);
    //     }
    // };

    const handleDownloadDocument = (documentUrl) => {
        window.open(`http://localhost:8000/${documentUrl}`, '_blank');
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = autoInsurances.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSuccessMessage('');
    };
    return (
        <div className="auto-insurance-list">
            <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success">
                    {successMessage}
                </MuiAlert>
            </Snackbar>
      <br></br>
      <h2 style={{color:'#ff6961',boxShadow:'10px 50px 30px 10px rgba(0, 0, 0, 0.4)'}}>AutoMobile Insurance List</h2>
      <br></br>
        <hr></hr>
        <br></br>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Request ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Vehicle Make</th>
                        <th>Vehicle Model</th>
                        <th>Vehicle Year</th>
                        <th>Vehicle Value</th>
                        <th>MilesDriven</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map(insurance => (
                        <tr key={insurance.requestID}>
                            <td>{insurance.uid}</td>
                            <td>{insurance.requestID}</td>
                            <td>{insurance.firstName}</td>
                            <td>{insurance.lastName}</td>
                            <td>{insurance.email}</td>
                            <td>{insurance.phone}</td>
                            <td>{insurance.age}</td>
                            <td>{insurance.gender}</td>
                            <td>{insurance.vehicleMake}</td>
                            <td>{insurance.vehicleModel}</td>
                            <td>{insurance.vehicleYear}</td>
                            <td>{insurance.vehicleValue}</td>
                            <td>{insurance.milesDriven}</td>
                            <td>
                                <button style={{ backgroundColor: 'black', color: 'white', transition: 'color 0.3s ease' }} onMouseOver={(e) => e.target.style.color = '#ff6961'} onMouseOut={(e) => e.target.style.color = 'white'} onClick={() => handleView(insurance.requestID)}>View</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ul className="pagination">
                {Array.from({ length: Math.ceil(autoInsurances.length / itemsPerPage) }, (_, index) => (
                    <li key={index}>
                        <button style={{ backgroundColor: 'black', color: 'white', transition: 'color 0.3s ease' }} onMouseOver={(e) => e.target.style.color = '#ff6961'} onMouseOut={(e) => e.target.style.color = 'white'} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
                            {index + 1}
                        </button>
                    </li>
                ))}
            </ul>
            {selectedInsurance &&
                <Dialog fullWidth maxWidth="lg" open={openRecommendDialog} onClose={handleCloseRecommendDialog}>
                    <DialogTitle>Insurance Details</DialogTitle>
                    <DialogContent style={{ width: '100%', overflowY: 'auto' }}>
                        <div className="popup">
                        <div className="popup-content">
                        <img style={{marginLeft:'100px'}} src={userImage} alt="User" className="user-image" width={500} />
    <div className="table">
        <div className="row">
            <p><strong>Request ID:</strong> {selectedInsurance.requestID}</p>
            <button
  style={{ backgroundColor: 'black', color: 'white', transition: 'color 0.3s ease' }}
  onMouseOver={(e) => e.target.style.color = '#ff6961'}
  onMouseOut={(e) => e.target.style.color = 'white'}
>
 
    Download ID
</button>

        </div>
        <div className="row">
            <p><strong>First Name:</strong> {selectedInsurance.firstName}</p>
            <p><strong>Last Name:</strong> {selectedInsurance.lastName}</p>
        </div>
        <div className="row">
            <p><strong>Email:</strong> {selectedInsurance.email}</p>
            <p><strong>Phone:</strong> {selectedInsurance.phone}</p>
        </div>
        <div className="row">
            <p><strong>Age:</strong> {selectedInsurance.age}</p>
            <p><strong>Gender:</strong> {selectedInsurance.gender}</p>
        </div>
        <div className="row">
            <p><strong>Vehicle Make:</strong> {selectedInsurance.vehicleMake}</p>
            <p><strong>Vehicle Model:</strong> {selectedInsurance.vehicleModel}</p>
        </div>
        <div className="row">
            <p><strong>Vehicle Year:</strong> {selectedInsurance.vehicleYear}</p>
            <p><strong>Vehicle Value:</strong> {selectedInsurance.vehicleValue}</p>
        </div>
        <div className="row">
            <p><strong>Miles Driven:</strong> {selectedInsurance.milesDriven}</p>
        </div>
    </div>
    <br />
    <button style={{ backgroundColor: 'black', color: 'white', transition: 'color 0.3s ease' }} onMouseOver={(e) => e.target.style.color = '#ff6961'}
                      onMouseOut={(e) => e.target.style.color = 'white'} onClick={handlePrepareQuotes}>Prepare Quotes</button><br />
    <button style={{ backgroundColor: 'black', color: 'white', transition: 'color 0.3s ease' }} onMouseOver={(e) => e.target.style.color = '#ff6961'}
                      onMouseOut={(e) => e.target.style.color = 'white'} onClick={handleClosePopup}>Close</button>
</div>

                        </div>
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <>
                                <hr></hr>
                                <br></br>
                                <div className="quotes-grid">
                                    {autoInsuranceQuote.map((quote, index) => (
                                        <div key={index} className="quote-item">
                                            <img style={{ marginLeft: '80px' }} src={InsauraceImage} alt="User" className="user-image1" width={100} />
                                            <p><strong>Name:</strong> {quote.Name}</p>
                                            <p><strong>Address:</strong> {quote.Address}</p>
                                            <p><strong>Description:</strong> {quote.Description}</p>
                                            <p><strong>Deductible:</strong> {quote.Deductible}</p> {/* Change fields accordingly */}
                                            <p><strong>Coverage Type:</strong> {quote['Coverage Type']}</p>
                                            <p><strong>Roadside Assistance:</strong> {quote['Roadside Assistance']}</p>
                                            <p><strong>Rental Car Reimbursement:</strong> {quote['Rental Car Reimbursement']}</p>
                                            <p><strong>Total Coverage:</strong> {quote['Total Coverage']}</p>
                                            <p><strong>Total Premium:</strong> {quote['Total Premium']}</p>
                                            <p><strong>Monthly Premium Payment:</strong> {quote['Monthly Premium Payment']}</p>
                                            <input
                                                type="checkbox"
                                                checked={quote.checked || false}
                                                onChange={(e) => {
                                                    const isChecked = e.target.checked;
                                                    setAutoInsuranceQuote((prevState) => {
                                                        const updatedQuotes = [...prevState];
                                                        updatedQuotes[index] = { ...quote, checked: isChecked };
                                                        return updatedQuotes;
                                                    });
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <button style={{ backgroundColor: 'black', color: 'white', transition: 'color 0.3s ease' }} onMouseOver={(e) => e.target.style.color = '#ff6961'}
                      onMouseOut={(e) => e.target.style.color = 'white'} onClick={handleSubmitQuotes}>Submit Quotes</button>
                                </div>
                            </>
                        )}
                    </DialogContent>
                </Dialog>
            }
        </div>
    );
    
};

export default AutoDashboard;
