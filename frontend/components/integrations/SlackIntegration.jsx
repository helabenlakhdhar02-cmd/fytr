'use client';

import React, { useState, useEffect } from 'react';
import { 
  FaSlack, 
  FaUsers, 
  FaComments, 
  FaBell, 
  FaLink, 
  FaPlus, 
  FaTrash, 
  FaEdit,
  FaExternalLinkAlt,
  FaCopy,
  FaCheck,
  FaHashtag
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const SlackIntegration = ({ courseId, isInstructor }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [channels, setChannels] = useState([]);
  const [showNewChannelForm, setShowNewChannelForm] = useState(false);
  const [newChannel, setNewChannel] = useState({
    name: '',
    description: '',
    isPrivate: false
  });
  const [editingChannel, setEditingChannel] = useState(null);

  // Mock data for demonstration
  const mockChannels = [
    {
      id: 1,
      name: 'course-announcements',
      description: 'Important announcements for the course',
      isPrivate: false,
      members: 45,
      messages: 128,
      link: 'https://slack.com/app_redirect?channel=C01234ABCDE'
    },
    {
      id: 2,
      name: 'course-help',
      description: 'Get help with course materials and assignments',
      isPrivate: false,
      members: 42,
      messages: 256,
      link: 'https://slack.com/app_redirect?channel=C01234FGHIJ'
    },
    {
      id: 3,
      name: 'course-projects',
      description: 'Discuss course projects and share resources',
      isPrivate: false,
      members: 38,
      messages: 97,
      link: 'https://slack.com/app_redirect?channel=C01234KLMNO'
    }
  ];

  useEffect(() => {
    // Simulate API call to check Slack connection status and fetch channels
    setTimeout(() => {
      setIsConnected(true);
      setChannels(mockChannels);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleConnect = () => {
    // In a real app, this would redirect to Slack OAuth flow
    setIsLoading(true);
    setTimeout(() => {
      setIsConnected(true);
      setIsLoading(false);
      toast.success('Connected to Slack successfully!');
    }, 1500);
  };

  const handleDisconnect = () => {
    // In a real app, this would revoke Slack OAuth access
    setIsLoading(true);
    setTimeout(() => {
      setIsConnected(false);
      setIsLoading(false);
      toast.success('Disconnected from Slack.');
    }, 1500);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    if (editingChannel) {
      setEditingChannel({
        ...editingChannel,
        [name]: val
      });
    } else {
      setNewChannel({
        ...newChannel,
        [name]: val
      });
    }
  };

  const handleCreateChannel = () => {
    // Validate form
    if (!newChannel.name) {
      toast.error('Please enter a channel name.');
      return;
    }

    // Format channel name (lowercase, no spaces, only hyphens)
    const formattedName = newChannel.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    // In a real app, this would call an API to create a Slack channel
    setIsLoading(true);
    setTimeout(() => {
      const newChannelWithId = {
        ...newChannel,
        id: Date.now(),
        name: formattedName,
        members: 1,
        messages: 0,
        link: `https://slack.com/app_redirect?channel=C${Math.random().toString(36).substring(2, 10).toUpperCase()}`
      };
      
      setChannels([...channels, newChannelWithId]);
      setNewChannel({
        name: '',
        description: '',
        isPrivate: false
      });
      setShowNewChannelForm(false);
      setIsLoading(false);
      toast.success('Slack channel created successfully!');
    }, 1500);
  };

  const handleUpdateChannel = () => {
    if (!editingChannel.name) {
      toast.error('Please enter a channel name.');
      return;
    }

    // Format channel name (lowercase, no spaces, only hyphens)
    const formattedName = editingChannel.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    setIsLoading(true);
    setTimeout(() => {
      const updatedChannels = channels.map(channel => 
        channel.id === editingChannel.id ? {...editingChannel, name: formattedName} : channel
      );
      
      setChannels(updatedChannels);
      setEditingChannel(null);
      setIsLoading(false);
      toast.success('Slack channel updated successfully!');
    }, 1500);
  };

  const handleDeleteChannel = (channelId) => {
    if (!confirm('Are you sure you want to delete this channel? This action cannot be undone.')) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setChannels(channels.filter(channel => channel.id !== channelId));
      setIsLoading(false);
      toast.success('Slack channel deleted successfully!');
    }, 1000);
  };

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link);
    toast.success('Link copied to clipboard!');
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
          <FaSlack className="mr-2 text-purple-500" /> Slack Integration
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
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center"
              >
                <FaSlack className="mr-2" /> Connect with Slack
              </button>
            )}
          </div>
        )}
      </div>
      
      {!isConnected ? (
        <div className="text-center py-8">
          <FaSlack className="mx-auto h-12 w-12 text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Connect to Slack</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-md mx-auto">
            Connect your Slack workspace to create and manage channels for this course.
          </p>
          {isInstructor && (
            <button
              onClick={handleConnect}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center mx-auto"
            >
              <FaSlack className="mr-2" /> Connect with Slack
            </button>
          )}
        </div>
      ) : (
        <div>
          {/* Instructor Controls */}
          {isInstructor && (
            <div className="mb-6">
              {showNewChannelForm || editingChannel ? (
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
                    {editingChannel ? 'Edit Slack Channel' : 'Create New Slack Channel'}
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Channel Name*
                      </label>
                      <div className="flex items-center">
                        <span className="bg-gray-100 dark:bg-gray-600 px-3 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400">
                          <FaHashtag />
                        </span>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={editingChannel ? editingChannel.name : newChannel.name}
                          onChange={handleInputChange}
                          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-r-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-purple-500 focus:border-purple-500"
                          placeholder="e.g. course-announcements"
                        />
                      </div>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Channel names must be lowercase, without spaces or special characters. Hyphens are allowed.
                      </p>
                    </div>
                    
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        id="description"
                        name="description"
                        value={editingChannel ? editingChannel.description : newChannel.description}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-purple-500 focus:border-purple-500"
                        placeholder="Describe the purpose of this channel"
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isPrivate"
                        name="isPrivate"
                        checked={editingChannel ? editingChannel.isPrivate : newChannel.isPrivate}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isPrivate" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Make this channel private
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      onClick={() => {
                        setShowNewChannelForm(false);
                        setEditingChannel(null);
                      }}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={editingChannel ? handleUpdateChannel : handleCreateChannel}
                      className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                    >
                      {editingChannel ? 'Update Channel' : 'Create Channel'}
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowNewChannelForm(true)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center"
                >
                  <FaPlus className="mr-2" /> Create Slack Channel
                </button>
              )}
            </div>
          )}
          
          {/* Channels List */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-gray-900 dark:text-white">
              {isInstructor ? 'Course Slack Channels' : 'Join Course Discussions'}
            </h4>
            
            {channels.length > 0 ? (
              <div className="space-y-4">
                {channels.map((channel) => (
                  <div 
                    key={channel.id} 
                    className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                  >
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50">
                      <div className="flex flex-wrap justify-between items-start">
                        <div>
                          <h5 className="text-md font-medium text-gray-900 dark:text-white mb-1 flex items-center">
                            <FaHashtag className="text-gray-400 mr-1" />
                            {channel.name}
                            {channel.isPrivate && (
                              <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                                Private
                              </span>
                            )}
                          </h5>
                          {channel.description && (
                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{channel.description}</p>
                          )}
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <FaUsers className="mr-1" />
                            <span className="mr-3">{channel.members} members</span>
                            <FaComments className="mr-1" />
                            <span>{channel.messages} messages</span>
                          </div>
                        </div>
                        
                        {isInstructor && (
                          <div className="flex space-x-2 mt-2 sm:mt-0">
                            <button
                              onClick={() => setEditingChannel(channel)}
                              className="p-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 rounded-md"
                              title="Edit channel"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDeleteChannel(channel.id)}
                              className="p-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 rounded-md"
                              title="Delete channel"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-3 flex flex-wrap gap-2">
                        <a
                          href={channel.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-md hover:bg-purple-200 dark:hover:bg-purple-900/30 transition-colors"
                        >
                          <FaSlack className="mr-1" /> Open in Slack
                        </a>
                        <button
                          onClick={() => handleCopyLink(channel.link)}
                          className="inline-flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                          <FaCopy className="mr-1" /> Copy Link
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <FaSlack className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                <p className="text-gray-500 dark:text-gray-400">No Slack channels have been created for this course yet.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SlackIntegration;
