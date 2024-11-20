// src/api/index.js

import axios from "axios";

// Create an axios instance with the base URL of your backend API
const api = axios.create({
  baseURL: "/api", // Adjust the baseURL as needed
  withCredentials: true,
});

// Add a request interceptor to include the auth token in every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve the token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add a response interceptor to handle token expiration or unauthorized access
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403 || error.response?.status === 401) {
      // Clear local storage if token is invalid/expired
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Optionally redirect to login or show a message
    }
    return Promise.reject(error);
  },
);

//
// User Authentication Functions
//

// Login user
export const loginUser = async (identifier, password) => {
  try {
    const response = await api.post("/users/login", { identifier, password });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Register user
export const registerUser = async (username, email, password) => {
  try {
    const response = await api.post("/users/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};


// Get user profile
export const getUserProfile = async () => {
  try {
    const response = await api.get("/users/profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

export const updateUserProfile = async (username, email, currentPassword) => {
  const token = localStorage.getItem("token");
  try {
    const response = await api.patch(
      "/users/profile",
      { username, email, currentPassword },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error.response?.data || { error: "Failed to update profile" };
  }
};

// Change user password
export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await api.post("/users/change-password", {
      currentPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};

//
// Saved Dates Functions
//

// Get saved date ideas for the user
export const getSavedDates = async () => {
  try {
    const response = await api.get("/users/saved-dates");
    return response.data;
  } catch (error) {
    console.error("Error fetching saved dates:", error);
    return [];
  }
};

// Save a date idea
export const saveDateIdea = async (dateId) => {
  try {
    const response = await api.post(`/users/dates/${dateId}/save`);
    return response.data;
  } catch (error) {
    console.error("Error saving date idea:", error);
    throw error;
  }
};

// Unsave a date idea
export const unsaveDateIdea = async (dateId) => {
  try {
    const response = await api.delete(`/users/dates/${dateId}/save`);
    return response.data;
  } catch (error) {
    console.error("Error unsaving date idea:", error);
    throw error;
  }
};

//
// Date Ideas Functions
//

// Get date ideas (feed)
export const getDateIdeas = async () => {
  try {
    const response = await api.get("/dates");
    return response.data;
  } catch (error) {
    console.error("Error fetching date ideas:", error);
    return [];
  }
};

// Get all date ideas (for admin or browsing purposes)
export const getAllDateIdeas = async () => {
  try {
    const response = await api.get("/dates/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching all date ideas:", error);
    return [];
  }
};

// Get a specific date idea by ID
export const getDateIdea = async (id) => {
  try {
    const response = await api.get(`/dates/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching date idea:", error);
    throw error;
  }
};

// Create a new date idea
export const createDateIdea = async (dateIdea) => {
  try {
    const response = await api.post("/dates", dateIdea);
    return response.data;
  } catch (error) {
    console.error("Error creating date idea:", error);
    throw error;
  }
};

// Like a date idea
export const likeDateIdea = async (id) => {
  try {
    const response = await api.post(`/dates/${id}/like`);
    return response.data;
  } catch (error) {
    console.error("Error liking date idea:", error);
    throw error;
  }
};

// Unlike a date idea
export const unlikeDateIdea = async (id) => {
  try {
    const response = await api.post(`/dates/${id}/unlike`);
    return response.data;
  } catch (error) {
    console.error("Error unliking date idea:", error);
    throw error;
  }
};

//
// Comments Functions
//

// Add a comment to a date idea
export const addComment = async (id, content) => {
  try {
    const response = await api.post(`/dates/${id}/comment`, { content });
    return response.data;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

// Get comments for a date idea
export const getComments = async (id) => {
  try {
    const response = await api.get(`/dates/${id}/comments`);
    return response.data; // Includes the username and user_id now
  } catch (error) {
    console.error("Error getting comments:", error);
    return [];
  }
};

export const deleteComment = async (commentId) => {
  try {
    const response = await api.delete(`/dates/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};

export const updateComment = async (commentId, content) => {
  try {
    const response = await api.put(`/comments/${commentId}`, { content });
    return response.data;
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
};





export const fetchImageForDate = async (searchTerms) => {
  try {
    const response = await fetch('/api/images/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ searchTerms })
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }
    
    const data = await response.json();
    return data.imageUrl;
  } catch (error) {
    console.error('Error fetching image:', error);
    return '/api/placeholder/400/300';
  }
};

export default api;
