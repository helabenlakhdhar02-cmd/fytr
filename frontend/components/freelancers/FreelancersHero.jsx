"use client";

import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { FaArrowRight } from "react-icons/fa";

export default function FreelancersHero() {
  const { openRegisterModal } = useAuth();

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
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
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

  // Background fish animation variants
  const fishAnimationVariants = {
    animate: {
      x: [0, 10, -5, 10, 0],
      y: [0, -10, 5, -5, 0],
      rotate: [0, 2, -2, 1, 0],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative px-6 md:px-16 py-16 md:py-24 bg-gray-100 dark:bg-gray-900 overflow-hidden light-pattern">
      {/* Background decorative elements */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary-100 dark:bg-primary-900/20 rounded-full filter blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-secondary-100 dark:bg-secondary-900/20 rounded-full filter blur-3xl opacity-60 animate-pulse"></div>

      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* Content container */}
        <motion.div
          className="w-full lg:w-1/2 text-center md:text-left p-4"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
            variants={itemVariants}
          >
            Explore Real Projects Done by <span className="text-primary-600 dark:text-primary-400">Fytrs</span>
          </motion.h1>

          <motion.p
            className="text-gray-600 dark:text-gray-300 text-xl mb-8 max-w-xl leading-relaxed"
            variants={itemVariants}
          >
            Discover what our creative talents have achieved. Each project tells a story.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center sm:items-start gap-4"
            variants={itemVariants}
          >
            <motion.button
              onClick={openRegisterModal}
              className="w-full sm:w-auto px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Start Your Project</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              onClick={openRegisterModal}
              className="w-full sm:w-auto px-8 py-4 bg-white text-primary-600 border border-primary-600 rounded-lg shadow-sm hover:shadow transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Join as a Fytr</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Illustration */}
        <motion.div
          className="w-full lg:w-1/2 mt-10 md:mt-0 relative"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
          whileHover="hover"
        >
          <div className="relative max-w-md mx-auto">
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/30 to-blue-400/20 dark:from-blue-500/20 dark:to-blue-700/10 rounded-2xl filter blur-xl transform scale-110"></div>

            <motion.div
              className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-800 overflow-hidden shadow-sm"
                      >
                        <img
                          src={`/photos/avatars/avatar-${i}.jpg`}
                          alt="Fytr"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `/fighterfish.png`;
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Fytrs Collaborating</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Working together on projects</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">120+</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Projects Completed</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">98%</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Client Satisfaction</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Online Now: 42 Fytrs</span>
                  </div>
                  <div className="text-sm text-primary-600 dark:text-primary-400 font-medium">View All →</div>
                </div>
              </div>

              <div className="h-32 bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-800 flex items-center justify-center">
                <img
                  src="/1x/Plan de travail 1 copie.png"
                  alt="FytrLance Logo"
                  className="h-24 object-contain drop-shadow-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/fyterlance.png";
                  }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
