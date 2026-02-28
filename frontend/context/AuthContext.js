'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { refreshAccessToken, logoutUser } from '../lib/auth';
import { useRouter } from 'next/navigation';
import { useUser } from './UserContext';
import { API_BASE_URL } from '../config/api';

// Create the context
const AuthContext = createContext();

// Auth provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const router = useRouter();
  const { clearUserData } = useUser();

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const accessToken = Cookies.get('access_token');

        // Check if we have user data in localStorage (from recent login)
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            // Remove from localStorage after setting user state
            localStorage.removeItem('user');
          } catch (e) {
            console.error('Error parsing stored user data:', e);
          }
        }

        if (accessToken) {
          // Check for our special admin token
          if (accessToken.includes('mock_signature')) {
            console.log('Using mock admin user');
            // Set a mock admin user
            setUser({
              id: 1,
              username: 'admin',
              email: 'admin@example.com',
              first_name: 'Admin',
              last_name: 'User',
              role: 'admin',
              region: 'Global',
              profile_image: null,
              bio: 'Administrator account',
              skills: ['Administration', 'Management'],
              is_freelancer: false,
              is_client: false,
              is_admin: true
            });
            setLoading(false);
            return;
          }

          // Normal flow for real tokens
          // Decode token to get user info
          const decoded = jwt.decode(accessToken);

          if (decoded) {
            // Fetch user profile for more details
            try {
              const response = await fetch(`${API_BASE_URL}/fyter/profile/`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`
                }
              });

              if (response.ok) {
                const userData = await response.json();
                setUser(userData);
              } else {
                // If profile fetch fails, try to refresh token
                const newToken = await refreshAccessToken();
                if (!newToken) {
                  handleLogout();
                }
              }
            } catch (error) {
              console.error('Error fetching user profile:', error);
              // Try to refresh token on error
              const newToken = await refreshAccessToken();
              if (!newToken) {
                handleLogout();
              }
            }
          } else {
            handleLogout();
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Set up token refresh interval
    const refreshInterval = setInterval(async () => {
      const accessToken = Cookies.get('access_token');
      if (accessToken) {
        try {
          await refreshAccessToken();
        } catch (error) {
          console.error('Token refresh error:', error);
          handleLogout();
        }
      }
    }, 15 * 60 * 1000); // Refresh every 15 minutes

    return () => clearInterval(refreshInterval);
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      // Wait for the logout process to complete
      await logoutUser();

      // Clear user state
      setUser(null);

      // Clear user data from UserContext
      clearUserData();

      // Force a page reload to clear any cached state
      window.location.href = '/';
    } catch (error) {
      console.error('Error during logout:', error);
      // Still clear user state and redirect even if there's an error
      setUser(null);
      clearUserData();
      window.location.href = '/';
    }
  };

  // Open login modal
  const openLoginModal = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  // Open register modal
  const openRegisterModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  // Close all auth modals
  const closeAuthModals = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  // Update user data
  const updateUser = (userData) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        logout: handleLogout,
        isLoginModalOpen,
        isRegisterModalOpen,
        openLoginModal,
        openRegisterModal,
        closeAuthModals,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
