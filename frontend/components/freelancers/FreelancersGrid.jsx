'use client';

import { useState, useEffect } from 'react';
import { FaStar, FaLock, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';
import { mockFreelancers } from '../../lib/mockData';
import Link from 'next/link';

export default function FreelancersGrid({ filters }) {
  const { openRegisterModal } = useAuth();
  const { userData: currentUser } = useUser();
  const [freelancers, setFreelancers] = useState([]);
  const [filteredFreelancers, setFilteredFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch freelancers data
  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch from an API
        // For now, we'll use mock data but limit to 3 profiles per rank

        // Group freelancers by rank
        const beginners = mockFreelancers.filter(f =>
          (f.level || '').toLowerCase() === 'beginner'
        ).slice(0, 3);

        const intermediates = mockFreelancers.filter(f =>
          (f.level || '').toLowerCase() === 'intermediate'
        ).slice(0, 3);

        const experts = mockFreelancers.filter(f =>
          (f.level || '').toLowerCase() === 'expert'
        ).slice(0, 3);

        // If we don't have enough of a specific rank, fill with others
        const fillRemainingSlots = (arr, targetLength) => {
          if (arr.length < targetLength) {
            const remaining = mockFreelancers
              .filter(f => !arr.some(a => a.id === f.id))
              .slice(0, targetLength - arr.length);
            return [...arr, ...remaining];
          }
          return arr;
        };

        // Ensure we have at least 3 of each rank
        const filledBeginners = fillRemainingSlots(beginners, 3);
        const filledIntermediates = fillRemainingSlots(intermediates, 3);
        const filledExperts = fillRemainingSlots(experts, 3);

        // Combine all freelancers
        const limitedFreelancers = [
          ...filledBeginners,
          ...filledIntermediates,
          ...filledExperts
        ];

        setFreelancers(limitedFreelancers);
      } catch (error) {
        console.error('Failed to fetch freelancers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFreelancers();
  }, []);

  // Apply filters when filters or freelancers change
  useEffect(() => {
    if (freelancers.length === 0) return;

    let results = [...freelancers];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      results = results.filter(
        (freelancer) =>
          (freelancer.user?.full_name || '').toLowerCase().includes(searchLower) ||
          (freelancer.bio || '').toLowerCase().includes(searchLower) ||
          (freelancer.skills || '').toLowerCase().includes(searchLower)
      );
    }

    // Apply rank filter
    if (filters.rank) {
      // Map rank names to the level field in the data
      const rankMap = {
        veiltail: 'beginner',
        crowntail: 'intermediate',
        halfmoon: 'expert'
      };

      results = results.filter(freelancer =>
        (freelancer.level || '').toLowerCase() === rankMap[filters.rank]
      );
    }

    // Apply rating filter
    if (filters.rating > 0) {
      results = results.filter(freelancer =>
        (freelancer.rate || 0) >= filters.rating
      );
    }

    // Apply skills filter
    if (filters.skills && filters.skills.length > 0) {
      results = results.filter(freelancer => {
        if (!freelancer.skills) return false;
        const freelancerSkills = freelancer.skills.toLowerCase();
        return filters.skills.some(skill =>
          freelancerSkills.includes(skill.toLowerCase())
        );
      });
    }

    // Apply location filter
    if (filters.location) {
      const locationLower = filters.location.toLowerCase();
      results = results.filter(freelancer =>
        (freelancer.location || '').toLowerCase().includes(locationLower)
      );
    }

    // Sort by rank first, then by rating, then by completed projects
    results.sort((a, b) => {
      // Rank order: expert (halfmoon) > intermediate (crowntail) > beginner (veiltail)
      const rankOrder = { expert: 3, intermediate: 2, beginner: 1, '': 0 };
      const rankDiff = (rankOrder[b.level?.toLowerCase() || ''] || 0) - (rankOrder[a.level?.toLowerCase() || ''] || 0);

      if (rankDiff !== 0) return rankDiff;

      // Then sort by rating
      const ratingDiff = (b.rate || 0) - (a.rate || 0);
      if (ratingDiff !== 0) return ratingDiff;

      // Then sort by completed projects
      return (b.completed_projects || 0) - (a.completed_projects || 0);
    });

    setFilteredFreelancers(results);
  }, [filters, freelancers]);

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

  // Map rank to badge style
  const getRankBadge = (level) => {
    const rankMap = {
      beginner: {
        name: 'Veiltail',
        color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        borderColor: 'border-green-200 dark:border-green-800',
        gradientColor: 'from-green-400 to-green-600',
        hoverColor: 'group-hover:bg-green-200 dark:group-hover:bg-green-900/50',
        image: '/images/veiltail.png'
      },
      intermediate: {
        name: 'Crowntail',
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
        borderColor: 'border-blue-200 dark:border-blue-800',
        gradientColor: 'from-blue-400 to-blue-600',
        hoverColor: 'group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50',
        image: '/images/crowntail.png'
      },
      expert: {
        name: 'Halfmoon',
        color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
        borderColor: 'border-purple-200 dark:border-purple-800',
        gradientColor: 'from-purple-400 to-purple-600',
        hoverColor: 'group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50',
        image: '/images/halfmoon.png'
      },
    };

    const defaultRank = {
      name: 'Veiltail',
      color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      borderColor: 'border-green-200 dark:border-green-800',
      gradientColor: 'from-green-400 to-green-600',
      hoverColor: 'group-hover:bg-green-200 dark:group-hover:bg-green-900/50',
      image: '/images/veiltail.png'
    };
    return rankMap[level?.toLowerCase()] || defaultRank;
  };

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      }
    })
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (filteredFreelancers.length === 0) {
    return (
      <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <h3 className="text-xl text-gray-600 dark:text-gray-400 mb-4">No freelancers found matching your criteria</h3>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Explore Our Fytrs by Rank
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Find the perfect freelancer for your project from our talented pool of Veiltail, Crowntail, and Halfmoon Fytrs
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-3">
          <div className="text-sm bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 px-3 py-1 rounded-full">
            {filteredFreelancers.length} Fytrs found
          </div>
          <select
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            onChange={(e) => {
              // This would be implemented to change the sort order
              console.log(e.target.value);
            }}
          >
            <option value="recommended">Recommended</option>
            <option value="rating">Highest Rating</option>
            <option value="projects">Most Projects</option>
          </select>
        </div>
      </div>

      {/* Group freelancers by rank */}
      {['beginner', 'intermediate', 'expert'].map((rankLevel) => {
        const rankFreelancers = filteredFreelancers.filter(
          f => (f.level || '').toLowerCase() === rankLevel
        );

        if (rankFreelancers.length === 0) return null;

        const rankInfo = {
          beginner: { title: 'Veiltail Fytrs', description: 'Beginner level freelancers starting their journey' },
          intermediate: { title: 'Crowntail Fytrs', description: 'Intermediate level freelancers with proven skills' },
          expert: { title: 'Halfmoon Fytrs', description: 'Expert level freelancers who are masters in their field' }
        }[rankLevel];

        return (
          <div key={rankLevel} className="mb-12">
            <div className="flex items-center mb-6">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                rankLevel === 'beginner'
                  ? 'bg-green-100 dark:bg-green-900/30'
                  : rankLevel === 'intermediate'
                    ? 'bg-blue-100 dark:bg-blue-900/30'
                    : 'bg-purple-100 dark:bg-purple-900/30'
              }`}>
                <img
                  src={`/images/${rankLevel === 'beginner' ? 'veiltail' : rankLevel === 'intermediate' ? 'crowntail' : 'halfmoon'}.png`}
                  alt={rankInfo.title}
                  className="w-8 h-8"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/betta-fish-new.png";
                  }}
                />
              </div>
              <div>
                <h3 className={`text-2xl font-bold mb-1 ${
                  rankLevel === 'beginner'
                    ? 'text-green-700 dark:text-green-400'
                    : rankLevel === 'intermediate'
                      ? 'text-blue-700 dark:text-blue-400'
                      : 'text-purple-700 dark:text-purple-400'
                }`}>{rankInfo.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{rankInfo.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {rankFreelancers.map((freelancer, index) => {
                const rankBadge = getRankBadge(freelancer.level);

                return (
                  <motion.div
              key={freelancer.id || index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={index}
              className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${rankBadge.borderColor} flex flex-col group hover-lift`}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <div className="p-6">
                {/* Freelancer Header */}
                <div className="flex items-center mb-4">
                  <img
                    src={freelancer.user?.profileImg || "/images/betta-fish-new.png"}
                    alt={freelancer.user?.full_name || "Freelancer"}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700 transform transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/betta-fish-new.png";
                    }}
                  />

                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {freelancer.user?.full_name || "Anonymous Freelancer"}
                    </h3>

                    {/* Rank Badge */}
                    <div className="flex items-center gap-2 mt-1 mb-1">
                      <img
                        src={rankBadge.image}
                        alt={rankBadge.name}
                        className="w-5 h-5 object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/fighterfish.png";
                        }}
                      />
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${rankBadge.color} ${rankBadge.hoverColor} transition-colors duration-300`}>
                        Fytr {rankBadge.name}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {renderStarRating(freelancer.rate || 0)}
                      </div>
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        ({freelancer.rate || "0.0"}/5)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {freelancer.skills ? (
                      freelancer.skills.split(',').slice(0, 3).map((skill, i) => (
                        <span
                          key={i}
                          className={`${rankBadge.color} px-2 py-1 rounded-md text-xs font-medium transition-all duration-300 hover:scale-105 cursor-default`}
                        >
                          {skill.trim()}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400 text-sm italic">No skills listed</span>
                    )}
                  </div>
                </div>

                {/* Completed Projects */}
                <div className="flex items-center mb-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">{freelancer.completed_projects || 0}</span>
                  <span className="ml-1">completed projects</span>
                </div>

                {/* Bio */}
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-sm">
                  {freelancer.bio || "No bio available for this freelancer."}
                </p>
              </div>

              {/* Contact Button */}
              <div className={`p-4 mt-auto border-t-2 ${rankBadge.borderColor} ${rankBadge.color} ${rankBadge.hoverColor} transition-all duration-300`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium">${freelancer.hourly_rate || '25-45'}</span>
                    <span>/hr</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <span>Availability:</span>
                    <span className="font-medium text-green-500">Available</span>
                  </div>
                </div>
                {currentUser ? (
                  <Link href={`/freelancer/${freelancer.id || freelancer.user?.id || "profile"}`} className="w-full">
                    <button
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg shadow-md hover:shadow-primary-500/30 transition-all duration-300 text-sm font-medium group-hover:scale-105"
                    >
                      <FaUser size={14} />
                      <span>View Profile</span>
                    </button>
                  </Link>
                ) : (
                  <button
                    onClick={openRegisterModal}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg shadow-md hover:shadow-primary-500/30 transition-all duration-300 text-sm font-medium group-hover:scale-105"
                  >
                    <FaLock size={14} />
                    <span>Register to Contact</span>
                  </button>
                )}
              </div>
            </motion.div>
                );
              })}
            </div>

            {rankFreelancers.length === 0 && (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">No {rankInfo.title} found matching your criteria</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
