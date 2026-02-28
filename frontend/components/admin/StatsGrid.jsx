'use client';

import React from 'react';

/**
 * StatsGrid - A reusable component for displaying stat cards in a grid
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The stat cards to display
 * @param {number} props.columns - Number of columns on large screens (default: 4)
 * @param {string} props.className - Optional additional CSS classes
 */
export default function StatsGrid({ 
  children, 
  columns = 4,
  className = '' 
}) {
  // Determine the grid columns class based on the columns prop
  const gridColsClass = {
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
    5: 'lg:grid-cols-5',
    6: 'lg:grid-cols-6'
  }[columns] || 'lg:grid-cols-4';

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridColsClass} gap-6 mb-6 ${className}`}>
      {children}
    </div>
  );
}
