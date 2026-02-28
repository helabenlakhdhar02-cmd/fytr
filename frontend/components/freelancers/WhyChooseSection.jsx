'use client';

import { motion } from 'framer-motion';
import { FaClock, FaLock, FaBook, FaHandshake } from 'react-icons/fa';

export default function WhyChooseSection() {
  const features = [
    {
      icon: <FaClock className="text-blue-500" size={24} />,
      title: 'Fast Selection Process',
      description: 'Find the perfect Fytr for your project quickly with our advanced matching system.'
    },
    {
      icon: <FaLock className="text-blue-500" size={24} />,
      title: 'Safe Payments & Interactions',
      description: 'Our secure platform ensures your transactions and communications are protected.'
    },
    {
      icon: <FaBook className="text-blue-500" size={24} />,
      title: 'Continuous Training & Feedback',
      description: 'Fytrs receive ongoing education and feedback to improve their skills.'
    },
    {
      icon: <FaHandshake className="text-blue-500" size={24} />,
      title: 'Collaborative Community',
      description: 'Join a supportive network of professionals working together to achieve excellence.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Why Choose FyterLance?
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          We provide a unique platform that connects talented freelancers with clients looking for quality work.
        </p>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
