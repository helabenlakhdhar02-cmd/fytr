'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaArrowRight, FaUserPlus, FaBriefcase, FaTrophy } from 'react-icons/fa';
import Link from 'next/link';

export default function FytrsSidebar({ freelancers }) {
  const [activeTab, setActiveTab] = useState('top-rated');

  // Define animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  // Get top rated freelancers
  const getTopRated = () => {
    return [...freelancers]
      .sort((a, b) => (b.rate || 0) - (a.rate || 0))
      .slice(0, 5);
  };

  // Get newcomer freelancers
  const getNewcomers = () => {
    // In a real environment, we would use join date
    // Here we use freelancer ID as a proxy (assuming higher IDs are newer)
    return [...freelancers]
      .sort((a, b) => (b.id || 0) - (a.id || 0))
      .slice(0, 5);
  };

  // Get most hired freelancers
  const getMostHired = () => {
    return [...freelancers]
      .sort((a, b) => (b.completed_projects || 0) - (a.completed_projects || 0))
      .slice(0, 5);
  };

  // Get suggested freelancers
  const getSuggested = () => {
    // In a real environment, we would use a recommendation algorithm
    // Here we use a mix of rating and number of projects
    return [...freelancers]
      .sort((a, b) => {
        const scoreA = (a.rate || 0) * 0.7 + (a.completed_projects || 0) * 0.3;
        const scoreB = (b.rate || 0) * 0.7 + (b.completed_projects || 0) * 0.3;
        return scoreB - scoreA;
      })
      .slice(0, 5);
  };

  // Get freelancers based on active tab
  const getFreelancersByTab = () => {
    switch (activeTab) {
      case 'top-rated':
        return getTopRated();
      case 'newcomers':
        return getNewcomers();
      case 'most-hired':
        return getMostHired();
      case 'suggested':
        return getSuggested();
      default:
        return getTopRated();
    }
  };

  // Render star rating
  const renderStarRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" size={12} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-400 opacity-50" size={12} />);
      } else {
        stars.push(<FaStar key={i} className="text-gray-300 dark:text-gray-600" size={12} />);
      }
    }

    return stars;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 sticky top-32"
    >
      {/* Sidebar header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Fytr Suggestions</h3>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        <button
          onClick={() => setActiveTab('top-rated')}
          className={`flex-1 py-3 px-4 text-sm font-medium ${activeTab === 'top-rated'
              ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
        >
          Top Rated
        </button>
        <button
          onClick={() => setActiveTab('newcomers')}
          className={`flex-1 py-3 px-4 text-sm font-medium ${activeTab === 'newcomers'
              ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
        >
          Newcomers
        </button>
        <button
          onClick={() => setActiveTab('most-hired')}
          className={`flex-1 py-3 px-4 text-sm font-medium ${activeTab === 'most-hired'
              ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
        >
          Most Hired
        </button>
      </div>

      {/* Freelancers list */}
      <motion.div
        key={activeTab}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-4 space-y-4 max-h-96 overflow-y-auto"
      >
        {getFreelancersByTab().map((freelancer, index) => (
          <motion.div
            key={freelancer.id || index}
            variants={itemVariants}
            className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
          >
            {/* Freelancer image */}
            <img
              src={freelancer.user?.profileImg || "/fighterfish.png"}
              alt={freelancer.user?.full_name || "Freelancer"}
              className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/fighterfish.png";
              }}
            />

            {/* Freelancer information */}
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {freelancer.user?.full_name || "Anonymous Freelancer"}
              </p>
              <div className="flex items-center mt-1">
                <div className="flex items-center">
                  {renderStarRating(freelancer.rate || 0)}
                </div>
                <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                  {Number.isFinite(+freelancer.rate) ? (+freelancer.rate).toFixed(1) : "0.0"}
                </span>
              </div>
            </div>

            {/* Profile link */}
            <Link
              href={`/freelancer/${freelancer.id}`}
              className="ml-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
            >
              <FaArrowRight size={14} />
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick stats */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Stats</h4>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white dark:bg-gray-700 p-3 rounded-lg text-center">
            <FaUserPlus className="mx-auto text-primary-600 dark:text-primary-400 mb-1" />
            <p className="text-xs text-gray-500 dark:text-gray-400">Total Fytrs</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{freelancers.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-3 rounded-lg text-center">
            <FaBriefcase className="mx-auto text-green-600 dark:text-green-400 mb-1" />
            <p className="text-xs text-gray-500 dark:text-gray-400">Available</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {freelancers.filter(f => f.availability !== false).length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-3 rounded-lg text-center">
            <FaTrophy className="mx-auto text-yellow-600 dark:text-yellow-400 mb-1" />
            <p className="text-xs text-gray-500 dark:text-gray-400">Top Rated</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {freelancers.filter(f => (f.rate || 0) >= 4.5).length}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
