import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ArrowUpIcon from '@mui/icons-material/ArrowUpward';
import SearchIcon from '@mui/icons-material/Search';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material'; // Assuming you're using Material-UI

const HealthHome = () => {
    return (
        <div style={{ backgroundImage: `url('healthback.jpg')`, backgroundSize: 'cover', minHeight: '100vh', position: 'relative' }}>
            {/* Semi-transparent overlay */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.4)' }}></div>

            <Container maxWidth="md" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Card
                             sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                borderRadius: 8,
                                boxShadow: '0 0px 0px rgba(0, 0, 0, 0.4)',
                                padding: 2,
                                marginBottom: 4,
                                transition: 'box-shadow 0.3s ease,background-Color 0.3s ease', // Add transition for boxShadow
                                '&:hover': {
                                    backgroundColor: '#f9f9f9', // Set transparency on hover
                                    boxShadow: '0 50px 80px rgba(0, 0, 0, 0.4)', // Change boxShadow on hover
                                }
                            }}
                        >
                            <CardContent >
                                <Typography variant="h4" gutterBottom>
                                    Get Health Insurance Quotes
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    Health insurance provides financial protection in case of medical emergencies, accidents, or critical
                                    illnesses. It covers medical expenses, hospitalization costs, and other healthcare-related services.
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    With Navi Health Insurance, you can benefit from a comprehensive health insurance plan that offers
                                    cashless claims at 10,000+ hospitals across India. Enjoy benefits like 100% coverage of hospital bills,
                                    no cap on room rent, unlimited online consultations, and medical treatment at home.
                                </Typography>
                                <Link to="/health-insurance">
                                    <img src={'healthlogo.png'} alt="Health Insurance" width={300} />
                                </Link>
                                <Typography>
                                    <IconButton
                                        sx={{
                                            color: 'black',
                                            transition: 'transform 0.3s ease, color 0.3s ease',
                                            '&:hover': {
                                                transform: 'scale(1.2)',
                                                '& svg': { color: '#ff6961' }
                                            }
                                        }}
                                    >
                                        <ArrowUpIcon sx={{ fontSize: '60px' }} />
                                    </IconButton><br></br>
                                    Click form icon to get Quotes !!
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                borderRadius: 8,
                                boxShadow: '0 0px 0px rgba(0, 0, 0, 0.4)',
                                padding: 2,
                                marginBottom: 4,
                                transition: 'box-shadow 0.3s ease,background-Color 0.3s ease', // Add transition for boxShadow
                                '&:hover': {
                                    backgroundColor: '#f9f9f9', // Set transparency on hover
                                    boxShadow: '0 50px 80px rgba(0, 0, 0, 0.4)', // Change boxShadow on hover
                                }
                            }}
                        >
                            <CardContent>
                                <Typography variant="h4" gutterBottom>
                                    Why Choose Us for Health Insurance?
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    At Navi Health Insurance, we offer:
                                </Typography>
                                <ul>
                                    <li>Comprehensive coverage options tailored to your needs</li>
                                    <li>Competitive rates and affordable premiums</li>
                                    <li>Excellent customer service and support</li>
                                    <li>Quick and hassle-free claims processing</li>
                                </ul>
                            </CardContent>
                        </Card>
                        <Card
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                borderRadius: 8,
                                boxShadow: '0 0px 0px rgba(0, 0, 0, 0.4)',
                                padding: 2,
                                marginBottom: 4,
                                transition: 'box-shadow 0.3s ease,background-Color 0.3s ease', // Add transition for boxShadow
                                '&:hover': {
                                    backgroundColor: '#f9f9f9', // Set transparency on hover
                                    boxShadow: '0 50px 80px rgba(0, 0, 0, 0.4)', // Change boxShadow on hover
                                }
                            }}
                        >
                            <CardContent>
                                <Typography variant="h4" gutterBottom>
                                    Want to Search Nearby Offices !
                                </Typography>

                                <Link to="/HealthSearch">
                                    <IconButton
                                        sx={{
                                            color: 'black',
                                            transition: 'transform 0.3s ease, color 0.3s ease',
                                            '&:hover': {
                                                transform: 'scale(1.2)',
                                                '& svg': { color: '#ff6961' }
                                            }
                                        }}
                                    >
                                        <SearchIcon sx={{ fontSize: '60px' }} />
                                    </IconButton>
                                </Link><br></br>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default HealthHome;
