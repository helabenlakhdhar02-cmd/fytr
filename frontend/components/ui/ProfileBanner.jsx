import React from 'react';
import { FaStar } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
// import { Button } from "@/components/ui/button";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { useState } from "react";

import { logoutUser } from '../../lib/auth';
import EditProfileModal from '../../components/Pages/EditProfileModal';
import ProfileImageUploader from './ProfileImageUploader';
import { useUser } from '../../context/UserContext';

const ProfileBanner = () => {
  const router = useRouter();
  const { userData: Userme, loading, refreshUserData } = useUser();

  // No need for local fetch - data comes from UserContext
  const handleLogout = async () => {
    try {
      await logoutUser();
      alert('You have been logged out successfully.');
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('An error occurred during logout. Please try again.');
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [updated, setupdate] = useState(false);

  // When updated is true, refresh user data from context
  if (updated) {
    refreshUserData();
    setupdate(false);
  }
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied!");
  };


  return (
    <div className="bg-white dark:bg-gray-800 w-full h-auto rounded-lg overflow-hidden shadow-sm">
      {/* Cover Image */}
      <div className="relative w-full h-56 sm:h-64 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-900 flex items-center overflow-hidden">
        {/* Background Pattern and Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>

        {/* Profile Image with Camera Icon Overlay */}
        <div className="absolute left-1/2 -translate-x-1/2 md:left-16 md:translate-x-0 bottom-0 transform translate-y-1/2 z-10">
          <div className="scale-125 transform-gpu">
            <ProfileImageUploader
              onImageUpdate={(newImageUrl) => {
                // This callback will be called when the image is updated
                console.log('Profile image updated:', newImageUrl);
                // Refresh user data to update all components
                refreshUserData();

                // Force reload the page to ensure all components update
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }}
            />
          </div>
        </div>

        {/* Cover Content */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white opacity-5 tracking-wider select-none">FyterLance Profile</h1>
        </div>

        {/* Three Dots Menu */}
        <div className="absolute top-4 right-4 text-gray-700 dark:text-white">
          <div className="relative inline-block text-left">
            <button
              className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white/90 dark:hover:bg-gray-700/90 transition-colors shadow-sm"
              onClick={toggleDropdown}
              aria-label="Profile options"
            >
              <BsThreeDots size={20} />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-xl rounded-md border border-gray-200 dark:border-gray-700 z-10">
                {Userme && (
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => window.location.href = '/dashboard/edit-profile'}
                  >
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit Profile
                    </span>
                  </button>
                )}

                <EditProfileModal show={showModal} onHide={toggleModal} user={Userme} setUpdated={setupdate} />

                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={handleCopyLink}
                >
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy Profile Link
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="pt-20 sm:pt-24 pb-6 px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="md:ml-40 lg:ml-44">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{Userme ? Userme.full_name : 'Loading...'}</h2>

            {/* Role Badge */}
            <div className="mt-2 mb-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {Userme && Userme.role_details && Userme.role_details.role
                  ? Userme.role_details.role
                  : Userme && Userme.role === 'formateur'
                    ? 'Trainer'
                    : 'Freelancer'}
              </span>

              {Userme && Userme.role_details && Userme.role_details.skills && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {Userme.role_details.skills.split(',')[0]}
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2 bg-gray-50 dark:bg-gray-800/50 py-1.5 px-2.5 rounded-lg inline-flex">
              <div className="flex">
                {/* Stars */}
                {Userme && Userme.role_details && Userme.role_details.rate ? (
                  <>
                    {/* Full Stars */}
                    {Array.from({ length: Math.floor(Userme.role_details.rate) }, (_, index) => (
                      <span key={index} className="text-yellow-500 text-sm">★</span>
                    ))}

                    {/* Half Star */}
                    {Userme.role_details.rate % 1 >= 0.5 && (
                      <span className="text-yellow-500 text-sm">★</span>
                    )}

                    {/* Empty Stars */}
                    {Array.from({ length: 5 - Math.ceil(Userme.role_details.rate) }, (_, index) => (
                      <span key={index + Math.floor(Userme.role_details.rate)} className="text-gray-300 dark:text-gray-600 text-sm">★</span>
                    ))}
                  </>
                ) : (
                  /* Default stars when no rating */
                  Array.from({ length: 5 }, (_, index) => (
                    <span key={index} className="text-gray-300 dark:text-gray-600 text-sm">★</span>
                  ))
                )}
              </div>

              {/* Rating Number */}
              {Userme && Userme.role_details && Userme.role_details.rate && (
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  {typeof Userme.role_details.rate === 'number'
                    ? Userme.role_details.rate.toFixed(1)
                    : parseFloat(Userme.role_details.rate)
                      ? parseFloat(Userme.role_details.rate).toFixed(1)
                      : '0.0'}
                </span>
              )}
            </div>

            {/* Description - Simplified */}
            <div className="mt-3 max-w-2xl">
              <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                About Me
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-xs sm:text-sm line-clamp-2 hover:line-clamp-none transition-all duration-300">
                {Userme && Userme.role_details && Userme.role_details.bio ? Userme.role_details.bio : 'No bio available. Add a short description about yourself to help others know you better.'}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2 items-center">
            <button
              onClick={() => window.location.href = '/dashboard/edit-profile'}
              className="inline-flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Profile
            </button>

            {Userme && Userme.role_details && Userme.role_details.portfolio_link && (
              <a
                href={Userme.role_details.portfolio_link.startsWith('http') ? Userme.role_details.portfolio_link : `https://${Userme.role_details.portfolio_link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 border border-blue-600 text-blue-600 text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Portfolio
              </a>
            )}

            <button
              onClick={() => document.getElementById('edit-profile-modal').click()}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBanner;
