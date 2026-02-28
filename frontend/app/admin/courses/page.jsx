'use client';

import { useState, useEffect } from 'react';
import {
  FaSearch,
  FaFilter,
  FaEye,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaGraduationCap,
  FaUser,
  FaCalendarAlt,
  FaStar,
  FaPlayCircle,
  FaUsers,
  FaClock
} from 'react-icons/fa';
import Link from 'next/link';

export default function CoursesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  // Mock course data
  const mockCourses = [
    {
      id: 1,
      title: 'Complete Web Development Bootcamp',
      instructor: {
        id: 201,
        name: 'Sarah Johnson',
        role: 'Senior Web Developer',
        img: '/fighterfish.png'
      },
      category: 'Web Development',
      status: 'published',
      rating: 4.8,
      students: 1245,
      lessons: 42,
      duration: '38 hours',
      price: 89.99,
      createdAt: '2023-06-15',
      updatedAt: '2023-10-22',
      description: 'Learn web development from scratch with HTML, CSS, JavaScript, React, Node.js and more.',
      featured: true
    },
    {
      id: 2,
      title: 'Advanced Machine Learning Specialization',
      instructor: {
        id: 205,
        name: 'David Chen',
        role: 'AI Researcher',
        img: '/fighterfish.png'
      },
      category: 'Data Science',
      status: 'pending_review',
      rating: 0,
      students: 0,
      lessons: 28,
      duration: '32 hours',
      price: 129.99,
      createdAt: '2023-11-05',
      updatedAt: '2023-11-05',
      description: 'Master advanced machine learning techniques including deep learning, reinforcement learning, and more.',
      featured: false
    },
    {
      id: 3,
      title: 'UI/UX Design Principles',
      instructor: {
        id: 210,
        name: 'Emily Wong',
        role: 'UX Designer',
        img: '/fighterfish.png'
      },
      category: 'Design',
      status: 'published',
      rating: 4.6,
      students: 876,
      lessons: 24,
      duration: '18 hours',
      price: 69.99,
      createdAt: '2023-08-10',
      updatedAt: '2023-09-15',
      description: 'Learn the fundamentals of UI/UX design with practical projects and industry best practices.',
      featured: true
    },
    {
      id: 4,
      title: 'Digital Marketing Masterclass',
      instructor: {
        id: 215,
        name: 'Michael Roberts',
        role: 'Marketing Specialist',
        img: '/fighterfish.png'
      },
      category: 'Marketing',
      status: 'published',
      rating: 4.3,
      students: 542,
      lessons: 30,
      duration: '25 hours',
      price: 79.99,
      createdAt: '2023-07-20',
      updatedAt: '2023-10-05',
      description: 'Comprehensive guide to digital marketing including SEO, social media, email marketing, and analytics.',
      featured: false
    },
    {
      id: 5,
      title: 'Mobile App Development with Flutter',
      instructor: {
        id: 220,
        name: 'Alex Turner',
        role: 'Mobile Developer',
        img: '/fighterfish.png'
      },
      category: 'Mobile Development',
      status: 'draft',
      rating: 0,
      students: 0,
      lessons: 35,
      duration: '28 hours',
      price: 99.99,
      createdAt: '2023-11-10',
      updatedAt: '2023-11-10',
      description: 'Build cross-platform mobile apps with Flutter and Dart programming language.',
      featured: false
    },
    {
      id: 6,
      title: 'Blockchain Development Fundamentals',
      instructor: {
        id: 225,
        name: 'Robert Kim',
        role: 'Blockchain Engineer',
        img: '/fighterfish.png'
      },
      category: 'Blockchain',
      status: 'pending_review',
      rating: 0,
      students: 0,
      lessons: 22,
      duration: '20 hours',
      price: 109.99,
      createdAt: '2023-11-01',
      updatedAt: '2023-11-01',
      description: 'Learn blockchain development with Ethereum, Solidity, and Web3.js.',
      featured: false
    }
  ];

  // Categories from courses
  const categories = [...new Set(mockCourses.map(course => course.category))];

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setCourses(mockCourses);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter courses based on search query and filters
  const filteredCourses = courses.filter(course => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'all' || course.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || course.category === filterCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Status badge component
  const StatusBadge = ({ status }) => {
    const badgeClasses = {
      published: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      pending_review: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      draft: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
    };

    const statusLabels = {
      published: 'Published',
      pending_review: 'Pending Review',
      draft: 'Draft',
      rejected: 'Rejected'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${badgeClasses[status] || badgeClasses.draft}`}>
        {statusLabels[status] || status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Courses</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            View and manage courses
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center">
              <FaFilter className="text-gray-400 mr-2" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Statuses</option>
                <option value="published">Published</option>
                <option value="pending_review">Pending Review</option>
                <option value="draft">Draft</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="flex items-center ml-0 md:ml-2">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Loading courses...</p>
          </div>
        ) : (
          filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="relative">
                <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <FaPlayCircle className="text-white text-5xl opacity-80" />
                </div>
                {course.featured && (
                  <div className="absolute top-0 left-0 bg-yellow-500 text-white text-xs px-2 py-1 rounded-br-md">
                    Featured
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-3">
                  <h3 className="text-lg font-medium truncate">{course.title}</h3>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center mb-3">
                  <img
                    src={course.instructor.img}
                    alt={course.instructor.name}
                    className="h-8 w-8 rounded-full object-cover border border-gray-200 dark:border-gray-700 mr-2"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/fighterfish.png";
                    }}
                  />
                  <div className="text-sm">
                    <p className="text-gray-900 dark:text-white font-medium">{course.instructor.name}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">{course.instructor.role}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  <StatusBadge status={course.status} />
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    {course.category}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <FaUsers className="mr-1" />
                    <span>{course.students} students</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <FaClock className="mr-1" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <FaGraduationCap className="mr-1" />
                    <span>{course.lessons} lessons</span>
                  </div>
                  {course.rating > 0 && (
                    <div className="flex items-center text-yellow-500">
                      <FaStar className="mr-1" />
                      <span>{course.rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold text-gray-900 dark:text-white">${course.price.toFixed(2)}</span>
                  <div className="flex space-x-2">
                    <Link
                      href={`/admin/courses/${course.id}`}
                      className="p-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full"
                      title="View Details"
                    >
                      <FaEye />
                    </Link>
                    <button
                      className="p-2 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-full"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    {course.status === 'pending_review' && (
                      <>
                        <button
                          className="p-2 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-full"
                          title="Approve"
                        >
                          <FaCheck />
                        </button>
                        <button
                          className="p-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                          title="Reject"
                        >
                          <FaTimes />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {!isLoading && filteredCourses.length === 0 && (
        <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">No courses found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
