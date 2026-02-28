'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaRegStar, FaCheck, FaTimes, FaStarHalfAlt, FaCommentAlt, FaToggleOn, FaToggleOff, FaTrophy, FaComment } from 'react-icons/fa';
import FilePreview from './FilePreview';

const SubmissionReviewPanel = ({ submission, onClose, onSave, isOpen }) => {
  const [rating, setRating] = useState(0);
  const [rank, setRank] = useState(1);
  const [feedback, setFeedback] = useState({
    positive: '',
    constructive: '',
    closing: ''
  });
  const [isFinalSelection, setIsFinalSelection] = useState(false);

  // Custom star rating component with quarter-star precision and keyboard/scroll controls
  const StarRating = () => {
    const stars = [1, 2, 3, 4, 5];
    const ratingContainerRef = React.useRef(null);

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        // Decrease rating by 0.25
        const newRating = Math.max(0, rating - 0.25);
        setRating(parseFloat(newRating.toFixed(2)));
        e.preventDefault();
      } else if (e.key === 'ArrowRight') {
        // Increase rating by 0.25
        const newRating = Math.min(5, rating + 0.25);
        setRating(parseFloat(newRating.toFixed(2)));
        e.preventDefault();
      }
    };

    // Handle scroll for fine-tuning
    const handleWheel = (e) => {
      if (e.deltaY < 0) {
        // Scroll up - increase rating
        const newRating = Math.min(5, rating + 0.25);
        setRating(parseFloat(newRating.toFixed(2)));
      } else {
        // Scroll down - decrease rating
        const newRating = Math.max(0, rating - 0.25);
        setRating(parseFloat(newRating.toFixed(2)));
      }
      e.preventDefault();
    };

    // Set up event listeners
    React.useEffect(() => {
      const container = ratingContainerRef.current;
      if (container) {
        container.addEventListener('wheel', handleWheel, { passive: false });
        return () => {
          container.removeEventListener('wheel', handleWheel);
        };
      }
    }, [rating]);

    // Helper function to render a star with quarter-star precision
    const renderStar = (starValue) => {
      const quarterSteps = [0.25, 0.5, 0.75, 1.0];

      return (
        <div key={starValue} className="relative group">
          {/* Base empty star */}
          <FaRegStar
            className="text-gray-200 dark:text-gray-600 text-xl"
          />

          {/* Overlay for quarter steps */}
          <div className="absolute inset-0 flex">
            {quarterSteps.map((step, index) => {
              const stepValue = starValue - 1 + step;
              const isSelected = rating >= stepValue;
              const width = `${25}%`;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setRating(parseFloat(stepValue.toFixed(2)))}
                  className="h-full focus:outline-none transition-colors duration-200"
                  style={{ width }}
                  title={`${stepValue.toFixed(2)} stars`}
                >
                  {isSelected && (
                    <div
                      className="absolute top-0 left-0 h-full overflow-hidden text-yellow-400"
                      style={{ width: `${(index + 1) * 25}%`, zIndex: 10 }}
                    >
                      <FaStar className="text-xl" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      );
    };

    return (
      <div
        className="flex space-x-2 relative group"
        ref={ratingContainerRef}
        tabIndex="0"
        onKeyDown={handleKeyDown}
      >
        {stars.map(renderStar)}

        {/* Custom tooltip */}
        <div className="absolute -top-10 left-0 bg-gray-800 text-white text-xs rounded py-1.5 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-20 shadow-md">
          Scroll or use ← / → to fine-tune your score
        </div>
      </div>
    );
  };

  // Handle rank change
  const handleRankChange = (newRank) => {
    setRank(newRank);
  };

  // Rank button component
  const RankButton = ({ value, label }) => {
    const isSelected = rank === value;
    return (
      <button
        type="button"
        onClick={() => handleRankChange(value)}
        className={`px-2 py-1 text-xs rounded-md transition-all duration-200 ${isSelected
          ? 'bg-blue-600 text-white font-medium border-2 border-blue-600 shadow-sm'
          : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-400 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'}`}
        title="Rank this submission among others"
      >
        {label}
      </button>
    );
  };

  // Handle feedback change
  const handleFeedbackChange = (type, e) => {
    setFeedback(prev => ({
      ...prev,
      [type]: e.target.value
    }));
  };

  // Handle final selection toggle
  const handleFinalSelectionToggle = () => {
    setIsFinalSelection(!isFinalSelection);
  };

  // Track if changes have been made
  const [hasChanges, setHasChanges] = useState(false);

  // Update hasChanges when any value changes
  React.useEffect(() => {
    setHasChanges(true);
  }, [rating, rank, feedback, isFinalSelection]);

  // Handle save
  const handleSave = () => {
    onSave({
      rating,
      rank,
      feedback,
      isFinalSelection
    });
    setHasChanges(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-800 rounded-md overflow-hidden shadow-md w-full"
        >
          <div className="p-4 flex flex-col space-y-4">
            {/* Header with close button */}
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Review Submission</h3>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                aria-label="Close review panel"
              >
                <FaTimes className="h-3 w-3" />
              </button>
            </div>

            {/* File Preview */}
            <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md">
              <FilePreview submission={submission} />
            </div>

            {/* Row 1: Rating, Rank, Final Selection */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md">
              {/* Rating System with Quarter Stars */}
              <div className="flex flex-col">
                <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">⭐ Rating</label>
                <div className="flex items-center">
                  <StarRating />
                  <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {rating > 0 ? rating.toFixed(2).replace(/\.?0+$/, '') : ''}
                  </span>
                </div>
              </div>

              {/* Rank Selector Buttons - Disabled when winner is selected */}
              <div className={`flex flex-col relative ${isFinalSelection ? 'opacity-50' : ''}`}>
                <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">🏅 Ranking</label>
                {isFinalSelection ? (
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 italic">
                    <span>Winner doesn't need ranking</span>
                  </div>
                ) : (
                  <div className="flex space-x-1">
                    <RankButton value={1} label="1st" />
                    <RankButton value={2} label="2nd" />
                    <RankButton value={3} label="3rd" />
                    <RankButton value={4} label="4th" />
                    <RankButton value={5} label="5th" />
                  </div>
                )}
              </div>

              {/* Final Selection Toggle */}
              <div className="flex flex-col relative group">
                <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">🏆 Winner</label>
                <button
                  onClick={handleFinalSelectionToggle}
                  className={`flex items-center px-3 py-1.5 rounded-md transition-all duration-200 ${isFinalSelection
                    ? 'bg-green-600 text-white border-2 border-green-600 shadow-md'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'}`}
                >
                  {isFinalSelection ? (
                    <>
                      <FaToggleOn className="mr-1.5 text-white" />
                      <span className="font-medium">Selected</span>
                      {/* Confetti animation when selected */}
                      <motion.div
                        className="absolute inset-0 overflow-hidden rounded-md pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, times: [0, 0.2, 1] }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-green-500 to-blue-500 opacity-20" />
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <FaToggleOff className="mr-1.5 text-gray-500" />
                      <span>Select as Winner</span>
                    </>
                  )}
                </button>
                <div className="absolute -bottom-10 left-0 bg-gray-800 text-white text-xs rounded py-1.5 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-20 shadow-md">
                  Pick this submission as the final winner for this project. You can only choose one.
                </div>
              </div>
            </div>

            {/* Row 2: Feedback Fields (side by side) */}
            <div className="space-y-3">
              <div className="flex items-center">
                <FaCommentAlt className="text-blue-500 dark:text-blue-400 mr-2" />
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Feedback</h4>
              </div>

              {/* Horizontal feedback fields */}
              <div className="grid grid-cols-3 gap-3">
                {/* Positive feedback */}
                <div className="relative">
                  <input
                    type="text"
                    value={feedback.positive}
                    onChange={(e) => handleFeedbackChange('positive', e)}
                    placeholder="What did you like about this work? 👍"
                    className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white transition-all duration-200 focus:border-blue-400"
                  />
                </div>

                {/* Constructive feedback */}
                <div className="relative">
                  <input
                    type="text"
                    value={feedback.constructive}
                    onChange={(e) => handleFeedbackChange('constructive', e)}
                    placeholder="What could be improved? 💡"
                    className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white transition-all duration-200 focus:border-blue-400"
                  />
                </div>

                {/* Closing feedback */}
                <div className="relative">
                  <input
                    type="text"
                    value={feedback.closing}
                    onChange={(e) => handleFeedbackChange('closing', e)}
                    placeholder="Final thoughts? 🎯"
                    className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white transition-all duration-200 focus:border-blue-400"
                  />
                </div>
              </div>
            </div>

            {/* Save Button - Highlighted when changes are made */}
            <div className="flex justify-end">
              <motion.button
                type="button"
                onClick={handleSave}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={hasChanges ? { boxShadow: ['0 0 0 rgba(59, 130, 246, 0)', '0 0 15px rgba(59, 130, 246, 0.5)', '0 0 0 rgba(59, 130, 246, 0)'] } : {}}
                transition={hasChanges ? { duration: 2, repeat: Infinity, repeatType: 'loop' } : {}}
                className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${hasChanges ? 'bg-blue-600' : 'bg-gray-500'} hover:bg-blue-700 focus:outline-none transition-all duration-200`}
              >
                {hasChanges ? 'Save Changes' : 'Save Review'}
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SubmissionReviewPanel;
