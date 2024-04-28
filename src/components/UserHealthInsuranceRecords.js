import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserHealthInsuranceRecords = () => {
  const [healthInsurances, setHealthInsurances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve user information (uid) from session storage
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const { uid } = user;

      // Fetch health insurance records for the current user
      const fetchHealthInsurances = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/user/healthInsurance?uid=${uid}`);
          setHealthInsurances(response.data); // Assuming API response contains an array of records
          setLoading(false);
        } catch (error) {
          console.error('Error fetching health insurance records:', error);
          setLoading(false);
        }
      };

      fetchHealthInsurances();
    }
  }, []); // Empty dependency array means this effect runs once after initial render

  return (
    <div>
      <br></br>
      <br></br>
      <h2 style={{color:'#ff6961',boxShadow:'10px 50px 30px 10px rgba(0, 0, 0, 0.4)'}}>Health Insurance Requests</h2>
      <br></br>
        <hr></hr>
        <br></br>
      {loading ? (
        <p>Loading...</p>
      ) : healthInsurances.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Request ID</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>First Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Last Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Email</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Phone</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Age</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Gender</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Smoker</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Pre-Existing Conditions</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Coverage Amount</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Type</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {healthInsurances.map((insurance) => (
              <tr key={insurance._id} style={{ backgroundColor: '#fff', border: '1px solid #ddd' }}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{insurance.requestID}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{insurance.firstName}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{insurance.lastName}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{insurance.email}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{insurance.phone}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{insurance.age}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{insurance.gender}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{insurance.smoker}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{insurance.preExistingConditions}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{insurance.coverageAmount}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{insurance.type}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {insurance.status === 'Quotes Ready' ? (
                    <Link to={`/user/healthquotes/${insurance.requestID}`}>
                      <button style={{ backgroundColor: 'black', color: 'white', transition: 'color 0.3s ease' }}
  onMouseOver={(e) => e.target.style.color = '#ff6961'}
  onMouseOut={(e) => e.target.style.color = 'white'}>
                        View Quotes
                      </button>
                    </Link>
                  ) : (
                    <span>{insurance.status}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No health insurance records found.</p>
      )}
    </div>
  );
};

export default UserHealthInsuranceRecords;
