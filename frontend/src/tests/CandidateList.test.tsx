import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CandidateList from '../components/CandidateList';
import { CandidateProvider } from '../context/CandidateContext';

const renderWithProviders = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(
    <MemoryRouter initialEntries={[route]}>
      <CandidateProvider>{ui}</CandidateProvider>
    </MemoryRouter>
  );
};

describe('CandidateList', () => {
  test('renders CandidateList component', () => {
    renderWithProviders(<CandidateList />);

    expect(screen.getByText('Candidate List')).toBeInTheDocument();
  });

  test('displays candidate details', () => {
    const candidates = [
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'Jane Smith' },
    ];

    renderWithProviders(<CandidateList />, {
      route: '/candidates',
    });

    candidates.forEach((candidate) => {
      expect(screen.getByText(candidate.name)).toBeInTheDocument();
    });
  });

  test('navigates to candidate details on button click', () => {
    const candidates = [
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'Jane Smith' },
    ];

    renderWithProviders(<CandidateList />, {
      route: '/candidates',
    });

    candidates.forEach((candidate) => {
      const button = screen.getByText('View Details');
      fireEvent.click(button);
      expect(window.location.pathname).toBe(`/candidates/${candidate.id}`);
    });
  });

  test('navigates to candidate comparison on button click', () => {
    renderWithProviders(<CandidateList />, {
      route: '/candidates',
    });

    const compareButton = screen.getByText('Compare Candidates');
    fireEvent.click(compareButton);

    expect(window.location.pathname).toBe('/candidate-comparison');
  });
});
