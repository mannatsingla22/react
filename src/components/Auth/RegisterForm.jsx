import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateRegistration } from './AuthValidation';
import '../../styles/auth.css';

const RegisterForm = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateRegistration(
      form.username,
      form.email,
      form.password,
      form.confirmPassword
    );
    if (Object.keys(validationErrors).length === 0) {
      localStorage.setItem('user', JSON.stringify({
        email: form.email,
        password: form.password,
      }));
      alert('Registration successful!');
      setForm({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      navigate('/'); // Redirect to home page
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <div className="form-group">
        <label>Username</label>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Choose a username"
        />
        {errors.username && <span className="form-error">{errors.username}</span>}
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        {errors.email && <span className="form-error">{errors.email}</span>}
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Create a password"
        />
        {errors.password && <span className="form-error">{errors.password}</span>}
      </div>
      <div className="form-group">
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
        />
        {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
      </div>
      <button type="submit" className="auth-btn">Sign Up</button>
    </form>
  );
};

export default RegisterForm;