'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import Navbar from '../../../components/Navbar';
import TrainerDashboard from '../../../components/trainer/TrainerDashboard';
import { API_BASE_URL } from '../../../config/api';
import Cookies from 'js-cookie';

const TrainerDashboardPage = () => {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();
  const [trainerData, setTrainerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch trainer data from backend
  useEffect(() => {
    const fetchTrainerData = async () => {
      try {
        setIsLoading(true);
        const accessToken = Cookies.get('access_token');
        
        // Fetch trainer profile data from backend
        const response = await fetch(`${API_BASE_URL}/users/profile/`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTrainerData({
            id: data.id,
            name: data.full_name,
            email: data.email,
            bio: data.bio || '',
            avatar: data.profileImg || '/fighterfish.png',
            courses: [], // Will be populated by TrainerDashboard component
            students: 0,
            rating: 0,
          });
        } else {
          // Fallback if API fails
          setTrainerData({
            id: user?.id,
            name: user?.full_name || 'Trainer',
            email: user?.email || '',
            bio: '',
            avatar: user?.profileImg || '/fighterfish.png',
            courses: [],
            students: 0,
            rating: 0,
          });
        }
      } catch (error) {
        console.error('Error fetching trainer data:', error);
        // Fallback data
        setTrainerData({
          id: user?.id,
          name: user?.full_name || 'Trainer',
          email: user?.email || '',
          bio: '',
          avatar: user?.profileImg || '/fighterfish.png',
          courses: [],
          students: 0,
          rating: 0,
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (!loading) {
      if (!isAuthenticated) {
        // Redirect to login if not authenticated
        router.push('/login');
      } else if (user?.role === 'formateur') {
        fetchTrainerData();
      } else {
        // Redirect if not a trainer
        router.push('/dashboard/home');
      }
    }
  }, [isAuthenticated, loading, router, user]);

  // Show loading state
  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <TrainerDashboard trainer={trainerData} />
    </div>
  );
};

export default TrainerDashboardPage;
