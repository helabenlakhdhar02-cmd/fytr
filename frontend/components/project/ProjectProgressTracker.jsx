'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaCheckCircle, FaClock, FaExclamationTriangle, FaFileAlt, FaHistory } from 'react-icons/fa';

const ProjectProgressTracker = ({ project }) => {
  const [showHistory, setShowHistory] = useState(false);

  // Calculate project progress percentage
  const calculateProgress = () => {
    if (!project || !project.milestones || project.milestones.length === 0) return 0;
    
    const completedMilestones = project.milestones.filter(m => m.status === 'completed').length;
    return Math.round((completedMilestones / project.milestones.length) * 100);
  };

  // Calculate days remaining
  const calculateDaysRemaining = () => {
    if (!project || !project.deadline) return 0;
    
    const deadline = new Date(project.deadline);
    const today = new Date();
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in_progress':
      case 'in-progress':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'delayed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get project status
  const getProjectStatus = () => {
    if (!project) return { label: 'Unknown', color: 'gray', icon: FaExclamationTriangle };
    
    const daysRemaining = calculateDaysRemaining();
    const progress = calculateProgress();
    
    if (project.status === 'completed') {
      return { 
        label: 'Completed', 
        color: 'green',
        icon: FaCheckCircle,
        description: 'Project has been successfully completed.'
      };
    } else if (daysRemaining < 0) {
      return { 
        label: 'Overdue', 
        color: 'red',
        icon: FaExclamationTriangle,
        description: `Project is overdue by ${Math.abs(daysRemaining)} days.`
      };
    } else if (daysRemaining <= 3) {
      return { 
        label: 'Urgent', 
        color: 'orange',
        icon: FaExclamationTriangle,
        description: `Project deadline is approaching (${daysRemaining} days left).`
      };
    } else if (progress < 30 && daysRemaining < 7) {
      return { 
        label: 'At Risk', 
        color: 'yellow',
        icon: FaExclamationTriangle,
        description: 'Project progress is behind schedule.'
      };
    } else {
      return { 
        label: 'On Track', 
        color: 'blue',
        icon: FaClock,
        description: `Project is progressing as planned with ${daysRemaining} days remaining.`
      };
    }
  };

  const projectStatus = getProjectStatus();
  const progress = calculateProgress();
  const daysRemaining = calculateDaysRemaining();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Project Progress</h3>
      </div>
      
      <div className="p-4">
        {/* Progress Overview */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Progress</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        {/* Status Card */}
        <div className={`mb-6 p-3 rounded-lg bg-${projectStatus.color}-100 dark:bg-${projectStatus.color}-900/20 border border-${projectStatus.color}-200 dark:border-${projectStatus.color}-800`}>
          <div className="flex items-center">
            <div className={`p-2 rounded-full bg-${projectStatus.color}-200 dark:bg-${projectStatus.color}-800 text-${projectStatus.color}-700 dark:text-${projectStatus.color}-300 mr-3`}>
              <projectStatus.icon size={16} />
            </div>
            <div>
              <h4 className={`text-${projectStatus.color}-800 dark:text-${projectStatus.color}-300 font-medium`}>
                {projectStatus.label}
              </h4>
              <p className={`text-${projectStatus.color}-700 dark:text-${projectStatus.color}-400 text-sm`}>
                {projectStatus.description}
              </p>
            </div>
          </div>
        </div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <div className="flex items-center mb-1">
              <FaCalendarAlt className="text-blue-500 mr-2" size={14} />
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Deadline</span>
            </div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {formatDate(project?.deadline)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {daysRemaining > 0 
                ? `${daysRemaining} days remaining` 
                : daysRemaining === 0 
                  ? "Due today" 
                  : `Overdue by ${Math.abs(daysRemaining)} days`}
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <div className="flex items-center mb-1">
              <FaFileAlt className="text-blue-500 mr-2" size={14} />
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Milestones</span>
            </div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {project?.milestones?.filter(m => m.status === 'completed').length || 0}/{project?.milestones?.length || 0}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {project?.milestones?.filter(m => m.status === 'in_progress' || m.status === 'in-progress').length || 0} in progress
            </p>
          </div>
        </div>
        
        {/* Milestone Timeline */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">Milestone Timeline</h4>
            <button 
              onClick={() => setShowHistory(!showHistory)}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center"
            >
              <FaHistory className="mr-1" size={12} />
              {showHistory ? 'Hide History' : 'Show History'}
            </button>
          </div>
          
          <div className="space-y-4">
            {project?.milestones
              ?.filter(milestone => showHistory || milestone.status !== 'completed')
              .map((milestone, index) => (
                <div key={milestone.id || index} className="relative pl-6">
                  {/* Status Dot */}
                  <div className={`absolute left-0 top-1.5 w-4 h-4 rounded-full ${getStatusColor(milestone.status)}`}></div>
                  
                  {/* Milestone Content */}
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <div className="flex justify-between items-start">
                      <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                        {milestone.title}
                      </h5>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        milestone.status === 'completed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                          : milestone.status === 'in_progress' || milestone.status === 'in-progress'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                      }`}>
                        {milestone.status === 'in_progress' || milestone.status === 'in-progress' 
                          ? 'In Progress' 
                          : milestone.status.charAt(0).toUpperCase() + milestone.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {milestone.description}
                    </p>
                    <div className="flex justify-between items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>Due: {formatDate(milestone.due_date)}</span>
                      {milestone.amount && (
                        <span>DT {milestone.amount}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectProgressTracker;
