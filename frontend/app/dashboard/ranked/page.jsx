"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";
import { motion } from "framer-motion";
import {
  FaTrophy,
  FaStar,
  FaChartLine,
  FaHistory,
  FaAward,
  FaChevronDown,
  FaChevronUp,
  FaUsers,
  FaGraduationCap,
  FaClock,
  FaBell,
  FaArrowRight,
  FaCrown,
  FaArrowUp,
  FaArrowDown,
  FaGlobe,
  FaPaintBrush,
  FaCode,
  FaPen,
  FaBullhorn,
  FaVideo,
  FaChevronLeft,
  FaChevronRight,
  FaCheck
} from "react-icons/fa";
import { refreshAccessToken, logoutUser } from '../../../lib/auth';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';

export default function RankedDashboard() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // State for tabs and accordion sections
  const [activeTab, setActiveTab] = useState('freelancer');
  const [openSection, setOpenSection] = useState(null);
  const [activeDomain, setActiveDomain] = useState('all');
  const [timeFilter, setTimeFilter] = useState('month');

  // Toggle tab with improved navigation
  const toggleTab = (tab) => {
    setActiveTab(tab);
    setOpenSection(null); // Reset open sections when changing tabs

    // Update URL without full page reload
    const url = new URL(window.location);
    url.searchParams.set('tab', tab);
    window.history.pushState({}, '', url);
  };

  // Toggle domain filter for leaderboard
  const toggleDomain = (domain) => {
    setActiveDomain(domain);
  };

  // Toggle accordion section
  const toggleSection = (section) => {
    if (openSection === section) {
      setOpenSection(null);
    } else {
      setOpenSection(section);
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        let newToken = await refreshAccessToken();
        if (!newToken) {
          logoutUser();
          router.push('/login');
        } else {
          setToken(newToken);
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkToken();
    const interval = setInterval(checkToken, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [router]);

  useEffect(() => {
    const accessToken = Cookies.get('access_token');
    if (accessToken) {
      const decoded = jwt.decode(accessToken);
      setUser(decoded.user);
    }
  }, [token]);

  // Load tab from URL on initial load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location);
      const tabParam = url.searchParams.get('tab');
      if (tabParam && ['freelancer', 'rank', 'leaderboard'].includes(tabParam)) {
        setActiveTab(tabParam);
      }
    }
  }, []);

  // Mock data for the dashboard
  const rankData = {
    currentRank: "Crowntail",
    nextRank: "Halfmoon",
    currentXP: 620,
    nextRankXP: 1000,
    tasksParticipated: 15,
    tasksWon: 6,
    avgRating: 4.8,
    avgDeliveryTime: 2.3,
    mainDomain: "UI/UX Design",
    latestFeedback: "Excellent work! Delivered ahead of schedule with great attention to detail.",
    rankHistory: [
      { date: "Apr 2023", event: "Promoted to Crowntail", type: "promotion" },
      { date: "Feb 2023", event: "Completed 5 tasks with 4.5+ rating", type: "achievement" },
      { date: "Jan 2023", event: "Joined as Veiltail", type: "join" }
    ],
    topFytrs: {
      all: [
        { name: "Fatma.codes", domain: "UI/UX Design", tasksWon: 21, rating: 4.9, rank: "Rosetail", avatar: "/images/avatar1.png", change: 0 },
        { name: "CodeMaster", domain: "Development", tasksWon: 25, rating: 4.9, rank: "Rosetail", avatar: "/images/avatar4.png", change: 0 },
        { name: "ZiedPixels", domain: "UI/UX Design", tasksWon: 17, rating: 4.8, rank: "Halfmoon", avatar: "/images/avatar2.png", change: 2 },
        { name: "ContentKing", domain: "Writing", tasksWon: 22, rating: 4.8, rank: "Halfmoon", avatar: "/images/avatar7.png", change: 1 },
        { name: "DevNinja", domain: "Development", tasksWon: 19, rating: 4.7, rank: "Halfmoon", avatar: "/images/avatar5.png", change: 1 },
        { name: "AhmedDesigns", domain: "UI/UX Design", tasksWon: 15, rating: 4.7, rank: "Halfmoon", avatar: "/images/avatar3.png", change: -1 },
        { name: "MarketPro", domain: "Marketing", tasksWon: 18, rating: 4.7, rank: "Halfmoon", avatar: "/images/avatar8.png", change: 3 },
        { name: "WebWizard", domain: "Development", tasksWon: 16, rating: 4.6, rank: "Halfmoon", avatar: "/images/avatar6.png", change: 1 },
        { name: "VideoMaster", domain: "Video Editing", tasksWon: 14, rating: 4.6, rank: "Crowntail", avatar: "/images/avatar9.png", change: 2 },
        { name: "CopyGenius", domain: "Writing", tasksWon: 13, rating: 4.5, rank: "Crowntail", avatar: "/images/avatar10.png", change: -2 }
      ],
      design: [
        { name: "Fatma.codes", domain: "UI/UX Design", tasksWon: 21, rating: 4.9, rank: "Rosetail", avatar: "/images/avatar1.png", change: 0 },
        { name: "ZiedPixels", domain: "UI/UX Design", tasksWon: 17, rating: 4.8, rank: "Halfmoon", avatar: "/images/avatar2.png", change: 2 },
        { name: "AhmedDesigns", domain: "UI/UX Design", tasksWon: 15, rating: 4.7, rank: "Halfmoon", avatar: "/images/avatar3.png", change: -1 },
        { name: "DesignDiva", domain: "UI/UX Design", tasksWon: 12, rating: 4.5, rank: "Crowntail", avatar: "/images/avatar11.png", change: 1 },
        { name: "UXMaster", domain: "UI/UX Design", tasksWon: 10, rating: 4.4, rank: "Crowntail", avatar: "/images/avatar12.png", change: 0 }
      ],
      development: [
        { name: "CodeMaster", domain: "Development", tasksWon: 25, rating: 4.9, rank: "Rosetail", avatar: "/images/avatar4.png", change: 0 },
        { name: "DevNinja", domain: "Development", tasksWon: 19, rating: 4.7, rank: "Halfmoon", avatar: "/images/avatar5.png", change: 1 },
        { name: "WebWizard", domain: "Development", tasksWon: 16, rating: 4.6, rank: "Halfmoon", avatar: "/images/avatar6.png", change: 1 },
        { name: "CodeGuru", domain: "Development", tasksWon: 14, rating: 4.5, rank: "Crowntail", avatar: "/images/avatar13.png", change: 2 },
        { name: "DevWhiz", domain: "Development", tasksWon: 11, rating: 4.4, rank: "Crowntail", avatar: "/images/avatar14.png", change: -1 }
      ],
      writing: [
        { name: "ContentKing", domain: "Writing", tasksWon: 22, rating: 4.8, rank: "Halfmoon", avatar: "/images/avatar7.png", change: 1 },
        { name: "CopyGenius", domain: "Writing", tasksWon: 13, rating: 4.5, rank: "Crowntail", avatar: "/images/avatar10.png", change: -2 },
        { name: "WordSmith", domain: "Writing", tasksWon: 12, rating: 4.6, rank: "Crowntail", avatar: "/images/avatar15.png", change: 0 },
        { name: "StoryTeller", domain: "Writing", tasksWon: 10, rating: 4.4, rank: "Crowntail", avatar: "/images/avatar16.png", change: 1 },
        { name: "ContentPro", domain: "Writing", tasksWon: 9, rating: 4.3, rank: "Veiltail", avatar: "/images/avatar17.png", change: 2 }
      ],
      marketing: [
        { name: "MarketPro", domain: "Marketing", tasksWon: 18, rating: 4.7, rank: "Halfmoon", avatar: "/images/avatar8.png", change: 3 },
        { name: "SEOGuru", domain: "Marketing", tasksWon: 15, rating: 4.6, rank: "Halfmoon", avatar: "/images/avatar18.png", change: 1 },
        { name: "SocialMedia", domain: "Marketing", tasksWon: 13, rating: 4.5, rank: "Crowntail", avatar: "/images/avatar19.png", change: 0 },
        { name: "AdMaster", domain: "Marketing", tasksWon: 11, rating: 4.4, rank: "Crowntail", avatar: "/images/avatar20.png", change: -1 },
        { name: "BrandWiz", domain: "Marketing", tasksWon: 9, rating: 4.3, rank: "Veiltail", avatar: "/images/avatar21.png", change: 2 }
      ],
      videoEditing: [
        { name: "VideoMaster", domain: "Video Editing", tasksWon: 14, rating: 4.6, rank: "Crowntail", avatar: "/images/avatar9.png", change: 2 },
        { name: "MotionPro", domain: "Video Editing", tasksWon: 12, rating: 4.5, rank: "Crowntail", avatar: "/images/avatar22.png", change: 1 },
        { name: "EditKing", domain: "Video Editing", tasksWon: 10, rating: 4.4, rank: "Crowntail", avatar: "/images/avatar23.png", change: 0 },
        { name: "VFXMaster", domain: "Video Editing", tasksWon: 9, rating: 4.3, rank: "Veiltail", avatar: "/images/avatar24.png", change: 1 },
        { name: "VideoArtist", domain: "Video Editing", tasksWon: 8, rating: 4.2, rank: "Veiltail", avatar: "/images/avatar25.png", change: -1 }
      ]
    },
    fytrOfMonth: {
      name: "Fatma.codes",
      domain: "UI/UX Design",
      tasksWon: 8,
      clientPraise: "Fatma consistently delivers exceptional designs that exceed expectations. Her attention to detail and creativity are outstanding.",
      avatar: "/images/avatar1.png",
      rank: "Rosetail"
    },
    achievements: [
      { name: "First Task Completed", icon: "🏆", unlocked: true },
      { name: "5 Tasks in a Month", icon: "🚀", unlocked: true },
      { name: "5-Star Client Rating", icon: "⭐", unlocked: true },
      { name: "10 Tasks Completed", icon: "🏅", unlocked: false },
      { name: "Perfect Delivery Streak", icon: "⚡", unlocked: false }
    ],
    domainStats: {
      design: { totalFytrs: 156, avgRating: 4.6, topRank: "Rosetail" },
      development: { totalFytrs: 203, avgRating: 4.5, topRank: "Rosetail" },
      writing: { totalFytrs: 124, avgRating: 4.4, topRank: "Halfmoon" },
      marketing: { totalFytrs: 98, avgRating: 4.3, topRank: "Halfmoon" },
      videoEditing: { totalFytrs: 76, avgRating: 4.2, topRank: "Crowntail" }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="p-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-center max-w-md mx-auto">
          <div className="mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          </div>
          <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Loading...</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-1">Please wait while we load your rank data...</p>
          <p className="text-xs text-gray-500 dark:text-gray-500">This may take a few moments</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Fytr Dashboard</h1>

        {/* Profile Overview (Always Visible) */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                  <img
                    src="/images/crowntail.png"
                    alt="Rank Badge"
                    className="w-12 h-12"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/fighterfish.png";
                    }}
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center border-2 border-white dark:border-gray-800">
                  <FaStar />
                </div>
              </div>

              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">@{user?.username || "username"}</h2>
                <div className="flex items-center">
                  <span className="text-blue-600 dark:text-blue-400 font-medium">{rankData.currentRank}</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-600 dark:text-gray-400">{rankData.mainDomain}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center min-w-[100px]">
                <div className="text-xl font-bold text-gray-900 dark:text-white">{rankData.tasksParticipated}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Tasks Participated</div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center min-w-[100px]">
                <div className="text-xl font-bold text-gray-900 dark:text-white">{rankData.tasksWon}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Tasks Won</div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center min-w-[100px]">
                <div className="text-xl font-bold text-gray-900 dark:text-white">{rankData.avgRating}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Avg Rating</div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center min-w-[100px]">
                <div className="text-xl font-bold text-gray-900 dark:text-white">{rankData.avgDeliveryTime}d</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Avg Delivery</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto">
          <button
            className={`py-3 px-6 font-medium text-lg transition-all duration-300 ${
              activeTab === 'freelancer'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 transform scale-105'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => toggleTab('freelancer')}
          >
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${activeTab === 'freelancer' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span>FYTR Dashboard</span>
            </div>
          </button>
          <button
            className={`py-3 px-6 font-medium text-lg transition-all duration-300 ${
              activeTab === 'rank'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 transform scale-105'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => toggleTab('rank')}
          >
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${activeTab === 'rank' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`} viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              <span>Rank Journey</span>
            </div>
          </button>
          <button
            className={`py-3 px-6 font-medium text-lg transition-all duration-300 ${
              activeTab === 'leaderboard'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 transform scale-105'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => toggleTab('leaderboard')}
          >
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${activeTab === 'leaderboard' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7zm-3 2a1 1 0 10-2 0v4a1 1 0 102 0V9zm-3 3a1 1 0 10-2 0v1a1 1 0 102 0v-1z" clipRule="evenodd" />
              </svg>
              <span>Leaderboard</span>
            </div>
          </button>
        </div>

        {/* Freelancer Profile Tab Content */}
        {activeTab === 'freelancer' && (
          <div>
            {/* XP Progress Bar */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">XP Progress</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {rankData.currentXP} / {rankData.nextRankXP} XP
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${(rankData.currentXP / rankData.nextRankXP) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {rankData.nextRankXP - rankData.currentXP} XP to reach {rankData.nextRank}
              </p>

              {/* Latest Feedback */}
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                  "{rankData.latestFeedback}"
                </p>
              </div>
            </div>

            {/* Advanced Statistics */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl shadow-md p-6 mb-6 border border-blue-100 dark:border-blue-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                  <FaChartLine className="text-white" />
                </div>
                Performance Metrics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-blue-100 dark:border-blue-800 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Project Acceptance Rate</div>
                  <div className="flex items-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">92%</div>
                    <div className="ml-2 text-green-600 dark:text-green-400 text-xs flex items-center">
                      <FaArrowUp className="mr-1" />
                      <span>5%</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Last 30 days</div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-blue-100 dark:border-blue-800 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg. Response Time</div>
                  <div className="flex items-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">1.8h</div>
                    <div className="ml-2 text-green-600 dark:text-green-400 text-xs flex items-center">
                      <FaArrowDown className="mr-1" />
                      <span>0.5h</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Last 30 days</div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-blue-100 dark:border-blue-800 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Client Retention</div>
                  <div className="flex items-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">78%</div>
                    <div className="ml-2 text-green-600 dark:text-green-400 text-xs flex items-center">
                      <FaArrowUp className="mr-1" />
                      <span>12%</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Returning clients</div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-blue-100 dark:border-blue-800 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Client Satisfaction</div>
                  <div className="flex items-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">4.8</div>
                    <div className="ml-2 text-yellow-500 dark:text-yellow-400 text-xs flex items-center">
                      <FaStar className="mr-1" />
                      <FaStar className="mr-1" />
                      <FaStar className="mr-1" />
                      <FaStar className="mr-1" />
                      <FaStar className="mr-1" />
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Based on 24 reviews</div>
                </div>
              </div>
            </div>

            {/* Courses & Learning */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl shadow-md p-6 mb-6 border border-purple-100 dark:border-purple-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center mr-2">
                  <FaGraduationCap className="text-white" />
                </div>
                Courses & Learning
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Completed Courses */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-purple-100 dark:border-purple-800 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Completed Courses</h4>
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs font-medium px-2.5 py-0.5 rounded-full">5 Total</span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 flex-shrink-0">
                        <FaGraduationCap className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Advanced UI/UX Design</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                          <FaStar className="text-yellow-400 mr-1" />
                          <span>Completed with Excellence</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3 flex-shrink-0">
                        <FaGraduationCap className="text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Figma Masterclass</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Completed 2 months ago</div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 flex-shrink-0">
                        <FaGraduationCap className="text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Responsive Web Design</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Completed 3 months ago</div>
                      </div>
                    </div>
                  </div>

                  <button className="mt-4 w-full px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 rounded-lg text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors">
                    View All Courses
                  </button>
                </div>

                {/* Skills Improvement */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-purple-100 dark:border-purple-800 shadow-sm">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Skills Improvement</h4>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">UI/UX Design</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          +15%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: '85%' }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Figma</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          +20%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div
                          className="bg-purple-600 h-2.5 rounded-full"
                          style={{ width: '90%' }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">HTML/CSS</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          +10%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div
                          className="bg-green-600 h-2.5 rounded-full"
                          style={{ width: '75%' }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      Your skills have improved by <span className="font-medium text-purple-600 dark:text-purple-400">15%</span> on average since completing these courses.
                    </div>
                  </div>
                </div>

                {/* Recommended Courses */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-purple-100 dark:border-purple-800 shadow-sm">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Recommended Courses</h4>

                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800 hover:shadow-md transition-shadow duration-300 cursor-pointer">
                      <div className="font-medium text-gray-900 dark:text-white">Advanced Animation Techniques</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Boost your UI motion design skills</div>
                      <div className="flex items-center mt-2">
                        <div className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 px-2 py-0.5 rounded-full">
                          +200 XP
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                          4 weeks • Intermediate
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800 hover:shadow-md transition-shadow duration-300 cursor-pointer">
                      <div className="font-medium text-gray-900 dark:text-white">Design Systems at Scale</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Create consistent design systems</div>
                      <div className="flex items-center mt-2">
                        <div className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 px-2 py-0.5 rounded-full">
                          +150 XP
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                          3 weeks • Advanced
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="mt-4 w-full px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                    Browse All Courses
                  </button>
                </div>
              </div>
            </div>

            {/* Freelancer Profile Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Profile Details */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Profile Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Username:</span>
                    <span className="font-medium text-gray-900 dark:text-white">@{user?.username || "username"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Domain:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{rankData.mainDomain}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Current Rank:</span>
                    <span className="font-medium text-blue-600 dark:text-blue-400">{rankData.currentRank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Member Since:</span>
                    <span className="font-medium text-gray-900 dark:text-white">Jan 2023</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Completion Rate:</span>
                    <span className="font-medium text-green-600 dark:text-green-400">98%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">On-time Delivery:</span>
                    <span className="font-medium text-green-600 dark:text-green-400">100%</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="border-l-2 border-blue-500 pl-3">
                    <p className="text-sm text-gray-900 dark:text-white font-medium">Completed a task</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">2 days ago</p>
                  </div>
                  <div className="border-l-2 border-green-500 pl-3">
                    <p className="text-sm text-gray-900 dark:text-white font-medium">Received 5-star rating</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">1 week ago</p>
                  </div>
                  <div className="border-l-2 border-purple-500 pl-3">
                    <p className="text-sm text-gray-900 dark:text-white font-medium">Started a new project</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">2 weeks ago</p>
                  </div>
                  <div className="border-l-2 border-yellow-500 pl-3">
                    <p className="text-sm text-gray-900 dark:text-white font-medium">Ranked up to Crowntail</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">1 month ago</p>
                  </div>
                </div>
              </div>

              {/* Skills & Expertise */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Skills & Expertise</h3>
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Primary Skills</div>
                  <div className="flex flex-wrap gap-2">
                    <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-full text-sm flex items-center">
                      <span className="mr-1">UI/UX Design</span>
                      <span className="bg-blue-200 dark:bg-blue-800 text-xs px-1.5 rounded-full">Expert</span>
                    </div>
                    <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-full text-sm flex items-center">
                      <span className="mr-1">Wireframing</span>
                      <span className="bg-blue-200 dark:bg-blue-800 text-xs px-1.5 rounded-full">Expert</span>
                    </div>
                    <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-full text-sm flex items-center">
                      <span className="mr-1">Prototyping</span>
                      <span className="bg-blue-200 dark:bg-blue-800 text-xs px-1.5 rounded-full">Advanced</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tools</div>
                  <div className="flex flex-wrap gap-2">
                    <div className="px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400 rounded-full text-sm">Figma</div>
                    <div className="px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400 rounded-full text-sm">Adobe XD</div>
                    <div className="px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400 rounded-full text-sm">Sketch</div>
                    <div className="px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400 rounded-full text-sm">InVision</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Secondary Skills</div>
                  <div className="flex flex-wrap gap-2">
                    <div className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 rounded-full text-sm">HTML/CSS</div>
                    <div className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 rounded-full text-sm">JavaScript</div>
                    <div className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 rounded-full text-sm">Responsive Design</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Projects */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Current Projects</h3>
                <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm flex items-center hover:bg-blue-700 transition-colors">
                  <span className="mr-1">View All</span>
                  <FaArrowRight className="text-xs" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Project</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Client</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Deadline</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Progress</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900 dark:text-white">Mobile App Redesign</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">UI/UX Design</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-gray-600 dark:text-gray-400">TechCorp Inc.</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Premium Client</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-gray-600 dark:text-gray-400">May 15, 2023</div>
                        <div className="text-xs text-yellow-500 dark:text-yellow-400">3 days left</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-1">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 text-right">75%</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                          In Progress
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900 dark:text-white">E-commerce Website</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Web Design</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-gray-600 dark:text-gray-400">Fashion Boutique</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">New Client</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-gray-600 dark:text-gray-400">May 30, 2023</div>
                        <div className="text-xs text-green-500 dark:text-green-400">18 days left</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-1">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 text-right">30%</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                          Active
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Project Planning */}
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl shadow-md p-6 mt-6 mb-6 border border-teal-100 dark:border-teal-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center mr-2">
                  <FaClock className="text-white" />
                </div>
                Project Planning
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Upcoming Deadlines</h4>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-yellow-200 dark:border-yellow-800 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mr-3 flex-shrink-0">
                        <FaClock className="text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Mobile App Redesign</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Due in 3 days</div>
                      </div>
                      <div className="ml-auto">
                        <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 rounded-full text-xs">Urgent</span>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-800 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 flex-shrink-0">
                        <FaClock className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">E-commerce Website</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Due in 18 days</div>
                      </div>
                      <div className="ml-auto">
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full text-xs">On Track</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Productivity Tips</h4>
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-teal-200 dark:border-teal-800 shadow-sm">
                    <div className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                      <div className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mr-2">
                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                      </div>
                      Optimize Your Schedule
                    </div>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                      <li className="flex items-start">
                        <div className="text-teal-600 dark:text-teal-400 mr-2">•</div>
                        <div>Complete the Mobile App wireframes by tomorrow to stay ahead of schedule</div>
                      </li>
                      <li className="flex items-start">
                        <div className="text-teal-600 dark:text-teal-400 mr-2">•</div>
                        <div>Consider starting the E-commerce project research phase this week</div>
                      </li>
                      <li className="flex items-start">
                        <div className="text-teal-600 dark:text-teal-400 mr-2">•</div>
                        <div>You have 2 available slots for new projects this month</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Performance */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl shadow-md p-6 mb-6 border border-green-100 dark:border-green-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                </div>
                Financial Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-green-100 dark:border-green-800 shadow-sm">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Income Progress</h4>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Monthly Income</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        $3,250 / $4,000
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
                      <div
                        className="bg-green-600 h-2.5 rounded-full"
                        style={{ width: '81%' }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>Current: $3,250</span>
                      <span>Goal: $4,000</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Yearly Income</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        $28,500 / $45,000
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
                      <div
                        className="bg-green-600 h-2.5 rounded-full"
                        style={{ width: '63%' }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>Current: $28,500</span>
                      <span>Goal: $45,000</span>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
                    <div className="text-sm text-gray-700 dark:text-gray-300 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                      </svg>
                      You're on track to exceed your monthly goal by 5%
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-green-100 dark:border-green-800 shadow-sm">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Financial Metrics</h4>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Average Project Value</div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white">$850</div>
                      </div>
                      <div className="text-green-600 dark:text-green-400 flex items-center text-sm">
                        <FaArrowUp className="mr-1" />
                        <span>$120</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Projects Completed</div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white">6</div>
                      </div>
                      <div className="text-green-600 dark:text-green-400 flex items-center text-sm">
                        <FaArrowUp className="mr-1" />
                        <span>2</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Income Growth</div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white">24%</div>
                      </div>
                      <div className="text-green-600 dark:text-green-400 flex items-center text-sm">
                        <FaArrowUp className="mr-1" />
                        <span>5%</span>
                      </div>
                    </div>
                  </div>

                  <button className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center">
                    <span>View Financial Report</span>
                    <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Tab Content */}
        {activeTab === 'leaderboard' && (
          <div>
            {/* Domain Filter */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl shadow-md overflow-hidden mb-6 border border-blue-100 dark:border-blue-800">
              <div className="p-6 border-b border-blue-100 dark:border-blue-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-3 shadow-md">
                      <FaTrophy className="text-white text-lg" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Global Leaderboard</h3>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <select
                        className="appearance-none bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-800 text-gray-700 dark:text-gray-300 rounded-lg pl-4 pr-10 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={timeFilter}
                        onChange={(e) => setTimeFilter(e.target.value)}
                      >
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="year">This Year</option>
                        <option value="all">All Time</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <FaChevronDown className="text-gray-400 text-xs" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Domain Tabs */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => toggleDomain('all')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeDomain === 'all'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <FaGlobe className={`mr-2 ${activeDomain === 'all' ? 'text-white' : 'text-blue-500 dark:text-blue-400'}`} />
                      All Domains
                    </div>
                  </button>
                  <button
                    onClick={() => toggleDomain('design')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeDomain === 'design'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <FaPaintBrush className={`mr-2 ${activeDomain === 'design' ? 'text-white' : 'text-purple-500 dark:text-purple-400'}`} />
                      UI/UX Design
                    </div>
                  </button>
                  <button
                    onClick={() => toggleDomain('development')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeDomain === 'development'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <FaCode className={`mr-2 ${activeDomain === 'development' ? 'text-white' : 'text-green-500 dark:text-green-400'}`} />
                      Development
                    </div>
                  </button>
                  <button
                    onClick={() => toggleDomain('writing')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeDomain === 'writing'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <FaPen className={`mr-2 ${activeDomain === 'writing' ? 'text-white' : 'text-yellow-500 dark:text-yellow-400'}`} />
                      Writing
                    </div>
                  </button>
                  <button
                    onClick={() => toggleDomain('marketing')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeDomain === 'marketing'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <FaBullhorn className={`mr-2 ${activeDomain === 'marketing' ? 'text-white' : 'text-red-500 dark:text-red-400'}`} />
                      Marketing
                    </div>
                  </button>
                  <button
                    onClick={() => toggleDomain('videoEditing')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeDomain === 'videoEditing'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <FaVideo className={`mr-2 ${activeDomain === 'videoEditing' ? 'text-white' : 'text-teal-500 dark:text-teal-400'}`} />
                      Video Editing
                    </div>
                  </button>
                </div>
              </div>

              {/* Domain Stats */}
              {activeDomain !== 'all' && rankData.domainStats[activeDomain] && (
                <div className="px-6 py-4 bg-white dark:bg-gray-800 border-b border-blue-100 dark:border-blue-800">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Fytrs</div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{rankData.domainStats[activeDomain].totalFytrs}</div>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg Rating</div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                        <FaStar className="text-yellow-400 mr-1 text-xl" />
                        {rankData.domainStats[activeDomain].avgRating}
                      </div>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Top Rank</div>
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{rankData.domainStats[activeDomain].topRank}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Leaderboard Cards */}
            <div className="space-y-4 mb-6">
              {rankData.topFytrs[activeDomain].slice(0, 10).map((fytr, index) => (
                <motion.div
                  key={index}
                  className={`relative rounded-xl overflow-hidden border ${
                    index === 0
                      ? 'border-yellow-200 dark:border-yellow-800 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/10 dark:to-amber-900/10'
                      : index === 1
                        ? 'border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-800'
                        : index === 2
                          ? 'border-amber-200 dark:border-amber-800 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/10 dark:to-amber-900/20'
                          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                  } hover:shadow-md transition-shadow duration-300`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  {/* Golden shimmer for top 1 */}
                  {index === 0 && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-yellow-300/0 via-yellow-300/20 to-yellow-300/0 pointer-events-none"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    ></motion.div>
                  )}

                  <div className="flex items-center p-4">
                    {/* Rank Number */}
                    <div className="flex-shrink-0 mr-4">
                      {index < 3 ? (
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          index === 0
                            ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white'
                            : index === 1
                              ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white'
                              : 'bg-gradient-to-br from-amber-400 to-amber-600 text-white'
                        } shadow-md`}>
                          <FaTrophy className="text-lg" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xl font-bold text-gray-700 dark:text-gray-300 shadow-sm">
                          {index + 1}
                        </div>
                      )}
                    </div>

                    {/* Fytr Info */}
                    <div className="flex-grow flex items-center">
                      <div className="relative mr-4">
                        <img
                          src={fytr.avatar}
                          alt={fytr.name}
                          className={`w-14 h-14 rounded-full object-cover border-2 ${
                            index === 0
                              ? 'border-yellow-300 dark:border-yellow-600'
                              : index === 1
                                ? 'border-gray-300 dark:border-gray-500'
                                : index === 2
                                  ? 'border-amber-300 dark:border-amber-600'
                                  : 'border-white dark:border-gray-700'
                          } shadow-sm`}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/fighterfish.png";
                          }}
                        />
                        <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center ${
                          fytr.rank === 'Rosetail'
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border border-purple-200 dark:border-purple-800'
                            : fytr.rank === 'Halfmoon'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                              : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800'
                        } border-2 border-white dark:border-gray-700`}>
                          <img
                            src={`/images/${fytr.rank.toLowerCase()}.png`}
                            alt={fytr.rank}
                            className="w-3 h-3"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/fighterfish.png";
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="font-medium text-gray-900 dark:text-white text-lg">{fytr.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                          {fytr.domain === 'UI/UX Design' && <FaPaintBrush className="mr-1 text-purple-500 dark:text-purple-400" />}
                          {fytr.domain === 'Development' && <FaCode className="mr-1 text-green-500 dark:text-green-400" />}
                          {fytr.domain === 'Writing' && <FaPen className="mr-1 text-yellow-500 dark:text-yellow-400" />}
                          {fytr.domain === 'Marketing' && <FaBullhorn className="mr-1 text-red-500 dark:text-red-400" />}
                          {fytr.domain === 'Video Editing' && <FaVideo className="mr-1 text-teal-500 dark:text-teal-400" />}
                          {fytr.domain}
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex-shrink-0 flex items-center space-x-6">
                      <div className="text-center">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Tasks</div>
                        <div className="font-bold text-gray-900 dark:text-white">{fytr.tasksWon}</div>
                      </div>

                      <div className="text-center">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Rating</div>
                        <div className="font-bold text-gray-900 dark:text-white flex items-center justify-center">
                          <FaStar className="text-yellow-400 mr-1 text-sm" />
                          {fytr.rating}
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Rank</div>
                        <div className="font-medium">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                            {fytr.rank}
                          </span>
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Change</div>
                        <div className="font-medium">
                          {fytr.change > 0 ? (
                            <div className="flex items-center text-green-600 dark:text-green-400">
                              <FaArrowUp className="mr-1" />
                              <span>{fytr.change}</span>
                            </div>
                          ) : fytr.change < 0 ? (
                            <div className="flex items-center text-red-600 dark:text-red-400">
                              <FaArrowDown className="mr-1" />
                              <span>{Math.abs(fytr.change)}</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-gray-500 dark:text-gray-400">
                              <span>-</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Pagination */}
              <div className="flex justify-center mt-6">
                <nav className="flex items-center space-x-2">
                  <button className="px-3 py-1 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <FaChevronLeft className="text-xs" />
                  </button>
                  <button className="px-3 py-1 rounded-md bg-blue-600 text-white">1</button>
                  <button className="px-3 py-1 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">2</button>
                  <button className="px-3 py-1 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">3</button>
                  <span className="text-gray-500 dark:text-gray-400">...</span>
                  <button className="px-3 py-1 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">10</button>
                  <button className="px-3 py-1 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <FaChevronRight className="text-xs" />
                  </button>
                </nav>
              </div>
            </div>

            {/* Fytr of the Month */}
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/10 dark:to-amber-900/10 rounded-xl shadow-md overflow-hidden mb-6 border border-yellow-200 dark:border-yellow-800 relative">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200 dark:bg-yellow-800/20 rounded-full -mt-10 -mr-10 opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-200 dark:bg-amber-800/20 rounded-full -mb-8 -ml-8 opacity-50"></div>

              {/* Golden shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-300/0 via-yellow-300/10 to-yellow-300/0 pointer-events-none"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
              ></motion.div>

              <div className="p-6 border-b border-yellow-200 dark:border-yellow-800">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center mr-3 shadow-md">
                    <FaCrown className="text-white text-lg" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Fytr of the Month</h3>
                </div>
              </div>

              <div className="p-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="relative">
                    <div className="w-36 h-36 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 p-1 shadow-lg">
                      <img
                        src={rankData.fytrOfMonth.avatar}
                        alt={rankData.fytrOfMonth.name}
                        className="w-full h-full rounded-full object-cover border-2 border-white dark:border-gray-800"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/fighterfish.png";
                        }}
                      />
                    </div>
                    <motion.div
                      className="absolute -top-3 -right-3 bg-yellow-500 text-white rounded-full w-12 h-12 flex items-center justify-center border-2 border-white dark:border-gray-800 shadow-md"
                      animate={{
                        rotate: [0, 10, 0, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                    >
                      <FaCrown className="text-white text-lg" />
                    </motion.div>

                    {/* Pulse effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 0, 0.7]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                      style={{
                        background: 'radial-gradient(circle, rgba(234,179,8,0.3) 0%, rgba(234,179,8,0) 70%)'
                      }}
                    />

                    {/* Stats badges */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                      <div className="px-2 py-1 bg-white dark:bg-gray-800 rounded-full text-xs text-gray-700 dark:text-gray-300 shadow-sm flex items-center">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span>5.0</span>
                      </div>
                      <div className="px-2 py-1 bg-white dark:bg-gray-800 rounded-full text-xs text-gray-700 dark:text-gray-300 shadow-sm flex items-center">
                        <FaTrophy className="text-blue-500 mr-1" />
                        <span>{rankData.fytrOfMonth.tasksWon}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
                      <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{rankData.fytrOfMonth.name}</h4>
                      <div className="flex items-center justify-center md:justify-start">
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full text-sm inline-block md:ml-2">
                          {rankData.fytrOfMonth.rank}
                        </span>
                        <div className="ml-2 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 rounded-full text-sm inline-flex items-center">
                          <FaTrophy className="mr-1" /> Top Performer
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                      <div className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-sm text-gray-700 dark:text-gray-300 shadow-sm">
                        <span className="font-medium">{rankData.fytrOfMonth.domain}</span>
                      </div>
                      <div className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-sm text-gray-700 dark:text-gray-300 shadow-sm">
                        <span className="font-medium">{rankData.fytrOfMonth.tasksWon} tasks</span> this month
                      </div>
                      <div className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-sm text-gray-700 dark:text-gray-300 shadow-sm flex items-center">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span className="font-medium">5.0</span> rating
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-yellow-100 dark:border-yellow-800 shadow-sm">
                      <h5 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                        Client Praise
                      </h5>
                      <p className="text-gray-700 dark:text-gray-300 italic">
                        "{rankData.fytrOfMonth.clientPraise}"
                      </p>
                    </div>

                    <div className="mt-4 flex justify-center md:justify-start">
                      <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center">
                        <span>View Profile</span>
                        <FaArrowRight className="ml-2" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Achievement Highlights */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-yellow-100 dark:border-yellow-800 shadow-sm">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-2">
                        <FaCheck className="text-green-600 dark:text-green-400" />
                      </div>
                      <h5 className="font-medium text-gray-900 dark:text-white">Perfect Completion</h5>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Completed all tasks on time with 100% client satisfaction
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-yellow-100 dark:border-yellow-800 shadow-sm">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-2">
                        <FaAward className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <h5 className="font-medium text-gray-900 dark:text-white">Top Rated</h5>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Maintained a perfect 5.0 rating across all projects
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-yellow-100 dark:border-yellow-800 shadow-sm">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-2">
                        <FaGraduationCap className="text-purple-600 dark:text-purple-400" />
                      </div>
                      <h5 className="font-medium text-gray-900 dark:text-white">Skill Development</h5>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Completed 3 advanced courses to enhance expertise
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rank Dashboard Tab Content */}
        {activeTab === 'rank' && (
          <div>
            {/* XP Progress Bar */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">XP Progress</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {rankData.currentXP} / {rankData.nextRankXP} XP
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${(rankData.currentXP / rankData.nextRankXP) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {rankData.nextRankXP - rankData.currentXP} XP to reach {rankData.nextRank}
              </p>
            </div>

            {/* Rank Journey Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6 overflow-hidden">
              <button
                className="w-full p-6 text-left flex items-center justify-between focus:outline-none"
                onClick={() => toggleSection('rankJourney')}
              >
                <div className="flex items-center">
                  <FaChartLine className="text-blue-600 dark:text-blue-400 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Show My Rank Journey</h3>
                </div>
                {openSection === 'rankJourney' ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}
              </button>

              {openSection === 'rankJourney' && (
                <div className="p-6 pt-0 border-t border-gray-200 dark:border-gray-700">
                  {/* Rank Roadmap */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Rank Roadmap</h4>
                    <div className="relative py-6">
                      {/* Progress Bar */}
                      <div className="absolute left-0 right-0 top-1/2 h-2 bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 dark:from-green-900/30 dark:via-blue-900/30 dark:to-purple-900/30 rounded-full -translate-y-1/2 z-0"></div>

                      {/* Completed Progress */}
                      <div className="absolute left-0 w-[30%] top-1/2 h-2 bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-600 dark:to-blue-600 rounded-full -translate-y-1/2 z-1"></div>

                      <div className="flex items-center justify-between relative">
                        {/* Veiltail - Completed */}
                        <motion.div
                          className="relative z-10 flex flex-col items-center"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="relative">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 border-4 border-white dark:border-gray-800 flex items-center justify-center mb-2 shadow-lg">
                              <motion.img
                                src="/images/veiltail.png"
                                alt="Veiltail"
                                className="w-8 h-8"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "/fighterfish.png";
                                }}
                                animate={{
                                  scale: [1, 1.05, 1],
                                  rotate: [0, 2, 0, -2, 0]
                                }}
                                transition={{
                                  duration: 3,
                                  repeat: Infinity,
                                  repeatType: "loop"
                                }}
                              />
                            </div>
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center border-2 border-green-500 dark:border-green-400">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-500 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                          <div className="text-center">
                            <span className="text-sm font-medium text-green-600 dark:text-green-400">Veiltail</span>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Completed</div>
                          </div>
                        </motion.div>

                        {/* Crowntail (Current) */}
                        <motion.div
                          className="relative z-10 flex flex-col items-center"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                        >
                          <div className="relative">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 border-4 border-white dark:border-gray-800 flex items-center justify-center mb-2 shadow-lg">
                              <motion.div
                                className="absolute inset-0 rounded-full bg-blue-400/20 dark:bg-blue-600/30"
                                animate={{
                                  scale: [1, 1.2, 1],
                                  opacity: [0.5, 0.2, 0.5]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  repeatType: "loop"
                                }}
                              />
                              <motion.img
                                src="/images/crowntail.png"
                                alt="Crowntail"
                                className="w-10 h-10"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "/fighterfish.png";
                                }}
                                animate={{
                                  scale: [1, 1.1, 1],
                                  rotate: [0, 3, 0, -3, 0]
                                }}
                                transition={{
                                  duration: 3,
                                  repeat: Infinity,
                                  repeatType: "loop"
                                }}
                              />
                            </div>
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center border-2 border-blue-500 dark:border-blue-400">
                              <FaStar className="h-3 w-3 text-blue-500 dark:text-blue-400" />
                            </div>
                          </div>
                          <div className="text-center">
                            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">Crowntail</span>
                            <div className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 px-2 py-0.5 rounded-full mt-1">Current</div>
                          </div>
                        </motion.div>

                        {/* Halfmoon */}
                        <motion.div
                          className="relative z-10 flex flex-col items-center"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-200 to-purple-300 dark:from-purple-900/40 dark:to-purple-900/60 border-4 border-white dark:border-gray-800 flex items-center justify-center mb-2 shadow-md">
                            <motion.img
                              src="/images/halfmoon.png"
                              alt="Halfmoon"
                              className="w-8 h-8 opacity-70 dark:opacity-60"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/fighterfish.png";
                              }}
                              animate={{
                                y: [0, -3, 0]
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatType: "loop"
                              }}
                            />
                          </div>
                          <div className="text-center">
                            <span className="text-sm font-medium text-purple-400 dark:text-purple-500">Halfmoon</span>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">380 XP needed</div>
                          </div>
                        </motion.div>

                        {/* Doubletail */}
                        <motion.div
                          className="relative z-10 flex flex-col items-center"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 border-4 border-white dark:border-gray-700 flex items-center justify-center mb-2">
                            <img
                              src="/images/doubletail.png"
                              alt="Doubletail"
                              className="w-8 h-8 opacity-50 dark:opacity-40"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/fighterfish.png";
                              }}
                            />
                          </div>
                          <div className="text-center">
                            <span className="text-sm font-medium text-gray-400 dark:text-gray-500">Doubletail</span>
                            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">Locked</div>
                          </div>
                        </motion.div>

                        {/* Rosetail */}
                        <motion.div
                          className="relative z-10 flex flex-col items-center"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                        >
                          <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 border-4 border-white dark:border-gray-700 flex items-center justify-center mb-2">
                            <img
                              src="/images/rosetail.png"
                              alt="Rosetail"
                              className="w-8 h-8 opacity-50 dark:opacity-40"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/fighterfish.png";
                              }}
                            />
                          </div>
                          <div className="text-center">
                            <span className="text-sm font-medium text-gray-400 dark:text-gray-500">Rosetail</span>
                            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">Locked</div>
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Rank Benefits Quick View */}
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                      <h5 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                        <FaArrowUp className="text-blue-600 dark:text-blue-400 mr-2" />
                        Next Rank Benefits
                      </h5>
                      <ul className="space-y-2">
                        <li className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                          <div className="text-purple-600 dark:text-purple-400 mr-2 mt-0.5">•</div>
                          <div>Higher visibility in search results</div>
                        </li>
                        <li className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                          <div className="text-purple-600 dark:text-purple-400 mr-2 mt-0.5">•</div>
                          <div>Access to premium projects</div>
                        </li>
                        <li className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                          <div className="text-purple-600 dark:text-purple-400 mr-2 mt-0.5">•</div>
                          <div>Reduced platform fees (15% → 12%)</div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Rank Journey Timeline</h4>
                    <div className="relative">
                      {/* Timeline line */}
                      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-green-500 to-purple-500 dark:from-blue-600 dark:via-green-600 dark:to-purple-600"></div>

                      <div className="space-y-6">
                        {rankData.rankHistory.map((item, index) => (
                          <motion.div
                            key={index}
                            className="flex"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          >
                            <div className="flex flex-col items-center mr-4 relative">
                              <motion.div
                                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md z-10 ${
                                  item.type === 'promotion'
                                    ? 'bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 text-white'
                                    : item.type === 'achievement'
                                      ? 'bg-gradient-to-br from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 text-white'
                                      : 'bg-gradient-to-br from-purple-400 to-purple-600 dark:from-purple-500 dark:to-purple-700 text-white'
                                }`}
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                              >
                                {item.type === 'promotion' ? <FaTrophy className="text-lg" /> :
                                 item.type === 'achievement' ? <FaStar className="text-lg" /> :
                                 <FaUsers className="text-lg" />}
                              </motion.div>

                              {/* Pulse effect for the first item */}
                              {index === 0 && (
                                <motion.div
                                  className="absolute inset-0 rounded-full"
                                  animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.7, 0, 0.7]
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: "loop"
                                  }}
                                  style={{
                                    background: item.type === 'promotion'
                                      ? 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(59,130,246,0) 70%)'
                                      : item.type === 'achievement'
                                        ? 'radial-gradient(circle, rgba(34,197,94,0.3) 0%, rgba(34,197,94,0) 70%)'
                                        : 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, rgba(168,85,247,0) 70%)'
                                  }}
                                />
                              )}
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex-1 hover:shadow-md transition-shadow duration-300">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="text-base font-medium text-gray-900 dark:text-white">{item.event}</div>
                                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.date}</div>
                                </div>
                                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  item.type === 'promotion'
                                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400'
                                    : item.type === 'achievement'
                                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                                      : 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400'
                                }`}>
                                  {item.type === 'promotion' ? 'Promotion' :
                                   item.type === 'achievement' ? 'Achievement' :
                                   'Milestone'}
                                </div>
                              </div>

                              {/* Additional content based on type */}
                              {item.type === 'promotion' && (
                                <div className="mt-3 flex items-center">
                                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-2">
                                    <img
                                      src={`/images/${item.event.toLowerCase().includes('crowntail') ? 'crowntail' : 'veiltail'}.png`}
                                      alt="Rank"
                                      className="w-5 h-5"
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/fighterfish.png";
                                      }}
                                    />
                                  </div>
                                  <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Unlocked new rank privileges and benefits
                                  </div>
                                </div>
                              )}

                              {item.type === 'achievement' && (
                                <div className="mt-3 flex items-center">
                                  <div className="text-yellow-500 mr-2">
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                  </div>
                                  <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Consistently high-quality work recognized
                                  </div>
                                </div>
                              )}

                              {item.type === 'join' && (
                                <div className="mt-3 flex items-center">
                                  <div className="text-purple-500 mr-2">
                                    <FaUsers />
                                  </div>
                                  <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Started your journey as a Fytr
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Future Milestones */}
                    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                      <h5 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                        <FaChartLine className="text-gray-600 dark:text-gray-400 mr-2" />
                        Future Milestones
                      </h5>
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3">
                          <img
                            src="/images/halfmoon.png"
                            alt="Halfmoon"
                            className="w-6 h-6"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/fighterfish.png";
                            }}
                          />
                        </div>
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                          <span className="font-medium">Next Goal:</span> Reach Halfmoon rank by completing 2 more high-rated tasks
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Weekly XP Graph */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Weekly XP Progress</h4>
                      <div className="flex space-x-2">
                        <button className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-md">Week</button>
                        <button className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Month</button>
                        <button className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Year</button>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Total XP This Week</div>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">800 XP</div>
                        </div>
                        <div className="flex items-center text-green-600 dark:text-green-400 text-sm font-medium">
                          <FaArrowUp className="mr-1" />
                          <span>23% from last week</span>
                        </div>
                      </div>

                      <div className="relative h-52">
                        {/* Grid lines */}
                        <div className="absolute left-0 right-0 top-0 h-px bg-gray-200 dark:bg-gray-700"></div>
                        <div className="absolute left-0 right-0 top-1/4 h-px bg-gray-200 dark:bg-gray-700"></div>
                        <div className="absolute left-0 right-0 top-2/4 h-px bg-gray-200 dark:bg-gray-700"></div>
                        <div className="absolute left-0 right-0 top-3/4 h-px bg-gray-200 dark:bg-gray-700"></div>
                        <div className="absolute left-0 right-0 bottom-0 h-px bg-gray-200 dark:bg-gray-700"></div>

                        {/* Y-axis labels */}
                        <div className="absolute -left-6 top-0 text-xs text-gray-500 dark:text-gray-400">200</div>
                        <div className="absolute -left-6 top-1/4 text-xs text-gray-500 dark:text-gray-400">150</div>
                        <div className="absolute -left-6 top-2/4 text-xs text-gray-500 dark:text-gray-400">100</div>
                        <div className="absolute -left-6 top-3/4 text-xs text-gray-500 dark:text-gray-400">50</div>
                        <div className="absolute -left-6 bottom-0 text-xs text-gray-500 dark:text-gray-400">0</div>

                        {/* Bars */}
                        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-6">
                          {[120, 80, 150, 90, 200, 60, 100].map((value, index) => (
                            <motion.div
                              key={index}
                              className="flex flex-col items-center group"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.05 }}
                            >
                              {/* Tooltip */}
                              <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 pointer-events-none">
                                  {value} XP
                                </div>
                              </div>

                              <motion.div
                                className={`w-10 rounded-t-md ${
                                  index === 4
                                    ? 'bg-gradient-to-t from-blue-500 to-blue-400 dark:from-blue-600 dark:to-blue-500'
                                    : 'bg-blue-400 dark:bg-blue-500'
                                } relative group overflow-hidden`}
                                initial={{ height: 0 }}
                                animate={{ height: `${(value / 200) * 100}%` }}
                                transition={{ duration: 0.7, delay: index * 0.05, ease: "easeOut" }}
                                whileHover={{ scale: 1.05 }}
                              >
                                {/* Highlight effect for highest value */}
                                {index === 4 && (
                                  <motion.div
                                    className="absolute inset-0 bg-white opacity-20"
                                    animate={{
                                      y: ['100%', '-100%']
                                    }}
                                    transition={{
                                      duration: 1.5,
                                      repeat: Infinity,
                                      repeatType: "loop"
                                    }}
                                  />
                                )}

                                {/* Star for highest value */}
                                {index === 4 && (
                                  <div className="absolute -top-3 -right-3 bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                                    <FaStar className="text-xs" />
                                  </div>
                                )}
                              </motion.div>

                              <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mt-2">
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 flex justify-between items-center">
                        <div className="text-xs text-gray-500 dark:text-gray-400">May 15 - May 21, 2023</div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-blue-400 dark:bg-blue-500 rounded-full mr-1"></div>
                          <span className="text-xs text-gray-600 dark:text-gray-400">XP Earned</span>
                        </div>
                      </div>
                    </div>

                    {/* XP Breakdown */}
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">XP Sources</div>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-600 dark:text-gray-400">Tasks Completed</span>
                              <span className="font-medium text-gray-900 dark:text-white">450 XP</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                              <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '56%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-600 dark:text-gray-400">High Ratings</span>
                              <span className="font-medium text-gray-900 dark:text-white">200 XP</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                              <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '25%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-600 dark:text-gray-400">Courses</span>
                              <span className="font-medium text-gray-900 dark:text-white">150 XP</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                              <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '19%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">XP Milestones</div>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-2">
                              <FaTrophy className="text-green-600 dark:text-green-400 text-sm" />
                            </div>
                            <div>
                              <div className="text-xs font-medium text-gray-900 dark:text-white">500 XP in a week</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Achieved on Friday</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-2">
                              <FaStar className="text-blue-600 dark:text-blue-400 text-sm" />
                            </div>
                            <div>
                              <div className="text-xs font-medium text-gray-900 dark:text-white">2,500 XP total</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Lifetime achievement</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Smart Tips */}
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                        </svg>
                      </div>
                      Smart Tips for Faster Progression
                    </h4>

                    <div className="space-y-3 mt-2">
                      <div className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0">1</div>
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                          <span className="font-medium">Complete 2 more tasks</span> in your domain with ratings above 4.5 stars to reach Halfmoon rank faster.
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0">2</div>
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                          <span className="font-medium">Enroll in a course</span> related to your domain to earn bonus XP and improve your skills simultaneously.
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0">3</div>
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                          <span className="font-medium">Maintain consistent activity</span> by completing at least one task per week to keep your momentum.
                        </div>
                      </div>
                    </div>

                    <button className="mt-4 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
                      <span>View Personalized Growth Plan</span>
                      <FaArrowRight className="ml-2" />
                    </button>
                  </div>
                </div>
              )}
            </div>



        {/* Achievements & Goals Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6 overflow-hidden">
          <button
            className="w-full p-6 text-left flex items-center justify-between focus:outline-none"
            onClick={() => toggleSection('achievements')}
          >
            <div className="flex items-center">
              <FaAward className="text-purple-600 dark:text-purple-400 mr-3" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">My Achievements & Goals</h3>
            </div>
            {openSection === 'achievements' ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}
          </button>

          {openSection === 'achievements' && (
            <div className="p-6 pt-0 border-t border-gray-200 dark:border-gray-700">
              {/* Badges Grid */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Badges Unlocked</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {rankData.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        achievement.unlocked
                          ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                          : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-700 opacity-50'
                      } text-center`}
                    >
                      <div className="text-3xl mb-2">{achievement.icon}</div>
                      <div className={`text-sm font-medium ${
                        achievement.unlocked
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {achievement.name}
                      </div>
                      {!achievement.unlocked && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Locked</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* XP Progress & Goal Tracker */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">XP Progress & Goals</h4>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">XP to Next Rank</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {rankData.currentXP} / {rankData.nextRankXP} XP
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mb-4">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${(rankData.currentXP / rankData.nextRankXP) * 100}%` }}
                    ></div>
                  </div>

                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">Suggested Missions</h5>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <div className="w-5 h-5 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center mr-2">
                        <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                      </div>
                      Complete a task in under 48h (+50 XP)
                    </li>
                    <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <div className="w-5 h-5 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center mr-2">
                        <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                      </div>
                      Get rated 4.5+ this week (+75 XP)
                    </li>
                  </ul>

                  <h5 className="font-medium text-gray-900 dark:text-white mt-4 mb-2">Optional Boosts</h5>
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FaGraduationCap className="text-blue-600 dark:text-blue-400 mr-2" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Enroll in a course</span>
                      </div>
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">+100 XP</span>
                    </div>
                  </div>
                </div>
              </div>
                </div>
              )}
            </div>

            {/* Rank History & Notifications Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6 overflow-hidden">
              <button
                className="w-full p-6 text-left flex items-center justify-between focus:outline-none"
                onClick={() => toggleSection('history')}
              >
                <div className="flex items-center">
                  <FaHistory className="text-green-600 dark:text-green-400 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Rank History & Notifications</h3>
                </div>
                {openSection === 'history' ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}
              </button>

              {openSection === 'history' && (
                <div className="p-6 pt-0 border-t border-gray-200 dark:border-gray-700">
                  {/* Rank Change Timeline */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Rank Change Timeline</h4>
                <div className="space-y-4">
                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                        <FaTrophy />
                      </div>
                      <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 my-1"></div>
                    </div>
                    <div className="pb-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Promoted to Crowntail</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Apr 2023</div>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center">
                        <FaStar />
                      </div>
                      <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 my-1"></div>
                    </div>
                    <div className="pb-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Completed 5 tasks with 4.5+ rating</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Feb 2023</div>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                        <FaUsers />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Joined as Veiltail</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Jan 2023</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Smart Alerts */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Smart Alerts</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800 flex items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-3 flex-shrink-0">
                      <FaBell />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">You're 2 tasks away from Halfmoon!</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Complete 2 more tasks with 4.5+ rating to advance.</div>
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800 flex items-start">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mr-3 flex-shrink-0">
                      <FaBell />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Congrats! You just earned +30 XP bonus</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">For completing your last task ahead of schedule.</div>
                    </div>
                  </div>
                </div>
              </div>
                </div>
              )}
            </div>

            {/* Footer Section - Motivation CTA */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md p-6 text-white text-center">
              <h3 className="text-xl font-bold mb-4">🔥 Want to level up faster?</h3>
              <p className="mb-6">Explore available missions or boost your skills with a course!</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-bold shadow-lg hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2">
                  <span>View Missions</span>
                  <FaArrowRight />
                </button>
                <button className="px-6 py-3 bg-blue-700 text-white rounded-lg font-bold shadow-lg hover:bg-blue-800 transition-all duration-300 flex items-center justify-center gap-2">
                  <span>Go to Courses</span>
                  <FaGraduationCap />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
