"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaStar, FaUsers, FaClock, FaGraduationCap } from "react-icons/fa";

const courses = [
  {
    title: "Full-Stack Web Development",
    description: "Master modern web development with React, Node.js, and MongoDB",
    instructor: "Alex Johnson",
    price: "250 DT",
    rating: 4.9,
    duration: "12 weeks",
    students: 1240,
    level: "Intermediate",
    image: "photos/Academy/full.png",
  },
  {
    title: "UI/UX Design Masterclass",
    description: "Learn to create beautiful, user-friendly interfaces that convert",
    instructor: "Sarah Williams",
    price: "180 DT",
    rating: 4.8,
    duration: "8 weeks",
    students: 950,
    level: "Beginner",
    image: "photos/Academy/react.jpeg",
  },
  {
    title: "Advanced Figma for Designers",
    description: "Take your design skills to the next level with advanced Figma techniques",
    instructor: "Michael Chen",
    price: "150 DT",
    rating: 4.7,
    duration: "6 weeks",
    students: 780,
    level: "Advanced",
    image: "photos/Academy/figma.png",
  },
  {
    title: "Digital Marketing Strategy",
    description: "Learn to create and implement effective digital marketing campaigns",
    instructor: "Emily Rodriguez",
    price: "200 DT",
    rating: 4.6,
    duration: "10 weeks",
    students: 620,
    level: "Intermediate",
    image: "photos/Academy/full.png",
  },
  {
    title: "Mobile App Development",
    description: "Build native iOS and Android apps with React Native",
    instructor: "David Kim",
    price: "280 DT",
    rating: 4.9,
    duration: "14 weeks",
    students: 840,
    level: "Advanced",
    image: "photos/Academy/react.jpeg",
  },
  {
    title: "Data Science Fundamentals",
    description: "Learn Python, data analysis, and machine learning basics",
    instructor: "Lisa Thompson",
    price: "220 DT",
    rating: 4.7,
    duration: "12 weeks",
    students: 560,
    level: "Beginner",
    image: "photos/Academy/figma.png",
  },
];

const getLevelColor = (level) => {
  switch(level) {
    case "Beginner": return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";
    case "Intermediate": return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
    case "Advanced": return "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400";
    default: return "bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400";
  }
};

const PopularCourses = () => {
  const [visibleCourses, setVisibleCourses] = useState(3);

  const showMoreCourses = () => {
    setVisibleCourses(courses.length);
  };

  return (
    <section className="py-16 px-6 md:px-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <motion.div
            className="text-center md:text-left mb-6 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-full">
              Top-Rated Courses
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Popular Courses
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-xl">
              Explore our most popular courses and start your learning journey today with expert instructors.
            </p>
          </motion.div>

          <motion.a
            href="/Academy/courses"
            className="text-primary-600 dark:text-primary-400 font-semibold hover:underline inline-flex items-center gap-2 group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ x: 5 }}
          >
            <span>View all courses</span>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.slice(0, visibleCourses).map((course, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              {/* Course Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/fighterfish.png";
                  }}
                />
                {/* Level Badge */}
                <div className={`absolute top-3 right-3 ${getLevelColor(course.level)} text-xs px-2 py-1 rounded-full`}>
                  {course.level}
                </div>
              </div>

              {/* Course Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{course.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{course.description}</p>

                {/* Instructor and Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <FaGraduationCap className="text-primary-600 dark:text-primary-400 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{course.instructor}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < Math.floor(course.rating) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"} size={12} />
                      ))}
                    </div>
                    <span className="text-gray-600 dark:text-gray-400 text-xs ml-1">{course.rating}</span>
                  </div>
                </div>

                {/* Course Meta */}
                <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-4">
                  <div className="flex items-center">
                    <FaClock className="mr-1" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <FaUsers className="mr-1" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                </div>

                {/* Price and Enroll Button */}
                <div className="flex items-center justify-between mt-4">
                  <span className="text-primary-600 dark:text-primary-400 font-bold">{course.price}</span>
                  <a
                    href={`/Academy/courses/${index + 1}`}
                    className="bg-primary-50 hover:bg-primary-100 dark:bg-primary-900/20 dark:hover:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-1 text-sm group"
                  >
                    <span>Enroll now</span>
                    <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show More Button (conditionally rendered) */}
        {visibleCourses < courses.length && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.button
              onClick={showMoreCourses}
              className="bg-primary-600 hover:bg-primary-700 text-white transition-all duration-300 px-8 py-3 rounded-lg flex items-center justify-center gap-2 mx-auto shadow-lg hover:shadow-primary-500/30 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-semibold">Show More Courses</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PopularCourses;
