"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaStar, FaUsers, FaLaptopCode, FaCode, FaMobileAlt, FaPalette, FaChartLine, FaCamera } from "react-icons/fa";

const categories = [
  {
    name: "Web Design",
    description: "Learn UI/UX principles and create stunning websites",
    image: "photos/Academy/js.jpg",
    icon: <FaCode />,
    students: 1240,
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "Web Development",
    description: "Master HTML, CSS, JavaScript and modern frameworks",
    image: "photos/Academy/web.jpg",
    icon: <FaLaptopCode />,
    students: 1840,
    color: "from-purple-500 to-indigo-600",
  },
  {
    name: "Digital Marketing",
    description: "Learn SEO, social media marketing and analytics",
    image: "photos/Academy/dig.png",
    icon: <FaChartLine />,
    students: 920,
    color: "from-green-500 to-teal-600",
  },
  {
    name: "App Design",
    description: "Create intuitive and beautiful mobile app interfaces",
    image: "photos/Academy/dig.png",
    icon: <FaPalette />,
    students: 750,
    color: "from-red-500 to-pink-600",
  },
  {
    name: "Mobile Development",
    description: "Build native and cross-platform mobile applications",
    image: "photos/Academy/js.jpg",
    icon: <FaMobileAlt />,
    students: 1120,
    color: "from-orange-500 to-red-600",
  },
  {
    name: "Graphics Design",
    description: "Master Photoshop, Illustrator and graphic principles",
    image: "photos/Academy/web.jpg",
    icon: <FaCamera />,
    students: 1560,
    color: "from-cyan-500 to-blue-600",
  },
];

const FreeCategory = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <section className="py-16 px-6 md:px-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        {/* Title and Description */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-full">
            Free Learning Resources
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Free Course Categories
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            Gain valuable skills without spending a dime. Start learning today with our expert-led free courses!
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              variants={itemVariants}
            >
              {/* Course Image with Overlay */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/fighterfish.png";
                  }}
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80`}></div>

                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center text-white text-4xl">
                  {category.icon}
                </div>

                {/* Student Count Badge */}
                <div className="absolute bottom-3 right-3 bg-white/90 dark:bg-gray-900/90 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <FaUsers size={10} />
                  <span>{category.students.toLocaleString()} students</span>
                </div>
              </div>

              {/* Course Info */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{category.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{category.description}</p>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} size={14} />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-500 dark:text-gray-400 text-sm">5.0 (2 ratings)</span>
                </div>

                {/* Button */}
                <button className="w-full bg-primary-50 hover:bg-primary-100 dark:bg-primary-900/20 dark:hover:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold px-4 py-2 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 group">
                  <span>Start for free</span>
                  <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* See More Button */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.button
            className="bg-primary-600 hover:bg-primary-700 text-white transition-all duration-300 px-8 py-3 rounded-lg flex items-center justify-center gap-2 mx-auto shadow-lg hover:shadow-primary-500/30 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="font-semibold">Explore All Free Courses</span>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FreeCategory;
