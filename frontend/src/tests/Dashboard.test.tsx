import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../components/Dashboard';

describe('Dashboard Component', () => {
  test('renders Dashboard component', () => {
    render(<Dashboard />);
    const dashboardElement = screen.getByTestId('dashboard');
    expect(dashboardElement).toBeInTheDocument();
  });

  test('displays correct title', () => {
    render(<Dashboard />);
    const titleElement = screen.getByText(/Dashboard/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders candidate comparison section', () => {
    render(<Dashboard />);
    const candidateComparisonElement = screen.getByTestId('candidate-comparison');
    expect(candidateComparisonElement).toBeInTheDocument();
  });

  test('renders risk assessment section', () => {
    render(<Dashboard />);
    const riskAssessmentElement = screen.getByTestId('risk-assessment');
    expect(riskAssessmentElement).toBeInTheDocument();
  });
});
