'use client';

import React, { useState, useContext, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperclip, FaCheck, FaClock, FaInfoCircle, FaEye, FaComments } from 'react-icons/fa';
import { ChatContext } from '../context/ChatContext';
import SubmissionReviewPanel from './SubmissionReviewPanel';
import FilePreview from './FilePreview';

const ProjectUserContainer = ({ user, hasSubmitted = false, showChat = false, onReviewSave, onExpandChange, onSubmissionStatusChange, isWinnerSelected = false }) => {
  // State for review panel
  const [isReviewPanelOpen, setIsReviewPanelOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const containerRef = useRef(null);

  // Chat context
  const { 
    openChat, 
    setActiveChat, 
    activeChat 
  } = useContext(ChatContext) || {};

  // Sample submission data
  const submissionData = {
    files: [
      {
        id: 1,
        name: 'logo_concept_v1.png',
        type: 'image',
        size: '2.4 MB',
        url: '/api/placeholder/400/300',
        uploadedAt: '2023-11-16T09:15:00Z'
      },
      {
        id: 2,
        name: 'logo_concept_v2.png',
        type: 'image',
        size: '2.1 MB',
        url: '/api/placeholder/400/300',
        uploadedAt: '2023-11-16T09:20:00Z'
      }
    ],
    description: 'Here are two initial logo concepts for your coffee brand. The first one focuses on a minimalist approach with clean typography, while the second incorporates a subtle coffee bean element. Both use the earth tones you requested.',
    submittedAt: '2023-11-16T09:25:00Z'
  };

  // Toggle review panel
  const toggleReviewPanel = () => {
    const newState = !isReviewPanelOpen;
    setIsReviewPanelOpen(newState);
    
    // Notify parent component about expansion change
    if (onExpandChange) {
      onExpandChange(user.id, newState);
    }
  };

  // Handle chat button click
  const handleChatClick = () => {
    if (openChat && setActiveChat) {
      setActiveChat({
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        isOnline: user.isOnline || false
      });
      openChat();
    }
  };

  // Handle view work button click
  const handleViewWork = () => {
    toggleReviewPanel();
  };

  const handleSubmitWork = () => {
    if (isWinnerSelected) return; // Prevent submission if winner is already selected

    console.log(`Open submit work modal for ${user.name}`);
    // In a real app, this would navigate to the submission page
    window.location.href = '/dashboard/active-projects';
  };

  // Handle submission status change
  useEffect(() => {
    if (onSubmissionStatusChange) {
      onSubmissionStatusChange(hasSubmitted);
    }
  }, [hasSubmitted, onSubmissionStatusChange]);

  // Handle review save
  const handleReviewSave = (reviewData) => {
    if (onReviewSave) {
      onReviewSave(user.id, reviewData);
    }
    setIsReviewPanelOpen(false);
  };

  return (
    <div ref={containerRef} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* User Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={user.avatar || '/fighterfish.png'}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
              />
              {user.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{user.name}</h3>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(user.rating || 0)
                          ? 'text-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ({user.rating?.toFixed(1) || '0.0'})
                </span>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center space-x-2">
            {hasSubmitted ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                <FaCheck className="mr-1" size={10} />
                Submitted
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                <FaClock className="mr-1" size={10} />
                Pending
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-2 justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleChatClick}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center text-sm"
            >
              <FaComments className="mr-1" size={12} />
              Message
            </button>
            
            {hasSubmitted && (
              <button
                onClick={handleViewWork}
                className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center text-sm"
              >
                <FaEye className="mr-1" size={12} />
                View Work
              </button>
            )}
          </div>

          {!hasSubmitted && !isWinnerSelected && (
            <button
              onClick={handleSubmitWork}
              className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center text-sm"
            >
              <FaPaperclip className="mr-1" size={12} />
              Submit Work
            </button>
          )}
        </div>
      </div>

      {/* Submission Details (if submitted) */}
      {hasSubmitted && (
        <div className="p-4">
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Submission</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {submissionData.description}
              </p>
            </div>

            {/* Files Preview */}
            <div>
              <h5 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">Files ({submissionData.files.length})</h5>
              <div className="grid grid-cols-2 gap-2">
                {submissionData.files.slice(0, 2).map((file) => (
                  <div key={file.id} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
                    <div className="flex items-center space-x-2">
                      <FaPaperclip className="text-gray-400" size={12} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-900 dark:text-white truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {file.size}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {submissionData.files.length > 2 && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  +{submissionData.files.length - 2} more files
                </p>
              )}
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-400">
              Submitted {new Date(submissionData.submittedAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      )}

      {/* Review Panel */}
      <AnimatePresence>
        {isReviewPanelOpen && hasSubmitted && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <SubmissionReviewPanel
              user={user}
              submission={submissionData}
              onSave={handleReviewSave}
              onClose={() => setIsReviewPanelOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectUserContainer;
