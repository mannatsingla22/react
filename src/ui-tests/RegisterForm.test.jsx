import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RegisterForm from '../components/Auth/RegisterForm';

test('renders Sign Up heading', () => {
  render(
    <MemoryRouter>
      <RegisterForm />
    </MemoryRouter>
  );
  expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument();
});
