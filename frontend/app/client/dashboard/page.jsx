'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import Navbar from '../../../components/Navbar';
import ClientDashboard from '../../../components/client/ClientDashboard';
import { mockProjects, mockClients } from '../../../lib/mockData';

const ClientDashboardPage = () => {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();
  const [clientData, setClientData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch client data
  useEffect(() => {
    // In a real app, this would fetch from an API
    const fetchClientData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For now, use mock data
        // In a real app, you would fetch this from your API
        const mockClient = mockClients.find(c => c.id === 1) || {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          company: 'Example Corp',
          projects: mockProjects,
          avatar: '/fighterfish.png'
        };
        
        setClientData(mockClient);
      } catch (error) {
        console.error('Error fetching client data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!loading) {
      if (!isAuthenticated) {
        // Redirect to login if not authenticated
        router.push('/login');
      } else {
        fetchClientData();
      }
    }
  }, [isAuthenticated, loading, router]);

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
