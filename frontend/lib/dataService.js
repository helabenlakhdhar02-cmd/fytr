/**
 * Professional Data Service Layer
 * Handles all API calls and data transformations
 * Senior Architecture: Separation of concerns, caching, error handling
 */

import { apiGet, apiPost, apiRequest } from './apiUtils';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';
import Cookies from 'js-cookie';

// Cache configuration
const CACHE = {
  FREELANCERS: 'freelancers_cache',
  PROJECTS: 'projects_cache',
  POSTS: 'posts_cache',
  COURSES: 'courses_cache',
  NOTIFICATIONS: 'notifications_cache',
};

const CACHE_DURATION = {
  FREELANCERS: 5 * 60 * 1000, // 5 minutes
  PROJECTS: 5 * 60 * 1000,
  POSTS: 3 * 60 * 1000, // 3 minutes (posts update more frequently)
  COURSES: 10 * 60 * 1000, // 10 minutes
  NOTIFICATIONS: 1 * 60 * 1000, // 1 minute
};

/**
 * Cache utility: Get cached data if valid, otherwise null
 */
const getCachedData = (key) => {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    
    const { data, timestamp } = JSON.parse(cached);
    const duration = CACHE_DURATION[key] || 5 * 60 * 1000;
    
    if (Date.now() - timestamp < duration) {
      return data;
    }
    
    localStorage.removeItem(key);
    return null;
  } catch (error) {
    console.warn('Cache retrieval error:', error);
    return null;
  }
};

/**
 * Cache utility: Store data in cache
 */
const setCachedData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify({
      data,
      timestamp: Date.now(),
    }));
  } catch (error) {
    console.warn('Cache storage error:', error);
  }
};

/**
 * Clear specific cache
 */
const clearCache = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn('Cache clear error:', error);
  }
};

