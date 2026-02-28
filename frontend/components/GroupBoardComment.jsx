'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaReply, FaTrash, FaClock } from 'react-icons/fa';

/**
 * Component for displaying a comment in the Group Board
 */
const GroupBoardComment = ({ 
  comment, 
  onReply, 
  onDelete, 
  isAdmin = false,
  currentUser = null
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  
  // Format the timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  // Get badge color based on user level
  const getBadgeColor = (level) => {
    switch(level?.toLowerCase()) {
      case 'platinum':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'gold':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'silver':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    }
  };
  
  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyText.trim()) {
      onReply(comment.id, replyText);
      setReplyText('');
      setShowReplyForm(false);
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 mb-4"
    >
      {/* Comment Header */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
            <img 
              src={comment.user.profileImg || "/fighterfish.png"} 
              alt={comment.user.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/fighterfish.png";
              }}
            />
          </div>
          <div>
            <div className="flex items-center">
              <span className="font-medium text-gray-900 dark:text-white mr-2">
                {comment.user.name}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${getBadgeColor(comment.user.level)}`}>
                {comment.user.level}
              </span>
            </div>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <FaClock className="mr-1" size={10} />
              {formatTime(comment.timestamp)}
            </div>
          </div>
        </div>
        
        {/* Delete button - only visible to admins or the comment author */}
        {(isAdmin || (currentUser && currentUser.id === comment.user.id)) && (
          <button 
            onClick={() => onDelete(comment.id)}
            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
            aria-label="Delete comment"
          >
            <FaTrash size={14} />
          </button>
        )}
      </div>
      
      {/* Comment Content */}
      <p className="text-gray-700 dark:text-gray-300 mb-3 whitespace-pre-wrap">
        {comment.text}
      </p>
      
      {/* Reply Button */}
      {!comment.isReply && !showReplyForm && currentUser && (
        <button 
          onClick={() => setShowReplyForm(true)}
          className="text-blue-600 dark:text-blue-400 text-sm flex items-center hover:underline"
        >
          <FaReply className="mr-1" size={12} />
          Reply
        </button>
      )}
      
      {/* Reply Form */}
      {showReplyForm && (
        <form onSubmit={handleReplySubmit} className="mt-2">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
            maxLength={300}
            rows={2}
            required
          />
          <div className="flex justify-end mt-2 space-x-2">
            <button
              type="button"
              onClick={() => setShowReplyForm(false)}
              className="px-3 py-1 text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 text-xs text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Reply
            </button>
          </div>
        </form>
      )}
      
      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-3 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
          {comment.replies.map((reply) => (
            <div key={reply.id} className="mt-2 bg-gray-50 dark:bg-gray-750 p-3 rounded-md">
              <div className="flex items-center mb-1">
                <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                  <img 
                    src={reply.user.profileImg || "/fighterfish.png"} 
                    alt={reply.user.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/fighterfish.png";
                    }}
                  />
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900 dark:text-white text-sm mr-2">
                      {reply.user.name}
                    </span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${getBadgeColor(reply.user.level)}`}>
                      {reply.user.level}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <FaClock className="mr-1" size={10} />
                    {formatTime(reply.timestamp)}
                  </div>
                </div>
                
                {/* Delete reply button */}
                {(isAdmin || (currentUser && currentUser.id === reply.user.id)) && (
                  <button 
                    onClick={() => onDelete(reply.id, comment.id)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors ml-auto"
                    aria-label="Delete reply"
                  >
                    <FaTrash size={12} />
                  </button>
                )}
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap">
                {reply.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default GroupBoardComment;
