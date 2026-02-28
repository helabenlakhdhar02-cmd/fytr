"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaUser, FaArrowLeft, FaCheckCircle, FaTimesCircle, FaInfoCircle,
  FaCalendarAlt, FaMoneyBillWave, FaClock, FaProjectDiagram,
  FaFilter, FaSort, FaSearch, FaEye, FaChevronDown, FaChevronUp
} from "react-icons/fa";

import Navbar from "../../../components/Navbar";
import { useAuth } from "../../../context/AuthContext";
import { useUser } from "../../../context/UserContext";
import Link from "next/link";

// Custom toast notification function
const showToast = (message, type = 'success') => {
  // Create a toast element
  const toast = document.createElement('div');
  toast.className = `fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${
    type === 'success' ? 'bg-green-500' : 'bg-red-500'
  } text-white transform transition-all duration-300 opacity-0 translate-y-2`;
  toast.textContent = message;

  // Add to DOM
  document.body.appendChild(toast);

  // Trigger animation
  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  }, 10);

  // Remove after delay
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(2px)';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
};

const ProjectRequestsPage = () => {
  const router = useRouter();
  const { userData: user, loading: userLoading } = useUser();
  const [projectRequests, setProjectRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('pending');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetails, setShowDetails] = useState({});
  const [isProcessing, setIsProcessing] = useState({});

  // Mock project requests data
  const mockProjectRequests = [
    {
      id: 1,
      title: 'Advanced React Training for Development Team',
      client: {
        id: 101,
        name: 'TechCorp Solutions',
        avatar: '/photos/Academy/client1.jpg'
      },
      description: 'We need comprehensive React training for our team of 5 junior developers. The training should cover hooks, context API, and performance optimization techniques.',
      requirements: [
        'Cover React fundamentals and advanced concepts',
        'Provide practical exercises for the team',
        'Include performance optimization techniques',
        'Deliver code examples and documentation'
      ],
      budget: 1200,
      deadline: '2023-12-15',
      duration: '4 weeks',
      status: 'pending',
      createdAt: '2023-11-20T10:30:00',
      skills: ['React', 'JavaScript', 'Web Development', 'Training']
    },
    {
      id: 2,
      title: 'JavaScript Fundamentals Course',
      client: {
        id: 102,
        name: 'WebDev Academy',
        avatar: '/photos/Academy/client2.jpg'
      },
      description: 'Looking for an experienced trainer to create and deliver a 4-week JavaScript fundamentals course for beginners, including exercises and assessments.',
      requirements: [
        'Create comprehensive course materials',
        'Develop practical exercises for each module',
        'Include assessment tests',
        'Provide reference documentation'
      ],
      budget: 800,
      deadline: '2023-12-05',
      duration: '4 weeks',
      status: 'pending',
      createdAt: '2023-11-18T15:45:00',
      skills: ['JavaScript', 'Web Development', 'Teaching']
    },
    {
      id: 3,
      title: 'UI/UX Design Workshop',
      client: {
        id: 103,
        name: 'Creative Designs Inc',
        avatar: '/photos/Academy/client3.jpg'
      },
      description: 'We need a 2-day workshop on UI/UX design principles and practices for a team of graphic designers transitioning to web design.',
      requirements: [
        'Cover UI/UX fundamentals',
        'Include practical design exercises',
        'Provide feedback on participant work',
        'Deliver design resources and tools'
      ],
      budget: 950,
      deadline: '2023-11-30',
      duration: '2 days',
      status: 'accepted',
      createdAt: '2023-11-15T09:15:00',
      acceptedAt: '2023-11-16T14:30:00',
      skills: ['UI/UX Design', 'Web Design', 'Workshop Facilitation']
    },
    {
      id: 4,
      title: 'Node.js Backend Development Training',
      client: {
        id: 104,
        name: 'ServerTech Solutions',
        avatar: '/photos/Academy/client4.jpg'
      },
      description: 'Need a trainer to provide Node.js backend development training for our team. Should cover Express, MongoDB, and RESTful API design.',
      requirements: [
        'Cover Node.js fundamentals',
        'Teach Express framework usage',
        'Include MongoDB integration',
        'Focus on RESTful API design principles'
      ],
      budget: 1500,
      deadline: '2023-12-20',
      duration: '3 weeks',
      status: 'declined',
      createdAt: '2023-11-10T11:20:00',
      declinedAt: '2023-11-11T16:45:00',
      declineReason: 'Schedule conflict with existing commitments',
      skills: ['Node.js', 'Express', 'MongoDB', 'Backend Development']
    },
    {
      id: 5,
      title: 'Python Data Science Workshop',
      client: {
        id: 105,
        name: 'DataAnalytics Pro',
        avatar: '/photos/Academy/client5.jpg'
      },
      description: 'Looking for a trainer to conduct a Python data science workshop covering pandas, NumPy, and data visualization libraries.',
      requirements: [
        'Introduce Python for data science',
        'Cover pandas and NumPy libraries',
        'Teach data visualization techniques',
        'Include practical data analysis exercises'
      ],
      budget: 1100,
      deadline: '2023-12-10',
      duration: '1 week',
      status: 'pending',
      createdAt: '2023-11-05T14:30:00',
      skills: ['Python', 'Data Science', 'pandas', 'NumPy']
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, you would fetch project requests from the API
        // For now, we'll use mock data
        setProjectRequests(mockProjectRequests);
      } catch (error) {
        console.error('Error fetching project requests:', error);
        showToast('Error loading project requests', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Toggle project details
  const toggleDetails = (id) => {
    setShowDetails(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Handle accept project request
  const handleAccept = async (id) => {
    setIsProcessing(prev => ({ ...prev, [id]: true }));
    
    try {
      // In a real implementation, you would send an API request to accept the project
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // Update project request status
      setProjectRequests(prev => 
        prev.map(request => 
          request.id === id 
            ? { 
                ...request, 
                status: 'accepted',
                acceptedAt: new Date().toISOString()
              } 
            : request
        )
      );
      
      showToast('Project request accepted successfully');
    } catch (error) {
      console.error('Error accepting project request:', error);
      showToast('Error accepting project request', 'error');
    } finally {
      setIsProcessing(prev => ({ ...prev, [id]: false }));
    }
  };

  // Handle decline project request
  const handleDecline = async (id, reason = 'Not available at the moment') => {
    setIsProcessing(prev => ({ ...prev, [id]: true }));
    
    try {
      // In a real implementation, you would send an API request to decline the project
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // Update project request status
      setProjectRequests(prev => 
        prev.map(request => 
          request.id === id 
            ? { 
                ...request, 
                status: 'declined',
                declinedAt: new Date().toISOString(),
                declineReason: reason
              } 
            : request
        )
      );
      
      showToast('Project request declined');
    } catch (error) {
      console.error('Error declining project request:', error);
      showToast('Error declining project request', 'error');
    } finally {
      setIsProcessing(prev => ({ ...prev, [id]: false }));
    }
  };

  // Filter project requests
  const getFilteredRequests = () => {
    let filtered = [...projectRequests];
    
    // Apply status filter
    if (filter !== 'all') {
      filtered = filtered.filter(request => request.status === filter);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(request => 
        request.title.toLowerCase().includes(query) || 
        request.description.toLowerCase().includes(query) ||
        request.client.name.toLowerCase().includes(query) ||
        request.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }
    
    // Apply sort
    filtered.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortBy === 'budget-high') {
        return b.budget - a.budget;
      } else if (sortBy === 'budget-low') {
        return a.budget - b.budget;
      } else if (sortBy === 'deadline') {
        return new Date(a.deadline) - new Date(b.deadline);
      }
      return 0;
    });
    
    return filtered;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString([], { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
            <FaClock className="mr-1" size={10} />
            Pending
          </span>
        );
      case 'accepted':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            <FaCheckCircle className="mr-1" size={10} />
            Accepted
          </span>
        );
      case 'declined':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            <FaTimesCircle className="mr-1" size={10} />
            Declined
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
            Unknown
          </span>
        );
    }
  };

  const filteredRequests = getFilteredRequests();

  if (userLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Loading Project Requests</h2>
          <p className="text-gray-600 dark:text-gray-400">Please wait while we load your project requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Project Requests</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Review and manage training project requests from clients
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link 
              href="/dashboard/trainer-profile"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FaUser className="mr-2 -ml-1" />
              Back to Profile
            </Link>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Status Filter */}
            <div className="flex items-center">
              <label className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">Status:</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="block w-full md:w-auto border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Requests</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="declined">Declined</option>
              </select>
            </div>
            
            {/* Sort By */}
            <div className="flex items-center">
              <label className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="block w-full md:w-auto border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="budget-high">Highest Budget</option>
                <option value="budget-low">Lowest Budget</option>
                <option value="deadline">Closest Deadline</option>
              </select>
            </div>
            
            {/* Search */}
            <div className="relative flex-grow max-w-md ml-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" size={14} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search project requests..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Project Requests List */}
        <div className="space-y-6">
          {filteredRequests.length > 0 ? (
            filteredRequests.map(request => (
              <div 
                key={request.id} 
                className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                {/* Request Header */}
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start">
                      <img 
                        src={request.client.avatar} 
                        alt={request.client.name}
                        className="w-10 h-10 rounded-full mr-3 object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/fighterfish.png";
                        }}
                      />
                      <div>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-white">{request.title}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          From: {request.client.name} • {formatDate(request.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 md:mt-0 flex items-center">
                      {getStatusBadge(request.status)}
                    </div>
                  </div>
                </div>
                
                {/* Request Summary */}
                <div className="px-6 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center">
                      <FaMoneyBillWave className="text-green-500 mr-2" size={16} />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Budget</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">${request.budget}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaCalendarAlt className="text-blue-500 mr-2" size={16} />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Deadline</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{formatDate(request.deadline)}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="text-purple-500 mr-2" size={16} />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{request.duration}</p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{request.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {request.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  {/* Toggle Details Button */}
                  <button
                    onClick={() => toggleDetails(request.id)}
                    className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    {showDetails[request.id] ? (
                      <>
                        <FaChevronUp className="mr-1" size={12} />
                        Hide Details
                      </>
                    ) : (
                      <>
                        <FaChevronDown className="mr-1" size={12} />
                        Show Details
                      </>
                    )}
                  </button>
                  
                  {/* Expanded Details */}
                  {showDetails[request.id] && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Requirements:</h3>
                      <ul className="list-disc pl-5 mb-4 space-y-1">
                        {request.requirements.map((req, index) => (
                          <li key={index} className="text-sm text-gray-600 dark:text-gray-400">{req}</li>
                        ))}
                      </ul>
                      
                      {/* Status Details */}
                      {request.status === 'accepted' && (
                        <div className="bg-green-50 dark:bg-green-900/10 p-3 rounded-md">
                          <p className="text-sm text-green-800 dark:text-green-400">
                            <FaCheckCircle className="inline-block mr-1" size={14} />
                            Accepted on {formatDate(request.acceptedAt)}
                          </p>
                        </div>
                      )}
                      
                      {request.status === 'declined' && (
                        <div className="bg-red-50 dark:bg-red-900/10 p-3 rounded-md">
                          <p className="text-sm text-red-800 dark:text-red-400">
                            <FaTimesCircle className="inline-block mr-1" size={14} />
                            Declined on {formatDate(request.declinedAt)}
                          </p>
                          <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                            Reason: {request.declineReason}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Action Buttons */}
                {request.status === 'pending' && (
                  <div className="px-6 py-4 bg-gray-50 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
                    <button
                      onClick={() => handleDecline(request.id)}
                      disabled={isProcessing[request.id]}
                      className={`inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ${
                        isProcessing[request.id] ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isProcessing[request.id] ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-700 dark:border-gray-300 mr-2"></div>
                      ) : (
                        <FaTimesCircle className="mr-2 -ml-1" size={14} />
                      )}
                      Decline
                    </button>
                    <button
                      onClick={() => handleAccept(request.id)}
                      disabled={isProcessing[request.id]}
                      className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 ${
                        isProcessing[request.id] ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isProcessing[request.id] ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      ) : (
                        <FaCheckCircle className="mr-2 -ml-1" size={14} />
                      )}
                      Accept
                    </button>
                  </div>
                )}
                
                {request.status === 'accepted' && (
                  <div className="px-6 py-4 bg-gray-50 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <Link
                      href={`/dashboard/active-projects/${request.id}`}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <FaProjectDiagram className="mr-2 -ml-1" size={14} />
                      View Project
                    </Link>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
              <FaProjectDiagram className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No project requests found</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {filter !== 'all' || searchQuery 
                  ? "Try changing your filters or search query." 
                  : "You don't have any project requests at the moment."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectRequestsPage;
