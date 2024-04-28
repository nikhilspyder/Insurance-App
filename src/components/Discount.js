import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent } from '@mui/material';
import { Button, TextField, Snackbar, Link } from '@mui/material'; // Import Material-UI components
import MuiAlert from '@mui/material/Alert'; // Import Alert component from Material-UI
const Discount = () => {
    const HandelPay = async (e) => {
        window.location.href = '/Thankyou';
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Card
            sx={{
              backgroundColor: '#f9f9f9',
              borderRadius: 8,
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              marginBottom: 4, // Add margin bottom for spacing
            }}
          >
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Payment Summary
              </Typography>
              <img src="paymentdue.png" alt="Logo" className="logo-img1" />
              {/* Total Payment */}
              <Card variant="outlined" sx={{ marginBottom: 2 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Grand Total
                  </Typography>
                  <Typography variant="h4">
                    {/* Calculate and display grand total */}
                    $1200.00
                  </Typography>
                </CardContent>
              </Card>
              {/* Payment Method */}
              <Card variant="outlined" sx={{ marginBottom: 2 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Payment Method
                  </Typography>
                  <Typography variant="body1">
                    {/* Your payment method, e.g., "Credit Card" */}
                    Card ending in 0123
                  </Typography>
                </CardContent>
              </Card>
              {/* Seasonal Discount */}
              <Card variant="outlined" sx={{ marginBottom: 2 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Seasonal Discount (10%)
                  </Typography>
                  <Typography variant="body1" color="error">
                    {/* Display discount amount */}
                    -$120.00
                  </Typography>
                </CardContent>
              </Card>
              {/* Grand Total */}
              <Card variant="outlined" sx={{ marginBottom: 2 }}>
              <CardContent>
                  <Typography variant="h5" gutterBottom>
                  Grand Total
                  </Typography>
                  <Typography variant="h3" color="primary">
                    {/* Your total payment amount */}
                    $1080.00
                  </Typography>
                </CardContent>
                
              </Card>
              {/* Pay Now Button */}
              
              <Button onClick={HandelPay} variant="contained" color="primary" size="large" fullWidth>
                Pay Now
              </Button>
              
              
            </CardContent>
          </Card>
    
          {/* Additional Content Section */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
              Why Choose this Insurance?
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Personalized Service
                    </Typography>
                    <Typography variant="body2">
                      We prioritize personalized service to ensure that your insurance needs are met with
                      care and attention.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Transparent Policies
                    </Typography>
                    <Typography variant="body2">
                      We believe in transparency and strive to provide clear and honest insurance policies
                      that meet your expectations.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      );
    
};

export default Discount;
