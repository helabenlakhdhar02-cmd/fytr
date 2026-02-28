'use client';

import { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaTimes, FaHistory } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function FreelancersFilter({ filters, onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const ranks = [
    { id: 'veiltail', name: 'Veiltail', description: 'Beginner level' },
    { id: 'crowntail', name: 'Crowntail', description: 'Intermediate level' },
    { id: 'halfmoon', name: 'Halfmoon', description: 'Expert level' },
  ];

  const skills = [
    'Web Development', 'Mobile Development', 'UI/UX Design',
    'Graphic Design', 'Content Writing', 'Digital Marketing',
    'SEO', 'Video Editing', 'Animation', 'Data Analysis',
    'Machine Learning', 'Blockchain', 'Game Development'
  ];

  // Load search history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory).slice(0, 5));
      } catch (e) {
        console.error('Failed to parse search history:', e);
      }
    }
  }, []);

  // Save search term to history when user searches
  const saveToHistory = (term) => {
    if (!term.trim()) return;

    const newHistory = [term, ...searchHistory.filter(item => item !== term)].slice(0, 5);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const handleSearchChange = (e) => {
    onFilterChange({ search: e.target.value });
    setShowHistory(e.target.value === '');
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && filters.search.trim()) {
      saveToHistory(filters.search);
      setShowHistory(false);
    }
  };

  const handleHistoryClick = (term) => {
    onFilterChange({ search: term });
    setShowHistory(false);
  };

  const handleRankChange = (rank) => {
    onFilterChange({ rank });
  };

  const handleRatingChange = (rating) => {
    onFilterChange({ rating });
  };

  const handleSkillToggle = (skill) => {
    const currentSkills = [...filters.skills];
    if (currentSkills.includes(skill)) {
      onFilterChange({ skills: currentSkills.filter(s => s !== skill) });
    } else {
      onFilterChange({ skills: [...currentSkills, skill] });
    }
  };

  const handleLocationChange = (e) => {
    onFilterChange({ location: e.target.value });
  };

  const resetFilters = () => {
    onFilterChange({
      search: '',
      skills: [],
      rank: '',
      rating: 0,
      location: ''
    });
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700">
      {/* Search and Filter Toggle */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        <div className="relative flex-grow group">
          <input
            type="text"
            placeholder="Search by name, skills, or bio..."
            value={filters.search}
            onChange={handleSearchChange}
            onKeyDown={handleSearchSubmit}
            onFocus={() => setShowHistory(filters.search === '')}
            onBlur={() => setTimeout(() => setShowHistory(false), 200)}
            className="w-full pl-10 pr-16 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-all duration-300 group-hover:border-primary-400 dark:group-hover:border-primary-500"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-primary-500 transition-colors duration-300" />

          {filters.search && (
            <button
              onClick={() => onFilterChange({ search: '' })}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300"
              aria-label="Clear search"
            >
              <FaTimes />
            </button>
          )}

          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 dark:text-gray-500 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Press Enter to search
          </div>

          {/* Search History Dropdown */}
          {showHistory && searchHistory.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
              <div className="p-2 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Recent Searches</span>
                <button
                  onClick={() => {
                    setSearchHistory([]);
                    localStorage.removeItem('searchHistory');
                    setShowHistory(false);
                  }}
                  className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  Clear All
                </button>
              </div>
              <ul>
                {searchHistory.map((term, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleHistoryClick(term)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                    >
                      <FaHistory className="text-gray-400" size={12} />
                      {term}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg shadow-md hover:shadow-primary-500/30 transition-all duration-300 transform hover:scale-105"
        >
          {isOpen ? <FaTimes className="animate-spin-slow" /> : <FaFilter className="animate-pulse" />}
          <span>{isOpen ? 'Close Filters' : 'Show Filters'}</span>
        </button>
      </div>

      {/* Expandable Filter Section */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700 mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Rank Filter */}
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

              {/* Rating Filter */}
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Filter by Rating</h3>
                <div className="space-y-2">
                  {[0, 3, 4, 5].map(rating => (
                    <div key={rating} className="flex items-center">
                      <input
                        type="radio"
                        id={`rating-${rating}`}
                        name="rating"
                        checked={filters.rating === rating}
                        onChange={() => handleRatingChange(rating)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`rating-${rating}`} className="ml-2 text-gray-700 dark:text-gray-300">
                        {rating === 0 ? 'All Ratings' : `${rating}+ Stars`}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Filter */}
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Filter by Skills</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                  {skills.map(skill => (
                    <div key={skill} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`skill-${skill.replace(/\s+/g, '-').toLowerCase()}`}
                        checked={filters.skills.includes(skill)}
                        onChange={() => handleSkillToggle(skill)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`skill-${skill.replace(/\s+/g, '-').toLowerCase()}`}
                        className="ml-2 text-gray-700 dark:text-gray-300"
                      >
                        {skill}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Filter by Location</h3>
                <input
                  type="text"
                  placeholder="Enter location..."
                  value={filters.location}
                  onChange={handleLocationChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex justify-end mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={resetFilters}
                className="px-4 py-2 mr-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
              >
                Reset Filters
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg shadow-md hover:shadow-primary-500/30 transition-all duration-300"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
