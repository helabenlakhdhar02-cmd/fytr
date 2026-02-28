'use client';
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { FaStar, FaAward, FaCheck, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { getPublicFreelancers } from "../lib/auth"; // Replace with real path

export default function TopFreelancers() {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [direction, setDirection] = useState(1);
  const autoScrollTimerRef = useRef(null);

  // Show max 3 or fewer if less freelancers available
  const visibleCount = Math.min(3, freelancers.length);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPublicFreelancers();
      const transformed = data.map((item) => ({
        name: item.user.full_name || item.user.username,
        role: item.level || "Freelancer",
        image: item.user.profileImg,
        rating: parseFloat(item.score) || 0,
        projects: Math.floor(Math.random() * 50 + 10), // Placeholder
        skills: item.skills?.split(",").map(skill => skill.trim()).filter(Boolean) || []
      }));
      setFreelancers(transformed);
      setLoading(false);
    };

    fetchData();
  }, []);

  const visibleIndices = useMemo(() => {
    const indices = [];
    for (let i = 0; i < visibleCount; i++) {
      indices.push((activeIndex + i) % freelancers.length);
    }
    return indices;
  }, [activeIndex, visibleCount, freelancers.length]);

  const resetAutoScrollTimer = useCallback(() => {
    if (autoScrollTimerRef.current) clearInterval(autoScrollTimerRef.current);
    if (isAutoScrolling && freelancers.length > 1) {
      autoScrollTimerRef.current = setInterval(() => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % freelancers.length);
      }, 4000);
    }
  }, [isAutoScrolling, freelancers.length]);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % freelancers.length);
    resetAutoScrollTimer();
  }, [freelancers.length, resetAutoScrollTimer]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + freelancers.length) % freelancers.length);
    resetAutoScrollTimer();
  }, [freelancers.length, resetAutoScrollTimer]);

  const goToSlide = useCallback((index) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    resetAutoScrollTimer();
  }, [activeIndex, resetAutoScrollTimer]);

  useEffect(() => {
    resetAutoScrollTimer();
    return () => {
      if (autoScrollTimerRef.current) clearInterval(autoScrollTimerRef.current);
    };
  }, [isAutoScrolling, visibleCount, resetAutoScrollTimer]);

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading freelancers...</div>;
  }

  if (freelancers.length === 0) {
    return <div className="text-center py-10 text-gray-500">No freelancers found.</div>;
  }

  const canNavigate = freelancers.length > 1;

  return (
    <section className="py-16 px-6 md:px-16 text-center bg-gray-50 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Top Freelancers
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
          Discover top-rated professionals who have mastered their craft, completed successful
          projects, and earned top rankings. Hire the best or get inspired to reach the top!
        </p>
      </motion.div>

      {/* Auto-scroll toggle */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setIsAutoScrolling(!isAutoScrolling)}
          className={`text-sm px-4 py-1.5 rounded-full transition-all duration-300 ${
            isAutoScrolling
              ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400 border border-primary-200 dark:border-primary-800/50'
              : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700/50'
          }`}
        >
          {isAutoScrolling ? 'Auto-Rotation On' : 'Auto-Rotation Off'}
        </button>
      </div>

      {/* Carousel Container */}
      <div className="relative max-w-6xl mx-auto mt-10">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          disabled={!canNavigate}
          className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/80 dark:bg-gray-800/80 p-3 rounded-full shadow-md transition-all duration-300 focus:outline-none border border-gray-200 dark:border-gray-700 ${
            !canNavigate ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          aria-label="Previous profiles"
        >
          <FaChevronLeft className="text-gray-700 dark:text-gray-300" />
        </button>

        {/* Freelancer Cards */}
        <div className="flex justify-center gap-6 overflow-hidden relative h-[400px] w-full max-w-4xl mx-auto">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleIndices.map((index) => {
              const freelancer = freelancers[index];
              return (
                <motion.div
                  key={freelancer.name + index} // unique key, could use id if available
                  custom={direction}
                  className="w-full md:w-1/3 max-w-sm rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
                  variants={{
                    enter: (direction) => ({
                      opacity: 0,
                      x: direction > 0 ? 300 : -300,
                      scale: 0.8
                    }),
                    center: {
                      zIndex: 1,
                      opacity: 1,
                      x: 0,
                      scale: 1
                    },
                    exit: (direction) => ({
                      zIndex: 0,
                      opacity: 0,
                      x: direction < 0 ? 300 : -300,
                      scale: 0.8
                    })
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    duration: 0.5
                  }}
                >
                  <div className="relative w-full h-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
                    {/* Top portion with image */}
                    <div className="h-2/3 relative overflow-hidden">
                      <img
                        src={freelancer.image}
                        alt={freelancer.name}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/fighterfish.png";
                        }}
                      />
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 rounded-full px-3 py-1 text-sm font-bold flex items-center gap-1 shadow-lg transform transition-transform duration-300 hover:scale-105">
                        <FaAward className="text-amber-800" />
                        <span>Top Rated</span>
                      </div>
                    </div>

                    {/* Bottom portion with details */}
                    <div className="h-1/3 p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{freelancer.name}</h3>
                        <p className="text-primary-600 dark:text-primary-400 font-medium">{freelancer.role}</p>

                        <div className="flex items-center mt-1 text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={i < Math.floor(freelancer.rating) ? "text-yellow-400" : "text-gray-300"}
                            />
                          ))}
                          <span className="ml-2 text-gray-600 dark:text-gray-400 text-sm">{freelancer.rating.toFixed(1)}</span>
                        </div>
                      </div>

                      <div className="mt-2">
                        <div className="flex flex-wrap gap-1 mt-2">
                          {freelancer.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs px-3 py-1 rounded-full border border-primary-100 dark:border-primary-800 hover:bg-primary-100 dark:hover:bg-primary-800/40 transition-colors duration-200 cursor-default"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 flex items-center">
                          <FaCheck className="text-green-500 mr-1" /> {freelancer.projects} Projects Completed
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          disabled={!canNavigate}
          className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/80 dark:bg-gray-800/80 p-3 rounded-full shadow-md transition-all duration-300 focus:outline-none border border-gray-200 dark:border-gray-700 ${
            !canNavigate ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          aria-label="Next profiles"
        >
          <FaChevronRight className="text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/* Indicator dots */}
      <div className="flex justify-center mt-8 space-x-2">
        {freelancers.map((_, index) => {
          const isActive = visibleIndices.includes(index);
          return (
            <button
              key={`dot-${index}`}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-gray-800 dark:bg-gray-200 w-4'
                  : 'bg-gray-300 dark:bg-gray-700 w-2 hover:bg-gray-400 dark:hover:bg-gray-600'
              }`}
              aria-label={`Go to profile ${index + 1}`}
            />
          );
        })}
      </div>
    </section>
  );
}
