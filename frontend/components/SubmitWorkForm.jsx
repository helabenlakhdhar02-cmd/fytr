'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUpload, FaLink, FaComment, FaCheck, FaExclamationTriangle, FaSpinner, FaFile, FaImage, FaCode, FaFileAlt, FaFilePdf, FaFileArchive, FaExternalLinkAlt } from 'react-icons/fa';

const SubmitWorkForm = () => {
  // Form state
  const [file, setFile] = useState(null);
  const [link, setLink] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewType, setPreviewType] = useState(null);
  const fileInputRef = useRef(null);

  // Reset form when submission is successful
  useEffect(() => {
    if (isSubmitted) {
      setFile(null);
      setLink('');
      setComment('');
      setPreviewUrl(null);
      setPreviewType(null);
    }
  }, [isSubmitted]);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setErrors((prev) => ({ ...prev, file: null, general: null }));
      
      // Create preview URL for supported file types
      const fileType = selectedFile.type;
      if (fileType.startsWith('image/')) {
        setPreviewType('image');
        const url = URL.createObjectURL(selectedFile);
        setPreviewUrl(url);
      } else if (fileType === 'application/pdf') {
        setPreviewType('pdf');
        const url = URL.createObjectURL(selectedFile);
        setPreviewUrl(url);
      } else if (fileType.includes('text/') || fileType.includes('application/json') || 
                fileType.includes('application/javascript') || fileType.includes('text/html')) {
        setPreviewType('code');
        // For code files, we'll read the content
        const reader = new FileReader();
        reader.onload = (event) => {
          setPreviewUrl(event.target.result);
        };
        reader.readAsText(selectedFile);
      } else {
        // For other file types, just show file info
        setPreviewType('file');
        setPreviewUrl(null);
      }
    }
  };

  // Handle link input
  const handleLinkChange = (e) => {
    setLink(e.target.value);
    setErrors((prev) => ({ ...prev, link: null, general: null }));
    
    // If it's a valid URL, try to determine the type
    if (isValidUrl(e.target.value)) {
      const url = e.target.value.toLowerCase();
      if (url.match(/\.(jpeg|jpg|gif|png)$/)) {
        setPreviewType('image');
        setPreviewUrl(e.target.value);
      } else if (url.match(/\.(pdf)$/)) {
        setPreviewType('pdf');
        setPreviewUrl(e.target.value);
      } else if (url.includes('figma.com')) {
        setPreviewType('figma');
        setPreviewUrl(e.target.value);
      } else if (url.includes('github.com')) {
        setPreviewType('github');
        setPreviewUrl(e.target.value);
      } else if (url.includes('behance.net')) {
        setPreviewType('behance');
        setPreviewUrl(e.target.value);
      } else {
        setPreviewType('link');
        setPreviewUrl(e.target.value);
      }
    } else {
      setPreviewType(null);
      setPreviewUrl(null);
    }
  };

  // Handle comment input
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  // Validate URL
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Either file or link is required
    if (!file && !link) {
      newErrors.general = 'Please provide either a file or a link to your work';
    }
    
    // Validate link if provided
    if (link && !isValidUrl(link)) {
      newErrors.link = 'Please enter a valid URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful submission
      setIsSubmitted(true);
      setIsSubmitting(false);
      
      // In a real app, you would handle the response from the API
      console.log('Submission successful', {
        file: file ? file.name : null,
        link,
        comment
      });
    } catch (error) {
      console.error('Error submitting work:', error);
      setErrors({ general: 'Failed to submit work. Please try again.' });
      setIsSubmitting(false);
    }
  };

  // Render preview based on type
  const renderPreview = () => {
    if (!previewUrl && !previewType) return null;
    
    switch (previewType) {
      case 'image':
        return (
          <div className="mt-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 p-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preview:</h3>
            <div className="relative aspect-video bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden flex items-center justify-center">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="max-w-full max-h-[300px] object-contain"
                onError={() => {
                  setPreviewType('error');
                  setPreviewUrl(null);
                }}
              />
            </div>
          </div>
        );
      
      case 'pdf':
        return (
          <div className="mt-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 p-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">PDF Preview:</h3>
            <div className="relative aspect-video bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden">
              <iframe 
                src={previewUrl} 
                title="PDF Preview" 
                className="w-full h-[300px]"
                onError={() => {
                  setPreviewType('error');
                  setPreviewUrl(null);
                }}
              />
            </div>
          </div>
        );
      
      case 'code':
        return (
          <div className="mt-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 p-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Code Preview:</h3>
            <div className="bg-gray-100 dark:bg-gray-900 rounded-md p-3 overflow-auto max-h-[300px]">
              <pre className="text-xs text-gray-800 dark:text-gray-300 font-mono">
                {previewUrl ? previewUrl.substring(0, 2000) + (previewUrl.length > 2000 ? '...' : '') : 'No preview available'}
              </pre>
            </div>
          </div>
        );
      
      case 'figma':
      case 'github':
      case 'behance':
      case 'link':
        const platformName = previewType.charAt(0).toUpperCase() + previewType.slice(1);
        return (
          <div className="mt-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 p-4">
            <div className="flex items-center">
              <FaExternalLinkAlt className="text-blue-500 mr-2" />
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {platformName} Link Preview:
              </h3>
            </div>
            <a 
              href={previewUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {previewUrl}
              <FaExternalLinkAlt className="ml-1 h-3 w-3" />
            </a>
          </div>
        );
      
      case 'file':
        // Get file extension
        const fileName = file ? file.name : '';
        const fileExt = fileName.split('.').pop().toLowerCase();
        let FileIcon = FaFile;
        
        // Choose appropriate icon based on extension
        if (['zip', 'rar', '7z', 'tar', 'gz'].includes(fileExt)) {
          FileIcon = FaFileArchive;
        } else if (['doc', 'docx', 'txt', 'rtf'].includes(fileExt)) {
          FileIcon = FaFileAlt;
        } else if (['pdf'].includes(fileExt)) {
          FileIcon = FaFilePdf;
        } else if (['html', 'css', 'js', 'jsx', 'ts', 'tsx', 'json', 'xml'].includes(fileExt)) {
          FileIcon = FaCode;
        }
        
        return (
          <div className="mt-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 p-4">
            <div className="flex items-center">
              <FileIcon className="text-blue-500 mr-2 h-5 w-5" />
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">{fileName}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : ''}
                </p>
              </div>
            </div>
          </div>
        );
      
      case 'error':
        return (
          <div className="mt-4 border border-red-200 dark:border-red-800 rounded-lg overflow-hidden bg-red-50 dark:bg-red-900/20 p-4">
            <div className="flex items-center text-red-600 dark:text-red-400">
              <FaExclamationTriangle className="mr-2" />
              <h3 className="text-sm font-medium">Preview unavailable</h3>
            </div>
            <p className="mt-1 text-xs text-red-500 dark:text-red-400">
              We couldn't generate a preview for this file or link. You can still submit it.
            </p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Submit Your Work</h2>
      
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4"
          >
            <div className="flex items-center">
              <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full mr-3">
                <FaCheck className="text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-medium text-green-800 dark:text-green-300">Work Submitted Successfully</h3>
                <p className="text-sm text-green-700 dark:text-green-400 mt-1">Your work has been submitted and is awaiting review.</p>
              </div>
            </div>
            
            <div className="mt-4 border-t border-green-200 dark:border-green-800 pt-4">
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">Submission Details:</h4>
              {file && (
                <div className="bg-white dark:bg-gray-700 rounded-lg p-3 flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <FaFile className="text-blue-500 mr-2" />
                    <span className="text-gray-800 dark:text-white">{file.name}</span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                </div>
              )}
              
              {link && (
                <div className="bg-white dark:bg-gray-700 rounded-lg p-3 flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <FaLink className="text-blue-500 mr-2" />
                    <a 
                      href={link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 truncate max-w-xs"
                    >
                      {link}
                    </a>
                  </div>
                </div>
              )}
              
              {comment && (
                <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
                  <div className="flex items-start mb-1">
                    <FaComment className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
                    <span className="font-medium text-gray-800 dark:text-white">Your Comment:</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm pl-6">{comment}</p>
                </div>
              )}
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                Submit Another
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6"
          >
            {errors.general && (
              <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-red-600 dark:text-red-400 text-sm flex items-center">
                <FaExclamationTriangle className="mr-2 flex-shrink-0" />
                <span>{errors.general}</span>
              </div>
            )}
            
            <div className="text-center mb-6">
              <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-full inline-flex items-center justify-center mb-4">
                <FaUpload className="h-6 w-6 text-blue-600 dark:text-blue-300" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Upload Your Work</h3>
              <p className="text-gray-600 dark:text-gray-400">Submit your work by uploading a file or providing a link</p>
            </div>
            
            <div className="flex flex-col space-y-4">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <div className="flex items-center">
                    <FaFile className="mr-1 text-blue-500" />
                    <span>Upload File</span>
                    <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">(optional if link provided)</span>
                  </div>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={isSubmitting}
                  />
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isSubmitting}
                      className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-4 flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200 flex-grow"
                    >
                      <FaUpload className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {file ? 'Change File' : 'Choose File'}
                      </span>
                    </button>
                    {file && (
                      <button
                        type="button"
                        onClick={() => {
                          setFile(null);
                          setPreviewUrl(null);
                          setPreviewType(null);
                          // Reset the file input
                          if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                          }
                        }}
                        disabled={isSubmitting}
                        className="ml-2 p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                      >
                        <FaTimes />
                      </button>
                    )}
                  </div>
                  {file && (
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex items-center">
                      <FaFile className="mr-1 text-blue-500" />
                      <span className="truncate">{file.name}</span>
                      <span className="ml-1 text-xs">({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Link Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <div className="flex items-center">
                    <FaLink className="mr-1 text-blue-500" />
                    <span>External Link</span>
                    <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">(optional if file provided)</span>
                  </div>
                </label>
                <input
                  type="text"
                  value={link}
                  onChange={handleLinkChange}
                  placeholder="https://example.com/your-work"
                  disabled={isSubmitting}
                  className={`w-full bg-white dark:bg-gray-700 border ${errors.link ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'} rounded-lg py-2 px-4 text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.link && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.link}</p>
                )}
              </div>
              
              {/* Comment Textarea */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <div className="flex items-center">
                    <FaComment className="mr-1 text-blue-500" />
                    <span>Comment</span>
                    <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">(optional)</span>
                  </div>
                </label>
                <textarea
                  value={comment}
                  onChange={handleCommentChange}
                  placeholder="Add a comment about your submission"
                  disabled={isSubmitting}
                  className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-4 text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
                ></textarea>
              </div>
              
              {/* Preview Section */}
              {renderPreview()}
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md flex items-center justify-center`}
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <FaUpload className="mr-2" />
                    <span>Submit Work</span>
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubmitWorkForm;
