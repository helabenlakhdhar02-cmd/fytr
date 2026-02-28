"use client";
import React, { useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import { motion } from "framer-motion";

const SearchHeader = ({ title, subtitle, placeholder, onSearch, viewOptions }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedView, setSelectedView] = useState(viewOptions?.[0]?.value || "");
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm, selectedView);
    }
  };

  const handleViewChange = (view) => {
    setSelectedView(view);
    if (onSearch) {
      onSearch(searchTerm, view);
    }
  };

  return (
    <section className="rounded-xl shadow-lg bg-white dark:bg-gray-800 text-start p-8 mb-10">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {title || "Find what you need"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {subtitle || "Search for projects, services, or talent in just a few clicks"}
          </p>

          <form onSubmit={handleSearch} className="relative">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-sm">
                  <input
                    type="text"
                    placeholder={placeholder || "Search..."}
                    className="flex-1 p-4 outline-none bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-lg w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="p-4 bg-primary-600 text-white rounded-r-lg hover:bg-primary-700 transition duration-300"
                  >
                    <FaSearch size={20} />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="md:w-auto w-full flex items-center justify-center gap-2 p-4 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition duration-300"
              >
                <FaFilter />
                <span>Filters</span>
              </button>
            </div>

            {/* Filters Section */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category
                    </label>
                    <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                      <option value="">All Categories</option>
                      <option value="web-development">Web Development</option>
                      <option value="graphic-design">Graphic Design</option>
                      <option value="mobile-development">Mobile Development</option>
                      <option value="ai">AI & Machine Learning</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Price Range
                    </label>
                    <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                      <option value="">Any Price</option>
                      <option value="0-50">$0 - $50</option>
                      <option value="50-100">$50 - $100</option>
                      <option value="100-500">$100 - $500</option>
                      <option value="500+">$500+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Sort By
                    </label>
                    <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition duration-300"
                  >
                    Apply Filters
                  </button>
                </div>
              </motion.div>
            )}
          </form>

          {/* View Selection */}
          {viewOptions && viewOptions.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Choose your view</p>
              <div className="flex flex-wrap gap-3">
                {viewOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`px-6 py-3 rounded-lg text-base font-medium transition duration-300 ${
                      selectedView === option.value
                        ? "bg-primary-600 text-white shadow-md"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                    onClick={() => handleViewChange(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default SearchHeader;
