'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaClock, FaUsers, FaStar, FaGraduationCap, FaDownload, FaCheck, FaQuestion, FaArrowUp, FaArrowDown, FaRegComment, FaPlay } from 'react-icons/fa';
import Navbar from '../../../../components/Navbar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../../../context/AuthContext';
import VideoPlaylist from '../../../../components/VideoPlaylist';

// Sample course data (in a real app, this would come from an API)
const coursesData = [
  {
    id: 1,
    title: "Full-Stack Web Development",
    description: "Master modern web development with React, Node.js, and MongoDB. This comprehensive course covers everything from frontend development with React to backend development with Node.js and Express, and database management with MongoDB. You'll learn how to build complete, production-ready web applications from scratch.",
    longDescription: "This comprehensive course is designed to take you from beginner to professional in full-stack web development. You'll start by learning the fundamentals of HTML, CSS, and JavaScript before diving into modern frontend development with React. You'll build interactive user interfaces, implement state management, and create responsive designs.\n\nOn the backend, you'll learn how to build RESTful APIs with Node.js and Express, handle authentication and authorization, and connect to databases. You'll master MongoDB for data storage and retrieval, and learn how to deploy your applications to the cloud.\n\nBy the end of this course, you'll have built several real-world projects that you can add to your portfolio, and you'll have the skills and confidence to build your own web applications from scratch.",
    instructor: "Alex Johnson",
    instructorBio: "Alex has over 10 years of experience as a full-stack developer and has worked with companies like Google and Amazon. He's passionate about teaching and has helped thousands of students launch their careers in web development.",
    price: "250 DT",
    rating: 4.9,
    duration: "12 weeks",
    totalHours: "80 hours",
    students: 1240,
    level: "Intermediate",
    category: "Web Development",
    image: "/photos/Academy/full.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    progress: 0,
    completed: false,
    currentVideoIndex: 0,
    videos: [
      {
        id: 1,
        title: "Introduction to Web Development",
        description: "Overview of the course and what you'll learn",
        duration: "10:15",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        completed: true
      },
      {
        id: 2,
        title: "HTML Fundamentals",
        description: "Learn the basics of HTML markup",
        duration: "15:30",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        completed: false
      },
      {
        id: 3,
        title: "CSS Styling Basics",
        description: "Introduction to CSS and styling web pages",
        duration: "18:45",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        completed: false
      },
      {
        id: 4,
        title: "JavaScript Fundamentals",
        description: "Getting started with JavaScript programming",
        duration: "22:10",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        completed: false
      },
      {
        id: 5,
        title: "Building Your First Web Page",
        description: "Putting it all together to create a complete web page",
        duration: "25:30",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        completed: false
      },
      {
        id: 6,
        title: "Introduction to React",
        description: "Getting started with the React library",
        duration: "28:15",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        completed: false
      },
      {
        id: 7,
        title: "Node.js Basics",
        description: "Server-side JavaScript with Node.js",
        duration: "20:45",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        completed: false
      }
    ],
    attachments: [
      { name: "Course Syllabus", type: "pdf", size: "1.2 MB", url: "#" },
      { name: "Starter Code", type: "zip", size: "4.5 MB", url: "#" },
      { name: "Cheat Sheet", type: "pdf", size: "0.8 MB", url: "#" }
    ],
    faqs: [
      {
        question: "Do I need prior programming experience?",
        answer: "Some basic knowledge of HTML, CSS, and JavaScript is recommended, but we'll cover the fundamentals in the first few modules."
      },
      {
        question: "Will I get a certificate upon completion?",
        answer: "Yes, you'll receive a certificate of completion that you can add to your resume and LinkedIn profile."
      },
      {
        question: "How much time should I dedicate per week?",
        answer: "We recommend at least 10-15 hours per week to get the most out of this course."
      }
    ],
    studentQuestions: [
      {
        id: 1,
        user: "Sarah M.",
        question: "How does this course compare to other full-stack courses?",
        answer: "This course is more comprehensive and includes more real-world projects than most other courses. We also provide more personalized feedback on your code.",
        votes: 24,
        date: "2 weeks ago"
      },
      {
        id: 2,
        user: "Michael T.",
        question: "Is there any support if I get stuck on a project?",
        answer: "Yes, we have a dedicated Discord community where you can ask questions and get help from instructors and other students.",
        votes: 18,
        date: "1 month ago"
      },
      {
        id: 3,
        user: "Jessica L.",
        question: "Will this course be updated with new content?",
        answer: "Absolutely! We regularly update the course with new content and technologies. All updates are free for existing students.",
        votes: 15,
        date: "3 months ago"
      }
    ]
  },
  {
    id: 2,
    title: "UI/UX Design Masterclass",
    description: "Learn to create beautiful, user-friendly interfaces that convert",
    longDescription: "This comprehensive UI/UX Design Masterclass will teach you everything you need to know to create stunning, user-friendly interfaces that not only look great but also convert visitors into customers. You'll learn the principles of good design, user research methods, wireframing, prototyping, and usability testing.\n\nYou'll master industry-standard tools like Figma, Adobe XD, and Sketch, and learn how to create design systems that ensure consistency across your projects. You'll also learn how to collaborate effectively with developers to ensure your designs are implemented correctly.\n\nBy the end of this course, you'll have a portfolio of real-world projects that showcase your skills to potential employers or clients.",
    instructor: "Sarah Williams",
    instructorBio: "Sarah is a senior UI/UX designer with experience at top tech companies and design agencies. She's known for her user-centered approach and has designed products used by millions of people worldwide.",
    price: "180 DT",
    rating: 4.8,
    duration: "8 weeks",
    totalHours: "40 hours",
    students: 950,
    level: "Beginner",
    category: "Design",
    image: "/photos/Academy/react.jpeg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    progress: 0,
    completed: false,
    currentVideoIndex: 0,
    videos: [
      {
        id: 1,
        title: "Introduction to UI/UX Design",
        description: "Overview of the course and design principles",
        duration: "12:30",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        completed: true
      },
      {
        id: 2,
        title: "User Research Methods",
        description: "Learn how to conduct effective user research",
        duration: "18:45",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        completed: false
      },
      {
        id: 3,
        title: "Wireframing Basics",
        description: "Creating effective wireframes for your designs",
        duration: "15:20",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        completed: false
      },
      {
        id: 4,
        title: "Prototyping in Figma",
        description: "Learn to create interactive prototypes",
        duration: "22:15",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        completed: false
      },
      {
        id: 5,
        title: "Color Theory for UI Design",
        description: "Understanding color psychology and palettes",
        duration: "16:40",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        completed: false
      }
    ],
    attachments: [
      { name: "Design Resources", type: "zip", size: "15.7 MB", url: "#" },
      { name: "UI Kit", type: "sketch", size: "8.2 MB", url: "#" }
    ],
    faqs: [
      {
        question: "Do I need to know how to code?",
        answer: "No, this course focuses on design principles and tools. No coding knowledge is required."
      },
      {
        question: "Which design tools will we use?",
        answer: "We'll primarily use Figma, but will also cover Adobe XD and Sketch."
      }
    ],
    studentQuestions: [
      {
        id: 1,
        user: "David K.",
        question: "Is this course suitable for someone who wants to transition from graphic design to UI/UX?",
        answer: "Absolutely! Many of our students have successfully transitioned from graphic design to UI/UX. Your graphic design skills will be a great foundation.",
        votes: 32,
        date: "3 weeks ago"
      },
      {
        id: 2,
        user: "Emma L.",
        question: "Do I need to purchase any software for this course?",
        answer: "We primarily use Figma which has a free tier that's sufficient for the course. We also cover Adobe XD and Sketch, but you can follow along with just Figma if you prefer.",
        votes: 24,
        date: "1 month ago"
      },
      {
        id: 3,
        user: "Jason M.",
        question: "How much time should I dedicate to this course each week?",
        answer: "We recommend setting aside 5-10 hours per week to get the most out of the course. This includes watching lectures, completing exercises, and working on your portfolio projects.",
        votes: 18,
        date: "2 months ago"
      }
    ]
  },
  // Add more courses as needed
];

