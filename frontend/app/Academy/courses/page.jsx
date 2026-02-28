'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaClock, FaChalkboardTeacher, FaArrowLeft } from 'react-icons/fa';
import Navbar from '../../../components/Navbar';
import Link from 'next/link';
import CourseCard from '../../../components/CourseCard';

// Sample course data (in a real app, this would come from an API)
const coursesData = [
  {
    id: 1,
    title: "Full-Stack Web Development",
    description: "Master modern web development with React, Node.js, and MongoDB",
    instructor: "Alex Johnson",
    price: "250 DT",
    rating: 4.9,
    duration: "12 weeks",
    totalHours: "80 hours",
    students: 1240,
    level: "Intermediate",
    category: "Web Development",
    image: "/photos/Academy/full.png",
  },
  {
    id: 2,
    title: "UI/UX Design Masterclass",
    description: "Learn to create beautiful, user-friendly interfaces that convert",
    instructor: "Sarah Williams",
    price: "180 DT",
    rating: 4.8,
    duration: "8 weeks",
    totalHours: "40 hours",
    students: 950,
    level: "Beginner",
    category: "Design",
    image: "/photos/Academy/react.jpeg",
  },
  {
    id: 3,
    title: "Advanced Figma for Designers",
    description: "Take your design skills to the next level with advanced Figma techniques",
    instructor: "Michael Chen",
    price: "150 DT",
    rating: 4.7,
    duration: "6 weeks",
    totalHours: "30 hours",
    students: 780,
    level: "Advanced",
    category: "Design",
    image: "/photos/Academy/figma.png",
  },
  {
    id: 4,
    title: "Digital Marketing Strategy",
    description: "Learn to create and implement effective digital marketing campaigns",
    instructor: "Emily Rodriguez",
    price: "200 DT",
    rating: 4.6,
    duration: "10 weeks",
    totalHours: "50 hours",
    students: 620,
    level: "Intermediate",
    category: "Marketing",
    image: "/photos/Academy/full.png",
  },
  {
    id: 5,
    title: "Mobile App Development",
    description: "Build native iOS and Android apps with React Native",
    instructor: "David Kim",
    price: "280 DT",
    rating: 4.9,
    duration: "14 weeks",
    totalHours: "70 hours",
    students: 840,
    level: "Advanced",
    category: "Mobile Development",
    image: "/photos/Academy/react.jpeg",
  },
  {
    id: 6,
    title: "Data Science Fundamentals",
    description: "Learn Python, data analysis, and machine learning basics",
    instructor: "Lisa Thompson",
    price: "220 DT",
    rating: 4.7,
    duration: "12 weeks",
    totalHours: "60 hours",
    students: 560,
    level: "Beginner",
    category: "Data Science",
    image: "/photos/Academy/figma.png",
  },
  {
    id: 7,
    title: "JavaScript for Beginners",
    description: "Start your journey into web development with JavaScript fundamentals",
    instructor: "Mark Wilson",
    price: "150 DT",
    rating: 4.8,
    duration: "8 weeks",
    totalHours: "40 hours",
    students: 1120,
    level: "Beginner",
    category: "Web Development",
    image: "/photos/Academy/full.png",
  },
  {
    id: 8,
    title: "Advanced React Patterns",
    description: "Master advanced React concepts and design patterns",
    instructor: "Jennifer Lee",
    price: "220 DT",
    rating: 4.9,
    duration: "10 weeks",
    totalHours: "50 hours",
    students: 680,
    level: "Advanced",
    category: "Web Development",
    image: "/photos/Academy/react.jpeg",
  },
  {
    id: 9,
    title: "Python for Data Analysis",
    description: "Learn how to analyze and visualize data using Python",
    instructor: "Robert Brown",
    price: "200 DT",
    rating: 4.7,
    duration: "10 weeks",
    totalHours: "50 hours",
    students: 790,
    level: "Intermediate",
    category: "Data Science",
    image: "/photos/Academy/figma.png",
  },
];

// Get unique categories, levels, and durations for filters
const categories = [...new Set(coursesData.map(course => course.category))];
const levels = [...new Set(coursesData.map(course => course.level))];
const durations = [
  { label: "Less than 5 weeks", value: "0-5" },
  { label: "5-10 weeks", value: "5-10" },
  { label: "More than 10 weeks", value: "10+" }
];

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(coursesData);
  const [showFilters, setShowFilters] = useState(false);

  // Apply filters when any filter changes
  useEffect(() => {
    try {
      let result = [...coursesData]; // Create a copy of the array

      // Apply search filter
      if (searchTerm) {
        result = result.filter(item =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.instructor.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Apply category filter
      if (selectedCategory) {
        result = result.filter(item => item.category === selectedCategory);
      }

      // Apply level filter
      if (selectedLevel) {
        result = result.filter(item => item.level === selectedLevel);
      }

      // Apply duration filter
      if (selectedDuration) {
        if (selectedDuration === "5-10") {
          // For range "5-10"
          result = result.filter(item => {
            const weeks = parseInt(item.duration);
            return weeks >= 5 && weeks <= 10;
          });
        } else if (selectedDuration === "10+") {
          // For "10+"
          result = result.filter(item => {
            const weeks = parseInt(item.duration);
            return weeks > 10;
          });
        } else if (selectedDuration === "0-5") {
          // For "0-5"
          result = result.filter(item => {
            const weeks = parseInt(item.duration);
            return weeks <= 5;
          });
        }
      }

      setFilteredCourses(result);
    } catch (error) {
      console.error("Error applying filters:", error);
      // Fallback to showing all courses if there's an error
      setFilteredCourses(coursesData);
    }
  }, [searchTerm, selectedCategory, selectedLevel, selectedDuration]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedLevel('');
    setSelectedDuration('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link href="/Academy" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mr-4">
              <FaArrowLeft className="inline mr-2" />
              Back to Academy
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Browse All Courses
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
            Explore our comprehensive collection of courses designed to help you master new skills and advance your career.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Search Bar */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search courses, topics, or instructors..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Filter Toggle Button (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300"
            >
              <FaFilter />
              <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
            </button>
          </div>

          {/* Filters (Desktop always visible, Mobile conditionally) */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${showFilters ? 'block' : 'hidden md:grid'}`}>
            {/* Category Filter */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="">All Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Difficulty Level
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="">All Levels</option>
                {levels.map((level, index) => (
                  <option key={index} value={level}>{level}</option>
                ))}
              </select>
            </div>

            {/* Duration Filter */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Duration
              </label>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="">Any Duration</option>
                {durations.map((duration, index) => (
                  <option key={index} value={duration.value}>{duration.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Reset Filters Button (only shown when filters are applied) */}
          {(searchTerm || selectedCategory || selectedLevel || selectedDuration) && (
            <button
              onClick={resetFilters}
              className="mt-4 text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-2"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing <span className="font-semibold">{filteredCourses.length}</span> courses
          </p>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 text-5xl mb-4">
              <FaSearch className="inline" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No courses found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
