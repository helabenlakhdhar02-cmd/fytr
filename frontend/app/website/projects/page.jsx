"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "../../../components/Navbar";
import Link from "next/link";
import {
  FaLaptop, FaBriefcase, FaUsers, FaArrowRight, FaChartLine,
  FaUserPlus, FaMoneyBillWave, FaCode, FaPalette, FaVideo,
  FaRobot, FaBuilding, FaMobileAlt, FaFish, FaCrown, FaMoon,
  FaTrophy, FaBrain, FaUserFriends, FaQuestionCircle, FaShieldAlt,
  FaCheck, FaStar, FaClock
} from "react-icons/fa";

const ProjectsPage = () => {
  // Refs for scroll navigation
  const howItWorksRef = useRef(null);
  const groupProjectsRef = useRef(null);
  const soloFinRef = useRef(null);
  const bettaArenaRef = useRef(null);
  const clientUsageRef = useRef(null);
  const smartMatchingRef = useRef(null);
  const categoriesRef = useRef(null);
  const trustRef = useRef(null);

  // Scroll to section function
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-6 md:px-16 overflow-hidden bg-gray-100 dark:bg-gray-800 light-pattern">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary-100 dark:bg-primary-900/20 rounded-full filter blur-3xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-secondary-100 dark:bg-secondary-900/20 rounded-full filter blur-3xl opacity-60 animate-pulse"></div>

        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block px-3 py-1 mb-4 text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-full"
            >
              Fytr Projects
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 text-gray-900 dark:text-white"
            >
              Explore How Fytr Projects Work
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              From collaborative missions to elite solo challenges — here's how we turn talent into impact.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/dashboard/post-service">
                <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors duration-300 flex items-center justify-center gap-2 group">
                  <span>Post a Project</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/website/freelancers">
                <button className="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center gap-2">
                  <span>Join as a Fytr</span>
                  <FaUserPlus />
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right side - Animated illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-2xl filter blur-md transform scale-105"></div>
              <img
                src="/photos/project-workflow.png"
                alt="Project Workflow"
                className="relative z-10 w-full h-auto rounded-xl shadow-lg object-cover mx-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/fighterfish.png";
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation Bar */}
      <div className="sticky top-0 z-30 bg-white dark:bg-gray-800 shadow-md py-3 px-6 md:px-16">
        <div className="container mx-auto">
          <div className="flex items-center justify-between overflow-x-auto hide-scrollbar">
            <button onClick={() => scrollToSection(howItWorksRef)} className="text-sm whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">How It Works</button>
            <button onClick={() => scrollToSection(groupProjectsRef)} className="text-sm whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Group Projects</button>
            <button onClick={() => scrollToSection(soloFinRef)} className="text-sm whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">SoloFin</button>
            <button onClick={() => scrollToSection(bettaArenaRef)} className="text-sm whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">BettaArena</button>
            <button onClick={() => scrollToSection(clientUsageRef)} className="text-sm whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Client View</button>
            <button onClick={() => scrollToSection(smartMatchingRef)} className="text-sm whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Smart Matching</button>
            <button onClick={() => scrollToSection(categoriesRef)} className="text-sm whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Categories</button>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <main className="container mx-auto px-6 md:px-16 py-12">
        {/* How Projects Work Section */}
        <section ref={howItWorksRef} className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">How Projects Work</h2>

          <div className="max-w-4xl mx-auto">
            <div className="relative pl-10 md:pl-16 space-y-12 before:absolute before:left-5 md:before:left-8 before:top-2 before:bottom-2 before:w-0.5 before:bg-primary-200 dark:before:bg-primary-800">
              {/* Step 1 */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute -left-10 md:-left-16 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center z-10 ring-4 ring-white dark:ring-gray-900 shadow-md">
                    <span className="text-primary-600 dark:text-primary-400 font-bold">1</span>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Client Posts a Project</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Clients specify project details including requirements, deadline, and budget. They can choose between different project types based on their needs.
                  </p>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="absolute -left-10 md:-left-16 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center z-10 ring-4 ring-white dark:ring-gray-900 shadow-md">
                    <span className="text-primary-600 dark:text-primary-400 font-bold">2</span>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Fytr System Selects Eligible Group</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Our smart matching system selects qualified Fytrs based on skills, rank, and previous performance to ensure the best fit for each project.
                  </p>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="absolute -left-10 md:-left-16 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center z-10 ring-4 ring-white dark:ring-gray-900 shadow-md">
                    <span className="text-primary-600 dark:text-primary-400 font-bold">3</span>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Fytrs Submit Their Work</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Selected Fytrs work on the project and submit their solutions through our platform before the deadline.
                  </p>
                </div>
              </motion.div>

              {/* Step 4 */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="absolute -left-10 md:-left-16 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center z-10 ring-4 ring-white dark:ring-gray-900 shadow-md">
                    <span className="text-primary-600 dark:text-primary-400 font-bold">4</span>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Client Picks One Winner</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    The client reviews all submissions and selects the best one. The winning Fytr receives payment for their work.
                  </p>
                </div>
              </motion.div>

              {/* Step 5 */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="absolute -left-10 md:-left-16 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center z-10 ring-4 ring-white dark:ring-gray-900 shadow-md">
                    <span className="text-primary-600 dark:text-primary-400 font-bold">5</span>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Others Gain Experience</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    All participating Fytrs gain XP, receive feedback, and add the project to their portfolio, helping them grow their skills and rank up in the system.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Group Projects Section */}
        <section ref={groupProjectsRef} className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Group Projects – Collective Effort</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Illustration */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-2 lg:order-1"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-primary-100 dark:from-blue-900/30 dark:to-primary-900/30 rounded-2xl filter blur-md transform scale-105"></div>
                <div className="relative z-10 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                  <div className="flex justify-center mb-6">
                    <div className="flex -space-x-4">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                          key={i}
                          className={`w-12 h-12 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-bold overflow-hidden shadow-sm ${
                            i <= 2
                              ? "bg-gray-300 dark:bg-gray-600" // Silver
                              : i <= 4
                                ? "bg-yellow-300 dark:bg-yellow-600" // Gold
                                : "bg-blue-400 dark:bg-blue-600" // Platinum
                          }`}
                        >
                          <img
                            src={`/photos/avatars/avatar-${i}.jpg`}
                            alt={`Fytr ${i}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://ui-avatars.com/api/?name=Fytr+${i}&background=0D8ABC&color=fff`;
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                        <FaUsers className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">6-Fytr Group</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Balanced team with mixed ranks</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                        <FaMoneyBillWave className="text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">Winner Gets Paid</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Best submission receives full payment</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                        <FaChartLine className="text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">All Gain XP</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Everyone levels up their skills</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center">
                        <FaBrain className="text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">Smart Matching</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Balanced skill levels in each group</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right side - Text content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-1 lg:order-2"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Collaborative Competition</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Group Projects are the foundation of the FytrLance ecosystem. When a client posts a Group Project, our system automatically assigns it to a balanced team of 6 Fytrs with varying skill levels.
              </p>

              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">How It Works</h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <FaArrowRight className="text-primary-600 dark:text-primary-400 mt-1 flex-shrink-0" />
                      <span>Task assigned to a 6-Fytr group with balanced skill levels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaArrowRight className="text-primary-600 dark:text-primary-400 mt-1 flex-shrink-0" />
                      <span>All members submit their work independently</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaArrowRight className="text-primary-600 dark:text-primary-400 mt-1 flex-shrink-0" />
                      <span>Client selects the best submission as the winner</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaArrowRight className="text-primary-600 dark:text-primary-400 mt-1 flex-shrink-0" />
                      <span>Winner receives payment for their work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaArrowRight className="text-primary-600 dark:text-primary-400 mt-1 flex-shrink-0" />
                      <span>All participants gain XP, reviews, and portfolio growth</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Benefits</h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <FaArrowRight className="text-primary-600 dark:text-primary-400 mt-1 flex-shrink-0" />
                      <span>Clients get multiple creative solutions to choose from</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaArrowRight className="text-primary-600 dark:text-primary-400 mt-1 flex-shrink-0" />
                      <span>Fytrs gain experience even when they don't win</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaArrowRight className="text-primary-600 dark:text-primary-400 mt-1 flex-shrink-0" />
                      <span>Balanced teams ensure fair competition</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaArrowRight className="text-primary-600 dark:text-primary-400 mt-1 flex-shrink-0" />
                      <span>Continuous cycle helps Fytrs level up their ranks</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SoloFin Projects Section */}
        <section ref={soloFinRef} className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">SoloFin Projects</h2>

          <div className="relative mb-12 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl"></div>
            <div className="relative z-10 p-8 md:p-12 rounded-xl">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/3 flex justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 rounded-full filter blur-md transform scale-90"></div>
                    <div className="relative z-10 w-40 h-40 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-xl">
                      <div className="text-center">
                        <FaCrown className="text-yellow-500 text-3xl mx-auto mb-2" />
                        <h3 className="text-blue-600 dark:text-blue-400 font-bold">SoloFin</h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Premium Direct Hire</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="w-full md:w-2/3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">Elite Direct Collaboration</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      SoloFin projects represent our premium service tier, where clients can directly select and work with a single high-ranked Fytr. This option is exclusively available for Crowntail and Halfmoon ranked freelancers who have proven their expertise.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
                        <FaCrown className="text-yellow-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Crowntail & Halfmoon Only</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
                        <FaMoneyBillWave className="text-green-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Premium Rates</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
                        <FaUserFriends className="text-blue-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">1-to-1 Collaboration</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 h-full">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mb-4">
                  <FaLaptop className="text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">For Clients</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FaCheck className="text-blue-600 dark:text-blue-400 text-xs" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Direct Selection</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Browse profiles and choose the exact Fytr you want to work with based on their portfolio and expertise.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FaCheck className="text-blue-600 dark:text-blue-400 text-xs" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Premium Quality</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Work with only the highest-ranked Fytrs who have proven their skills through multiple successful projects.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FaCheck className="text-blue-600 dark:text-blue-400 text-xs" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Direct Communication</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Enjoy seamless one-on-one communication throughout the project for better alignment and faster iterations.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Right column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 h-full">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mb-4">
                  <FaUserFriends className="text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">For Fytrs</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FaCheck className="text-blue-600 dark:text-blue-400 text-xs" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Higher Earnings</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Command premium rates for your specialized skills and proven track record of success.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FaCheck className="text-blue-600 dark:text-blue-400 text-xs" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Guaranteed Work</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        When selected for a SoloFin project, you're the only Fytr working on it—no competition for payment.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FaCheck className="text-blue-600 dark:text-blue-400 text-xs" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Career Growth</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Build long-term relationships with clients and establish yourself as an expert in your field.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* BettaArena Projects Section */}
        <section ref={bettaArenaRef} className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">BettaArena Projects</h2>

          <div className="relative mb-12 overflow-hidden">
            {/* BettaArena always maintains its dark theme regardless of site theme */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-blue-900 rounded-xl"></div>
            <div className="relative z-10 p-8 md:p-12 rounded-xl">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/3 flex justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full filter blur-md transform scale-90"></div>
                    <div className="relative z-10 w-40 h-40 bg-gray-800 rounded-full flex items-center justify-center shadow-xl border border-blue-500/30">
                      <div className="text-center">
                        <FaTrophy className="text-yellow-500 text-3xl mx-auto mb-2" />
                        <h3 className="text-blue-400 font-bold">BettaArena</h3>
                        <p className="text-xs text-gray-400">Competitive Challenges</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="w-full md:w-2/3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-2xl font-bold text-blue-400 mb-4">The Ultimate Competitive Arena</h3>
                    <p className="text-gray-300 mb-4">
                      BettaArena is where the best Fytrs compete in high-profile challenges. These projects are open to all qualified Fytrs in a specific category, with only the top 1-3 submissions receiving rewards and recognition.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 bg-gray-800/80 px-4 py-2 rounded-full shadow-sm border border-blue-500/30">
                        <FaTrophy className="text-yellow-500" />
                        <span className="text-sm font-medium text-gray-300">Top 1-3 Winners</span>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-800/80 px-4 py-2 rounded-full shadow-sm border border-blue-500/30">
                        <FaUsers className="text-blue-400" />
                        <span className="text-sm font-medium text-gray-300">Open Competition</span>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-800/80 px-4 py-2 rounded-full shadow-sm border border-blue-500/30">
                        <FaFish className="text-blue-400" />
                        <span className="text-sm font-medium text-gray-300">High Visibility</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900 text-white p-6 rounded-xl shadow-lg border border-blue-500/20"
            >
              <div className="w-12 h-12 bg-blue-900/50 rounded-full flex items-center justify-center mb-4">
                <FaTrophy className="text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold text-blue-400 mb-3">Challenge Format</h3>
              <p className="text-gray-300 mb-4">
                Each BettaArena project is structured as a challenge with a specific theme and deadline. Clients set the parameters and prize pool for the competition.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <FaArrowRight className="text-blue-400 mt-1 flex-shrink-0" />
                  <span>Clear challenge brief and requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaArrowRight className="text-blue-400 mt-1 flex-shrink-0" />
                  <span>Fixed deadline for all participants</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaArrowRight className="text-blue-400 mt-1 flex-shrink-0" />
                  <span>Transparent judging criteria</span>
                </li>
              </ul>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-900 text-white p-6 rounded-xl shadow-lg border border-blue-500/20"
            >
              <div className="w-12 h-12 bg-blue-900/50 rounded-full flex items-center justify-center mb-4">
                <FaUsers className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-blue-400 mb-3">Open Participation</h3>
              <p className="text-gray-300 mb-4">
                Any qualified Fytr in the relevant category can join a BettaArena challenge, creating a diverse pool of talent and solutions.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <FaArrowRight className="text-blue-400 mt-1 flex-shrink-0" />
                  <span>Category-specific challenges</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaArrowRight className="text-blue-400 mt-1 flex-shrink-0" />
                  <span>No limit on number of participants</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaArrowRight className="text-blue-400 mt-1 flex-shrink-0" />
                  <span>Opportunity for all skill levels to compete</span>
                </li>
              </ul>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-900 text-white p-6 rounded-xl shadow-lg border border-blue-500/20"
            >
              <div className="w-12 h-12 bg-blue-900/50 rounded-full flex items-center justify-center mb-4">
                <FaMoneyBillWave className="text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-blue-400 mb-3">Rewards & Recognition</h3>
              <p className="text-gray-300 mb-4">
                BettaArena offers more than just monetary rewards—winners gain significant visibility and prestige within the FytrLance community.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <FaArrowRight className="text-blue-400 mt-1 flex-shrink-0" />
                  <span>Cash prizes for top 1-3 winners</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaArrowRight className="text-blue-400 mt-1 flex-shrink-0" />
                  <span>Special badges and achievements</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaArrowRight className="text-blue-400 mt-1 flex-shrink-0" />
                  <span>Featured showcase in the community</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaArrowRight className="text-blue-400 mt-1 flex-shrink-0" />
                  <span>Significant XP and rank progression</span>
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 bg-gray-900 p-6 rounded-xl shadow-lg border border-blue-500/20 text-center"
          >
            <h3 className="text-xl font-bold text-blue-400 mb-4">Ready to Enter the Arena?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              BettaArena challenges are the perfect opportunity to showcase your skills, gain recognition, and compete with the best talent on FytrLance.
            </p>
            <Link href="/website/projects">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-300 flex items-center justify-center gap-2 group mx-auto">
                <span>Browse BettaArena Challenges</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </section>

        {/* How Clients Use Projects Section */}
        <section ref={clientUsageRef} className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">How Clients Use Projects</h2>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button className="w-1/2 py-4 px-6 text-center font-medium text-primary-600 dark:text-primary-400 bg-gray-50 dark:bg-gray-900/50 border-b-2 border-primary-600 dark:border-primary-400">
                For Clients
              </button>
              <button className="w-1/2 py-4 px-6 text-center font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                For Fytrs
              </button>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left column - Steps */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Posting a Project</h3>

                  <div className="relative pl-10 space-y-8 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-primary-200 dark:before:bg-primary-800">
                    {/* Step 1 */}
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute -left-10 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center z-10 ring-4 ring-white dark:ring-gray-800">
                          <span className="text-primary-600 dark:text-primary-400 font-bold text-sm">1</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">Create Project Form</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Fill out a simple form with your project title, description, budget, and deadline.
                        </p>
                      </div>
                    </motion.div>

                    {/* Step 2 */}
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <div className="absolute -left-10 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center z-10 ring-4 ring-white dark:ring-gray-800">
                          <span className="text-primary-600 dark:text-primary-400 font-bold text-sm">2</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">Choose Project Type</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Select between Group Project, SoloFin, or BettaArena based on your needs.
                        </p>
                      </div>
                    </motion.div>

                    {/* Step 3 */}
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <div className="absolute -left-10 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center z-10 ring-4 ring-white dark:ring-gray-800">
                          <span className="text-primary-600 dark:text-primary-400 font-bold text-sm">3</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">Track Progress</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Monitor submissions and communicate with Fytrs through our platform.
                        </p>
                      </div>
                    </motion.div>

                    {/* Step 4 */}
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <div className="absolute -left-10 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center z-10 ring-4 ring-white dark:ring-gray-800">
                          <span className="text-primary-600 dark:text-primary-400 font-bold text-sm">4</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">Select Winner</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Review all submissions and choose the best one that meets your requirements.
                        </p>
                      </div>
                    </motion.div>

                    {/* Step 5 */}
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <div className="absolute -left-10 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center z-10 ring-4 ring-white dark:ring-gray-800">
                          <span className="text-primary-600 dark:text-primary-400 font-bold text-sm">5</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">Secure Payment</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Release payment to the winner through our secure escrow system.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Right column - Dashboard Preview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md">
                    <div className="bg-white dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                      <h4 className="font-medium text-gray-900 dark:text-white">Client Dashboard</h4>
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="mb-4">
                        <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Active Projects</h5>
                        <div className="space-y-3">
                          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between items-start">
                              <div>
                                <h6 className="font-medium text-gray-900 dark:text-white">Website Redesign</h6>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Group Project • 4 days left</p>
                              </div>
                              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full">
                                In Progress
                              </span>
                            </div>
                            <div className="mt-2">
                              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                                <span>Submissions</span>
                                <span>3/6</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '50%' }}></div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between items-start">
                              <div>
                                <h6 className="font-medium text-gray-900 dark:text-white">Logo Design Contest</h6>
                                <p className="text-xs text-gray-500 dark:text-gray-400">BettaArena • 7 days left</p>
                              </div>
                              <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs rounded-full">
                                12 Entries
                              </span>
                            </div>
                            <div className="mt-2">
                              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                                <span>Time Remaining</span>
                                <span>7 days</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '30%' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Completed Projects</h5>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                          <div className="flex justify-between items-start">
                            <div>
                              <h6 className="font-medium text-gray-900 dark:text-white">Mobile App UI</h6>
                              <p className="text-xs text-gray-500 dark:text-gray-400">SoloFin • Completed</p>
                            </div>
                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full">
                              Completed
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Smart Matching System Section */}
        <section ref={smartMatchingRef} className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Smart Matching System</h2>

          <div className="relative mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-xl"></div>
            <div className="relative z-10 p-8 md:p-12 rounded-xl">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Intelligent Project Matching</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      Our proprietary Smart Matching System ensures that projects are assigned to the most suitable Fytrs, creating balanced teams and fair competition while maximizing the chances of successful outcomes.
                    </p>
                    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-3">How It Works</h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Our algorithm analyzes multiple factors to create the perfect match between projects and Fytrs:
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <FaFish className="text-primary-600 dark:text-primary-400 text-xs" />
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white">Rank-Based Matching</h5>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              Projects are matched to Fytrs based on their rank (Veiltail, Crowntail, Halfmoon), ensuring appropriate skill levels.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <FaCode className="text-primary-600 dark:text-primary-400 text-xs" />
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white">Skill & Domain Tags</h5>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              We match projects with Fytrs who have the specific skills and domain expertise required for the task.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <FaChartLine className="text-primary-600 dark:text-primary-400 text-xs" />
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white">Performance History</h5>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              Previous project success, client ratings, and completion rates are factored into the matching algorithm.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <FaClock className="text-primary-600 dark:text-primary-400 text-xs" />
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white">Availability & Workload</h5>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              We consider Fytrs' current workload and availability to ensure they can dedicate proper time to the project.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                </div>

                <div className="w-full md:w-1/2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    <div className="relative z-10 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-4">Advanced Matching Logic</h4>

                      <div className="space-y-4">
                        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                          <h5 className="font-medium text-gray-900 dark:text-white mb-2">Team Diversity</h5>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xs font-bold text-white">V</div>
                            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xs font-bold text-white">V</div>
                            <div className="w-8 h-8 rounded-full bg-yellow-300 dark:bg-yellow-600 flex items-center justify-center text-xs font-bold text-white">C</div>
                            <div className="w-8 h-8 rounded-full bg-yellow-300 dark:bg-yellow-600 flex items-center justify-center text-xs font-bold text-white">C</div>
                            <div className="w-8 h-8 rounded-full bg-blue-400 dark:bg-blue-600 flex items-center justify-center text-xs font-bold text-white">H</div>
                            <div className="w-8 h-8 rounded-full bg-blue-400 dark:bg-blue-600 flex items-center justify-center text-xs font-bold text-white">H</div>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Groups are balanced with a mix of Veiltail (V), Crowntail (C), and Halfmoon (H) ranked Fytrs.
                          </p>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                          <h5 className="font-medium text-gray-900 dark:text-white mb-2">No Repeat Collaborations</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            Our system ensures Fytrs don't repeatedly work in the same groups, maximizing exposure to different styles and approaches.
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex -space-x-2">
                              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs">A</div>
                              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs">B</div>
                              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs">C</div>
                            </div>
                            <FaArrowRight className="text-gray-400" />
                            <div className="flex -space-x-2">
                              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs">A</div>
                              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs">D</div>
                              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs">E</div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                          <h5 className="font-medium text-gray-900 dark:text-white mb-2">Skill-Based Assignment</h5>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600 dark:text-gray-400">Web Development</span>
                              <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600 dark:text-gray-400">UI/UX Design</span>
                              <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '70%' }}></div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600 dark:text-gray-400">Mobile Development</span>
                              <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                <div className="bg-green-600 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Categories Section */}
        <section ref={categoriesRef} className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Project Categories</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Category 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                  <FaCode className="text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Development</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Web, mobile, and software development projects for all platforms.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full">
                    Landing Pages
                  </span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full">
                    Web Apps
                  </span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full">
                    Mobile Apps
                  </span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full">
                    APIs
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Category 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 transition-colors">
                  <FaPalette className="text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Design</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Visual design, UI/UX, branding, and graphic design projects.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full">
                    Logo Design
                  </span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full">
                    UI/UX Wireframes
                  </span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full">
                    Brand Identity
                  </span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full">
                    Illustrations
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Category 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 dark:group-hover:bg-green-800/50 transition-colors">
                  <FaVideo className="text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Video & Animation</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Video production, animation, motion graphics, and editing.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full">
                    Animations
                  </span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full">
                    Video Ads
                  </span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full">
                    Motion Graphics
                  </span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full">
                    Video Editing
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Category 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 dark:group-hover:bg-orange-800/50 transition-colors">
                  <FaRobot className="text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">AI & Data</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  AI development, data analysis, and machine learning projects.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full">
                    Chatbots
                  </span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full">
                    Data Analysis
                  </span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full">
                    ML Models
                  </span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full">
                    Prompt Design
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Category 5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-200 dark:group-hover:bg-red-800/50 transition-colors">
                  <FaBuilding className="text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Architecture</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Architectural design, 3D modeling, and rendering projects.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full">
                    3D Plans
                  </span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full">
                    Renders
                  </span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full">
                    Interior Design
                  </span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full">
                    Landscape Design
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Category 6 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:bg-pink-200 dark:group-hover:bg-pink-800/50 transition-colors">
                  <FaMobileAlt className="text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Social Media</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Social media content, strategy, and management projects.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full">
                    Content Creation
                  </span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full">
                    Strategy
                  </span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full">
                    Copywriting
                  </span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full">
                    Campaign Design
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Category 7 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:bg-yellow-200 dark:group-hover:bg-yellow-800/50 transition-colors">
                  <FaChartLine className="text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Business</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Business strategy, market research, and consulting projects.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full">
                    Market Studies
                  </span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full">
                    Business Plans
                  </span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full">
                    Pitch Decks
                  </span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full">
                    Financial Models
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Category 8 - View All */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group flex items-center justify-center"
            >
              <Link href="/website/projects" className="p-6 text-center w-full h-full flex flex-col items-center justify-center">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-800/50 transition-colors">
                  <FaArrowRight className="text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Explore All Categories</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Discover more specialized project categories.
                </p>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Project Trust & Quality Section */}
        <section ref={trustRef} className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Project Trust & Quality</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center">
                    <FaShieldAlt className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Our Quality Commitment</h3>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  At FytrLance, we're committed to maintaining the highest standards of quality and integrity in all projects. Our platform is designed to ensure fair competition, protect intellectual property, and deliver exceptional results.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FaCheck className="text-green-600 dark:text-green-400 text-xs" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Code of Conduct</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        All users agree to our professional code of conduct, ensuring respectful and ethical behavior throughout the platform.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FaCheck className="text-green-600 dark:text-green-400 text-xs" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Anti-Plagiarism Measures</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        We employ advanced tools to detect and prevent plagiarism, ensuring all submissions are original work.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FaCheck className="text-green-600 dark:text-green-400 text-xs" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Secure Payments</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Our escrow system holds payments securely until project completion, protecting both clients and Fytrs.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FaCheck className="text-green-600 dark:text-green-400 text-xs" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Dispute Resolution</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Our dedicated support team is available to mediate and resolve any issues that may arise during projects.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                    <FaStar className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Comprehensive Rating System</h3>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Our two-way rating system ensures accountability and transparency for both clients and Fytrs, helping build a community of trusted professionals.
                </p>

                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Client Ratings</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar key={star} className="text-yellow-400 w-4 h-4" />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">5.0</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      "Exceptional work! The Fytr understood exactly what I needed and delivered beyond my expectations."
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Fytr Ratings</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[1, 2, 3, 4].map((star) => (
                          <FaStar key={star} className="text-yellow-400 w-4 h-4" />
                        ))}
                        <FaStar className="text-gray-300 dark:text-gray-600 w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">4.0</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      "Great client with clear requirements. Communication was smooth throughout the project."
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Quality Badges</h4>
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                        <FaCheck className="text-blue-600 dark:text-blue-400 text-xs" />
                        <span className="text-xs font-medium text-blue-800 dark:text-blue-300">Verified</span>
                      </div>
                      <div className="flex items-center gap-1 bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full">
                        <FaTrophy className="text-purple-600 dark:text-purple-400 text-xs" />
                        <span className="text-xs font-medium text-purple-800 dark:text-purple-300">Top Rated</span>
                      </div>
                      <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                        <FaClock className="text-green-600 dark:text-green-400 text-xs" />
                        <span className="text-xs font-medium text-green-800 dark:text-green-300">On Time</span>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 px-3 py-1 rounded-full">
                        <FaFish className="text-yellow-600 dark:text-yellow-400 text-xs" />
                        <span className="text-xs font-medium text-yellow-800 dark:text-yellow-300">Halfmoon</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 px-6 md:px-16 bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800 rounded-2xl shadow-xl overflow-hidden relative">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
              <path d="M14 16H9v-2h5V9h2v5h5v2h-5v5h-2v-5zm14 14H23v-2h5v-5h2v5h5v2h-5v5h-2v-5zm11-23h2v2h-2v-2zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2z" fill="currentColor">
              </path>
            </svg>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white rounded-full filter blur-3xl opacity-10"></div>
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-white rounded-full filter blur-3xl opacity-10"></div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {/* For Clients */}
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                  <h3 className="text-xl font-bold text-white mb-3">For Clients</h3>
                  <p className="text-white/80 mb-6">
                    Ready to see 6 minds compete for your vision? Post your first project and discover the power of collaborative competition.
                  </p>
                  <Link href="/dashboard/post-service">
                    <button className="w-full bg-white text-primary-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-bold shadow-lg hover:shadow-white/30 flex items-center justify-center gap-2 group transition-all duration-300">
                      <span>Post Your First Project</span>
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>

                {/* For Fytrs */}
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                  <h3 className="text-xl font-bold text-white mb-3">For Fytrs</h3>
                  <p className="text-white/80 mb-6">
                    Start building your portfolio, one task at a time. Join our community of talented freelancers and grow your skills and reputation.
                  </p>
                  <Link href="/website/freelancers">
                    <button className="w-full bg-white text-primary-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-bold shadow-lg hover:shadow-white/30 flex items-center justify-center gap-2 group transition-all duration-300">
                      <span>Join Now & Explore Projects</span>
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <FaShieldAlt className="text-white/80" />
                  <span className="text-sm font-medium text-white/80">Secure Payments</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <FaUsers className="text-white/80" />
                  <span className="text-sm font-medium text-white/80">Growing Community</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <FaChartLine className="text-white/80" />
                  <span className="text-sm font-medium text-white/80">Career Growth</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <FaFish className="text-white/80" />
                  <span className="text-sm font-medium text-white/80">Rank Up System</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProjectsPage;