// ============ FREELANCER SERVICE ============
export const freelancerService = {
  /**
   * Get all freelancers with optional filtering
   */
  async getAll(filters = {}) {
    const cacheKey = CACHE.FREELANCERS;
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const token = Cookies.get('access_token');
      const queryParams = new URLSearchParams(filters).toString();
      const endpoint = `${API_ENDPOINTS.FREELANCER_PROJECTS}${queryParams ? '?' + queryParams : ''}`;
      
      const data = await apiGet(endpoint, !!token);
      setCachedData(cacheKey, data);
      return data;
    } catch (error) {
      console.error('Error fetching freelancers:', error);
      throw error;
    }
  },

  /**
   * Get freelancer by ID
   */
  async getById(id) {
    try {
      const token = Cookies.get('access_token');
      return await apiGet(`/fyter/freelancers/${id}/`, !!token);
    } catch (error) {
      console.error(`Error fetching freelancer ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get freelancer profile for currently logged in user
   */
  async getProfile() {
    try {
      return await apiGet(API_ENDPOINTS.PROFILE, true);
    } catch (error) {
      console.error('Error fetching freelancer profile:', error);
      throw error;
    }
  },

  /**
   * Update freelancer profile
   */
  async updateProfile(data) {
    clearCache(CACHE.FREELANCERS);
    try {
      return await apiRequest(API_ENDPOINTS.PROFILE, {
        method: 'PUT',
        body: data instanceof FormData ? data : JSON.stringify(data),
      }, true);
    } catch (error) {
      console.error('Error updating freelancer profile:', error);
      throw error;
    }
  },

  /**
   * Get freelancer services
   */
  async getServices(freelancerId) {
    try {
      return await apiGet(`/fyter/freelancers/${freelancerId}/services/`, false);
    } catch (error) {
      console.error('Error fetching freelancer services:', error);
      throw error;
    }
  },
};

// ============ PROJECT SERVICE ============
export const projectService = {
  /**
   * Get all projects
   */
  async getAll(filters = {}) {
    const cacheKey = CACHE.PROJECTS;
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const token = Cookies.get('access_token');
      const queryParams = new URLSearchParams(filters).toString();
      const endpoint = `${API_ENDPOINTS.PROJECTS}${queryParams ? '?' + queryParams : ''}`;
      
      const data = await apiGet(endpoint, !!token);
      setCachedData(cacheKey, data);
      return data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  /**
   * Get project by ID
   */
  async getById(id) {
    try {
      const token = Cookies.get('access_token');
      return await apiGet(`${API_ENDPOINTS.PROJECTS}${id}/`, !!token);
    } catch (error) {
      console.error(`Error fetching project ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create new project
   */
  async create(projectData) {
    clearCache(CACHE.PROJECTS);
    try {
      return await apiPost(API_ENDPOINTS.PROJECTS, projectData, true);
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  /**
   * Update project
   */
  async update(id, projectData) {
    clearCache(CACHE.PROJECTS);
    try {
      return await apiRequest(`${API_ENDPOINTS.PROJECTS}${id}/`, {
        method: 'PUT',
        body: JSON.stringify(projectData),
      }, true);
    } catch (error) {
      console.error(`Error updating project ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete project
   */
  async delete(id) {
    clearCache(CACHE.PROJECTS);
    try {
      return await apiRequest(`${API_ENDPOINTS.PROJECTS}${id}/`, {
        method: 'DELETE',
      }, true);
    } catch (error) {
      console.error(`Error deleting project ${id}:`, error);
      throw error;
    }
  },
};

// ============ POST SERVICE ============
export const postService = {
  /**
   * Get all posts
   */
  async getAll(filters = {}) {
    const cacheKey = CACHE.POSTS;
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const queryParams = new URLSearchParams(filters).toString();
      const endpoint = `${API_ENDPOINTS.POSTS}${queryParams ? '?' + queryParams : ''}`;
      
      const data = await apiGet(endpoint, false);
      setCachedData(cacheKey, data);
      return data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  /**
   * Get post by ID
   */
  async getById(id) {
    try {
      return await apiGet(`${API_ENDPOINTS.POSTS}${id}/`, false);
    } catch (error) {
      console.error(`Error fetching post ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create new post
   */
  async create(postData) {
    clearCache(CACHE.POSTS);
    try {
      const formData = new FormData();
      formData.append('title', postData.title);
      formData.append('content', postData.content);
      
      if (postData.images && postData.images.length > 0) {
        postData.images.forEach((image, index) => {
          formData.append(`images`, image);
        });
      }

      return await apiPost(API_ENDPOINTS.POSTS, formData, true);
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },

  /**
   * Like a post
   */
  async like(postId, userId) {
    clearCache(CACHE.POSTS);
    try {
      return await apiPost(`${API_ENDPOINTS.POSTS}${postId}/like/`, { user_id: userId }, true);
    } catch (error) {
      console.error(`Error liking post ${postId}:`, error);
      throw error;
    }
  },

  /**
   * Unlike a post
   */
  async unlike(postId, userId) {
    clearCache(CACHE.POSTS);
    try {
      return await apiRequest(`${API_ENDPOINTS.POSTS}${postId}/unlike/`, {
        method: 'DELETE',
        body: JSON.stringify({ user_id: userId }),
      }, true);
    } catch (error) {
      console.error(`Error unliking post ${postId}:`, error);
      throw error;
    }
  },

  /**
   * Add comment to post
   */
  async addComment(postId, commentData) {
    clearCache(CACHE.POSTS);
    try {
      return await apiPost(`${API_ENDPOINTS.POSTS}${postId}/comments/`, commentData, true);
    } catch (error) {
      console.error(`Error adding comment to post ${postId}:`, error);
      throw error;
    }
  },
};

// ============ COURSE SERVICE ============
export const courseService = {
  /**
   * Get all courses
   */
  async getAll(filters = {}) {
    const cacheKey = CACHE.COURSES;
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const queryParams = new URLSearchParams(filters).toString();
      const endpoint = `${API_ENDPOINTS.ACADEMY}${queryParams ? '?' + queryParams : ''}`;
      
      const data = await apiGet(endpoint, false);
      setCachedData(cacheKey, data);
      return data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  },

  /**
   * Get course by ID
   */
  async getById(id) {
    try {
      return await apiGet(`${API_ENDPOINTS.ACADEMY}${id}/`, false);
    } catch (error) {
      console.error(`Error fetching course ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get course lessons
   */
  async getLessons(courseId) {
    try {
      return await apiGet(`${API_ENDPOINTS.ACADEMY}${courseId}/lessons/`, false);
    } catch (error) {
      console.error(`Error fetching lessons for course ${courseId}:`, error);
      throw error;
    }
  },

  /**
   * Enroll in course
   */
  async enroll(courseId) {
    clearCache(CACHE.COURSES);
    try {
      return await apiPost(`${API_ENDPOINTS.ACADEMY}${courseId}/enroll/`, {}, true);
    } catch (error) {
      console.error(`Error enrolling in course ${courseId}:`, error);
      throw error;
    }
  },

  /**
   * Get user's enrolled courses
   */
  async getMyCourses() {
    try {
      return await apiGet(`${API_ENDPOINTS.ACADEMY}my-courses/`, true);
    } catch (error) {
      console.error('Error fetching user courses:', error);
      throw error;
    }
  },
};

// ============ NOTIFICATION SERVICE ============
export const notificationService = {
  /**
   * Get all notifications for current user
   */
  async getAll() {
    const cacheKey = CACHE.NOTIFICATIONS;
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const data = await apiGet(API_ENDPOINTS.NOTIFICATIONS, true);
      setCachedData(cacheKey, data);
      return data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },

  /**
   * Mark notification as read
   */
  async markAsRead(notificationId) {
    clearCache(CACHE.NOTIFICATIONS);
    try {
      return await apiRequest(`${API_ENDPOINTS.NOTIFICATIONS}${notificationId}/read/`, {
        method: 'POST',
      }, true);
    } catch (error) {
      console.error(`Error marking notification ${notificationId} as read:`, error);
      throw error;
    }
  },

  /**
   * Mark all notifications as read
   */
  async markAllAsRead() {
    clearCache(CACHE.NOTIFICATIONS);
    try {
      return await apiPost(`${API_ENDPOINTS.NOTIFICATIONS}mark-all-read/`, {}, true);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  },
};

// ============ MESSAGE SERVICE ============
export const messageService = {
  /**
   * Get messages for a conversation
   */
  async getConversation(conversationId) {
    try {
      return await apiGet(`${API_ENDPOINTS.MESSAGES}${conversationId}/`, true);
    } catch (error) {
      console.error(`Error fetching conversation ${conversationId}:`, error);
      throw error;
    }
  },

  /**
   * Get all conversations for user
   */
  async getConversations() {
    try {
      return await apiGet(API_ENDPOINTS.MESSAGES, true);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      throw error;
    }
  },

  /**
   * Send message
   */
  async sendMessage(conversationId, messageData) {
    try {
      return await apiPost(`${API_ENDPOINTS.MESSAGES}${conversationId}/send/`, messageData, true);
    } catch (error) {
      console.error(`Error sending message in conversation ${conversationId}:`, error);
      throw error;
    }
  },
};

// ============ REVIEW SERVICE ============
export const reviewService = {
  /**
   * Get reviews for a project
   */
  async getForProject(projectId) {
    try {
      return await apiGet(`/fyter/projects/${projectId}/reviews/`, false);
    } catch (error) {
      console.error(`Error fetching reviews for project ${projectId}:`, error);
      throw error;
    }
  },

  /**
   * Get reviews for a freelancer
   */
  async getForFreelancer(freelancerId) {
    try {
      return await apiGet(`/fyter/freelancers/${freelancerId}/reviews/`, false);
    } catch (error) {
      console.error(`Error fetching reviews for freelancer ${freelancerId}:`, error);
      throw error;
    }
  },

  /**
   * Create review
   */
  async create(reviewData) {
    try {
      return await apiPost(API_ENDPOINTS.REVIEWS, reviewData, true);
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  },
};

// ============ DASHBOARD SERVICE ============
export const dashboardService = {
  /**
   * Get dashboard data for current user
   */
  async getDashboard() {
    try {
      return await apiGet(API_ENDPOINTS.DASHBOARD, true);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw error;
    }
  },

  /**
   * Get analytics
   */
  async getAnalytics(period = 'month') {
    try {
      return await apiGet(`${API_ENDPOINTS.DASHBOARD}analytics/?period=${period}`, true);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }
  },
};

// ============ PAYMENT SERVICE ============
export const paymentService = {
  /**
   * Create a new payment
   * @param {Object} paymentData - Payment details
   * @param {string} paymentData.payment_type - Type of payment (project, service, course)
   * @param {number} paymentData.total_amount - Total amount
   * @param {number} paymentData.receiver_id - ID of receiver (freelancer/trainer)
   * @param {number} paymentData.project_id - Project ID (if applicable)
   * @param {number} paymentData.service_id - Service ID (if applicable)
   * @param {string} paymentData.transaction_ref - Transaction reference number
   */
  async create(paymentData) {
    clearCache(CACHE.NOTIFICATIONS);
    try {
      const response = await apiPost(
        `${API_ENDPOINTS.PAYMENTS}create/`,
        paymentData,
        true
      );
      return response;
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  },

  /**
   * Get all payments for current user
   */
  async getMyPayments(filters = {}) {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const endpoint = `${API_ENDPOINTS.PAYMENTS}${queryParams ? '?' + queryParams : ''}`;
      
      const data = await apiGet(endpoint, true);
      return Array.isArray(data) ? data : (data.results || []);
    } catch (error) {
      console.error('Error fetching payments:', error);
      throw error;
    }
  },

  /**
   * Get payment history (received payments)
   */
  async getReceivedPayments(filters = {}) {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const endpoint = `${API_ENDPOINTS.PAYMENTS}received/${queryParams ? '?' + queryParams : ''}`;
      
      const data = await apiGet(endpoint, true);
      return Array.isArray(data) ? data : (data.results || []);
    } catch (error) {
      console.error('Error fetching received payments:', error);
      throw error;
    }
  },

  /**
   * Get payment by ID
   */
  async getById(id) {
    try {
      return await apiGet(`${API_ENDPOINTS.PAYMENTS}${id}/`, true);
    } catch (error) {
      console.error(`Error fetching payment ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get payment status
   */
  async getStatus(paymentId) {
    try {
      return await apiGet(`${API_ENDPOINTS.PAYMENTS}${paymentId}/status/`, true);
    } catch (error) {
      console.error(`Error fetching payment status for ${paymentId}:`, error);
      throw error;
    }
  },

  /**
   * Verify payment with transaction reference
   */
  async verify(paymentData) {
    try {
      return await apiPost(
        `${API_ENDPOINTS.PAYMENTS}verify/`,
        paymentData,
        true
      );
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  },

  /**
   * Get payment summary/stats for dashboard
   */
  async getSummary() {
    try {
      return await apiGet(`${API_ENDPOINTS.PAYMENTS}summary/`, true);
    } catch (error) {
      console.error('Error fetching payment summary:', error);
      throw error;
    }
  },

  /**
   * Cancel a pending payment
   */
  async cancel(paymentId) {
    try {
      return await apiRequest(
        `${API_ENDPOINTS.PAYMENTS}${paymentId}/cancel/`,
        { method: 'POST' },
        true
      );
    } catch (error) {
      console.error(`Error canceling payment ${paymentId}:`, error);
      throw error;
    }
  },

  /**
   * Enroll in course with payment
   */
  async enrollCourse(courseId, paymentData) {
    clearCache(CACHE.COURSES);
    try {
      return await apiPost(
        `${API_ENDPOINTS.ACADEMY}${courseId}/enroll/`,
        paymentData,
        true
      );
    } catch (error) {
      console.error(`Error enrolling in course ${courseId}:`, error);
      throw error;
    }
  },

  /**
   * Calculate platform fees
   */
  calculateFees(amount, type = 'project') {
    const feePercentage = type === 'course' ? 0.25 : 0.15; // 25% for courses, 15% for projects
    const platformFee = amount * feePercentage;
    const receiverAmount = amount - platformFee;
    
    return {
      totalAmount: amount,
      platformFee: parseFloat(platformFee.toFixed(2)),
      receiverAmount: parseFloat(receiverAmount.toFixed(2)),
      feePercentage: feePercentage * 100,
    };
  },
};

export default {
  freelancerService,
  projectService,
  postService,
  courseService,
  notificationService,
  messageService,
  reviewService,
  dashboardService,
  paymentService,
  clearCache,
  getCachedData,
};
