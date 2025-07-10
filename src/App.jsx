import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import ResponsiveLayout from './components/ResponsiveLayout';
import Topology from './pages/Topology';
import './styles/auth.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <ResponsiveLayout>
        <Routes>
          <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/topology" element={<Topology />} />

          <Route path="/" element={
            <div className="home-bg">
              <div className="home-card">
                <h1 className="home-title">NetViz Authentication Portal</h1>
                <p className="home-desc">
                  Welcome! Please login or sign up to access the network topology visualization.
                </p>
                <div className="home-actions">
                  <a href="/login" className="home-btn">Login</a>
                  <a href="/register" className="home-btn">Sign Up</a>
                </div>
                <a href="/topology" className="home-link">View Topology (Demo)</a>
              </div>
            </div>
          } />
        </Routes>
      </ResponsiveLayout>
    </Router>
  );
};

export default App;