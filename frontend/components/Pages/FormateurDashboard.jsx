"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import Navbar from '../Navbar';
import Link from 'next/link';
import { FaChalkboardTeacher, FaUsers, FaBook, FaStar, FaPlus, FaSearch, FaChartLine, FaCalendarAlt, FaGraduationCap } from 'react-icons/fa';
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

const FormateurDashboard = ({ user }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('courses');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock courses data
  const courses = [
    {
      id: 1,
      title: "Full-Stack Web Development",
      students: 124,
      rating: 4.8,
      progress: 100,
      status: "active",
      price: 49.99,
      duration: '40 hours',
      revenue: 6076
    },
    {
      id: 2,
      title: "UI/UX Design Masterclass",
      students: 87,
      rating: 4.9,
      progress: 100,
      status: "active",
      price: 59.99,
      duration: '35 hours',
      revenue: 5219.13
    },
    {
      id: 3,
      title: "Python for Data Science",
      students: 56,
      rating: 4.7,
      progress: 80,
      status: "draft",
      price: 69.99,
      duration: '50 hours',
      revenue: 0
    }
  ];

  const recentStudents = [
    { id: 1, name: "Sarah Williams", course: "Full-Stack Web Development", progress: 75, email: "sarah@example.com" },
    { id: 2, name: "Michael Chen", course: "UI/UX Design Masterclass", progress: 92, email: "michael@example.com" },
    { id: 3, name: "John Anderson", course: "Full-Stack Web Development", progress: 45, email: "john@example.com" },
    { id: 4, name: "Emma Davis", course: "Python for Data Science", progress: 60, email: "emma@example.com" }
  ];

  // Generate chart data
  const generateChartData = () => {
    const statusData = {
      labels: ['Active', 'Draft'],
      datasets: [{
        data: [
          courses.filter(c => c.status === 'active').length,
          courses.filter(c => c.status === 'draft').length,
        ],
        backgroundColor: ['rgba(75, 192, 192, 0.7)', 'rgba(255, 206, 86, 0.7)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
      }],
    };

    const monthlyData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'New Enrollments',
        data: [12, 19, 15, 25, 22, 18],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
      }],
    };

    const revenueData = {
      labels: courses.map(c => c.title.substring(0, 12) + '...'),
      datasets: [{
        label: 'Revenue ($)',
        data: courses.map(c => c.revenue),
        backgroundColor: 'rgba(153, 102, 255, 0.7)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      }],
    };

    return { statusData, monthlyData, revenueData };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: 'gray', font: { size: 12 } }
      }
    }
  };

  const stats = {
    totalCourses: courses.length,
    totalStudents: courses.reduce((sum, c) => sum + c.students, 0),
    totalRevenue: courses.reduce((sum, c) => sum + c.revenue, 0),
    avgRating: (courses.reduce((sum, c) => sum + c.rating, 0) / courses.length).toFixed(1)
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || (statusFilter === 'active' && course.status === 'active') || (statusFilter === 'draft' && course.status === 'draft');
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Trainer Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your courses and students
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              href="/dashboard/add-course"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              <FaPlus className="mr-2" size={14} />
              Create Course
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Courses</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stats.totalCourses}</p>
              </div>
              <FaBook className="text-blue-500 text-3xl opacity-20" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Students</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stats.totalStudents}</p>
              </div>
              <FaUsers className="text-green-500 text-3xl opacity-20" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">${stats.totalRevenue.toFixed(2)}</p>
              </div>
              <FaChartLine className="text-purple-500 text-3xl opacity-20" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Avg Rating</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stats.avgRating}⭐</p>
              </div>
              <FaStar className="text-yellow-500 text-3xl opacity-20" />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Course Status</h3>
            <div style={{ position: 'relative', height: '300px' }}>
              <Pie data={generateChartData().statusData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Enrollments</h3>
            <div style={{ position: 'relative', height: '300px' }}>
              <Line data={generateChartData().monthlyData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue by Course</h3>
          <div style={{ position: 'relative', height: '300px' }}>
            <Bar data={generateChartData().revenueData} options={chartOptions} />
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('courses')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'courses'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <FaBook className="inline mr-2" size={16} />
              My Courses ({courses.length})
            </button>

            <button
              onClick={() => setActiveTab('students')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'students'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                  : 'text-gray-700 dark:text-gray-300'
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
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                <div className="space-y-4">
                  {filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => (
                      <div key={course.id} className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="mb-4 md:mb-0">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {course.title}
                              </h4>
                              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                course.status === 'active'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                              }`}>
                                {course.status === 'active' ? 'Active' : 'Draft'}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                              <span className="flex items-center gap-1">
                                <FaUsers size={14} /> {course.students} students
                              </span>
                              <span className="flex items-center gap-1">
                                <FaStar className="text-yellow-400" size={14} /> {course.rating} rating
                              </span>
                              <span className="flex items-center gap-1">
                                <FaCalendarAlt size={14} /> {course.duration}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm text-gray-600 dark:text-gray-400">Revenue</p>
                              <p className="text-lg font-bold text-gray-900 dark:text-white">${course.revenue.toFixed(2)}</p>
                            </div>
                            <Link
                              href={`/dashboard/course/${course.id}`}
                              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
                            >
                              Manage
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400">No courses found</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Students Tab */}
            {activeTab === 'students' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Email</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Course</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentStudents.map((student) => (
                      <tr key={student.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">{student.name}</td>
                        <td className="py-4 px-4 text-gray-600 dark:text-gray-400 text-sm">{student.email}</td>
                        <td className="py-4 px-4 text-gray-600 dark:text-gray-400 text-sm">{student.course}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2 w-24">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormateurDashboard;


