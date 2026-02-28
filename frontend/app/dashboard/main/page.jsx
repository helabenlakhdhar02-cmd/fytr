'use client';
import Navbar from '../../../components/Navbar';
import React, { useState } from 'react';
import { useUser } from "../../../context/UserContext";
import { useRouter } from 'next/navigation';

// Freelancers
import ProfileFreelancer from '../../../components/dashboard/freelancerTabs/Profile';
import ServicesFreelancer from '../../../components/dashboard/freelancerTabs/Services';
import Postes from '../../../components/dashboard/freelancerTabs/Postes';
import CommentsFreelancer from '../../../components/dashboard/freelancerTabs/Comments';

// Clients
import ProfileClient from '../../../components/dashboard/clientTabs/Profile';
import ProjectsClients from '../../../components/dashboard/clientTabs/Projects';
import ServicesClient from '../../../components/dashboard/clientTabs/Services';
import CommentsClient from '../../../components/dashboard/clientTabs/Comments';

// Promoteurs
import ProfilePromoteur from '../../../components/dashboard/promTabs/Profile';
import ServicesPromoteur from '../../../components/dashboard/promTabs/Services';

const tabsByRole = {
  freelancer: [
    { id: 'tab1', label: 'Profile', component: <ProfileFreelancer /> },
    { id: 'tab2', label: 'Services', component: <ServicesFreelancer /> },
    { id: 'tab3', label: 'Postes', 
       component: (user) => <Postes username={user.username} /> },
    { id: 'tab4', label: 'Comments', component: <CommentsFreelancer /> },
  ],
  client: [
    { id: 'tab5', label: 'Profile', component: <ProfileClient /> },
    {
      id: 'tab6',
      label: 'Projects',
      // Use a function to inject the username dynamically
      component: (user) => <ProjectsClients username={user.username} />
    },
    { id: 'tab7', label: 'Services', component: <ServicesClient /> },
    { id: 'tab8', label: 'Comments', component: <CommentsClient /> },
  ],
  promoteur: [
    { id: 'tab9', label: 'Profile', component: <ProfilePromoteur /> },
    { id: 'tab10', label: 'Services', component: <ServicesPromoteur /> },
  ],
};

const SettingsTabs = ({ user }) => {
  const tabs = tabsByRole[user.role] || [];
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');

  return (
    <div className="p-6">

      <h2 className="text-xl font-bold mb-4">Settings for {user.role}</h2>
      <nav className="flex space-x-4 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium ${
              activeTab === tab.id
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="mt-6">
        {tabs.map((tab, index) =>
          activeTab === tab.id ? (
            <div key={tab.id}>
              <h3 className="text-lg font-semibold mb-4">
                Hello from {tab.label} (Tab {index + 1})
              </h3>
              {/* Render component as function if needed */}
              {typeof tab.component === "function"
                ? tab.component(user)
                : tab.component}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

const Page = () => {
  const { userData, loading: userLoading } = useUser();
  const router = useRouter();

  if (userLoading) return <div>Loading...</div>;

  if (!userData) {
    router.push('/login');
    return null;
  }

  return (
    <div>
      <Navbar />
      <SettingsTabs user={userData} />
    </div>
  );
};

export default Page;
