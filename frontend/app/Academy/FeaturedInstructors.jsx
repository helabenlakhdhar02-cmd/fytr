"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaLinkedin, FaTwitter, FaGlobe, FaArrowRight } from "react-icons/fa";
/*
const instructors = [
  {
    name: "Dr. Sarah Johnson",
    role: "Web Development Expert",
    bio: "10+ years of experience in full-stack development and teaching. Former senior developer at Google.",
    image: "photos/Academy/student2.jpeg",
    rating: 4.9,
    students: 3240,
    courses: 8,
    social: {
      linkedin: "#",
      twitter: "#",
      website: "#",
    },
  },
  {
    name: "Prof. Michael Chen",
    role: "UI/UX Design Specialist",
    bio: "Award-winning designer with experience at top tech companies. Passionate about creating intuitive user experiences.",
    image: "photos/Academy/student1.jpg",
    rating: 4.8,
    students: 2180,
    courses: 5,
    social: {
      linkedin: "#",
      twitter: "#",
      website: "#",
    },
  },
  {
    name: "Emma Rodriguez",
    role: "Digital Marketing Guru",
    bio: "Digital marketing strategist who has helped over 100 companies improve their online presence and conversion rates.",
    image: "photos/Academy/student3.png",
    rating: 4.7,
    students: 1950,
    courses: 6,
    social: {
      linkedin: "#",
      twitter: "#",
      website: "#",
    },
  },
  {
    name: "David Wilson",
    role: "Mobile Development Expert",
    bio: "iOS and Android developer with 8+ years of experience. Has published over 20 apps with millions of downloads.",
    image: "photos/Academy/student1.jpg",
    rating: 4.9,
    students: 2760,
    courses: 7,
    social: {
      linkedin: "#",
      twitter: "#",
      website: "#",
    },
  },
];

const FeaturedInstructors = () => {
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

  // TODO: Uncomment when we have real instructor data
  return null;
};
      <div className="container mx-auto">
        {/* Section Header *
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-full">
            Learn From The Best
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Meet Our Expert Instructors
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            Our instructors are industry professionals with years of real-world experience, passionate about sharing their knowledge.
          </p>
        </motion.div>

        {/* Instructors Grid *
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {instructors.map((instructor, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
              variants={itemVariants}
              whileHover={{
                y: -5,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              {/* Instructor Image - Shorter *
              <div className="relative h-44 overflow-hidden">
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/fighterfish.png";
                  }}
                />
              </div>

              {/* Instructor Info - Simplified *
              <div className="p-5">
                {/* Name and Role *
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{instructor.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-2">{instructor.role}</p>

                {/* Rating *
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < Math.floor(instructor.rating) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"} size={14} />
                    ))}
                  </div>
                  <span className="text-gray-600 dark:text-gray-400 text-sm ml-2">{instructor.rating}</span>
                </div>

                {/* Bio *
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">{instructor.bio}</p>

                {/* Stats *
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">{instructor.students.toLocaleString()}</span> students
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">{instructor.courses}</span> courses
                  </div>
                </div>

                {/* Social Links and View Profile *
                <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex space-x-3">
                    <a href={instructor.social.linkedin} className="text-gray-400 hover:text-blue-500 transition-colors">
                      <FaLinkedin size={16} />
                    </a>
                    <a href={instructor.social.twitter} className="text-gray-400 hover:text-blue-500 transition-colors">
                      <FaTwitter size={16} />
                    </a>
                    <a href={instructor.social.website} className="text-gray-400 hover:text-blue-500 transition-colors">
                      <FaGlobe size={16} />
                    </a>
                  </div>

                  <a
                    href="#"
                    className="text-blue-600 dark:text-blue-400 font-semibold text-sm inline-flex items-center gap-1 group"
                  >
                    <span>View Profile</span>
                    <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button *
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.a
            href="#"
            className="bg-primary-50 hover:bg-primary-100 dark:bg-primary-900/20 dark:hover:bg-primary-900/30 text-primary-600 dark:text-primary-400 transition-all duration-300 px-8 py-3 rounded-lg inline-flex items-center justify-center gap-2 font-semibold group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View All Instructors</span>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedInstructors; */
