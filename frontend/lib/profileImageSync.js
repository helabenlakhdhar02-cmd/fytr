'use client';

/**
 * This script ensures that profile images are synchronized across all components
 * by adding a global event listener for profile image updates.
 */

// Function to initialize profile image synchronization
export function initProfileImageSync() {
  if (typeof window === 'undefined') return;

  // Create a custom event for profile image updates
  const profileImageUpdatedEvent = new Event('profileImageUpdated');

  // Function to dispatch the event when the profile image is updated
  window.updateProfileImage = (imageUrl) => {
    // Save the image URL to localStorage
    localStorage.setItem('userProfileImage', imageUrl);
    
    // Dispatch the event
    window.dispatchEvent(profileImageUpdatedEvent);
    
    console.log('Profile image updated and event dispatched');
  };

  // Add event listener to update all profile images when the event is dispatched
  window.addEventListener('profileImageUpdated', () => {
    // Get the updated image URL from localStorage
    const imageUrl = localStorage.getItem('userProfileImage');
    if (!imageUrl) return;
    
    // Update all profile images in the DOM
    const profileImages = document.querySelectorAll('.profile-image');
    profileImages.forEach(img => {
      if (img.tagName === 'IMG') {
        img.src = imageUrl;
      }
    });
    
    console.log(`Updated ${profileImages.length} profile images`);
  });

  // Check for saved profile image on page load
  const savedProfileImage = localStorage.getItem('userProfileImage');
  if (savedProfileImage) {
    // Update all profile images on page load
    setTimeout(() => {
      window.dispatchEvent(profileImageUpdatedEvent);
    }, 500);
  }
}

// Function to update profile image
export function updateProfileImage(imageUrl) {
  if (typeof window === 'undefined') return;
  
  if (window.updateProfileImage) {
    window.updateProfileImage(imageUrl);
  } else {
    // Fallback if the global function is not available
    localStorage.setItem('userProfileImage', imageUrl);
    console.log('Profile image saved to localStorage');
  }
}

// Function to get the current profile image
export function getProfileImage() {
  if (typeof window === 'undefined') return null;
  
  return localStorage.getItem('userProfileImage');
}
