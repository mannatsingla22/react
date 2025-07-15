import React from 'react';
import { render, screen } from '@testing-library/react';
import ResponsiveLayout from '../components/ResponsiveLayout';

test('renders children', () => {
  render(
    <ResponsiveLayout>
      <div>Test Child</div>
    </ResponsiveLayout>
  );
  expect(screen.getByText('Test Child')).toBeInTheDocument();
});
