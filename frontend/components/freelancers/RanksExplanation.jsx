'use client';

import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { FaTrophy, FaUsers, FaArrowRight } from 'react-icons/fa';

export default function RanksExplanation() {
  const { openRegisterModal } = useAuth();

  const ranks = [
    {
      name: 'Veiltail',
      description: 'Established Fytrs with proven skills.',
      criteria: '6-10 projects with consistent quality',
      symbol: 'Long flowing tail icon',
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-700 dark:text-green-400',
      borderColor: 'border-green-200 dark:border-green-800',
      image: '/images/veiltail.png',
      fallbackImage: '/fighterfish.png',
      tailType: 'Long flowing tail',
      projects: '6-10',
      rating: '4.0+'
    },
    {
      name: 'Crowntail',
      description: 'Advanced Fytrs with exceptional skills.',
      criteria: '11-20 projects with high ratings',
      symbol: 'Crown-like tail icon',
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-700 dark:text-blue-400',
      borderColor: 'border-blue-200 dark:border-blue-800',
      image: '/images/crowntail.png',
      fallbackImage: '/fighterfish.png',
      tailType: 'Crown-like tail',
      projects: '11-20',
      rating: '4.3+'
    },
    {
      name: 'Halfmoon',
      description: 'Elite Fytrs who are masters in their field.',
      criteria: '20+ projects with exceptional ratings',
      symbol: 'Half-circle dynamic tail',
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-700 dark:text-purple-400',
      borderColor: 'border-purple-200 dark:border-purple-800',
      image: '/images/halfmoon.png',
      fallbackImage: '/fighterfish.png',
      tailType: 'Half-circle dynamic tail',
      projects: '20+',
      rating: '4.7+'
    }
  ];

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
          <div className="inline-flex items-center justify-center p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <FaTrophy className="text-blue-600 dark:text-blue-400 mr-2" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Fytr Rank System</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Fytr Rank Breakdown
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Our premium fish-themed ranking system showcases the elite Fytrs from Veiltail to Halfmoon.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {ranks.map((rank, index) => (
            <motion.div
              key={rank.name}
              variants={itemVariants}
              className={`${rank.bgColor} rounded-lg shadow-md overflow-hidden border ${rank.borderColor} hover:shadow-xl transition-all duration-300 group`}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className={`h-2 bg-gradient-to-r ${rank.color}`}></div>

              <div className="p-5">
                <div className="w-20 h-20 mx-auto mb-4 relative group-hover:scale-110 transition-transform duration-300">
                  <motion.img
                    src={rank.image}
                    alt={`${rank.name} Rank`}
                    className="w-full h-full object-contain drop-shadow-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = rank.fallbackImage;
                    }}
                    animate={{
                      y: [0, -5, 0],
                      rotate: [0, 1, 0, -1, 0]
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: index * 0.2
                    }}
                  />
                </div>

                <h3 className={`text-xl font-bold ${rank.textColor} mb-2 text-center`}>
                  {rank.name}
                </h3>

                <p className="text-gray-700 dark:text-gray-300 mb-3 text-sm text-center">
                  {rank.description}
                </p>

                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 mb-3">
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-medium mb-1">Criteria:</div>
                  <div className="text-sm text-gray-800 dark:text-gray-200">
                    {rank.criteria}
                  </div>
                </div>

                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                  <div>
                    <span className="font-medium">Projects:</span> {rank.projects}
                  </div>
                  <div>
                    <span className="font-medium">Rating:</span> {rank.rating}
                  </div>
                </div>
              </div>

              <div className={`p-3 border-t ${rank.borderColor} ${rank.bgColor} flex justify-center`}>
                <button
                  onClick={openRegisterModal}
                  className="text-xs font-medium text-gray-700 dark:text-gray-300 hover:underline flex items-center"
                >
                  <span>See Top Fytrs</span>
                  <FaArrowRight className="ml-1 w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <button
            onClick={openRegisterModal}
            className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-bold text-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 mx-auto"
          >
            <FaUsers className="mr-2" />
            <span>Join FytrLance and Start Your Journey</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
