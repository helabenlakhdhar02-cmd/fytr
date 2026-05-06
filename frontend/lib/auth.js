import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL, API_ENDPOINTS, createAuthHeaders } from '../config/api';

// Remplacer l'URL locale par l'URL de l'API configurée
const API_URL = `${API_BASE_URL}/api/accounts/`;

export const registerUser = async (userData) => {
    return axios.post(`${API_URL}register/`, userData, { withCredentials: true });
};

export const loginUser = async (credentials) => {
    // If credentials contain email instead of username, create a new object with username
    // For JWT authentication, the backend expects 'username' field
    const loginData = credentials.email
        ? {
            username: credentials.email,  // This is what the JWT auth expects
            password: credentials.password
          }
        : credentials;

    console.log('Sending login data:', loginData);
    return axios.post(`${API_URL}login/`, loginData, { withCredentials: true });
};

export const logoutUser = async () => {
    try {
        const accessToken = Cookies.get('access_token');  // Retrieve the token from cookies
        const refreshToken = Cookies.get('refresh_token');  // Retrieve the refresh token from cookies

        // Always remove cookies regardless of API response
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');

        // Only try to call the API if we have tokens
        if (accessToken && refreshToken) {
            await axios.post(`${API_URL}logout/`, { refresh_token: refreshToken }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`  // Send the access token in the Authorization header
                },
                withCredentials: true
            });
        }

        // Clear any other auth-related storage
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');

        return true;
    } catch (error) {
        console.error('Error during logout:', error);
        // Still remove cookies even if API call fails
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        return false;
    }
};

export const refreshAccessToken = async () => {
    const refreshToken = Cookies.get('refresh_token');
    if (!refreshToken) {
        console.log('No refresh token found, clearing credentials');
        Cookies.remove('access_token');

        // Return null instead of throwing an error
        // This allows the calling code to handle the missing token gracefully
        return null;
    }

    try {
        const response = await axios.post(`${API_URL}token/refresh/`, { "refresh": refreshToken }, { withCredentials: true });
        const { access } = response.data;
        Cookies.set('access_token', access);  // Store the new access token in cookies
        return access;
    } catch (error) {
        console.error('Failed to refresh access token:', error);
        // Clear all auth cookies on error
        Cookies.remove('refresh_token');
        Cookies.remove('access_token');

        // Return null instead of throwing an error
        return null;
    }
};

export const getUsers = async () => {
    const accessToken = Cookies.get('access_token');  // Retrieve the token from cookies
    const response = await axios.get(`${API_URL}users/`, {
        headers: {
            Authorization: `Bearer ${accessToken}`  // Send the token in the Authorization header
        }
    });
    return response.data;
};

export const updateProfile = async (profileData) => {
    const accessToken = Cookies.get('access_token');  // Retrieve the token from cookies
    return axios.put(`${API_BASE_URL}/fyter/profile/`, profileData, {
        headers: {
            Authorization: `Bearer ${accessToken}`  // Send the token in the Authorization header
        },
        withCredentials: true
    });
};

export const getPublicProjects = async () => {
    try {
        // Use the correct API URL for projects (Fyter API instead of accounts API)
        const response = await axios.get(`${API_BASE_URL}/fyter/public/projects/`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
};
export const getPublicServices = async () => {
    try {
        // Use the correct API URL for services (Fyter API instead of accounts API)
        const response = await axios.get(`${API_BASE_URL}/fyter/public/services/`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching services:", error);
        return [];
    }
};


export const getPrivateMessages = async () => {
    const accessToken = Cookies.get('access_token');  // Retrieve the token from cookies
    const response = await axios.get(`${API_BASE_URL}/fyter/messages-prv/`, {
        headers: {
            Authorization: `Bearer ${accessToken}`  // Send the token in the Authorization header
        }
    });
    return response.data;
};
export const postuler = async (projectId) => {
    const accessToken = Cookies.get('access_token');  // Retrieve token from cookies

    try {
        const response = await axios.post(
            `${API_BASE_URL}/fyter/postulate/${projectId}/`,  // Correct Backend URL
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`  // Attach token
                },
                withCredentials: true
            }
        );
        return response.data;  // Return response data
    } catch (error) {
        console.error("Error posting application:", error);
        throw error;
    }
};

export const getJustFreelancerServices = async (username) => {
  const accessToken = Cookies.get('access_token');  // Retrieve token from cookies
  if (!username) throw new Error('Username is required');

  const response = await axios.get(`${API_BASE_URL}/fyter/freelancer/services/${username}/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  return response.data;  // Freelancer's services
};

export const getClientProjectsByUsername = async (username) => {
  if (!username) throw new Error('Username is required');
  
  const accessToken = Cookies.get('access_token');  // Retrieve token from cookies
  
  try {
    const response = await axios.get(`${API_BASE_URL}/fyter/client/projects/${username}/`);
    
    return response.data;  // Client's projects
  } catch (error) {
    console.error("Error fetching client projects:", error);
    return [];
  }
};

export const getPublicFreelancers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/fyter/freelancers/`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching freelancers:", error);
        return [];  // fallback in case of error
    }
};

export const getStats = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/fyter/stats/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching stats:", error);
        return {
            users: 0,
            freelancers: 0,
            trainers: 0
        };
    }
};