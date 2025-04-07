import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CandidateProvider, useCandidateContext } from '../context/CandidateContext';

const TestComponent = () => {
  const { candidates, addCandidate, updateCandidate, getCandidate } = useCandidateContext();

  return (
    <div>
      <button onClick={() => addCandidate({ id: '1', name: 'John Doe', resume: 'Resume content', interviewResponses: ['Response 1'] })}>
        Add Candidate
      </button>
      <button onClick={() => updateCandidate('1', { id: '1', name: 'John Doe Updated', resume: 'Updated resume content', interviewResponses: ['Updated Response 1'] })}>
        Update Candidate
      </button>
      <div data-testid="candidate-name">{getCandidate('1')?.name}</div>
    </div>
  );
};

describe('CandidateContext', () => {
  test('initial state has no candidates', () => {
    render(
      <CandidateProvider>
        <TestComponent />
      </CandidateProvider>
    );
    const candidateName = screen.queryByTestId('candidate-name');
    expect(candidateName).toBeNull();
  });

  test('addCandidate updates candidates state', () => {
    render(
      <CandidateProvider>
        <TestComponent />
      </CandidateProvider>
    );
    const addButton = screen.getByText('Add Candidate');
    fireEvent.click(addButton);
    const candidateName = screen.getByTestId('candidate-name');
    expect(candidateName).toHaveTextContent('John Doe');
  });

  test('updateCandidate updates candidate information', () => {
    render(
      <CandidateProvider>
        <TestComponent />
      </CandidateProvider>
    );
    const addButton = screen.getByText('Add Candidate');
    fireEvent.click(addButton);
    const updateButton = screen.getByText('Update Candidate');
    fireEvent.click(updateButton);
    const candidateName = screen.getByTestId('candidate-name');
    expect(candidateName).toHaveTextContent('John Doe Updated');
  });
});
