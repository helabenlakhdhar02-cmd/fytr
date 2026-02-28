'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaTrophy, FaChartLine, FaArrowUp, FaArrowDown, FaEquals, FaFilter } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

// Mock data for leaderboard
const mockLeaderboardData = [
  {
    id: 1,
    name: 'Alex Morgan',
    avatar: '/photos/Topfreelancers/freelancer1.PNG',
    rank: 'halfmoon',
    score: 98,
    rating: 4.9,
    location: 'New York, USA',
    change: '+12%',
    position: 'up',
    activity: [80, 85, 90, 88, 95, 98],
    categories: ['Web Development', 'UI/UX Design']
  },
  {
    id: 2,
    name: 'Sophia Chen',
    avatar: '/photos/Topfreelancers/freelancer 2.PNG',
    rank: 'halfmoon',
    score: 96,
    rating: 4.8,
    location: 'San Francisco, USA',
    change: '+8%',
    position: 'up',
    activity: [75, 80, 85, 90, 92, 96],
    categories: ['Mobile Development', 'React Native']
  },
  {
    id: 3,
    name: 'Marcus Johnson',
    avatar: '/photos/Topfreelancers/freelancer3.PNG',
    rank: 'halfmoon',
    score: 94,
    rating: 4.9,
    location: 'London, UK',
    change: '+5%',
    position: 'same',
    activity: [85, 88, 90, 92, 94, 94],
    categories: ['Graphic Design', 'Branding']
  },
  {
    id: 4,
    name: 'Emma Wilson',
    avatar: '/photos/Academy/student1.jpg',
    rank: 'crowntail',
    score: 92,
    rating: 4.7,
    location: 'Toronto, Canada',
    change: '+15%',
    position: 'up',
    activity: [70, 75, 80, 85, 90, 92],
    categories: ['Content Writing', 'SEO']
  },
  {
    id: 5,
    name: 'David Kim',
    avatar: '/photos/Academy/student2.jpeg',
    rank: 'crowntail',
    score: 90,
    rating: 4.8,
    location: 'Seoul, South Korea',
    change: '-2%',
    position: 'down',
    activity: [92, 94, 93, 91, 90, 90],
    categories: ['Video Editing', 'Animation']
  },
  {
    id: 6,
    name: 'Jennifer Lopez',
    avatar: '/photos/Academy/student3.png',
    rank: 'crowntail',
    score: 88,
    rating: 4.6,
    location: 'Miami, USA',
    change: '+10%',
    position: 'up',
    activity: [75, 78, 80, 82, 85, 88],
    categories: ['Digital Marketing', 'Social Media']
  },
  {
    id: 7,
    name: 'Michael Brown',
    avatar: '/fighterfish.png',
    rank: 'veiltail',
    score: 85,
    rating: 4.5,
    location: 'Chicago, USA',
    change: '+20%',
    position: 'up',
    activity: [60, 65, 70, 75, 80, 85],
    categories: ['WordPress', 'PHP']
  },
  {
    id: 8,
    name: 'Sarah Jones',
    avatar: '/photos/Academy/student1.jpg',
    rank: 'veiltail',
    score: 82,
    rating: 4.4,
    location: 'Sydney, Australia',
    change: '+7%',
    position: 'up',
    activity: [70, 72, 75, 78, 80, 82],
    categories: ['Content Writing', 'Copywriting']
  },
  {
    id: 9,
    name: 'Robert Williams',
    avatar: '/photos/Academy/student2.jpeg',
    rank: 'veiltail',
    score: 80,
    rating: 4.3,
    location: 'Berlin, Germany',
    change: '-3%',
    position: 'down',
    activity: [82, 84, 83, 81, 80, 80],
    categories: ['Video Editing', 'Motion Graphics']
  }
];

