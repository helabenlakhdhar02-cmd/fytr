"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHashtag, FaFire, FaChartLine } from "react-icons/fa";

const trendingTopics = [
  {
    tag: "webdevelopment",
    posts: 1245,
    trending: true,
    category: "tech"
  },
  {
    tag: "freelancing",
    posts: 982,
    trending: true,
    category: "work"
  },
  {
    tag: "uidesign",
    posts: 876,
    trending: false,
    category: "design"
  },
  {
    tag: "javascript",
    posts: 754,
    trending: true,
    category: "tech"
  },
  {
    tag: "remotework",
    posts: 689,
    trending: false,
    category: "work"
  },
  {
    tag: "programming",
    posts: 542,
    trending: false,
    category: "tech"
  },
  {
    tag: "career",
    posts: 498,
    trending: true,
    category: "work"
  },
  {
    tag: "technology",
    posts: 423,
    trending: false,
    category: "tech"
  },
  {
    tag: "fyterfreelancers",
    posts: 387,
    trending: true,
    category: "community"
  },
  {
    tag: "portfoliotips",
    posts: 356,
    trending: false,
    category: "career"
  }
];

// Function to get tag color based on category
const getTagColor = (category) => {
  switch (category) {
    case 'tech':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    case 'design':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
    case 'work':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    case 'community':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    case 'career':
      return 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};

const TrendingTopics = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredTopics = activeFilter === 'all'
    ? trendingTopics
    : trendingTopics.filter(topic =>
        activeFilter === 'trending'
          ? topic.trending
          : topic.category === activeFilter
      );

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <FaFire className="text-primary-600 dark:text-primary-400" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Trending Topics</h3>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {['all', 'trending', 'tech', 'design', 'work'].map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-3 py-1 text-xs rounded-full capitalize transition-colors ${activeFilter === filter
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredTopics.slice(0, 3).map((topic, index) => (
          <motion.div
            key={topic.tag}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-2">
              <div className={`px-2 py-1 rounded-full text-xs ${getTagColor(topic.category)}`}>
                <span className="flex items-center gap-1">
                  <FaHashtag className="text-xs" />
                  {topic.tag}
                </span>
              </div>
              {topic.trending && (
                <FaChartLine className="text-green-500 dark:text-green-400 text-xs" />
              )}
            </div>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
              {topic.posts}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline w-full text-center flex items-center justify-center gap-1">
          <span>Explore all topics</span>
          <FaChartLine className="text-xs" />
        </button>
      </div>
    </motion.div>
  );
};

export default TrendingTopics;
