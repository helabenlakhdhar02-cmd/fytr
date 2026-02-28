'use client';

import React, { useState, useEffect } from 'react';
import { FaPlus, FaImage, FaTag, FaDollarSign, FaInfoCircle, FaSave, FaTimes } from 'react-icons/fa';

const EditCourseModal = ({ isOpen, onClose, course, onSave }) => {
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
    currentTag: ''
  });

  useEffect(() => {
    if (course) {
      setCourseData({
        title: course.title || '',
        description: course.description || '',
        category: course.category || '',
        level: course.level || 'beginner',
        price: course.price ? course.price.toString() : '',
        thumbnail: null,
        thumbnailPreview: course.thumbnail || null,
        duration: course.duration || '',
        totalHours: course.totalHours || '',
        tags: course.tags || [],
        currentTag: ''
      });
    }
  }, [course]);

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
    if (courseData.currentTag.trim() !== '' && !courseData.tags.includes(courseData.currentTag.trim())) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real app, you would send the data to your API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Call the onSave callback with the updated course data
      onSave({
        ...course,
        ...courseData,
        price: parseFloat(courseData.price)
      });
      
      setIsSubmitting(false);
      onClose();
    } catch (error) {
      console.error('Error updating course:', error);
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
        </div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {/* Header */}
          <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Edit Course</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Modal content */}
          <div className="max-h-[80vh] overflow-y-auto">
            <form onSubmit={handleSubmit} className="p-6">
              {/* Basic Information */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FaInfoCircle className="mr-2 text-blue-600 dark:text-blue-400" />
                  Basic Information
                </h2>
                
                <div className="grid grid-cols-1 gap-4">
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
                      rows={3}
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Describe what students will learn in this course..."
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <option value="business">Business</option>
                        <option value="marketing">Marketing</option>
                        <option value="other">Other</option>
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
                        <option value="all-levels">All Levels</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Price (USD)*
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
                        placeholder="e.g. 49.99"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>
              </div>
              
              {/* Course Thumbnail */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FaImage className="mr-2 text-blue-600 dark:text-blue-400" />
                  Course Thumbnail
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Upload Image
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
                            className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="thumbnail"
                              name="thumbnail"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleThumbnailChange}
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
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FaTag className="mr-2 text-blue-600 dark:text-blue-400" />
                  Tags
                </h2>
                
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {courseData.tags.map((tag, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 focus:outline-none"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex">
                    <input
                      type="text"
                      id="currentTag"
                      name="currentTag"
                      value={courseData.currentTag}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Add a tag (e.g. JavaScript, Design, Business)"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-md shadow-sm transition-colors"
                    >
                      <FaPlus className="mr-2" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          
          {/* Footer */}
          <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <FaSave className="mr-2" />
                  Save Changes
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCourseModal;
