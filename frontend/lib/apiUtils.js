import { API_BASE_URL, createAuthHeaders, createMultipartAuthHeaders } from '../config/api';
import Cookies from 'js-cookie';

/**
 * Utility function for making API requests
 * @param {string} endpoint - API endpoint (without base URL)
 * @param {Object} options - Fetch options
 * @param {boolean} requiresAuth - Whether the request requires authentication
 * @returns {Promise} - Fetch promise
 */
export const apiRequest = async (endpoint, options = {}, requiresAuth = false) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Set up headers
  const headers = options.headers || {};
  
  // Add authentication if required
  if (requiresAuth) {
    const token = Cookies.get('access_token');
    if (!token) {
      throw new Error('Authentication required but no token available');
    }
    
    // Check if it's a multipart form data request
    if (options.body instanceof FormData) {
      Object.assign(headers, createMultipartAuthHeaders(token));
    } else {
      Object.assign(headers, createAuthHeaders(token));
    }
  }
  
  // Merge headers with options
  const requestOptions = {
    ...options,
    headers
  };
  
  // Make the request
  const response = await fetch(url, requestOptions);
  
  // Handle response
  if (!response.ok) {
    // Handle 401 Unauthorized (token expired)
    if (response.status === 401 && requiresAuth) {
      // You could add token refresh logic here
      // For now, just throw an error
      throw new Error('Authentication failed or token expired');
    }
    
    // For other errors, try to parse the error message
    try {
      const errorData = await response.json();
      throw new Error(errorData.detail || `API request failed with status ${response.status}`);
    } catch (e) {
      throw new Error(`API request failed with status ${response.status}`);
    }
  }
  
  // Return JSON response if the request was successful
  return response.json();
};

/**
 * GET request helper
 * @param {string} endpoint - API endpoint (without base URL)
 * @param {boolean} requiresAuth - Whether the request requires authentication
 * @returns {Promise} - Fetch promise
 */
export const apiGet = (endpoint, requiresAuth = false) => {
  return apiRequest(endpoint, { method: 'GET' }, requiresAuth);
};

/**
 * POST request helper
 * @param {string} endpoint - API endpoint (without base URL)
 * @param {Object} data - Data to send
 * @param {boolean} requiresAuth - Whether the request requires authentication
 * @returns {Promise} - Fetch promise
 */
export const apiPost = (endpoint, data, requiresAuth = false) => {
  const options = {
    method: 'POST',
    body: data instanceof FormData ? data : JSON.stringify(data),
  };
  
  // Don't set Content-Type for FormData
  if (!(data instanceof FormData)) {
    options.headers = {
      'Content-Type': 'application/json'
    };
  }
  
  return apiRequest(endpoint, options, requiresAuth);
};

/**
 * PUT request helper
 * @param {string} endpoint - API endpoint (without base URL)
 * @param {Object} data - Data to send
 * @param {boolean} requiresAuth - Whether the request requires authentication
 * @returns {Promise} - Fetch promise
 */
export const apiPut = (endpoint, data, requiresAuth = false) => {
  const options = {
    method: 'PUT',
    body: data instanceof FormData ? data : JSON.stringify(data),
  };
  
  // Don't set Content-Type for FormData
  if (!(data instanceof FormData)) {
    options.headers = {
      'Content-Type': 'application/json'
    };
  }
  
  return apiRequest(endpoint, options, requiresAuth);
};

/**
 * DELETE request helper
 * @param {string} endpoint - API endpoint (without base URL)
 * @param {boolean} requiresAuth - Whether the request requires authentication
 * @returns {Promise} - Fetch promise
 */
export const apiDelete = (endpoint, requiresAuth = false) => {
  return apiRequest(endpoint, { method: 'DELETE' }, requiresAuth);
};