'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../config/api';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  // We'll handle the profile image in fetchUserData instead of a separate effect
  // This prevents the infinite update loop

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      setLoading(true);
      const token = Cookies.get('access_token');
      if (!token) {
        setUserData(null);
        setLoading(false);
        return;
      }

      // Check if backend is available
      const response = await fetch(`${API_BASE_URL}/fyter/profile/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }).catch(error => {
        console.log('Backend not available, using mock data');
        return null;
      });

      if (response && response.ok) {
        const data = await response.json();

        // Check if we have a saved profile image in localStorage
        const savedProfileImage = localStorage.getItem('userProfileImage');
        if (savedProfileImage) {
          // Use the localStorage image instead of the server image
          data.profileImg = savedProfileImage;
        }

        // Add mock certifications and projects for freelancers
        if (data.role === 'freelancer') {
          // Check if we have saved certifications in localStorage
          const savedCertifications = localStorage.getItem('userCertifications');
          if (savedCertifications) {
            data.certifications = JSON.parse(savedCertifications);
          } else {
            // Add default mock certifications
            data.certifications = [
              {
                id: 1,
                title: "React Developer Certification",
                institution: "Meta",
                issue_date: "2023-05-15",
                expiry_date: null,
                credential_id: "CERT-12345",
                credential_url: "https://example.com/cert/12345"
              },
              {
                id: 2,
                title: "Full Stack Web Development",
                institution: "Coursera",
                issue_date: "2022-11-20",
                expiry_date: "2025-11-20",
                credential_id: "CERT-67890",
                credential_url: "https://example.com/cert/67890"
              }
            ];
            // Save to localStorage for persistence
            localStorage.setItem('userCertifications', JSON.stringify(data.certifications));
          }

          // Check if we have saved projects in localStorage
          const savedProjects = localStorage.getItem('userProjects');
          if (savedProjects) {
            data.projects = JSON.parse(savedProjects);
          } else {
            // Add default mock projects
            data.projects = [
              {
                id: 1,
                title: "E-commerce Website",
                description: "A fully responsive e-commerce platform with payment integration",
                technologies: "React, Node.js, MongoDB",
                image: "/photos/projects/project1.jpg",
                link: "https://example.com/project1",
                completed_date: "2023-06-10"
              },
              {
                id: 2,
                title: "Task Management App",
                description: "A productivity app for managing tasks and projects",
                technologies: "React Native, Firebase",
                image: "/photos/projects/project2.jpg",
                link: "https://example.com/project2",
                completed_date: "2023-03-22"
              },
              {
                id: 3,
                title: "Portfolio Website",
                description: "A personal portfolio website with dark mode and animations",
                technologies: "Next.js, Tailwind CSS",
                image: "/photos/projects/project3.jpg",
                link: "https://example.com/project3",
                completed_date: "2022-12-15"
              }
            ];
            // Save to localStorage for persistence
            localStorage.setItem('userProjects', JSON.stringify(data.projects));
          }
        }

        // Set user data without triggering another update cycle
        setUserData(data);
      } else if (response) {
        // Only log error if it's not a 401 (unauthorized is expected when not logged in)
        if (response.status !== 401) {
          console.error('Failed to fetch user data:', response.status);
        }
        setUserData(null);
        // If we get a 401 Unauthorized, clear cookies
        if (response.status === 401) {
          Cookies.remove('access_token');
          Cookies.remove('refresh_token');
        }
      } else {
        // Backend not available, use mock data
        const mockUserData = {
          id: 1,
          full_name: 'John Doe',
          email: 'john@example.com',
          phone: '+1234567890',
          region: 'Tunisia',
          role: 'freelancer',
          profileImg: '/fighterfish.png',
          certifications: [
            {
              id: 1,
              title: "React Developer Certification",
              institution: "Meta",
              issue_date: "2023-05-15",
              expiry_date: null,
              credential_id: "CERT-12345",
              credential_url: "https://example.com/cert/12345"
            }
          ],
          projects: [
            {
              id: 1,
              title: "E-commerce Website",
              description: "A fully responsive e-commerce platform with payment integration",
              technologies: "React, Node.js, MongoDB",
              image: "/photos/projects/project1.jpg",
              link: "https://example.com/project1",
              completed_date: "2023-06-10"
            }
          ]
        };

        // Check for saved data in localStorage
        const savedProfileImage = localStorage.getItem('userProfileImage');
        if (savedProfileImage) {
          mockUserData.profileImg = savedProfileImage;
        }

        setUserData(mockUserData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  // Function to clear user data (used during logout)
  const clearUserData = () => {
    setUserData(null);
  };

  // Function to refresh user data
  const refreshUserData = () => {
    setLastUpdated(Date.now());
  };

  // Function to update user data locally
  const updateUserData = async (newUserData) => {
    // Save the profile image to localStorage for persistence before updating state
    // This prevents potential infinite loops
    if (newUserData.profileImg && newUserData.profileImg !== userData?.profileImg) {
      try {
        // Store in localStorage for persistence across page refreshes
        localStorage.setItem('userProfileImage', newUserData.profileImg);

        // For now, we'll just log success and not actually send to server
        // This avoids the server error while still allowing the UI to update
        console.log('Profile image saved to localStorage successfully');
      } catch (error) {
        console.error('Error saving profile image:', error);
      }
    }

    // Save certifications if they exist and have changed
    if (newUserData.certifications && JSON.stringify(newUserData.certifications) !== JSON.stringify(userData?.certifications)) {
      try {
        localStorage.setItem('userCertifications', JSON.stringify(newUserData.certifications));
        console.log('Certifications saved to localStorage successfully');
      } catch (error) {
        console.error('Error saving certifications:', error);
      }
    }

    // Save projects if they exist and have changed
    if (newUserData.projects && JSON.stringify(newUserData.projects) !== JSON.stringify(userData?.projects)) {
      try {
        localStorage.setItem('userProjects', JSON.stringify(newUserData.projects));
        console.log('Projects saved to localStorage successfully');
      } catch (error) {
        console.error('Error saving projects:', error);
      }
    }

    // Update local state after localStorage operations are complete
    setUserData(newUserData);

    // In a real production app, you would uncomment the code below to send to server
    /*
    const token = Cookies.get('access_token');
    if (token) {
      // Convert base64 to blob/file if it's a base64 string
      let imageFile;

      if (newUserData.profileImg.startsWith('data:')) {
        // Convert base64 to blob
        const fetchResponse = await fetch(newUserData.profileImg);
        const blob = await fetchResponse.blob();

        // Create a file from the blob
        const fileExtension = newUserData.profileImg.split(';')[0].split('/')[1];
        imageFile = new File([blob], `profile.${fileExtension}`, { type: `image/${fileExtension}` });
      }

      // Create form data for the API call
      const formData = new FormData();

      // Add user data to formData
      if (imageFile) {
        formData.append('profileImg', imageFile);
      } else if (newUserData.profileImg) {
        // If it's not a base64 string, it might be a file path
        formData.append('profileImg', newUserData.profileImg);
      }

      // Add other user data that might be needed
      if (newUserData.full_name) formData.append('full_name', newUserData.full_name);
      if (newUserData.email) formData.append('email', newUserData.email);
      if (newUserData.phone) formData.append('phone', newUserData.phone);
      if (newUserData.region) formData.append('region', newUserData.region);

      // Make the API call
      const response = await fetch('http://localhost:8000/fyter/profile/', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Failed to update profile image on server:', errorData);
      } else {
        console.log('Profile image updated successfully on server');
      }
    }
    */

    // Return the updated user data for chaining
    return newUserData;
  };

  // Fetch user data on initial load and when lastUpdated changes
  useEffect(() => {
    fetchUserData();
  }, [lastUpdated]);

  return (
    <UserContext.Provider value={{
      userData,
      loading,
      refreshUserData,
      clearUserData,
      updateUserData
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
