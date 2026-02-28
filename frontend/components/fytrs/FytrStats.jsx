'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaChartBar, FaUsers, FaCheckCircle, FaStar, FaClock, FaGlobe } from 'react-icons/fa';

const FytrStats = ({ freelancers }) => {
  // Calculate statistics
  const calculateStats = () => {
    if (!freelancers || freelancers.length === 0) {
      return {
        totalFytrs: 0,
        verifiedFytrs: 0,
        averageRating: 0,
        topCategories: [],
        responseTime: '0h',
        regions: {}
      };
    }

    // Count verified freelancers
    const verifiedFytrs = freelancers.filter(f => f.verified).length;
    
    // Calculate average rating
    const totalRating = freelancers.reduce((sum, f) => sum + (f.rate || 0), 0);
    const averageRating = totalRating / freelancers.length;
    
    // Get top categories
    const categoriesMap = {};
    freelancers.forEach(f => {
      const skills = (f.skills || '').split(',').map(s => s.trim()).filter(Boolean);
      skills.forEach(skill => {
        categoriesMap[skill] = (categoriesMap[skill] || 0) + 1;
      });
    });
    
    const topCategories = Object.entries(categoriesMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([category]) => category);
    
    // Calculate regions distribution
    const regions = {};
    freelancers.forEach(f => {
      if (f.region) {
        regions[f.region] = (regions[f.region] || 0) + 1;
      }
    });
    
    // Estimate average response time (this would come from real data in a production app)
    const responseTime = '4h';
    
    return {
      totalFytrs: freelancers.length,
      verifiedFytrs,
      averageRating,
      topCategories,
      responseTime,
      regions
    };
  };

  const stats = calculateStats();
  
  // Get top 3 regions
  const topRegions = Object.entries(stats.regions)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([region, count]) => ({ region, count }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden mb-8"
    >
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center">
        <FaChartBar className="text-blue-600 dark:text-blue-400 mr-2" size={20} />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Fytr Community Stats</h2>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {/* Total Fytrs */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <FaUsers className="text-blue-600 dark:text-blue-400 mr-2" size={16} />
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Fytrs</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalFytrs}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {stats.verifiedFytrs} verified ({Math.round((stats.verifiedFytrs / stats.totalFytrs) * 100) || 0}%)
            </p>
          </div>
          
          {/* Average Rating */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <FaStar className="text-yellow-600 dark:text-yellow-400 mr-2" size={16} />
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Average Rating</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.averageRating.toFixed(1)}
            </p>
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < Math.round(stats.averageRating) 
                    ? "text-yellow-400" 
                    : "text-gray-300 dark:text-gray-600"}
                  size={12}
                />
              ))}
            </div>
          </div>
          
          {/* Response Time */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <FaClock className="text-green-600 dark:text-green-400 mr-2" size={16} />
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Avg. Response Time</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.responseTime}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              For initial project inquiries
            </p>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Categories */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Top Skills</h3>
            <div className="flex flex-wrap gap-2">
              {stats.topCategories.map((category, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
          
          {/* Top Regions */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <FaGlobe className="text-indigo-600 dark:text-indigo-400 mr-2" size={14} />
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Top Regions</h3>
            </div>
            {topRegions.length > 0 ? (
              <div className="space-y-2">
                {topRegions.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item.region}</span>
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mr-2">
                        <div
                          className="bg-indigo-500 h-2 rounded-full"
                          style={{ width: `${(item.count / stats.totalFytrs) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {Math.round((item.count / stats.totalFytrs) * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">No region data available</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FytrStats;
