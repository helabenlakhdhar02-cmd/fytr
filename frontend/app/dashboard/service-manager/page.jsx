'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaInbox, FaCheck, FaTimes, FaSpinner, FaCheckCircle, 
  FaTimesCircle, FaComments, FaSearch, FaFilter, FaBell,
  FaCalendarAlt, FaMoneyBillWave, FaUser, FaInfoCircle
} from 'react-icons/fa';
import Navbar from '../../../components/Navbar';
import Link from 'next/link';

const ServiceManagerPage = () => {
  // State for service requests
  const [serviceRequests, setServiceRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showChatPanel, setShowChatPanel] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  // Mock data for service requests
  useEffect(() => {
    // In a real app, this would be an API call to get the service requests
    setTimeout(() => {
      const mockRequests = [
        {
          id: 1,
          service: {
            id: 101,
            title: 'Professional Web Development',
          },
          client: {
            id: 201,
            name: 'John Doe',
            avatar: '/photos/Topfreelancers/freelancer1.PNG',
          },
          status: 'new',
          date: '2023-11-15',
          price: 250,
          message: 'I need a responsive website for my small business. Can you help me with that?',
          requirements: 'The website should have 5 pages including home, about, services, portfolio, and contact.',
          deadline: '2023-12-15',
        },
        {
          id: 2,
          service: {
            id: 102,
            title: 'Logo Design',
          },
          client: {
            id: 202,
            name: 'Jane Smith',
            avatar: '/photos/Topfreelancers/freelancer2.PNG',
          },
          status: 'accepted',
          date: '2023-11-10',
          price: 150,
          message: 'I need a modern logo for my new startup.',
          requirements: 'The logo should be simple, modern, and reflect our brand values of innovation and trust.',
          deadline: '2023-11-25',
        },
        {
          id: 3,
          service: {
            id: 101,
            title: 'Professional Web Development',
          },
          client: {
            id: 203,
            name: 'Robert Johnson',
            avatar: '/photos/Topfreelancers/freelancer3.PNG',
          },
          status: 'completed',
          date: '2023-10-20',
          price: 300,
          message: 'I need an e-commerce website for my online store.',
          requirements: 'The website should have product listings, shopping cart, and payment integration.',
          deadline: '2023-11-05',
          completedDate: '2023-11-03',
        },
        {
          id: 4,
          service: {
            id: 103,
            title: 'Content Writing',
          },
          client: {
            id: 204,
            name: 'Emily Davis',
            avatar: '/photos/Topfreelancers/freelancer4.PNG',
          },
          status: 'rejected',
          date: '2023-11-05',
          price: 100,
          message: 'I need 5 blog posts for my website.',
          requirements: 'Each post should be 1000+ words and SEO optimized.',
          deadline: '2023-11-20',
          rejectionReason: 'Currently at full capacity with other projects.',
        },
        {
          id: 5,
          service: {
            id: 104,
            title: 'Mobile App Development',
          },
          client: {
            id: 205,
            name: 'Michael Wilson',
            avatar: '/photos/Topfreelancers/freelancer5.PNG',
          },
          status: 'in_progress',
          date: '2023-11-01',
          price: 500,
          message: 'I need a simple mobile app for my restaurant.',
          requirements: 'The app should have menu listings, ordering system, and user authentication.',
          deadline: '2023-12-01',
          progress: 60,
        },
      ];
      
      setServiceRequests(mockRequests);
      setFilteredRequests(mockRequests);
      setIsLoading(false);
    }, 1500);
  }, []);

  // Filter requests based on active tab and search query
  useEffect(() => {
    let filtered = serviceRequests;
    
    // Filter by status
    if (activeTab !== 'all') {
      filtered = filtered.filter(request => request.status === activeTab);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(request => 
        request.service.title.toLowerCase().includes(query) ||
        request.client.name.toLowerCase().includes(query) ||
        request.message.toLowerCase().includes(query)
      );
    }
    
    setFilteredRequests(filtered);
  }, [serviceRequests, activeTab, searchQuery]);

  // Handle request selection
  const handleSelectRequest = (request) => {
    setSelectedRequest(request);
    // In a real app, we would fetch the chat history here
    setChatMessages([
      {
        id: 1,
        sender: 'client',
        message: request.message,
        timestamp: new Date(request.date).toISOString(),
      },
      {
        id: 2,
        sender: 'freelancer',
        message: 'Thank you for your interest in my service. I would be happy to discuss your project further.',
        timestamp: new Date(new Date(request.date).getTime() + 3600000).toISOString(),
      },
    ]);
  };

  // Handle status change
  const handleStatusChange = (requestId, newStatus) => {
    setServiceRequests(prevRequests => 
      prevRequests.map(request => 
        request.id === requestId 
          ? { ...request, status: newStatus } 
          : request
      )
    );
    
    if (selectedRequest && selectedRequest.id === requestId) {
      setSelectedRequest(prev => ({ ...prev, status: newStatus }));
    }
  };

  // Handle send message
  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    const newMessage = {
      id: chatMessages.length + 1,
      sender: 'freelancer',
      message: chatMessage,
      timestamp: new Date().toISOString(),
    };
    
    setChatMessages([...chatMessages, newMessage]);
    setChatMessage('');
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-xs font-medium">New</span>;
      case 'accepted':
        return <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-full text-xs font-medium">Accepted</span>;
      case 'rejected':
        return <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 rounded-full text-xs font-medium">Rejected</span>;
      case 'in_progress':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 rounded-full text-xs font-medium">In Progress</span>;
      case 'completed':
        return <span className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 rounded-full text-xs font-medium">Completed</span>;
      default:
        return null;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Service Manager</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your service requests and communicate with clients
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Request List */}
          <div className="lg:w-2/5">
            {/* Search and Filter */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-4">
              <div className="flex items-center mb-4">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search requests..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                </div>
                <button className="ml-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <FaFilter />
                </button>
              </div>
              
              {/* Status Tabs */}
              <div className="flex overflow-x-auto pb-2 -mx-4 px-4">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-2 rounded-lg mr-2 whitespace-nowrap ${
                    activeTab === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  All Requests
                </button>
                <button
                  onClick={() => setActiveTab('new')}
                  className={`px-4 py-2 rounded-lg mr-2 whitespace-nowrap ${
                    activeTab === 'new'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  New
                </button>
                <button
                  onClick={() => setActiveTab('accepted')}
                  className={`px-4 py-2 rounded-lg mr-2 whitespace-nowrap ${
                    activeTab === 'accepted'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Accepted
                </button>
                <button
                  onClick={() => setActiveTab('in_progress')}
                  className={`px-4 py-2 rounded-lg mr-2 whitespace-nowrap ${
                    activeTab === 'in_progress'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  In Progress
                </button>
                <button
                  onClick={() => setActiveTab('completed')}
                  className={`px-4 py-2 rounded-lg mr-2 whitespace-nowrap ${
                    activeTab === 'completed'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Completed
                </button>
                <button
                  onClick={() => setActiveTab('rejected')}
                  className={`px-4 py-2 rounded-lg mr-2 whitespace-nowrap ${
                    activeTab === 'rejected'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Rejected
                </button>
              </div>
            </div>
            
            {/* Request List */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : filteredRequests.length === 0 ? (
                <div className="p-6 text-center">
                  <FaInbox className="mx-auto text-gray-400 dark:text-gray-600 text-4xl mb-3" />
                  <p className="text-gray-600 dark:text-gray-400">No requests found</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredRequests.map((request) => (
                    <div
                      key={request.id}
                      onClick={() => handleSelectRequest(request)}
                      className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors ${
                        selectedRequest?.id === request.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                    >
                      <div className="flex items-start">
                        <img
                          src={request.client.avatar}
                          alt={request.client.name}
                          className="w-10 h-10 rounded-full object-cover mr-3"
                        />
                        <div className="flex-grow min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium text-gray-900 dark:text-white truncate">
                              {request.client.name}
                            </h3>
                            <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                              {formatDate(request.date)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 truncate mb-1">
                            {request.service.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate mb-2">
                            {request.message}
                          </p>
                          <div className="flex items-center justify-between">
                            {getStatusBadge(request.status)}
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              ${request.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Right Column - Request Details */}
          <div className="lg:w-3/5">
            {selectedRequest ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Request Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <img
                        src={selectedRequest.client.avatar}
                        alt={selectedRequest.client.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                          {selectedRequest.client.name}
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Request for: {selectedRequest.service.title}
                        </p>
                      </div>
                    </div>
                    <div>
                      {getStatusBadge(selectedRequest.status)}
                    </div>
                  </div>
                  
                  {/* Request Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 dark:bg-gray-750 p-3 rounded-lg">
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Price</div>
                      <div className="font-bold text-gray-900 dark:text-white flex items-center">
                        <FaMoneyBillWave className="text-green-500 dark:text-green-400 mr-1" />
                        ${selectedRequest.price}
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-750 p-3 rounded-lg">
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Requested On</div>
                      <div className="font-bold text-gray-900 dark:text-white flex items-center">
                        <FaCalendarAlt className="text-blue-500 dark:text-blue-400 mr-1" />
                        {formatDate(selectedRequest.date)}
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-750 p-3 rounded-lg">
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Deadline</div>
                      <div className="font-bold text-gray-900 dark:text-white flex items-center">
                        <FaCalendarAlt className="text-red-500 dark:text-red-400 mr-1" />
                        {formatDate(selectedRequest.deadline)}
                      </div>
                    </div>
                  </div>
                  
                  {/* Request Message */}
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Message</h3>
                    <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-750 p-3 rounded-lg">
                      {selectedRequest.message}
                    </p>
                  </div>
                  
                  {/* Requirements */}
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Requirements</h3>
                    <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-750 p-3 rounded-lg">
                      {selectedRequest.requirements}
                    </p>
                  </div>
                </div>
                
                {/* Action Buttons */}
                {selectedRequest.status === 'new' && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700 flex justify-between">
                    <button
                      onClick={() => handleStatusChange(selectedRequest.id, 'rejected')}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center"
                    >
                      <FaTimes className="mr-2" /> Reject Request
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedRequest.id, 'accepted')}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center"
                    >
                      <FaCheck className="mr-2" /> Accept Request
                    </button>
                  </div>
                )}
                
                {selectedRequest.status === 'accepted' && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700 flex justify-between">
                    <button
                      onClick={() => handleStatusChange(selectedRequest.id, 'in_progress')}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center"
                    >
                      <FaSpinner className="mr-2" /> Start Working
                    </button>
                  </div>
                )}
                
                {selectedRequest.status === 'in_progress' && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700 flex justify-between">
                    <button
                      onClick={() => handleStatusChange(selectedRequest.id, 'completed')}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center"
                    >
                      <FaCheckCircle className="mr-2" /> Mark as Completed
                    </button>
                  </div>
                )}
                
                {/* Chat Section */}
                <div className="p-4">
                  <button
                    onClick={() => setShowChatPanel(!showChatPanel)}
                    className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center"
                  >
                    <FaComments className="mr-2" /> 
                    {showChatPanel ? 'Hide Chat' : 'Show Chat'}
                  </button>
                  
                  {showChatPanel && (
                    <div className="mt-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      {/* Chat Messages */}
                      <div className="h-64 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-750">
                        {chatMessages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`mb-3 flex ${
                              msg.sender === 'freelancer' ? 'justify-end' : 'justify-start'
                            }`}
                          >
                            <div
                              className={`max-w-3/4 p-3 rounded-lg ${
                                msg.sender === 'freelancer'
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                              }`}
                            >
                              <p className="text-sm">{msg.message}</p>
                              <p className="text-xs mt-1 opacity-70">
                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Chat Input */}
                      <div className="p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex">
                          <input
                            type="text"
                            value={chatMessage}
                            onChange={(e) => setChatMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          />
                          <button
                            onClick={handleSendMessage}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg transition-colors"
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center h-64 flex flex-col items-center justify-center">
                <FaInbox className="text-gray-400 dark:text-gray-600 text-5xl mb-4" />
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No request selected</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Select a request from the list to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceManagerPage;
