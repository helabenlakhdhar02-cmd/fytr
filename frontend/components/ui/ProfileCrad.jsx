'use client';

import { FaStar, FaRegStar, FaStarHalfAlt, FaEdit, FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaUser } from 'react-icons/fa';
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';

export default function ProfileCard() {
  const router = useRouter();
  const { openLoginModal, openRegisterModal } = useAuth();
  const { userData: userMe, loading: isLoading } = useUser();

  // No need for local state or useEffect to fetch data - it's handled by UserContext

  // Function to render star rating
  const renderStarRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }

    // Half star
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300 dark:text-gray-600" />);
    }

    return stars;
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="card bg-white dark:bg-gray-800 w-full border border-gray-200 dark:border-gray-700 animate-pulse">
        <div className="relative bg-gray-300 dark:bg-gray-700 h-32"></div>
        <div className="mt-10 p-6 text-center">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mx-auto mb-4"></div>
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-5 h-5 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            ))}
          </div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mx-auto"></div>
        </div>
      </div>
    );
  }

  // Not logged in state
  if (!userMe) {
    return (
      <div className="card bg-white dark:bg-gray-800 w-full border border-gray-200 dark:border-gray-700 transition-all duration-300 h-[352px] flex flex-col">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <FaUser className="text-primary-600 dark:text-primary-400" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Welcome to FyterLance</h3>
          </div>
        </div>

        <div className="flex-grow flex flex-col justify-center items-center px-6">
          <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-gray-100 dark:border-gray-600 transition-transform duration-300 hover:scale-105">
            <FaUser className="text-gray-500 dark:text-gray-400 text-3xl" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Join Our Community</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 mx-auto text-center">Sign in to access your profile and connect with clients and freelancers</p>
        </div>

        <div className="p-4 pt-0">
          <div className="grid grid-cols-2 gap-3 justify-center">
            <button
              onClick={openLoginModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2 border border-transparent"
            >
              Log In
            </button>
            <button
              onClick={openRegisterModal}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2.5 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2"
            >
              Sign Up
            </button>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline w-full text-center flex items-center justify-center gap-1">
              <span>Learn more about FyterLance</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Logged in user profile
  return (
    <div className="card bg-white dark:bg-gray-800 w-full border border-gray-200 dark:border-gray-700 transition-all duration-300 shadow-sm hover:shadow-md rounded-lg overflow-hidden">
      {/* Cover Image & Profile Picture */}
      <div className="relative">
        {/* Cover Image - Gradient Background */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-900">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-10 bg-grid-pattern"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>

          {/* Profile completion indicator */}
          <div className="absolute top-2 left-2 flex items-center px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium border border-white/10 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs">70% complete</span>
            <div className="ml-1 w-8 h-1 bg-white/30 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: '70%' }}></div>
            </div>
          </div>
        </div>

        {/* Profile Picture */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12">
          <div className="w-24 h-24 rounded-full border-3 border-white dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-700 transition-transform duration-300 hover:scale-105 shadow-md">
            {userMe.profileImg ? (
              <img
                src={`http://localhost:8000${userMe.profileImg}`}
                alt={userMe.full_name}
                className="h-full w-full object-cover transition-opacity hover:opacity-90"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/fighterfish.png"; // Fallback image
                }}
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white text-xl font-bold">
                {userMe.full_name?.charAt(0)}
              </div>
            )}
          </div>

          {/* Online status indicator */}
          <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-white dark:border-gray-800 shadow-sm"></div>
        </div>

        {/* Edit Profile Button */}
        <button
          onClick={() => router.push('/dashboard/edit-profile')}
          className="absolute top-2 right-2 bg-white/80 dark:bg-gray-800/80 p-1.5 rounded-full backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-label="Edit Profile"
        >
          <FaEdit className="text-blue-600 dark:text-blue-400 text-sm" />
        </button>
      </div>

      {/* Profile Info */}
      <div className="mt-16 p-4 text-center">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1 tracking-tight truncate">{userMe.full_name}</h2>

        {/* Role Badge */}
        <div className="mb-3">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800/30">
            <FaBriefcase className="mr-1 text-xs" />
            {userMe.role_details?.role ||
              (userMe.role === 'client'
                ? 'Clante'
                : userMe.role === 'formateur'
                  ? 'Trainer'
                  : 'Freelancer'
              )
            }
          </span>
        </div>

        {/* Star Rating - Simplified */}
        <div className="flex justify-center gap-1 text-sm mb-3">
          {userMe && userMe.role_details && userMe.role_details.rate ? (
            <>
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < Math.floor(userMe.role_details.rate) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}
                />
              ))}
              <span className="ml-1 text-xs text-gray-600 dark:text-gray-400">
                {typeof userMe.role_details.rate === 'number'
                  ? userMe.role_details.rate.toFixed(1)
                  : parseFloat(userMe.role_details.rate)
                    ? parseFloat(userMe.role_details.rate).toFixed(1)
                    : '0.0'}
              </span>
            </>
          ) : (
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FaRegStar key={i} className="text-gray-300 dark:text-gray-600" />
              ))}
              <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">New</span>
            </div>
          )}
        </div>

        {/* Bio - Simplified */}
        <div className="mb-4 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed line-clamp-2 hover:line-clamp-none transition-all duration-300">
            {userMe.role_details?.bio || 'No bio available. Add a short description about yourself to help others know you better.'}
          </p>
        </div>

        {/* Joined Date - Simplified */}
        <div className="flex justify-center text-xs text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center justify-center">
            <FaCalendarAlt className="mr-1 text-blue-500 dark:text-blue-400" />
            <span>Joined {new Date(userMe.date_joined || Date.now()).toLocaleDateString(undefined, {year: 'numeric', month: 'short'})}</span>
          </div>
        </div>

        {/* Profile Stats - Simplified */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center">
            <div className="text-base font-bold text-gray-900 dark:text-gray-100">
              {userMe.role_details?.projects_completed || 0}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center justify-center">
              {userMe.role_details?.rate
                ? (typeof userMe.role_details.rate === 'number'
                    ? userMe.role_details.rate.toFixed(1)
                    : parseFloat(userMe.role_details.rate)
                      ? parseFloat(userMe.role_details.rate).toFixed(1)
                      : '0.0')
                : '0.0'} <FaStar className="text-yellow-500 ml-1 text-xs" />
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Rating</div>
          </div>
          <div className="text-center">
            <div className="text-base font-bold text-gray-900 dark:text-gray-100">
              {userMe.role_details?.level || 'Beginner'}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Level</div>
          </div>
        </div>

        {/* Action Buttons - Simplified */}
        <div className="grid grid-cols-2 gap-2">
          <Link href={userMe.role === 'client' ? "/dashboard/clante-profile" : "/dashboard/freelancer-profile"} className="w-full">
            <button className="w-full py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-md transition-colors duration-300 flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <FaUser className="text-xs" />
              View Profile
            </button>
          </Link>

          <Link href="/dashboard/messages" className="w-full">
            <button className="w-full py-1.5 px-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md transition-colors duration-300 flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Messages
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
