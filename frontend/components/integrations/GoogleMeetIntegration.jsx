'use client';

import React, { useState, useEffect } from 'react';
import { 
  FaVideo, 
  FaCalendarAlt, 
  FaUsers, 
  FaClock, 
  FaLink, 
  FaPlus, 
  FaTrash, 
  FaEdit,
  FaExternalLinkAlt,
  FaCopy,
  FaCheck,
  FaGoogle
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const GoogleMeetIntegration = ({ courseId, isInstructor }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [showNewSessionForm, setShowNewSessionForm] = useState(false);
  const [newSession, setNewSession] = useState({
    title: '',
    date: '',
    time: '',
    duration: 60,
    description: ''
  });
  const [editingSession, setEditingSession] = useState(null);

  // Mock data for demonstration
  const mockSessions = [
    {
      id: 1,
      title: 'Introduction to React Hooks',
      date: '2023-12-15',
      time: '14:00',
      duration: 60,
      description: 'In this session, we will cover the basics of React Hooks and how to use them in your projects.',
      meetLink: 'https://meet.google.com/abc-defg-hij',
      status: 'upcoming',
      participants: 12
    },
    {
      id: 2,
      title: 'Advanced JavaScript Concepts',
      date: '2023-12-20',
      time: '15:30',
      duration: 90,
      description: 'Deep dive into advanced JavaScript concepts like closures, prototypes, and async programming.',
      meetLink: 'https://meet.google.com/klm-nopq-rst',
      status: 'upcoming',
      participants: 8
    },
    {
      id: 3,
      title: 'Building RESTful APIs with Node.js',
      date: '2023-11-10',
      time: '10:00',
      duration: 120,
      description: 'Learn how to build RESTful APIs using Node.js, Express, and MongoDB.',
      meetLink: 'https://meet.google.com/uvw-xyz-123',
      status: 'completed',
      participants: 15,
      recording: 'https://drive.google.com/file/d/abc123/view'
    }
  ];

  useEffect(() => {
    // Simulate API call to check Google Meet connection status and fetch sessions
    setTimeout(() => {
      setIsConnected(true);
      setSessions(mockSessions);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleConnect = () => {
    // In a real app, this would redirect to Google OAuth flow
    setIsLoading(true);
    setTimeout(() => {
      setIsConnected(true);
      setIsLoading(false);
      toast.success('Connected to Google Meet successfully!');
    }, 1500);
  };

  const handleDisconnect = () => {
    // In a real app, this would revoke Google OAuth access
    setIsLoading(true);
    setTimeout(() => {
      setIsConnected(false);
      setIsLoading(false);
      toast.success('Disconnected from Google Meet.');
    }, 1500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingSession) {
      setEditingSession({
        ...editingSession,
        [name]: value
      });
    } else {
      setNewSession({
        ...newSession,
        [name]: value
      });
    }
  };

  const handleCreateSession = () => {
    // Validate form
    if (!newSession.title || !newSession.date || !newSession.time) {
      toast.error('Please fill in all required fields.');
      return;
    }

    // In a real app, this would call an API to create a Google Meet session
    setIsLoading(true);
    setTimeout(() => {
      const newSessionWithId = {
        ...newSession,
        id: Date.now(),
        meetLink: `https://meet.google.com/${Math.random().toString(36).substring(2, 10)}`,
        status: 'upcoming',
        participants: 0
      };
      
      setSessions([...sessions, newSessionWithId]);
      setNewSession({
        title: '',
        date: '',
        time: '',
        duration: 60,
        description: ''
      });
      setShowNewSessionForm(false);
      setIsLoading(false);
      toast.success('Live session created successfully!');
    }, 1500);
  };

  const handleUpdateSession = () => {
    if (!editingSession.title || !editingSession.date || !editingSession.time) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const updatedSessions = sessions.map(session => 
        session.id === editingSession.id ? editingSession : session
      );
      
      setSessions(updatedSessions);
      setEditingSession(null);
      setIsLoading(false);
      toast.success('Live session updated successfully!');
    }, 1500);
  };

  const handleDeleteSession = (sessionId) => {
    if (!confirm('Are you sure you want to delete this session?')) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setSessions(sessions.filter(session => session.id !== sessionId));
      setIsLoading(false);
      toast.success('Live session deleted successfully!');
    }, 1000);
  };

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link);
    toast.success('Link copied to clipboard!');
  };

  const formatDateTime = (date, time) => {
    const dateObj = new Date(`${date}T${time}`);
    return dateObj.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  const isSessionPast = (date, time) => {
    const sessionDate = new Date(`${date}T${time}`);
    return sessionDate < new Date();
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
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <FaVideo className="mr-2 text-blue-500" /> Google Meet Integration
        </h3>
        
        {isInstructor && (
          <div>
            {isConnected ? (
              <button
                onClick={handleDisconnect}
                className="px-4 py-2 bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 rounded-md hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
              >
                Disconnect
              </button>
            ) : (
              <button
                onClick={handleConnect}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
              >
                <FaGoogle className="mr-2" /> Connect with Google
              </button>
            )}
          </div>
        )}
      </div>
      
      {!isConnected ? (
        <div className="text-center py-8">
          <FaVideo className="mx-auto h-12 w-12 text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Connect to Google Meet</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-md mx-auto">
            Connect your Google account to create and manage live sessions for this course.
          </p>
          {isInstructor && (
            <button
              onClick={handleConnect}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center mx-auto"
            >
              <FaGoogle className="mr-2" /> Connect with Google
            </button>
          )}
        </div>
      ) : (
        <div>
          {/* Instructor Controls */}
          {isInstructor && (
            <div className="mb-6">
              {showNewSessionForm || editingSession ? (
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
                    {editingSession ? 'Edit Live Session' : 'Create New Live Session'}
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Session Title*
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={editingSession ? editingSession.title : newSession.title}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g. Introduction to React Hooks"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Date*
                        </label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={editingSession ? editingSession.date : newSession.date}
                          onChange={handleInputChange}
                          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Time*
                        </label>
                        <input
                          type="time"
                          id="time"
                          name="time"
                          value={editingSession ? editingSession.time : newSession.time}
                          onChange={handleInputChange}
                          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Duration (minutes)
                    </label>
                    <select
                      id="duration"
                      name="duration"
                      value={editingSession ? editingSession.duration : newSession.duration}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="90">1.5 hours</option>
                      <option value="120">2 hours</option>
                      <option value="180">3 hours</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={editingSession ? editingSession.description : newSession.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Describe what will be covered in this session..."
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => {
                        setShowNewSessionForm(false);
                        setEditingSession(null);
                      }}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={editingSession ? handleUpdateSession : handleCreateSession}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      {editingSession ? 'Update Session' : 'Create Session'}
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowNewSessionForm(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                >
                  <FaPlus className="mr-2" /> Create Live Session
                </button>
              )}
            </div>
          )}
          
          {/* Sessions List */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-gray-900 dark:text-white">
              {isInstructor ? 'Your Live Sessions' : 'Upcoming Live Sessions'}
            </h4>
            
            {sessions.length > 0 ? (
              <div className="space-y-4">
                {sessions.map((session) => (
                  <div 
                    key={session.id} 
                    className={`border ${
                      session.status === 'completed' 
                        ? 'border-gray-200 dark:border-gray-700' 
                        : 'border-blue-200 dark:border-blue-800'
                    } rounded-lg overflow-hidden`}
                  >
                    <div className={`p-4 ${
                      session.status === 'completed'
                        ? 'bg-gray-50 dark:bg-gray-700/50'
                        : 'bg-blue-50 dark:bg-blue-900/20'
                    }`}>
                      <div className="flex flex-wrap justify-between items-start">
                        <div>
                          <h5 className="text-md font-medium text-gray-900 dark:text-white mb-1">{session.title}</h5>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                            <FaCalendarAlt className="mr-1" />
                            <span className="mr-3">{formatDateTime(session.date, session.time)}</span>
                            <FaClock className="mr-1" />
                            <span>{session.duration} min</span>
                            {session.participants > 0 && (
                              <>
                                <span className="mx-2">•</span>
                                <FaUsers className="mr-1" />
                                <span>{session.participants} participants</span>
                              </>
                            )}
                          </div>
                          {session.description && (
                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{session.description}</p>
                          )}
                        </div>
                        
                        {isInstructor && session.status !== 'completed' && (
                          <div className="flex space-x-2 mt-2 sm:mt-0">
                            <button
                              onClick={() => setEditingSession(session)}
                              className="p-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 rounded-md"
                              title="Edit session"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDeleteSession(session.id)}
                              className="p-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 rounded-md"
                              title="Delete session"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-3 flex flex-wrap gap-2">
                        {session.status === 'completed' ? (
                          session.recording ? (
                            <a
                              href={session.recording}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-md hover:bg-purple-200 dark:hover:bg-purple-900/30 transition-colors"
                            >
                              <FaVideo className="mr-1" /> Watch Recording
                            </a>
                          ) : (
                            <span className="inline-flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md">
                              Session Completed
                            </span>
                          )
                        ) : isSessionPast(session.date, session.time) ? (
                          <span className="inline-flex items-center px-3 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded-md">
                            Session Ended
                          </span>
                        ) : (
                          <>
                            <a
                              href={session.meetLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-md hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors"
                            >
                              <FaVideo className="mr-1" /> Join Session
                            </a>
                            <button
                              onClick={() => handleCopyLink(session.meetLink)}
                              className="inline-flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                              <FaCopy className="mr-1" /> Copy Link
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <FaVideo className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                <p className="text-gray-500 dark:text-gray-400">No live sessions scheduled yet.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleMeetIntegration;
