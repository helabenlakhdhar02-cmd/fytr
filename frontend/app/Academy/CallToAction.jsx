"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaGraduationCap, FaUsers, FaCertificate } from "react-icons/fa";

const CallToAction = () => {
  return (
    <section className="py-16 px-6 md:px-16 bg-gray-50 dark:bg-gray-900 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-100 dark:bg-primary-900/20 rounded-full filter blur-3xl opacity-70"></div>
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-secondary-100 dark:bg-secondary-900/20 rounded-full filter blur-3xl opacity-60"></div>
      
      <div className="container mx-auto relative z-10">
        <motion.div
          className="bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800 rounded-2xl p-8 md:p-12 shadow-xl overflow-hidden relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
              <path d="M14 16H9v-2h5V9h2v5h5v2h-5v5h-2v-5zm14 14H23v-2h5v-5h2v5h5v2h-5v5h-2v-5zm11-23h2v2h-2v-2zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2z" fill="currentColor">
              </path>
            </svg>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left side - Content */}
            <div className="text-white text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your Learning Journey Today</h2>
              <p className="text-white/80 text-lg mb-6">
                Join thousands of students who are already learning and growing their careers with our expert-led courses.
              </p>
              
              <div className="flex flex-col md:flex-row gap-4 mt-8">
                <motion.button
                  className="bg-white text-primary-700 px-6 py-3 rounded-lg font-bold shadow-lg hover:shadow-white/30 flex items-center justify-center gap-2 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Browse Courses</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
                
                <motion.button
                  className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white/10 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Become an Instructor</span>
                </motion.button>
              </div>
            </div>
            
            {/* Right side - Stats */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-white text-4xl mb-2 flex justify-center">
                  <FaGraduationCap />
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">100+</h3>
                <p className="text-white/80">Courses Available</p>
              </motion.div>
              
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-white text-4xl mb-2 flex justify-center">
                  <FaUsers />
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">10k+</h3>
                <p className="text-white/80">Active Students</p>
              </motion.div>
              
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-white text-4xl mb-2 flex justify-center">
                  <FaCertificate />
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">50+</h3>
                <p className="text-white/80">Certifications</p>
              </motion.div>
              
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-white text-4xl mb-2 flex justify-center">
                  <FaGraduationCap />
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">95%</h3>
                <p className="text-white/80">Completion Rate</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
