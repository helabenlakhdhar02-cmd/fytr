"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TestimonialSection = ({ testimonials, title }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {title || "What Our Clients Say"}
          </h2>
          <div className="w-20 h-1 bg-primary-600 mx-auto"></div>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft className="text-gray-600 dark:text-gray-300" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            aria-label="Next testimonial"
          >
            <FaChevronRight className="text-gray-600 dark:text-gray-300" />
          </button>

          {/* Testimonial Slider */}
          <div className="overflow-hidden rounded-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-50 dark:bg-gray-900 p-8 rounded-xl shadow-lg"
              >
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* User Image */}
                  <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                    <img
                      src={testimonials[activeIndex].image || "/fighterfish.png"}
                      alt={testimonials[activeIndex].user}
                      className="w-full h-full object-cover rounded-full border-4 border-white dark:border-gray-700 shadow-md"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/fighterfish.png";
                      }}
                    />
                  </div>

                  {/* Testimonial Content */}
                  <div className="flex-1 text-center md:text-left">
                    <FaQuoteLeft className="text-primary-600 dark:text-primary-400 text-3xl mb-4 mx-auto md:mx-0" />
                    <p className="text-gray-700 dark:text-gray-300 text-lg mb-4 italic">
                      "{testimonials[activeIndex].text}"
                    </p>
                    
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                      {testimonials[activeIndex].user}
                    </h4>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {testimonials[activeIndex].location}
                    </p>
                    
                    <div className="flex items-center justify-center md:justify-start">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < Math.floor(testimonials[activeIndex].rating)
                              ? "text-yellow-400"
                              : "text-gray-300 dark:text-gray-600"
                          }
                        />
                      ))}
                      <span className="ml-2 text-gray-600 dark:text-gray-400">
                        {testimonials[activeIndex].rating}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeIndex
                    ? "bg-primary-600 w-6"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
