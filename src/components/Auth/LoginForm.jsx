import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateLogin } from './AuthValidation';
import '../../styles/auth.css';

const LoginForm = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateLogin(email, password);
    if (Object.keys(validationErrors).length === 0) {
      // Mock API call
      setTimeout(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.email === email && user.password === password) {
          setIsLoggedIn(true);
          alert('Login successful!');
          navigate('/');
        } else {
          setErrors({ password: 'Invalid email or password' });
        }
      }, 1200);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        {errors.email && <span className="form-error">{errors.email}</span>}
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        {errors.password && <span className="form-error">{errors.password}</span>}
      </div>
      <button type="submit" className="auth-btn">Login</button>
    </form>
  );
};

export default LoginForm;