import React from 'react';
import { render, screen } from '@testing-library/react';
import CandidateDetail from '../pages/CandidateDetail';
import { CandidateProvider } from '../context/CandidateContext';
import { MemoryRouter, Route } from 'react-router-dom';

const renderWithProviders = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(
    <MemoryRouter initialEntries={[route]}>
      <CandidateProvider>
        <Route path="/candidates/:id">{ui}</Route>
      </CandidateProvider>
    </MemoryRouter>
  );
};

describe('CandidateDetail', () => {
  test('renders CandidateDetail component', () => {
    renderWithProviders(<CandidateDetail />, { route: '/candidates/1' });

    expect(screen.getByText('Candidate not found')).toBeInTheDocument();
  });

  test('displays candidate details', () => {
    const candidate = {
      id: '1',
      name: 'John Doe',
      resume: 'Resume content',
      interviewResponses: ['Response 1', 'Response 2'],
    };

    renderWithProviders(<CandidateDetail />, { route: '/candidates/1' });

    expect(screen.getByText(candidate.name)).toBeInTheDocument();
    expect(screen.getByText(candidate.resume)).toBeInTheDocument();
    candidate.interviewResponses.forEach((response) => {
      expect(screen.getByText(response)).toBeInTheDocument();
    });
  });
});
