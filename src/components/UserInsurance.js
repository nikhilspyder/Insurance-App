import React, { useState, useEffect } from 'react';
import { Card, CardContent, CircularProgress, Typography } from '@material-ui/core';
import InsauraceImage from './done.png';
const UserInsurance = () => {
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
        fetch(`http://localhost:8000/api/insurance/user/${userUid}`)
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
                  <p><strong>Complimentary Health Checkup:</strong> {selectedInsurance.selectedQuote['Complimentary Health Checkup']}</p>
                  <p><strong>Cashless Hospitals:</strong> {selectedInsurance.selectedQuote['Cashless Hospitals']}</p>
                  <p><strong>Pre Hospitalization:</strong> {selectedInsurance.selectedQuote['Pre Hospitalization']}</p>
                  <p><strong>Hospitalization at Home:</strong> {selectedInsurance.selectedQuote['Hospitalization at Home']}</p>
                  <p><strong>Post Hospitalization:</strong> {selectedInsurance.selectedQuote['Post Hospitalization']}</p>
                  <p><strong>Pre-existing Disease Waiting Period:</strong> {selectedInsurance.selectedQuote['Pre-existing Disease Waiting Period']}</p>
                  <p><strong>Organ Donor Expenses:</strong> {selectedInsurance.selectedQuote['Organ Donor Expenses']}</p>
                  <p><strong>Specific Illness Waiting Period:</strong> {selectedInsurance.selectedQuote['Specific Illness Waiting Period']}</p>
                  <p><strong>Day Care Treatment:</strong> {selectedInsurance.selectedQuote['Day Care Treatment']}</p>
                  <p><strong>Unlimited Online Consultations:</strong> {selectedInsurance.selectedQuote['Unlimited Online Consultations']}</p>
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

export default UserInsurance;
