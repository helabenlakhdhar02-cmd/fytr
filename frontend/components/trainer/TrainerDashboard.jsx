'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaBook,
  FaUsers,
  FaStar,
  FaPlus,
  FaSearch,
  FaChartLine,
  FaCalendarAlt,
  FaGraduationCap
} from 'react-icons/fa';
import Link from 'next/link';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title } from 'chart.js';
import { Pie, Line, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title
);

const TrainerDashboard = ({ trainer }) => {
  const [activeTab, setActiveTab] = useState('courses');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock courses data
  const courses = [
    {
      id: 1,
      title: 'Web Development Fundamentals',
      category: 'Development',
      students: 245,
      rating: 4.8,
      status: 'published',
      price: 49.99,
      duration: '40 hours',
      enrollmentRate: 85,
      revenue: 12247.55
    },
    {
      id: 2,
      title: 'UI/UX Design Masterclass',
      category: 'Design',
      students: 182,
      rating: 4.9,
      status: 'published',
      price: 59.99,
      duration: '35 hours',
      enrollmentRate: 78,
      revenue: 10897.18
    },
    {
      id: 3,
      title: 'Advanced React Patterns',
      category: 'Development',
      students: 98,
      rating: 4.7,
      status: 'draft',
      price: 69.99,
      duration: '50 hours',
      enrollmentRate: 45,
      revenue: 6859.02
    },
    {
      id: 4,
      title: 'Digital Marketing Strategy',
      category: 'Marketing',
      students: 156,
      rating: 4.6,
      status: 'published',
      price: 44.99,
      duration: '25 hours',
      enrollmentRate: 72,
      revenue: 7018.44
    }
  ];

  // Mock students data
  const recentStudents = [
    { id: 1, name: 'John Doe', email: 'john@example.com', course: 'Web Development', joinDate: '2 days ago', progress: 65 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', course: 'UI/UX Design', joinDate: '5 days ago', progress: 48 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', course: 'React Patterns', joinDate: '1 week ago', progress: 92 },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', course: 'Marketing', joinDate: '2 weeks ago', progress: 100 },
  ];

  // Generate chart data
  const generateChartData = () => {
    const statusData = {
      labels: ['Published', 'Draft', 'Archived'],
      datasets: [
        {
          data: [
            courses.filter(c => c.status === 'published').length,
            courses.filter(c => c.status === 'draft').length,
            courses.filter(c => c.status === 'archived').length,
          ],
          backgroundColor: ['rgba(75, 192, 192, 0.7)', 'rgba(255, 206, 86, 0.7)', 'rgba(201, 203, 207, 0.7)'],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 206, 86, 1)', 'rgba(201, 203, 207, 1)'],
          borderWidth: 1,
        },
      ],
    };

    const monthlyData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'New Enrollments',
          data: [45, 52, 48, 65, 72, 88],
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          tension: 0.4,
        },
      ],
    };

    const revenueData = {
      labels: courses.map(c => c.title.substring(0, 15) + '...'),
      datasets: [
        {
          label: 'Revenue ($)',
          data: courses.map(c => c.revenue),
          backgroundColor: 'rgba(153, 102, 255, 0.7)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
        },
      ],
    };

    return { statusData, monthlyData, revenueData };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'gray',
          font: { size: 12 }
        }
      }
    }
  };

  // Calculate stats
  const stats = {
    totalCourses: courses.length,
    totalStudents: courses.reduce((sum, course) => sum + course.students, 0),
    totalRevenue: courses.reduce((sum, course) => sum + course.revenue, 0),
    avgRating: (courses.reduce((sum, course) => sum + course.rating, 0) / courses.length).toFixed(1)
  };

  // Filter courses
  const filterCourses = () => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome, {trainer?.name || 'Trainer'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your courses and students
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex space-x-3 items-center">
            <Link
              href="/dashboard/add-course"
              className="flex items-center bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium"
            >
              <FaPlus className="mr-2" size={14} />
              Create New Course
            </Link>

            <Link
              href="/dashboard/my-courses"
              className="flex items-center bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
            >
              <FaBook className="mr-2" size={14} />
              My Courses
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-blue-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Courses</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stats.totalCourses}</p>
              </div>
              <FaBook className="text-blue-500 text-3xl opacity-20" />
            </div>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-green-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Students</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stats.totalStudents}</p>
              </div>
              <FaUsers className="text-green-500 text-3xl opacity-20" />
            </div>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-purple-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">${stats.totalRevenue.toFixed(2)}</p>
              </div>
              <FaChartLine className="text-purple-500 text-3xl opacity-20" />
            </div>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-yellow-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Avg Rating</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stats.avgRating}⭐</p>
              </div>
              <FaStar className="text-yellow-500 text-3xl opacity-20" />
            </div>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Course Status Chart */}
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Course Status</h3>
            <div style={{ position: 'relative', height: '300px' }}>
              <Pie data={generateChartData().statusData} options={chartOptions} />
            </div>
          </motion.div>

          {/* Monthly Enrollments Chart */}
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Enrollments</h3>
            <div style={{ position: 'relative', height: '300px' }}>
              <Line data={generateChartData().monthlyData} options={chartOptions} />
            </div>
          </motion.div>
        </div>

        {/* Revenue Chart */}
        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue by Course</h3>
          <div style={{ position: 'relative', height: '300px' }}>
            <Bar data={generateChartData().revenueData} options={chartOptions} />
          </div>
        </motion.div>

        {/* Tabs Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
          <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
            <button
              onClick={() => setActiveTab('courses')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'courses'
                  ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600'
                  : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <FaBook className="inline mr-2" size={16} />
              My Courses
            </button>

            <button
              onClick={() => setActiveTab('students')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'students'
                  ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600'
                  : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <FaUsers className="inline mr-2" size={16} />
              Recent Students
            </button>
          </div>

          <div className="p-6">
            {/* Courses Tab */}
            {activeTab === 'courses' && (
              <div>
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                  <div className="flex-1 relative">
                    <FaSearch className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Search courses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">All Statuses</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div className="space-y-4">
                  {filterCourses().map((course) => (
                    <div
                      key={course.id}
                      className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-4 md:mb-0">
                          <div className="flex items-center gap-3">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {course.title}
                            </h4>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              course.status === 'published'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                : course.status === 'draft'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                            }`}>
                              {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                            </span>
                          </div>
                          <div className="flex items-center flex-wrap gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <FaUsers size={14} /> {course.students} students
                            </span>
                            <span className="flex items-center gap-1">
                              <FaStar className="text-yellow-400" size={14} /> {course.rating} rating
                            </span>
                            <span className="flex items-center gap-1">
                              <FaCalendarAlt size={14} /> {course.duration}
                            </span>
                            <span>${course.price}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Revenue</p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">${course.revenue.toFixed(2)}</p>
                          </div>

                          <Link
                            href={`/dashboard/course-details?id=${course.id}`}
                            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm"
                          >
                            Edit
                          </Link>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-600 dark:text-gray-400">Enrollment</span>
                          <span className="text-xs font-medium text-gray-900 dark:text-white">{course.enrollmentRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-primary-600 h-2 rounded-full"
                            style={{ width: `${course.enrollmentRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Students Tab */}
            {activeTab === 'students' && (
              <div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Name</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Email</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Course</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Join Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentStudents.map((student) => (
                        <tr key={student.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <td className="py-4 px-4">
                            <p className="font-medium text-gray-900 dark:text-white">{student.name}</p>
                          </td>
                          <td className="py-4 px-4 text-gray-600 dark:text-gray-400 text-sm">{student.email}</td>
                          <td className="py-4 px-4 text-gray-600 dark:text-gray-400 text-sm">{student.course}</td>
                          <td className="py-4 px-4 text-gray-600 dark:text-gray-400 text-sm">{student.joinDate}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2 w-24">
                                <div
                                  className="bg-primary-600 h-2 rounded-full"
                                  style={{ width: `${student.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">{student.progress}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerDashboard;
