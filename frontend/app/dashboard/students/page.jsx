'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import {
  FaUsers,
  FaSearch,
  FaFilter,
  FaGraduationCap,
  FaBook,
  FaEnvelope,
  FaChartLine,
  FaEllipsisH,
  FaRoute,
  FaUserGraduate,
  FaComments,
  FaUserFriends,
  FaCalendarAlt,
  FaLaptop,
  FaRocket,
  FaTrophy,
  FaChartBar,
  FaChartPie,
  FaChartArea,
  FaArrowRight,
  FaClock,
  FaStar
} from 'react-icons/fa';
import Link from 'next/link';

const StudentsPage = () => {
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, inactive
  const [courseFilter, setCourseFilter] = useState('all');

  // Mock data for demonstration
  const mockStudents = [
    {
      id: 1,
      name: "Sarah Williams",
      email: "sarah@example.com",
      avatar: "/photos/Academy/student2.jpeg",
      course: "Full-Stack Web Development",
      courseId: 1,
      progress: 75,
      joinDate: "2023-09-15",
      lastActive: "2023-11-22",
      status: "active"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael@example.com",
      avatar: "/photos/Academy/student3.png",
      course: "UI/UX Design Masterclass",
      courseId: 2,
      progress: 92,
      joinDate: "2023-10-05",
      lastActive: "2023-11-21",
      status: "active"
    },
    {
      id: 3,
      name: "John Anderson",
      email: "john@example.com",
      avatar: "/photos/Academy/student1.jpg",
      course: "Full-Stack Web Development",
      courseId: 1,
      progress: 45,
      joinDate: "2023-10-20",
      lastActive: "2023-11-10",
      status: "inactive"
    },
    {
      id: 4,
      name: "Emily Johnson",
      email: "emily@example.com",
      avatar: "/photos/Academy/student2.jpeg",
      course: "Python for Data Science",
      courseId: 3,
      progress: 60,
      joinDate: "2023-11-01",
      lastActive: "2023-11-20",
      status: "active"
    }
  ];

  // Mock courses for filtering
  const mockCourses = [
    { id: 1, title: "Full-Stack Web Development" },
    { id: 2, title: "UI/UX Design Masterclass" },
    { id: 3, title: "Python for Data Science" }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStudents(mockStudents);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter and search students
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatusFilter = filter === 'all' || student.status === filter;
    const matchesCourseFilter = courseFilter === 'all' || student.courseId.toString() === courseFilter;

    return matchesSearch && matchesStatusFilter && matchesCourseFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <FaUsers className="mr-3 text-blue-600 dark:text-blue-400" />
                My Students
              </h1>
              <p className="mt-1 text-gray-600 dark:text-gray-400">Manage and track your students' progress</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                href="/dashboard/my-courses"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-colors"
              >
                <FaBook className="mr-2" />
                View My Courses
              </Link>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
              >
                <option value="all">All Courses</option>
                {mockCourses.map(course => (
                  <option key={course.id} value={course.id.toString()}>{course.title}</option>
                ))}
              </select>
              <select
                className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Advanced Features Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Student Resources</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Analytics Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-4">
                    <FaChartLine className="text-xl" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Advanced Analytics</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Track your progress, view performance metrics, and get personalized insights to improve your learning.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full">
                    Performance Tracking
                  </span>
                  <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full">
                    Progress Reports
                  </span>
                  <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full">
                    Personalized Insights
                  </span>
                </div>
                <Link
                  href="/dashboard/students/1/analytics"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  View Your Analytics <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </div>

            {/* Learning Paths Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mr-4">
                    <FaRoute className="text-xl" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Learning Paths</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Follow structured learning paths tailored to your goals and skill level to master new skills efficiently.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full">
                    Personalized Paths
                  </span>
                  <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full">
                    Skill Development
                  </span>
                  <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full">
                    Guided Learning
                  </span>
                </div>
                <Link
                  href="/dashboard/learning-paths"
                  className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                >
                  Explore Learning Paths <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </div>

            {/* Community Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-4">
                    <FaUserFriends className="text-xl" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Community & Support</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Connect with instructors and fellow students, join study groups, and get help when you need it.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 rounded-full">
                    Study Groups
                  </span>
                  <span className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 rounded-full">
                    Direct Messaging
                  </span>
                  <span className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 rounded-full">
                    Instructor Support
                  </span>
                </div>
                <Link
                  href="/dashboard/messages"
                  className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
                >
                  Message Instructors <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 mb-8">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Upcoming Events</h3>
            <Link
              href="/dashboard/calendar"
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              View All
            </Link>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-4">
                  <FaLaptop />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-md font-medium text-gray-900 dark:text-white">React Hooks Q&A Session</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Live session with instructor Ahmed Hassan</p>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Tomorrow, 3:00 PM</span>
                  </div>
                  <div className="mt-2 flex items-center">
                    <FaCalendarAlt className="text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">Nov 25, 2023</span>
                    <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                    <FaClock className="text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">60 minutes</span>
                  </div>
                  <button className="mt-2 px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                    Add to Calendar
                  </button>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mr-4">
                  <FaUserFriends />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-md font-medium text-gray-900 dark:text-white">Database Design Study Group</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Weekly meeting with fellow students</p>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Friday, 5:00 PM</span>
                  </div>
                  <div className="mt-2 flex items-center">
                    <FaCalendarAlt className="text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">Nov 27, 2023</span>
                    <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                    <FaClock className="text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">90 minutes</span>
                  </div>
                  <button className="mt-2 px-3 py-1 text-xs bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors">
                    Join Group
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Students List */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">My Classmates</h2>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredStudents.length > 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Student
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Course
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Progress
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Last Active
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredStudents.map(student => (
                      <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={student.avatar}
                                alt={student.name}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {student.name}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {student.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{student.course}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Joined: {student.joinDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mb-1">
                            <div
                              className="bg-green-500 h-2.5 rounded-full"
                              style={{ width: `${student.progress}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 text-right">{student.progress}%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            student.status === 'active'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                          }`}>
                            {student.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {student.lastActive}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <Link
                              href="/dashboard/messages"
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                            >
                              <FaEnvelope />
                            </Link>
                            <Link
                              href={`/dashboard/students/${student.id}/analytics`}
                              className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                            >
                              <FaChartLine />
                            </Link>
                            <button className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300">
                              <FaEllipsisH />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
                <FaGraduationCap className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No students found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {searchTerm || filter !== 'all' || courseFilter !== 'all'
                  ? "Try adjusting your search or filter criteria"
                  : "You don't have any students enrolled in your courses yet"}
              </p>
            </div>
          )}
        </div>

        {/* Recommended Courses Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recommended Courses</h2>
            <Link
              href="/dashboard/recommended-courses"
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Course Card 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="h-40 overflow-hidden">
                <img
                  src="/photos/Academy/nodejs.jpg"
                  alt="Node.js Advanced Concepts"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Node.js Advanced Concepts</h3>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">4.8</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Master advanced Node.js concepts including performance optimization, scaling, and security.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 dark:text-blue-400 font-medium">Intermediate</span>
                  <Link
                    href="/dashboard/courses/5"
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors"
                  >
                    View Course
                  </Link>
                </div>
              </div>
            </div>

            {/* Course Card 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="h-40 overflow-hidden">
                <img
                  src="/photos/Academy/database.jpg"
                  alt="Database Design Masterclass"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Database Design Masterclass</h3>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">4.7</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Learn how to design efficient, scalable databases for web applications.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 dark:text-blue-400 font-medium">Intermediate</span>
                  <Link
                    href="/dashboard/courses/6"
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors"
                  >
                    View Course
                  </Link>
                </div>
              </div>
            </div>

            {/* Course Card 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="h-40 overflow-hidden">
                <img
                  src="/photos/Academy/react.jpg"
                  alt="React Performance Optimization"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">React Performance Optimization</h3>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">4.9</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Advanced techniques to optimize React applications for maximum performance.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 dark:text-blue-400 font-medium">Advanced</span>
                  <Link
                    href="/dashboard/courses/7"
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors"
                  >
                    View Course
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsPage;
