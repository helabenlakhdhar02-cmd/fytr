'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  FaRoute, 
  FaGraduationCap, 
  FaBook, 
  FaStar, 
  FaClock, 
  FaUsers,
  FaSearch,
  FaFilter,
  FaArrowRight,
  FaLock,
  FaUnlock,
  FaCheck,
  FaRocket
} from 'react-icons/fa';
import Navbar from '../../../components/Navbar';

const LearningPathsPage = () => {
  const router = useRouter();
  const [learningPaths, setLearningPaths] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, in-progress, completed, not-started
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Mock data for demonstration
  const mockLearningPaths = [
    {
      id: 1,
      title: "Web Development Mastery",
      description: "A comprehensive path to become a full-stack web developer",
      category: "Web Development",
      level: "Beginner to Advanced",
      duration: "6 months",
      courses: [
        { id: 1, title: "HTML & CSS Fundamentals", completed: true },
        { id: 2, title: "JavaScript Essentials", completed: true },
        { id: 3, title: "React Framework", completed: false },
        { id: 4, title: "Node.js & Express", completed: false },
        { id: 5, title: "Database Integration", completed: false },
        { id: 6, title: "Deployment & DevOps", completed: false }
      ],
      progress: 33,
      enrolledStudents: 1245,
      rating: 4.8,
      status: "in-progress",
      image: "/photos/Academy/web-dev.jpg"
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      description: "Learn the core concepts and tools for data analysis and visualization",
      category: "Data Science",
      level: "Intermediate",
      duration: "4 months",
      courses: [
        { id: 7, title: "Python for Data Science", completed: false },
        { id: 8, title: "Data Analysis with Pandas", completed: false },
        { id: 9, title: "Data Visualization", completed: false },
        { id: 10, title: "Introduction to Machine Learning", completed: false }
      ],
      progress: 0,
      enrolledStudents: 980,
      rating: 4.7,
      status: "not-started",
      image: "/photos/Academy/data-science.jpg"
    },
    {
      id: 3,
      title: "Mobile App Development",
      description: "Build cross-platform mobile applications using React Native",
      category: "Mobile Development",
      level: "Intermediate",
      duration: "3 months",
      courses: [
        { id: 11, title: "React Native Basics", completed: false },
        { id: 12, title: "State Management in React Native", completed: false },
        { id: 13, title: "Native Device Features", completed: false },
        { id: 14, title: "Publishing Your App", completed: false }
      ],
      progress: 0,
      enrolledStudents: 750,
      rating: 4.6,
      status: "not-started",
      image: "/photos/Academy/mobile-dev.jpg"
    },
    {
      id: 4,
      title: "UI/UX Design Essentials",
      description: "Master the principles of user interface and experience design",
      category: "Design",
      level: "Beginner",
      duration: "2 months",
      courses: [
        { id: 15, title: "Design Principles", completed: true },
        { id: 16, title: "User Research", completed: true },
        { id: 17, title: "Wireframing & Prototyping", completed: true },
        { id: 18, title: "Design Systems", completed: true }
      ],
      progress: 100,
      enrolledStudents: 1120,
      rating: 4.9,
      status: "completed",
      image: "/photos/Academy/ui-ux.jpg"
    }
  ];

  // Mock categories for filtering
  const categories = [
    "Web Development",
    "Data Science",
    "Mobile Development",
    "Design",
    "DevOps",
    "Artificial Intelligence"
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLearningPaths(mockLearningPaths);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter and search learning paths
  const filteredPaths = learningPaths.filter(path => {
    const matchesSearch = path.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          path.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatusFilter = filter === 'all' || path.status === filter;
    const matchesCategoryFilter = categoryFilter === 'all' || path.category === categoryFilter;
    
    return matchesSearch && matchesStatusFilter && matchesCategoryFilter;
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
                <FaRoute className="mr-3 text-blue-600 dark:text-blue-400" />
                Learning Paths
              </h1>
              <p className="mt-1 text-gray-600 dark:text-gray-400">Personalized learning journeys to help you achieve your goals</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link 
                href="/dashboard/recommended-courses" 
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-colors"
              >
                <FaGraduationCap className="mr-2" />
                Recommended Courses
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
                placeholder="Search learning paths..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
              <select
                className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="not-started">Not Started</option>
              </select>
            </div>
          </div>
        </div>

        {/* Learning Paths Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredPaths.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPaths.map(path => (
              <div key={path.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 transition-transform hover:transform hover:scale-[1.02]">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={path.image || "/photos/Academy/default-path.jpg"} 
                    alt={path.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/photos/Academy/default-path.jpg";
                    }}
                  />
                  <div className="absolute top-0 right-0 m-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      path.status === 'completed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                        : path.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                    }`}>
                      {path.status === 'completed' ? 'Completed' : path.status === 'in-progress' ? 'In Progress' : 'Not Started'}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{path.title}</h3>
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{path.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{path.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full">
                      {path.category}
                    </span>
                    <span className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 rounded-full">
                      {path.level}
                    </span>
                    <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-400 rounded-full flex items-center">
                      <FaClock className="mr-1" /> {path.duration}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-600 dark:text-gray-400">Progress</span>
                      <span className="text-xs font-medium text-gray-900 dark:text-white">{path.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          path.progress === 100 
                            ? 'bg-green-500' 
                            : path.progress > 0 
                              ? 'bg-blue-500' 
                              : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                        style={{ width: `${path.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
                      <FaUsers className="mr-1" /> {path.enrolledStudents.toLocaleString()} students
                    </div>
                    <Link 
                      href={`/dashboard/learning-paths/${path.id}`}
                      className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      View Path <FaArrowRight className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
              <FaRoute className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No learning paths found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {searchTerm || filter !== 'all' || categoryFilter !== 'all'
                ? "Try adjusting your search or filter criteria" 
                : "We couldn't find any learning paths for you yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningPathsPage;
