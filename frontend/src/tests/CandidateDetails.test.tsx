import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CandidateDetails from '../pages/CandidateDetails';

describe('CandidateDetails', () => {
  test('renders CandidateDetails component', () => {
    render(
      <MemoryRouter>
        <CandidateDetails />
      </MemoryRouter>
    );

    expect(screen.getByText('Candidate Details')).toBeInTheDocument();
  });

  test('navigates to CandidateComparison on button click', () => {
    render(
      <MemoryRouter>
        <CandidateDetails />
      </MemoryRouter>
    );

    const compareButton = screen.getByText('Compare Candidates');
    fireEvent.click(compareButton);

    expect(screen.getByText('Candidate Comparison')).toBeInTheDocument();
  });

  test('navigates to RiskAssessment on button click', () => {
    render(
      <MemoryRouter>
        <CandidateDetails />
      </MemoryRouter>
    );

    const assessButton = screen.getByText('Assess Risk');
    fireEvent.click(assessButton);

    expect(screen.getByText('Risk Assessment')).toBeInTheDocument();
  });
});
