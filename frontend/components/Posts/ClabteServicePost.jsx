'use client';

import { useState } from 'react';
import {
  FaHeart, FaRegHeart, FaComment, FaShare, FaEllipsisH,
  FaMoneyBillWave, FaClock, FaUsers, FaInfoCircle, FaUser
} from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

export default function ClabteServicePost({ post }) {
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

  const handleReserveSpot = () => {
    setShowConfirmation(true);
  };

  const confirmReservation = () => {
    // Logic to reserve a spot
    setShowConfirmation(false);
    alert('Spot reserved successfully!');
  };

  const cancelReservation = () => {
    setShowConfirmation(false);
  };

  // Calculate progress percentage
  const spotsTotal = post.serviceDetails.spotsTotal || 6;
  const spotsTaken = post.serviceDetails.spotsTaken || 0;
  const spotsLeft = spotsTotal - spotsTaken;
  const progressPercentage = (spotsTaken / spotsTotal) * 100;

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
          <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Clabte Service
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
              alt="Service Preview"
              className="w-full h-64 object-cover"
            />
          </div>
        )}

        {/* Service Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">Price</div>
            <div className="font-bold text-gray-900 dark:text-white flex items-center">
              <FaMoneyBillWave className="text-green-500 dark:text-green-400 mr-1" />
              DT {post.serviceDetails.price}
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">Delivery</div>
            <div className="font-bold text-gray-900 dark:text-white flex items-center">
              <FaClock className="text-blue-500 dark:text-blue-400 mr-1" />
              {post.serviceDetails.deliveryDays} days
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">Service Type</div>
            <div className="font-bold text-gray-900 dark:text-white flex items-center">
              {post.type === 'soloFin' ? (
                <>
                  <FaUser className="text-purple-500 dark:text-purple-400 mr-1" />
                  SoloFin
                </>
              ) : (
                <>
                  <FaUsers className="text-purple-500 dark:text-purple-400 mr-1" />
                  BettaArena ({spotsLeft}/{spotsTotal})
                </>
              )}
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">Category</div>
            <div className="font-bold text-gray-900 dark:text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-500 dark:text-orange-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              {post.serviceDetails.category}
            </div>
          </div>
        </div>

        {/* Skills */}
        {post.serviceDetails.skills && post.serviceDetails.skills.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Skills & Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {post.serviceDetails.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Progress Bar - For all service posts with multiple spots */}
        {post.serviceDetails.spotsTotal > 1 && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Spots filled</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{spotsTaken}/{spotsTotal}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
              <div
                className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="bg-white dark:bg-gray-700/50 p-4 flex flex-wrap gap-2 justify-between items-center">
        <div className="flex items-center space-x-4">
         
        
         
        </div>
       
      </div>

      {/* Comments Section (conditionally rendered) */}
    
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Confirm Reservation</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {spotsTotal === 1
                ? `Are you sure you want to order "${post.title}"? This will create a new project in your workspace.`
                : `Are you sure you want to join the competition for "${post.title}"? This will reserve one of the ${spotsTotal} available spots.`
              }
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelReservation}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmReservation}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg"
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
