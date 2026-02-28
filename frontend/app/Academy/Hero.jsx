"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaGraduationCap, FaLaptopCode, FaCertificate } from "react-icons/fa";

const Hero = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.3 },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section className="relative py-16 px-6 md:px-16 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary-100 dark:bg-primary-900/20 rounded-full filter blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-secondary-100 dark:bg-secondary-900/20 rounded-full filter blur-3xl opacity-60 animate-pulse"></div>

      <div className="container mx-auto flex flex-col lg:flex-row items-center">
        {/* Left Section - Text */}
        <motion.div
          className="w-full lg:w-1/2 text-center lg:text-left p-4 relative z-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            className="inline-block px-3 py-1 mb-4 text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-full"
            variants={itemVariants}
          >
            Elevate Your Skills with FyterLance Academy
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 dark:text-white"
            variants={itemVariants}
          >
            Master the Skills <br /> That Shape Your Future
          </motion.h1>

          <motion.p
            className="text-gray-600 dark:text-gray-400 mt-4 text-lg max-w-xl"
            variants={itemVariants}
          >
            Upgrade your expertise with expert-led courses. Learn, apply, and grow your career with our industry-recognized certifications.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
            variants={itemVariants}
          >
            <motion.button
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-primary-500/30 transition-all duration-300 flex items-center justify-center gap-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Browse Courses</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              className="border border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400 px-6 py-3 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Become a Trainer
            </motion.button>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center mt-8 gap-6"
            variants={itemVariants}
          >
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-600 dark:text-primary-400">
                <FaGraduationCap />
              </span>
              <span className="text-gray-700 dark:text-gray-300">Expert Instructors</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 bg-secondary-100 dark:bg-secondary-900/30 rounded-full text-secondary-600 dark:text-secondary-400">
                <FaLaptopCode />
              </span>
              <span className="text-gray-700 dark:text-gray-300">Hands-on Projects</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400">
                <FaCertificate />
              </span>
              <span className="text-gray-700 dark:text-gray-300">Recognized Certificates</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Section - Image */}
        <motion.div
          className="w-full lg:w-1/2 flex justify-center mt-10 lg:mt-0 relative z-10"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
          whileHover="hover"
        >
          <div className="relative">
            {/* Decorative elements behind image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-full filter blur-md transform scale-110 animate-pulse"></div>

            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="photos/Academy/bg.PNG"
                alt="Student Learning"
                className="w-full h-full object-cover max-w-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/fighterfish.png";
                }}
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>

              {/* Stats overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between">
                <div className="text-white text-center">
                  <div className="text-2xl font-bold">100+</div>
                  <div className="text-sm">Courses</div>
                </div>
                <div className="text-white text-center">
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-sm">Instructors</div>
                </div>
                <div className="text-white text-center">
                  <div className="text-2xl font-bold">10k+</div>
                  <div className="text-sm">Students</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
