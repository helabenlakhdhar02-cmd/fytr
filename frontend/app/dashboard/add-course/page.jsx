'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import {
  FaPlus,
  FaImage,
  FaVideo,
  FaBook,
  FaTag,
  FaDollarSign,
  FaInfoCircle,
  FaArrowLeft,
  FaSave,
  FaYoutube,
  FaGoogleDrive,
  FaEye,
  FaEyeSlash,
  FaTrash,
  FaEdit,
  FaGraduationCap,
  FaCog,
  FaLink,
  FaList,
  FaChevronUp,
  FaChevronDown,
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaUserGraduate,
  FaLock,
  FaUnlock,
  FaGlobe,
  FaFileAlt,
  FaCloudUploadAlt,
  FaExclamationTriangle
} from 'react-icons/fa';
import Link from 'next/link';

const AddCoursePage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    level: 'beginner',
    price: '',
    thumbnail: null,
    thumbnailPreview: null,
    duration: '',
    totalHours: '',
    tags: [],
    currentTag: '',
    // New fields
    modules: [
      {
        id: 1,
        title: 'Introduction',
        description: 'Get started with the course',
        isExpanded: true,
        lessons: [
          {
            id: 1,
            title: 'Welcome to the Course',
            type: 'video',
            videoUrl: '',
            videoSource: 'youtube',
            duration: '10:00',
            isPreview: true,
            content: '',
            isExpanded: false
          }
        ]
      }
    ],
    requirements: ['Basic computer skills'],
    learningObjectives: ['Learn the fundamentals'],
    targetAudience: 'Beginners interested in this subject',
    instructorBio: '',
    isPublic: true,
    enrollmentLimit: '',
    startDate: '',
    endDate: '',
    certificateAvailable: true,
    allowDiscussions: true,
    allowRatings: true,
    language: 'English',
    subtitlesAvailable: false,
    resources: []
  });

  // State for preview mode
  const [previewMode, setPreviewMode] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  // Refs for scrolling
  const contentSectionRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value
    });
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourseData({
        ...courseData,
        thumbnail: file,
        thumbnailPreview: URL.createObjectURL(file)
      });
    }
  };

  const handleAddTag = () => {
    if (courseData.currentTag.trim() && !courseData.tags.includes(courseData.currentTag.trim())) {
      setCourseData({
        ...courseData,
        tags: [...courseData.tags, courseData.currentTag.trim()],
        currentTag: ''
      });
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setCourseData({
      ...courseData,
      tags: courseData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  // Module and Lesson Management
  const handleAddModule = () => {
    const newModule = {
      id: Date.now(),
      title: `Module ${courseData.modules.length + 1}`,
      description: '',
      isExpanded: true,
      lessons: []
    };

    setCourseData({
      ...courseData,
      modules: [...courseData.modules, newModule]
    });
  };

  const handleUpdateModule = (moduleId, field, value) => {
    const updatedModules = courseData.modules.map(module => {
      if (module.id === moduleId) {
        return { ...module, [field]: value };
      }
      return module;
    });

    setCourseData({
      ...courseData,
      modules: updatedModules
    });
  };

  const handleDeleteModule = (moduleId) => {
    if (window.confirm('Are you sure you want to delete this module? This will also delete all lessons within it.')) {
      setCourseData({
        ...courseData,
        modules: courseData.modules.filter(module => module.id !== moduleId)
      });
    }
  };

  const handleToggleModuleExpand = (moduleId) => {
    const updatedModules = courseData.modules.map(module => {
      if (module.id === moduleId) {
        return { ...module, isExpanded: !module.isExpanded };
      }
      return module;
    });

    setCourseData({
      ...courseData,
      modules: updatedModules
    });
  };

  const handleAddLesson = (moduleId) => {
    const moduleIndex = courseData.modules.findIndex(module => module.id === moduleId);
    if (moduleIndex === -1) return;

    const newLesson = {
      id: Date.now(),
      title: `Lesson ${courseData.modules[moduleIndex].lessons.length + 1}`,
      type: 'video',
      videoUrl: '',
      videoSource: 'youtube',
      duration: '00:00',
      isPreview: false,
      content: '',
      isExpanded: false
    };

    const updatedModules = [...courseData.modules];
    updatedModules[moduleIndex].lessons.push(newLesson);

    setCourseData({
      ...courseData,
      modules: updatedModules
    });
  };

  const handleUpdateLesson = (moduleId, lessonId, field, value) => {
    const moduleIndex = courseData.modules.findIndex(module => module.id === moduleId);
    if (moduleIndex === -1) return;

    const updatedModules = [...courseData.modules];
    const lessonIndex = updatedModules[moduleIndex].lessons.findIndex(lesson => lesson.id === lessonId);

    if (lessonIndex === -1) return;

    updatedModules[moduleIndex].lessons[lessonIndex] = {
      ...updatedModules[moduleIndex].lessons[lessonIndex],
      [field]: value
    };

    setCourseData({
      ...courseData,
      modules: updatedModules
    });
  };

  const handleDeleteLesson = (moduleId, lessonId) => {
    if (window.confirm('Are you sure you want to delete this lesson?')) {
      const moduleIndex = courseData.modules.findIndex(module => module.id === moduleId);
      if (moduleIndex === -1) return;

      const updatedModules = [...courseData.modules];
      updatedModules[moduleIndex].lessons = updatedModules[moduleIndex].lessons.filter(
        lesson => lesson.id !== lessonId
      );

      setCourseData({
        ...courseData,
        modules: updatedModules
      });
    }
  };

  const handleToggleLessonExpand = (moduleId, lessonId) => {
    const moduleIndex = courseData.modules.findIndex(module => module.id === moduleId);
    if (moduleIndex === -1) return;

    const updatedModules = [...courseData.modules];
    const lessonIndex = updatedModules[moduleIndex].lessons.findIndex(lesson => lesson.id === lessonId);

    if (lessonIndex === -1) return;

    updatedModules[moduleIndex].lessons[lessonIndex].isExpanded =
      !updatedModules[moduleIndex].lessons[lessonIndex].isExpanded;

    setCourseData({
      ...courseData,
      modules: updatedModules
    });
  };

  // Requirements, Learning Objectives, and Resources Management
  const handleAddRequirement = () => {
    setCourseData({
      ...courseData,
      requirements: [...courseData.requirements, '']
    });
  };

  const handleUpdateRequirement = (index, value) => {
    const updatedRequirements = [...courseData.requirements];
    updatedRequirements[index] = value;

    setCourseData({
      ...courseData,
      requirements: updatedRequirements
    });
  };

  const handleDeleteRequirement = (index) => {
    const updatedRequirements = [...courseData.requirements];
    updatedRequirements.splice(index, 1);

    setCourseData({
      ...courseData,
      requirements: updatedRequirements
    });
  };

  const handleAddLearningObjective = () => {
    setCourseData({
      ...courseData,
      learningObjectives: [...courseData.learningObjectives, '']
    });
  };

  const handleUpdateLearningObjective = (index, value) => {
    const updatedObjectives = [...courseData.learningObjectives];
    updatedObjectives[index] = value;

    setCourseData({
      ...courseData,
      learningObjectives: updatedObjectives
    });
  };

  const handleDeleteLearningObjective = (index) => {
    const updatedObjectives = [...courseData.learningObjectives];
    updatedObjectives.splice(index, 1);

    setCourseData({
      ...courseData,
      learningObjectives: updatedObjectives
    });
  };

  const handleAddResource = () => {
    setCourseData({
      ...courseData,
      resources: [...courseData.resources, { title: '', url: '', type: 'link' }]
    });
  };

  const handleUpdateResource = (index, field, value) => {
    const updatedResources = [...courseData.resources];
    updatedResources[index] = { ...updatedResources[index], [field]: value };

    setCourseData({
      ...courseData,
      resources: updatedResources
    });
  };

  const handleDeleteResource = (index) => {
    const updatedResources = [...courseData.resources];
    updatedResources.splice(index, 1);

    setCourseData({
      ...courseData,
      resources: updatedResources
    });
  };

  // Preview Mode
  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
    if (!previewMode && contentSectionRef.current) {
      contentSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate course data
    if (courseData.modules.some(module => module.lessons.length === 0)) {
      alert('Each module must have at least one lesson.');
      setIsSubmitting(false);
      return;
    }

    // Check for empty video URLs in video lessons
    const hasEmptyVideoUrls = courseData.modules.some(module =>
      module.lessons.some(lesson =>
        lesson.type === 'video' && !lesson.videoUrl.trim()
      )
    );

    if (hasEmptyVideoUrls) {
      if (!confirm('Some video lessons have empty video URLs. Do you want to continue anyway?')) {
        setIsSubmitting(false);
        return;
      }
    }

    // Simulate API call
    try {
      // In a real app, you would send the data to your API
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Redirect to courses page after successful submission
      router.push('/dashboard/my-courses');
    } catch (error) {
      console.error('Error creating course:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link
                href="/dashboard/my-courses"
                className="mr-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <FaArrowLeft />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Course</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={togglePreviewMode}
                className={`inline-flex items-center px-4 py-2 ${
                  previewMode
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                } rounded-md shadow-sm transition-colors`}
              >
                {previewMode ? (
                  <>
                    <FaEyeSlash className="mr-2" />
                    Exit Preview
                  </>
                ) : (
                  <>
                    <FaEye className="mr-2" />
                    Preview Course
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave className="mr-2" />
                    Save Course
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab('basic')}
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === 'basic'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <FaInfoCircle className="inline mr-2" />
                Basic Info
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('content')}
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === 'content'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <FaBook className="inline mr-2" />
                Course Content
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('requirements')}
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === 'requirements'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <FaList className="inline mr-2" />
                Requirements & Objectives
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('media')}
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === 'media'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <FaImage className="inline mr-2" />
                Media
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === 'settings'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <FaCog className="inline mr-2" />
                Advanced Settings
              </button>
            </nav>
          </div>
        </div>

        {/* Course Form */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          {/* Basic Information */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <FaInfoCircle className="mr-2 text-blue-600 dark:text-blue-400" />
              Basic Information
            </h2>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Course Title*
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={courseData.title}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Full-Stack Web Development"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Course Description*
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  value={courseData.description}
                  onChange={handleChange}
                  rows={4}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe what students will learn in this course..."
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category*
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={courseData.category}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="" disabled>Select a category</option>
                    <option value="web-development">Web Development</option>
                    <option value="mobile-development">Mobile Development</option>
                    <option value="design">Design</option>
                    <option value="data-science">Data Science</option>
                    <option value="marketing">Marketing</option>
                    <option value="business">Business</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="level" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Level*
                  </label>
                  <select
                    id="level"
                    name="level"
                    required
                    value={courseData.level}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Duration (weeks)*
                  </label>
                  <input
                    type="number"
                    id="duration"
                    name="duration"
                    required
                    min="1"
                    value={courseData.duration}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. 8"
                  />
                </div>

                <div>
                  <label htmlFor="totalHours" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Total Hours*
                  </label>
                  <input
                    type="number"
                    id="totalHours"
                    name="totalHours"
                    required
                    min="1"
                    value={courseData.totalHours}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. 40"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Price (DT)*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaDollarSign className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    required
                    min="0"
                    step="0.01"
                    value={courseData.price}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. 199.99"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Course Thumbnail */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <FaImage className="mr-2 text-blue-600 dark:text-blue-400" />
              Course Thumbnail
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Upload Image*
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                      <label
                        htmlFor="thumbnail"
                        className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 focus-within:outline-none"
                      >
                        <span>Upload a file</span>
                        <input
                          id="thumbnail"
                          name="thumbnail"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleThumbnailChange}
                          required={!courseData.thumbnail}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>

              <div>
                {courseData.thumbnailPreview ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Preview
                    </label>
                    <div className="mt-1 relative aspect-video rounded-md overflow-hidden border border-gray-300 dark:border-gray-600">
                      <img
                        src={courseData.thumbnailPreview}
                        alt="Course thumbnail preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500 dark:text-gray-400 text-sm italic">
                      Thumbnail preview will appear here
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <FaTag className="mr-2 text-blue-600 dark:text-blue-400" />
              Tags
            </h2>

            <div className="flex items-center mb-2">
              <input
                type="text"
                id="currentTag"
                name="currentTag"
                value={courseData.currentTag}
                onChange={handleChange}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add a tag (e.g. JavaScript, React, Design)"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-md shadow-sm transition-colors"
              >
                <FaPlus className="mr-1" />
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {courseData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-200 dark:bg-blue-800 text-blue-600 dark:text-blue-300 hover:bg-blue-300 dark:hover:bg-blue-700"
                  >
                    &times;
                  </button>
                </span>
              ))}
              {courseData.tags.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-sm italic">
                  No tags added yet
                </p>
              )}
            </div>
          </div>

          {/* Submit Button (Mobile Only) */}
          <div className="md:hidden">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex justify-center items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <FaSave className="mr-2" />
                  Save Course
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCoursePage;
