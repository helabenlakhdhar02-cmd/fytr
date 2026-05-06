"use client";
import StatsSection from "./Stats";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { FaArrowRight, FaPlay } from "react-icons/fa";

export default function Hero() {
  const { openLoginModal } = useAuth();
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0, rotate: -5 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      },
    },
    hover: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Background pattern style for light mode only
  const patternStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  };

  return (
    <div className="flex flex-col pb-16">
      <section
        className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-16 md:py-24 bg-gray-100 dark:bg-gray-900 overflow-hidden light-pattern"
      >
        {/* Background decorative elements */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary-100 dark:bg-primary-900/20 rounded-full filter blur-3xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-secondary-100 dark:bg-secondary-900/20 rounded-full filter blur-3xl opacity-60 animate-pulse"></div>

        {/* Content container */}
        <motion.div
          className="w-full lg:w-1/2 text-center md:text-left p-4 relative z-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            className="inline-block px-3 py-1 mb-4 text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-full"
            variants={itemVariants}
          >
            Welcome to the Future of Freelancing
          </motion.div>

          <motion.h1
            className="text-3xl md:text-5xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300"
            variants={itemVariants}
          >
            <span className="text-primary-600 dark:text-primary-400">FytrLance</span>{" "}
            <span>Where the future of freelancing begins</span>
          </motion.h1>

          <motion.p
            className="text-gray-600 dark:text-gray-300 mt-6 text-lg max-w-xl leading-relaxed"
            variants={itemVariants}
          >
            Join a collaborative platform where talent meets opportunity. Connect with clients, showcase your skills, and grow your career.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row items-center sm:items-start gap-4"
            variants={itemVariants}
          >
            <button
              onClick={() => openLoginModal()}
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-medium rounded-lg shadow-lg hover:shadow-primary-500/30 transform transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 group"
            >
              <span>Get Started</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <motion.div
            className="mt-8 flex items-center justify-center md:justify-start gap-4"
            variants={itemVariants}
          >
            
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-10 md:mt-0 relative z-10"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
          whileHover="hover"
        >
          <div className="relative">
            {/* Decorative circle behind image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-full filter blur-md transform scale-110 animate-pulse"></div>

            <img
              src="/fighterfish.png"
              alt="Betta Fish"
              className="relative z-10 object-contain w-full max-w-md mx-auto drop-shadow-2xl"
            />
          </div>
        </motion.div>
      </section>

      <StatsSection/>
    </div>
  );
}
