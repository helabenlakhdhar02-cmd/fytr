'use client';

import React from 'react';
import { FaStar } from 'react-icons/fa';

/**
 * A reusable star rating component
 * @param {Object} props
 * @param {number} props.rating - The rating value (0-5)
 * @param {boolean} props.showEmpty - Whether to show empty stars (default: true)
 * @param {string} props.size - Size of stars: 'sm', 'md', 'lg' (default: 'md')
 * @param {boolean} props.showValue - Whether to show the numeric value (default: false)
 * @param {string} props.className - Additional CSS classes
 */
const StarRating = ({ 
  rating = 0, 
  showEmpty = true, 
  size = 'md', 
  showValue = false,
  className = '' 
}) => {
  // Determine star size based on the size prop
  const starSize = {
    sm: 'text-xs',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }[size] || 'text-base';

  // Calculate full and empty stars
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = showEmpty ? 5 - fullStars - (hasHalfStar ? 1 : 0) : 0;

  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex">
        {/* Full stars */}
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className={`text-yellow-400 ${starSize}`} />
        ))}
        
        {/* Half star (shown as a full star with reduced opacity) */}
        {hasHalfStar && (
          <FaStar key="half" className={`text-yellow-400 opacity-50 ${starSize}`} />
        )}
        
        {/* Empty stars */}
        {[...Array(emptyStars)].map((_, i) => (
          <FaStar key={`empty-${i}`} className={`text-gray-300 dark:text-gray-600 ${starSize}`} />
        ))}
      </div>
      
      {/* Numeric rating value */}
      {showValue && (
        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default StarRating;
