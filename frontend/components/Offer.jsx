'use client';

import { motion } from 'framer-motion';
import { FaArrowRight, FaGraduationCap, FaCertificate, FaLaptopCode } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Offer = () => {
  const { openLoginModal } = useAuth();

  const features = [
    {
      icon: <FaGraduationCap className="text-2xl" />,
      title: "Expert-Led Courses",
      description: "Learn from industry professionals with real-world experience"
    },
    {
      icon: <FaCertificate className="text-2xl" />,
      title: "Recognized Certifications",
      description: "Earn credentials that employers value and respect"
    },
    {
      icon: <FaLaptopCode className="text-2xl" />,
      title: "Hands-On Projects",
      description: "Build a portfolio with real projects that showcase your skills"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
          <path d="M14 16H9v-2h5V9h2v5h5v2h-5v5h-2v-5zm14 14H23v-2h5v-5h2v5h5v2h-5v5h-2v-5zm11-23h2v2h-2v-2zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2zm-28 0h2v2h-2v-2zm0-4h2v2h-2v-2zm0-4h2v2h-2v-2zm0-4h2v2h-2v-2zm0-4h2v2h-2v-2zm0-4h2v2h-2v-2zm0-4h2v2h-2v-2zm0-4h2v2h-2v-2zm32-8h2v2h-2v-2zm-4 0h2v2h-2v-2zm-4 0h2v2h-2v-2zm-8 32h2v2h-2v-2zm-4 0h2v2h-2v-2zm-4 0h2v2h-2v-2zm-4 0h2v2h-2v-2z" fill="currentColor" fillOpacity="0.4">
          </path>
        </svg>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left content */}
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-primary-600 dark:text-primary-400 font-bold mb-3">What we offer</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Master the most in-demand skills</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 max-w-xl">Gain hands-on experience, earn certifications, and stand out in the job market with our comprehensive learning platform.</p>

            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 p-3 rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              onClick={openLoginModal}
              className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-primary-500/30 transform transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Get Started</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Right image */}
          <motion.div
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-2xl filter blur-md transform scale-105"></div>
              <img
                src="/photos/skills.jpg"
                alt="Skills Development"
                className="relative z-10 w-full h-auto rounded-xl object-cover shadow-xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/fighterfish.png";
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Offer