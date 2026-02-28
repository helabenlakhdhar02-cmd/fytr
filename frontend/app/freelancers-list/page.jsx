"use client";
import React, { useState, useEffect } from "react";
import { getPublicFreelancers } from "../../lib/auth";
import { useAuth } from '../../context/AuthContext';
import { mockFreelancers } from "../../lib/mockData";
import Navbar from "../../components/Navbar";

// Import components
import FreelancersHero from '../../components/freelancers/FreelancersHero';
import ProjectGallery from '../../components/freelancers/ProjectGallery';
import RanksExplanation from '../../components/freelancers/RanksExplanation';
import FytrOfTheMonth from '../../components/freelancers/FytrOfTheMonth';
import Leaderboard from '../../components/freelancers/Leaderboard';
import TestimonialsSection from '../../components/freelancers/TestimonialsSection';
import FinalCTA from '../../components/freelancers/FinalCTA';
import WhyChooseSection from '../../components/freelancers/WhyChooseSection';

const FreelancersListPage = () => {
  // State for filters
  const [filters, setFilters] = useState({
    search: '',
    skills: [],
    rank: '',
    rating: 0,
    location: ''
  });

  // Handle filter changes
  const handleFilterChange = (updatedFilters) => {
    setFilters({ ...filters, ...updatedFilters });
  };

  return (
    <div className='bg-gray-50 dark:bg-gray-900 min-h-screen'>
      <Navbar />

      {/* 1. Hero Section */}
      <FreelancersHero />

      {/* 2. Project Gallery Section */}
      <ProjectGallery />

      {/* 4. Fytr of the Month Highlight */}
      <FytrOfTheMonth />

      {/* 5. Leaderboard */}
      <Leaderboard />

      {/* 3. Fytr Rank Breakdown Section */}
      <RanksExplanation />

      {/* 6. Testimonials Section */}
      <TestimonialsSection />

      {/* 7. Why Choose FyterLance (Trust Section) */}
      <div className="bg-white dark:bg-gray-800">
        <WhyChooseSection />
      </div>

      {/* 8. Final Call-to-Action Section */}
      <FinalCTA />
    </div>
  );
};

export default FreelancersListPage;
