'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiImage, FiVideo, FiFileText, FiMapPin, FiSmile, FiPaperclip } from 'react-icons/fi';
import { FaGlobeAmericas, FaBriefcase, FaPencilAlt, FaUser } from 'react-icons/fa';
import AddPostModel from '../Pages/AddPostModel';
import { API_BASE_URL } from '../../config/api';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

export default function StatusBox({ setUpdated }) {
  const router = useRouter();
  const { isAuthenticated, openLoginModal } = useAuth();
  const [updated, setUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Handle update state
  if (updated) {
    setUpdated(true);
    setUpdate(false);
  }

  // Toggle modal
  const toggleModal = () => {
    if (!isAuthenticated) {
      openLoginModal();
      return;
    }
    setShowModal(!showModal);
  };

  // Get user from token
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const accessToken = Cookies.get('access_token');
        if (accessToken) {
          const decoded = jwt.decode(accessToken);
          if (decoded && decoded.user) {
            setUser(decoded.user);
          } else {
            console.warn("Invalid token format or missing user data");
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 w-full animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>
        <div className="flex justify-between mt-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  // If not authenticated, show a simplified version
  if (!isAuthenticated) {
    return (
      <motion.div
        className="card bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 w-full border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg dashboard-section"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex items-center gap-4">
          {/* Default Avatar */}
          <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white overflow-hidden shadow-md border-2 border-white dark:border-gray-700">
            <FaUser className="text-xl" />
          </div>

          {/* Status Input */}
          <div
            onClick={openLoginModal}
            className="flex-1 bg-gray-50 dark:bg-gray-700 px-5 py-4 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 shadow-sm hover:shadow border border-gray-200 dark:border-gray-600 group"
          >
            <div className="flex items-center">
              <p className="text-gray-500 dark:text-gray-400 font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                Login to share your thoughts...
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="card bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 w-full border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg dashboard-section"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex items-center gap-4">
        {/* User Avatar */}
        <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white overflow-hidden shadow-md border-2 border-white dark:border-gray-700 transform transition-transform hover:scale-105">
          {user && user.profileImg ? (
            <img
              src={`${API_BASE_URL}${user.profileImg}`}
              alt={user?.username || 'User'}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/fighterfish.png";
              }}
            />
          ) : (
            <FaUser className="w-6 h-6" />
          )}
        </div>

        {/* Status Input */}
        <div
          onClick={toggleModal}
          className="flex-1 bg-gray-50 dark:bg-gray-700 px-5 py-4 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-opacity-50 shadow-sm hover:shadow border border-gray-200 dark:border-gray-600 group"
        >
          <div className="flex items-center">
            <p className="text-gray-500 dark:text-gray-400 font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              What's on your mind, {user?.username?.split(' ')[0] || 'there'}?
            </p>
            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Modal */}
        <AddPostModel 
          show={showModal} 
          onHide={toggleModal} 
          user={user || {}} 
          setUpdated={setUpdate} 
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-around mt-4 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 pt-3">
        <motion.button
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 group"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <FiImage className="text-primary-500 text-lg group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline text-sm font-medium">Photos</span>
        </motion.button>

        <motion.button
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <FiVideo className="text-blue-500 text-lg group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline text-sm font-medium">Video</span>
        </motion.button>

        <motion.button
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-300 group"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <FiFileText className="text-amber-500 text-lg group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline text-sm font-medium">Document</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
