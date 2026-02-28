'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaComments, FaInfoCircle, FaLock, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import GroupBoardComment from './GroupBoardComment';

/**
 * Group Board component for freelancer discussions
 */
const GroupBoard = ({
  isArchived = false,
  taskId,
  currentUser = null,
  isAdmin = false
}) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [remainingComments, setRemainingComments] = useState(3); // Max 3 comments per user
  const [charactersLeft, setCharactersLeft] = useState(300);

  // Sample data for demonstration
  useEffect(() => {
    // This would normally be fetched from an API
    const sampleComments = [
      {
        id: 1,
        user: {
          id: 101,
          name: 'Freelancer 2',
          profileImg: '/fighterfish.png',
          level: 'Gold'
        },
        text: 'I learned a lot about color theory from this project. The client had specific requirements about brand colors that made me research more about color psychology.',
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        isReply: false,
        replies: [
          {
            id: 4,
            user: {
              id: 103,
              name: 'Freelancer 4',
              profileImg: '/fighterfish.png',
              level: 'Silver'
            },
            text: 'I agree! I also found some great resources about color psychology in branding. Would you like me to share them?',
            timestamp: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
            isReply: true
          }
        ]
      },
      {
        id: 2,
        user: {
          id: 102,
          name: 'Freelancer 3',
          profileImg: '/fighterfish.png',
          level: 'Silver'
        },
        text: 'The feedback about my typography choices was really helpful. I need to work more on font pairing for different brand personalities.',
        timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        isReply: false,
        replies: []
      },
      {
        id: 3,
        user: {
          id: 105,
          name: 'Freelancer 6',
          profileImg: '/fighterfish.png',
          level: 'Platinum'
        },
        text: '@Client - Could you clarify what aspects of the winning design resonated most with your brand vision? This would help us understand your preferences better for future projects.',
        timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        isReply: false,
        replies: []
      }
    ];

    setComments(sampleComments);

    // Calculate remaining comments for current user
    if (currentUser) {
      const userCommentCount = sampleComments.filter(
        comment => comment.user.id === currentUser.id && !comment.isReply
      ).length;
      setRemainingComments(3 - userCommentCount);
    }
  }, [currentUser]);

  // Handle comment input change
  const handleCommentChange = (e) => {
    const text = e.target.value;
    setNewComment(text);
    setCharactersLeft(300 - text.length);
    setError('');
  };

  // Handle comment submission
  const handleSubmitComment = (e) => {
    e.preventDefault();

    if (isArchived) {
      setError('This board has been archived and is now read-only.');
      return;
    }

    if (remainingComments <= 0) {
      setError('You have reached the maximum limit of 3 comments per task.');
      return;
    }

    if (newComment.trim() === '') {
      setError('Please enter a comment.');
      return;
    }

    // Create new comment
    const newCommentObj = {
      id: Date.now(), // Use a proper ID generation in production
      user: {
        id: currentUser.id,
        name: currentUser.name,
        profileImg: currentUser.profileImg,
        level: currentUser.level
      },
      text: newComment.trim(),
      timestamp: new Date().toISOString(),
      isReply: false,
      replies: []
    };

    // Add comment to the list
    setComments([newCommentObj, ...comments]);
    setNewComment('');
    setCharactersLeft(300);
    setRemainingComments(remainingComments - 1);

    // Show success message
    setSuccess('Comment sent successfully');
    setTimeout(() => setSuccess(''), 3000);
  };

  // Handle reply to a comment
  const handleReply = (commentId, replyText) => {
    if (isArchived) {
      setError('This board has been archived and is now read-only.');
      return;
    }

    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        // Check if there's already a reply
        if (comment.replies && comment.replies.length >= 1) {
          setError('Only one reply per comment is allowed.');
          return comment;
        }

        // Add the reply
        const newReply = {
          id: Date.now(),
          user: {
            id: currentUser.id,
            name: currentUser.name,
            profileImg: currentUser.profileImg,
            level: currentUser.level
          },
          text: replyText,
          timestamp: new Date().toISOString(),
          isReply: true
        };

        return {
          ...comment,
          replies: [...(comment.replies || []), newReply]
        };
      }
      return comment;
    });

    setComments(updatedComments);

    // Show success message
    setSuccess('Reply sent successfully');
    setTimeout(() => setSuccess(''), 3000);
  };

  // Handle delete comment or reply
  const handleDelete = (commentId, parentId = null) => {
    if (isArchived) {
      setError('This board has been archived and is now read-only.');
      return;
    }

    if (parentId) {
      // Delete a reply
      const updatedComments = comments.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies.filter(reply => reply.id !== commentId)
          };
        }
        return comment;
      });
      setComments(updatedComments);
    } else {
      // Delete a comment
      const deletedComment = comments.find(c => c.id === commentId);
      if (deletedComment && deletedComment.user.id === currentUser?.id) {
        setRemainingComments(remainingComments + 1);
      }
      setComments(comments.filter(comment => comment.id !== commentId));
    }

    // Show success message
    setSuccess('Comment deleted successfully');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-8"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="flex items-center">
          <FaComments className="text-blue-600 dark:text-blue-400 mr-3 text-xl" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              🗣️ Group Board – Let's Grow Together
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              Add a comment or ask for feedback before submitting. Let's discuss any issues or ideas together!
            </p>
          </div>
        </div>

        {isArchived && (
          <div className="flex items-center bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 px-3 py-1 rounded-full text-sm">
            <FaLock className="mr-2" size={14} />
            <span>Archived – Group closed after 7 days</span>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
        <div className="flex items-start">
          <FaInfoCircle className="text-blue-600 dark:text-blue-400 mt-1 mr-3" />
          <div>
            <p className="text-gray-700 dark:text-gray-300 text-sm font-medium">
              This is a space for the group to share feedback, ask questions, and learn from each other.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 mb-2">
              Even if you weren't selected, your participation here helps everyone grow and improve!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <ul className="text-gray-600 dark:text-gray-400 text-xs space-y-1">
                <li>• Maximum 3 comments per user per task</li>
                <li>• One reply per comment</li>
              </ul>
              <ul className="text-gray-600 dark:text-gray-400 text-xs space-y-1">
                <li>• Be respectful and constructive</li>
                <li>• The board will be archived after 7 days</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Comment Form */}
      {!isArchived && currentUser && (
        <form onSubmit={handleSubmitComment} className="mb-6">
          <div className="mb-2">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full overflow-hidden mr-2 border-2 border-blue-200 dark:border-blue-800">
                <img
                  src={currentUser.profileImg || "/fighterfish.png"}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/fighterfish.png";
                  }}
                />
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-900 dark:text-white mr-2">
                  {currentUser.name}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400`}>
                  {currentUser.level}
                </span>
              </div>
            </div>
            <textarea
              value={newComment}
              onChange={handleCommentChange}
              placeholder="💬 Share what you learned from this task or ask for feedback before submitting your work..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              maxLength={300}
              rows={3}
              disabled={remainingComments <= 0 || isArchived}
            />
            <div className="flex justify-between items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
              <span>
                {charactersLeft} characters left
              </span>
              <span className={remainingComments === 1 ? 'text-amber-600 dark:text-amber-400 font-medium' : ''}>
                {remainingComments} of 3 comments remaining
              </span>
            </div>
          </div>

          {/* Error and Success Messages */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md text-sm mb-3 flex items-start">
              <FaExclamationTriangle className="flex-shrink-0 mr-2 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-3 rounded-md text-sm mb-3 flex items-start">
              <FaCheck className="flex-shrink-0 mr-2 mt-0.5" />
              <span>{success}</span>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={remainingComments <= 0 || isArchived}
              className={`px-5 py-2 rounded-lg text-white font-medium shadow-sm ${
                remainingComments <= 0 || isArchived
                  ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 transform hover:scale-105 transition-transform'
              } transition-colors`}
            >
              Post Comment
            </button>
          </div>
        </form>
      )}

      {/* Read-only message for archived boards or non-users */}
      {(isArchived || !currentUser) && (
        <div className="mb-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center text-gray-600 dark:text-gray-400">
          {isArchived
            ? "This board has been archived and is now read-only."
            : "You need to be a member of this group to comment."}
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map(comment => (
            <GroupBoardComment
              key={comment.id}
              comment={comment}
              onReply={handleReply}
              onDelete={handleDelete}
              isAdmin={isAdmin}
              currentUser={currentUser}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default GroupBoard;
