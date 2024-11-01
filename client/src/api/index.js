// src/api/index.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    withCredentials: true
});

export const getDateIdeas = async () => {
    try {
        const response = await api.get('/dates');
        return response.data;
    } catch (error) {
        console.error('Error fetching date ideas:', error);
        return [];
    }
};

export const createDateIdea = async (dateIdea) => {
    try {
        const response = await api.post('/dates', dateIdea);
        return response.data;
    } catch (error) {
        console.error('Error creating date idea:', error);
        throw error;
    }
};

export const getAllDateIdeas = async () => {
  try {
    const response = await api.get('/dates/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching all date ideas:', error);
    return [];
  }
};



export const getDateIdea = async (id) => {
  const response = await api.get(`/dates/${id}`);
  return response.data;
};


export const likeDateIdea = async (id) => {
  const response = await api.post(`/dates/${id}/like`);
  return response.data;
};

export const addComment = async (id, content) => {
  try {
      // Changed from comments to comment to match the route
      const response = await api.post(`/dates/${id}/comment`, { content });
      return response.data;
  } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
  }
};

export const getComments = async (id) => {
  try {
      const response = await api.get(`/dates/${id}/comments`);
      return response.data;
  } catch (error) {
      console.error('Error getting comments:', error);
      return [];
  }
};