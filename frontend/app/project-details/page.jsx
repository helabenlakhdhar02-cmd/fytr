'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaComments, FaClock, FaUsers, FaCheckCircle, FaFileAlt, FaMoneyBillWave, FaCalendarAlt, FaTasks, FaFileUpload, FaChartLine, FaEnvelope } from 'react-icons/fa';
import Navbar from '../../components/Navbar';
import ProjectUserContainer from '../../components/ProjectUserContainer';
import ProjectMessageContainer from '../../components/ProjectMessageContainer';
import ProjectTimeline from '../../components/ProjectTimeline';
import ProjectActions from '../../components/ProjectActions';
import SubmissionProgressBar from '../../components/SubmissionProgressBar';
import WinnerSelectionButton from '../../components/WinnerSelectionButton';
import ProjectProgressTracker from '../../components/project/ProjectProgressTracker';
import ProjectFileManager from '../../components/project/ProjectFileManager';
import ProjectCommunication from '../../components/project/ProjectCommunication';
import SubmissionsSection from '../../components/project/SubmissionsSection';
import Link from 'next/link';
import FreelancerMessageModal from '../../components/project/FreelancerMessageModal';

// Sample data for the project details page
// We'll create multiple project types to demonstrate flexibility
const sampleProjectTypes = {
  // SoloFin with multiple freelancers (client selects one)
  soloFinMultiple: {
    id: 1,
    title: "Website Redesign",
    description: "Complete redesign of company website with modern UI/UX, responsive design, and improved performance.",
    status: "in-progress",
    type: "soloFin",
    deadline: "2023-12-15",
    budget: 1200,
    created_at: "2023-10-05",
    updated_at: "2023-11-10",
    progress: 65,
    client: {
      id: 1,
      name: "John Anderson",
      avatar: "/photos/Academy/student1.jpg"
    },
    freelancers: [
      {
        id: 1,
        name: "Freelancer 1",
        profileImg: "/fighterfish.png",
        rating: 4.8,
        level: "Gold",
        feedback: "Selected for the final design. Great work!",
        isSelected: true,
        hasSubmitted: true
      },
      {
        id: 2,
        name: "Freelancer 2",
        profileImg: "/fighterfish.png",
        rating: 4.5,
        level: "Silver",
        feedback: "Very creative design with excellent attention to detail.",
        hasSubmitted: true
      },
      {
        id: 3,
        name: "Freelancer 3",
        profileImg: "/fighterfish.png",
        rating: 4.0,
        level: "Bronze",
        feedback: "Good understanding of the brand identity.",
        hasSubmitted: true
      },
      {
        id: 4,
        name: "Freelancer 4",
        profileImg: "/fighterfish.png",
        rating: 3.5,
        level: "Bronze",
        feedback: "Solid work but could use more refinement.",
        hasSubmitted: false
      }
    ]
  },

  // SoloFin with single freelancer (direct hire)
  soloFinSingle: {
    id: 2,
    title: "Logo Design",
    description: "Create a modern logo for our brand that reflects our values and appeals to our target audience.",
    status: "in-progress",
    type: "soloFin",
    deadline: "2023-11-30",
    budget: 500,
    created_at: "2023-11-01",
    updated_at: "2023-11-05",
    progress: 40,
    client: {
      id: 1,
      name: "John Anderson",
      avatar: "/photos/Academy/student1.jpg"
    },
    freelancers: [
      {
        id: 5,
        name: "Designer Pro",
        profileImg: "/fighterfish.png",
        rating: 4.9,
        level: "Platinum",
        feedback: "",
        isSelected: true,
        hasSubmitted: false
      }
    ]
  },

  // BettaArena with multiple freelancers (platform selects winner)
  bettaArena: {
    id: 3,
    title: "Mobile App UI Design",
    description: "Design the user interface for our new mobile app. Looking for creative and intuitive designs.",
    status: "in-progress",
    type: "bettaArena",
    deadline: "2023-12-20",
    budget: 2000,
    created_at: "2023-10-15",
    updated_at: "2023-11-10",
    progress: 75,
    client: {
      id: 1,
      name: "John Anderson",
      avatar: "/photos/Academy/student1.jpg"
    },
    freelancers: [
      {
        id: 6,
        name: "UI Expert",
        profileImg: "/fighterfish.png",
        rating: 4.7,
        level: "Gold",
        feedback: "Excellent work, selected as the winner!",
        isSelected: true,
        hasSubmitted: true
      },
      {
        id: 7,
        name: "Mobile Designer",
        profileImg: "/fighterfish.png",
        rating: 4.6,
        level: "Gold",
        feedback: "Great design but not selected.",
        hasSubmitted: true
      },
      {
        id: 8,
        name: "App Specialist",
        profileImg: "/fighterfish.png",
        rating: 4.4,
        level: "Silver",
        feedback: "Good work but needs improvement.",
        hasSubmitted: true
      },
      {
        id: 9,
        name: "UX Designer",
        profileImg: "/fighterfish.png",
        rating: 4.3,
        level: "Silver",
        feedback: "",
        hasSubmitted: true
      },
      {
        id: 10,
        name: "Interface Pro",
        profileImg: "/fighterfish.png",
        rating: 4.2,
        level: "Silver",
        feedback: "",
        hasSubmitted: true
      },
      {
        id: 11,
        name: "Design Novice",
        profileImg: "/fighterfish.png",
        rating: 3.8,
        level: "Bronze",
        feedback: "",
        hasSubmitted: false
      }
    ]
  },

  // New project with no freelancers yet
  newProject: {
    id: 4,
    title: "Content Writing",
    description: "Need articles written for our blog about technology trends.",
    status: "pending",
    type: "soloFin",
    deadline: "2023-12-30",
    budget: 800,
    created_at: "2023-11-10",
    updated_at: "2023-11-10",
    progress: 0,
    client: {
      id: 1,
      name: "John Anderson",
      avatar: "/photos/Academy/student1.jpg"
    },
    freelancers: []
  }
};

