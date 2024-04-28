import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'black', color: 'white', padding: '20px', textAlign: 'center' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '70%' }}>
            <h3>About Us</h3>
            <p>Insurance Quotes is your trusted destination for finding the best automobile and health insurance coverage tailored to your needs. With our user-friendly platform, you can effortlessly compare quotes based on your city, zip code, and daily miles traveled. Our mission is to provide transparent, reliable, and personalized insurance solutions, empowering you to make informed decisions about your coverage. Partner with us to navigate the complexities of insurance and secure the protection you deserve.</p>
          </div>
          <div style={{ width: '20%' }}>
</div>
          <div style={{ width: '50%' }}>
            <h3>Location</h3>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.118248214307!2d-87.62958619999999!3d41.834873100000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2c06ed2e695f%3A0x5decf4f463c7f626!2sIllinois%20Institute%20of%20Technology!5e0!3m2!1sen!2sus!4v1649792125748!5m2!1sen!2sus" width="100%" height="150" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
          </div>
        </div>
        <div style={{ marginTop: '20px' }}>
          <img src="logo.png" alt="Logo" style={{ width: '200px', marginBottom: '10px' }} />
          <p>&copy; 2024 Insurance Quotes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
