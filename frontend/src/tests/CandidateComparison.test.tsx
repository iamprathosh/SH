import React from 'react';
import { render, screen } from '@testing-library/react';
import CandidateComparison from '../components/CandidateComparison';

describe('CandidateComparison Component', () => {
  test('renders CandidateComparison component', () => {
    render(<CandidateComparison />);
    const candidateComparisonElement = screen.getByText(/Candidate Comparison/i);
    expect(candidateComparisonElement).toBeInTheDocument();
  });

  test('displays candidate 1 details', () => {
    render(<CandidateComparison />);
    const candidate1Element = screen.getByText(/Candidate 1/i);
    expect(candidate1Element).toBeInTheDocument();
  });

  test('displays candidate 2 details', () => {
    render(<CandidateComparison />);
    const candidate2Element = screen.getByText(/Candidate 2/i);
    expect(candidate2Element).toBeInTheDocument();
  });
});