export default function Leaderboard() {
  const { openRegisterModal } = useAuth();
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeRank, setActiveRank] = useState('all');
  const [timeframe, setTimeframe] = useState('month');
  const [showFilters, setShowFilters] = useState(false);

  // Filter leaderboard data
  const getFilteredData = () => {
    let filtered = [...mockLeaderboardData];

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(fytr =>
        fytr.categories.some(cat =>
          cat.toLowerCase().includes(activeCategory.toLowerCase())
        )
      );
    }

    // Filter by rank
    if (activeRank !== 'all') {
      filtered = filtered.filter(fytr => fytr.rank === activeRank);
    }

    return filtered;
  };

  const filteredData = getFilteredData();

  // Get rank badge
  const getRankBadge = (rank) => {
    const rankMap = {
      veiltail: {
        name: 'Veiltail',
        color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        borderColor: 'border-green-200 dark:border-green-800',
        image: '/images/veiltail.png'
      },
      crowntail: {
        name: 'Crowntail',
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
        borderColor: 'border-blue-200 dark:border-blue-800',
        image: '/images/crowntail.png'
      },
      halfmoon: {
        name: 'Halfmoon',
        color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
        borderColor: 'border-purple-200 dark:border-purple-800',
        image: '/images/halfmoon.png'
      }
    };

    return rankMap[rank] || rankMap.veiltail;
  };

  // Render position change indicator
  const renderPositionChange = (change, position) => {
    const isPositive = !change.includes('-');

    if (position === 'up') {
      return (
        <div className="flex items-center text-green-600 dark:text-green-400">
          <FaArrowUp className="mr-1 w-3 h-3" />
          <span className="text-xs font-medium">{change}</span>
        </div>
      );
    } else if (position === 'down') {
      return (
        <div className="flex items-center text-red-600 dark:text-red-400">
          <FaArrowDown className="mr-1 w-3 h-3" />
          <span className="text-xs font-medium">{change}</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <FaEquals className="mr-1 w-3 h-3" />
          <span className="text-xs font-medium">{change}</span>
        </div>
      );
    }
  };

  // Render activity chart
  const renderActivityChart = (activity) => {
    const max = Math.max(...activity);
    const min = Math.min(...activity);
    const range = max - min;

    const normalizeValue = (value) => {
      return ((value - min) / (range || 1)) * 20;
    };

    return (
      <div className="flex items-end h-6 gap-[2px]">
        {activity.map((value, index) => (
          <div
            key={index}
            className={`w-1 ${
              index === activity.length - 1
                ? 'bg-blue-500 dark:bg-blue-400'
                : 'bg-gray-300 dark:bg-gray-600'
            } rounded-sm`}
            style={{ height: `${normalizeValue(value) + 4}px` }}
          ></div>
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
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section className="py-16 px-6 md:px-16 bg-gray-100 dark:bg-gray-900 relative overflow-hidden light-pattern">
      {/* Background decorative elements */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary-100 dark:bg-primary-900/20 rounded-full filter blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-secondary-100 dark:bg-secondary-900/20 rounded-full filter blur-3xl opacity-60 animate-pulse"></div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Fytr <span className="text-primary-600 dark:text-primary-400">Leaderboard</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              Our top-performing Fytrs ranked by project quality, on-time delivery, and client reviews.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              <FaFilter className="w-4 h-4" />
              <span>Filters</span>
            </button>

            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="month">This Month</option>
              <option value="alltime">All Time</option>
            </select>
          </div>
        </div>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8 overflow-hidden"
            >
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                      Filter by Category
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setActiveCategory('all')}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
                          activeCategory === 'all'
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                        }`}
                      >
                        All Categories
                      </button>
                      <button
                        onClick={() => setActiveCategory('design')}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
                          activeCategory === 'design'
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                        }`}
                      >
                        Design
                      </button>
                      <button
                        onClick={() => setActiveCategory('development')}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
                          activeCategory === 'development'
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                        }`}
                      >
                        Development
                      </button>
                      <button
                        onClick={() => setActiveCategory('writing')}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
                          activeCategory === 'writing'
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                        }`}
                      >
                        Writing
                      </button>
                      <button
                        onClick={() => setActiveCategory('marketing')}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
                          activeCategory === 'marketing'
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                        }`}
                      >
                        Marketing
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                      Filter by Rank
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setActiveRank('all')}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
                          activeRank === 'all'
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                        }`}
                      >
                        All Ranks
                      </button>
                      <button
                        onClick={() => setActiveRank('halfmoon')}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
                          activeRank === 'halfmoon'
                            ? 'bg-purple-600 text-white'
                            : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50'
                        }`}
                      >
                        Halfmoon
                      </button>
                      <button
                        onClick={() => setActiveRank('crowntail')}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
                          activeRank === 'crowntail'
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50'
                        }`}
                      >
                        Crowntail
                      </button>
                      <button
                        onClick={() => setActiveRank('veiltail')}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
                          activeRank === 'veiltail'
                            ? 'bg-green-600 text-white'
                            : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50'
                        }`}
                      >
                        Veiltail
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Leaderboard */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 border-b border-gray-200 dark:border-gray-600 grid grid-cols-12 gap-4 items-center">
            <div className="col-span-1 text-center font-medium text-gray-700 dark:text-gray-300">#</div>
            <div className="col-span-5 font-medium text-gray-700 dark:text-gray-300">Fytr</div>
            <div className="col-span-2 text-center font-medium text-gray-700 dark:text-gray-300">Score</div>
            <div className="col-span-2 text-center font-medium text-gray-700 dark:text-gray-300">Rating</div>
            <div className="col-span-2 text-center font-medium text-gray-700 dark:text-gray-300">Activity</div>
          </div>

          {/* Fytr Rows */}
          {filteredData.map((fytr, index) => {
            const rankBadge = getRankBadge(fytr.rank);
            const isTopThree = index < 3;

            return (
              <motion.div
                key={fytr.id}
                className={`p-4 border-b border-gray-200 dark:border-gray-700 grid grid-cols-12 gap-4 items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300 ${
                  isTopThree ? 'relative overflow-hidden' : ''
                }`}
                variants={itemVariants}
              >
                {/* Golden shimmer for top 3 */}
                {isTopThree && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-yellow-300/0 via-yellow-300/20 to-yellow-300/0 pointer-events-none"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                      delay: index * 0.5
                    }}
                  ></motion.div>
                )}

                {/* Rank Number */}
                <div className="col-span-1 text-center">
                  {index < 3 ? (
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto ${
                      index === 0
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : index === 1
                          ? 'bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-300'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                    }`}>
                      <FaTrophy className={`${
                        index === 0
                          ? 'text-yellow-500'
                          : index === 1
                            ? 'text-gray-500'
                            : 'text-amber-500'
                      }`} />
                    </div>
                  ) : (
                    <div className="text-lg font-bold text-gray-700 dark:text-gray-300">{index + 1}</div>
                  )}
                </div>

                {/* Fytr Info */}
                <div className="col-span-5 flex items-center">
                  <div className="relative">
                    <img
                      src={fytr.avatar}
                      alt={fytr.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/fighterfish.png";
                      }}
                    />
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${rankBadge.color} border border-white dark:border-gray-700`}>
                      <img
                        src={rankBadge.image}
                        alt={rankBadge.name}
                        className="w-3 h-3"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/fighterfish.png";
                        }}
                      />
                    </div>
                  </div>

                  <div className="ml-3">
                    <div className="font-medium text-gray-900 dark:text-white">{fytr.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{fytr.location}</div>
                  </div>
                </div>

                {/* Score */}
                <div className="col-span-2 text-center">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{fytr.score}</div>
                  {renderPositionChange(fytr.change, fytr.position)}
                </div>

                {/* Rating */}
                <div className="col-span-2 text-center">
                  <div className="flex items-center justify-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="font-medium text-gray-900 dark:text-white">{fytr.rating}</span>
                  </div>
                </div>

                {/* Activity */}
                <div className="col-span-2 flex justify-center">
                  {renderActivityChart(fytr.activity)}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View More Button */}
        <div className="mt-8 text-center">
          <motion.button
            onClick={openRegisterModal}
            className="px-6 py-3 bg-white text-primary-600 border border-primary-600 rounded-lg shadow-sm hover:bg-primary-50 transition-colors duration-300 font-medium"
            whileHover={{ y: -3 }}
            whileTap={{ y: 0 }}
          >
            Sign Up to View Full Leaderboard
          </motion.button>
        </div>
      </div>
    </section>
  );
}
