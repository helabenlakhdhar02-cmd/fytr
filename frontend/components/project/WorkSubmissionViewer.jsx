'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaDownload, FaExternalLinkAlt, FaStar, FaThumbsUp, FaThumbsDown,
  FaComment, FaCheck, FaTimes, FaImage, FaFile, FaFileAlt,
  FaFileImage, FaFilePdf, FaFileArchive, FaFileCode, FaHistory,
  FaExclamationTriangle, FaPencilAlt, FaEye
} from 'react-icons/fa';

const WorkSubmissionViewer = ({ submission, onAccept, onReject, onRequestRevision, onRate }) => {
  const [activeTab, setActiveTab] = useState('preview');
  const [ratings, setRatings] = useState({
    quality: 0,
    communication: 0,
    timeliness: 0,
    accuracy: 0,
    overall: 0
  });
  const [feedback, setFeedback] = useState('');
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [revisionDetails, setRevisionDetails] = useState('');
  const [showRevisionForm, setShowRevisionForm] = useState(false);
  const [revisionHistory, setRevisionHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Get file icon based on file type
  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'image':
        return <FaFileImage className="text-blue-500" size={24} />;
      case 'pdf':
        return <FaFilePdf className="text-red-500" size={24} />;
      case 'zip':
        return <FaFileArchive className="text-yellow-500" size={24} />;
      case 'code':
        return <FaFileCode className="text-green-500" size={24} />;
      case 'doc':
        return <FaFileAlt className="text-blue-400" size={24} />;
      default:
        return <FaFile className="text-gray-500" size={24} />;
    }
  };

  // Handle rating change
  const handleRatingChange = (category, value) => {
    const newRatings = { ...ratings, [category]: value };

    // Calculate overall rating as average of all other ratings
    const ratingCategories = ['quality', 'communication', 'timeliness', 'accuracy'];
    const sum = ratingCategories.reduce((acc, cat) => acc + newRatings[cat], 0);
    const overall = Math.round((sum / ratingCategories.length) * 10) / 10;

    setRatings({ ...newRatings, overall });
  };

  // Handle submission acceptance
  const handleAccept = () => {
    setShowRatingForm(true);
  };

  // Handle final submission with rating
  const handleSubmitRating = () => {
    onAccept(submission.id, { ratings, feedback });
    setShowRatingForm(false);
  };

  // Handle submission rejection
  const handleReject = () => {
    onReject(submission.id, feedback);
  };

  // Handle revision request
  const handleRequestRevision = () => {
    setShowRevisionForm(true);
  };

  // Submit revision request
  const handleSubmitRevision = () => {
    onRequestRevision(submission.id, revisionDetails);

    // Add to revision history
    const newRevision = {
      id: revisionHistory.length + 1,
      date: new Date().toISOString(),
      details: revisionDetails
    };

    setRevisionHistory([...revisionHistory, newRevision]);
    setRevisionDetails('');
    setShowRevisionForm(false);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 dark:bg-gray-700 p-4 border-b border-gray-200 dark:border-gray-600">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {submission.title}
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Submitted: {formatDate(submission.submittedAt)}
            </span>
            {submission.status === 'accepted' && (
              <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Accepted
              </span>
            )}
            {submission.status === 'rejected' && (
              <span className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Rejected
              </span>
            )}
            {submission.status === 'revision' && (
              <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Revision Requested
              </span>
            )}
            {submission.status === 'pending' && (
              <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Pending Review
              </span>
            )}
          </div>
        </div>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {submission.description}
        </p>

        {/* Revision history toggle */}
        {revisionHistory.length > 0 && (
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="mt-2 text-xs flex items-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            <FaHistory className="mr-1" size={12} />
            {showHistory ? 'Hide Revision History' : `Show Revision History (${revisionHistory.length})`}
          </button>
        )}

        {/* Revision history */}
        {showHistory && revisionHistory.length > 0 && (
          <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-600 rounded-lg text-xs">
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Revision History</h4>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {revisionHistory.map((revision) => (
                <div key={revision.id} className="p-1 border-l-2 border-yellow-400 pl-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Revision #{revision.id}</span>
                    <span className="text-gray-500 dark:text-gray-400">{formatDate(revision.date)}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{revision.details}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'preview'
                ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setActiveTab('files')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'files'
                ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Files ({submission.files.length})
          </button>
          <button
            onClick={() => setActiveTab('comments')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'comments'
                ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Comments ({submission.comments.length})
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Preview Tab */}
        {activeTab === 'preview' && (
          <div>
            {submission.previewType === 'image' && (
              <div className="flex justify-center">
                <img
                  src={submission.previewUrl}
                  alt="Work preview"
                  className="max-w-full max-h-96 rounded-lg shadow-md"
                />
              </div>
            )}
            {submission.previewType === 'text' && (
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {submission.previewText}
                </p>
              </div>
            )}
            {submission.previewType === 'link' && (
              <div className="flex justify-center">
                <a
                  href={submission.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800/40 transition-colors"
                >
                  <FaExternalLinkAlt className="mr-2" size={14} />
                  View Live Preview
                </a>
              </div>
            )}
            {!submission.previewType && (
              <div className="flex justify-center items-center h-40 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">No preview available</p>
              </div>
            )}
          </div>
        )}

        {/* Files Tab */}
        {activeTab === 'files' && (
          <div className="space-y-3">
            {submission.files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center">
                  {getFileIcon(file.type)}
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {file.size} • {file.uploadedAt}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => window.open(file.url, '_blank')}
                    className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
                    title="Preview"
                  >
                    <FaEye size={16} />
                  </button>
                  <a
                    href={file.url}
                    download={file.name}
                    className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
                    title="Download"
                  >
                    <FaDownload size={16} />
                  </a>
                </div>
              </div>
            ))}
            {submission.files.length === 0 && (
              <div className="flex justify-center items-center h-20 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">No files uploaded</p>
              </div>
            )}
          </div>
        )}

        {/* Comments Tab */}
        {activeTab === 'comments' && (
          <div className="space-y-4">
            {submission.comments.map((comment, index) => (
              <div
                key={index}
                className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center mb-2">
                  <img
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    className="w-8 h-8 rounded-full mr-2"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/fighterfish.png";
                    }}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {comment.author.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {comment.timestamp}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {comment.text}
                </p>
              </div>
            ))}
            {submission.comments.length === 0 && (
              <div className="flex justify-center items-center h-20 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">No comments yet</p>
              </div>
            )}
            <div className="mt-4">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Add a comment or feedback..."
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                rows={3}
              ></textarea>
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => console.log('Comment added')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
                >
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      {submission.status === 'pending' && !showRatingForm && !showRevisionForm && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
          <div className="space-x-2">
            <button
              onClick={handleReject}
              className="px-4 py-2 bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 border border-red-600 dark:border-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm"
            >
              <FaTimes className="inline mr-2" size={14} />
              Reject
            </button>
            <button
              onClick={handleRequestRevision}
              className="px-4 py-2 bg-white dark:bg-gray-700 text-yellow-600 dark:text-yellow-400 border border-yellow-600 dark:border-yellow-400 rounded-lg hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors text-sm"
            >
              <FaPencilAlt className="inline mr-2" size={14} />
              Request Revision
            </button>
          </div>
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
          >
            <FaCheck className="inline mr-2" size={14} />
            Accept & Rate
          </button>
        </div>
      )}

      {/* Revision Request Form */}
      {showRevisionForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="p-4 border-t border-gray-200 dark:border-gray-700"
        >
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
            Request Revision
          </h4>
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Please provide detailed feedback on what needs to be revised:
            </p>
            <textarea
              value={revisionDetails}
              onChange={(e) => setRevisionDetails(e.target.value)}
              placeholder="Describe the changes needed..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              rows={4}
            ></textarea>
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => setShowRevisionForm(false)}
              className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitRevision}
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-sm"
              disabled={!revisionDetails.trim()}
            >
              Submit Revision Request
            </button>
          </div>
        </motion.div>
      )}

      {/* Rating Form */}
      {showRatingForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="p-4 border-t border-gray-200 dark:border-gray-700"
        >
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
            Rate this submission
          </h4>

          {/* Rating categories */}
          <div className="space-y-4 mb-4">
            {/* Quality */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Quality of Work
                </label>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {ratings.quality}/5
                </span>
              </div>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => handleRatingChange('quality', value)}
                    className={`p-1 rounded-full ${
                      ratings.quality >= value
                        ? 'text-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  >
                    <FaStar size={24} />
                  </button>
                ))}
              </div>
            </div>

            {/* Communication */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Communication
                </label>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {ratings.communication}/5
                </span>
              </div>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => handleRatingChange('communication', value)}
                    className={`p-1 rounded-full ${
                      ratings.communication >= value
                        ? 'text-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  >
                    <FaStar size={24} />
                  </button>
                ))}
              </div>
            </div>

            {/* Timeliness */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Timeliness
                </label>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {ratings.timeliness}/5
                </span>
              </div>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => handleRatingChange('timeliness', value)}
                    className={`p-1 rounded-full ${
                      ratings.timeliness >= value
                        ? 'text-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  >
                    <FaStar size={24} />
                  </button>
                ))}
              </div>
            </div>

            {/* Accuracy */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Accuracy (Matching Requirements)
                </label>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {ratings.accuracy}/5
                </span>
              </div>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => handleRatingChange('accuracy', value)}
                    className={`p-1 rounded-full ${
                      ratings.accuracy >= value
                        ? 'text-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  >
                    <FaStar size={24} />
                  </button>
                ))}
              </div>
            </div>

            {/* Overall Rating (calculated automatically) */}
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-gray-900 dark:text-white">
                  Overall Rating
                </label>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {ratings.overall}/5
                </span>
              </div>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <div
                    key={value}
                    className={`p-1 ${
                      ratings.overall >= value
                        ? 'text-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  >
                    <FaStar size={24} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feedback textarea */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Additional Feedback (Optional)
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your thoughts about this work..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              rows={3}
            ></textarea>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setShowRatingForm(false)}
              className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitRating}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
              disabled={!ratings.quality || !ratings.communication || !ratings.timeliness || !ratings.accuracy}
            >
              Submit Rating
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default WorkSubmissionViewer;
