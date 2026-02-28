'use client';

import React from 'react';

/**
 * AdminSection - A reusable component for consistent section layout in admin pages
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content of the section
 * @param {string} props.title - The title of the section
 * @param {React.ReactNode} props.icon - Optional icon to display next to the title
 * @param {string} props.className - Optional additional CSS classes
 * @param {React.ReactNode} props.headerAction - Optional action button/element in the header
 * @param {boolean} props.noPadding - If true, removes the default padding
 * @param {string} props.id - Optional ID for the section
 */
export default function AdminSection({ 
  children, 
  title, 
  icon, 
  className = '', 
  headerAction,
  noPadding = false,
  id
}) {
  return (
    <section 
      id={id}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden ${className}`}
    >
      {title && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 flex items-center justify-between">
          <div className="flex items-center">
            {icon && <span className="mr-3">{icon}</span>}
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h2>
          </div>
          {headerAction && (
            <div className="flex items-center">
              {headerAction}
            </div>
          )}
        </div>
      )}
      <div className={noPadding ? '' : 'p-6'}>
        {children}
      </div>
    </section>
  );
}
