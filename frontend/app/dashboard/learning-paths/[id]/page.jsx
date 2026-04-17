'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  FaRoute,
  FaArrowLeft,
  FaGraduationCap,
  FaBook,
  FaStar,
  FaClock,
  FaUsers,
  FaCheck,
  FaLock,
  FaUnlock,
  FaPlay,
  FaRocket,
  FaCalendarAlt,
  FaUserFriends,
  FaChartLine,
  FaExclamationTriangle
} from 'react-icons/fa';
import Navbar from '../../../../components/Navbar';

const LearningPathDetailsPage = ({ params }) => {
  const router = useRouter();
  const pathname = usePathname();
  const pathId = pathname.split('/')[3];
  const [learningPath, setLearningPath] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for demonstration
  const mockLearningPath = {
    id: 1,
    title: "Web Development Mastery",
    description: "A comprehensive path to become a full-stack web developer. This learning path covers everything from the basics of HTML and CSS to advanced topics like React, Node.js, and database integration. By the end of this path, you'll have the skills to build complete web applications from scratch.",
    category: "Web Development",
    level: "Beginner to Advanced",
    duration: "6 months",
    courses: [
      {
        id: 1,
        title: "HTML & CSS Fundamentals",
        description: "Learn the building blocks of the web",
        duration: "4 weeks",
        completed: true,
        locked: false,
        progress: 100,
        image: "/photos/Academy/html-css.jpg"
      },
      {
        id: 2,
        title: "JavaScript Essentials",
        description: "Master the language of the web",
        duration: "6 weeks",
        completed: true,
        locked: false,
        progress: 100,
        image: "/photos/Academy/javascript.jpg"
      },
      {
        id: 3,
        title: "React Framework",
        description: "Build interactive user interfaces",
        duration: "8 weeks",
        completed: false,
        locked: false,
        progress: 45,
        image: "/photos/Academy/react.jpg"
      },
      {
        id: 4,
        title: "Node.js & Express",
        description: "Create server-side applications",
        duration: "6 weeks",
        completed: false,
        locked: true,
        progress: 0,
        image: "/photos/Academy/nodejs.jpg"
      },
      {
        id: 5,
        title: "Database Integration",
        description: "Work with MongoDB and SQL databases",
        duration: "4 weeks",
        completed: false,
        locked: true,
        progress: 0,
        image: "/photos/Academy/database.jpg"
      },
      {
        id: 6,
        title: "Deployment & DevOps",
        description: "Deploy and manage your applications",
        duration: "4 weeks",
        completed: false,
        locked: true,
        progress: 0,
        image: "/photos/Academy/devops.jpg"
      }
    ],
    progress: 33,
    enrolledStudents: 1245,
    rating: 4.8,
    status: "in-progress",
    image: "/photos/Academy/web-dev.jpg",
    prerequisites: [
      "Basic computer skills",
      "Understanding of how the internet works",
      "Problem-solving mindset"
    ],
    outcomes: [
      "Build responsive websites with HTML, CSS, and JavaScript",
      "Create interactive single-page applications with React",
      "Develop RESTful APIs with Node.js and Express",
      "Work with databases like MongoDB and MySQL",
      "Deploy applications to cloud platforms"
    ],
    instructors: [
      {
        id: 101,
        name: "Ahmed Hassan",
        title: "Senior Web Developer",
        avatar: "/photos/users/instructor1.jpg"
      },
      {
        id: 102,
        name: "Sarah Johnson",
        title: "Frontend Specialist",
        avatar: "/photos/users/instructor2.jpg"
      }
    ],
    nextMilestone: {
      title: "Complete React Framework Course",
      description: "Finish the remaining modules to master React",
      deadline: "2023-12-15"
    },
    studyGroups: [
      {
        id: 201,
        name: "React Study Group",
        members: 15,
        nextMeeting: "2023-11-28T18:00:00"
      },
      {
        id: 202,
        name: "JavaScript Coding Club",
        members: 23,
        nextMeeting: "2023-11-30T19:00:00"
      }
    ]
  };

  useEffect(() => {
    // Simulate API call to fetch learning path data
    setTimeout(() => {
      setLearningPath(mockLearningPath);
      setIsLoading(false);
    }, 1000);
  }, [pathId]);

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

  if (!learningPath) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-4">
              <FaExclamationTriangle className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Learning Path Not Found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The learning path you are looking for does not exist or you don't have access to it.
            </p>
            <Link
              href="/dashboard/learning-paths"
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back to Learning Paths
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
        {/* Back Button */}
        <Link
          href="/dashboard/learning-paths"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back to Learning Paths
        </Link>

        {/* Learning Path Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="relative h-64 md:h-80">
            <img
              src={learningPath.image || "/photos/Academy/default-path.jpg"}
              alt={learningPath.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/photos/Academy/default-path.jpg";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 text-white">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2 py-1 text-xs bg-blue-500/80 rounded-full">
                    {learningPath.category}
                  </span>
                  <span className="px-2 py-1 text-xs bg-purple-500/80 rounded-full">
                    {learningPath.level}
                  </span>
                  <span className="px-2 py-1 text-xs bg-gray-500/80 rounded-full flex items-center">
                    <FaClock className="mr-1" /> {learningPath.duration}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{learningPath.title}</h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span>{learningPath.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <FaUsers className="mr-1" />
                    <span>{learningPath.enrolledStudents.toLocaleString()} students</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Your Progress</h3>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{learningPath.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
            <div
              className="bg-blue-600 h-4 rounded-full"
              style={{ width: `${learningPath.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Next Milestone */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-900/50 mb-6">
          <div className="flex items-start">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-400 mr-4">
              <FaRocket />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Next Milestone</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-1">{learningPath.nextMilestone.title}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{learningPath.nextMilestone.description}</p>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <FaCalendarAlt className="mr-1" />
                <span>Target completion: {new Date(learningPath.nextMilestone.deadline).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
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
                onClick={() => setActiveTab('courses')}
                className={`px-4 py-4 text-sm font-medium ${
                  activeTab === 'courses'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Courses
              </button>
              <button
                onClick={() => setActiveTab('instructors')}
                className={`px-4 py-4 text-sm font-medium ${
                  activeTab === 'instructors'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Instructors
              </button>
              <button
                onClick={() => setActiveTab('groups')}
                className={`px-4 py-4 text-sm font-medium ${
                  activeTab === 'groups'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Study Groups
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">About This Learning Path</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">{learningPath.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Prerequisites</h3>
                    <ul className="space-y-2">
                      {learningPath.prerequisites.map((prerequisite, index) => (
                        <li key={index} className="flex items-start">
                          <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{prerequisite}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">What You'll Learn</h3>
                    <ul className="space-y-2">
                      {learningPath.outcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start">
                          <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Path Structure</h3>
                  <div className="space-y-3">
                    {learningPath.courses.map((course, index) => (
                      <div key={course.id} className="flex items-center">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                          {index + 1}
                        </div>
                        <div className="flex-grow">
                          <p className="text-gray-900 dark:text-white font-medium">{course.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{course.duration}</p>
                        </div>
                        <div>
                          {course.completed ? (
                            <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full">
                              Completed
                            </span>
                          ) : course.locked ? (
                            <FaLock className="text-gray-400" />
                          ) : (
                            <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full">
                              In Progress
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Courses Tab */}
            {activeTab === 'courses' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Courses in This Path</h2>
                <div className="space-y-4">
                  {learningPath.courses.map((course) => (
                    <div key={course.id} className={`bg-white dark:bg-gray-800 border ${course.locked ? 'border-gray-200 dark:border-gray-700' : 'border-blue-200 dark:border-blue-800'} rounded-lg shadow-sm overflow-hidden`}>
                      <div className="md:flex">
                        <div className="md:flex-shrink-0 h-48 md:h-auto md:w-48">
                          <img
                            className="h-full w-full object-cover"
                            src={course.image || "/photos/Academy/default-course.jpg"}
                            alt={course.title}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/photos/Academy/default-course.jpg";
                            }}
                          />
                        </div>
                        <div className="p-4 flex-grow">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{course.title}</h3>
                              <p className="text-gray-600 dark:text-gray-400 mb-2">{course.description}</p>
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                                <FaClock className="mr-1" /> {course.duration}
                              </div>
                            </div>
                            <div>
                              {course.completed ? (
                                <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                                  <FaCheck />
                                </div>
                              ) : course.locked ? (
                                <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                                  <FaLock />
                                </div>
                              ) : (
                                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                  <FaPlay />
                                </div>
                              )}
                            </div>
                          </div>

                          {!course.locked && (
                            <div className="mt-2">
                              <div className="flex justify-between mb-1">
                                <span className="text-xs text-gray-600 dark:text-gray-400">Progress</span>
                                <span className="text-xs font-medium text-gray-900 dark:text-white">{course.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    course.progress === 100
                                      ? 'bg-green-500'
                                      : course.progress > 0
                                        ? 'bg-blue-500'
                                        : 'bg-gray-300 dark:bg-gray-600'
                                  }`}
                                  style={{ width: `${course.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}

                          <div className="mt-4">
                            {course.locked ? (
                              <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md cursor-not-allowed">
                                <FaLock className="inline mr-2" /> Locked
                              </button>
                            ) : course.completed ? (
                              <Link
                                href={`/dashboard/courses/${course.id}`}
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md shadow-sm transition-colors"
                              >
                                <FaCheck className="inline mr-2" /> Review Course
                              </Link>
                            ) : (
                              <Link
                                href={`/dashboard/courses/${course.id}`}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-colors"
                              >
                                {course.progress > 0 ? (
                                  <><FaPlay className="inline mr-2" /> Continue Course</>
                                ) : (
                                  <><FaPlay className="inline mr-2" /> Start Course</>
                                )}
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Instructors Tab */}
            {activeTab === 'instructors' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Meet Your Instructors</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {learningPath.instructors.map((instructor) => (
                    <div key={instructor.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-16 w-16 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                          <img
                            src={instructor.avatar}
                            alt={instructor.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/fighterfish.png";
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{instructor.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{instructor.title}</p>
                          <button className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline">
                            View Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Study Groups Tab */}
            {activeTab === 'groups' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Study Groups</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Join a study group to collaborate with other students, discuss course materials, and work on projects together.
                </p>

                <div className="space-y-4">
                  {learningPath.studyGroups.map((group) => (
                    <div key={group.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">{group.name}</h3>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                            <FaUserFriends className="mr-1" /> {group.members} members
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <FaCalendarAlt className="mr-1" /> Next meeting: {new Date(group.nextMeeting).toLocaleString()}
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-colors">
                          Join Group
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="mt-4 text-center">
                    <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors">
                      Create New Study Group
                    </button>
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

export default LearningPathDetailsPage;
