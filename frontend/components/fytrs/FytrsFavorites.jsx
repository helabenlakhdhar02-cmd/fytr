'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaHeart, FaTrash, FaChevronDown, FaChevronUp, FaUser, FaBalanceScale, FaCheck, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function FytrsFavorites() {
  const { isAuthenticated, openRegisterModal } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedForComparison, setSelectedForComparison] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  // Fetch favorites from local storage
  useEffect(() => {
    if (typeof window !== 'undefined' && isAuthenticated) {
      const storedFavorites = JSON.parse(localStorage.getItem('fytrFavorites') || '[]');
      setFavorites(storedFavorites);
    }
  }, [isAuthenticated]);

  // Remove freelancer from favorites
  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('fytrFavorites', JSON.stringify(updatedFavorites));
  };

  // Clear all favorites
  const clearAllFavorites = () => {
    setFavorites([]);
    setSelectedForComparison([]);
    localStorage.setItem('fytrFavorites', JSON.stringify([]));
  };

  // Add or remove freelancer from comparison
  const toggleComparison = (favorite) => {
    if (selectedForComparison.some(f => f.id === favorite.id)) {
      // Remove from comparison
      setSelectedForComparison(selectedForComparison.filter(f => f.id !== favorite.id));
    } else {
      // Check number of selected freelancers (max 3)
      if (selectedForComparison.length >= 3) {
        toast.error('You can compare up to 3 Fytrs at a time', {
          duration: 3000,
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
        return;
      }

      // Add to comparison
      setSelectedForComparison([...selectedForComparison, favorite]);
    }
  };

  // Start comparison
  const startComparison = () => {
    if (selectedForComparison.length < 2) {
      toast.error('Select at least 2 Fytrs to compare', {
        duration: 3000,
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }

    setShowComparison(true);
  };

  // Cancel comparison
  const cancelComparison = () => {
    setSelectedForComparison([]);
    setShowComparison(false);
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

  // Define animation variants
  const containerVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3 }
    }
  };

  // If user is not authenticated, show login message
  if (!isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 mb-6"
      >
        <div className="p-4 flex justify-between items-center bg-gray-50 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <FaHeart className="text-red-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Favorite Fytrs</h3>
          </div>
        </div>

        <div className="p-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Sign in to save your favorite Fytrs and access them anytime.
          </p>

          <button
            onClick={openRegisterModal}
            className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium"
          >
            Sign In / Sign Up
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 mb-6"
    >
      {/* Favorites header */}
      <div
        className="p-4 flex justify-between items-center bg-gray-50 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <FaHeart className="text-red-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Favorite Fytrs {favorites.length > 0 && `(${favorites.length})`}
          </h3>
        </div>

        <button className="text-gray-500 dark:text-gray-400">
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>

      {/* Favorites content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {favorites.length > 0 ? (
              <div>
                {/* Freelancers comparison */}
                {showComparison ? (
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center">
                        <FaBalanceScale className="mr-2 text-primary-600" />
                        Fytr Comparison
                      </h4>
                      <button
                        onClick={cancelComparison}
                        className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      >
                        <FaTimes size={14} />
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr>
                            <th className="text-left py-2 text-xs text-gray-500 dark:text-gray-400">Criteria</th>
                            {selectedForComparison.map(fytr => (
                              <th key={fytr.id} className="text-center py-2">
                                <div className="flex flex-col items-center">
                                  <img
                                    src={fytr.profileImg || "/fighterfish.png"}
                                    alt={fytr.name}
                                    className="w-8 h-8 rounded-full object-cover border border-gray-200 dark:border-gray-700 mb-1"
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = "/fighterfish.png";
                                    }}
                                  />
                                  <span className="text-xs font-medium text-gray-900 dark:text-white">{fytr.name}</span>
                                </div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {/* Rating row */}
                          <tr className="border-t border-gray-200 dark:border-gray-700">
                            <td className="py-2 text-xs text-gray-700 dark:text-gray-300">Rating</td>
                            {selectedForComparison.map(fytr => (
                              <td key={fytr.id} className="text-center py-2">
                                <div className="flex items-center justify-center">
                                  {renderStarRating(fytr.rate || 0)}
                                  <span className="ml-1 text-xs">{fytr.rate?.toFixed(1) || "0.0"}</span>
                                </div>
                              </td>
                            ))}
                          </tr>

                          {/* Level row */}
                          <tr className="border-t border-gray-200 dark:border-gray-700">
                            <td className="py-2 text-xs text-gray-700 dark:text-gray-300">Level</td>
                            {selectedForComparison.map(fytr => (
                              <td key={fytr.id} className="text-center py-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  fytr.level?.toLowerCase() === 'expert' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                                  fytr.level?.toLowerCase() === 'intermediate' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                                  'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                }`}>
                                  {fytr.level || "Beginner"}
                                </span>
                              </td>
                            ))}
                          </tr>

                          {/* Skills row */}
                          <tr className="border-t border-gray-200 dark:border-gray-700">
                            <td className="py-2 text-xs text-gray-700 dark:text-gray-300">Skills</td>
                            {selectedForComparison.map(fytr => (
                              <td key={fytr.id} className="text-center py-2">
                                <div className="text-xs text-gray-600 dark:text-gray-400 max-w-[150px] mx-auto">
                                  {fytr.skills || "No skills listed"}
                                </div>
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-3 flex justify-center">
                      <Link
                        href={`/fytrs?view=favorites`}
                        className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
                      >
                        View all favorites for detailed comparison
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="max-h-64 overflow-y-auto">
                    {favorites.map((favorite) => (
                      <div
                        key={favorite.id}
                        className={`p-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0 flex items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                          selectedForComparison.some(f => f.id === favorite.id) ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                      >
                        <div className="flex items-center">
                          {/* Comparison checkbox */}
                          <div className="mr-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleComparison(favorite);
                              }}
                              className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                                selectedForComparison.some(f => f.id === favorite.id)
                                  ? 'bg-primary-600 border-primary-600 text-white'
                                  : 'border-gray-300 dark:border-gray-600'
                              }`}
                            >
                              {selectedForComparison.some(f => f.id === favorite.id) && (
                                <FaCheck size={10} />
                              )}
                            </button>
                          </div>

                          <img
                            src={favorite.profileImg || "/fighterfish.png"}
                            alt={favorite.name}
                            className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/fighterfish.png";
                            }}
                          />
                        </div>

                        <div className="ml-3 flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {favorite.name}
                            </p>

                            <div className="flex items-center">
                              <div className="flex mr-2">
                                {renderStarRating(favorite.rate || 0)}
                              </div>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeFavorite(favorite.id);
                                }}
                                className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 p-1"
                                aria-label="Remove from favorites"
                              >
                                <FaTrash size={14} />
                              </button>
                            </div>
                          </div>

                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {favorite.skills || "No skills listed"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Comparison toolbar */}
                {selectedForComparison.length > 0 && !showComparison && (
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border-t border-blue-200 dark:border-blue-800">
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-blue-700 dark:text-blue-300">
                        {selectedForComparison.length} Fytr{selectedForComparison.length !== 1 ? 's' : ''} selected
                      </div>
                      <button
                        onClick={startComparison}
                        className="px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white text-xs rounded-md transition-colors"
                      >
                        Compare
                      </button>
                    </div>
                  </div>
                )}

                <div className="p-3 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center">
                  <button
                    onClick={clearAllFavorites}
                    className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                  >
                    Clear All
                  </button>

                  <Link
                    href="/fytrs?view=favorites"
                    className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors flex items-center"
                  >
                    <span>View All</span>
                    <FaChevronDown className="ml-1 transform rotate-270" size={12} />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-3">
                  <FaUser className="text-gray-400 dark:text-gray-500" size={24} />
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  You haven't added any Fytrs to your favorites yet.
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Click the heart icon on any Fytr card to add them to your favorites.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
