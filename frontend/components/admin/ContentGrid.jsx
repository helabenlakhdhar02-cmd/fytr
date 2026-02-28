'use client';

import React from 'react';

/**
 * ContentGrid - A reusable component for organizing content in a grid layout
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to display in the grid
 * @param {number} props.columns - Number of columns on large screens (default: 3)
 * @param {string} props.className - Optional additional CSS classes
 */
export default function ContentGrid({ 
  children, 
  columns = 3,
  className = '' 
}) {
  // Determine the grid columns class based on the columns prop
  const gridColsClass = {
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4'
  }[columns] || 'lg:grid-cols-3';

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 ${gridColsClass} gap-6 mb-6 ${className}`}>
      {children}
    </div>
  );
}
