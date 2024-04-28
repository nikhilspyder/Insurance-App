import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import './Header.css'; 

function Header() {
    const [user, setUser] = useState('');

    useEffect(() => {
        let u = sessionStorage.getItem('user');
        setUser(JSON.parse(u));
    }, []);

    const logout = () => {
        window.sessionStorage.clear();
        window.location.reload();
        window.location.href = '/';
    };

    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <Link to='/'>
                        <div className="logo">
                            <img src="logo.png" alt="Logo" className="logo-img" />
                        </div>
                    </Link>
                    <nav className="navigation" style={{ float: 'right' }}>
                        <ul className="nav-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/aboutUs">About Us</Link></li>
                            <li><Link to="/contactUs">Contact Us</Link></li>
                            {user ? (
                                <>
                                    
                                    {user.usertype === 'customer' && (
                                        <>
                                        <li><Link to="/CustomerDashboard">Dashboard</Link></li>
                                            {/* <li><Link to="/user/requests">My Requests</Link></li>
                                            <li><Link to="/user/insurance">My Insurance</Link></li> */}
                                        </>
                                    )}
                                    {user.usertype === 'agent' && (
                                        <>
                                        <li><Link to="/ManagerDashboard">Dashboard</Link></li>
                                            {/* <li><Link to="/agent/healthDashboard">Health Dashboard</Link></li>
                                            <li><Link to="/agent/autoDashboard">Auto Dashboard</Link></li> */}
                                        </>
                                    )}
                                    <li><span style={{color:'#ff6961'}} className="welcome-text">Welcome {user.username}</span></li>
                                    <li><Link style={{ background: 'transparent', textDecoration: 'none', padding: '10px 20px', border: '2px solid white', borderRadius: '5px', transition: 'background-color 0.3s, color 0.3s, border-color 0.3s', cursor: 'pointer',alignItems: 'center' }} to='' onClick={logout} className="logout-button">Logout</Link></li>
                                </>
                            ) : (
                                <li><Link to='/login' className="login-button1" style={{ background: 'transparent', textDecoration: 'none', padding: '10px 20px', border: '2px solid white', borderRadius: '5px', transition: 'background-color 0.3s, color 0.3s, border-color 0.3s', cursor: 'pointer',alignItems: 'center' }}>
                                
                                Log In
                              </Link>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;
