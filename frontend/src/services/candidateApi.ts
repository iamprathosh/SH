import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const addCandidate = async (candidateData) => {
  try {
    const response = await axios.post(`${API_URL}/candidates`, candidateData);
    return response.data;
  } catch (error) {
    console.error('Error adding candidate:', error);
    throw error;
  }
};

export const updateCandidate = async (id, candidateData) => {
  try {
    const response = await axios.put(`${API_URL}/candidates/${id}`, candidateData);
    return response.data;
  } catch (error) {
    console.error('Error updating candidate:', error);
    throw error;
  }
};

export const getCandidate = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/candidates/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching candidate:', error);
    throw error;
  }
};

export const assessCandidate = async (id) => {
  try {
    const response = await axios.post(`${API_URL}/candidates/${id}/assess`);
    return response.data;
  } catch (error) {
    console.error('Error assessing candidate:', error);
    throw error;
  }
};