const CourseDetailPage = ({ params }) => {
  const { openLoginModal } = useAuth();
  const pathname = usePathname();
  const courseId = pathname.split('/').pop();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [votedQuestions, setVotedQuestions] = useState({});
  const [activeCommentId, setActiveCommentId] = useState(null);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchCourse = () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        // Extract courseId from pathname
        const foundCourse = coursesData.find(c => c.id === parseInt(courseId));
        if (foundCourse) {
          setCourse(foundCourse);
          setProgress(foundCourse.progress || 0);

          // Ensure currentVideoIndex is valid
          const validIndex = foundCourse.currentVideoIndex || 0;
          setCurrentVideoIndex(validIndex);

          // Set current video
          if (foundCourse.videos && foundCourse.videos.length > 0) {
            setCurrentVideo(foundCourse.videos[validIndex]);
          }

          // Reset voted questions when changing courses
          setVotedQuestions({});
        }
        setLoading(false);
      }, 500);
    };

    fetchCourse();
  }, [params]);

  const handleMarkAsComplete = () => {
    // In a real app, this would be an API call to update the user's progress
    setProgress(100);
    setShowFeedbackModal(true);
  };

  const handleSubmitFeedback = () => {
    // In a real app, this would be an API call to submit the feedback
    console.log('Feedback submitted:', { rating, feedback });
    setShowFeedbackModal(false);
    // Show a success message or redirect
  };

  const handleSubmitQuestion = () => {
    // Check if user is logged in (in a real app, this would be a proper auth check)
    const isLoggedIn = false; // Simulate not logged in for demo

    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }

    // In a real app, this would be an API call to submit the question
    console.log('Question submitted:', newQuestion);
    setNewQuestion('');
    // Show a success message
  };

  // Function to handle video selection from playlist
  const handleVideoSelect = (index) => {
    if (course && course.videos && course.videos[index]) {
      setCurrentVideoIndex(index);
      setCurrentVideo(course.videos[index]);

      // In a real app, this would update the user's progress via API
      const updatedCourse = {...course};
      updatedCourse.currentVideoIndex = index;
      setCourse(updatedCourse);

      // Mark previous videos as completed
      if (index > 0) {
        const updatedVideos = [...updatedCourse.videos];
        for (let i = 0; i < index; i++) {
          updatedVideos[i] = {...updatedVideos[i], completed: true};
        }
        updatedCourse.videos = updatedVideos;
        setCourse(updatedCourse);
      }

      // Update overall course progress
      const totalVideos = course.videos.length;
      const completedVideos = course.videos.filter(v => v.completed).length + 1; // +1 for current video
      const newProgress = Math.round((completedVideos / totalVideos) * 100);
      setProgress(newProgress);
    }
  };

  // Function to handle video end and auto-play next
  const handleVideoEnd = () => {
    if (course && course.videos && currentVideoIndex < course.videos.length - 1) {
      handleVideoSelect(currentVideoIndex + 1);
    }
  };

  // Function to handle upvote
  const handleUpvote = (questionId) => {
    // Check if user has already voted on this question
    const currentVote = votedQuestions[questionId];

    // Create a copy of the course to modify
    const updatedCourse = {...course};
    const questionIndex = updatedCourse.studentQuestions.findIndex(q => q.id === questionId);

    if (questionIndex !== -1) {
      // If already upvoted, remove the upvote
      if (currentVote === 'up') {
        updatedCourse.studentQuestions[questionIndex].votes -= 1;
        setVotedQuestions({...votedQuestions, [questionId]: null});
      }
      // If downvoted, change to upvote (remove downvote and add upvote)
      else if (currentVote === 'down') {
        updatedCourse.studentQuestions[questionIndex].votes += 2; // +2 because we're removing a downvote (-1) and adding an upvote (+1)
        setVotedQuestions({...votedQuestions, [questionId]: 'up'});
      }
      // If not voted yet, add upvote
      else {
        updatedCourse.studentQuestions[questionIndex].votes += 1;
        setVotedQuestions({...votedQuestions, [questionId]: 'up'});
      }

      setCourse(updatedCourse);
    }
  };

  // Function to handle downvote
  const handleDownvote = (questionId) => {
    // Check if user has already voted on this question
    const currentVote = votedQuestions[questionId];

    // Create a copy of the course to modify
    const updatedCourse = {...course};
    const questionIndex = updatedCourse.studentQuestions.findIndex(q => q.id === questionId);

    if (questionIndex !== -1) {
      // If already downvoted, remove the downvote
      if (currentVote === 'down') {
        updatedCourse.studentQuestions[questionIndex].votes += 1;
        setVotedQuestions({...votedQuestions, [questionId]: null});
      }
      // If upvoted, change to downvote (remove upvote and add downvote)
      else if (currentVote === 'up') {
        updatedCourse.studentQuestions[questionIndex].votes -= 2; // -2 because we're removing an upvote (+1) and adding a downvote (-1)
        setVotedQuestions({...votedQuestions, [questionId]: 'down'});
      }
      // If not voted yet, add downvote
      else {
        updatedCourse.studentQuestions[questionIndex].votes -= 1;
        setVotedQuestions({...votedQuestions, [questionId]: 'down'});
      }

      setCourse(updatedCourse);
    }
  };

  // Function to toggle comment section for a question
  const toggleComments = (questionId) => {
    if (!session) {
      setShowLoginPrompt(true);
      return;
    }

    setActiveCommentId(prev => prev === questionId ? null : questionId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Course Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">The course you're looking for doesn't exist or has been removed.</p>
        <Link href="/Academy/courses" className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors">
          Browse All Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Link href="/Academy" className="hover:text-primary-600 dark:hover:text-primary-400">
              Academy
            </Link>
            <span className="mx-2">/</span>
            <Link href="/Academy/courses" className="hover:text-primary-600 dark:hover:text-primary-400">
              Courses
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 dark:text-white font-medium truncate">
              {course.title}
            </span>
          </div>
        </div>

        {/* Course Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 md:p-8">
            <Link href="/Academy/courses" className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline mb-4">
              <FaArrowLeft className="mr-2" />
              Back to Courses
            </Link>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {course.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <FaClock className="mr-1" />
                <span>{course.totalHours}</span>
              </div>

              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <FaUsers className="mr-1" />
                <span>{course.students.toLocaleString()} students</span>
              </div>

              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <div className="flex text-yellow-400 mr-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < Math.floor(course.rating) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"} size={14} />
                  ))}
                </div>
                <span>{course.rating} ({course.students} ratings)</span>
              </div>

              <div className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                {course.level}
              </div>
            </div>

            <div className="flex items-center mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden mr-3">
                  <img
                    src="/fighterfish.png"
                    alt={course.instructor}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {course.instructor}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Instructor
                  </p>
                </div>
              </div>

              <div className="ml-auto">
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {course.price}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Your Progress
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-primary-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  // Scroll to video section
                  window.scrollTo({ top: document.getElementById('course-video').offsetTop - 100, behavior: 'smooth' });

                  // If there's a current video, play it, otherwise start from the first video
                  if (course.videos && course.videos.length > 0) {
                    if (currentVideoIndex === 0 && currentVideo) {
                      // Already on first video, just scroll
                    } else {
                      handleVideoSelect(0); // Start from the beginning
                    }
                  }
                }}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 flex-grow md:flex-grow-0"
              >
                <FaPlay className="mr-1" />
                Start Learning
              </button>

              {progress < 100 ? (
                <button
                  onClick={handleMarkAsComplete}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 flex-grow md:flex-grow-0"
                >
                  <FaCheck className="mr-1" />
                  Mark as Complete
                </button>
              ) : (
                <button
                  className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg cursor-not-allowed flex items-center justify-center gap-2 flex-grow md:flex-grow-0"
                  disabled
                >
                  <FaCheck className="mr-1" />
                  Completed
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
          {/* Left Column - Video and Description (75%) */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            {/* Video Section */}
            <div id="course-video" className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
              <div className="aspect-video">
                <iframe
                  key={currentVideo ? currentVideo.id : 'default'}
                  src={currentVideo ? currentVideo.videoUrl : course.videoUrl}
                  title={currentVideo ? currentVideo.title : course.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onEnded={handleVideoEnd}
                ></iframe>
              </div>
              {currentVideo && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {currentVideo.title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {currentVideo.description}
                  </p>
                </div>
              )}
            </div>

            {/* Course Description */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  About This Course
                </h2>
                <div className="prose prose-blue dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {course.longDescription || course.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Attachments Section */}
            {course.attachments && course.attachments.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Course Materials
                  </h2>
                  <div className="space-y-3">
                    {course.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-primary-100 dark:bg-primary-900/30 p-2 rounded-lg mr-3">
                            <FaDownload className="text-primary-600 dark:text-primary-400" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {attachment.name}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {attachment.type.toUpperCase()} • {attachment.size}
                            </p>
                          </div>
                        </div>
                        <a
                          href={attachment.url}
                          className="bg-primary-50 hover:bg-primary-100 dark:bg-primary-900/20 dark:hover:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-3 py-1 rounded-lg text-sm transition-colors"
                          download
                        >
                          Download
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Student Questions Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  What Other Students Asked
                </h2>

                {/* Ask a Question Form */}
                <div className="mb-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-grow">
                      <textarea
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        placeholder="Got a question about this course?"
                        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                        rows="3"
                      ></textarea>
                    </div>
                    <button
                      onClick={handleSubmitQuestion}
                      className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors h-10 flex-shrink-0 self-end"
                    >
                      Ask
                    </button>
                  </div>

                  {/* Login Prompt (conditionally shown) */}
                  {showLoginPrompt && (
                    <div className="mt-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                      <p className="text-sm text-yellow-800 dark:text-yellow-300">
                        You need to be logged in to ask a question.{' '}
                        <button
                          onClick={openLoginModal}
                          className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
                        >
                          Log in
                        </button>
                      </p>
                    </div>
                  )}
                </div>

                {/* Questions List */}
                {course.studentQuestions && course.studentQuestions.length > 0 ? (
                  <div className="space-y-6">
                    {course.studentQuestions.map((item) => (
                      <div key={item.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {item.question}
                          </h3>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {item.date}
                          </span>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {item.answer}
                        </p>

                        <div className="flex items-center text-sm">
                          <span className="text-gray-600 dark:text-gray-400 mr-2">
                            Asked by {item.user}
                          </span>

                          <div className="flex items-center ml-auto">
                            <div className="flex items-center bg-gray-800 rounded-md px-2 py-1">
                              <button
                                onClick={() => handleUpvote(item.id)}
                                className={`transition-all transform hover:scale-110 ${
                                  votedQuestions[item.id] === 'up'
                                    ? 'text-blue-500 fill-current'
                                    : 'text-gray-400 hover:text-blue-400'
                                }`}
                                aria-label="Upvote"
                              >
                                <FaArrowUp size={14} />
                              </button>
                              <span className="text-white mx-2 text-sm font-medium">{item.votes}</span>
                              <button
                                onClick={() => handleDownvote(item.id)}
                                className={`transition-all transform hover:scale-110 ${
                                  votedQuestions[item.id] === 'down'
                                    ? 'text-red-500 fill-current'
                                    : 'text-gray-400 hover:text-blue-400'
                                }`}
                                aria-label="Downvote"
                              >
                                <FaArrowDown size={14} />
                              </button>
                            </div>
                            <button
                              onClick={() => toggleComments(item.id)}
                              className="flex items-center bg-gray-800 rounded-md px-2 py-1 ml-2 hover:bg-gray-700 transition-colors"
                            >
                              <FaRegComment size={14} className={`${activeCommentId === item.id ? 'text-blue-500' : 'text-gray-400'}`} />
                              <span className="text-white ml-1 text-sm font-medium">12</span>
                            </button>
                          </div>
                        </div>

                        {/* Comment Section - Only shown when activeCommentId matches this question */}
                        {activeCommentId === item.id && (
                          <div className="mt-4 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Comments (12)</h4>
                            <div className="space-y-3 mb-4">
                              {/* Sample comments - in a real app, these would come from an API */}
                              <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden flex-shrink-0">
                                  <img src="/fighterfish.png" alt="User" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-grow">
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs font-medium text-gray-900 dark:text-white">Michael R.</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">2 days ago</span>
                                  </div>
                                  <p className="text-sm text-gray-700 dark:text-gray-300">
                                    I found this really helpful. The instructor explains concepts clearly.
                                  </p>
                                </div>
                              </div>
                              <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden flex-shrink-0">
                                  <img src="/fighterfish.png" alt="User" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-grow">
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs font-medium text-gray-900 dark:text-white">Sarah L.</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">1 week ago</span>
                                  </div>
                                  <p className="text-sm text-gray-700 dark:text-gray-300">
                                    Thanks for asking this question! I was wondering the same thing.
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Add comment form */}
                            <div className="flex gap-3">
                              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden flex-shrink-0">
                                <img src="/fighterfish.png" alt="User" className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-grow">
                                <textarea
                                  placeholder="Add a comment..."
                                  className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-500 resize-none"
                                  rows="2"
                                ></textarea>
                                <div className="flex justify-end mt-2">
                                  <button
                                    className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 text-sm rounded-lg transition-colors"
                                    onClick={() => {
                                      if (!session) {
                                        setShowLoginPrompt(true);
                                        return;
                                      }
                                      // In a real app, this would submit the comment
                                      console.log('Comment submitted');
                                    }}
                                  >
                                    Post
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-gray-400 dark:text-gray-500 text-4xl mb-3">
                      <FaQuestion />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      No questions yet. Be the first to ask!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Video Playlist (25%) */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            {/* Video Playlist */}
            {course.videos && course.videos.length > 0 && (
              <VideoPlaylist
                videos={course.videos}
                currentIndex={currentVideoIndex}
                onVideoSelect={handleVideoSelect}
              />
            )}

            {/* FAQs Section - Moved below playlist */}
            {course.faqs && course.faqs.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mt-6">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {course.faqs.map((faq, index) => (
                      <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                          {faq.question}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Instructor Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mt-6">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  About the Instructor
                </h2>
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden mr-4">
                    <img
                      src="/fighterfish.png"
                      alt={course.instructor}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {course.instructor}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {course.category} Expert
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {course.instructorBio || "An experienced instructor with expertise in this field."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowFeedbackModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              &times;
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
                <FaStar className="text-primary-600 dark:text-primary-400 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Rate This Course
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your feedback helps us improve our courses and helps other students make informed decisions.
              </p>
            </div>

            {/* Star Rating */}
            <div className="flex justify-center mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl mx-1 focus:outline-none ${
                    star <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                  }`}
                >
                  <FaStar />
                </button>
              ))}
            </div>

            {/* Feedback Textarea */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Feedback (Optional)
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="What did you like or dislike about this course?"
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                rows="4"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmitFeedback}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg transition-colors"
            >
              Submit Feedback
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function for level colors
const getLevelColor = (level) => {
  switch(level) {
    case "Beginner": return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";
    case "Intermediate": return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
    case "Advanced": return "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400";
    default: return "bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400";
  }
};

export default CourseDetailPage;
