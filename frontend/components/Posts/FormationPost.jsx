'use client';

import { useState } from 'react';
import {
  FaHeart, FaRegHeart, FaComment, FaShare, FaEllipsisH,
  FaCalendarAlt, FaClock, FaUsers, FaGraduationCap
} from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

export default function FormationPost({ post }) {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleEnroll = () => {
    setShowConfirmation(true);
  };

  const confirmEnrollment = () => {
    // Logic to enroll in the course
    setShowConfirmation(false);
    alert('Enrolled successfully!');
  };

  const cancelEnrollment = () => {
    setShowConfirmation(false);
  };

  // Calculate progress percentage
  const seatsTotal = post.courseDetails.seatsTotal || 20;
  const seatsTaken = post.courseDetails.seatsTaken || 0;
  const seatsLeft = seatsTotal - seatsTaken;
  const progressPercentage = (seatsTaken / seatsTotal) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 mb-6">
      {/* Post Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={post.author.avatar || "/images/default-avatar.png"}
            alt={post.author.name}
            className="w-10 h-10 rounded-full mr-3 object-cover"
          />
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">{post.author.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{post.timeAgo}</p>
          </div>
        </div>
        <div className="flex items-center">
          <span className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
            <FaGraduationCap className="h-3.5 w-3.5 mr-1" />
            Formation Course
          </span>
        </div>
      </div>

      {/* Post Content */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {post.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {post.content}
        </p>

        {post.image && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img
              src={post.image}
              alt="Course Preview"
              className="w-full h-64 object-cover"
            />
          </div>
        )}

        {/* Course Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">Price</div>
            <div className="font-bold text-gray-900 dark:text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 dark:text-green-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              DT {post.courseDetails.price}
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">Start Date</div>
            <div className="font-bold text-gray-900 dark:text-white flex items-center">
              <FaCalendarAlt className="text-blue-500 dark:text-blue-400 mr-1" />
              {post.courseDetails.startDate}
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">Duration</div>
            <div className="font-bold text-gray-900 dark:text-white flex items-center">
              <FaClock className="text-orange-500 dark:text-orange-400 mr-1" />
              {post.courseDetails.duration}
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">Seats Left</div>
            <div className="font-bold text-gray-900 dark:text-white flex items-center">
              <FaUsers className="text-purple-500 dark:text-purple-400 mr-1" />
              {seatsLeft}/{seatsTotal}
            </div>
          </div>
        </div>

        {/* Course Highlights */}
        <div className="mb-4 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">What You'll Learn</h3>
          <ul className="space-y-1 text-gray-600 dark:text-gray-300">
            {post.courseDetails.highlights && post.courseDetails.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Enrollment</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{seatsTaken}/{seatsTotal}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
            <div
              className="bg-purple-600 dark:bg-purple-500 h-2.5 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Post Actions */}
      <div className="bg-white dark:bg-gray-700/50 p-4 flex flex-wrap gap-2 justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleLike}
            className="flex items-center text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          >
            {liked ? (
              <FaHeart className="h-5 w-5 mr-1 text-red-500" />
            ) : (
              <FaRegHeart className="h-5 w-5 mr-1" />
            )}
            {liked ? 'Liked' : 'Like'}
          </button>
          <button
            onClick={toggleComments}
            className="flex items-center text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          >
            <FaComment className="h-5 w-5 mr-1" />
            Comment
          </button>
          <button className="flex items-center text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
            <FaShare className="h-5 w-5 mr-1" />
            Share
          </button>
        </div>
        <button
          onClick={handleEnroll}
          disabled={seatsLeft === 0}
          className={`px-4 py-2 rounded-lg transition-colors ${
            seatsLeft === 0
              ? 'bg-gray-300 text-gray-500 dark:bg-gray-600 dark:text-gray-400 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-500 dark:hover:bg-purple-600'
          }`}
        >
          {seatsLeft === 0 ? 'Class Full' : 'Enroll Now'}
        </button>
      </div>

      {/* Comments Section (conditionally rendered) */}
      {showComments && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="mb-4">
            <div className="flex items-start mb-4">
              <img
                src="/images/default-avatar.png"
                alt="User"
                className="w-8 h-8 rounded-full mr-3 object-cover"
              />
              <div className="flex-1">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">Jane Smith</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">Is this course suitable for beginners?</p>
                </div>
                <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                  <button className="mr-2 hover:text-blue-600 dark:hover:text-blue-400">Like</button>
                  <button className="mr-2 hover:text-blue-600 dark:hover:text-blue-400">Reply</button>
                  <span>1h ago</span>
                </div>
              </div>
            </div>

            {/* Add Comment Form */}
            <div className="flex items-start">
              <img
                src="/images/default-avatar.png"
                alt="User"
                className="w-8 h-8 rounded-full mr-3 object-cover"
              />
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Confirm Enrollment</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to enroll in "{post.title}"? You will be added to the class and receive course materials.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelEnrollment}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmEnrollment}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-500 dark:hover:bg-purple-600 rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
