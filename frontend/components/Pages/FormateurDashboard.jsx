"use client";
import React from 'react'
import { refreshAccessToken, logoutUser } from '../../lib/auth';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { GroupCard } from '../ui/GroupCard';
import { PostCard } from '../ui/Post';
import ProfileCard from '../ui/ProfileCrad';
import StatusBox from '../ui/Status';
import Navbar from '../Navbar';
import PostFeed from '../Posts/PostFeed';
import Link from 'next/link';
import { FaChalkboardTeacher, FaUsers, FaBook, FaStar, FaGraduationCap, FaChartLine, FaPlus, FaCalendarAlt } from 'react-icons/fa';
import { API_BASE_URL } from '../../config/api';

const FormateurDashboard = ({user}) => {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [students, setStudents] = useState([]);

  // Mock data for demonstration
  const mockCourses = [
    {
      id: 1,
      title: "Full-Stack Web Development",
      students: 124,
      rating: 4.8,
      progress: 100,
      status: "active"
    },
    {
      id: 2,
      title: "UI/UX Design Masterclass",
      students: 87,
      rating: 4.9,
      progress: 100,
      status: "active"
    },
    {
      id: 3,
      title: "Python for Data Science",
      students: 56,
      rating: 4.7,
      progress: 80,
      status: "draft"
    }
  ];

  const mockStudents = [
    { id: 1, name: "Sarah Williams", avatar: "/photos/Academy/student2.jpeg", course: "Full-Stack Web Development", progress: 75 },
    { id: 2, name: "Michael Chen", avatar: "/photos/Academy/student3.png", course: "UI/UX Design Masterclass", progress: 92 },
    { id: 3, name: "John Anderson", avatar: "/photos/Academy/student1.jpg", course: "Full-Stack Web Development", progress: 45 }
  ];

  useEffect(() => {
    // Set mock data
    setCourses(mockCourses);
    setStudents(mockStudents);

    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/fyter/posts/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [isUpdated]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Calculate total stats
  const totalStudents = courses.reduce((sum, course) => sum + course.students, 0);
  const totalCourses = courses.length;
  const averageRating = courses.length > 0
    ? (courses.reduce((sum, course) => sum + course.rating, 0) / courses.length).toFixed(1)
    : "0.0";

  return (
    <div>
      <Navbar />
      <div className="py-6">
        {/* Welcome Banner */}
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="dashboard-section bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-700 dark:to-blue-900 mb-6 p-6 text-white rounded-xl relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-5 rounded-full -ml-10 -mb-10"></div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between relative z-10">
              <div>
                <h1 className="text-2xl font-bold mb-2">Welcome back, Formateur!</h1>
                <p className="text-blue-100">Your teaching dashboard is ready. Create courses, manage students, and grow your teaching career.</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-200 text-blue-800">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
                    Teaching Expert
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-200 text-purple-800">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-1"></span>
                    Course Creator
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-200 text-green-800">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                    Student Mentor
                  </span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-3">
                <Link href="/dashboard/add-course" className="bg-white text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-md font-medium transition-all shadow-md hover:shadow-lg flex items-center">
                  <FaPlus className="h-4 w-4 mr-2" />
                  Create Course
                </Link>
                <Link href="/dashboard/students" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-all shadow-md hover:shadow-lg border border-blue-400">
                  View Students
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className='relative w-full max-w-7xl mx-auto grid grid-cols-12 gap-6 h-auto p-4 md:p-6'>
          {/* Left Sidebar */}
          <div className='relative col-span-4 lg:col-span-3 space-y-5'>
            <aside className='sticky top-4 space-y-5'>
              <div className="card-hover-effect">
                <ProfileCard />
              </div>
              <div className="card-hover-effect">
                <GroupCard />
              </div>

              {/* Teaching Stats Card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 flex items-center">
                    <FaChartLine className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                    Teaching Stats
                  </h3>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:border-blue-200 dark:hover:border-blue-800/50 group">
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">{totalStudents}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Students</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:border-green-200 dark:hover:border-green-800/50 group">
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">{totalCourses}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Courses</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:border-purple-200 dark:hover:border-purple-800/50 group">
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">0</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Reviews</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:border-yellow-200 dark:hover:border-yellow-800/50 group">
                      <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                        {averageRating} <FaStar className="h-3 w-3 ml-1" />
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Rating</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* Main Content */}
          <main className='col-span-8 md:col-span-5 lg:col-span-6 space-y-6'>
            {/* Quick Stats */}
            <div className="dashboard-section bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg text-center smooth-transition hover:shadow-md">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalCourses}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active Courses</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg text-center smooth-transition hover:shadow-md">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{totalStudents}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Students</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg text-center smooth-transition hover:shadow-md">
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">0</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Messages</p>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg text-center smooth-transition hover:shadow-md">
                  <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{averageRating}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Rating</p>
                </div>
              </div>
            </div>

            {/* Upcoming Teaching Sessions */}
            <div className="dashboard-section bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white flex items-center">
                  <FaChalkboardTeacher className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                  Upcoming Teaching Sessions
                </h3>
                <Link href="/dashboard/schedule" className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium flex items-center">
                  <span>View Schedule</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Full-Stack Web Development</h4>
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Today, 2:00 PM</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center mr-3">
                      <FaUsers className="h-3 w-3 mr-1" />
                      24 students
                    </span>
                    <span>Module 3: JavaScript Fundamentals</span>
                  </div>
                </div>

                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800/30">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">UI/UX Design Masterclass</h4>
                    <span className="text-xs font-medium text-purple-600 dark:text-purple-400">Tomorrow, 10:00 AM</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center mr-3">
                      <FaUsers className="h-3 w-3 mr-1" />
                      18 students
                    </span>
                    <span>Module 2: User Research Methods</span>
                  </div>
                </div>

                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800/30">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Python for Data Science</h4>
                    <span className="text-xs font-medium text-green-600 dark:text-green-400">Friday, 3:30 PM</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center mr-3">
                      <FaUsers className="h-3 w-3 mr-1" />
                      12 students
                    </span>
                    <span>Module 1: Introduction to NumPy</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Students */}
            <div className="dashboard-section bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white flex items-center">
                  <FaUsers className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                  Recent Students
                </h3>
                <Link href="/dashboard/students" className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                  View All
                </Link>
              </div>

              {students.length > 0 ? (
                <div className="space-y-3">
                  {students.map(student => (
                    <div key={student.id} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover mr-3"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">{student.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{student.course}</p>
                      </div>
                      <div className="w-24">
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 text-right mt-1">{student.progress}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm py-4 text-center">No students enrolled yet.</p>
              )}
            </div>

            {/* Status Box for Posts */}
            <StatusBox setUpdated={setIsUpdated} />

            {/* Posts Feed */}
            <PostFeed userRole="formateur" />
          </main>

          {/* Right Sidebar */}
          <div className='hidden md:block md:col-span-3'>
            <aside className='sticky top-4 space-y-6'>
              {/* Your Courses */}
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 flex items-center">
                      <FaBook className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                      Your Courses
                    </h3>
                    <Link href="/dashboard/my-courses" className="text-blue-600 dark:text-blue-400 text-sm hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium">
                      View All
                    </Link>
                  </div>
                </div>
                <div className="p-4">
                  {courses && courses.length > 0 ? (
                    <ul className="space-y-3">
                      {courses.map(course => (
                        <li key={course.id} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                          <div className="flex justify-between items-center">
                            <Link href={`/courses/${course.id}`} className="font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors block">
                              {course.title}
                            </Link>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              course.status === 'active'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                            }`}>
                              {course.status === 'active' ? 'Active' : 'Draft'}
                            </span>
                          </div>
                          <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center mr-3">
                              <FaUsers className="h-3 w-3 mr-1" />
                              {course.students} students
                            </div>
                            <div className="flex items-center">
                              <FaStar className="h-3 w-3 mr-1 text-yellow-500" />
                              {course.rating}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 mb-3">
                        <FaGraduationCap className="h-6 w-6" />
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">No courses yet</p>
                      <Link href="/dashboard/add-course" className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                        Create your first course
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100">Trainer Quick Actions</h3>
                </div>
                <div className="p-4">
                  <div className="space-y-2">
                    <Link href="/dashboard/add-course" className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center mr-3">
                        <FaPlus className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Create New Course</span>
                    </Link>
                    <Link href="/dashboard/students" className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mr-3">
                        <FaUsers className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Manage Students</span>
                    </Link>
                    <Link href="/course-analytics" className="flex items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center mr-3">
                        <FaChartLine className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Course Analytics</span>
                    </Link>
                    <Link href="/dashboard/certifications" className="flex items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-800 flex items-center justify-center mr-3">
                        <FaGraduationCap className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Manage Certifications</span>
                    </Link>
                    <Link href="/dashboard/teaching-materials" className="flex items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-800 flex items-center justify-center mr-3">
                        <FaBook className="h-4 w-4 text-red-600 dark:text-red-400" />
                      </div>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Teaching Materials</span>
                    </Link>
                    <Link href="/dashboard/schedule" className="flex items-center p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-800 flex items-center justify-center mr-3">
                        <FaCalendarAlt className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Teaching Schedule</span>
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormateurDashboard
