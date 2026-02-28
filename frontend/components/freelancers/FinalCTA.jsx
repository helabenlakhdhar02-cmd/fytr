'use client';

import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { FaArrowRight } from 'react-icons/fa';

export default function FinalCTA() {
  const { openRegisterModal } = useAuth();

  // Animation for the fish swimming toward the button
  const fishAnimation = {
    animate: {
      x: [0, 20, 0],
      y: [0, -5, 0],
      rotate: [0, 5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative overflow-hidden py-16 light-pattern">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-800"></div>

      {/* Background decorative elements */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-400/30 rounded-full filter blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-300/30 rounded-full filter blur-3xl opacity-60 animate-pulse"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Want Your Work Here?
          </motion.h2>

          <motion.p
            className="text-xl text-blue-100 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            FytrLance is waiting for your talent. Join our community of skilled professionals or post your project today.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.button
              onClick={openRegisterModal}
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg shadow-lg hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2 group"
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              whileTap={{ y: 0 }}
            >
              <span>Start as Fytr</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              onClick={openRegisterModal}
              className="px-8 py-4 bg-blue-700 text-white border border-blue-400 rounded-lg font-bold text-lg shadow-lg hover:bg-blue-800 transition-all duration-300 flex items-center justify-center gap-2 group"
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              whileTap={{ y: 0 }}
            >
              <span>Post a Project</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
