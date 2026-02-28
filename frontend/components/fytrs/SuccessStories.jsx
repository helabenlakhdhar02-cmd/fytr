'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// Mock success stories data
const mockSuccessStories = [
  {
    id: 1,
    clientName: 'Sarah Johnson',
    clientCompany: 'TechStart Inc.',
    clientImage: '/images/client1.jpg',
    fytrName: 'Ahmed Hassan',
    fytrImage: '/fighterfish.png',
    projectTitle: 'E-commerce Website Redesign',
    testimonial: 'Working with Ahmed was an absolute pleasure. He understood our vision from day one and delivered a stunning website that exceeded our expectations. Our conversion rate has increased by 40% since the redesign!',
    rating: 5,
    category: 'Web Development',
    date: '2 months ago'
  },
  {
    id: 2,
    clientName: 'Michael Chen',
    clientCompany: 'GrowthMarketing',
    clientImage: '/images/client2.jpg',
    fytrName: 'Leila Mahmoud',
    fytrImage: '/fighterfish.png',
    projectTitle: 'Social Media Marketing Campaign',
    testimonial: 'Leila helped us develop a comprehensive social media strategy that transformed our online presence. Her expertise in digital marketing is unmatched. We saw a 200% increase in engagement within just one month!',
    rating: 4.5,
    category: 'Digital Marketing',
    date: '1 month ago'
  },
  {
    id: 3,
    clientName: 'David Wilson',
    clientCompany: 'AppInnovate',
    clientImage: '/images/client3.jpg',
    fytrName: 'Omar Farooq',
    fytrImage: '/fighterfish.png',
    projectTitle: 'Mobile App Development',
    testimonial: 'Omar delivered our app on time and on budget. His technical skills and attention to detail made the development process smooth and efficient. The app has already gained 10,000+ downloads in its first week!',
    rating: 5,
    category: 'Mobile Development',
    date: '3 weeks ago'
  }
];

const SuccessStories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Render star rating
  const renderStarRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" size={16} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-400 opacity-50" size={16} />);
      } else {
        stars.push(<FaStar key={i} className="text-gray-300 dark:text-gray-600" size={16} />);
      }
    }

    return stars;
  };

  // Handle navigation
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? mockSuccessStories.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === mockSuccessStories.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentStory = mockSuccessStories[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Success Stories</h2>
        <div className="flex space-x-2">
          <button
            onClick={goToPrevious}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            aria-label="Previous story"
          >
            <FaArrowLeft size={16} />
          </button>
          <button
            onClick={goToNext}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            aria-label="Next story"
          >
            <FaArrowRight size={16} />
          </button>
        </div>
      </div>

      <motion.div
        key={currentStory.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg border border-blue-100 dark:border-blue-900 overflow-hidden"
      >
        <div className="p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <div className="flex items-start mb-6">
                <FaQuoteLeft className="text-blue-400 dark:text-blue-300 mr-4 mt-1" size={24} />
                <p className="text-gray-700 dark:text-gray-300 text-lg italic">
                  "{currentStory.testimonial}"
                </p>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {renderStarRating(currentStory.rating)}
                </div>
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  {currentStory.rating.toFixed(1)} rating
                </span>
              </div>
              
              <div className="flex items-center">
                <div className="mr-4">
                  <img
                    src={currentStory.clientImage}
                    alt={currentStory.clientName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/fighterfish.png";
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {currentStory.clientName}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {currentStory.clientCompany}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/3 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Project Details
              </h3>
              
              <div className="mb-4">
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                  {currentStory.projectTitle}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {currentStory.category} • Completed {currentStory.date}
                </p>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Completed by:
                </p>
                <div className="flex items-center">
                  <img
                    src={currentStory.fytrImage}
                    alt={currentStory.fytrName}
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-100 dark:border-blue-900 mr-3"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/fighterfish.png";
                    }}
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {currentStory.fytrName}
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                      View Profile
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      <div className="flex justify-center mt-4">
        {mockSuccessStories.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 mx-1 rounded-full ${
              index === currentIndex
                ? 'bg-blue-600 dark:bg-blue-400'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
            aria-label={`Go to story ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default SuccessStories;
