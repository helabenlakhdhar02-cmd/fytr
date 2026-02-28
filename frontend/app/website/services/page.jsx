"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../../components/Navbar";
import { getPublicServices } from '../../../lib/auth';
import Link from "next/link";
import {
  FaStar, FaUser, FaUsers, FaGraduationCap, FaCode,
  FaPalette, FaVideo, FaRobot, FaBuilding, FaMobileAlt,
  FaChartLine, FaLock, FaTrophy, FaBrain, FaUserFriends,
  FaQuestionCircle, FaArrowRight, FaFish, FaCrown, FaMoon
} from "react-icons/fa";
import ServiceCard from "../../../components/ServiceCard";
import TestimonialSection from "../../../components/TestimonialSection";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  },
  hover: {
    y: -5,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.3 }
  }
};

const fishAnimationVariants = {
  animate: {
    x: [0, 10, -5, 10, 0],
    y: [0, -10, 5, -5, 0],
    rotate: [0, 2, -2, 1, 0],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const Page = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Refs for scroll navigation
  const heroRef = useRef(null);
  const coreServicesRef = useRef(null);
  const rankedSystemRef = useRef(null);
  const soloFinRef = useRef(null);
  const bettaArenaRef = useRef(null);
  const academyRef = useRef(null);
  const domainsRef = useRef(null);
  const whyFytrRef = useRef(null);
  const faqRef = useRef(null);
  const groupTaskRef = useRef(null);

 
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        let services;
        try {
          // Try to fetch from API first
          services = await getPublicServices();
          if (!services || services.length === 0) {
            // If API returns empty array, use mock data
            services = mockServices;
          }
        } catch (error) {
          console.error("Failed to fetch services from API, using mock data:", error);
          // Use mock data if API fails
          services = mockServices;
        }
        setServices(services);
        setFilteredServices(services);
      } catch (error) {
        console.error("Failed to fetch services:", error);
        // Fallback to mock data in case of any error
        setServices(mockServices);
        setFilteredServices(mockServices);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Scroll to section function
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Toggle FAQ accordion
  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  // Categories for the domains section
  const domains = [
    { title: "Design", icon: <FaPalette />, description: "Logos, branding, UI/UX" },
    { title: "Development", icon: <FaCode />, description: "Websites, apps, systems" },
    { title: "Video", icon: <FaVideo />, description: "Editing, animation, VFX" },
    { title: "AI", icon: <FaRobot />, description: "Prompts, ML, automation" },
    { title: "Architecture", icon: <FaBuilding />, description: "2D/3D plans, renderings" },
    { title: "Mobile", icon: <FaMobileAlt />, description: "Apps, responsive design" },
    { title: "Business", icon: <FaChartLine />, description: "Strategy, writing, ads" },
    { title: "Other", icon: <FaQuestionCircle />, description: "Specialized services" }
  ];

  // FAQ items
  const faqItems = [
    {
      question: "What's the difference between SoloFin and group tasks?",
      answer: "SoloFin connects you with a single freelancer for direct, one-on-one collaboration. Group tasks involve multiple freelancers working on your project simultaneously, with you selecting and paying only for the best submission."
    },
    {
      question: "Do I get anything if my submission isn't selected?",
      answer: "Yes! Even if your submission isn't selected, you gain valuable experience points (XP), feedback from the client, and can add the work to your portfolio to showcase your skills to future clients."
    },
    {
      question: "How do I rank up?",
      answer: "You rank up by earning XP through completing projects, participating in competitions, taking courses, and receiving positive client reviews. As you progress from Veiltail to Crowntail to Halfmoon, you unlock more opportunities and benefits."
    },
    {
      question: "What kind of clients are on Fytr?",
      answer: "Fytr hosts a diverse range of clients from startups and small businesses to established companies and individual entrepreneurs. They come from various industries seeking creative, technical, and business services."
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      text: "As a freelancer on FyterLance, I've been able to offer my services to clients worldwide and grow my business significantly.",
      user: "Viezh Robert",
      location: "Warsaw, Poland",
      rating: 4.5,
      image: "/photos/Academy/student1.jpg"
    },
    {
      text: "The platform makes it easy to showcase my services and connect with clients who value quality work.",
      user: "Sarah Johnson",
      location: "Berlin, Germany",
      rating: 5,
      image: "/photos/Academy/student2.jpeg"
    },
    {
      text: "I've been able to build a steady client base through FyterLance's service marketplace. Highly recommended!",
      user: "Michael Chen",
      location: "Toronto, Canada",
      rating: 4.8,
      image: "/photos/Academy/student3.png"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      {/* Sticky Navigation */}
      <div className="sticky top-16 z-30 bg-white dark:bg-gray-800 shadow-md py-2 px-4 hidden md:block">
        <div className="container mx-auto">
          <div className="flex items-center justify-center space-x-6 text-sm font-medium">
            <button onClick={() => scrollToSection(heroRef)} className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors">Home</button>
            <button onClick={() => scrollToSection(coreServicesRef)} className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors">Services</button>
            <button onClick={() => scrollToSection(rankedSystemRef)} className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors">Ranks</button>
            <button onClick={() => scrollToSection(soloFinRef)} className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors">SoloFin</button>
            <button onClick={() => scrollToSection(bettaArenaRef)} className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors">BettaArena</button>
            <button onClick={() => scrollToSection(academyRef)} className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors">Academy</button>
            <button onClick={() => scrollToSection(domainsRef)} className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors">Domains</button>
          </div>
        </div>
      </div>

      <main>
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative px-6 md:px-16 py-20 md:py-28 bg-gray-100 dark:bg-gray-900 overflow-hidden"
        >
          {/* Background decorative elements */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary-100 dark:bg-primary-900/20 rounded-full filter blur-3xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-secondary-100 dark:bg-secondary-900/20 rounded-full filter blur-3xl opacity-60 animate-pulse"></div>

          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              {/* Left content */}
              <motion.div
                className="w-full lg:w-1/2 text-center lg:text-left"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <motion.div
                  className="inline-block px-3 py-1 mb-4 text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-full"
                  variants={itemVariants}
                >
                  Fytr Services
                </motion.div>

                <motion.h1
                  className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 dark:text-white mb-6"
                  variants={itemVariants}
                >
                  Unleash Your Skills. <br />
                  <span className="text-primary-600 dark:text-primary-400">Discover Fytr Services.</span>
                </motion.h1>

                <motion.p
                  className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0"
                  variants={itemVariants}
                >
                  From creative challenges to ranked projects and individual missions,
                  Fytr unlocks the future of freelance collaboration.
                </motion.p>

                <motion.div variants={itemVariants}>
                  <button className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    Create Your Free Account
                  </button>
                </motion.div>
              </motion.div>

              {/* Right content - Illustration */}
              <motion.div
                className="w-full lg:w-1/2 relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="relative">
                  {/* Decorative circle behind image */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-full filter blur-md transform scale-110 animate-pulse"></div>

                  <motion.img
                    src="/fighterfish.png"
                    alt="Fytrs working together"
                    className="relative z-10 w-full max-w-lg mx-auto drop-shadow-2xl"
                    variants={fishAnimationVariants}
                    animate="animate"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Services Overview Section */}
        <section
          ref={coreServicesRef}
          className="py-16 px-6 md:px-16 bg-white dark:bg-gray-800"
        >
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Core <span className="text-primary-600 dark:text-primary-400">Services</span> Overview
              </motion.h2>
              <motion.p
                className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Explore our comprehensive suite of services designed to empower freelancers and clients alike
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {/* Group Tasks Card */}
              <motion.div
                className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl overflow-hidden shadow-md border border-green-100 dark:border-green-800/30 p-6 flex flex-col h-full"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-800/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-4">
                  <FaUserFriends className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Group Tasks System</h3>

                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Collaborate in teams of 6 with mixed skill levels. Submit your best work and get selected by clients.
                </p>

                <button
                  onClick={() => scrollToSection(groupTaskRef)}
                  className="mt-auto text-green-600 dark:text-green-400 font-medium flex items-center hover:underline"
                >
                  Learn more
                  <FaArrowRight className="ml-2 h-4 w-4" />
                </button>
              </motion.div>

              {/* SoloFin Card */}
              <motion.div
                className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl overflow-hidden shadow-md border border-blue-100 dark:border-blue-800/30 p-6 flex flex-col h-full"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-800/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                  <FaUser className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">SoloFin</h3>

                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Work one-on-one with clients. For trusted Fytrs with Crowntail rank and above.
                </p>

                <button
                  onClick={() => scrollToSection(soloFinRef)}
                  className="mt-auto text-blue-600 dark:text-blue-400 font-medium flex items-center hover:underline"
                >
                  Learn more
                  <FaArrowRight className="ml-2 h-4 w-4" />
                </button>
              </motion.div>

              {/* BettaArena Card */}
              <motion.div
                className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl overflow-hidden shadow-md border border-purple-100 dark:border-purple-800/30 p-6 flex flex-col h-full"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-800/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">
                  <FaUsers className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">BettaArena</h3>

                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Compete in real-time challenges. Win rewards, badges, and level up on the public leaderboard.
                </p>

                <button
                  onClick={() => scrollToSection(bettaArenaRef)}
                  className="mt-auto text-purple-600 dark:text-purple-400 font-medium flex items-center hover:underline"
                >
                  Learn more
                  <FaArrowRight className="ml-2 h-4 w-4" />
                </button>
              </motion.div>

              {/* FytrAcademy Card */}
              <motion.div
                className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl overflow-hidden shadow-md border border-amber-100 dark:border-amber-800/30 p-6 flex flex-col h-full"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <div className="w-14 h-14 rounded-full bg-amber-100 dark:bg-amber-800/30 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4">
                  <FaGraduationCap className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">FytrAcademy</h3>

                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Learn and grow with free and paid courses. Track progress, earn XP, and get certified.
                </p>

                <button
                  onClick={() => scrollToSection(academyRef)}
                  className="mt-auto text-amber-600 dark:text-amber-400 font-medium flex items-center hover:underline"
                >
                  Learn more
                  <FaArrowRight className="ml-2 h-4 w-4" />
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Ranked System Section */}
        <section
          ref={rankedSystemRef}
          className="py-16 px-6 md:px-16 bg-gray-50 dark:bg-gray-900 overflow-hidden"
        >
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-primary-600 dark:text-primary-400">Grow. Compete.</span> Rank Up.
              </motion.h2>
              <motion.div
                className="w-20 h-1 bg-primary-600 mx-auto mb-6"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              ></motion.div>
              <motion.p
                className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Our three-tier ranking system rewards your growth and unlocks new opportunities
              </motion.p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
              {/* Veiltail Rank */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 p-6 flex flex-col h-full flex-1"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-800/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-4">
                    <FaFish className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="h-3 w-3 bg-green-500 rounded-full mr-2"></span>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Veiltail</h3>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Beginner Fytr</p>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  <li className="flex items-start text-gray-700 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Access to basic tasks and group projects
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Free courses and community help
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Build your portfolio and gain XP
                  </li>
                </ul>
              </motion.div>

              {/* Crowntail Rank */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 p-6 flex flex-col h-full flex-1 relative z-10 transform lg:scale-105"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                <div className="absolute top-0 right-0 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  POPULAR
                </div>

                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-800/30 flex items-center justify-center text-primary-600 dark:text-primary-400 mr-4">
                    <FaCrown className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="h-3 w-3 bg-primary-500 rounded-full mr-2"></span>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Crowntail</h3>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Intermediate Fytr</p>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  <li className="flex items-start text-gray-700 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Access to better projects and clients
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    SoloFin access for direct client work
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Mentorship access and team leader potential
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Premium course discounts
                  </li>
                </ul>
              </motion.div>

              {/* Halfmoon Rank */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 p-6 flex flex-col h-full flex-1"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-800/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mr-4">
                    <FaMoon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="h-3 w-3 bg-indigo-500 rounded-full mr-2"></span>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Halfmoon</h3>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Elite Fytr</p>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  <li className="flex items-start text-gray-700 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Priority access to top-tier clients
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    BettaArena leadership opportunities
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Reduced platform fees
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Exclusive networking events
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>



        {/* Group Tasks Section */}
        <section
          ref={groupTaskRef}
          className="py-20 px-6 md:px-16 bg-white dark:bg-gray-800 overflow-hidden relative"
        >
          {/* Background decorative elements */}
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-green-500/20 rounded-full filter blur-3xl opacity-70"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-teal-500/20 rounded-full filter blur-3xl opacity-70"></div>

          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Left side - Illustration */}
              <motion.div
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  {/* Glow effects */}
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-500/20 rounded-full filter blur-3xl"></div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal-500/20 rounded-full filter blur-3xl"></div>

                  <div className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-[0_0_25px_rgba(16,185,129,0.15)] border border-green-500/20 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400 mr-4">
                          <FaUserFriends className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Website Redesign Project</h3>
                          <p className="text-green-600 dark:text-green-300 text-sm">Group Task</p>
                        </div>
                      </div>
                      <div className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-300 rounded-full text-xs font-medium">
                        ACTIVE
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600 dark:text-gray-300 text-sm">Spots Filled</span>
                        <span className="font-bold text-gray-900 dark:text-white">4/6</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-500 to-teal-500 rounded-full" style={{ width: '66%' }}></div>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-300">Budget</span>
                        <span className="font-medium text-gray-900 dark:text-white">$1,200</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-300">Timeline</span>
                        <span className="font-medium text-gray-900 dark:text-white">14 days</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-300">Skills Required</span>
                        <span className="font-medium text-gray-900 dark:text-white">UI/UX, React, Node.js</span>
                      </div>
                    </div>

                    <button className="w-full py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg shadow-green-500/20">
                      <span className="font-medium">Apply to Join</span>
                      <FaArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Right side - Text content */}
              <motion.div
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">Group Tasks</span> - Collaborate & Compete
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Join a team of 6 freelancers with mixed skill levels to work on client projects. Submit your best work and get selected by clients for payment and recognition.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400 mr-4 shadow-md">
                      <FaUsers className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Team Collaboration</h3>
                      <p className="text-gray-600 dark:text-gray-400">Work with other freelancers and learn from different skill levels.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400 mr-4 shadow-md">
                      <FaTrophy className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Merit-Based Selection</h3>
                      <p className="text-gray-600 dark:text-gray-400">Clients choose the best submission, rewarding quality over seniority.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400 mr-4 shadow-md">
                      <FaGraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Learn & Grow</h3>
                      <p className="text-gray-600 dark:text-gray-400">Even if not selected, gain valuable experience and add to your portfolio.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-green-500/20 shadow-md">
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    <span className="font-semibold text-green-600 dark:text-green-400">Note:</span> Group Tasks are open to all Fytr ranks, making them perfect for beginners looking to gain experience and build their portfolio.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SoloFin Section */}
        <section
          ref={soloFinRef}
          className="py-20 px-6 md:px-16 bg-gray-50 dark:bg-gray-900 overflow-hidden relative"
        >
          {/* Background decorative elements - similar to BettaArena but with blue colors */}
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl opacity-70"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-indigo-500/20 rounded-full filter blur-3xl opacity-70"></div>

          {/* Additional light effects */}
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-cyan-500/20 rounded-full filter blur-2xl opacity-60"></div>
          <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-sky-500/20 rounded-full filter blur-2xl opacity-60"></div>

          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Left side - Text content */}
              <motion.div
                className="w-full lg:w-1/2 order-2 lg:order-1"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">SoloFin</span> - Work Individually
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  For trusted Fytrs with Crowntail and Halfmoon ranks, SoloFin offers direct one-on-one missions with clients. Build lasting relationships and deliver personalized solutions.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4 shadow-md">
                      <FaUser className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Direct Client Communication</h3>
                      <p className="text-gray-600 dark:text-gray-400">Work directly with clients for clear requirements and feedback.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4 shadow-md">
                      <FaLock className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Secure Payments</h3>
                      <p className="text-gray-600 dark:text-gray-400">Get paid directly for your work with our secure payment system.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4 shadow-md">
                      <FaTrophy className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Build Your Reputation</h3>
                      <p className="text-gray-600 dark:text-gray-400">Earn reviews and build a stellar reputation to attract more clients.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-blue-500/20 shadow-md">
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">Note:</span> SoloFin is available exclusively to Crowntail and Halfmoon ranked Fytrs who have demonstrated consistent quality and reliability.
                  </p>
                </div>
              </motion.div>

              {/* Right side - Illustration */}
              <motion.div
                className="w-full lg:w-1/2 order-1 lg:order-2"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="relative">
                  {/* Glow effects - similar to BettaArena but with blue colors */}
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full filter blur-3xl"></div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full filter blur-3xl"></div>

                  <div className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-[0_0_25px_rgba(59,130,246,0.15)] border border-blue-500/20 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4 shadow-md">
                          <FaUser className="h-7 w-7" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">SoloFin Service</h3>
                          <div className="flex items-center mt-1">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar key={star} className="h-4 w-4 text-yellow-400" />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">5.0 (24 reviews)</span>
                          </div>
                        </div>
                      </div>
                      <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium shadow-sm">
                        PREMIUM
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600 dark:text-gray-300 text-sm">Availability</span>
                        <span className="font-bold text-gray-900 dark:text-white">Immediate</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-300">Service Type</span>
                        <span className="font-medium text-gray-900 dark:text-white">Premium</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-300">Delivery Time</span>
                        <span className="font-medium text-gray-900 dark:text-white">3-5 days</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-300">Revisions</span>
                        <span className="font-medium text-gray-900 dark:text-white">Unlimited</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300">Price</span>
                        <span className="font-bold text-xl text-blue-600 dark:text-blue-400">$250</span>
                      </div>
                    </div>

                    <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg shadow-blue-500/20">
                      <span className="font-medium">Contact Freelancer</span>
                      <FaArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* BettaArena Section */}
        <section
          ref={bettaArenaRef}
          className="py-16 px-6 md:px-16 bg-gray-50 dark:bg-gray-900 overflow-hidden"
        >
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Left side - Illustration */}
              <motion.div
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  {/* Glow effects */}
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full filter blur-3xl"></div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-500/20 rounded-full filter blur-3xl"></div>

                  <div className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-[0_0_25px_rgba(168,85,247,0.15)] border border-purple-500/20 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400 mr-4">
                          <FaUsers className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Logo Challenge</h3>
                          <p className="text-purple-600 dark:text-purple-300 text-sm">24h Competition</p>
                        </div>
                      </div>
                      <div className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 rounded-full text-xs font-medium">
                        LIVE
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600 dark:text-gray-300 text-sm">Time Remaining</span>
                        <span className="font-bold text-gray-900 dark:text-white">16:24:33</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: '32%' }}></div>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-300">Participants</span>
                        <span className="font-medium text-gray-900 dark:text-white">4/6</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-300">Prize Pool</span>
                        <span className="font-medium text-gray-900 dark:text-white">$500</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300">Difficulty</span>
                        <div className="flex">
                          {[1, 2, 3].map((star) => (
                            <FaStar key={star} className="h-4 w-4 text-purple-500 dark:text-purple-400 mr-1" />
                          ))}
                          {[4, 5].map((star) => (
                            <FaStar key={star} className="h-4 w-4 text-gray-300 dark:text-gray-600 mr-1" />
                          ))}
                        </div>
                      </div>
                    </div>

                    <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg shadow-purple-500/20">
                      <span className="font-medium">Join Competition</span>
                      <FaArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Right side - Text content */}
              <motion.div
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">BettaArena</span> - Compete in Real-Time
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Enter the arena and showcase your skills in time-based or theme-based competitions. Compete against other talented Fytrs, win rewards, and climb the leaderboard.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400 mr-4">
                      <FaTrophy className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Win Rewards & Badges</h3>
                      <p className="text-gray-600 dark:text-gray-300">Earn cash prizes, exclusive badges, and recognition for your skills.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400 mr-4">
                      <FaBrain className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Challenge Yourself</h3>
                      <p className="text-gray-600 dark:text-gray-300">Push your creative limits with time constraints and specific themes.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400 mr-4">
                      <FaUsers className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Public Leaderboard</h3>
                      <p className="text-gray-600 dark:text-gray-300">Showcase your ranking and gain visibility among top clients.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-purple-500/20">
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    <span className="font-semibold text-purple-600 dark:text-purple-400">Pro Tip:</span> BettaArena competitions are perfect for building your portfolio quickly and gaining exposure to high-profile clients looking for top talent.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Services Section */}
        <section className="py-16 px-6 md:px-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
              <div>
                <h3 className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-2">The latest freelance services!</h3>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  Featured <span className="text-primary-600 dark:text-primary-400">Services</span>
                </h2>
              </div>

              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("");
                  setFilteredServices(services);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="mt-4 md:mt-0 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-300 inline-flex items-center gap-2"
              >
                <span>View All Services</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
              </div>
            ) : filteredServices.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl text-gray-600 dark:text-gray-400">No services found matching your criteria</h3>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("");
                    setFilteredServices(services);
                  }}
                  className="mt-4 px-6 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.slice(0, 6).map((service, index) => (
                  <ServiceCard key={service.id} service={service} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>


        {/* FytrAcademy Section */}
        <section
          ref={academyRef}
          className="py-16 px-6 md:px-16 bg-gray-50 dark:bg-gray-900 overflow-hidden"
        >
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-amber-600 dark:text-amber-400">FytrAcademy</span> - Learn & Grow
              </motion.h2>
              <motion.p
                className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Enhance your skills with our comprehensive courses designed for freelancers at every level
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* Course Card 1 */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 flex flex-col h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
                    FREE
                  </div>
                  <img
                    src="/photos/Academy/course1.jpg"
                    alt="Web Development Fundamentals"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/fighterfish.png";
                    }}
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center mb-2">
                    <div className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 text-xs rounded-full">
                      Web Development
                    </div>
                    <div className="ml-2 flex items-center text-gray-500 dark:text-gray-400 text-xs">
                      <FaStar className="text-yellow-400 mr-1 h-3 w-3" />
                      <span>4.8</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Web Development Fundamentals</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-1">Learn the basics of HTML, CSS, and JavaScript to build responsive websites from scratch.</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                        <img
                          src="/photos/Academy/student1.jpg"
                          alt="Instructor"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/fighterfish.png";
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">John Smith</span>
                    </div>
                    <Link href="/Academy" className="text-amber-600 dark:text-amber-400 font-medium text-sm hover:underline">
                      View Course
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Course Card 2 */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 flex flex-col h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute top-0 right-0 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
                    PREMIUM
                  </div>
                  <img
                    src="/photos/Academy/course2.jpg"
                    alt="UI/UX Design Masterclass"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/fighterfish.png";
                    }}
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center mb-2">
                    <div className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-400 text-xs rounded-full">
                      UI/UX Design
                    </div>
                    <div className="ml-2 flex items-center text-gray-500 dark:text-gray-400 text-xs">
                      <FaStar className="text-yellow-400 mr-1 h-3 w-3" />
                      <span>4.9</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">UI/UX Design Masterclass</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-1">Master the principles of user interface and experience design with industry-standard tools.</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                        <img
                          src="/photos/Academy/student2.jpeg"
                          alt="Instructor"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/fighterfish.png";
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Sarah Johnson</span>
                    </div>
                    <Link href="/Academy" className="text-primary-600 dark:text-primary-400 font-medium text-sm hover:underline">
                      View Course
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Course Card 3 */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 flex flex-col h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
                    NEW
                  </div>
                  <img
                    src="/photos/Academy/course3.jpg"
                    alt="AI Prompt Engineering"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/fighterfish.png";
                    }}
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center mb-2">
                    <div className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 text-xs rounded-full">
                      AI & Automation
                    </div>
                    <div className="ml-2 flex items-center text-gray-500 dark:text-gray-400 text-xs">
                      <FaStar className="text-yellow-400 mr-1 h-3 w-3" />
                      <span>4.7</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">AI Prompt Engineering</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-1">Learn how to craft effective prompts for AI tools to enhance your workflow and productivity.</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                        <img
                          src="/photos/Academy/student3.png"
                          alt="Instructor"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/fighterfish.png";
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Michael Chen</span>
                    </div>
                    <Link href="/Academy" className="text-purple-600 dark:text-purple-400 font-medium text-sm hover:underline">
                      View Course
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="text-center mt-10">
              <Link href="/Academy" className="inline-flex items-center px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors duration-300">
                <span className="font-medium">Explore All Courses</span>
                <FaArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Domains We Work In Section */}
        <section
          ref={domainsRef}
          className="py-16 px-6 md:px-16 bg-white dark:bg-gray-800 overflow-hidden"
        >
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Domains We <span className="text-primary-600 dark:text-primary-400">Work In</span>
              </motion.h2>
              <motion.p
                className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Explore our diverse range of expertise across multiple industries and specializations
              </motion.p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {domains.map((domain, index) => (
                <motion.div
                  key={domain.title}
                  className="bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                >
                  <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
                    {domain.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{domain.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{domain.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Fytr Section */}
        <section
          ref={whyFytrRef}
          className="py-16 px-6 md:px-16 bg-gray-50 dark:bg-gray-900 overflow-hidden"
        >
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Why Choose <span className="text-primary-600 dark:text-primary-400">Fytr</span>?
              </motion.h2>
              <motion.p
                className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Discover what makes our platform unique and how we empower freelancers and clients alike
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <motion.div
                className="flex flex-col items-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-14 h-14 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
                  <FaUserFriends className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Collaborative Teams</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our unique team-based approach brings together freelancers with diverse skills and experience levels, fostering collaboration and knowledge sharing.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col items-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="w-14 h-14 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
                  <FaBrain className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Smart Matching</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our intelligent algorithm matches freelancers to projects based on skills, experience, and past performance, ensuring the perfect fit for every task.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col items-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="w-14 h-14 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
                  <FaTrophy className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Real XP & Rankings</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Earn experience points and climb our ranking system to unlock new opportunities, higher-paying projects, and exclusive benefits.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col items-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <div className="w-14 h-14 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
                  <FaLock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Secure Payments</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our escrow system ensures that freelancers get paid for their work and clients receive quality deliverables, creating a safe environment for all.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col items-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <div className="w-14 h-14 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
                  <FaGraduationCap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Focus on Learning</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  With FytrAcademy and our community-driven approach, we prioritize continuous learning and skill development for all our members.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col items-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <div className="w-14 h-14 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
                  <FaUserFriends className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Community of Helpers</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Join a supportive community of like-minded professionals who collaborate, share knowledge, and help each other grow in their careers.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          ref={faqRef}
          className="py-20 px-6 md:px-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden relative"
        >
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full filter blur-3xl"></div>

          <div className="container mx-auto">
            <div className="text-center mb-16">
              <motion.span
                className="inline-block px-3 py-1 text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-full mb-3"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Got Questions?
              </motion.span>
              <motion.h2
                className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-indigo-500">Questions</span>
              </motion.h2>
              <motion.p
                className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-lg"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Find answers to common questions about our services and platform
              </motion.p>
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="p-6">
                    <div className="flex items-start mb-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.question}</h3>
                    </div>
                    <div className="pl-14">
                      <p className="text-gray-600 dark:text-gray-400">{item.answer}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <p className="text-gray-600 dark:text-gray-400 mb-4">Still have questions?</p>
              <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-300 inline-flex items-center gap-2">
                <span>Contact Support</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </motion.div>
          </div>
        </section>

        {/* Final CTA Section - Simplified */}
        <section className="py-12 px-6 md:px-16 relative overflow-hidden">
          {/* Background with simplified gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-indigo-600 opacity-90"></div>

          {/* Simple decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full filter blur-3xl opacity-10"></div>

          <div className="container mx-auto relative z-10">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 shadow-lg">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  {/* Left side - Text */}
                  <div className="md:w-2/3 text-center md:text-left">
                    <motion.h2
                      className="text-2xl md:text-3xl font-bold text-white mb-2"
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3 }}
                    >
                      Ready to Join Fytr?
                    </motion.h2>

                    <motion.p
                      className="text-white/80 text-sm md:text-base mb-0 md:mb-2"
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      Start your freelancing journey today
                    </motion.p>
                  </div>

                  {/* Right side - Buttons */}
                  <div className="md:w-1/3 flex flex-col sm:flex-row md:flex-col gap-3">
                    <motion.button
                      className="px-6 py-2 bg-white text-primary-600 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm"
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3 }}
                    >
                      Join Now
                    </motion.button>
                    <motion.button
                      className="px-6 py-2 bg-transparent border border-white/60 text-white rounded-lg transition-all duration-200 hover:bg-white/10 font-medium text-sm"
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      Learn More
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


      </main>
    </div>
  );
};

export default Page;