// Add milestones to all project types
Object.values(sampleProjectTypes).forEach(project => {
  project.milestones = [
    {
      id: 1,
      title: "Design and Wireframes",
      description: "Create wireframes and design mockups for all pages",
      status: "completed",
      due_date: "2023-10-25",
      amount: 500
    },
    {
      id: 2,
      title: "Frontend Development",
      description: "Implement the frontend UI based on approved designs",
      status: "in_progress",
      due_date: "2023-11-20",
      amount: 1000
    },
    {
      id: 3,
      title: "Backend Development",
      description: "Develop backend API and database integration",
      status: "pending",
      due_date: "2023-12-05",
      amount: 1000
    }
  ];

  // Add project files
  project.files = [
    {
      id: 1,
      name: "Project Brief.pdf",
      type: "pdf",
      path: "/Project Brief.pdf",
      size: "2.4 MB",
      uploadedAt: "2023-10-05T10:30:00Z"
    },
    {
      id: 2,
      name: "Design Assets",
      type: "folder",
      path: "/Design Assets/",
      uploadedAt: "2023-10-10T14:15:00Z"
    },
    {
      id: 3,
      name: "Logo.png",
      type: "image",
      path: "/Design Assets/Logo.png",
      size: "1.2 MB",
      uploadedAt: "2023-10-10T14:20:00Z"
    },
    {
      id: 4,
      name: "Mockups.zip",
      type: "zip",
      path: "/Design Assets/Mockups.zip",
      size: "15.7 MB",
      uploadedAt: "2023-10-12T09:45:00Z"
    },
    {
      id: 5,
      name: "Development",
      type: "folder",
      path: "/Development/",
      uploadedAt: "2023-10-15T11:30:00Z"
    },
    {
      id: 6,
      name: "Frontend Code.zip",
      type: "zip",
      path: "/Development/Frontend Code.zip",
      size: "8.3 MB",
      uploadedAt: "2023-10-20T16:10:00Z"
    },
    {
      id: 7,
      name: "API Documentation.docx",
      type: "doc",
      path: "/Development/API Documentation.docx",
      size: "1.8 MB",
      uploadedAt: "2023-10-22T13:25:00Z"
    }
  ];

  // Add messages
  project.messages = [
    {
      id: 1,
      sender: {
        id: 'client-1',
        name: 'John Anderson',
        avatar: '/photos/Academy/student1.jpg'
      },
      content: "Hello team! I'm excited to get started on this project. Let me know if you have any questions about the requirements.",
      timestamp: "2023-10-05T11:30:00Z",
      status: 'read'
    },
    {
      id: 2,
      sender: {
        id: 'freelancer-1',
        name: 'Freelancer 1',
        avatar: '/fighterfish.png'
      },
      content: "Thanks for the opportunity! I've reviewed the project brief and have a few questions about the design requirements.",
      timestamp: "2023-10-05T12:45:00Z",
      status: 'read'
    },
    {
      id: 3,
      sender: {
        id: 'client-1',
        name: 'John Anderson',
        avatar: '/photos/Academy/student1.jpg'
      },
      content: "Sure, what questions do you have?",
      timestamp: "2023-10-05T13:10:00Z",
      status: 'read'
    },
    {
      id: 4,
      sender: {
        id: 'freelancer-1',
        name: 'Freelancer 1',
        avatar: '/fighterfish.png'
      },
      content: "I'm wondering about the color scheme preferences. Do you have specific brand colors you'd like me to use?",
      timestamp: "2023-10-05T13:25:00Z",
      status: 'read'
    },
    {
      id: 5,
      sender: {
        id: 'client-1',
        name: 'John Anderson',
        avatar: '/photos/Academy/student1.jpg'
      },
      content: "Yes, I've uploaded our brand guidelines to the project files. You can find the color codes there.",
      timestamp: "2023-10-05T14:00:00Z",
      status: 'read',
      attachments: [
        {
          id: 1,
          name: "Brand Guidelines.pdf",
          type: "pdf",
          size: "3.2 MB"
        }
      ]
    },
    {
      id: 6,
      sender: {
        id: 'freelancer-1',
        name: 'Freelancer 1',
        avatar: '/fighterfish.png'
      },
      content: "Perfect! I'll review the guidelines and start working on the initial designs.",
      timestamp: "2023-10-05T14:15:00Z",
      status: 'read'
    },
    {
      id: 7,
      sender: {
        id: 'freelancer-1',
        name: 'Freelancer 1',
        avatar: '/fighterfish.png'
      },
      content: "I've completed the initial mockups. Please take a look and let me know your thoughts.",
      timestamp: "2023-10-12T10:30:00Z",
      status: 'read',
      attachments: [
        {
          id: 2,
          name: "Initial Mockups.zip",
          type: "zip",
          size: "8.5 MB"
        }
      ]
    }
  ];
});

