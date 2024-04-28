// import React, { useState,useEffect } from 'react';
// import axios from 'axios';
// import './HealthInsurance.css';

// const HealthInsurance = () => {
//   const [user, setUser] = useState(null);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     age: '',
//     gender: '',
//     smoker: false,
//     preExistingConditions: '',
//     coverageAmount: '',
//   });

//   useEffect(() => {
//     // Retrieve user info from session storage
//     const storedUser = sessionStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);
  
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };



//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Ensure user info is available
//       if (!user) {
//         throw new Error('User information not found in session storage.');
//       }

//       // Include user info and formData in the POST request
//       const requestBody = {
//         uid: user.uid,
//         usertype: user.usertype,
//         status:'Submitted',
//         type:'Health',
//         ...formData,
//       };

//       await axios.post('http://localhost:8000/api/healthInsurance', requestBody);
//       alert('Your request has been submitted!');

//       setFormData({
//         firstName: '',
//         lastName: '',
//         email: '',
//         phone: '',
//         age: '',
//         gender: '',
//         smoker: false,
//         preExistingConditions: '',
//         coverageAmount: '',
//       });
//     } catch (error) {
//       console.error('Error submitting health insurance request:', error);
//       // Handle error (display a message, etc.)
//     }
//   };


 

//   return (
//     <div className="health-insurance-container">
//         <h2>What is Health Insurance?</h2>
//       <section className="health-insurance-info">
//         <div>
//         <p>
//           A health insurance or medical insurance policy offers financial protection in case of medical emergencies
//           that may arise due to an accident or critical illness. You can either reimburse medical bills and hospital
//           expenses or avail of cashless claims via a health insurance plan. Additionally, you can claim tax benefits
//           under Section 80D of the Income Tax Act against your insurance payment.
//         </p>
//         <p>
//           Navi Health Insurance offers a comprehensive health insurance plan with a host of benefits. You can get
//           cashless claims settled in 20 minutes at 10,000+ cashless hospitals across India with Navi Health Insurance.
//           Other benefits include 100% coverage of hospital bills, no cap on hospital room rent, unlimited online
//           consultations, medical treatment at home, and more.
//         </p>
//         </div>
//         <img src={'logo192.png'} alt="Health Insurance" className="health-insurance-image" />
//       </section>



//         <div className="why-choose-us-container">
//         <div className="why-choose-us-item"> 
//           <img src={'logo192.png'} alt="Health Insurance" className="health-insurance-image" />
//         </div>
//         <div className="why-choose-us-item">
//         <section className="why-choose-us">
//         <h2>Why Choose Us for Health Insurance?</h2>
//         <ul>
//           <li>Comprehensive coverage options tailored to your needs</li>
//           <li>Competitive rates and affordable premiums</li>
//           <li>Excellent customer service and support</li>
//           <li>Quick and hassle-free claims processing</li>
//         </ul>
//       </section>
//         </div>
//       </div>

//       <div className="form-container">
//         <h2>Get Health Insurance Quotes</h2>
//         <form onSubmit={handleSubmit} className="insurance-form">
//           <div className="form-group">
//             <label htmlFor="firstName">First Name:</label>
//             <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
//           </div>
//           <div className="form-group">
//             <label htmlFor="lastName">Last Name:</label>
//             <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">Email:</label>
//             <input type="email" name="email" value={formData.email} onChange={handleChange} required />
//           </div>
//           <div className="form-group">
//             <label htmlFor="phone">Phone:</label>
//             <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
//           </div>
//           <div className="form-group">
//             <label htmlFor="age">Age:</label>
//             <input type="number" name="age" value={formData.age} onChange={handleChange} required />
//           </div>
//           <div className="form-group">
//             <label htmlFor="gender">Gender:</label>
//             <select name="gender" value={formData.gender} onChange={handleChange} required>
//               <option value="">Select</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="smoker">Smoker:</label>
//             <input type="checkbox" name="smoker" checked={formData.smoker} onChange={handleChange} />
//           </div>
//           <div className="form-group">
//             <label htmlFor="preExistingConditions">Pre-existing Conditions:</label>
//             <textarea name="preExistingConditions" value={formData.preExistingConditions} onChange={handleChange}></textarea>
//           </div>
//           <div className="form-group">
//             <label htmlFor="coverageAmount">Desired Coverage Amount:</label>
//             <input type="number" name="coverageAmount" value={formData.coverageAmount} onChange={handleChange} required />
//           </div>
//           <button type="submit">Get Quote</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default HealthInsurance;



import React, { useState,useEffect } from 'react';

import MuiAlert from '@mui/material/Alert'; // Import Alert component from Material-UI
import {  Snackbar } from '@mui/material'; // Import Material-UI components
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  // Label,
  Input, // Import Input component from @mui/material
} from '@mui/material';
import axios from 'axios';
import './HealthInsurance.css';

