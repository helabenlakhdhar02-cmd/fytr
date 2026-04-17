"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Navbar from "../../../components/Navbar";
import SearchHeader from "../../../components/SearchHeader";
import CategorySection from "../../../components/CategorySection";
import FreelancerCard from "../../../components/FreelancerCard";
import TestimonialSection from "../../../components/TestimonialSection";
import { freelancerService } from "../../../lib/dataService";

const Page = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [filteredFreelancers, setFilteredFreelancers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch freelancers from API
  const fetchFreelancers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await freelancerService.getAll();
      const freelancersData = Array.isArray(data) ? data : (data.results || []);
      setFreelancers(freelancersData);
      setFilteredFreelancers(freelancersData);
    } catch (err) {
      console.error("Failed to fetch freelancers:", err);
      setError("Failed to load freelancers. Please try again later.");
      setFreelancers([]);
      setFilteredFreelancers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFreelancers();
  }, [fetchFreelancers]);

  // Handle search and filtering
  const handleSearch = (term, view) => {
    setSearchTerm(term);
    
    let results = freelancers;
    
    // Filter by search term
    if (term) {
      results = results.filter(
        (freelancer) =>
          (freelancer.user?.full_name || "").toLowerCase().includes(term.toLowerCase()) ||
          (freelancer.bio || "").toLowerCase().includes(term.toLowerCase()) ||
          (freelancer.skills || "").toLowerCase().includes(term.toLowerCase())
      );
    }
    
    // Filter by category/skill if selected
    if (selectedCategory) {
      results = results.filter((freelancer) =>
        (freelancer.skills || "").toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }
    
    setFilteredFreelancers(results);
  };

  const categories = [
    { title: "Web Development", image: "/photos/works/web.PNG" },
    { title: "Graphic Design", image: "/photos/works/design.PNG" },
    { title: "Intelligence AI", image: "/photos/works/IA.PNG" },
    { title: "Mobile Development", image: "/photos/works/mobile.PNG" },
  ];

  const testimonials = [
    {
      text: "I found the perfect freelancer for my project through FyterLance. The quality of talent on this platform is outstanding!",
      user: "Robert Johnson",
      location: "New York, USA",
      rating: 5.0,
      image: "/photos/Academy/student1.jpg"
    },
    {
      text: "As a business owner, finding reliable freelancers is crucial. FyterLance made it easy to connect with professionals who delivered exceptional work.",
      user: "Maria Garcia",
      location: "Madrid, Spain",
      rating: 4.8,
      image: "/photos/Academy/student2.jpeg"
    },
    {
      text: "The freelancers I've hired through this platform have consistently exceeded my expectations. Highly recommended!",
      user: "James Wilson",
      location: "Sydney, Australia",
      rating: 4.9,
      image: "/photos/Academy/student3.png"
    }
  ];
  
  const viewOptions = [
    { label: "Hire Talent", value: "client" },
    { label: "Find Work", value: "freelancer" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main>
        {/* Search Header */}
        <SearchHeader 
          title="Find Talented Freelancers"
          subtitle="Discover skilled professionals for your projects"
          placeholder="Search for skills, expertise, or keywords"
          onSearch={handleSearch}
          viewOptions={viewOptions}
        />

        {/* Category Section */}
        <CategorySection 
          categories={categories} 
          title="Browse Skill Categories"
          subtitle="Find freelancers with the expertise you need"
          type="freelancers"
        />

        {/* Freelancers Section */}
        <section className="py-16 px-6 md:px-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
              <div>
                <h3 className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-2">Top talent available now</h3>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  Featured <span className="text-primary-600 dark:text-primary-400">Freelancers</span>
                </h2>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center gap-4">
                <button 
                  onClick={() => setSelectedCategory("")}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
                    selectedCategory === "" 
                      ? "bg-primary-600 text-white" 
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  All
                </button>
                <button 
                  onClick={() => setSelectedCategory("design")}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
                    selectedCategory === "design" 
                      ? "bg-primary-600 text-white" 
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  Design
                </button>
                <button 
                  onClick={() => setSelectedCategory("development")}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
                    selectedCategory === "development" 
                      ? "bg-primary-600 text-white" 
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  Development
                </button>
                <button 
                  onClick={() => setSelectedCategory("marketing")}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
                    selectedCategory === "marketing" 
                      ? "bg-primary-600 text-white" 
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  Marketing
                </button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
              </div>
            ) : error ? (
              <div className="text-center py-16 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-700 dark:text-red-400 mb-4">{error}</p>
                <button
                  onClick={fetchFreelancers}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : filteredFreelancers.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl text-gray-600 dark:text-gray-400">No freelancers found matching your criteria</h3>
                <button 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("");
                    setFilteredFreelancers(freelancers);
                  }}
                  className="mt-4 px-6 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFreelancers.slice(0, 9).map((freelancer, index) => (
                  <FreelancerCard key={freelancer.id} freelancer={freelancer} index={index} />
                ))}
              </div>
            )}

            {filteredFreelancers.length > 9 && (
              <div className="mt-10 text-center">
                <a 
                  href="/freelancers-list" 
                  className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-300 inline-flex items-center gap-2"
                >
                  <span>View All Freelancers</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialSection 
          testimonials={testimonials} 
          title="What Our Clients Say"
        />

        {/* How It Works Section */}
        <section className="py-16 px-6 md:px-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                How to Hire on <span className="text-primary-600 dark:text-primary-400">FyterLance</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Finding and hiring the perfect freelancer for your project is simple and straightforward
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Post Your Project</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Describe your project in detail, including skills required, budget, and timeline.
                </p>
              </motion.div>

              {/* Step 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Review Proposals</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Browse profiles, portfolios, and proposals from talented freelancers interested in your project.
                </p>
              </motion.div>

              {/* Step 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Collaborate & Pay</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Work with your chosen freelancer and release payment when you're satisfied with the results.
                </p>
              </motion.div>
            </div>

            <div className="mt-12 text-center">
              <a 
                href="/post-project" 
                className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-300 text-lg font-medium inline-flex items-center gap-2"
              >
                <span>Post a Project</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Page;
