'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaStar, FaMapMarkerAlt, FaCheckCircle, FaBriefcase, FaExternalLinkAlt,
  FaUser, FaHeart, FaRegHeart, FaCertificate, FaProjectDiagram
} from 'react-icons/fa';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

export default function FytrCard({ freelancer, index, viewMode = 'grid', onFavoriteToggle }) {
  const { isAuthenticated, openRegisterModal } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  // Determine if this is a trainer (formateur) or a freelancer
  const isTrainer = freelancer.role === 'formateur';
  const userTypeLabel = isTrainer ? 'Trainer' : 'Freelancer';

  // Check if freelancer is in favorites when component loads
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const favorites = JSON.parse(localStorage.getItem('fytrFavorites') || '[]');
      setIsFavorite(favorites.some(fav => fav.id === freelancer.id));
    }
  }, [freelancer.id]);

  // Toggle favorite status
  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      openRegisterModal();
      return;
    }

    const favorites = JSON.parse(localStorage.getItem('fytrFavorites') || '[]');

    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter(fav => fav.id !== freelancer.id);
      localStorage.setItem('fytrFavorites', JSON.stringify(updatedFavorites));
    } else {
      // Add to favorites
      const updatedFavorites = [...favorites, {
        id: freelancer.id,
        name: freelancer.user?.full_name || `Anonymous ${userTypeLabel}`,
        profileImg: freelancer.user?.profileImg || "/fighterfish.png",
        skills: freelancer.skills,
        rate: freelancer.rate,
        level: freelancer.level,
        role: freelancer.role,
        timestamp: new Date().toISOString()
      }];
      localStorage.setItem('fytrFavorites', JSON.stringify(updatedFavorites));
    }

    setIsFavorite(!isFavorite);

    // Call external function if provided
    if (onFavoriteToggle) {
      onFavoriteToggle(freelancer.id, !isFavorite);
    }
  };

  // Determine rank badge color and style
  const getRankBadge = (level) => {
    const levelLower = (level || '').toLowerCase();

    if (levelLower === 'expert' || levelLower === 'halfmoon') {
      return {
        name: 'Platinum',
        color: 'text-purple-700 dark:text-purple-400',
        bgColor: 'bg-purple-100 dark:bg-purple-900/30',
        borderColor: 'border-purple-300 dark:border-purple-700'
      };
    } else if (levelLower === 'intermediate' || levelLower === 'crowntail' || levelLower === 'advanced') {
      return {
        name: 'Gold',
        color: 'text-yellow-700 dark:text-yellow-400',
        bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
        borderColor: 'border-yellow-300 dark:border-yellow-700'
      };
    } else {
      return {
        name: 'Silver',
        color: 'text-blue-700 dark:text-blue-400',
        bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        borderColor: 'border-blue-300 dark:border-blue-700'
      };
    }
  };

  // Render star rating
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

  // Define animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: index * 0.05
      }
    }
  };

  // Get rank badge information
  const rankBadge = getRankBadge(freelancer.level);

  // Handle hire button click
  const handleHireClick = () => {
    if (!isAuthenticated) {
      openRegisterModal();
    } else {
      // Redirect user to hiring page or open dialog based on role
      const profilePath = isTrainer ? `/trainer/${freelancer.id}` : `/freelancer/${freelancer.id}`;
      window.location.href = profilePath;
    }
  };

  // Handle view certifications click
  const handleViewCertifications = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      openRegisterModal();
    } else {
      // Redirect to profile with certifications tab active based on role
      const profilePath = isTrainer ? `/trainer/${freelancer.id}?tab=certifications` : `/freelancer/${freelancer.id}?tab=certifications`;
      window.location.href = profilePath;
    }
  };

  // Handle view portfolio click
  const handleViewPortfolio = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      openRegisterModal();
    } else {
      // Redirect to profile with portfolio tab active based on role
      const profilePath = isTrainer ? `/trainer/${freelancer.id}?tab=portfolio` : `/freelancer/${freelancer.id}?tab=portfolio`;
      window.location.href = profilePath;
    }
  };

  // Split skills into array
  const skills = (freelancer.skills || '').split(',').map(skill => skill.trim()).filter(Boolean);

  // Get certifications count
  const certificationsCount = freelancer.certifications?.length || 0;

  // Get projects count
  const projectsCount = freelancer.projects?.length || 0;

  // Display card in grid mode
  if (viewMode === 'grid') {
    return (
      <motion.div
        variants={cardVariants}
        className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-2 ${rankBadge.borderColor} flex flex-col h-full group`}
        whileHover={{
          y: -8,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          transition: { duration: 0.3, ease: "easeOut" }
        }}
      >
        <div className="p-6">
          {/* Card header */}
          <div className="flex items-center mb-4">
            <div className="relative">
              <img
                src={freelancer.user?.profileImg || "/fighterfish.png"}
                alt={freelancer.user?.full_name || userTypeLabel}
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/fighterfish.png";
                }}
              />

              {/* Rank badge */}
              <div className={`absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full text-xs font-medium ${rankBadge.bgColor} ${rankBadge.color}`}>
                {rankBadge.name}
              </div>
            </div>

            <div className="ml-4 flex-1">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {freelancer.user?.full_name || `Anonymous ${userTypeLabel}`}
                </h3>

                {/* Favorite button */}
                <button
                  onClick={toggleFavorite}
                  className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors p-1"
                  aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  {isFavorite ? (
                    <FaHeart className="text-red-500 dark:text-red-400" size={18} />
                  ) : (
                    <FaRegHeart size={18} />
                  )}
                </button>
              </div>

              <div className="flex items-center mt-1">
                {/* Rating */}
                <div className="flex items-center">
                  {renderStarRating(freelancer.rate || 0)}
                  <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                    {Number.isFinite(+freelancer.rate) ? (+freelancer.rate).toFixed(1) : "0.0"}
                  </span>
                </div>

                {/* Verification */}
                {freelancer.verified && (
                  <div className="ml-2 text-primary-600 dark:text-primary-400 flex items-center">
                    <FaCheckCircle className="mr-1" size={14} />
                    <span className="text-xs font-medium">Verified</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bio */}
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {freelancer.bio || "No bio available."}
          </p>

          {/* Skills */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {skills.slice(0, 3).map((skill, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                >
                  {skill}
                </span>
              ))}
              {skills.length > 3 && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                  +{skills.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Additional information */}
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
            {/* Location */}
            {freelancer.region && (
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-1" size={14} />
                <span>{freelancer.region}</span>
              </div>
            )}

            {/* Completed projects */}
            <div className="flex items-center">
              <FaBriefcase className="mr-1" size={14} />
              <span>{freelancer.completed_projects || 0} Projects</span>
            </div>
          </div>

          {/* Certifications and Projects */}
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
            {/* Certifications */}
            <button
              onClick={handleViewCertifications}
              className="flex items-center hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <FaCertificate className="mr-1" size={14} />
              <span>{certificationsCount} Certifications</span>
            </button>

            {/* Portfolio Projects */}
            <button
              onClick={handleViewPortfolio}
              className="flex items-center hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <FaProjectDiagram className="mr-1" size={14} />
              <span>{projectsCount} Portfolio Items</span>
            </button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-auto border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50 flex gap-2">
          <button
            onClick={handleHireClick}
            className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium"
          >
            Hire Now
          </button>

          <Link
            href={isTrainer ? `/trainer/${freelancer.id}` : `/freelancer/${freelancer.id}`}
            className="flex items-center justify-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
          >
            View Profile
          </Link>
        </div>
      </motion.div>
    );
  }

  // Display card in list mode
  return (
    <motion.div
      variants={cardVariants}
      className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-l-4 ${rankBadge.borderColor} flex flex-col md:flex-row h-full group`}
      whileHover={{
        x: 4,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      {/* User image (Freelancer/Trainer) */}
      <div className="md:w-1/4 p-6 flex flex-col items-center justify-center">
        <div className="relative">
          <img
            src={freelancer.user?.profileImg || "/fighterfish.png"}
            alt={freelancer.user?.full_name || userTypeLabel}
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/fighterfish.png";
            }}
          />

          {/* Rank badge */}
          <div className={`absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full text-xs font-medium ${rankBadge.bgColor} ${rankBadge.color}`}>
            {rankBadge.name}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {freelancer.user?.full_name || `Anonymous ${userTypeLabel}`}
          </h3>

          {/* Favorite button */}
          <button
            onClick={toggleFavorite}
            className="ml-2 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors p-1"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? (
              <FaHeart className="text-red-500 dark:text-red-400" size={16} />
            ) : (
              <FaRegHeart size={16} />
            )}
          </button>
        </div>

        <div className="flex items-center mt-1">
          {/* Rating */}
          <div className="flex items-center">
            {renderStarRating(freelancer.rate || 0)}
            <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
              {freelancer.rate?.toFixed(1) || "0.0"}
            </span>
          </div>

          {/* Verification */}
          {freelancer.verified && (
            <div className="ml-2 text-primary-600 dark:text-primary-400 flex items-center">
              <FaCheckCircle className="mr-1" size={14} />
              <span className="text-xs font-medium">Verified</span>
            </div>
          )}
        </div>
      </div>

      {/* User information (Freelancer/Trainer) */}
      <div className="md:w-2/4 p-6 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700">
        {/* Bio */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          {freelancer.bio || "No bio available."}
        </p>

        {/* Skills */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Additional information */}
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-2">
          {/* Location */}
          {freelancer.region && (
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-1" size={14} />
              <span>{freelancer.region}</span>
            </div>
          )}

          {/* Completed projects */}
          <div className="flex items-center">
            <FaBriefcase className="mr-1" size={14} />
            <span>{freelancer.completed_projects || 0} Projects</span>
          </div>
        </div>

        {/* Certifications and Projects */}
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          {/* Certifications */}
          <button
            onClick={handleViewCertifications}
            className="flex items-center hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <FaCertificate className="mr-1" size={14} />
            <span>{certificationsCount} Certifications</span>
          </button>

          {/* Portfolio Projects */}
          <button
            onClick={handleViewPortfolio}
            className="flex items-center hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <FaProjectDiagram className="mr-1" size={14} />
            <span>{projectsCount} Portfolio Items</span>
          </button>
        </div>
      </div>

      {/* Action buttons */}
      <div className="md:w-1/4 p-6 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700 flex flex-col justify-center gap-3">
        <button
          onClick={handleHireClick}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium"
        >
          Hire Now
        </button>

        <Link
          href={isTrainer ? `/trainer/${freelancer.id}` : `/freelancer/${freelancer.id}`}
          className="w-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
        >
          <FaUser className="mr-2" size={14} />
          View Profile
        </Link>
      </div>
    </motion.div>
  );
}
