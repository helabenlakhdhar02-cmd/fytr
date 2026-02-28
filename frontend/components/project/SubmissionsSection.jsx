'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaExclamationTriangle, FaEye, FaFileAlt, FaHistory, FaPencilAlt, FaTimes } from 'react-icons/fa';
import WorkSubmissionViewer from './WorkSubmissionViewer';

const SubmissionsSection = ({ projectId, freelancers = [] }) => {
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showSubmissionViewer, setShowSubmissionViewer] = useState(false);
  const [submissionHistory, setSubmissionHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Sample submissions data (in a real app, this would come from an API)
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      freelancerId: 1,
      title: "Website Design - First Draft",
      description: "Initial design concepts for the homepage and key pages.",
      submittedAt: "2023-11-10T14:30:00Z",
      status: "accepted",
      previewType: "image",
      previewUrl: "/photos/Academy/student1.jpg",
      files: [
        {
          id: 1,
          name: "Homepage_Design.png",
          type: "image",
          size: "2.4 MB",
          uploadedAt: "2023-11-10T14:25:00Z",
          url: "/photos/Academy/student1.jpg"
        },
        {
          id: 2,
          name: "Design_Assets.zip",
          type: "zip",
          size: "15.7 MB",
          uploadedAt: "2023-11-10T14:28:00Z",
          url: "#"
        }
      ],
      comments: [
        {
          id: 1,
          author: {
            id: 'client-1',
            name: 'John Anderson',
            avatar: '/photos/Academy/student1.jpg'
          },
          text: "Great work on the homepage design! I love the color scheme.",
          timestamp: "2023-11-10T15:45:00Z"
        },
        {
          id: 2,
          author: {
            id: 'freelancer-1',
            name: 'Freelancer 1',
            avatar: '/fighterfish.png'
          },
          text: "Thank you! I'm glad you like it. Let me know if you need any adjustments.",
          timestamp: "2023-11-10T16:10:00Z"
        }
      ]
    },
    {
      id: 2,
      freelancerId: 2,
      title: "Logo Design Concepts",
      description: "Three logo concepts based on the brand guidelines.",
      submittedAt: "2023-11-11T10:15:00Z",
      status: "pending",
      previewType: "image",
      previewUrl: "/photos/Academy/student2.jpg",
      files: [
        {
          id: 3,
          name: "Logo_Concepts.pdf",
          type: "pdf",
          size: "3.2 MB",
          uploadedAt: "2023-11-11T10:10:00Z",
          url: "#"
        }
      ],
      comments: []
    },
    {
      id: 3,
      freelancerId: 3,
      title: "Mobile App Wireframes",
      description: "Wireframes for the mobile application screens.",
      submittedAt: "2023-11-12T09:45:00Z",
      status: "revision",
      previewType: "image",
      previewUrl: "/photos/Academy/student3.jpg",
      files: [
        {
          id: 4,
          name: "Mobile_Wireframes.pdf",
          type: "pdf",
          size: "5.1 MB",
          uploadedAt: "2023-11-12T09:40:00Z",
          url: "#"
        },
        {
          id: 5,
          name: "Interactive_Prototype.zip",
          type: "zip",
          size: "12.3 MB",
          uploadedAt: "2023-11-12T09:42:00Z",
          url: "#"
        }
      ],
      comments: [
        {
          id: 3,
          author: {
            id: 'client-1',
            name: 'John Anderson',
            avatar: '/photos/Academy/student1.jpg'
          },
          text: "The navigation flow needs some improvement. Can you revise the user journey?",
          timestamp: "2023-11-12T11:30:00Z"
        }
      ]
    }
  ]);

  // Get freelancer name by ID
  const getFreelancerName = (freelancerId) => {
    const freelancer = freelancers.find(f => f.id === freelancerId);
    return freelancer ? freelancer.name : 'Unknown Freelancer';
  };

  // Get freelancer avatar by ID
  const getFreelancerAvatar = (freelancerId) => {
    const freelancer = freelancers.find(f => f.id === freelancerId);
    return freelancer ? freelancer.profileImg : '/fighterfish.png';
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle view submission
  const handleViewSubmission = (submission) => {
    setSelectedSubmission(submission);
    setShowSubmissionViewer(true);
  };

  // Handle accept submission
  const handleAcceptSubmission = (submissionId, ratingData) => {
    setSubmissions(submissions.map(sub => 
      sub.id === submissionId 
        ? { ...sub, status: 'accepted', rating: ratingData.ratings, feedback: ratingData.feedback }
        : sub
    ));
    
    // Add to history
    setSubmissionHistory([
      ...submissionHistory,
      {
        id: submissionHistory.length + 1,
        submissionId,
        action: 'accepted',
        date: new Date().toISOString(),
        details: `Submission accepted with overall rating: ${ratingData.ratings.overall}/5`
      }
    ]);
    
    setShowSubmissionViewer(false);
    setSelectedSubmission(null);
  };

  // Handle reject submission
  const handleRejectSubmission = (submissionId, feedback) => {
    setSubmissions(submissions.map(sub => 
      sub.id === submissionId 
        ? { ...sub, status: 'rejected', feedback }
        : sub
    ));
    
    // Add to history
    setSubmissionHistory([
      ...submissionHistory,
      {
        id: submissionHistory.length + 1,
        submissionId,
        action: 'rejected',
        date: new Date().toISOString(),
        details: feedback || 'Submission rejected'
      }
    ]);
    
    setShowSubmissionViewer(false);
    setSelectedSubmission(null);
  };

  // Handle request revision
  const handleRequestRevision = (submissionId, revisionDetails) => {
    setSubmissions(submissions.map(sub => 
      sub.id === submissionId 
        ? { ...sub, status: 'revision', revisionDetails }
        : sub
    ));
    
    // Add to history
    setSubmissionHistory([
      ...submissionHistory,
      {
        id: submissionHistory.length + 1,
        submissionId,
        action: 'revision',
        date: new Date().toISOString(),
        details: revisionDetails
      }
    ]);
    
    setShowSubmissionViewer(false);
    setSelectedSubmission(null);
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted':
        return <FaCheckCircle className="text-green-500" size={16} />;
      case 'rejected':
        return <FaTimes className="text-red-500" size={16} />;
      case 'revision':
        return <FaPencilAlt className="text-yellow-500" size={16} />;
      case 'pending':
        return <FaExclamationTriangle className="text-blue-500" size={16} />;
      default:
        return <FaFileAlt className="text-gray-500" size={16} />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Project Submissions
        </h3>
        
        {submissionHistory.length > 0 && (
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="text-sm flex items-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            <FaHistory className="mr-1" size={14} />
            {showHistory ? 'Hide History' : 'Show History'}
          </button>
        )}
      </div>
      
      {/* Submission History */}
      {showHistory && submissionHistory.length > 0 && (
        <div className="p-4 bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Submission History</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {submissionHistory.map((item) => {
              const submission = submissions.find(s => s.id === item.submissionId);
              return (
                <div key={item.id} className="text-xs p-2 bg-white dark:bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      {item.action === 'accepted' && <FaCheckCircle className="text-green-500 mr-1" size={12} />}
                      {item.action === 'rejected' && <FaTimes className="text-red-500 mr-1" size={12} />}
                      {item.action === 'revision' && <FaPencilAlt className="text-yellow-500 mr-1" size={12} />}
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {submission ? submission.title : 'Unknown Submission'} - {' '}
                        {item.action === 'accepted' ? 'Accepted' : item.action === 'rejected' ? 'Rejected' : 'Revision Requested'}
                      </span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400">{formatDate(item.date)}</span>
                  </div>
                  <p className="mt-1 text-gray-600 dark:text-gray-400 pl-4">{item.details}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Submissions List */}
      <div className="p-4">
        {submissions.length > 0 ? (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <div 
                key={submission.id}
                className="p-4 bg-gray-50 dark:bg-gray-750 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                onClick={() => handleViewSubmission(submission)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-3">
                    <img 
                      src={getFreelancerAvatar(submission.freelancerId)} 
                      alt={getFreelancerName(submission.freelancerId)}
                      className="w-10 h-10 rounded-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/fighterfish.png";
                      }}
                    />
                    <div>
                      <h4 className="text-base font-medium text-gray-900 dark:text-white">
                        {submission.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        By {getFreelancerName(submission.freelancerId)} • {formatDate(submission.submittedAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      submission.status === 'accepted' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                        : submission.status === 'rejected'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                          : submission.status === 'revision'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                    }`}>
                      {getStatusIcon(submission.status)}
                      <span className="ml-1">
                        {submission.status === 'accepted' 
                          ? 'Accepted' 
                          : submission.status === 'rejected'
                            ? 'Rejected'
                            : submission.status === 'revision'
                              ? 'Revision Requested'
                              : 'Pending Review'}
                      </span>
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewSubmission(submission);
                      }}
                      className="p-1 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                      title="View Details"
                    >
                      <FaEye size={16} />
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {submission.description}
                </p>
                <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <span>{submission.files.length} file{submission.files.length !== 1 ? 's' : ''}</span>
                  <span className="mx-2">•</span>
                  <span>{submission.comments.length} comment{submission.comments.length !== 1 ? 's' : ''}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <FaFileAlt className="mx-auto text-gray-300 dark:text-gray-600 mb-3" size={32} />
            <p className="text-gray-500 dark:text-gray-400">No submissions yet</p>
          </div>
        )}
      </div>
      
      {/* Submission Viewer Modal */}
      {showSubmissionViewer && selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Submission Details
              </h3>
              <button
                onClick={() => {
                  setShowSubmissionViewer(false);
                  setSelectedSubmission(null);
                }}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto p-4" style={{ maxHeight: 'calc(90vh - 70px)' }}>
              <WorkSubmissionViewer
                submission={selectedSubmission}
                onAccept={handleAcceptSubmission}
                onReject={handleRejectSubmission}
                onRequestRevision={handleRequestRevision}
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SubmissionsSection;
