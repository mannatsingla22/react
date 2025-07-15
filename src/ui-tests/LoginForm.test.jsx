import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginForm';

test('renders Login heading', () => {
  render(
    <MemoryRouter>
      <LoginForm setIsLoggedIn={() => {}} />
    </MemoryRouter>
  );
  // Check for the heading
  expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  // Optionally, also check for the button
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});
