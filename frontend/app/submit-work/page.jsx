'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUpload, FaLink, FaComment, FaCheck, FaExclamationTriangle, FaArrowLeft, FaFileAlt, FaUser, FaClock } from 'react-icons/fa';
import Navbar from '../../components/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Sample task data (in a real app, this would be fetched from an API)
const sampleTask = {
  id: 'task-123',
  title: 'Logo Design for Coffee Brand',
  description: 'Create a modern, memorable logo for a premium coffee brand that appeals to young professionals.',
  client: {
    name: 'Coffee Roasters Inc.',
    logo: '/fighterfish.png' // Using the existing image as a placeholder
  },
  deadline: 'April 22, 2025 - 11:59 PM',
  status: 'in-progress'
};

const SubmitWorkPage = () => {
  const router = useRouter();
  const [task] = useState(sampleTask);
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
      
      // Redirect after 3 seconds
      setTimeout(() => {
        router.push('/my-submissions');
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
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/dashboard/home" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline">
            <FaArrowLeft className="mr-2" /> Back to Dashboard
          </Link>
        </div>
        
        {/* Success Message */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-xl text-center">
                <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                  <FaCheck className="text-green-600 dark:text-green-400 text-4xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Your work has been successfully submitted!
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  The client will be notified and will review your submission soon.
                </p>
                <button
                  onClick={() => router.push('/my-submissions')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
                >
                  Go to My Submissions
                </button>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  Redirecting in 3 seconds...
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Submit Your Work
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Make sure your submission represents your best effort. You can upload a file and/or provide a link.
          </p>
        </motion.div>
        
        {/* Task Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                <img
                  src={task.client.logo}
                  alt={task.client.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/fighterfish.png";
                  }}
                />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {task.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                {task.description}
              </p>
              <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 gap-4">
                <div className="flex items-center">
                  <FaUser className="mr-1" />
                  <span>{task.client.name}</span>
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-1" />
                  <span>Deadline: {task.deadline}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Submission Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8 border border-gray-200 dark:border-gray-700"
        >
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
            <textarea
              value={comment}
              onChange={handleCommentChange}
              placeholder="Add a short message to explain what was done or add context..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              rows={4}
              maxLength={maxCommentLength}
            />
            <div className="flex justify-end mt-1 text-xs text-gray-500 dark:text-gray-400">
              {remainingChars} characters remaining
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
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`px-6 py-3 rounded-lg text-white font-medium transition-colors ${
                isFormValid && !isSubmitting
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Work'}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default SubmitWorkPage;