const HealthInsurance = () => {
    const [user, setUser] = useState(null);
    
  const [successMessage, setSuccessMessage] = useState('');
    useEffect(() => {
    // Retrieve user info from session storage
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    smoker: '',
    annualIncome:'',
    marriageStatus:'',
    zipCode:'',
    preExistingConditions: '',
    coverageAmount: '',
    idDocument: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestBody = new FormData();
      requestBody.append('uid', user.uid)
      requestBody.append('firstName', formData.firstName);
      requestBody.append('lastName', formData.lastName);
      requestBody.append('email', formData.email);
      requestBody.append('phone', formData.phone);
      requestBody.append('age', formData.age);
      requestBody.append('gender', formData.gender);
      requestBody.append('smoker', formData.smoker);
      requestBody.append('annualIncome', formData.annualIncome);
      requestBody.append('marriageStatus', formData.marriageStatus);
      requestBody.append('zipCode', formData.zipCode);
      requestBody.append('preExistingConditions', formData.preExistingConditions);
      requestBody.append('coverageAmount', formData.coverageAmount);
      requestBody.append('idDocument', formData.idDocument);

      await axios.post('http://localhost:8000/api/healthInsurance', requestBody, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessMessage('Your health insurance request has been submitted successfully!');

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        age: '',
        gender: '',
        smoker: '',
        preExistingConditions: '',
        coverageAmount: '',
        idDocument: null,
        annualIncome:'',
        marriageStatus:'',
        zipCode:'',
      });
    } catch (error) {
      setSuccessMessage('Your health insurance request has been submitted successfully!');
      console.error('Error submitting health insurance request:', error);
      // Handle error (display a message, etc.)
    }
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setSuccessMessage('');
};
  return (
    <div className="background-image1">
      <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success">
                    {successMessage}
                </MuiAlert>
            </Snackbar>
    <Container  maxWidth="md" sx={{ py: 4 }}>
      
      <div className="form-container2">
      <img src="healthlogo.png" alt="Logo" className="logo-img1" />
        <Typography variant="h4" gutterBottom>

          Get a Health Insurance Quote
        </Typography>
        <form onSubmit={handleSubmit} className="insurance-form">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Age"
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Pre-existing Conditions"
                name="preExistingConditions"
                value={formData.preExistingConditions}
                onChange={handleChange}
                fullWidth
                multiline
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Desired Coverage Amount"
                type="number"
                name="coverageAmount"
                value={formData.coverageAmount}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
  <TextField
    label="Smoker (Yes/No)"
    name="smoker"
    value={formData.smoker}
    onChange={handleChange}
    fullWidth
    required
  />
</Grid>
<Grid item xs={12} sm={6}>
  <TextField
    label="Annual Income"
    name="annualIncome"
    value={formData.annualIncome}
    onChange={handleChange}
    fullWidth
    required
  />
</Grid>
<Grid item xs={12} sm={6}>
  <TextField
    label="Marriage Status"
    name="marriageStatus"
    value={formData.marriageStatus}
    onChange={handleChange}
    fullWidth
    required
  />
</Grid>
<Grid item xs={12} sm={6}>
  <TextField
    label="Zip Code"
    name="zipCode"
    value={formData.zipCode}
    onChange={handleChange}
    fullWidth
    required
  />
</Grid>

            {/* <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel htmlFor="idDocument">
                  Upload ID Document
                </InputLabel>
                <Input
                  type="file"
                  name="idDocument"
                  onChange={handleChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  sx={{ marginBottom: '16px' }}
                />
              </FormControl>
            </Grid> */}
            {/* <Grid item xs={12}>
  <InputLabel htmlFor="idDocument" sx={{ marginBottom: '8px', display: 'block' }}>
    Upload ID Document (for age verification):
  </InputLabel>
  <Input
    type="file"
    id="idDocument"
    name="idDocument"
    onChange={handleChange}
    sx={{ marginBottom: '16px' }}
  />
</Grid> */}

<Grid item xs={12} sx={{ position: 'relative' }}>
  <InputLabel
    htmlFor="idDocument"
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      textAlign: 'center',
      marginBottom: '8px',
      marginTop: '8px',
    }}
  >
    Upload ID Document (for age verification):
  </InputLabel>
  <Input
    type="file"
    id="idDocument"
    name="idDocument"
    onChange={handleChange}
    sx={{ width: '100%', paddingTop: '24px' }}
  />
</Grid>
          </Grid>
          <button
  type="submit"
  style={{ backgroundColor: 'black', color: 'white', transition: 'color 0.3s ease' }}
  className="login-button"
  onMouseOver={(e) => e.target.style.color = '#ff6961'}
  onMouseOut={(e) => e.target.style.color = 'white'}
>
  Submit Request
</button>
        </form>
      </div>
      
    </Container>
    </div>
  );
};

export default HealthInsurance;
