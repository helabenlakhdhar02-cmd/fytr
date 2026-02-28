"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaUser, FaArrowLeft, FaFileUpload, FaFile, FaTrash, FaPlus, FaLink,
  FaCheckCircle, FaTimesCircle, FaInfoCircle, FaComments, FaCalendarAlt,
  FaMoneyBillWave, FaProjectDiagram, FaClipboardList, FaExclamationTriangle
} from "react-icons/fa";

import Navbar from "../../../../components/Navbar";
import { useAuth } from "../../../../context/AuthContext";
import { useUser } from "../../../../context/UserContext";
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

const SubmitWorkPage = ({ params }) => {
  const router = useRouter();
  const { userData: user, loading: userLoading } = useUser();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const projectId = params.projectId;

  // Mock project data
  const mockProjects = [
    {
      id: 1,
      title: 'Advanced React Training for Team',
      client: {
        name: 'TechCorp Solutions',
        avatar: '/photos/Academy/client1.jpg'
      },
      status: 'in_progress',
      deadline: '2023-12-15',
      budget: 1200,
      progress: 65,
      description: 'Provide comprehensive React training for a team of 5 junior developers, focusing on hooks, context API, and performance optimization.',
      lastUpdate: '2023-11-20',
      requirements: [
        'Cover React fundamentals and advanced concepts',
        'Provide practical exercises for the team',
        'Include performance optimization techniques',
        'Deliver code examples and documentation'
      ]
    },
    {
      id: 2,
      title: 'JavaScript Fundamentals Course',
      client: {
        name: 'WebDev Academy',
        avatar: '/photos/Academy/client2.jpg'
      },
      status: 'pending_review',
      deadline: '2023-12-05',
      budget: 800,
      progress: 100,
      description: 'Create and deliver a 4-week JavaScript fundamentals course for beginners, including exercises and assessments.',
      lastUpdate: '2023-11-25',
      requirements: [
        'Create comprehensive course materials',
        'Develop practical exercises for each module',
        'Include assessment tests',
        'Provide reference documentation'
      ]
    },
    {
      id: 3,
      title: 'UI/UX Design Workshop',
      client: {
        name: 'Creative Designs Inc',
        avatar: '/photos/Academy/client3.jpg'
      },
      status: 'completed',
      deadline: '2023-11-10',
      budget: 950,
      progress: 100,
      description: 'Conduct a 2-day workshop on UI/UX design principles and practices for a team of graphic designers transitioning to web design.',
      lastUpdate: '2023-11-12',
      requirements: [
        'Cover UI/UX fundamentals',
        'Include practical design exercises',
        'Provide feedback on participant work',
        'Deliver design resources and tools'
      ],
      feedback: 'Excellent workshop! Our team learned a lot and is now applying these principles in their work.',
      rating: 4.9
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, you would fetch the project from the API
        // For now, we'll use mock data
        const foundProject = mockProjects.find(p => p.id.toString() === projectId);
        if (foundProject) {
          setProject(foundProject);
        } else {
          showToast('Project not found', 'error');
          router.push('/dashboard/active-projects');
        }
      } catch (error) {
        console.error('Error fetching project:', error);
        showToast('Error loading project', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    if (projectId) {
      fetchData();
    }
  }, [projectId, router]);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  // Remove file from list
  const handleRemoveFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (files.length === 0) {
      showToast('Please add at least one file', 'error');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real implementation, you would upload files and submit the work
      // For demonstration, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showToast('Work submitted successfully');
      router.push('/dashboard/active-projects');
    } catch (error) {
      console.error('Error submitting work:', error);
      showToast('Error submitting work', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (userLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Loading Project</h2>
          <p className="text-gray-600 dark:text-gray-400">Please wait while we load the project details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <FaExclamationTriangle className="text-yellow-500 text-5xl mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Project Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The project you're looking for doesn't exist or you don't have access to it.</p>
          <Link
            href="/dashboard/active-projects"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaArrowLeft className="mr-2 -ml-1" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            href="/dashboard/active-projects"
            className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            <FaArrowLeft className="mr-2" size={14} />
            Back to Projects
          </Link>
          
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">Submit Work</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Submit your work for the project: {project.title}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Project Details */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Project Details</h2>
              </div>
              
              <div className="px-6 py-5">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">{project.title}</h3>
                
                <div className="flex items-center mb-4">
                  <img 
                    src={project.client.avatar} 
                    alt={project.client.name}
                    className="w-10 h-10 rounded-full mr-3"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/fighterfish.png";
                    }}
                  />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">{project.client.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Client</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <FaCalendarAlt className="text-gray-400 mt-1 mr-3" size={14} />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Deadline</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {new Date(project.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaMoneyBillWave className="text-gray-400 mt-1 mr-3" size={14} />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Budget</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        ${project.budget}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Description</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{project.description}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Requirements</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    {project.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" size={12} />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Submit Work Form */}
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Submit Your Work</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="px-6 py-5">
                {/* File Upload Section */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Upload Files
                  </label>
                  
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="file-upload"
                      multiple
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center justify-center"
                    >
                      <FaFileUpload className="text-gray-400 dark:text-gray-500 text-3xl mb-3" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Drag and drop files here or click to browse
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Upload any files related to your work (max 50MB per file)
                      </span>
                    </label>
                  </div>
                  
                  {/* File List */}
                  {files.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Selected Files ({files.length})
                      </h4>
                      <ul className="space-y-2">
                        {files.map((file, index) => (
                          <li key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                            <div className="flex items-center">
                              <FaFile className="text-blue-500 mr-3" size={16} />
                              <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate max-w-xs">
                                  {file.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveFile(index)}
                              className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                            >
                              <FaTrash size={14} />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                {/* Comment Section */}
                <div className="mb-6">
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Additional Comments
                  </label>
                  <textarea
                    id="comment"
                    rows="4"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add any comments or notes about your submission..."
                    className="block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                  ></textarea>
                </div>
                
                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting || files.length === 0}
                    className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                      isSubmitting || files.length === 0
                        ? 'bg-blue-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <FaFileUpload className="mr-2 -ml-1" />
                        Submit Work
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitWorkPage;
