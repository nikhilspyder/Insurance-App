import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ArrowUpIcon from '@mui/icons-material/ArrowUpward';
import SearchIcon from '@mui/icons-material/Search';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material'; // Assuming you're using Material-UI

const AutoHome = () => {
    return (
        <div style={{ backgroundImage: 'url("carback.jpg")', backgroundSize: 'cover', minHeight: '100vh' }}>
            <Container maxWidth="md" sx={{ py: 4 }}>
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
                            <CardContent>
                                <Typography variant="h4" gutterBottom>
                                    Get Automobile Insurance Quotes
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    Automobile insurance provides financial protection in case of accidents, theft, or damage to your vehicle. It covers repair costs,
                                    replacement of parts, and liability coverage for injuries or damages to others.
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    With automobile insurance, you can benefit from a comprehensive insurance plan that offers coverage for various scenarios on the road.
                                    Enjoy benefits like coverage for repairs, roadside assistance, rental car reimbursement, and protection against uninsured motorists.
                                </Typography>

                                <Link to="/automobile-insurance">
                                    <img src={'carlogo.png'} alt="Health Insurance" width={300} />
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
                                    Why Choose Us for Automobile Insurance?
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    At Automobile Insurance, we offer:
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

export default AutoHome;
