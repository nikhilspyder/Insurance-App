import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login'
import Register from './components/Register';
import HealthInsurance from './components/HealthInsurance'
import AutoInsurance from './components/AutoInsurance';
import Footer from './components/Footer';
import SubHeader from './components/SubHeader';
import HealthDashboard from './components/HealthDashboard';
import React, { useEffect, useState } from 'react';
import UserHealthInsuranceRecords from './components/UserHealthInsuranceRecords';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import QuoteDisplay from './components/QuoteDisplay';
import QuoteDisplayAuto from './components/QuoteDisplayAuto';
import PaymentComponent from './components/PaymentComponent';
import UserInsurance from './components/UserInsurance';
import AutoDashboard from './components/AutoDashboard';
import HealthHome from './components/HealthHome';
import HealthSearch from './components/HealthSearch';
import UserAutoRecords from './components/UserAutoRecords';
import CustomerDashboard from './components/CustomerDashboard';
import ManagerDashboard from './components/ManagerDashboard';
import HealthAnalysis from './components/HealthAnalysis';
import AutoAnalysis from './components/AutoAnalysis';
import AutoHome from './components/AutoHome';
import Discount from './components/Discount';
import Thankyou from './components/Thankyou';
import AutoPaymentComponent from './components/AutoPaymentComponent';
import UserAutoInsurance from './components/UserAutoInsurance';

const App = () => {
  const [user, setUser] = useState('')

    useEffect(()=>{
        let u = sessionStorage.getItem('user');
        setUser(JSON.parse(u));
        
    }, [])

  return (
    <div className="App">
      <Router>
        <Header />
        {user && user.username && <SubHeader />}
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/health-insurance" element={<HealthInsurance />} />
        <Route path="/automobile-insurance" element={<AutoInsurance />} />
        <Route path="/agent/healthDashboard" element={<HealthDashboard />} />
        <Route path="/user/requests" element={<UserHealthInsuranceRecords />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/user/autoquotes/:requestId" element={<QuoteDisplayAuto />} />
        <Route path="/user/healthquotes/:requestId" element={<QuoteDisplay />} />
        <Route path="/payment" element={<PaymentComponent />} />
        <Route path="/AutoPaymentComponent" element={<AutoPaymentComponent />} />
        <Route path="/user/insurance" element={<UserInsurance />} />
        <Route path="/agent/autoDashboard" element={<AutoDashboard />} />
        <Route path="/HealthHome" element={<HealthHome />} />
        <Route path="/HealthSearch" element={<HealthSearch />} />
        <Route path="/UserAutoRecords" element={<UserAutoRecords />} />
        <Route path="/CustomerDashboard" element={<CustomerDashboard />} />
        <Route path="/ManagerDashboard" element={<ManagerDashboard />} />
        <Route path="/HealthAnalysis" element={<HealthAnalysis />} />
        <Route path="/AutoAnalysis" element={<AutoAnalysis />} />
        <Route path="/AutoHome" element={<AutoHome />} />
        <Route path="/Discount" element={<Discount />} />
        <Route path="/Thankyou" element={<Thankyou />} />
        <Route path="/UserAutoInsurance" element={<UserAutoInsurance />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
