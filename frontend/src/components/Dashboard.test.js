import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './Dashboard';

describe('Dashboard Component', () => {
  test('renders Dashboard header', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    const dashboardHeader = screen.getByText((content, element) =>
      element.tagName.toLowerCase() === 'h1' && content.includes('Dashboard')
    );
    expect(dashboardHeader).toBeInTheDocument();

  });
});
