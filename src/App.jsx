import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
          <Route path="/login" element={isLoggedIn ? <Navigate to="/topology" /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/topology" element={isLoggedIn ? <Topology /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </ResponsiveLayout>
    </Router>
  );
};

export default App;