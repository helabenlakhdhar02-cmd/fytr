// api.js

// Always use production base URL https://fytr-1.onrender.comhttp://127.0.0.1:8000/
export const API_BASE_URL = 'https://fytr-1.onrender.com'; // Your production API

// API endpoints
export const API_ENDPOINTS = {
  LOGIN: '/api/accounts/login/',
  REGISTER: '/api/accounts/register/',
  LOGOUT: '/api/accounts/logout/',
  REFRESH_TOKEN: '/api/accounts/token/refresh/',
  PROFILE: '/fyter/profile/',
  PROJECTS: '/fyter/client/project/',
  FREELANCER_PROJECTS: '/fyter/freelancer/projects/',
  POSTS: '/fyter/posts/',
  MESSAGES: '/fyter/messages-prv/',
};

// Function to create auth headers
export const createAuthHeaders = (token) => {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

// Function to create multipart auth headers (for file uploads)
export const createMultipartAuthHeaders = (token) => {
  return {
    'Authorization': `Bearer ${token}`
  };
};

