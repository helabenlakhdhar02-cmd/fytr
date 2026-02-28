'use client';

import { motion } from 'framer-motion';
import { FaArrowRight, FaLightbulb } from 'react-icons/fa';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

export default function FytrsCTA() {
  const { isAuthenticated, openRegisterModal } = useAuth();

  // Handle post task button click
  const handlePostTaskClick = () => {
    if (!isAuthenticated) {
      openRegisterModal();
    }
    // If user is authenticated, they will be redirected via the link
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-900 rounded-xl overflow-hidden shadow-lg"
    >
      <div className="relative p-8 md:p-12">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white"></div>
          <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-white"></div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-8">
            <div className="flex items-center mb-2">
              <FaLightbulb className="text-yellow-300 mr-2" size={20} />
              <h3 className="text-xl md:text-2xl font-bold text-white">Didn't find the right match?</h3>
            </div>
            <p className="text-white/80 max-w-xl">
              Post your task and let qualified Fytrs come to you. Describe your project, set your budget, and receive proposals from talented freelancers ready to help.
            </p>
          </div>

          <Link
            href={isAuthenticated ? "/post-task" : "#"}
            onClick={!isAuthenticated ? handlePostTaskClick : undefined}
            className="bg-white text-primary-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium flex items-center transition-colors shadow-md hover:shadow-lg whitespace-nowrap"
          >
            Post a Task
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
