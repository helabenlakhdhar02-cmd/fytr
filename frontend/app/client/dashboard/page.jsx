'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import Navbar from '../../../components/Navbar';
import ClientDashboard from '../../../components/client/ClientDashboard';
import { API_BASE_URL } from '../../../config/api';
import Cookies from 'js-cookie';

const ClientDashboardPage = () => {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();
  const [clientData, setClientData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch client data from backend
  useEffect(() => {
    const fetchClientData = async () => {
      try {
        setIsLoading(true);
        const accessToken = Cookies.get('access_token');
        
        // Fetch client profile data from backend
        const response = await fetch(`${API_BASE_URL}/users/profile/`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setClientData({
            id: data.id,
            name: data.full_name,
            email: data.email,
            company: data.company || 'N/A',
            avatar: data.profileImg || '/fighterfish.png',
            projects: [], // Will be populated by ClientDashboard component
          });
        } else {
          // Fallback if API fails
          setClientData({
            id: user?.id,
            name: user?.full_name || 'Client',
            email: user?.email || '',
            company: 'N/A',
            avatar: user?.profileImg || '/fighterfish.png',
            projects: [],
          });
        }
      } catch (error) {
        console.error('Error fetching client data:', error);
        // Fallback data
        setClientData({
          id: user?.id,
          name: user?.full_name || 'Client',
          email: user?.email || '',
          company: 'N/A',
          avatar: user?.profileImg || '/fighterfish.png',
          projects: [],
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (!loading) {
      if (!isAuthenticated) {
        // Redirect to login if not authenticated
        router.push('/login');
      } else if (user?.role === 'client') {
        fetchClientData();
      } else {
        // Redirect if not a client
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
      <ClientDashboard client={clientData} />
    </div>
  );
};

export default ClientDashboardPage;
