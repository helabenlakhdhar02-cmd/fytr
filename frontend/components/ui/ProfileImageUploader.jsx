'use client';

import { useState, useRef, useEffect } from 'react';
import { FaCamera, FaSpinner, FaCheck, FaTimes } from 'react-icons/fa';
import NextImage from 'next/image';
import { useUser } from '../../context/UserContext';
import { updateProfileImage, initProfileImageSync } from '../../lib/profileImageSync';
import { API_BASE_URL } from '../../config/api';

const ProfileImageUploader = ({ onImageUpdate }) => {
  const { userData, updateUserData } = useUser();
  const [isHovering, setIsHovering] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const fileInputRef = useRef(null);

  // Initialize profile image synchronization
  useEffect(() => {
    initProfileImageSync();
  }, []);

  // Handle file selection
  const handleFileChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      // Check file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        showNotification('Please select a valid image file (JPEG, PNG, GIF, WEBP)', 'error');
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showNotification('Image size should be less than 5MB', 'error');
        return;
      }

      // Check image dimensions
      try {
        const dimensions = await getImageDimensions(file);
        if (dimensions.width < 100 || dimensions.height < 100) {
          showNotification('Image should be at least 100x100 pixels', 'error');
          return;
        }
      } catch (error) {
        console.error('Error checking image dimensions:', error);
        // Continue anyway, as this is not a critical error
      }

      setIsUploading(true);
      setUploadSuccess(false);
      setUploadError(false);

      // Convert file to base64 for preview
      const base64 = await convertToBase64(file);

      // Compress the image if it's too large
      const compressedBase64 = await compressImage(base64, file.type);

      // Make sure we have valid user data before updating
      if (!userData) {
        throw new Error('User data not available');
      }

      // Update user data with new image
      await updateUserData({
        ...userData,
        profileImg: compressedBase64
      });

      // Update profile image across all components
      updateProfileImage(compressedBase64);

      // Call the callback if provided
      if (onImageUpdate) {
        onImageUpdate(compressedBase64);
      }

      setUploadSuccess(true);
      showNotification('Profile image updated successfully', 'success');
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadError(true);
      showNotification('Failed to update profile image: ' + (error.message || 'Unknown error'), 'error');
    } finally {
      setIsUploading(false);

      // Reset success/error states after a delay
      setTimeout(() => {
        setUploadSuccess(false);
        setUploadError(false);
      }, 3000);
    }
  };

  // Get image dimensions
  const getImageDimensions = (file) => {
    return new Promise((resolve, reject) => {
      // Use the global window.Image constructor, not Next.js Image component
      const img = new window.Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };

  // Compress image if needed
  const compressImage = (base64, mimeType) => {
    return new Promise((resolve) => {
      // Use the global window.Image constructor, not Next.js Image component
      const img = new window.Image();
      img.onload = () => {
        // Create a canvas element
        const canvas = document.createElement('canvas');

        // Set maximum dimensions (maintain aspect ratio)
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;

        let width = img.width;
        let height = img.height;

        // Calculate new dimensions
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Draw image on canvas
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Get compressed base64
        const quality = 0.8; // 80% quality
        const compressedBase64 = canvas.toDataURL(mimeType, quality);

        resolve(compressedBase64);
      };
      img.src = base64;
    });
  };

  // Convert file to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // No longer needed as we're handling the upload in UserContext

  // Show notification
  const showNotification = (message, type = 'success') => {
    if (typeof document === 'undefined') return; // Guard against server-side rendering

    try {
      // Create notification element
      const notification = document.createElement('div');

      // Set class based on notification type
      notification.className = `fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg z-50 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      } text-white transform transition-all duration-300 opacity-0 translate-y-2 flex items-center`;

      // Create icon based on type
      const iconDiv = document.createElement('div');
      iconDiv.className = 'mr-2 flex-shrink-0';

      if (type === 'success') {
        iconDiv.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
        `;
      } else {
        iconDiv.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        `;
      }

      // Create message text
      const messageDiv = document.createElement('div');
      messageDiv.textContent = message;

      // Add icon and message to notification
      notification.appendChild(iconDiv);
      notification.appendChild(messageDiv);

      // Add to DOM
      document.body.appendChild(notification);

      // Trigger animation
      setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
      }, 10);

      // Remove after delay
      setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(2px)';
        setTimeout(() => {
          if (notification.parentNode) {
            document.body.removeChild(notification);
          }
        }, 300);
      }, 3000);
    } catch (error) {
      // Fallback to console if DOM manipulation fails
      console.log(`${type.toUpperCase()}: ${message}`);
    }
  };

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Profile Image */}
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-white dark:bg-gray-700 border-4 border-white dark:border-gray-800 shadow-lg relative transition-transform duration-300 group-hover:scale-105">
        {userData?.profileImg ? (
          <NextImage
            src={`http://localhost:8000${userData.profileImg}`}
            alt={userData?.full_name || "User"}
            width={128}
            height={128}
            className="h-full w-full object-cover profile-image"
            priority
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/fighterfish.png"; // Fallback image
            }}
          />
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-900 text-white">
            <span className="text-4xl font-bold">{userData?.full_name ? userData.full_name.charAt(0).toUpperCase() : '?'}</span>
            <span className="text-xs mt-1 px-2 text-center opacity-90">Add photo</span>
          </div>
        )}

        {/* Overlay on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 flex items-center justify-center transition-all duration-300 ${
            isHovering ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center">
            {isUploading ? (
              <>
                <FaSpinner className="animate-spin text-white text-xl mb-1" />
                <span className="text-white text-xs">Uploading...</span>
              </>
            ) : uploadSuccess ? (
              <>
                <FaCheck className="text-green-400 text-xl mb-1" />
                <span className="text-white text-xs">Success!</span>
              </>
            ) : uploadError ? (
              <>
                <FaTimes className="text-red-400 text-xl mb-1" />
                <span className="text-white text-xs">Error!</span>
              </>
            ) : (
              <>
                <FaCamera className="text-white text-xl mb-1" />
                <span className="text-white text-xs">Change Photo</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Status indicator with animation */}
      {isUploading && (
        <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white rounded-full p-2 shadow-lg animate-pulse">
          <FaSpinner className="animate-spin" size={14} />
        </div>
      )}
      {uploadSuccess && (
        <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-2 shadow-lg animate-bounce">
          <FaCheck size={14} />
        </div>
      )}
      {uploadError && (
        <div className="absolute -bottom-2 -right-2 bg-red-500 text-white rounded-full p-2 shadow-lg animate-shake">
          <FaTimes size={14} />
        </div>
      )}

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/jpeg,image/png,image/gif,image/webp"
        onChange={handleFileChange}
      />

      {/* Add a CSS animation for shake effect */}
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default ProfileImageUploader;
