import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ArrowUpIcon from '@mui/icons-material/ArrowUpward';
import SearchIcon from '@mui/icons-material/Search';
import './CustomerDashboard.css'; // Import your CSS file for custom styles
import { Container, Grid, Card, CardContent, Typography } from '@mui/material'; // Assuming you're using Material-UI

const ManagerDashboard = () => {
    return (
        <div className="background-image">
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Grid style={{marginTop:'0px'}} container justifyContent="center" spacing={4}>
                    <Grid item xs={12} sm={6}>
                        <Card className="custom-card">
                            <CardContent>
                                <Typography gutterBottom>
                                    Health Insurance Requests
                                </Typography>
                                <img src="healthlogo.png" alt="Logo" className="logo-img1" /><br></br>
                                <Link to="/agent/healthDashboard">
                                    <IconButton
                                        sx={{
                                            color: 'black',
                                            transition: 'transform 0.3s ease, color 0.3s ease',
                                            '&:hover': {
                                                transform: 'scale(1.2)',
                                                '& svg': { color: '#ff6961' },
                                            },
                                        }}
                                    >
                                        <SearchIcon sx={{ fontSize: '60px' }} />
                                    </IconButton>
                                </Link>
                                <br></br>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card className="custom-card">
                            <CardContent>
                                <Typography gutterBottom>
                                Automobile Insurance Requests
                                </Typography>
                                <img src="carlogo.png" alt="Logo" className="logo-img1" />
                                <br></br>
                                <Link to="/agent/autoDashboard">
                                    <IconButton
                                        sx={{
                                            color: 'black',
                                            transition: 'transform 0.3s ease, color 0.3s ease',
                                            '&:hover': {
                                                transform: 'scale(1.2)',
                                                '& svg': { color: '#ff6961' },
                                            },
                                        }}
                                    >
                                        <SearchIcon sx={{ fontSize: '60px' }} />
                                    </IconButton>
                                </Link>
                                <br></br>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card className="custom-card">
                            <CardContent>
                                <Typography gutterBottom>
                                    Health Insurance Data Analysis
                                    <img src="dataana.png" alt="Logo" className="logo-img1" /><br></br>
                                </Typography>
                                <Link to="/HealthAnalysis">
                                    <IconButton
                                        sx={{
                                            color: 'black',
                                            transition: 'transform 0.3s ease, color 0.3s ease',
                                            '&:hover': {
                                                transform: 'scale(1.2)',
                                                '& svg': { color: '#ff6961' },
                                            },
                                        }}
                                    >
                                        <SearchIcon sx={{ fontSize: '60px' }} />
                                    </IconButton>
                                </Link>
                                <br></br>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card className="custom-card">
                            <CardContent>
                                <Typography gutterBottom>
                                    Automobile Insurance Data Analysis
                                </Typography>
                                <img src="dataana.png" alt="Logo" className="logo-img1" /><br></br>
                                <Link to="/AutoAnalysis">
                                    <IconButton
                                        sx={{
                                            color: 'black',
                                            transition: 'transform 0.3s ease, color 0.3s ease',
                                            '&:hover': {
                                                transform: 'scale(1.2)',
                                                '& svg': { color: '#ff6961' },
                                            },
                                        }}
                                    >
                                        <SearchIcon sx={{ fontSize: '60px' }} />
                                    </IconButton>
                                </Link>
                                <br></br>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default ManagerDashboard;
