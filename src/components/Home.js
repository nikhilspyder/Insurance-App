import React from 'react';
import { Link } from 'react-router-dom';
import ImageCarouselWithText from './ImageCaraousel';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
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
import './Home.css'; // Import CSS file
const imageNames = [
  'image1.jpeg',
  'image2.jpeg',
  'image3.jpeg'
];

const Home = () => {
  const randomText = (
    <div className="popup-content">
      {/* Content of your popup div */}
      <h2>Welcome!</h2>
      <p>This is a popup.</p>
    </div>
  );
  const texts = [
    '',
    '',
    '',
  ];
  return (
    <>
      <div className="carousel-container" style={{ marginBottom: '20px', position: 'relative' }}>
        <ImageCarouselWithText imageNames={imageNames} texts={texts} imageHeight="700px" />
        <div className="text-overlay" style={{ top: '50%', left: '30%' }}>
          <h2 >Health Insurance</h2>
          <img src="healthlogo.png" alt="Logo" className="logo-img1" />
          <p>Get a quote now and save up to 20% on your insurance!</p>
          <Link to="/HealthHome" style={{ textDecoration: 'none', color: 'inherit' }}>
    <IconButton 
      sx={{ 
        color: 'white', 
        transition: 'transform 0.3s ease, color 0.3s ease',
        '&:hover': { 
          transform: 'scale(1.2)', 
          '& svg': { color: '#ff6961' }
        } 
      }}
    >
      <ArrowForwardIcon sx={{ fontSize: '60px' }} />
    </IconButton>
  </Link>
  <p>Know More!!</p>
        </div>
        <div className="text-overlay" style={{ top: '50%', left: '70%' }}>
          <h2 >Automobile Insurance</h2>
          <img src="carlogo.png" alt="Logo" className="logo-img1" />
          <p>Get a quote now and save up to 10% on your insurance!</p>
          <Link to="/AutoHome" style={{ textDecoration: 'none', color: 'inherit' }}>
    <IconButton 
      sx={{ 
        color: 'white', 
        transition: 'transform 0.3s ease, color 0.3s ease',
        '&:hover': { 
          transform: 'scale(1.2)', 
          '& svg': { color: '#ff6961' }
        } 
      }}
    >
      <ArrowForwardIcon sx={{ fontSize: '60px' }} />
    </IconButton>
  </Link>
  <p>Know More!!</p>
        </div>
      </div>
      
    </>
  );
}

const linkStyle = {
  textDecoration: 'none',
  color: '#000',
  fontSize: '24px', // Font size for link text
  padding: '20px', // Padding for the link area
  borderRadius: '8px', // Rounded corners for the card
  transition: 'background-color 0.3s ease',
};

export default Home;