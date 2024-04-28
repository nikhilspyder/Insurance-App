import React, { useEffect, useState } from 'react';
import './Home.css'; // Import your CSS file for styling
import mainImg from './mainImg.jpg';
import {Link} from 'react-router-dom'
import logo from './logo2.png'
import center from './dealdone.jpg'

function Thankyou() {
    const buttonStyle = {
        // Your button styles here
        padding: '10px',
        margin: '5px',
        borderRadius: '5px',
        display: 'inline-block',
        backgroundColor: 'black', 
        color: 'white', 
        transition: 'color 0.3s ease'
      };
    const containerStyle = {
        maxWidth: '600px',
        margin: 'auto',
        textAlign: 'center',
        paddingTop: '50px',
      };
      
      const headingStyle = {
        fontSize: '2em',
        color: '#FFF',
      };
      
      const paragraphStyle = {
        fontSize: '1.1em',
        color: '#B2B2B2',
        marginBottom: '20px',
      };
      
    return (
    <div id="content" className="content-container">
      

      <div className="post">
      <div className="entry" style={{ position: 'relative' }}>
  <div>
    <img src={center} alt="Smart Homes Logo" className="" style={{ width: '100%', height: '100%' ,filter: 'grayscale(0%)',opacity: '0.9'}} />
  </div>
  <div id="text-overlay" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'white', background: 'rgba(0, 0, 0, 0.8)',borderRadius: '10px',
  boxShadow: '0 40px 80px rgba(0, 0, 0, 0.9)', padding: '20px', borderRadius: '10px' }}>
    <div style={containerStyle}>
            <h2 style={headingStyle}>Thank You for Choosing Us!</h2>
            <br></br>
            <h2 style={paragraphStyle}>Your Policy ID is : <span style={{ color: 'green' }}>POL-123456</span></h2>
            <p style={paragraphStyle}>
                Your insurance policy has been successfully processed. We appreciate your trust in Our Insurance.
            </p>
            <p style={paragraphStyle}>
                What's Next? Your policy details have been sent to your registered email address. Our team will review your policy and get back to you with any additional information or updates.
            </p>
            <p style={paragraphStyle}>
                Stay Connected! If you have any questions or need furthrer assistance, please don't hesitate to contact our customer support team at support@abcinsurance.com.
            </p>
            <p style={paragraphStyle}>
                Thank you again for choosing ou Company. We look forward to providing you with excellent service and peace of mind!
            </p>
            <Link onMouseOver={(e) => e.target.style.color = '#ff6961'}
                      onMouseOut={(e) => e.target.style.color = 'white'} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full" to="/" style={buttonStyle}>Home</Link>
        </div>
   
  </div>
  <div class="container">
    {/* Your other content goes here */}
  </div>
</div>

      </div>




    </div>
    );
}

export default Thankyou;