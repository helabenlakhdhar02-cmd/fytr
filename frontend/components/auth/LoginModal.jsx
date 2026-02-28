'use client';

import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { loginUser } from '../../lib/auth';
import Modal from '../ui/Modal';
import { motion } from 'framer-motion';

export default function LoginModal({ isOpen, onClose, onSwitchToRegister }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user types
    if (error) setError('');
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Validate input
      if (!formData.email || !formData.password) {
        setError('Please enter both email and password');
        setIsLoading(false);
        return;
      }

      console.log('Attempting login with:', { email: formData.email });

     
      // Normal login flow
      const response = await loginUser(formData);
      console.log('Login response:', response.data);

      // Set cookies with proper configuration
      Cookies.set('access_token', response.data.access, { expires: 1 });
      Cookies.set('refresh_token', response.data.refresh, { expires: 7 });

      onClose(); // Close the modal

      // Store user data in localStorage for immediate access
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      // Check if this is the first login
      if (response.data.user && response.data.user.first_login) {
        console.log('First login detected, redirecting to setup page');
        // You can redirect to a setup page or handle first login differently
        // For now, we'll just redirect to the dashboard with a full page reload
        window.location.href = '/dashboard/home';
      } else {
        // Regular login flow with a full page reload
        window.location.href = '/dashboard/home';
      }
    } catch (error) {
      console.error('Login failed', error);
      // More detailed error handling
      if (error.response) {
        console.error('Error response:', error.response.data);
        setError(error.response.data.detail || 'Login failed. Please check your credentials.');
      } else if (error.request) {
        console.error('Error request:', error.request);
        setError('Network error. Please check your connection.');
      } else {
        console.error('Error message:', error.message);
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showHeader={false}
      imageSrc="/photos/fighterfish.jpg"
    >
      <div className="w-full max-w-sm mx-auto px-2 py-3">
        <div className="text-center mb-2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Welcome Back</h2>
            <p className="text-gray-600 dark:text-gray-400 text-xs">
              Sign in to continue your journey
            </p>
          </motion.div>
        </div>

        {error && (
          <motion.div
            className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-2 rounded-md text-xs mb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="mb-2">
            <label className="block text-gray-700 dark:text-gray-300 mb-0.5 text-xs">
              Username
            </label>
            <input
              type="text"
              name="email"
              className="w-full px-3 py-1.5 border rounded-lg focus:outline-none text-black focus:ring-1 focus:ring-blue-500 text-sm"
              placeholder="username"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="mb-2">
            <label className="block text-gray-700 dark:text-gray-300 mb-0.5 text-xs">
              Password
            </label>
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full px-3 py-1.5 border rounded-lg focus:outline-none text-black focus:ring-1 focus:ring-blue-500 pr-10 text-sm"
                  placeholder="at least 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                </button>
              </div>
              <a href="/reset-password" className="flex justify-end text-blue-500 text-xs mt-0.5 hover:underline">
                Forgot Password?
              </a>
            </div>
          </div>

          <motion.button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg transition-all duration-300 flex items-center justify-center font-medium text-sm shadow-sm hover:shadow mt-1"
            disabled={isLoading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </motion.button>
        </form>

        <div className="my-1 text-center text-gray-500 dark:text-gray-400 text-xs">Or</div>

        <div className="space-y-2">
          <motion.button
            className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 py-1.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 shadow-sm hover:shadow"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <FcGoogle className="text-lg" />
            <span className="text-xs font-medium">Continue with Google</span>
          </motion.button>
          <motion.button
            className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 py-1.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 shadow-sm hover:shadow"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <FaFacebook className="text-blue-600 text-lg" />
            <span className="text-xs font-medium">Continue with Facebook</span>
          </motion.button>
        </div>

        <div className="text-center mt-2">
          <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">
            Don't have an account yet?
          </p>
          <motion.button
            onClick={onSwitchToRegister}
            className="text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 focus:outline-none transition-colors px-3 py-1 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 text-xs"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.97 }}
          >
            Create a free account
          </motion.button>
        </div>
      </div>
    </Modal>
  );
}
