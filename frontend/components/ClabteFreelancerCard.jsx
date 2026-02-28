'use client';

import React from 'react';
import { motion } from 'framer-motion';
import StarRating from './ui/StarRating';
import { FaCheckCircle } from 'react-icons/fa';

/**
 * Card component for displaying a freelancer in a Clabte
 * @param {Object} props
 * @param {Object} props.freelancer - Freelancer data
 * @param {boolean} props.isSelected - Whether this freelancer was selected by the client
 * @param {number} props.index - Index for animation delay
 */
const ClabteFreelancerCard = ({ freelancer, isSelected = false, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border ${
        isSelected 
          ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20' 
          : freelancer.rating < 3 
            ? 'border-red-200 dark:border-red-900/30' 
            : 'border-gray-200 dark:border-gray-700'
      } flex flex-col h-full`}
    >
      <div className="p-6">
        {/* Freelancer Header */}
        <div className="flex items-center mb-4">
          <div className="relative">
            <img
              src={freelancer.profileImg || "/fighterfish.png"}
              alt={freelancer.name || "Freelancer"}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/fighterfish.png";
              }}
            />
            
            {/* Selected Badge */}
            {isSelected && (
              <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1">
                <FaCheckCircle size={16} />
              </div>
            )}
          </div>
          
          <div className="ml-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {freelancer.name}
            </h3>
            
            {/* Rating */}
            <div className="flex items-center mt-1">
              {isSelected ? (
                <span className="text-green-600 dark:text-green-400 font-medium text-sm">
                  Rating: 0 (Chosen by Client)
                </span>
              ) : (
                <>
                  <StarRating rating={freelancer.rating} />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    ({freelancer.rating.toFixed(1)})
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Feedback from client */}
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Client Feedback</h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm italic">
            "{freelancer.feedback || "No feedback provided."}"
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ClabteFreelancerCard;
