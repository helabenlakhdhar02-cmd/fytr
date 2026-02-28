'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FaPlus, FaReply, FaThumbsUp, FaEdit, FaTrash, FaSpinner } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

const ProjectDiscussionBoard = ({ projectId, isClient = false }) => {
  const [discussions, setDiscussions] = useState([]);
  const [newDiscussion, setNewDiscussion] = useState('');
  const [replyText, setReplyText] = useState({});
  const [editingDiscussion, setEditingDiscussion] = useState(null);
  const [editText, setEditText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'questions', 'discussions'
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'popular'
  const [showReplyForm, setShowReplyForm] = useState({});
  const [username, setUsername] = useState('');
  const [userAvatar, setUserAvatar] = useState('/fighterfish.png');

  useEffect(() => {
    // Get user info from localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    
    // Get user avatar if available
    const profileImg = localStorage.getItem('profileImg');
    if (profileImg) {
      setUserAvatar(profileImg);
    }

    // Fetch discussions for this project
    fetchDiscussions();
  }, [projectId]);

  const fetchDiscussions = async () => {
    setIsLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`http://localhost:8000/fyter/chatrooms/${projectId}/messages/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setDiscussions(data);
      } else {
        console.error('Failed to fetch discussions');
      }
    } catch (error) {
      console.error('Error fetching discussions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddDiscussion = async () => {
    if (!newDiscussion.trim()) return;
    
    try {
      const response = await fetch(`http://localhost:8000/fyter/chatrooms/${projectId}/messages/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({
          content: newDiscussion
        })
      });
      
      if (response.ok) {
        // Refresh discussions
        fetchDiscussions();
        setNewDiscussion('');
      } else {
        console.error('Failed to add discussion');
      }
    } catch (error) {
      console.error('Error adding discussion:', error);
    }
  };

  const handleAddReply = async (discussionId) => {
    if (!replyText[discussionId]?.trim()) return;
    
    try {
      // In a real implementation, you would have an API endpoint for replies
      // For now, we'll just refresh the discussions
      setReplyText({...replyText, [discussionId]: ''});
      setShowReplyForm({...showReplyForm, [discussionId]: false});
      fetchDiscussions();
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  const handleLike = async (discussionId) => {
    try {
      // In a real implementation, you would have an API endpoint for likes
      // For now, we'll just refresh the discussions
      fetchDiscussions();
    } catch (error) {
      console.error('Error liking discussion:', error);
    }
  };

  const handleEdit = (discussionId, replyId, content) => {
    setEditingDiscussion({ discussionId, replyId });
    setEditText(content);
  };

  const handleSaveEdit = async () => {
    if (!editText.trim()) return;
    
    try {
      // In a real implementation, you would have an API endpoint for editing
      // For now, we'll just refresh the discussions
      setEditingDiscussion(null);
      fetchDiscussions();
    } catch (error) {
      console.error('Error saving edit:', error);
    }
  };

  const handleDelete = async (discussionId, replyId) => {
    try {
      // In a real implementation, you would have an API endpoint for deleting
      // For now, we'll just refresh the discussions
      fetchDiscussions();
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const toggleReplyForm = (discussionId) => {
    setShowReplyForm({
      ...showReplyForm,
      [discussionId]: !showReplyForm[discussionId]
    });
  };

  // Filter and sort discussions
  const filteredDiscussions = discussions.filter(discussion => {
    if (filter === 'all') return true;
    if (filter === 'questions') return discussion.content.includes('?');
    if (filter === 'discussions') return !discussion.content.includes('?');
    return true;
  });

  const sortedDiscussions = [...filteredDiscussions].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.timestamp) - new Date(a.timestamp);
    if (sortBy === 'oldest') return new Date(a.timestamp) - new Date(b.timestamp);
    if (sortBy === 'popular') return (b.likes || 0) - (a.likes || 0);
    return 0;
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Project Discussion</h2>
      
      {/* Filter and Sort Controls */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div className="flex space-x-2 mb-2 sm:mb-0">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              filter === 'all' 
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('questions')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              filter === 'questions' 
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Questions
          </button>
          <button
            onClick={() => setFilter('discussions')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              filter === 'discussions' 
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Discussions
          </button>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setSortBy('newest')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              sortBy === 'newest' 
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Newest
          </button>
          <button
            onClick={() => setSortBy('oldest')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              sortBy === 'oldest' 
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Oldest
          </button>
          <button
            onClick={() => setSortBy('popular')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              sortBy === 'popular' 
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Popular
          </button>
        </div>
      </div>
      
      {/* New Discussion Form */}
      <div className="mb-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
            <img 
              src={userAvatar} 
              alt="Your avatar" 
              className="h-full w-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/fighterfish.png";
              }}
            />
          </div>
          <div className="flex-grow">
            <textarea
              value={newDiscussion}
              onChange={(e) => setNewDiscussion(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ask a question or start a discussion..."
              rows={3}
            ></textarea>
            <div className="mt-2 flex justify-between items-center">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Include a question mark (?) if you're asking a question
              </div>
              <button
                onClick={handleAddDiscussion}
                disabled={!newDiscussion.trim()}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaPlus className="mr-2" /> Post
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <FaSpinner className="animate-spin text-blue-600 dark:text-blue-400 text-2xl" />
        </div>
      )}
      
      {/* Discussions List */}
      {!isLoading && sortedDiscussions.length > 0 ? (
        <div className="space-y-6">
          {sortedDiscussions.map((discussion) => (
            <motion.div 
              key={discussion.id} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            >
              {/* Discussion Header */}
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <img 
                      src={discussion.sender_profile_image || "/fighterfish.png"} 
                      alt={discussion.sender_full_name || discussion.sender_username} 
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/fighterfish.png";
                      }}
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        {discussion.sender_full_name || discussion.sender_username}
                      </h3>
                      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                        {formatDistanceToNow(new Date(discussion.timestamp), { addSuffix: true })}
                      </span>
                    </div>
                    
                    {editingDiscussion?.discussionId === discussion.id && editingDiscussion?.replyId === null ? (
                      <div className="mt-2">
                        <textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                          rows={3}
                        ></textarea>
                        <div className="mt-2 flex justify-end space-x-2">
                          <button
                            onClick={() => setEditingDiscussion(null)}
                            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSaveEdit}
                            className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                        {discussion.content}
                      </div>
                    )}
                    
                    <div className="mt-3 flex items-center space-x-4">
                      <button
                        onClick={() => handleLike(discussion.id)}
                        className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <FaThumbsUp className="mr-1" /> {discussion.likes || 0}
                      </button>
                      <button
                        onClick={() => toggleReplyForm(discussion.id)}
                        className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <FaReply className="mr-1" /> Reply
                      </button>
                      {discussion.sender_username === username && (
                        <>
                          <button
                            onClick={() => handleEdit(discussion.id, null, discussion.content)}
                            className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                          >
                            <FaEdit className="mr-1" /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(discussion.id, null)}
                            className="flex items-center text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                          >
                            <FaTrash className="mr-1" /> Delete
                          </button>
                        </>
                      )}
                    </div>
                    
                    {/* Reply Form */}
                    {showReplyForm[discussion.id] && (
                      <div className="mt-4">
                        <textarea
                          value={replyText[discussion.id] || ''}
                          onChange={(e) => setReplyText({...replyText, [discussion.id]: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Write a reply..."
                          rows={2}
                        ></textarea>
                        <div className="mt-2 flex justify-end space-x-2">
                          <button
                            onClick={() => toggleReplyForm(discussion.id)}
                            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleAddReply(discussion.id)}
                            disabled={!replyText[discussion.id]?.trim()}
                            className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Replies */}
              {discussion.replies && discussion.replies.length > 0 && (
                <div className="border-t border-gray-200 dark:border-gray-700">
                  <div className="p-4 space-y-4">
                    {discussion.replies.map((reply) => (
                      <div key={reply.id} className="pl-8 border-l-2 border-gray-200 dark:border-gray-700">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                            <img 
                              src={reply.sender_profile_image || "/fighterfish.png"} 
                              alt={reply.sender_full_name || reply.sender_username} 
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/fighterfish.png";
                              }}
                            />
                         