import React, { createContext, useState, useContext, ReactNode } from 'react';
import { addCandidate, updateCandidate, getCandidate } from '../services/api';

interface Candidate {
  id: string;
  name: string;
  resume: string;
  interviewResponses: string[];
  credentials: string[];
  assessment: string;
}

interface CandidateContextProps {
  candidates: Candidate[];
  addCandidate: (candidate: Candidate) => void;
  updateCandidate: (id: string, updatedCandidate: Candidate) => void;
  getCandidate: (id: string) => Candidate | undefined;
}

const CandidateContext = createContext<CandidateContextProps | undefined>(undefined);

export const CandidateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  const addCandidate = async (candidate: Candidate) => {
    try {
      const newCandidate = await addCandidate(candidate);
      setCandidates((prevCandidates) => [...prevCandidates, newCandidate]);
    } catch (error) {
      console.error('Error adding candidate:', error);
    }
  };

  const updateCandidate = async (id: string, updatedCandidate: Candidate) => {
    try {
      const updated = await updateCandidate(id, updatedCandidate);
      setCandidates((prevCandidates) =>
        prevCandidates.map((candidate) =>
          candidate.id === id ? updated : candidate
        )
      );
    } catch (error) {
      console.error('Error updating candidate:', error);
    }
  };

  const getCandidate = (id: string) => {
    return candidates.find((candidate) => candidate.id === id);
  };

  return (
    <CandidateContext.Provider value={{ candidates, addCandidate, updateCandidate, getCandidate }}>
      {children}
    </CandidateContext.Provider>
  );
};

export const useCandidateContext = () => {
  const context = useContext(CandidateContext);
  if (!context) {
    throw new Error('useCandidateContext must be used within a CandidateProvider');
  }
  return context;
};
