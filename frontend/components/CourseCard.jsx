'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaUsers, FaClock, FaGraduationCap, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

const getLevelColor = (level) => {
  switch(level) {
    case "Beginner": return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";
    case "Intermediate": return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
    case "Advanced": return "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400";
    default: return "bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400";
  }
};

const CourseCard = ({ course, index = 0 }) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * (index % 3) }}
    >
      {/* Course Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/fighterfish.png";
          }}
        />
        {/* Level Badge */}
        <div className={`absolute top-3 right-3 ${getLevelColor(course.level)} text-xs px-2 py-1 rounded-full`}>
          {course.level}
        </div>
      </div>
      
      {/* Course Content */}
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{course.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow">{course.description}</p>
        
        {/* Instructor and Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FaGraduationCap className="text-primary-600 dark:text-primary-400 mr-2" />
            <span className="text-gray-700 dark:text-gray-300 text-sm">{course.instructor}</span>
          </div>
          <div className="flex items-center">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < Math.floor(course.rating) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"} size={12} />
              ))}
            </div>
            <span className="text-gray-600 dark:text-gray-400 text-xs ml-1">{course.rating}</span>
          </div>
        </div>
        
        {/* Course Meta */}
        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-4">
          <div className="flex items-center">
            <FaClock className="mr-1" />
            <span>{course.totalHours || course.duration}</span>
          </div>
          <div className="flex items-center">
            <FaUsers className="mr-1" />
            <span>{course.students.toLocaleString()} students</span>
          </div>
        </div>
        
        {/* Price and Buttons */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
          <span className="text-primary-600 dark:text-primary-400 font-bold">{course.price}</span>
          <div className="flex space-x-2">
            <Link
              href={`/Academy/courses/${course.id}`}
              className="bg-primary-50 hover:bg-primary-100 dark:bg-primary-900/20 dark:hover:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-1 text-sm group"
            >
              <span>View Details</span>
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
