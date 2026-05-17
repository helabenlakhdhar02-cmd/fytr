"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { getPublicFreelancers } from "../../lib/auth";
import { mockFreelancers } from "../../lib/mockData";

// Import components
import FytrsFilterBar from "../../components/fytrs/FytrsFilterBar";
import FytrsGrid from "../../components/fytrs/FytrsGrid";
import FytrsSidebar from "../../components/fytrs/FytrsSidebar";
import FytrsCTA from "../../components/fytrs/FytrsCTA";
import FytrsEmptyState from "../../components/fytrs/FytrsEmptyState";
import FytrsFavorites from "../../components/fytrs/FytrsFavorites";
import FeaturedFytrs from "../../components/fytrs/FeaturedFytrs";
import SmartMatch from "../../components/fytrs/SmartMatch";
import FytrStats from "../../components/fytrs/FytrStats";
import SuccessStories from "../../components/fytrs/SuccessStories";

const FytrsPage = () => {
  // Filter state
  const [filters, setFilters] = useState({
    search: "",
    rank: "",
    category: "",
    availability: "",
    experience: "",
    region: "",
    sortBy: "rating" // Default sorting by rating
  });

  // Freelancers state
  const [freelancers, setFreelancers] = useState([]);
  const [filteredFreelancers, setFilteredFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favoritesUpdated, setFavoritesUpdated] = useState(0);

  // Fetch freelancers data
  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        setLoading(true);
        let freelancersData;

        try {
          // Try to fetch data from API first
          freelancersData = await getPublicFreelancers();
       
        } catch (error) {
          console.error("Failed to fetch freelancers from API, using mock data:", error);
          // Use mock data if API fails
          
        }

        setFreelancers(freelancersData);
        setFilteredFreelancers(freelancersData);
      } catch (error) {
        console.error("Failed to fetch freelancers:", error);
        // Use mock data in case of any error
        
      } finally {
        setLoading(false);
      }
    };

    fetchFreelancers();
  }, []);

  // Check for favorites parameter in URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const viewParam = urlParams.get('view');
      setShowFavorites(viewParam === 'favorites');
    }
  }, []);

  // Apply filters when filters or freelancers data change
  useEffect(() => {
    if (freelancers.length === 0) return;

    let results = [...freelancers];

    // If favorites view is active, filter results by favorites
    if (showFavorites) {
      const favorites = JSON.parse(localStorage.getItem('fytrFavorites') || '[]');
      const favoriteIds = favorites.map(fav => fav.id);
      results = results.filter(freelancer => favoriteIds.includes(freelancer.id));
    }

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      results = results.filter(
        (freelancer) =>
          (freelancer.user?.full_name || "").toLowerCase().includes(searchLower) ||
          (freelancer.bio || "").toLowerCase().includes(searchLower) ||
          (freelancer.skills || "").toLowerCase().includes(searchLower)
      );
    }

    // Apply rank filter
    if (filters.rank) {
      // Map rank names to level field in data
      const rankMap = {
        silver: "beginner",
        gold: "intermediate",
        platinum: "expert"
      };

      results = results.filter(freelancer =>
        (freelancer.level || "").toLowerCase() === rankMap[filters.rank]
      );
    }

    // Apply category filter
    if (filters.category) {
      results = results.filter(freelancer => {
        if (!freelancer.skills) return false;
        return freelancer.skills.toLowerCase().includes(filters.category.toLowerCase());
      });
    }

    // Apply availability filter
    if (filters.availability) {
      results = results.filter(freelancer => {
        if (filters.availability === "available") {
          return freelancer.availability !== false;
        } else {
          return freelancer.availability === false;
        }
      });
    }

    // Apply experience level filter
    if (filters.experience) {
      const experienceMap = {
        beginner: "beginner",
        intermediate: "intermediate",
        expert: "expert"
      };

      results = results.filter(freelancer =>
        (freelancer.level || "").toLowerCase() === experienceMap[filters.experience]
      );
    }

    // Apply region filter
    if (filters.region) {
      results = results.filter(freelancer =>
        (freelancer.region || "").toLowerCase().includes(filters.region.toLowerCase())
      );
    }

    // Apply sorting
    results.sort((a, b) => {
      switch (filters.sortBy) {
        case "rating":
          return (b.rate || 0) - (a.rate || 0);
        case "experience":
          // Sort by level then by completed projects
          const rankOrder = { expert: 3, intermediate: 2, beginner: 1, "": 0 };
          const rankDiff = (rankOrder[b.level?.toLowerCase() || ""] || 0) - (rankOrder[a.level?.toLowerCase() || ""] || 0);
          if (rankDiff !== 0) return rankDiff;
          return (b.completed_projects || 0) - (a.completed_projects || 0);
        case "recent":
          // By default, assume newer is higher ID
          return (b.id || 0) - (a.id || 0);
        case "best_match":
          // Composite sorting combining rating, level and projects
          const aScore = (a.rate || 0) * 0.5 + (rankOrder[a.level?.toLowerCase() || ""] || 0) * 0.3 + (a.completed_projects || 0) * 0.2;
          const bScore = (b.rate || 0) * 0.5 + (rankOrder[b.level?.toLowerCase() || ""] || 0) * 0.3 + (b.completed_projects || 0) * 0.2;
          return bScore - aScore;
        default:
          return (b.rate || 0) - (a.rate || 0);
      }
    });

    setFilteredFreelancers(results);
  }, [filters, freelancers, showFavorites, favoritesUpdated]);

  // Handle filter changes
  const handleFilterChange = (updatedFilters) => {
    setFilters({ ...filters, ...updatedFilters });
  };

  // Handle favorite toggle
  const handleFavoriteToggle = (id, isFavorite) => {
    // Update favorites counter to reapply filters
    setFavoritesUpdated(prev => prev + 1);

    // Find freelancer name to display in notification
    const freelancer = freelancers.find(f => f.id === id);
    const freelancerName = freelancer?.user?.full_name || "Freelancer";

    // Show appropriate notification
    if (isFavorite) {
      toast.success(
        <div>
          <b>{freelancerName}</b> added to favorites
          <div className="text-xs mt-1">
            <Link href="/fytrs?view=favorites" className="text-blue-500 hover:underline">
              View all favorites
            </Link>
          </div>
        </div>,
        {
          duration: 3000,
          icon: '❤️',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      );
    } else {
      toast.success(
        <div>
          <b>{freelancerName}</b> removed from favorites
        </div>,
        {
          duration: 2000,
          icon: '🗑️',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      );
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Toaster position="top-right" />
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {showFavorites ? "Favorite Fytrs" : "Fytrs"}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {showFavorites
                  ? "Manage your saved freelancers and find them quickly"
                  : "Find the perfect freelancer for your project from our talented community"}
              </p>
            </div>

            {showFavorites && (
              <Link
                href="/fytrs"
                className="bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium flex items-center"
              >
                <span>View All Fytrs</span>
              </Link>
            )}
          </div>
        </motion.div>

        {/* Smart Match Tool */}
        {!showFavorites && <SmartMatch freelancers={freelancers} onApplyFilters={handleFilterChange} />}

        {/* Favorites component */}
        {!showFavorites && <FytrsFavorites />}

        {/* Featured Fytrs */}
        {!showFavorites && !loading && <FeaturedFytrs freelancers={freelancers} />}

        {/* Filter bar */}
        <FytrsFilterBar filters={filters} onFilterChange={handleFilterChange} />

        {/* Main content */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Freelancers grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : filteredFreelancers.length > 0 ? (
              <>
                <FytrsGrid
                  freelancers={filteredFreelancers}
                  onFavoriteToggle={handleFavoriteToggle}
                />

                {/* Success Stories */}
                {!showFavorites && <div className="hidden"><SuccessStories /></div>}
              </>
            ) : (
              <FytrsEmptyState onReset={() => setFilters({
                search: "",
                rank: "",
                category: "",
                availability: "",
                experience: "",
                region: "",
                sortBy: "rating"
              })} />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {!showFavorites && !loading && <FytrStats freelancers={freelancers} />}
            <FytrsSidebar freelancers={freelancers} />
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-16">
          <FytrsCTA />
        </div>
      </main>
    </div>
  );
};

export default FytrsPage;
