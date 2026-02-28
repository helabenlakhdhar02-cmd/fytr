"use client";

import React, { useState, useEffect } from 'react';
import Hero from './Hero';
import PopularCourses from './PopularCourses';
import FreeCategory from "./FreeCategory";
import FeaturedInstructors from "./FeaturedInstructors";
import StudentsReview from "./StudentsReview";
import CallToAction from "./CallToAction";
import Navbar from "../../components/Navbar";
import { motion } from "framer-motion";
import { FaArrowRight, FaLaptopCode, FaUserGraduate, FaCertificate } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import DailyProgressModal from "../../components/DailyProgressModal";

const Academy = () => {
  const { openLoginModal } = useAuth();

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Navbar />
      <DailyProgressModal />

      {/* Hero Section */}
      <Hero />

      {/* Why Choose Us Section */}
      <section className="py-16 px-6 md:px-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-full">
              Why Choose FyterLance Academy
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              We Always Ensure the Best Learning Experience
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
              Our platform offers industry-leading courses designed to help you master new skills and advance your career.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 text-2xl mb-6">
                <FaLaptopCode />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Expert-Led Courses</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Learn from industry professionals with years of real-world experience. Our instructors are passionate about sharing their knowledge and helping you succeed.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-14 h-14 bg-secondary-100 dark:bg-secondary-900/30 rounded-full flex items-center justify-center text-secondary-600 dark:text-secondary-400 text-2xl mb-6">
                <FaUserGraduate />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Hands-On Learning</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Apply what you learn with practical projects and assignments. Our courses focus on real-world applications to ensure you gain practical skills employers value.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 text-2xl mb-6">
                <FaCertificate />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recognized Certifications</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Earn industry-recognized certificates upon course completion. Add them to your resume and LinkedIn profile to showcase your new skills to employers.
              </p>
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.button
              onClick={openLoginModal}
              className="bg-primary-600 hover:bg-primary-700 text-white transition-all duration-300 px-8 py-3 rounded-lg flex items-center justify-center gap-2 mx-auto shadow-lg hover:shadow-primary-500/30 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-semibold">Join Us Now</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <PopularCourses />

      {/* Free Courses Categories */}
      <FreeCategory />

      {/* Featured Instructors */}
      <FeaturedInstructors />

      {/* Student Reviews */}
      <StudentsReview />

      {/* Call to Action */}
      <CallToAction />
    </div>
  );
};

export default Academy;
