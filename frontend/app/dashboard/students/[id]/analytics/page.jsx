'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  FaChartLine,
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaBook,
  FaArrowLeft,
  FaGraduationCap,
  FaTrophy,
  FaExclamationTriangle,
  FaChartBar,
  FaChartPie,
  FaChartArea
} from 'react-icons/fa';
import Navbar from '../../../../../components/Navbar';

const StudentAnalyticsPage = ({ params }) => {
  const router = useRouter();
  const resolvedParams = use(params);
  const studentId = resolvedParams.id;
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock student data
  const mockStudent = {
    id: 1,
    name: "Sarah Williams",
    email: "sarah@example.com",
    avatar: "/photos/Academy/student2.jpeg",
    course: "Full-Stack Web Development",
    courseId: 1,
    progress: 75,
    joinDate: "2023-09-15",
    lastActive: "2023-11-22",
    status: "active",
    completedLessons: 18,
    totalLessons: 24,
    totalWatchTime: 1245, // in minutes
    averageQuizScore: 85,
    strengths: ["JavaScript", "React", "HTML/CSS"],
    weaknesses: ["Node.js", "Database Design"],
    activityData: [
      { date: '2023-11-16', minutes: 45 },
      { date: '2023-11-17', minutes: 60 },
      { date: '2023-11-18', minutes: 30 },
      { date: '2023-11-19', minutes: 0 },
      { date: '2023-11-20', minutes: 75 },
      { date: '2023-11-21', minutes: 90 },
      { date: '2023-11-22', minutes: 60 }
    ],
    quizScores: [
      { quiz: "JavaScript Basics", score: 90 },
      { quiz: "React Fundamentals", score: 85 },
      { quiz: "HTML & CSS", score: 95 },
      { quiz: "Node.js Basics", score: 70 },
      { quiz: "Database Design", score: 65 }
    ],
    moduleProgress: [
      { module: "Web Fundamentals", progress: 100 },
      { module: "JavaScript Essentials", progress: 100 },
      { module: "React Framework", progress: 80 },
      { module: "Backend Development", progress: 60 },
      { module: "Database Integration", progress: 40 },
      { module: "Deployment & DevOps", progress: 0 }
    ]
  };

  useEffect(() => {
    // Simulate API call to fetch student data
    setTimeout(() => {
      setStudent(mockStudent);
      setIsLoading(false);
    }, 1000);
  }, [studentId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-4">
              <FaExclamationTriangle className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Student Not Found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The student you are looking for does not exist or you don't have permission to view their analytics.
            </p>
            <Link
              href="/dashboard/students"
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back to Students
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header with Back Button */}
        <div className="mb-6">
          <Link
            href="/dashboard/students"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-4"
          >
            <FaArrowLeft className="mr-2" />
            Back to Students
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-16 w-16">
                <img
                  className="h-16 w-16 rounded-full object-cover border-2 border-blue-500"
                  src={student.avatar}
                  alt={student.name}
                />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                  {student.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 flex items-center">
                  <FaBook className="mr-2" />
                  {student.course}
                </p>
              </div>
            </div>

            <div className="mt-4 md:mt-0 flex items-center">
              <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                student.status === 'active'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
              }`}>
                {student.status}
              </span>
              <button className="ml-4 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-colors">
                <FaUser className="mr-2" />
                View Profile
              </button>
            </div>
          </div>
        </div>

        {/* Analytics Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-4 text-sm font-medium ${
                  activeTab === 'overview'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('progress')}
                className={`px-4 py-4 text-sm font-medium ${
                  activeTab === 'progress'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Course Progress
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`px-4 py-4 text-sm font-medium ${
                  activeTab === 'activity'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Activity
              </button>
              <button
                onClick={() => setActiveTab('performance')}
                className={`px-4 py-4 text-sm font-medium ${
                  activeTab === 'performance'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Performance
              </button>
              <button
                onClick={() => setActiveTab('recommendations')}
                className={`px-4 py-4 text-sm font-medium ${
                  activeTab === 'recommendations'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Recommendations
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Student Overview</h2>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-900/50">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-400 mr-4">
                        <FaBook />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Completed Lessons</p>
                        <p className="text-xl font-semibold text-gray-900 dark:text-white">{student.completedLessons}/{student.totalLessons}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-100 dark:border-green-900/50">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-400 mr-4">
                        <FaCheckCircle />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Overall Progress</p>
                        <p className="text-xl font-semibold text-gray-900 dark:text-white">{student.progress}%</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-100 dark:border-purple-900/50">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-purple-400 mr-4">
                        <FaClock />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Watch Time</p>
                        <p className="text-xl font-semibold text-gray-900 dark:text-white">{Math.floor(student.totalWatchTime / 60)}h {student.totalWatchTime % 60}m</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-100 dark:border-yellow-900/50">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-800 text-yellow-600 dark:text-yellow-400 mr-4">
                        <FaTrophy />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Quiz Score</p>
                        <p className="text-xl font-semibold text-gray-900 dark:text-white">{student.averageQuizScore}%</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Strengths and Weaknesses */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                      <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mr-2">
                        <FaChartLine />
                      </div>
                      Strengths
                    </h3>
                    <ul className="space-y-2">
                      {student.strengths.map((strength, index) => (
                        <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                          <FaCheckCircle className="text-green-500 mr-2" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                      <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mr-2">
                        <FaExclamationTriangle />
                      </div>
                      Areas for Improvement
                    </h3>
                    <ul className="space-y-2">
                      {student.weaknesses.map((weakness, index) => (
                        <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                          <FaExclamationTriangle className="text-red-500 mr-2" />
                          {weakness}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Course Progress Tab */}
            {activeTab === 'progress' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Course Progress</h2>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Overall Progress</h3>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{student.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                    <div
                      className="bg-blue-600 h-4 rounded-full"
                      style={{ width: `${student.progress}%` }}
                    ></div>
                  </div>
                </div>

                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Module Progress</h3>
                <div className="space-y-4">
                  {student.moduleProgress.map((module, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-md font-medium text-gray-900 dark:text-white">{module.module}</h4>
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{module.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${
                            module.progress === 100
                              ? 'bg-green-500'
                              : module.progress > 0
                                ? 'bg-blue-500'
                                : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                          style={{ width: `${module.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Activity History</h2>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700 mb-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Daily Activity (Last 7 Days)</h3>
                  <div className="h-64 flex items-end space-x-2">
                    {student.activityData.map((day, index) => (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div
                          className="w-full bg-blue-500 rounded-t-md"
                          style={{
                            height: `${day.minutes ? (day.minutes / 90) * 100 : 0}%`,
                            backgroundColor: day.minutes === 0 ? '#e5e7eb' : undefined
                          }}
                        ></div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 w-full text-center">
                          {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                        <div className="text-xs font-medium text-gray-700 dark:text-gray-300 w-full text-center">
                          {day.minutes}m
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <FaBook />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Completed Lesson: React Components</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Today at 10:30 AM</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                        <FaCheckCircle />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Completed Quiz: React Fundamentals</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Yesterday at 3:45 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                        <FaComment />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Posted in Discussion: "How to handle state in React?"</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">2 days ago at 5:20 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Performance Tab */}
            {activeTab === 'performance' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Performance Analysis</h2>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700 mb-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quiz Performance</h3>
                  <div className="space-y-4">
                    {student.quizScores.map((quiz, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-md font-medium text-gray-900 dark:text-white">{quiz.quiz}</h4>
                          <span className={`text-sm font-semibold ${
                            quiz.score >= 80
                              ? 'text-green-600 dark:text-green-400'
                              : quiz.score >= 70
                                ? 'text-yellow-600 dark:text-yellow-400'
                                : 'text-red-600 dark:text-red-400'
                          }`}>
                            {quiz.score}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full ${
                              quiz.score >= 80
                                ? 'bg-green-500'
                                : quiz.score >= 70
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                            }`}
                            style={{ width: `${quiz.score}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Engagement Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">85%</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Video Completion Rate</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">12</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Discussion Posts</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">4.2</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Days Active per Week</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Recommendations Tab */}
            {activeTab === 'recommendations' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Personalized Recommendations</h2>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700 mb-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Focus Areas</h3>
                  <div className="space-y-4">
                    {student.weaknesses.map((weakness, index) => (
                      <div key={index} className="bg-red-50 dark:bg-red-900/10 rounded-lg p-4 border border-red-100 dark:border-red-900/30">
                        <h4 className="text-md font-medium text-gray-900 dark:text-white flex items-center">
                          <FaExclamationTriangle className="text-red-500 mr-2" />
                          {weakness}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                          We recommend focusing on improving your {weakness.toLowerCase()} skills. Check out the following resources:
                        </p>
                        <ul className="mt-2 space-y-1 text-sm text-blue-600 dark:text-blue-400">
                          <li className="hover:underline cursor-pointer">• Supplementary lesson: {weakness} Fundamentals</li>
                          <li className="hover:underline cursor-pointer">• Practice exercises: {weakness} Challenges</li>
                          <li className="hover:underline cursor-pointer">• Join study group: {weakness} Mastery</li>
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700 mb-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recommended Next Steps</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <FaBook />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Complete "Node.js Basics" module</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">This will help strengthen your backend development skills</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                        <FaUsers />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Join the "Database Design" study group</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Collaborate with peers to improve your database skills</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                        <FaCalendarAlt />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Attend the upcoming "Node.js Q&A" live session</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Thursday, Nov 25 at 3:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recommended Additional Resources</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                      <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">Node.js Crash Course</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">A comprehensive guide to Node.js fundamentals</p>
                      <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">View Resource →</button>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                      <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">Database Design Principles</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Learn best practices for designing efficient databases</p>
                      <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">View Resource →</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAnalyticsPage;
