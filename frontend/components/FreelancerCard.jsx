"use client";
import React, { memo } from "react";
import { motion } from "framer-motion";
import { FaStar, FaMapMarkerAlt, FaCheckCircle, FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";

// Define the component
const FreelancerCardComponent = ({ freelancer, index }) => {
  // Log rendering for debugging purposes
  console.log(`Rendering FreelancerCard for ${freelancer.user?.full_name || "Anonymous Freelancer"}`);
  // Function to render star rating
  const renderStarRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-400 opacity-50" />);
      } else {
        stars.push(<FaStar key={i} className="text-gray-300 dark:text-gray-600" />);
      }
    }

    return stars;
  };

  // Function to determine level badge color
  const getLevelBadgeColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'advanced':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'expert':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 flex flex-col h-full"
    >
      <div className="relative p-6 pb-0">
        {/* Verification Badge */}
        {freelancer.verified && (
          <div className="absolute top-4 right-4 text-primary-600 dark:text-primary-400 flex items-center">
            <FaCheckCircle className="mr-1" />
            <span className="text-xs font-medium">Verified</span>
          </div>
        )}

        {/* Freelancer Header */}
        <div className="flex items-center mb-4">
          <div className="relative">
            <img
              src={freelancer.user?.profileImg || "/fighterfish.png"}
              alt={freelancer.user?.full_name || "Freelancer"}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/fighterfish.png";
              }}
            />
            {/* Level Badge */}
            <div className={`absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full text-xs font-medium ${getLevelBadgeColor(freelancer.level)}`}>
              {freelancer.level || "Beginner"}
            </div>
          </div>

          <div className="ml-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {freelancer.user?.full_name || "Anonymous Freelancer"}
            </h3>

            {/* Rating */}
            <div className="flex items-center mt-1">
              <div className="flex">
                {renderStarRating(freelancer.rate || 0)}
              </div>
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                ({freelancer.rate || "0.0"})
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Freelancer Content */}
      <div className="p-6 pt-2 flex-grow">
        {/* Bio */}
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {freelancer.bio || "No bio available for this freelancer."}
        </p>

        {/* Skills */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {freelancer.skills ? (
              freelancer.skills.split(',').map((skill, i) => (
                <span
                  key={i}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-1 rounded-md text-xs"
                >
                  {skill.trim()}
                </span>
              ))
            ) : (
              <span className="text-gray-500 dark:text-gray-400 text-sm italic">No skills listed</span>
            )}
          </div>
        </div>

        {/* Hourly Rate */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Hourly Rate</span>
          <span className="font-bold text-gray-900 dark:text-white">${freelancer.rate || "0"}/hr</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
        <div className="flex justify-between">
          {freelancer.portfolio_link ? (
            <a
              href={freelancer.portfolio_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-400 text-sm hover:underline flex items-center"
            >
              Portfolio
              <FaExternalLinkAlt size={12} className="ml-1" />
            </a>
          ) : (
            <span className="text-gray-400 dark:text-gray-500 text-sm">No portfolio</span>
          )}

          <Link href={`/freelancer/${freelancer.id || freelancer.user?.id || "profile"}`} passHref>
            <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-300 text-sm font-medium">
              View Profile
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// Create memoized version of the component
// This prevents unnecessary re-renders when props haven't changed
const FreelancerCard = memo(FreelancerCardComponent, (prevProps, nextProps) => {
  // Custom comparison function to determine if component should re-render
  // Return true if props are equal (no re-render needed)
  // Return false if props are different (re-render needed)
  return (
    prevProps.freelancer?.user?.username === nextProps.freelancer?.user?.username &&
    prevProps.index === nextProps.index &&
    prevProps.freelancer?.rate === nextProps.freelancer?.rate &&
    prevProps.freelancer?.bio === nextProps.freelancer?.bio &&
    prevProps.freelancer?.skills === nextProps.freelancer?.skills
  );
});

export default FreelancerCard;
