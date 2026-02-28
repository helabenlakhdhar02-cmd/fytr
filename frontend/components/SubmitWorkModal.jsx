'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUpload, FaLink, FaComment, FaCheck, FaExclamationTriangle, FaFileAlt, FaTimes } from 'react-icons/fa';

const SubmitWorkModal = ({ isOpen, onClose, taskData }) => {
  const [file, setFile] = useState(null);
  const [comment, setComment] = useState('');
  const [url, setUrl] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Character count for comment
  const maxCommentLength = 500;
  const remainingChars = maxCommentLength - comment.length;

  // Allowed file types
  const allowedTypes = [
    'application/pdf', // PDF
    'application/zip', // ZIP
    'application/x-zip-compressed', // ZIP
    'image/jpeg', // JPG
    'image/png', // PNG
    'application/msword', // DOC
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
    'video/mp4', // MP4
    'application/vnd.ms-powerpoint', // PPT
    'application/vnd.openxmlformats-officedocument.presentationml.presentation', // PPTX
    'text/plain', // TXT
    'application/vnd.ms-excel', // XLS
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLSX
    'application/json', // JSON
    'text/html', // HTML
    'text/css', // CSS
    'application/javascript', // JS
    'application/xml', // XML
    'image/svg+xml', // SVG
    'image/gif', // GIF
  ];

  // Max file size (100MB in bytes)
  const maxFileSize = 100 * 1024 * 1024;

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    validateAndSetFile(selectedFile);
  };

  // Validate and set file
  const validateAndSetFile = (selectedFile) => {
    if (!selectedFile) return;

    setErrors({});

    // Check file type
    if (!allowedTypes.includes(selectedFile.type)) {
      setErrors(prev => ({
        ...prev,
        file: 'Unsupported file type. Please upload a PDF, ZIP, JPG, PNG, DOC, DOCX, MP4, or other common format.'
      }));
      return;
    }

    // Check file size
    if (selectedFile.size > maxFileSize) {
      setErrors(prev => ({
        ...prev,
        file: 'File is too large. Maximum size is 100MB.'
      }));
      return;
    }

    // Set file if valid
    setFile(selectedFile);
  };

  // Handle URL change
  const handleUrlChange = (e) => {
    const value = e.target.value;
    setUrl(value);

    // Clear URL error when field is empty or modified
    if (!value || errors.url) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.url;
        return newErrors;
      });
    }
  };

  // Handle comment change
  const handleCommentChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxCommentLength) {
      setComment(value);
    }
  };

  // Handle drag events
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    const newErrors = {};

    // Validate URL if provided
    if (url && !url.startsWith('https://')) {
      newErrors.url = 'URL must start with https://';
    }

    // Validate that at least file or URL is provided
    if (!file && !url) {
      newErrors.general = 'Please upload a file or provide a valid link.';
    }

    // If there are errors, display them and stop submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Proceed with submission
    setIsSubmitting(true);

    // Simulate API call with setTimeout
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Close modal after 3 seconds
      setTimeout(() => {
        onClose();
        // Reset form
        setFile(null);
        setComment('');
        setUrl('');
        setErrors({});
        setIsSuccess(false);
      }, 3000);
    }, 1500);
  };

  // Get file size in readable format
  const getFileSize = (size) => {
    if (size < 1024) return size + ' B';
    else if (size < 1024 * 1024) return (size / 1024).toFixed(2) + ' KB';
    else return (size / (1024 * 1024)).toFixed(2) + ' MB';
  };

  // Check if form is valid for submission
  const isFormValid = file || (url && url.startsWith('https://'));

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: 'spring', damping: 25 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          {/* Success Message */}
          {isSuccess ? (
            <div className="p-8 text-center">
              <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                <FaCheck className="text-green-600 dark:text-green-400 text-4xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Your work has been successfully submitted!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                The client will be notified and will review your submission soon.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6 max-w-md mx-auto text-left">
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  <strong>What happens next?</strong>
                </p>
                <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-1 list-disc pl-5">
                  <li>The client will review and rate your work (1-5 stars)</li>
                  <li>You'll receive feedback to help improve your skills</li>
                  <li>Check the Group Board for discussions about the project</li>
                </ul>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This window will close in 3 seconds...
              </p>
            </div>
          ) : (
            <>
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Submit Your Work
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Your submission will be reviewed and rated by the client (1-5 stars)
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                {/* Task Info */}
                <div className="bg-gray-50 dark:bg-gray-750 rounded-lg p-4 mb-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    {taskData?.title || "Logo Design for Coffee Brand"}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                    {taskData?.description || "Create a modern, memorable logo for a premium coffee brand that appeals to young professionals."}
                  </p>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium">Deadline:</span> {taskData?.deadline || "April 22, 2025 - 11:59 PM"}
                  </div>
                </div>

                {/* Submission Form */}
                <form onSubmit={handleSubmit}>
                  {/* General Error */}
                  {errors.general && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-400 flex items-start">
                      <FaExclamationTriangle className="flex-shrink-0 mr-3 mt-0.5" />
                      <span>{errors.general}</span>
                    </div>
                  )}

                  {/* File Upload */}
                  <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                      <div className="flex items-center">
                        <FaUpload className="mr-2" />
                        <span>Upload File</span>
                      </div>
                    </label>
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                        isDragging
                          ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                          : file
                            ? 'border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/20'
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                      }`}
                      onClick={() => fileInputRef.current.click()}
                      onDragEnter={handleDragEnter}
                      onDragLeave={handleDragLeave}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept={allowedTypes.join(',')}
                      />

                      {file ? (
                        <div className="flex flex-col items-center">
                          <FaFileAlt className="text-green-500 dark:text-green-400 text-3xl mb-2" />
                          <p className="text-gray-900 dark:text-white font-medium mb-1">{file.name}</p>
                          <p className="text-gray-500 dark:text-gray-400 text-sm">{getFileSize(file.size)}</p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFile(null);
                            }}
                            className="mt-3 text-red-600 dark:text-red-400 text-sm hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <>
                          <FaUpload className="mx-auto text-gray-400 dark:text-gray-500 text-3xl mb-3" />
                          <p className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                            Drag and drop your file here, or click to browse
                          </p>
                          <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Supports PDF, ZIP, JPG, PNG, DOC, DOCX, MP4, and other common formats (Max 100MB)
                          </p>
                        </>
                      )}
                    </div>
                    {errors.file && (
                      <p className="mt-2 text-red-600 dark:text-red-400 text-sm">
                        {errors.file}
                      </p>
                    )}
                  </div>

                  {/* Comment */}
                  <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                      <div className="flex items-center">
                        <FaComment className="mr-2" />
                        <span>Comment (Optional)</span>
                      </div>
                    </label>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-3 text-sm text-gray-700 dark:text-gray-300">
                      <p>Add context about your work or ask questions. Remember you can also use the Group Board below to discuss with other freelancers!</p>
                    </div>
                    <textarea
                      value={comment}
                      onChange={handleCommentChange}
                      placeholder="Explain your approach, challenges you solved, or any specific details the client should know..."
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      rows={4}
                      maxLength={maxCommentLength}
                    />
                    <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <span>This comment will be visible to the client only</span>
                      <span>{remainingChars} characters remaining</span>
                    </div>
                  </div>

                  {/* URL Link */}
                  <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                      <div className="flex items-center">
                        <FaLink className="mr-2" />
                        <span>URL Link (Optional)</span>
                      </div>
                    </label>
                    <input
                      type="text"
                      value={url}
                      onChange={handleUrlChange}
                      placeholder="https://github.com/your-repo or https://drive.google.com/your-file"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                    {errors.url && (
                      <p className="mt-2 text-red-600 dark:text-red-400 text-sm">
                        {errors.url}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Must start with https:// — link to GitHub, Drive, Loom, etc.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-6 py-3 mr-3 rounded-lg text-gray-700 dark:text-gray-300 font-medium transition-colors border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!isFormValid || isSubmitting}
                      className={`px-8 py-3 rounded-lg text-white font-medium transition-colors shadow-md ${
                        isFormValid && !isSubmitting
                          ? 'bg-blue-600 hover:bg-blue-700 transform hover:scale-105'
                          : 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        'Submit Your Work'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SubmitWorkModal;
