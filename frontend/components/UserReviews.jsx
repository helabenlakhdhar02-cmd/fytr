'use client'
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteLeft, FaArrowRight } from "react-icons/fa";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from '../context/AuthContext';

export default function UserReviews() {
  const { openRegisterModal } = useAuth();
  const reviews = [
    {
      text: "FytrLance gave me my first real freelancing opportunity. The mission-based system helped me build my portfolio quickly and the community support was incredible!",
      user: "Viezh Robert",
      role: "Web Developer",
      location: "Warsaw, Poland",
      rating: 4.5,
      image: "/images/user1.jpg",
    },
    {
      text: "An amazing platform to connect with clients and grow as a freelancer! The skill verification process helped me stand out and secure high-paying projects.",
      user: "Sarah Johnson",
      role: "UI/UX Designer",
      location: "Berlin, Germany",
      rating: 5,
      image: "/images/user2.jpg",
    },
    {
      text: "As a client, I found exceptional talent for my startup through FytrLance. The AI matching system connected me with freelancers who perfectly fit my project requirements.",
      user: "Michael Chen",
      role: "Startup Founder",
      location: "Toronto, Canada",
      rating: 4.8,
      image: "/images/user3.jpg",
    },
  ];

  const [index, setIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, reviews.length]);

  return (
    <section className="py-16 px-6 md:px-16 bg-white dark:bg-gray-900">
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
              Testimonials
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6 max-w-xl">
              Don't just take our word for it—see how FytrLance has transformed careers, businesses, and skills!
            </p>

            {/* Indicator dots */}
            <div className="flex space-x-2 mt-8">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setIndex(i);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${i === index ? 'bg-primary-600 w-6' : 'bg-gray-300 dark:bg-gray-700'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex space-x-4 mt-6">
              <motion.button
                onClick={prevSlide}
                className="p-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaChevronLeft size={16} />
              </motion.button>

              <motion.button
                onClick={nextSlide}
                className="p-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaChevronRight size={16} />
              </motion.button>
            </div>
          </motion.div>

          {/* Right side - Review Slider */}
          <div className="relative h-[400px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-xl max-w-md relative border border-gray-100 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-primary-400 mb-4">
                  <FaQuoteLeft size={30} />
                </div>

                <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">"{reviews[index].text}"</p>

                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-primary-100 dark:border-primary-900">
                    <img
                      src={reviews[index].image}
                      alt={reviews[index].user}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${reviews[index].user.replace(' ', '+')}&background=0D8ABC&color=fff`;
                      }}
                    />
                  </div>

                  <div>
                    <h4 className="text-gray-900 dark:text-white font-bold">{reviews[index].user}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{reviews[index].role}</p>
                    <div className="flex items-center mt-1">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < Math.floor(reviews[index].rating) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"} size={14} />
                        ))}
                      </div>
                      <span className="text-gray-600 dark:text-gray-400 text-sm ml-2">{reviews[index].rating}</span>
                    </div>
                  </div>
                </div>

                {/* Location badge */}
                <div className="absolute top-4 right-4 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
                  {reviews[index].location}
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

        {/* CTA Section */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 shadow-xl mx-auto overflow-hidden relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
              <path d="M14 16H9v-2h5V9h2v5h5v2h-5v5h-2v-5zm14 14H23v-2h5v-5h2v5h5v2h-5v5h-2v-5zm11-23h2v2h-2v-2zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2z" fill="currentColor">
              </path>
            </svg>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="text-white text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Your Next Opportunity Awaits!</h3>
              <p className="text-white/80 text-lg">Join FytrLance today to connect, collaborate, and grow your career.</p>
            </div>

            <motion.button
              onClick={openRegisterModal}
              className="px-8 py-4 bg-white text-primary-700 font-bold rounded-lg shadow-lg hover:shadow-white/30 transform transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Sign Up Now</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