// Choose which project type to display
// In a real app, this would be determined by the URL parameter
const sampleProjectData = sampleProjectTypes.soloFinMultiple;

const ProjectDetailsPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [projectData, setProjectData] = useState(null);
  const [expandedFreelancerId, setExpandedFreelancerId] = useState(null);
  const [freelancerReviews, setFreelancerReviews] = useState({});
  const [winnerSelected, setWinnerSelected] = useState(false);
  const [submittedCount, setSubmittedCount] = useState(0);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'files', 'communication', 'progress'
  const [showMessageModal, setShowMessageModal] = useState(false);

  // State for scroll-to-top button and chat visibility
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showChatPopup, setShowChatPopup] = useState(false);

  // Simulate loading state, handle scroll, and check URL parameters
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Check if URL has project ID and type parameters
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const projectId = urlParams.get('id');
      const projectType = urlParams.get('type') || 'soloFinMultiple';

      console.log(`Loading project with ID: ${projectId}, Type: ${projectType}`);

      // In a real app, you would fetch the project data from the API
      // For demo purposes, we'll use the sample data based on the type parameter
      setTimeout(() => {
        // Choose project data based on type parameter
        let selectedProject;

        if (projectType === 'soloFinSingle') {
          selectedProject = sampleProjectTypes.soloFinSingle;
        } else if (projectType === 'bettaArena') {
          selectedProject = sampleProjectTypes.bettaArena;
        } else if (projectType === 'newProject') {
          selectedProject = sampleProjectTypes.newProject;
        } else {
          // Default to soloFinMultiple
          selectedProject = sampleProjectTypes.soloFinMultiple;
        }

        // Set project data
        setProjectData(selectedProject);

        // Set submitted count
        setSubmittedCount(selectedProject.freelancers.filter(f => f.hasSubmitted).length);

        // Set winner selected
        setWinnerSelected(selectedProject.freelancers.some(f => f.isSelected));

        // Hide loading indicator
        setLoading(false);
      }, 1000);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Determine project type and display mode
  const getProjectTypeInfo = () => {
    if (!projectData) return { isSoloFin: true, isSingleFreelancer: true, hasSelectedFreelancer: false };

    const isSoloFin = projectData.type === 'soloFin';
    const isBettaArena = projectData.type === 'bettaArena';
    const hasSelectedFreelancer = projectData.freelancers.some(f => f.isSelected);
    const isSingleFreelancer = projectData.freelancers.length === 1;

    return {
      isSoloFin,
      isBettaArena,
      hasSelectedFreelancer,
      isSingleFreelancer,
      totalFreelancers: projectData.freelancers.length,
      submittedCount: projectData.freelancers.filter(f => f.hasSubmitted).length
    };
  };

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Handle payment button click
  const handlePayFreelancer = () => {
    if (!projectData || !getProjectTypeInfo().hasSelectedFreelancer) {
      alert('Please select a freelancer first before making payment.');
      return;
    }

    const selectedFreelancer = projectData.freelancers.find(f => f.isSelected);
    if (!selectedFreelancer) {
      alert('Unable to find selected freelancer.');
      return;
    }

    // Navigate to payment form with project details
    router.push(
      `/payment?type=project&amount=${projectData.budget}&receiver_id=${selectedFreelancer.id}&project_id=${projectData.id}&title=${encodeURIComponent(projectData.title)}`
    );
  };

  // Handle freelancer card expansion
  const handleExpandChange = (freelancerId) => {
    setExpandedFreelancerId(freelancerId);
  };

  // Handle review save
  const handleReviewSave = (freelancerId, reviewData) => {
    setFreelancerReviews(prev => ({
      ...prev,
      [freelancerId]: reviewData
    }));

    // If this is marked as the final selection, update all other reviews
    if (reviewData.isFinalSelection) {
      // In a real app, you would make an API call here
      console.log(`Freelancer ${freelancerId} selected as final`);
      setWinnerSelected(true);
    }
  };

  // Function to toggle chat visibility
  const toggleChat = () => {
    setShowChat(!showChat);
    // Close popup if chat is closed
    if (showChat) setShowChatPopup(false);
  };

  // Function to toggle chat popup
  const toggleChatPopup = () => {
    setShowChatPopup(!showChatPopup);
  };

  // Function to handle submission status change
  const handleSubmissionStatusChange = (freelancerId, hasSubmitted) => {
    // In a real app, this would update the submission status in the API
    console.log(`Freelancer ${freelancerId} submission status changed to ${hasSubmitted ? 'submitted' : 'waiting'}`);

    // Update the submitted count
    if (hasSubmitted) {
      setSubmittedCount(prev => prev + 1);
    } else {
      setSubmittedCount(prev => Math.max(0, prev - 1));
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
            <FaCheckCircle className="inline mr-1" size={10} />
            Completed
          </span>
        );
      case 'in-progress':
      case 'in_progress':
        return (
          <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
            <FaClock className="inline mr-1" size={10} />
            In Progress
          </span>
        );
      case 'pending':
        return (
          <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
            <FaClock className="inline mr-1" size={10} />
            Pending
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 bg-pattern-light dark:bg-pattern-dark relative">
      {loading && (
        <div className="fixed inset-0 bg-white dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-80 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-primary-600 dark:text-primary-400 text-lg font-medium">Loading...</p>
          </div>
        </div>
      )}
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/clante/dashboard"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-white dark:bg-gray-800 py-2 px-4 rounded-lg shadow-sm hover:shadow transition-all duration-200"
          >
            <FaArrowLeft className="mr-2" /> Back to Dashboard
          </Link>
        </div>

        {projectData && (
          <>
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 mb-8 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mr-4">
                  <FaFileAlt className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {projectData.title}
                  </h1>
                  <div className="flex items-center mt-1">
                    {getStatusBadge(projectData.status)}
                    <span className="text-gray-500 dark:text-gray-400 text-sm ml-3">Due: {formatDate(projectData.deadline)}</span>
                  </div>
                </div>
              </div>

              <div className="pl-16 mb-6">
                <p className="text-gray-600 dark:text-gray-400 border-l-4 border-blue-200 dark:border-blue-800 pl-4 py-2">
                  {projectData.description}
                </p>
              </div>

              <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <FaMoneyBillWave className="text-blue-500 mr-2" size={16} />
                    <span className="font-medium text-gray-900 dark:text-white">DT {projectData.budget}</span>
                  </div>

                  <div className="flex items-center">
                    <FaCalendarAlt className="text-blue-500 mr-2" size={16} />
                    <span className="font-medium text-gray-900 dark:text-white">Created: {formatDate(projectData.created_at)}</span>
                  </div>

                  {getProjectTypeInfo().totalFreelancers > 1 && (
                    <div className="flex items-center">
                      <FaUsers className="text-blue-500 mr-2" size={16} />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {getProjectTypeInfo().isBettaArena
                          ? `${getProjectTypeInfo().submittedCount} of ${getProjectTypeInfo().totalFreelancers} competing`
                          : `${getProjectTypeInfo().submittedCount} of ${getProjectTypeInfo().totalFreelancers} submitted`}
                      </span>
                    </div>
                  )}

                  {getProjectTypeInfo().hasSelectedFreelancer && (
                    <div className="flex items-center">
                      <FaCheckCircle className="text-green-500 mr-2" size={16} />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {getProjectTypeInfo().isBettaArena ? "Winner Selected" : "Freelancer Hired"}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  {getProjectTypeInfo().hasSelectedFreelancer && (
                    <button
                      onClick={handlePayFreelancer}
                      className="flex items-center bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-800/50 px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
                    >
                      <FaMoneyBillWave className="mr-2" />
                      <span>Pay Freelancer</span>
                    </button>
                  )}

                  <button
                    className="flex items-center bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/50 px-4 py-2 rounded-lg transition-colors duration-200"
                    onClick={() => setActiveTab('communication')}
                  >
                    <FaComments className="mr-2" />
                    <span>
                      {getProjectTypeInfo().isSingleFreelancer
                        ? "Message Freelancer"
                        : (getProjectTypeInfo().hasSelectedFreelancer
                          ? "Project Chat"
                          : (getProjectTypeInfo().isBettaArena
                            ? "Competition Chat"
                            : "Project Chat"))}
                    </span>
                  </button>

                  <button
                    className="flex items-center bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/50 px-4 py-2 rounded-lg transition-colors duration-200"
                    onClick={() => setActiveTab('files')}
                  >
                    <FaFileUpload className="mr-2" />
                    <span>Files</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Tabs Navigation */}
            <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
              <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
                <li className="mr-2">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`inline-flex items-center p-4 border-b-2 rounded-t-lg ${
                      activeTab === 'overview'
                        ? 'text-blue-600 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                        : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                    }`}
                  >
                    <FaUsers className="mr-2" size={16} />
                    Overview
                  </button>
                </li>
                <li className="mr-2">
                  <button
                    onClick={() => setActiveTab('submissions')}
                    className={`inline-flex items-center p-4 border-b-2 rounded-t-lg ${
                      activeTab === 'submissions'
                        ? 'text-blue-600 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                        : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                    }`}
                  >
                    <FaFileAlt className="mr-2" size={16} />
                    Submissions
                  </button>
                </li>
                <li className="mr-2">
                  <button
                    onClick={() => setActiveTab('progress')}
                    className={`inline-flex items-center p-4 border-b-2 rounded-t-lg ${
                      activeTab === 'progress'
                        ? 'text-blue-600 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                        : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                    }`}
                  >
                    <FaChartLine className="mr-2" size={16} />
                    Progress
                  </button>
                </li>
                <li className="mr-2">
                  <button
                    onClick={() => setActiveTab('files')}
                    className={`inline-flex items-center p-4 border-b-2 rounded-t-lg ${
                      activeTab === 'files'
                        ? 'text-blue-600 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                        : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                    }`}
                  >
                    <FaFileUpload className="mr-2" size={16} />
                    Files
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('communication')}
                    className={`inline-flex items-center p-4 border-b-2 rounded-t-lg ${
                      activeTab === 'communication'
                        ? 'text-blue-600 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                        : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                    }`}
                  >
                    <FaComments className="mr-2" size={16} />
                    Communication
                  </button>
                </li>
              </ul>
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="flex flex-col lg:flex-row gap-8 mb-8 animate-fadeIn">
                {/* Left Column - User Containers */}
                <div className="flex-1">
                  {/* User Containers Section */}
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {getProjectTypeInfo().isBettaArena ? 'Competing Freelancers' :
                      (getProjectTypeInfo().hasSelectedFreelancer ? 'Assigned Freelancer' : 'Freelancer Proposals')}
                    </h2>

                    {getProjectTypeInfo().totalFreelancers > 1 && (
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {getProjectTypeInfo().submittedCount} of {getProjectTypeInfo().totalFreelancers} submitted
                      </span>
                    )}
                  </div>

                  {/* User Containers */}
                  {projectData.freelancers.map((freelancer, index) => (
                    <motion.div
                      key={freelancer.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                      <ProjectUserContainer
                        user={freelancer}
                        hasSubmitted={freelancer.hasSubmitted}
                        showChat={showChat}
                        onReviewSave={handleReviewSave}
                        onExpandChange={handleExpandChange}
                        projectType={getProjectTypeInfo().isBettaArena ? 'bettaArena' : 'soloFin'}
                        isSingleFreelancer={getProjectTypeInfo().isSingleFreelancer}
                      />
                    </motion.div>
                  ))}

                  {/* Show message if no freelancers */}
                  {projectData.freelancers.length === 0 && (
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
                      <p className="text-gray-600 dark:text-gray-400">No freelancers have been assigned to this project yet.</p>
                    </div>
                  )}
                </div>

                {/* Right Column - Project Timeline and Actions */}
                <div className="lg:w-96 space-y-6">
                  {/* Only show progress bar for projects with multiple freelancers */}
                  {getProjectTypeInfo().totalFreelancers > 1 && !getProjectTypeInfo().hasSelectedFreelancer && (
                    <SubmissionProgressBar
                      total={projectData.freelancers.length}
                      submitted={submittedCount}
                      deadline={projectData.deadline}
                    />
                  )}

                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Project Actions</h2>

                    {/* Show different actions based on project type and state */}
                    {getProjectTypeInfo().hasSelectedFreelancer ? (
                      <div className="space-y-3">
                        <button
                          onClick={() => setActiveTab('communication')}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium"
                        >
                          Message Freelancer
                        </button>
                        <button
                          onClick={() => setActiveTab('submissions')}
                          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium"
                        >
                          Review Deliverables
                        </button>
                      </div>
                    ) : getProjectTypeInfo().totalFreelancers > 0 ? (
                      <WinnerSelectionButton
                        onSelectWinner={() => {
                          console.log('Winner selected');
                          setWinnerSelected(true);
                          return Promise.resolve();
                        }}
                        isDisabled={submittedCount < 1}
                        isWinnerSelected={winnerSelected}
                        buttonText={getProjectTypeInfo().isBettaArena ? "Select Winner" : "Hire Freelancer"}
                      />
                    ) : (
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium">
                        Find Freelancers
                      </button>
                    )}
                  </div>

                  <ProjectTimeline milestones={projectData.milestones} />

                  <ProjectActions
                    projectType={getProjectTypeInfo().isBettaArena ? 'bettaArena' : 'soloFin'}
                    hasSelectedFreelancer={getProjectTypeInfo().hasSelectedFreelancer}
                  />
                </div>
              </div>
            )}

            {/* Submissions Tab */}
            {activeTab === 'submissions' && (
              <div className="animate-fadeIn">
                <SubmissionsSection
                  projectId={projectData.id}
                  freelancers={projectData.freelancers}
                />
              </div>
            )}

            {/* Progress Tab */}
            {activeTab === 'progress' && (
              <div className="animate-fadeIn">
                <ProjectProgressTracker project={projectData} />
              </div>
            )}

            {/* Files Tab */}
            {activeTab === 'files' && (
              <div className="animate-fadeIn">
                <ProjectFileManager
                  projectFiles={projectData.files}
                  onUpload={(files, folder) => console.log('Upload files', files, 'to folder', folder)}
                  onDelete={(fileIds) => console.log('Delete files', fileIds)}
                  onCreateFolder={(parentFolder, folderName) => console.log('Create folder', folderName, 'in', parentFolder)}
                />
              </div>
            )}

            {/* Communication Tab */}
            {activeTab === 'communication' && (
              <div className="animate-fadeIn">
                <ProjectCommunication
                  projectId={projectData.id}
                  participants={[
                    {
                      id: 'client-1',
                      name: 'John Anderson (You)',
                      avatar: '/photos/Academy/student1.jpg',
                      online: true
                    },
                    ...projectData.freelancers.map(freelancer => ({
                      id: `freelancer-${freelancer.id}`,
                      name: freelancer.name,
                      avatar: freelancer.profileImg,
                      online: Math.random() > 0.5
                    }))
                  ]}
                  initialMessages={projectData.messages}
                />
              </div>
            )}
          </>
        )}

        {/* Chat Bot Interface - Side Panel */}
        {showChat && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 100 }}
            className="fixed top-16 right-0 bottom-0 w-full md:right-4 md:bottom-4 md:w-96 lg:w-96 xl:w-96 bg-white dark:bg-gray-800 shadow-xl border border-blue-200 dark:border-blue-800 overflow-hidden z-30 flex flex-col rounded-lg md:rounded-lg"
          >
          <div className="flex flex-col h-full">
            <div className="py-2 px-3 bg-blue-600 text-white border-b border-blue-700 flex justify-between items-center sticky top-0 rounded-t-lg md:rounded-t-lg shadow-sm z-10">
              <div className="flex items-center">
                <div className="bg-blue-500 p-1 rounded-full mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="flex flex-col leading-tight">
                  <h2 className="text-base font-bold text-white">Project Chat</h2>
                  <p className="text-xs text-blue-100 -mt-0.5">{projectData?.freelancers.length || 0} participants</p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="bg-blue-500 text-white p-1 rounded-full hover:bg-blue-400 transition-colors duration-200"
                title="Close chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-hidden h-[calc(100%-48px)]">
              <ProjectMessageContainer onClose={toggleChat} />
            </div>
          </div>
        </motion.div>
        )}
      </div>

      {/* Chat toggle button - hidden when chat is open or on communication tab */}
      {!showChat && activeTab !== 'communication' && (
        <motion.button
          onClick={toggleChat}
          className="fixed bottom-20 right-4 sm:bottom-24 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-40 hover:scale-110 transform"
          aria-label="Toggle chat"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <FaComments className="h-6 w-6" />
        </motion.button>
      )}

      {/* Scroll to top button - hidden when chat is open */}
      {showScrollTop && !showChat && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 sm:bottom-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-40 hover:scale-110 transform"
          aria-label="Scroll to top"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}
    </div>
  );
};

export default ProjectDetailsPage;
