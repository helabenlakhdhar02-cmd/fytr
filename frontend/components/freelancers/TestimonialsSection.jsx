'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

// Mock testimonials data
const testimonials = [
  {
    id: 1,
    content: "FytrLance changed the game. I started as a Veiltail, now I'm Halfmoon and getting clients weekly.",
    author: "Marwen",
    role: "Halfmoon Fytr",
    avatar: "/photos/Topfreelancers/freelancer1.PNG",
    rating: 5
  },
  {
    id: 2,
    content: "The ranking system motivates me to deliver my best work. Clients trust Crowntail Fytrs, and I'm proud to be one.",
    author: "Jessica K.",
    role: "Crowntail Fytr",
    avatar: "/photos/Topfreelancers/freelancer 2.PNG",
    rating: 5
  },
  {
    id: 3,
    content: "As a new freelancer, the Veiltail community helped me learn and grow. The mentorship is incredible.",
    author: "Ahmed R.",
    role: "Veiltail Fytr",
    avatar: "/photos/Topfreelancers/freelancer3.PNG",
    rating: 4
  },
  {
    id: 4,
    content: "I've tried other platforms, but FytrLance's competitive system pushes me to excel. My portfolio has never looked better.",
    author: "Sophia L.",
    role: "Crowntail Fytr",
    avatar: "/photos/Academy/student1.jpg",
    rating: 5
  },
  {
    id: 5,
    content: "The transparent ranking system helps clients find the right talent, and helps me showcase my expertise.",
    author: "Michael T.",
    role: "Halfmoon Fytr",
    avatar: "/photos/Academy/student2.jpeg",
    rating: 5
  }
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayRef = useRef(null);

  // Handle autoplay
  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  // Render stars
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
    );
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Fytrs Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Hear from the talented professionals who have grown their careers on our platform.
          </p>
        </motion.div>

        <div
          className="max-w-4xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Testimonial Carousel */}
          <div className="relative">
            <div className="overflow-hidden">
              <motion.div
                className="flex transition-all duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <motion.div
                      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-10 border border-gray-200 dark:border-gray-700 relative overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Quote bubble with water drops */}
                      <div className="absolute -top-6 -left-6 w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full opacity-50"></div>
                      <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full opacity-30"></div>

                      <div className="relative">
                        <FaQuoteLeft className="text-blue-300 dark:text-blue-700 text-4xl mb-6" />

                        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 italic">
                          "{testimonial.content}"
                        </p>

                        <div className="flex items-center">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.author}
                            className="w-14 h-14 rounded-full object-cover border-2 border-blue-100 dark:border-blue-900/50"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/fighterfish.png";
                            }}
                          />

                          <div className="ml-4">
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                              {testimonial.author}
                            </h4>
                            <p className="text-blue-600 dark:text-blue-400 font-medium">
                              {testimonial.role}
                            </p>
                            <div className="mt-1">
                              {renderStars(testimonial.rating)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-blue-600 w-6"
                      : "bg-gray-300 dark:bg-gray-600 hover:bg-blue-400 dark:hover:bg-blue-700"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
