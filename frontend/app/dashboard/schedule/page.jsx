"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import { FaCalendarAlt, FaChalkboardTeacher, FaPlus, FaFilter } from 'react-icons/fa';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import ScheduleCalendar from '../../../components/schedule/ScheduleCalendar';
import SessionForm from '../../../components/schedule/SessionForm';

const SchedulePage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('week'); // 'day', 'week', 'month'
  const [currentDate, setCurrentDate] = useState(new Date());
  const [schedules, setSchedules] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSession, setNewSession] = useState({
    title: '',
    courseId: '',
    date: '',
    startTime: '',
    endTime: '',
    description: '',
    studentLimit: 20,
  });
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'upcoming', 'past'

  // Mock data for demonstration
  const mockCourses = [
    { id: 1, title: 'Full-Stack Web Development' },
    { id: 2, title: 'UI/UX Design Masterclass' },
    { id: 3, title: 'Python for Data Science' },
  ];

  const mockSchedules = [
    {
      id: 1,
      title: 'JavaScript Fundamentals',
      courseId: 1,
      courseName: 'Full-Stack Web Development',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1),
      startTime: '14:00',
      endTime: '16:00',
      description: 'Introduction to JavaScript variables, functions, and control flow.',
      studentCount: 24,
      studentLimit: 30,
      location: 'Online - Zoom',
    },
    {
      id: 2,
      title: 'User Research Methods',
      courseId: 2,
      courseName: 'UI/UX Design Masterclass',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 2),
      startTime: '10:00',
      endTime: '12:00',
      description: 'Learn effective user research techniques and methodologies.',
      studentCount: 18,
      studentLimit: 25,
      location: 'Online - Google Meet',
    },
    {
      id: 3,
      title: 'Introduction to NumPy',
      courseId: 3,
      courseName: 'Python for Data Science',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 4),
      startTime: '15:30',
      endTime: '17:30',
      description: 'Getting started with NumPy arrays and operations.',
      studentCount: 12,
      studentLimit: 20,
      location: 'Online - Zoom',
    },
  ];

  useEffect(() => {
    // Check authentication
    const accessToken = Cookies.get('access_token');
    if (accessToken) {
      try {
        const decoded = jwt.decode(accessToken);
        if (decoded && decoded.user) {
          setUser(decoded.user);
          // Load mock data
          setCourses(mockCourses);
          setSchedules(mockSchedules);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  // Format date for display
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Get days of the current week
  const getDaysOfWeek = () => {
    const days = [];
    const day = new Date(currentDate);
    day.setDate(day.getDate() - day.getDay()); // Start with Sunday

    for (let i = 0; i < 7; i++) {
      days.push(new Date(day));
      day.setDate(day.getDate() + 1);
    }
    return days;
  };

  // Filter schedules based on the selected view and filter
  const filteredSchedules = () => {
    let filtered = [...schedules];

    // Apply date filter based on view
    if (view === 'day') {
      filtered = filtered.filter(schedule =>
        schedule.date.getDate() === currentDate.getDate() &&
        schedule.date.getMonth() === currentDate.getMonth() &&
        schedule.date.getFullYear() === currentDate.getFullYear()
      );
    } else if (view === 'week') {
      const weekStart = new Date(currentDate);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);

      filtered = filtered.filter(schedule =>
        schedule.date >= weekStart && schedule.date <= weekEnd
      );
    } else if (view === 'month') {
      filtered = filtered.filter(schedule =>
        schedule.date.getMonth() === currentDate.getMonth() &&
        schedule.date.getFullYear() === currentDate.getFullYear()
      );
    }

    // Apply status filter
    const now = new Date();
    if (filter === 'upcoming') {
      filtered = filtered.filter(schedule => schedule.date >= now);
    } else if (filter === 'past') {
      filtered = filtered.filter(schedule => schedule.date < now);
    }

    return filtered;
  };

  // Handle adding a new session
  const handleAddSession = (formData) => {
    // In a real app, you would send this to your API
    const newId = schedules.length + 1;
    const selectedCourse = courses.find(c => c.id === parseInt(formData.courseId));

    const newScheduleItem = {
      id: newId,
      title: formData.title,
      courseId: parseInt(formData.courseId),
      courseName: selectedCourse ? selectedCourse.title : '',
      date: new Date(formData.date),
      startTime: formData.startTime,
      endTime: formData.endTime,
      description: formData.description,
      studentCount: 0,
      studentLimit: parseInt(formData.studentLimit),
      location: formData.location || 'Online - Zoom',
    };

    setSchedules([...schedules, newScheduleItem]);
    setShowAddModal(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                <FaCalendarAlt className="mr-3 text-blue-600 dark:text-blue-400" />
                Teaching Schedule
              </h1>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                Manage your upcoming teaching sessions and classes
              </p>
            </div>

            <div className="mt-4 md:mt-0">
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <FaPlus className="mr-2" />
                Add Teaching Session
              </button>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* View Selector */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-700 dark:text-gray-300">View:</span>
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  className={`px-3 py-1 rounded-md ${view === 'day' ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-300'}`}
                  onClick={() => setView('day')}
                >
                  Day
                </button>
                <button
                  className={`px-3 py-1 rounded-md ${view === 'week' ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-300'}`}
                  onClick={() => setView('week')}
                >
                  Week
                </button>
                <button
                  className={`px-3 py-1 rounded-md ${view === 'month' ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-300'}`}
                  onClick={() => setView('month')}
                >
                  Month
                </button>
              </div>
            </div>

            {/* Date Navigation */}
            <div className="flex items-center space-x-4">
              <button
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                onClick={() => {
                  const newDate = new Date(currentDate);
                  if (view === 'day') {
                    newDate.setDate(newDate.getDate() - 1);
                  } else if (view === 'week') {
                    newDate.setDate(newDate.getDate() - 7);
                  } else {
                    newDate.setMonth(newDate.getMonth() - 1);
                  }
                  setCurrentDate(newDate);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>

              <span className="font-medium text-gray-900 dark:text-white">
                {view === 'day' && formatDate(currentDate)}
                {view === 'week' && `Week of ${formatDate(getDaysOfWeek()[0])}`}
                {view === 'month' && currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>

              <button
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                onClick={() => {
                  const newDate = new Date(currentDate);
                  if (view === 'day') {
                    newDate.setDate(newDate.getDate() + 1);
                  } else if (view === 'week') {
                    newDate.setDate(newDate.getDate() + 7);
                  } else {
                    newDate.setMonth(newDate.getMonth() + 1);
                  }
                  setCurrentDate(newDate);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>

              <button
                className="ml-2 px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                onClick={() => setCurrentDate(new Date())}
              >
                Today
              </button>
            </div>

            {/* Filter */}
            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-500 dark:text-gray-400" />
              <select
                className="bg-gray-100 dark:bg-gray-700 border-0 rounded-md text-gray-700 dark:text-gray-300 py-1 pl-2 pr-8"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Sessions</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
            </div>
          </div>
        </div>

        {/* Schedule Display */}
        <ScheduleCalendar
          schedules={filteredSchedules()}
          view={view}
          currentDate={currentDate}
          onEditSession={(session) => {
            // In a real app, you would implement edit functionality here
            console.log('Edit session:', session);
          }}
          onDeleteSession={(sessionId) => {
            // In a real app, you would implement delete functionality here
            setSchedules(schedules.filter(s => s.id !== sessionId));
          }}
        />
      </div>

      {/* Add Session Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Add Teaching Session</h2>
              <SessionForm
                courses={courses}
                onSubmit={handleAddSession}
                onCancel={() => setShowAddModal(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchedulePage;
