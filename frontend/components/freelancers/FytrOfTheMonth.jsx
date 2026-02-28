'use client';

import { motion } from 'framer-motion';
import { FaStar, FaCheck, FaClock, FaAward } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

export default function FytrOfTheMonth() {
  const { openRegisterModal } = useAuth();

  // Mock data for Fytr of the Month
  const fytrOfMonth = {
    name: 'Sara B.',
    image: '/photos/Academy/student1.jpg',
    bio: 'Delivered 4 high-rated projects in April.',
    rank: 'halfmoon',
    rating: 4.9,
    projects: 3,
    onTime: '100%',
    skills: ['UI/UX Design', 'Web Development', 'Branding']
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Render star rating
  const renderStarRating = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`${
              i < Math.floor(rating)
                ? "text-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            } w-4 h-4`}
          />
        ))}
        <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">{rating}</span>
      </div>
    );
  };

  return (
    <section className="py-16 px-6 md:px-16 bg-gray-100 dark:bg-gray-900 relative overflow-hidden light-pattern">
      {/* Background decorative elements */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary-100 dark:bg-primary-900/20 rounded-full filter blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-secondary-100 dark:bg-secondary-900/20 rounded-full filter blur-3xl opacity-60 animate-pulse"></div>

      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mb-4">
            <FaAward className="text-yellow-600 dark:text-yellow-400 mr-2" />
            <span className="text-sm font-medium text-yellow-700 dark:text-yellow-400">Featured Talent</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Fytr of the Month
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Recognizing excellence and outstanding contributions from our community.
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col md:flex-row">
            {/* Fytr Image */}
            <div className="md:w-2/5 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20 z-0"></div>

              <div className="relative h-full flex items-center justify-center p-8 z-10">
                <div className="relative">
                  {/* Animated spotlight ring */}
                  <motion.div
                    className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-70 blur-lg"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.7, 0.9, 0.7]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  ></motion.div>

                  <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg">
                    <img
                      src={fytrOfMonth.image}
                      alt={fytrOfMonth.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/fighterfish.png";
                      }}
                    />
                  </div>

                  {/* Fytr of the Month Badge */}
                  <motion.div
                    className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full p-2 shadow-lg flex items-center justify-center w-12 h-12"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, 0, -5, 0]
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="relative">
                      <FaAward className="w-6 h-6" />
                      <motion.div
                        className="absolute inset-0 bg-white rounded-full opacity-30"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.3, 0, 0.3]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                      ></motion.div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Fytr Info */}
            <div className="md:w-3/5 p-8">
              <motion.div variants={itemVariants}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {fytrOfMonth.name}
                  </h3>

                  <div className="flex items-center">
                    <div className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <img
                        src="/images/halfmoon.png"
                        alt="Halfmoon Rank"
                        className="w-4 h-4 mr-1"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/fighterfish.png";
                        }}
                      />
                      Halfmoon Rank
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {fytrOfMonth.bio}
                </p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {fytrOfMonth.rating}★
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Rating
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {fytrOfMonth.projects}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Projects
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {fytrOfMonth.onTime}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      On-Time
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Skills:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {fytrOfMonth.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-800 dark:text-gray-200 overflow-hidden"
                        >
                          <img
                            src={`/photos/avatars/avatar-${i}.jpg`}
                            alt="Client"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/fighterfish.png";
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      Trusted by clients
                    </span>
                  </div>

                  <motion.button
                    onClick={openRegisterModal}
                    className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Profile
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Monthly Stats */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  +12% Activity since last month
                </span>
              </div>

              <div className="flex items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                  Delivery trend:
                </span>
                <svg className="w-16 h-8" viewBox="0 0 100 30">
                  <path
                    d="M0,15 L10,20 L20,10 L30,15 L40,5 L50,15 L60,10 L70,20 L80,5 L90,10 L100,5"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
