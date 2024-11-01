// src/api/index.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    withCredentials: true,
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Add response interceptor to handle token expiration
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 403) {
            // Clear local storage if token is invalid/expired
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Optionally redirect to login or show message
        }
        return Promise.reject(error);
    }
);

export const loginUser = async (email, password) => {
    try {
        const response = await api.post('/users/login', { email, password });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const registerUser = async (username, email, password) => {
    try {
        const response = await api.post('/users/register', { username, email, password });
        return response.data;
    } catch (error) {
        console.error('Error registering:', error);
        throw error;
    }
};

export const getUserProfile = async () => {
    try {
        const response = await api.get('/users/profile');
        return response.data;
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
};

export const getSavedDates = async () => {
    try {
        const response = await api.get('/users/saved-dates');
        return response.data;
    } catch (error) {
        console.error('Error fetching saved dates:', error);
        return [];
    }
};

export const saveDateIdea = async (dateId) => {
    try {
        const response = await api.post(`/users/dates/${dateId}/save`);
        return response.data;
    } catch (error) {
        console.error('Error saving date idea:', error);
        throw error;
    }
};

export const unsaveDateIdea = async (dateId) => {
    try {
        const response = await api.delete(`/users/dates/${dateId}/save`);
        return response.data;
    } catch (error) {
        console.error('Error unsaving date idea:', error);
        throw error;
    }
};

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
    try {
        const response = await api.get(`/dates/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching date idea:', error);
        throw error;
    }
};

export const likeDateIdea = async (id) => {
    try {
        const response = await api.post(`/dates/${id}/like`);
        return response.data;
    } catch (error) {
        console.error('Error liking date idea:', error);
        throw error;
    }
};

export const addComment = async (id, content) => {
    try {
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

export const updateUserProfile = async (userData) => {
    try {
        const response = await api.patch('/users/profile', userData);
        return response.data;
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
};

export const changePassword = async (currentPassword, newPassword) => {
    try {
        const response = await api.post('/users/change-password', {
            currentPassword,
            newPassword
        });
        return response.data;
    } catch (error) {
        console.error('Error changing password:', error);
        throw error;
    }
};

export default api;