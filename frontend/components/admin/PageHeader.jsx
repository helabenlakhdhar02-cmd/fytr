'use client';

import React from 'react';

/**
 * PageHeader - A reusable component for page headers in admin pages
 * 
 * @param {Object} props
 * @param {string} props.title - The page title
 * @param {string} props.description - Optional page description
 * @param {React.ReactNode} props.action - Optional action button/element
 * @param {string} props.className - Optional additional CSS classes
 */
export default function PageHeader({ 
  title, 
  description, 
  action,
  className = '' 
}) {
  return (
    <div className={`flex flex-col md:flex-row md:items-center md:justify-between mb-6 ${className}`}>
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>
      {action && (
        <div className="mt-4 md:mt-0">
          {action}
        </div>
      )}
    </div>
  );
}
