"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight, FaGraduationCap, FaArrowRight } from "react-icons/fa";

const reviews = [
  {
    name: "Sarah Anderson",
    role: "Web Developer",
    feedback: "The courses on FyterLance Academy helped me transition from a beginner to a professional web developer in just 3 months. The hands-on projects were particularly valuable!",
    image: "photos/Academy/student2.jpeg",
    rating: 5,
    course: "Full-Stack Web Development",
  },
  {
    name: "John Davis",
    role: "UI/UX Designer",
    feedback: "The design courses are well-structured and easy to follow. I've learned industry-standard practices that I now apply daily in my work. The instructors are top-notch professionals.",
    image: "photos/Academy/student1.jpg",
    rating: 4.8,
    course: "UI/UX Design Masterclass",
  },
  {
    name: "Emma Rodriguez",
    role: "Digital Marketer",
    feedback: "The digital marketing curriculum is comprehensive and up-to-date with the latest trends. The mentors are very helpful, and the community support is outstanding!",
    image: "photos/Academy/student3.png",
    rating: 4.9,
    course: "Digital Marketing Strategy",
  },
  {
    name: "Michael Chen",
    role: "Mobile Developer",
    feedback: "I've taken several mobile development courses, and they've all been excellent. The practical approach and real-world projects helped me build a strong portfolio.",
    image: "photos/Academy/student1.jpg",
    rating: 5,
    course: "iOS & Android Development",
  },
];

const StudentsReview = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  return (
    <section className="py-16 px-6 md:px-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-full">
              Student Success Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Students Say
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6 max-w-xl">
              Hear from our students who have transformed their careers through our courses. Their success is our greatest achievement!
            </p>

            {/* Indicator dots */}
            <div className="flex space-x-2 mt-8">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-primary-600 dark:bg-primary-400 w-6' : 'bg-gray-300 dark:bg-gray-700'}`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex space-x-4 mt-6">
              <motion.button
                onClick={prevSlide}
                className="p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaChevronLeft size={16} />
              </motion.button>

              <motion.button
                onClick={nextSlide}
                className="p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaChevronRight size={16} />
              </motion.button>
            </div>

            {/* CTA Button */}
            <motion.button
              className="mt-8 bg-primary-600 hover:bg-primary-700 text-white transition-all duration-300 px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg hover:shadow-primary-500/30 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-semibold">Join Our Community</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Right side - Review Slider */}
          <div className="relative h-[400px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-xl max-w-md relative border border-gray-100 dark:border-gray-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-primary-400 mb-4">
                  <FaQuoteLeft size={30} />
                </div>

                <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">"{reviews[activeIndex].feedback}"</p>

                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-primary-100 dark:border-primary-900">
                    <img
                      src={reviews[activeIndex].image}
                      alt={reviews[activeIndex].name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/fighterfish.png";
                      }}
                    />
                  </div>

                  <div>
                    <h4 className="text-gray-900 dark:text-white font-bold">{reviews[activeIndex].name}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{reviews[activeIndex].role}</p>
                    <div className="flex items-center mt-1">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < Math.floor(reviews[activeIndex].rating) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"} size={14} />
                        ))}
                      </div>
                      <span className="text-gray-600 dark:text-gray-400 text-sm ml-2">{reviews[activeIndex].rating}</span>
                    </div>
                  </div>
                </div>

                {/* Course badge */}
                <div className="absolute top-4 right-4 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                  <FaGraduationCap size={12} />
                  <span>{reviews[activeIndex].course}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Decorative elements */}
            <div className="absolute -z-10 w-full h-full">
              <div className="absolute top-10 right-10 w-20 h-20 bg-primary-100 dark:bg-primary-900/20 rounded-full filter blur-xl opacity-70"></div>
              <div className="absolute bottom-10 left-10 w-32 h-32 bg-secondary-100 dark:bg-secondary-900/20 rounded-full filter blur-xl opacity-60"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentsReview;
