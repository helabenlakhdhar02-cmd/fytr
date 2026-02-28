'use client';

import React, { useState, useEffect } from 'react';
import { 
  FaComment, 
  FaReply, 
  FaThumbsUp, 
  FaTrash, 
  FaEdit, 
  FaUser,
  FaExclamationTriangle,
  FaCheck,
  FaPlus,
  FaTimes,
  FaSort,
  FaFilter
} from 'react-icons/fa';

const DiscussionForum = ({ courseId, lessonId, isInstructor }) => {
  const [discussions, setDiscussions] = useState([]);
  const [newDiscussion, setNewDiscussion] = useState('');
  const [replyText, setReplyText] = useState({});
  const [editingDiscussion, setEditingDiscussion] = useState(null);
  const [editText, setEditText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'questions', 'discussions'
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'popular'
  const [showReplyForm, setShowReplyForm] = useState({});

  // Mock data for demonstration
  const mockDiscussions = [
    {
      id: 1,
      user: {
        id: 101,
        name: 'Ahmed Hassan',
        avatar: '/photos/users/user1.jpg',
        isInstructor: false
      },
      content: 'I\'m having trouble understanding the concept of React hooks. Can someone explain it in simpler terms?',
      timestamp: '2023-11-15T14:30:00',
      likes: 5,
      isQuestion: true,
      replies: [
        {
          id: 11,
          user: {
            id: 201,
            name: 'Mohamed Ali',
            avatar: '/photos/users/instructor1.jpg',
            isInstructor: true
          },
          content: 'Hooks are functions that let you "hook into" React state and lifecycle features from function components. They don\'t work inside classes. The most common hooks are useState and useEffect.',
          timestamp: '2023-11-15T15:45:00',
          likes: 8
        },
        {
          id: 12,
          user: {
            id: 102,
            name: 'Sara Ahmed',
            avatar: '/photos/users/user2.jpg',
            isInstructor: false
          },
          content: 'I found this tutorial really helpful for understanding hooks: https://reactjs.org/docs/hooks-intro.html',
          timestamp: '2023-11-15T16:20:00',
          likes: 3
        }
      ]
    },
    {
      id: 2,
      user: {
        id: 103,
        name: 'Omar Khalid',
        avatar: '/photos/users/user3.jpg',
        isInstructor: false
      },
      content: 'Great lesson! I especially liked the part about component lifecycle methods.',
      timestamp: '2023-11-14T10:15:00',
      likes: 12,
      isQuestion: false,
      replies: []
    },
    {
      id: 3,
      user: {
        id: 104,
        name: 'Layla Mohamed',
        avatar: '/photos/users/user4.jpg',
        isInstructor: false
      },
      content: 'Is there a way to optimize the performance of React components when dealing with large lists?',
      timestamp: '2023-11-13T09:45:00',
      likes: 7,
      isQuestion: true,
      replies: [
        {
          id: 31,
          user: {
            id: 201,
            name: 'Mohamed Ali',
            avatar: '/photos/users/instructor1.jpg',
            isInstructor: true
          },
          content: 'Yes, you can use React.memo for function components, shouldComponentUpdate for class components, or virtualization libraries like react-window for rendering only the visible items in a long list.',
          timestamp: '2023-11-13T11:30:00',
          likes: 9
        }
      ]
    }
  ];

  useEffect(() => {
    // Simulate API call to fetch discussions
    setTimeout(() => {
      // In a real app, you would fetch discussions based on courseId and lessonId
      setDiscussions(mockDiscussions);
      setIsLoading(false);
    }, 1000);
  }, [courseId, lessonId]);

  const handleAddDiscussion = () => {
    if (!newDiscussion.trim()) return;

    const newDiscussionObj = {
      id: Date.now(),
      user: {
        id: 999, // Current user ID (mock)
        name: 'Current User', // Current user name (mock)
        avatar: '/fighterfish.png', // Current user avatar (mock)
        isInstructor: isInstructor
      },
      content: newDiscussion,
      timestamp: new Date().toISOString(),
      likes: 0,
      isQuestion: newDiscussion.includes('?'),
      replies: []
    };

    setDiscussions([newDiscussionObj, ...discussions]);
    setNewDiscussion('');
  };

  const handleAddReply = (discussionId) => {
    if (!replyText[discussionId]?.trim()) return;

    const updatedDiscussions = discussions.map(discussion => {
      if (discussion.id === discussionId) {
        const newReply = {
          id: Date.now(),
          user: {
            id: 999, // Current user ID (mock)
            name: 'Current User', // Current user name (mock)
            avatar: '/fighterfish.png', // Current user avatar (mock)
            isInstructor: isInstructor
          },
          content: replyText[discussionId],
          timestamp: new Date().toISOString(),
          likes: 0
        };
        return {
          ...discussion,
          replies: [...discussion.replies, newReply]
        };
      }
      return discussion;
    });

    setDiscussions(updatedDiscussions);
    setReplyText({...replyText, [discussionId]: ''});
    setShowReplyForm({...showReplyForm, [discussionId]: false});
  };

  const handleLike = (discussionId, replyId = null) => {
    const updatedDiscussions = discussions.map(discussion => {
      if (replyId === null && discussion.id === discussionId) {
        return {
          ...discussion,
          likes: discussion.likes + 1
        };
      } else if (replyId !== null && discussion.id === discussionId) {
        const updatedReplies = discussion.replies.map(reply => {
          if (reply.id === replyId) {
            return {
              ...reply,
              likes: reply.likes + 1
            };
          }
          return reply;
        });
        return {
          ...discussion,
          replies: updatedReplies
        };
      }
      return discussion;
    });

    setDiscussions(updatedDiscussions);
  };

  const handleDelete = (discussionId, replyId = null) => {
    if (replyId === null) {
      // Delete discussion
      setDiscussions(discussions.filter(d => d.id !== discussionId));
    } else {
      // Delete reply
      const updatedDiscussions = discussions.map(discussion => {
        if (discussion.id === discussionId) {
          return {
            ...discussion,
            replies: discussion.replies.filter(r => r.id !== replyId)
          };
        }
        return discussion;
      });
      setDiscussions(updatedDiscussions);
    }
  };

  const handleEdit = (discussionId, replyId = null, content) => {
    setEditingDiscussion({discussionId, replyId});
    setEditText(content);
  };

  const handleSaveEdit = () => {
    if (!editText.trim()) return;

    const updatedDiscussions = discussions.map(discussion => {
      if (editingDiscussion.replyId === null && discussion.id === editingDiscussion.discussionId) {
        return {
          ...discussion,
          content: editText
        };
      } else if (editingDiscussion.replyId !== null && discussion.id === editingDiscussion.discussionId) {
        const updatedReplies = discussion.replies.map(reply => {
          if (reply.id === editingDiscussion.replyId) {
            return {
              ...reply,
              content: editText
            };
          }
          return reply;
        });
        return {
          ...discussion,
          replies: updatedReplies
        };
      }
      return discussion;
    });

    setDiscussions(updatedDiscussions);
    setEditingDiscussion(null);
    setEditText('');
  };

  const handleCancelEdit = () => {
    setEditingDiscussion(null);
    setEditText('');
  };

  const toggleReplyForm = (discussionId) => {
    setShowReplyForm({
      ...showReplyForm,
      [discussionId]: !showReplyForm[discussionId]
    });
  };

  const filteredDiscussions = discussions.filter(discussion => {
    if (filter === 'all') return true;
    if (filter === 'questions') return discussion.isQuestion;
    if (filter === 'discussions') return !discussion.isQuestion;
    return true;
  });

  const sortedDiscussions = [...filteredDiscussions].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.timestamp) - new Date(a.timestamp);
    if (sortBy === 'oldest') return new Date(a.timestamp) - new Date(b.timestamp);
    if (sortBy === 'popular') return b.likes - a.likes;
    return 0;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Discussion Forum</h3>
      
      {/* New Discussion Form */}
      <div className="mb-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
            <img 
              src="/fighterfish.png" 
              alt="Your avatar" 
              className="h-full w-full object-cover"
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
      
      {/* Filters and Sort */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2 mb-2 sm:mb-0">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === 'all'
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('questions')}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === 'questions'
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Questions
          </button>
          <button
            onClick={() => setFilter('discussions')}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === 'discussions'
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Discussions
          </button>
        </div>
        
        <div className="flex items-center">
          <FaSort className="text-gray-400 mr-2" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm px-2 py-1 border-none focus:ring-blue-500"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>
      
      {/* Discussions List */}
      {sortedDiscussions.length > 0 ? (
        <div className="space-y-6">
          {sortedDiscussions.map((discussion) => (
            <div key={discussion.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              {/* Discussion Header */}
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <img 
                      src={discussion.user.avatar} 
                      alt={discussion.user.name} 
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/fighterfish.png";
                      }}
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        {discussion.user.name}
                      </h4>
                      {discussion.user.isInstructor && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full">
                          Instructor
                        </span>
                      )}
                      <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(discussion.timestamp)}
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
                            onClick={handleCancelEdit}
                            className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSaveEdit}
                            className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-2 text-gray-700 dark:text-gray-300">
                        {discussion.content}
                      </div>
                    )}
                    
                    <div className="mt-3 flex items-center space-x-4">
                      <button
                        onClick={() => handleLike(discussion.id)}
                        className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <FaThumbsUp className="mr-1" /> {discussion.likes}
                      </button>
                      <button
                        onClick={() => toggleReplyForm(discussion.id)}
                        className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <FaReply className="mr-1" /> Reply
                      </button>
                      {(isInstructor || discussion.user.id === 999) && (
                        <>
                          <button
                            onClick={() => handleEdit(discussion.id, null, discussion.content)}
                            className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                          >
                            <FaEdit className="mr-1" /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(discussion.id)}
                            className="flex items-center text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                          >
                            <FaTrash className="mr-1" /> Delete
                          </button>
                        </>
                      )}
                      {discussion.isQuestion && (
                        <span className="ml-auto px-2 py-0.5 text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full">
                          Question
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Reply Form */}
              {showReplyForm[discussion.id] && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                      <img 
                        src="/fighterfish.png" 
                        alt="Your avatar" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <textarea
                        value={replyText[discussion.id] || ''}
                        onChange={(e) => setReplyText({...replyText, [discussion.id]: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Write your reply..."
                        rows={2}
                      ></textarea>
                      <div className="mt-2 flex justify-end space-x-2">
                        <button
                          onClick={() => toggleReplyForm(discussion.id)}
                          className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleAddReply(discussion.id)}
                          disabled={!replyText[discussion.id]?.trim()}
                          className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Replies */}
              {discussion.replies.length > 0 && (
                <div className="border-t border-gray-200 dark:border-gray-700">
                  <div className="p-4 space-y-4">
                    {discussion.replies.map((reply) => (
                      <div key={reply.id} className="pl-8 border-l-2 border-gray-200 dark:border-gray-700">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                            <img 
                              src={reply.user.avatar} 
                              alt={reply.user.name} 
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/fighterfish.png";
                              }}
                            />
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center">
                              <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                                {reply.user.name}
                              </h5>
                              {reply.user.isInstructor && (
                                <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full">
                                  Instructor
                                </span>
                              )}
                              <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
                                {formatDate(reply.timestamp)}
                              </span>
                            </div>
                            
                            {editingDiscussion?.discussionId === discussion.id && editingDiscussion?.replyId === reply.id ? (
                              <div className="mt-2">
                                <textarea
                                  value={editText}
                                  onChange={(e) => setEditText(e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                                  rows={2}
                                ></textarea>
                                <div className="mt-2 flex justify-end space-x-2">
                                  <button
                                    onClick={handleCancelEdit}
                                    className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={handleSaveEdit}
                                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                                {reply.content}
                              </div>
                            )}
                            
                            <div className="mt-2 flex items-center space-x-4">
                              <button
                                onClick={() => handleLike(discussion.id, reply.id)}
                                className="flex items-center text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                              >
                                <FaThumbsUp className="mr-1" /> {reply.likes}
                              </button>
                              {(isInstructor || reply.user.id === 999) && (
                                <>
                                  <button
                                    onClick={() => handleEdit(discussion.id, reply.id, reply.content)}
                                    className="flex items-center text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                                  >
                                    <FaEdit className="mr-1" /> Edit
                                  </button>
                                  <button
                                    onClick={() => handleDelete(discussion.id, reply.id)}
                                    className="flex items-center text-xs text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                                  >
                                    <FaTrash className="mr-1" /> Delete
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <FaComment className="mx-auto h-12 w-12 text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No discussions yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Be the first to start a discussion!</p>
        </div>
      )}
    </div>
  );
};

export default DiscussionForum;
