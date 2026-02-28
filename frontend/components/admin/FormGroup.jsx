'use client';

import React from 'react';

/**
 * FormGroup - A reusable component for form field groups
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The form field(s)
 * @param {string} props.label - The label text
 * @param {string} props.htmlFor - The ID of the form field (for the label's htmlFor attribute)
 * @param {boolean} props.required - Whether the field is required
 * @param {string} props.error - Error message to display
 * @param {string} props.helpText - Optional help text to display below the field
 * @param {string} props.className - Optional additional CSS classes
 */
export default function FormGroup({
  children,
  label,
  htmlFor,
  required = false,
  error,
  helpText,
  className = ''
}) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label 
          htmlFor={htmlFor} 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      {helpText && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helpText}</p>
      )}
    </div>
  );
}
