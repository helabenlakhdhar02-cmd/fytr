'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaCheckCircle, FaTrophy, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

const FeaturedFytrs = ({ freelancers }) => {
  // Get top 3 freelancers based on rating and verification
  const getFeaturedFreelancers = () => {
    return [...freelancers]
      .filter(f => f.verified) // Only verified freelancers
      .sort((a, b) => {
        // Sort by rating first
        const ratingDiff = (b.rate || 0) - (a.rate || 0);
        if (ratingDiff !== 0) return ratingDiff;
        
        // Then by completed projects
        return (b.completed_projects || 0) - (a.completed_projects || 0);
      })
      .slice(0, 3); // Take top 3
  };

  // Render star rating
  const renderStarRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" size={14} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-400 opacity-50" size={14} />);
      } else {
        stars.push(<FaStar key={i} className="text-gray-300 dark:text-gray-600" size={14} />);
      }
    }

    return stars;
  };

  const featuredFreelancers = getFeaturedFreelancers();

  // If no featured freelancers, don't render the component
  if (featuredFreelancers.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-10"
    >
      <div className="flex items-center mb-6">
        <FaTrophy className="text-yellow-500 mr-2" size={20} />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Fytrs</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredFreelancers.map((freelancer, index) => (
          <motion.div
            key={freelancer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl overflow-hidden shadow-lg border border-blue-100 dark:border-blue-900 hover:shadow-xl transition-all duration-300"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="relative">
                  <img
                    src={freelancer.user?.profileImg || "/fighterfish.png"}
                    alt={freelancer.user?.full_name || "Freelancer"}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-md"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/fighterfish.png";
                    }}
                  />
                  <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1 rounded-full">
                    <FaCheckCircle size={14} />
                  </div>
                </div>

                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {freelancer.user?.full_name || "Anonymous Freelancer"}
                  </h3>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center">
                      {renderStarRating(freelancer.rate || 0)}
                      <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                        {freelancer.rate?.toFixed(1) || "0.0"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {freelancer.bio || "No bio available."}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {(freelancer.skills || '').split(',').map((skill, i) => skill.trim()).filter(Boolean).slice(0, 2).map((skill, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <Link
                href={`/freelancer/${freelancer.id}`}
                className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium mt-2"
              >
                View Profile <FaArrowRight className="ml-2" size={12} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FeaturedFytrs;
