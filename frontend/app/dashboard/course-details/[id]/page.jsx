'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../../../components/Navbar';
import Link from 'next/link';
import {
  FaArrowLeft,
  FaEdit,
  FaUsers,
  FaStar,
  FaEye,
  FaChartLine,
  FaComments,
  FaReply,
  FaTrash,
  FaUserGraduate,
  FaRegClock,
  FaPlayCircle,
  FaBook,
  FaGraduationCap,
  FaMoneyBillWave,
  FaExclamationTriangle,
  FaCheck,
  FaLock,
  FaLockOpen,
  FaSearch,
  FaVideo,
  FaSlack
} from 'react-icons/fa';
import { useUser } from '../../../../context/UserContext';
import EditCourseModal from '../../../../components/modals/EditCourseModal';
import GoogleMeetIntegration from '../../../../components/integrations/GoogleMeetIntegration';
import SlackIntegration from '../../../../components/integrations/SlackIntegration';

export default function CourseDetails({ params }) {
  const router = useRouter();
  const courseId = use(params).id;
  const { userData: user, loading: userLoading } = useUser();

  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'content', 'students', 'comments', 'live-sessions', 'slack'
  const [comments, setComments] = useState([]);
  const [replyText, setReplyText] = useState({});
  const [students, setStudents] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newLesson, setNewLesson] = useState({
    title: '',
    duration: '',
    type: 'video',
    content: '',
    videoSource: 'external', // 'external' or 'upload'
    videoUrl: '',
    videoFile: null
  });
  const [isAddingLesson, setIsAddingLesson] = useState(false);

  // Mock data for demonstration
  const mockCourse = {
    id: parseInt(courseId),
    title: "Full-Stack Web Development",
    description: "Master modern web development with React, Node.js, and MongoDB. This comprehensive course covers everything from frontend to backend development, database design, and deployment strategies. You'll build real-world projects and gain the skills needed to become a professional full-stack developer.",
    thumbnail: "/photos/Academy/full.png",
    students: 124,
    rating: 4.8,
    progress: 100,
    status: "active",
    lastUpdated: "2023-10-15",
    price: 199.99,
    views: 2450,
    completionRate: 68,
    revenue: 12400,
    duration: "12 weeks",
    level: "Intermediate",
    category: "Web Development",
    tags: ["React", "Node.js", "MongoDB", "JavaScript", "HTML/CSS"],
    instructor: {
      name: "Ahmed Khalid",
      avatar: "/photos/users/instructor1.jpg",
      bio: "Senior Web Developer with 10+ years of experience"
    }
  };

  const mockComments = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "/photos/users/user1.jpg",
        role: "Student"
      },
      text: "The course content is excellent, but I'm having trouble with the MongoDB section. Could you provide more examples?",
      date: "2023-11-20",
      replies: [
        {
          id: 101,
          user: {
            name: "Ahmed Khalid",
            avatar: "/photos/users/instructor1.jpg",
            role: "Instructor"
          },
          text: "Thanks for your feedback, Sarah! I'll add more MongoDB examples in the next update. In the meantime, check out the additional resources in the course materials.",
          date: "2023-11-21"
        }
      ]
    },
    {
      id: 2,
      user: {
        name: "Michael Chen",
        avatar: "/photos/users/user2.jpg",
        role: "Student"
      },
      text: "Great course! The React section was particularly helpful. I would love to see more advanced topics like Redux and GraphQL in future updates.",
      date: "2023-11-18",
      replies: []
    },
    {
      id: 3,
      user: {
        name: "Jessica Williams",
        avatar: "/photos/users/user3.jpg",
        role: "Student"
      },
      text: "I'm having issues with the deployment section. The instructions don't seem to work with the latest version of Heroku.",
      date: "2023-11-15",
      replies: []
    }
  ];

  const mockStudents = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/photos/users/user1.jpg",
      enrollDate: "2023-10-05",
      progress: 75,
      lastActive: "2023-11-25"
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "/photos/users/user2.jpg",
      enrollDate: "2023-10-10",
      progress: 60,
      lastActive: "2023-11-23"
    },
    {
      id: 3,
      name: "Jessica Williams",
      avatar: "/photos/users/user3.jpg",
      enrollDate: "2023-10-12",
      progress: 45,
      lastActive: "2023-11-20"
    },
    {
      id: 4,
      name: "David Rodriguez",
      avatar: "/photos/users/user4.jpg",
      enrollDate: "2023-10-15",
      progress: 30,
      lastActive: "2023-11-18"
    },
    {
      id: 5,
      name: "Emma Thompson",
      avatar: "/photos/users/user5.jpg",
      enrollDate: "2023-10-20",
      progress: 25,
      lastActive: "2023-11-15"
    }
  ];

  const mockLessons = [
    {
      id: 1,
      title: "Introduction to Web Development",
      duration: "45 min",
      type: "video",
      content: "In this lesson, we'll introduce you to the world of web development. You'll learn about the different technologies used in web development, the role of frontend and backend developers, and the tools you'll need to get started.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      isPublished: true,
      views: 120
    },
    {
      id: 2,
      title: "HTML & CSS Fundamentals",
      duration: "1 hr 15 min",
      type: "video",
      content: "In this lesson, we'll cover the basics of HTML and CSS. You'll learn how to structure a web page with HTML and style it with CSS. We'll also cover responsive design principles to make your websites look great on all devices.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      isPublished: true,
      views: 115
    },
    {
      id: 3,
      title: "JavaScript Basics",
      duration: "1 hr 30 min",
      type: "video",
      content: "In this lesson, we'll introduce you to JavaScript, the programming language of the web. You'll learn about variables, data types, functions, and control flow. We'll also cover how to use JavaScript to make your web pages interactive.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      isPublished: true,
      views: 105
    },
    {
      id: 4,
      title: "Working with DOM",
      duration: "1 hr",
      type: "video",
      content: "In this lesson, we'll dive deeper into JavaScript and learn how to manipulate the Document Object Model (DOM). You'll learn how to select elements, modify content, and handle events to create dynamic web pages.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      isPublished: true,
      views: 98
    },
    {
      id: 5,
      title: "Introduction to React",
      duration: "1 hr 45 min",
      type: "video",
      content: "In this lesson, we'll introduce you to React, a popular JavaScript library for building user interfaces. You'll learn about components, props, and state, and how to create a simple React application.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      isPublished: true,
      views: 92
    },
    {
      id: 6,
      title: "React Hooks and State Management",
      duration: "2 hr",
      type: "video",
      content: "In this lesson, we'll dive deeper into React and learn about hooks and state management. You'll learn how to use useState, useEffect, and other hooks to manage state and side effects in your React applications.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      isPublished: true,
      views: 85
    },
    {
      id: 7,
      title: "Node.js Fundamentals",
      duration: "1 hr 30 min",
      type: "video",
      content: "In this lesson, we'll introduce you to Node.js, a JavaScript runtime that allows you to run JavaScript on the server. You'll learn how to create a simple server, handle requests, and work with the file system.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      isPublished: true,
      views: 78
    },
    {
      id: 8,
      title: "MongoDB and Database Design",
      duration: "1 hr 45 min",
      type: "video",
      content: "In this lesson, we'll introduce you to MongoDB, a popular NoSQL database. You'll learn how to design a database schema, perform CRUD operations, and connect your Node.js application to MongoDB.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      isPublished: true,
      views: 65
    },
    {
      id: 9,
      title: "Building RESTful APIs",
      duration: "2 hr",
      type: "video",
      content: "In this lesson, we'll learn how to build RESTful APIs with Node.js and Express. You'll learn about HTTP methods, routes, middleware, and how to structure your API for maximum flexibility and maintainability.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      isPublished: false,
      views: 0
    },
    {
      id: 10,
      title: "Deployment and CI/CD",
      duration: "1 hr 30 min",
      type: "video",
      content: "In this lesson, we'll learn how to deploy your full-stack application to the cloud. You'll learn about different hosting options, continuous integration and deployment (CI/CD), and best practices for production environments.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      isPublished: false,
      views: 0
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCourse(mockCourse);
      setComments(mockComments);
      setStudents(mockStudents);
      setLessons(mockLessons);
      setIsLoading(false);
    }, 1000);
  }, [courseId]);

  const handleReply = (commentId) => {
    if (!replyText[commentId] || replyText[commentId].trim() === '') return;

    // In a real app, you would send this to an API
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            {
              id: Date.now(),
              user: {
                name: user?.name || "Instructor",
                avatar: user?.profileImg || "/fighterfish.png",
                role: "Instructor"
              },
              text: replyText[commentId],
              date: new Date().toISOString().split('T')[0]
            }
          ]
        };
      }
      return comment;
    });

    setComments(updatedComments);
    setReplyText({...replyText, [commentId]: ''});
  };

  const toggleLessonStatus = (lessonId) => {
    setLessons(lessons.map(lesson =>
      lesson.id === lessonId
        ? {...lesson, isPublished: !lesson.isPublished}
        : lesson
    ));
  };

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleUpdateCourse = (updatedCourse) => {
    setCourse(updatedCourse);
    // In a real app, you would also update the course in the database
  };

  const convertToEmbedUrl = (url) => {
    // Convert YouTube URL to embed URL
    if (url.includes('youtube.com/watch')) {
      const videoId = new URL(url).searchParams.get('v');
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    // Convert YouTube short URL to embed URL
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    // Convert Google Drive URL to embed URL
    if (url.includes('drive.google.com/file/d/')) {
      const fileId = url.match(/\/d\/(.*?)\//) || url.match(/id=(.*?)&/);
      if (fileId && fileId[1]) {
        return `https://drive.google.com/file/d/${fileId[1]}/preview`;
      }
    }

    // Convert Vimeo URL to embed URL
    if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      if (videoId) {
        return `https://player.vimeo.com/video/${videoId}`;
      }
    }

    // If no conversion is needed or possible, return the original URL
    return url;
  };

  const handleAddLesson = () => {
    if (!newLesson.title || !newLesson.duration) return;

    // Convert video URL to embed URL if it's a video lesson
    let processedVideoUrl = newLesson.videoUrl;
    if (newLesson.type === 'video' && newLesson.videoUrl) {
      processedVideoUrl = convertToEmbedUrl(newLesson.videoUrl);
    }

    const newLessonWithId = {
      ...newLesson,
      videoUrl: processedVideoUrl,
      id: Date.now(), // Generate a unique ID
      isPublished: true,
      views: 0
    };

    setLessons([...lessons, newLessonWithId]);
    setNewLesson({
      title: '',
      duration: '',
      type: 'video',
      content: '',
      videoUrl: '',
      videoPreview: null
    });
    setIsAddingLesson(false);
  };

  const handleDeleteLesson = (lessonId) => {
    setLessons(lessons.filter(lesson => lesson.id !== lessonId));
  };

  const handleLessonInputChange = (e) => {
    const { name, value } = e.target;
    setNewLesson({
      ...newLesson,
      [name]: value
    });
  };

  const handleVideoFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload the file to a server or cloud storage
      // and get a URL to the uploaded file
      // For now, we'll just store the file object and create a temporary URL
      const fileUrl = URL.createObjectURL(file);
      setNewLesson({
        ...newLesson,
        videoFile: file,
        videoUrl: fileUrl
      });
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button and Course Title */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-4"
          >
            <FaArrowLeft className="mr-2" /> Back to Courses
          </button>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{course.title}</h1>
            <div className="mt-2 md:mt-0">
              <button
                onClick={handleOpenEditModal}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-colors"
              >
                <FaEdit className="mr-2" /> Edit Course
              </button>
            </div>
          </div>
        </div>

        {/* Course Overview and Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Course Info */}
          <div className="lg:col-span-2">
            {/* Course Image and Quick Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="relative h-64">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <div className="flex items-center text-white space-x-4">
                    <div className="flex items-center">
                      <FaUsers className="mr-1" />
                      <span>{course.students} students</span>
                    </div>
                    <div className="flex items-center">
                      <FaStar className="mr-1 text-yellow-500" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <FaEye className="mr-1" />
                      <span>{course.views.toLocaleString()} views</span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    course.status === 'active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {course.status === 'active' ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-md text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4">{course.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex flex-col">
                    <span className="text-gray-500 dark:text-gray-400">Price</span>
                    <span className="font-medium text-gray-900 dark:text-white">${course.price}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500 dark:text-gray-400">Duration</span>
                    <span className="font-medium text-gray-900 dark:text-white">{course.duration}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500 dark:text-gray-400">Level</span>
                    <span className="font-medium text-gray-900 dark:text-white">{course.level}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500 dark:text-gray-400">Category</span>
                    <span className="font-medium text-gray-900 dark:text-white">{course.category}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-4 py-3 text-sm font-medium ${
                      activeTab === 'overview'
                        ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    <FaChartLine className="inline mr-2" /> Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('content')}
                    className={`px-4 py-3 text-sm font-medium ${
                      activeTab === 'content'
                        ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    <FaBook className="inline mr-2" /> Content
                  </button>
                  <button
                    onClick={() => setActiveTab('students')}
                    className={`px-4 py-3 text-sm font-medium ${
                      activeTab === 'students'
                        ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    <FaUserGraduate className="inline mr-2" /> Students
                  </button>
                  <button
                    onClick={() => setActiveTab('comments')}
                    className={`px-4 py-3 text-sm font-medium ${
                      activeTab === 'comments'
                        ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    <FaComments className="inline mr-2" /> Comments
                  </button>
                  <button
                    onClick={() => setActiveTab('live-sessions')}
                    className={`px-4 py-3 text-sm font-medium ${
                      activeTab === 'live-sessions'
                        ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    <FaVideo className="inline mr-2" /> Live Sessions
                  </button>
                  <button
                    onClick={() => setActiveTab('slack')}
                    className={`px-4 py-3 text-sm font-medium ${
                      activeTab === 'slack'
                        ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    <FaSlack className="inline mr-2" /> Slack
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Course Performance</h3>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Completion Rate */}
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Completion Rate</h4>
                          <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">{course.completionRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${course.completionRate}%` }}
                          ></div>
                        </div>
                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                          Percentage of enrolled students who completed the course
                        </p>
                      </div>

                      {/* Revenue */}
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Revenue</h4>
                          <span className="text-lg font-semibold text-green-600 dark:text-green-400">${course.revenue.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center">
                          <FaMoneyBillWave className="text-green-500 mr-2" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            From {course.students} enrolled students
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                          Average revenue per student: ${(course.revenue / course.students).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Course Content Stats */}
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Content Statistics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 flex flex-col items-center justify-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                          {lessons.length}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Total Lessons</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 flex flex-col items-center justify-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                          {lessons.filter(lesson => lesson.isPublished).length}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Published Lessons</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 flex flex-col items-center justify-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                          {lessons.reduce((total, lesson) => total + (lesson.isPublished ? lesson.views : 0), 0).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Total Lesson Views</div>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6">
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-600">
                            <img
                              src={students[0]?.avatar || "/fighterfish.png"}
                              alt={students[0]?.name || "Student"}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/fighterfish.png";
                              }}
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {students[0]?.name || "Student"} enrolled in the course
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {students[0]?.enrollDate || "Recently"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-600">
                            <img
                              src={comments[0]?.user?.avatar || "/fighterfish.png"}
                              alt={comments[0]?.user?.name || "Student"}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/fighterfish.png";
                              }}
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {comments[0]?.user?.name || "Student"} left a comment
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {comments[0]?.date || "Recently"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Content Tab */}
                {activeTab === 'content' && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Course Content</h3>
                      <button
                        onClick={() => setIsAddingLesson(!isAddingLesson)}
                        className="inline-flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md shadow-sm transition-colors"
                      >
                        {isAddingLesson ? (
                          <>
                            <FaTimes className="mr-1" /> Cancel
                          </>
                        ) : (
                          <>
                            <FaPlus className="mr-1" /> Add Lesson
                          </>
                        )}
                      </button>
                    </div>

                    {isAddingLesson && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                        <h4 className="text-md font-medium text-blue-700 dark:text-blue-400 mb-3">Add New Lesson</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Lesson Title*
                            </label>
                            <input
                              type="text"
                              id="title"
                              name="title"
                              value={newLesson.title}
                              onChange={handleLessonInputChange}
                              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="e.g. Introduction to HTML"
                            />
                          </div>
                          <div>
                            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Duration*
                            </label>
                            <input
                              type="text"
                              id="duration"
                              name="duration"
                              value={newLesson.duration}
                              onChange={handleLessonInputChange}
                              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="e.g. 15 min"
                            />
                          </div>
                        </div>

                        <div className="mb-4">
                          <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Lesson Type
                          </label>
                          <select
                            id="type"
                            name="type"
                            value={newLesson.type}
                            onChange={handleLessonInputChange}
                            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="video">Video</option>
                            <option value="text">Text</option>
                          </select>
                        </div>

                        {newLesson.type === 'video' && (
                          <div className="mb-4">
                            <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Video URL
                            </label>
                            <div className="flex">
                              <input
                                type="text"
                                id="videoUrl"
                                name="videoUrl"
                                value={newLesson.videoUrl}
                                onChange={handleLessonInputChange}
                                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g. https://www.youtube.com/watch?v=... or https://drive.google.com/file/d/..."
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (newLesson.videoUrl) {
                                    const embedUrl = convertToEmbedUrl(newLesson.videoUrl);
                                    setNewLesson({...newLesson, videoUrl: embedUrl});
                                  }
                                }}
                                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors"
                              >
                                Preview
                              </button>
                            </div>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                              Supported platforms: YouTube, Google Drive, Vimeo, etc. The video will be embedded directly in the course.
                            </p>

                            {/* Video Preview */}
                            {newLesson.videoUrl && (
                              <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  Video Preview
                                </label>
                                <div className="aspect-video bg-black rounded-md overflow-hidden">
                                  <iframe
                                    className="w-full h-full"
                                    src={newLesson.videoUrl}
                                    title="Video Preview"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  ></iframe>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        <div className="mb-4">
                          <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Lesson Content
                          </label>
                          <textarea
                            id="content"
                            name="content"
                            value={newLesson.content}
                            onChange={handleLessonInputChange}
                            rows={4}
                            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter lesson content or description here..."
                          ></textarea>
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={handleAddLesson}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-colors"
                          >
                            <FaPlus className="mr-2" /> Add Lesson
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6">
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {lessons.length} lessons ({lessons.filter(lesson => lesson.isPublished).length} published)
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Total duration: {lessons.reduce((total, lesson) => {
                            const duration = lesson.duration;
                            const match = duration.match(/(\d+)\s*hr\s*(\d+)?\s*min|(\d+)\s*min/);
                            let minutes = 0;
                            if (match) {
                              if (match[1] && match[2]) {
                                // Format: "X hr Y min"
                                minutes = parseInt(match[1]) * 60 + parseInt(match[2]);
                              } else if (match[3]) {
                                // Format: "Z min"
                                minutes = parseInt(match[3]);
                              } else if (match[1]) {
                                // Format: "X hr"
                                minutes = parseInt(match[1]) * 60;
                              }
                            }
                            return total + minutes;
                          }, 0) / 60} hours
                        </div>
                      </div>

                      {lessons.length > 0 ? (
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-100 dark:bg-gray-800">
                              <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                  Lesson
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                  Duration
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                  Type
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                  Views
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                  Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                              {lessons.map((lesson) => (
                                <tr key={lesson.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">{lesson.title}</div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">{lesson.duration}</div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                      {lesson.type === 'video' ? (
                                        <span className="flex items-center">
                                          <FaPlayCircle className="mr-1 text-blue-500" /> Video
                                        </span>
                                      ) : (
                                        <span className="flex items-center">
                                          <FaBook className="mr-1 text-green-500" /> Text
                                        </span>
                                      )}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                      {lesson.isPublished ? (lesson.views || 0) : '-'}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                      lesson.isPublished
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                    }`}>
                                      {lesson.isPublished ? 'Published' : 'Draft'}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                      onClick={() => toggleLessonStatus(lesson.id)}
                                      className={`mr-2 ${
                                        lesson.isPublished
                                          ? 'text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300'
                                          : 'text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300'
                                      }`}
                                      title={lesson.isPublished ? 'Unpublish' : 'Publish'}
                                    >
                                      {lesson.isPublished ? <FaLock /> : <FaLockOpen />}
                                    </button>
                                    <button
                                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-2"
                                      title="Edit"
                                    >
                                      <FaEdit />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteLesson(lesson.id)}
                                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                      title="Delete"
                                    >
                                      <FaTrash />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <FaBook className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No lessons yet</h3>
                          <p className="text-gray-500 dark:text-gray-400 mb-4">Start adding lessons to your course</p>
                          {!isAddingLesson && (
                            <button
                              onClick={() => setIsAddingLesson(true)}
                              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-colors"
                            >
                              <FaPlus className="mr-2" /> Add Your First Lesson
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Students Tab */}
                {activeTab === 'students' && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Enrolled Students</h3>
                      <div className="relative">
                        <input
                          type="text"
                          className="pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          placeholder="Search students..."
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaSearch className="text-gray-400" size={14} />
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6">
                      <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead className="bg-gray-100 dark:bg-gray-800">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Student
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Enrollment Date
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Progress
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
                            {students.map((student) => (
                              <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-600">
                                      <img
                                        src={student.avatar}
                                        alt={student.name}
                                        className="h-full w-full object-cover"
                                        onError={(e) => {
                                          e.target.onerror = null;
                                          e.target.src = "/fighterfish.png";
                                        }}
                                      />
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900 dark:text-white">{student.name}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-500 dark:text-gray-400">{student.enrollDate}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mr-2 max-w-[100px]">
                                      <div
                                        className="bg-blue-600 h-2.5 rounded-full"
                                        style={{ width: `${student.progress}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">{student.progress}%</span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-500 dark:text-gray-400">{student.lastActive}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <button
                                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-2"
                                    title="Send Message"
                                  >
                                    <FaReply />
                                  </button>
                                  <button
                                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                    title="Remove Student"
                                  >
                                    <FaTrash />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Pagination */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Showing <span className="font-medium">{students.length}</span> of <span className="font-medium">{course.students}</span> students
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                            Previous
                          </button>
                          <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                            Next
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Student Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Completion Rate</h4>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                          {course.completionRate}%
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Average progress across all students
                        </p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Active Students</h4>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                          {students.filter(s => new Date(s.lastActive) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Students active in the last 7 days
                        </p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Enrollments</h4>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                          {students.filter(s => new Date(s.enrollDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          New students in the last 30 days
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Comments Tab */}
                {activeTab === 'comments' && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Student Comments</h3>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {comments.length} comments · {comments.reduce((total, comment) => total + comment.replies.length, 0)} replies
                      </div>
                    </div>

                    <div className="space-y-6 mb-6">
                      {comments.map((comment) => (
                        <div key={comment.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                          {/* Main Comment */}
                          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex">
                              <div className="flex-shrink-0 mr-3">
                                <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-600">
                                  <img
                                    src={comment.user.avatar}
                                    alt={comment.user.name}
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = "/fighterfish.png";
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">{comment.user.name}</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{comment.date}</p>
                                  </div>
                                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-md text-xs">
                                    {comment.user.role}
                                  </span>
                                </div>
                                <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                                  {comment.text}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Replies */}
                          {comment.replies.length > 0 && (
                            <div className="bg-gray-50 dark:bg-gray-700/50 p-4">
                              <h5 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Replies</h5>
                              <div className="space-y-4">
                                {comment.replies.map((reply) => (
                                  <div key={reply.id} className="flex">
                                    <div className="flex-shrink-0 mr-3">
                                      <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-600">
                                        <img
                                          src={reply.user.avatar}
                                          alt={reply.user.name}
                                          className="h-full w-full object-cover"
                                          onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "/fighterfish.png";
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between">
                                        <div>
                                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">{reply.user.name}</h4>
                                          <p className="text-xs text-gray-500 dark:text-gray-400">{reply.date}</p>
                                        </div>
                                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-md text-xs">
                                          {reply.user.role}
                                        </span>
                                      </div>
                                      <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                                        {reply.text}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Reply Form */}
                          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex">
                              <div className="flex-shrink-0 mr-3">
                                <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-600">
                                  <img
                                    src={user?.profileImg || "/fighterfish.png"}
                                    alt={user?.name || "Instructor"}
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = "/fighterfish.png";
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="flex-1">
                                <textarea
                                  className="w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
                                  rows="2"
                                  placeholder="Write a reply..."
                                  value={replyText[comment.id] || ''}
                                  onChange={(e) => setReplyText({...replyText, [comment.id]: e.target.value})}
                                ></textarea>
                                <div className="mt-2 flex justify-end">
                                  <button
                                    onClick={() => handleReply(comment.id)}
                                    className="inline-flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md shadow-sm transition-colors"
                                    disabled={!replyText[comment.id] || replyText[comment.id].trim() === ''}
                                  >
                                    <FaReply className="mr-1" /> Reply
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {comments.length === 0 && (
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
                          <FaComments className="h-8 w-8" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No comments yet</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          There are no comments on this course yet.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Live Sessions Tab */}
                {activeTab === 'live-sessions' && (
                  <GoogleMeetIntegration
                    courseId={courseId}
                    isInstructor={true}
                  />
                )}

                {/* Slack Tab */}
                {activeTab === 'slack' && (
                  <SlackIntegration
                    courseId={courseId}
                    isInstructor={true}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Stats Summary */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Course Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 dark:text-gray-400">Total Students</span>
                    <span className="font-medium text-gray-900 dark:text-white">{course.students}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 dark:text-gray-400">Total Views</span>
                    <span className="font-medium text-gray-900 dark:text-white">{course.views.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 dark:text-gray-400">Completion Rate</span>
                    <span className="font-medium text-gray-900 dark:text-white">{course.completionRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 dark:text-gray-400">Total Revenue</span>
                    <span className="font-medium text-gray-900 dark:text-white">${course.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 dark:text-gray-400">Last Updated</span>
                    <span className="font-medium text-gray-900 dark:text-white">{course.lastUpdated}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={handleOpenEditModal}
                    className="flex items-center w-full px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                  >
                    <FaEdit className="mr-2" /> Edit Course Details
                  </button>
                  <button
                    className={`flex items-center w-full px-4 py-2 ${
                      course.status === 'active'
                        ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
                        : 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                    } rounded-md hover:bg-opacity-80 transition-colors`}
                  >
                    {course.status === 'active'
                      ? <><FaLock className="mr-2" /> Unpublish Course</>
                      : <><FaLockOpen className="mr-2" /> Publish Course</>
                    }
                  </button>
                  <Link
                    href={`/courses/${course.id}`}
                    target="_blank"
                    className="flex items-center w-full px-4 py-2 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-md hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                  >
                    <FaEye className="mr-2" /> Preview Course
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Course Modal */}
      <EditCourseModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        course={course}
        onSave={handleUpdateCourse}
      />
    </div>
  );
}
