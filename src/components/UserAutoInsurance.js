import React, { useState, useEffect } from 'react';
import { Card, CardContent, CircularProgress, Typography } from '@material-ui/core';
import InsauraceImage from './done.png';
const UserAutoInsurance = () => {
    const [selectedInsurance, setSelectedInsurance] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch user's UID from session storage
        const user = sessionStorage.getItem('user');
        const parsedUser = JSON.parse(user);
        const userUid = parsedUser.uid;
        if (!userUid) {
            setLoading(false);
            return;
        }

        // Fetch insurance data based on user UID
        fetch(`http://localhost:8000/api/insurance/auto/user/${userUid}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch user insurance');
                }
            })
            .then(data => {
                setSelectedInsurance(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching user insurance:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <div>
            <br></br>
      <br></br>
      <h2 style={{color:'#ff6961',boxShadow:'10px 50px 30px 10px rgba(0, 0, 0, 0.4)'}}>Selected Insurance</h2>
      <br></br>
        <hr></hr>
        <br></br>
        <div style={{marginLeft:'700px'}} className="quote-grid">
          {selectedInsurance && selectedInsurance.selectedQuote ? (
            <div className="cards-container">
              <h2></h2>
              <br></br>
              <br></br>
              <div className="insurance-details quote-item">
                <img src={InsauraceImage} alt="Logo" width={100} />
                <div>
                <p><strong>Name:</strong> {selectedInsurance.selectedQuote.Name}</p>
      <p><strong>Address:</strong> {selectedInsurance.selectedQuote.Address}</p>
      <p><strong>Description:</strong> {selectedInsurance.selectedQuote.Description}</p>
      <p><strong>Deductible:</strong> {selectedInsurance.selectedQuote.Deductible}</p>
      <p><strong>Coverage Type:</strong> {selectedInsurance.selectedQuote['Coverage Type']}</p>
      <p><strong>Roadside Assistance:</strong> {selectedInsurance.selectedQuote['Roadside Assistance']}</p>
      <p><strong>Rental Car Reimbursement:</strong> {selectedInsurance.selectedQuote['Rental Car Reimbursement']}</p>
      <p><strong>Total Coverage:</strong> {selectedInsurance.selectedQuote['Total Coverage']}</p>
      <p><strong>Total Premium:</strong> {selectedInsurance.selectedQuote['Total Premium']}</p>
      <p><strong>Monthly Premium Payment:</strong> {selectedInsurance.selectedQuote['Monthly Premium Payment']}</p>
                </div>
              </div>
            </div>
          ) : (
            <Typography variant="body1" style={{ marginTop: 20 }}>No insurance selected</Typography>
          )}
        </div>
        </div>
      );
      
};

export default UserAutoInsurance;
