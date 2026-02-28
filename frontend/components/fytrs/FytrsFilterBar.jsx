'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa';

export default function FytrsFilterBar({ filters, onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Define ranks
  const ranks = [
    { id: 'silver', name: 'Silver 🥈', description: 'Beginner level' },
    { id: 'gold', name: 'Gold 🥇', description: 'Intermediate level' },
    { id: 'platinum', name: 'Platinum 💎', description: 'Expert level' },
  ];

  // Define categories
  const categories = [
    'Web Development', 'Mobile Development', 'UI/UX Design',
    'Graphic Design', 'Content Writing', 'Digital Marketing',
    'SEO', 'Video Editing', 'Animation', 'Data Analysis',
    'Machine Learning', 'Blockchain', 'Game Development'
  ];

  // Define experience levels
  const experienceLevels = [
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'expert', name: 'Expert' },
  ];

  // Define sort options
  const sortOptions = [
    { id: 'rating', name: 'Top Rated' },
    { id: 'experience', name: 'Most Experienced' },
    { id: 'recent', name: 'Recently Joined' },
    { id: 'best_match', name: 'Best Match' },
  ];

  // Load search history from local storage
  useEffect(() => {
    const savedHistory = localStorage.getItem('fytrSearchHistory');
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to parse search history:', e);
      }
    }
  }, []);

  // Save search term to history
  const saveToHistory = (term) => {
    if (!term.trim()) return;

    const newHistory = [term, ...searchHistory.filter(item => item !== term)].slice(0, 5);
    setSearchHistory(newHistory);
    localStorage.setItem('fytrSearchHistory', JSON.stringify(newHistory));
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    onFilterChange({ search: e.target.value });
    if (e.target.value === '') {
      setShowHistory(true);
    }
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && filters.search.trim()) {
      saveToHistory(filters.search);
      setShowHistory(false);
    }
  };

  // Handle click on history item
  const handleHistoryClick = (term) => {
    onFilterChange({ search: term });
    setShowHistory(false);
  };

  // Handle rank change
  const handleRankChange = (rank) => {
    onFilterChange({ rank });
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    onFilterChange({ category });
  };

  // Handle availability change
  const handleAvailabilityChange = (availability) => {
    onFilterChange({ availability });
  };

  // Handle experience level change
  const handleExperienceChange = (experience) => {
    onFilterChange({ experience });
  };

  // Handle region change
  const handleRegionChange = (e) => {
    onFilterChange({ region: e.target.value });
  };

  // Handle sort change
  const handleSortChange = (sortBy) => {
    onFilterChange({ sortBy });
  };

  // Reset all filters
  const resetFilters = () => {
    onFilterChange({
      search: '',
      rank: '',
      category: '',
      availability: '',
      experience: '',
      region: '',
      sortBy: 'rating'
    });
  };

  return (
    <motion.div
      className="sticky top-16 z-30 bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Search and filter bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        <div className="relative flex-grow group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name, skill, or keyword..."
            value={filters.search}
            onChange={handleSearchChange}
            onKeyDown={handleSearchSubmit}
            onFocus={() => setShowHistory(filters.search === '')}
            onBlur={() => setTimeout(() => setShowHistory(false), 200)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange({ search: '' })}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <FaTimes size={16} />
            </button>
          )}

          {/* Search history */}
          {showHistory && searchHistory.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10">
              <ul className="py-1">
                {searchHistory.map((term, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleHistoryClick(term)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                    >
                      <FaSearch className="text-gray-400 mr-2" size={12} />
                      {term}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sort button */}
        <div className="relative">
          <select
            value={filters.sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="appearance-none bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {sortOptions.map(option => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
            <FaChevronDown size={12} />
          </div>
        </div>

        {/* Filter button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg transition-colors"
        >
          <FaFilter />
          <span>Filters</span>
          {isOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
        </button>

        {/* Reset button */}
        {(filters.rank || filters.category || filters.availability || filters.experience || filters.region) && (
          <button
            onClick={resetFilters}
            className="flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg transition-colors"
          >
            <FaTimes size={12} />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Expandable filters section */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700 mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {/* Rank filter */}
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Filter by Rank</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="rank-all"
                      name="rank"
                      checked={filters.rank === ''}
                      onChange={() => handleRankChange('')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="rank-all" className="ml-2 text-gray-700 dark:text-gray-300">
                      All Ranks
                    </label>
                  </div>

                  {ranks.map(rank => (
                    <div key={rank.id} className="flex items-center">
                      <input
                        type="radio"
                        id={`rank-${rank.id}`}
                        name="rank"
                        checked={filters.rank === rank.id}
                        onChange={() => handleRankChange(rank.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`rank-${rank.id}`} className="ml-2 text-gray-700 dark:text-gray-300">
                        {rank.name} <span className="text-xs text-gray-500">({rank.description})</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category filter */}
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Filter by Category</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="category-all"
                      name="category"
                      checked={filters.category === ''}
                      onChange={() => handleCategoryChange('')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="category-all" className="ml-2 text-gray-700 dark:text-gray-300">
                      All Categories
                    </label>
                  </div>

                  {categories.map(category => (
                    <div key={category} className="flex items-center">
                      <input
                        type="radio"
                        id={`category-${category.replace(/\s+/g, '-').toLowerCase()}`}
                        name="category"
                        checked={filters.category === category}
                        onChange={() => handleCategoryChange(category)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`category-${category.replace(/\s+/g, '-').toLowerCase()}`}
                        className="ml-2 text-gray-700 dark:text-gray-300"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability filter */}
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Availability</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="availability-all"
                      name="availability"
                      checked={filters.availability === ''}
                      onChange={() => handleAvailabilityChange('')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="availability-all" className="ml-2 text-gray-700 dark:text-gray-300">
                      All
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="availability-available"
                      name="availability"
                      checked={filters.availability === 'available'}
                      onChange={() => handleAvailabilityChange('available')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="availability-available" className="ml-2 text-gray-700 dark:text-gray-300">
                      Available
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="availability-not-available"
                      name="availability"
                      checked={filters.availability === 'not-available'}
                      onChange={() => handleAvailabilityChange('not-available')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="availability-not-available" className="ml-2 text-gray-700 dark:text-gray-300">
                      Not Available
                    </label>
                  </div>
                </div>
              </div>

              {/* Experience level filter */}
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Experience Level</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="experience-all"
                      name="experience"
                      checked={filters.experience === ''}
                      onChange={() => handleExperienceChange('')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="experience-all" className="ml-2 text-gray-700 dark:text-gray-300">
                      All Levels
                    </label>
                  </div>

                  {experienceLevels.map(level => (
                    <div key={level.id} className="flex items-center">
                      <input
                        type="radio"
                        id={`experience-${level.id}`}
                        name="experience"
                        checked={filters.experience === level.id}
                        onChange={() => handleExperienceChange(level.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`experience-${level.id}`} className="ml-2 text-gray-700 dark:text-gray-300">
                        {level.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Region filter */}
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Region/Location</h3>
                <input
                  type="text"
                  placeholder="Enter location..."
                  value={filters.region}
                  onChange={handleRegionChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
