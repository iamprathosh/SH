import React from 'react';
import { render, screen } from '@testing-library/react';
import RiskAssessment from '../components/RiskAssessment';

describe('RiskAssessment Component', () => {
  test('renders RiskAssessment component', () => {
    render(<RiskAssessment />);
    const riskAssessmentElement = screen.getByText(/Risk Assessment/i);
    expect(riskAssessmentElement).toBeInTheDocument();
  });

  test('displays Risk Metric 1 details', () => {
    render(<RiskAssessment />);
    const riskMetric1Element = screen.getByText(/Risk Metric 1/i);
    expect(riskMetric1Element).toBeInTheDocument();
  });

  test('displays Risk Metric 2 details', () => {
    render(<RiskAssessment />);
    const riskMetric2Element = screen.getByText(/Risk Metric 2/i);
    expect(riskMetric2Element).toBeInTheDocument();
  });
});
