'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import {
  FaBook,
  FaUsers,
  FaStar,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaFilter,
  FaChalkboardTeacher,
  FaPlayCircle,
  FaGraduationCap,
  FaChartLine,
  FaEye,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaUserGraduate,
  FaCalendarAlt,
  FaChartBar,
  FaArrowUp,
  FaTrophy,
  FaUserPlus,
  FaRegClock
} from 'react-icons/fa';
import Link from 'next/link';
import { useUser } from '../../../context/UserContext';
import EditCourseModal from '../../../components/modals/EditCourseModal';

const MyCourses = () => {
  const router = useRouter();
  const { userData: user, loading: userLoading } = useUser();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, draft
  const [sortBy, setSortBy] = useState('popularity'); // popularity, newest, rating, students
  const [showPopularCourses, setShowPopularCourses] = useState(true);
  const [showRecentStudents, setShowRecentStudents] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Stats for dashboard
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalViews: 0,
    completionRate: 0,
    totalRevenue: 0,
    activeCourses: 0,
    draftCourses: 0,
    studentsThisMonth: 0,
    studentsLastMonth: 0,
    revenueThisMonth: 0,
    revenueLastMonth: 0
  });

  // Recent students
  const [recentStudents, setRecentStudents] = useState([]);

  // Mock data for demonstration
  const mockCourses = [
    {
      id: 1,
      title: "Full-Stack Web Development",
      description: "Master modern web development with React, Node.js, and MongoDB",
      thumbnail: "/photos/Academy/full.png",
      students: 124,
      rating: 4.8,
      progress: 100,
      status: "active",
      lastUpdated: "2023-10-15",
      price: 199.99,
      views: 2450,
      completionRate: 68,
      revenue: 12400
    },
    {
      id: 2,
      title: "UI/UX Design Masterclass",
      description: "Learn to create beautiful, user-friendly interfaces that convert",
      thumbnail: "/photos/Academy/react.jpeg",
      students: 87,
      rating: 4.9,
      progress: 100,
      status: "active",
      lastUpdated: "2023-11-02",
      price: 149.99,
      views: 1850,
      completionRate: 72,
      revenue: 8700
    },
    {
      id: 3,
      title: "Python for Data Science",
      description: "Learn how to analyze and visualize data using Python",
      thumbnail: "/photos/Academy/figma.png",
      students: 56,
      rating: 4.7,
      progress: 80,
      status: "draft",
      lastUpdated: "2023-11-20",
      price: 129.99,
      views: 0,
      completionRate: 0,
      revenue: 0
    }
  ];

  // Mock data for recent students
  const mockRecentStudents = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/photos/users/user1.jpg",
      course: "Full-Stack Web Development",
      enrollDate: "2023-11-25",
      progress: 15
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "/photos/users/user2.jpg",
      course: "UI/UX Design Masterclass",
      enrollDate: "2023-11-23",
      progress: 22
    },
    {
      id: 3,
      name: "Jessica Williams",
      avatar: "/photos/users/user3.jpg",
      course: "Full-Stack Web Development",
      enrollDate: "2023-11-20",
      progress: 8
    },
    {
      id: 4,
      name: "David Rodriguez",
      avatar: "/photos/users/user4.jpg",
      course: "Python for Data Science",
      enrollDate: "2023-11-18",
      progress: 5
    },
    {
      id: 5,
      name: "Emma Thompson",
      avatar: "/photos/users/user5.jpg",
      course: "UI/UX Design Masterclass",
      enrollDate: "2023-11-15",
      progress: 30
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCourses(mockCourses);
      setRecentStudents(mockRecentStudents);

      // Calculate stats
      const active = mockCourses.filter(c => c.status === "active");
      const drafts = mockCourses.filter(c => c.status === "draft");

      // Sort courses by popularity (views)
      const sortedCourses = [...mockCourses].sort((a, b) => b.views - a.views);

      setStats({
        totalCourses: mockCourses.length,
        totalStudents: mockCourses.reduce((sum, course) => sum + course.students, 0),
        totalViews: mockCourses.reduce((sum, course) => sum + course.views, 0),
        completionRate: active.length > 0
          ? Math.round(active.reduce((sum, course) => sum + course.completionRate, 0) / active.length)
          : 0,
        totalRevenue: mockCourses.reduce((sum, course) => sum + course.revenue, 0),
        activeCourses: active.length,
        draftCourses: drafts.length,
        studentsThisMonth: 42,
        studentsLastMonth: 35,
        revenueThisMonth: 4850,
        revenueLastMonth: 3920,
        popularCourses: sortedCourses.slice(0, 2)
      });

      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter, sort and search courses
  const filteredAndSortedCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || course.status === filter;

    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'popularity':
        return b.views - a.views;
      case 'newest':
        return new Date(b.lastUpdated) - new Date(a.lastUpdated);
      case 'rating':
        return b.rating - a.rating;
      case 'students':
        return b.students - a.students;
      default:
        return b.views - a.views;
    }
  });

  // Get growth percentages for stats
  const getGrowthPercentage = (current, previous) => {
    if (previous === 0) return 100;
    return Math.round(((current - previous) / previous) * 100);
  };

  const studentGrowth = getGrowthPercentage(stats.studentsThisMonth, stats.studentsLastMonth);
  const revenueGrowth = getGrowthPercentage(stats.revenueThisMonth, stats.revenueLastMonth);

  // Edit course modal functions
  const handleOpenEditModal = (course) => {
    setSelectedCourse(course);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedCourse(null);
  };

  const handleUpdateCourse = (updatedCourse) => {
    setCourses(courses.map(course =>
      course.id === updatedCourse.id ? updatedCourse : course
    ));
    // In a real app, you would also update the course in the database
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <FaChalkboardTeacher className="mr-3 text-blue-600 dark:text-blue-400" />
                My Courses
              </h1>
              <p className="mt-1 text-gray-600 dark:text-gray-400">Manage your educational content</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                href="/dashboard/add-course"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-colors"
              >
                <FaPlus className="mr-2" />
                Create New Course
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <FaBook className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Courses</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">{stats.totalCourses}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {stats.activeCourses} active · {stats.draftCourses} drafts
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <FaUsers className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Students</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">{stats.totalStudents}</div>
                      <div className="flex items-center text-xs text-green-500">
                        <FaArrowUp className="mr-1" />
                        {studentGrowth}% this month
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                  <FaEye className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Views</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">{stats.totalViews.toLocaleString()}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Across all courses
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <FaGraduationCap className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Revenue</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">${stats.totalRevenue.toLocaleString()}</div>
                      <div className="flex items-center text-xs text-green-500">
                        <FaArrowUp className="mr-1" />
                        {revenueGrowth}% this month
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Stats & Popular Courses */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Chart - Growth Visualization */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                <FaChartBar className="mr-2 text-blue-500" />
                Performance Overview
              </h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">Last 30 days</div>
            </div>

            {/* Simple Chart Visualization */}
            <div className="h-64 flex items-end justify-around space-x-2">
              <div className="flex flex-col items-center">
                <div className="bg-blue-500 w-12 rounded-t-md" style={{ height: `${stats.completionRate}%` }}></div>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">Completion</div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{stats.completionRate}%</div>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-green-500 w-12 rounded-t-md" style={{ height: `${Math.min(studentGrowth, 100)}%` }}></div>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">Students</div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">+{studentGrowth}%</div>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-purple-500 w-12 rounded-t-md" style={{ height: `${Math.min(stats.totalViews / 100, 100)}%` }}></div>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">Views</div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{stats.totalViews.toLocaleString()}</div>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-yellow-500 w-12 rounded-t-md" style={{ height: `${Math.min(revenueGrowth, 100)}%` }}></div>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">Revenue</div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">+{revenueGrowth}%</div>
              </div>
            </div>
          </div>

          {/* Recent Students */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                <FaUserPlus className="mr-2 text-green-500" />
                Recent Students
              </h3>
              <Link href="/dashboard/students" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                View all
              </Link>
            </div>

            <div className="space-y-4">
              {recentStudents.slice(0, 4).map(student => (
                <div key={student.id} className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/fighterfish.png"; // Fallback image
                      }}
                    />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{student.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Enrolled in {student.course}</p>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <FaRegClock className="mr-1" />
                    {student.enrollDate}
                  </div>
                </div>
              ))}
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
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Status Filter */}
              <div className="flex items-center">
                <div className="flex items-center mr-2">
                  <FaFilter className="mr-2 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Status:</span>
                </div>
                <select
                  className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Courses</option>
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              {/* Sort By */}
              <div className="flex items-center">
                <div className="flex items-center mr-2">
                  <FaSort className="mr-2 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Sort by:</span>
                </div>
                <select
                  className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="popularity">Popularity</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Rating</option>
                  <option value="students">Students</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Courses Section */}
        {!isLoading && showPopularCourses && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                <FaTrophy className="mr-2 text-yellow-500" />
                Top Performing Courses
              </h3>
              <button
                onClick={() => setShowPopularCourses(false)}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Hide section
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses
                .filter(course => course.status === 'active')
                .sort((a, b) => b.views - a.views)
                .slice(0, 2)
                .map(course => (
                  <div key={`popular-${course.id}`} className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-blue-100 dark:border-blue-900/30">
                    <div className="flex h-full">
                      <div className="w-1/3 relative">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 left-0 bg-yellow-500 text-white text-xs px-2 py-1 rounded-br-md">
                          Top {course.id}
                        </div>
                      </div>
                      <div className="w-2/3 p-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{course.title}</h3>
                        <div className="flex items-center mb-2 text-sm">
                          <div className="flex items-center mr-3">
                            <FaUsers className="mr-1 text-blue-600" />
                            <span className="text-gray-700 dark:text-gray-300">{course.students}</span>
                          </div>
                          <div className="flex items-center mr-3">
                            <FaStar className="mr-1 text-yellow-500" />
                            <span className="text-gray-700 dark:text-gray-300">{course.rating}</span>
                          </div>
                          <div className="flex items-center">
                            <FaEye className="mr-1 text-purple-600" />
                            <span className="text-gray-700 dark:text-gray-300">{course.views.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">
                          ${course.price}
                        </div>
                        <Link
                          href={`/dashboard/edit-course/${course.id}`}
                          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Manage course →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Courses List */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredAndSortedCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedCourses.map(course => (
              <div key={course.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      course.status === 'active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                    }`}>
                      {course.status === 'active' ? 'Active' : 'Draft'}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{course.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{course.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center mr-3">
                        <FaUsers className="mr-1" />
                        {course.students} students
                      </div>
                      <div className="flex items-center mr-3">
                        <FaStar className="mr-1 text-yellow-500" />
                        {course.rating}
                      </div>
                      {course.status === 'active' && (
                        <div className="flex items-center">
                          <FaEye className="mr-1" />
                          {course.views.toLocaleString()}
                        </div>
                      )}
                    </div>
                    <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      ${course.price}
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Updated: {course.lastUpdated}
                    </div>
                    {course.status === 'active' && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Completion rate: {course.completionRate}%
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <Link
                      href={`/dashboard/course-details/${course.id}`}
                      className="inline-flex items-center px-3 py-1.5 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-md hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                    >
                      <FaChartLine className="mr-1" />
                      Details
                    </Link>
                    <button
                      onClick={() => handleOpenEditModal(course)}
                      className="inline-flex items-center px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                    >
                      <FaEdit className="mr-1" />
                      Edit
                    </button>
                    <Link
                      href={`/courses/${course.id}`}
                      target="_blank"
                      className="inline-flex items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <FaEye className="mr-1" />
                      Preview
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
              <FaBook className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No courses found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {searchTerm || filter !== 'all'
                ? "Try adjusting your search or filter criteria"
                : "You haven't created any courses yet"}
            </p>
            <Link
              href="/dashboard/add-course"
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-colors"
            >
              <FaPlus className="mr-2" />
              Create Your First Course
            </Link>
          </div>
        )}
      </div>

      {/* Edit Course Modal */}
      <EditCourseModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        course={selectedCourse}
        onSave={handleUpdateCourse}
      />
    </div>
  );
};

export default MyCourses;
