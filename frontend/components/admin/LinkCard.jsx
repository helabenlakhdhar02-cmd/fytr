'use client';

import React from 'react';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

/**
 * LinkCard - A reusable component for navigation links in admin pages
 * 
 * @param {Object} props
 * @param {string} props.href - The URL to navigate to
 * @param {React.ReactNode} props.icon - The icon to display
 * @param {string} props.label - The text to display
 * @param {string} props.className - Optional additional CSS classes
 * @param {Function} props.onClick - Optional click handler
 */
export default function LinkCard({ 
  href, 
  icon, 
  label, 
  className = '',
  onClick
}) {
  const content = (
    <div className={`flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors group ${className}`}>
      <div className="flex items-center">
        {icon && <span className="mr-3 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{icon}</span>}
        <span className="text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{label}</span>
      </div>
      <FaArrowRight className="text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
    </div>
  );

  if (onClick) {
    return (
      <button 
        onClick={onClick} 
        className="w-full text-left"
      >
        {content}
      </button>
    );
  }

  return (
    <Link href={href}>
      {content}
    </Link>
  );
}
