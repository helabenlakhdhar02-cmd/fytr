'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaFilter, FaThLarge, FaThList, FaClock, FaTag } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

// Mock data for projects
const mockProjects = [
  {
    id: 1,
    title: 'Modern E-commerce Website',
    thumbnail: '/photos/projects/project1.jpg',
    fytrName: 'Alex Morgan',
    fytrAvatar: '/photos/Topfreelancers/freelancer1.PNG',
    fytrRank: 'halfmoon',
    category: 'Web Development',
    deliveryTime: '3 Days',
    rating: 4.9,
  },
  {
    id: 2,
    title: 'Mobile App UI Design',
    thumbnail: '/photos/projects/project2.jpg',
    fytrName: 'Sophia Chen',
    fytrAvatar: '/photos/Topfreelancers/freelancer 2.PNG',
    fytrRank: 'crowntail',
    category: 'UI/UX Design',
    deliveryTime: '5 Days',
    rating: 4.8,
  },
  {
    id: 3,
    title: 'Brand Identity Package',
    thumbnail: '/photos/projects/project3.jpg',
    fytrName: 'Marcus Johnson',
    fytrAvatar: '/photos/Topfreelancers/freelancer3.PNG',
    fytrRank: 'veiltail',
    category: 'Graphic Design',
    deliveryTime: '7 Days',
    rating: 4.7,
  },
  {
    id: 4,
    title: 'Social Media Marketing Campaign',
    thumbnail: '/photos/projects/project4.jpg',
    fytrName: 'Emma Wilson',
    fytrAvatar: '/photos/Academy/student1.jpg',
    fytrRank: 'halfmoon',
    category: 'Digital Marketing',
    deliveryTime: '10 Days',
    rating: 4.9,
  },
  {
    id: 5,
    title: 'Custom WordPress Theme',
    thumbnail: '/photos/projects/project5.jpg',
    fytrName: 'David Kim',
    fytrAvatar: '/photos/Academy/student2.jpeg',
    fytrRank: 'crowntail',
    category: 'Web Development',
    deliveryTime: '6 Days',
    rating: 4.6,
  },
  {
    id: 6,
    title: 'Product Photography',
    thumbnail: '/photos/projects/project6.jpg',
    fytrName: 'Jennifer Lopez',
    fytrAvatar: '/photos/Academy/student3.png',
    fytrRank: 'veiltail',
    category: 'Photography',
    deliveryTime: '2 Days',
    rating: 4.8,
  }
];

export default function ProjectGallery() {
  const { openRegisterModal } = useAuth();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [activeFilter, setActiveFilter] = useState('all');

  // Fetch projects data
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setProjects(mockProjects);
      setFilteredProjects(mockProjects);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter projects
  const filterProjects = (filter) => {
    setActiveFilter(filter);

    if (filter === 'all') {
      setFilteredProjects(projects);
      return;
    }

    // Filter by category
    const filtered = projects.filter(project => {
      if (filter === 'web') return project.category.toLowerCase().includes('web');
      if (filter === 'design') return project.category.toLowerCase().includes('design');
      if (filter === 'marketing') return project.category.toLowerCase().includes('marketing');
      if (filter === 'halfmoon') return project.fytrRank === 'halfmoon';
      if (filter === 'crowntail') return project.fytrRank === 'crowntail';
      if (filter === 'veiltail') return project.fytrRank === 'veiltail';
      return true;
    });

    setFilteredProjects(filtered);
  };

  // Render star rating
  const renderStarRating = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`${
              i < Math.floor(rating)
                ? "text-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            } w-3 h-3`}
          />
        ))}
        <span className="ml-1 text-xs text-gray-600 dark:text-gray-400">{rating}</span>
      </div>
    );
  };

  // Get rank badge
  const getRankBadge = (rank) => {
    const rankMap = {
      veiltail: {
        name: 'Veiltail',
        color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        image: '/images/veiltail.png'
      },
      crowntail: {
        name: 'Crowntail',
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
        image: '/images/crowntail.png'
      },
      halfmoon: {
        name: 'Halfmoon',
        color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
        image: '/images/halfmoon.png'
      }
    };

    return rankMap[rank] || rankMap.veiltail;
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-900 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-blue-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 px-6 md:px-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Delivered <span className="text-primary-600 dark:text-primary-400">Services</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              Browse through our showcase of completed services. Each one represents the quality and creativity our Fytrs bring to their work.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${
                viewMode === 'grid'
                  ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
              }`}
              aria-label="Grid view"
            >
              <FaThLarge />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${
                viewMode === 'list'
                  ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
              }`}
              aria-label="List view"
            >
              <FaThList />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => filterProjects('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            All Services
          </button>
          <button
            onClick={() => filterProjects('web')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === 'web'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Web Development
          </button>
          <button
            onClick={() => filterProjects('design')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === 'design'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Design
          </button>
          <button
            onClick={() => filterProjects('marketing')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === 'marketing'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Marketing
          </button>
          <button
            onClick={() => filterProjects('halfmoon')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === 'halfmoon'
                ? 'bg-purple-600 text-white'
                : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50'
            }`}
          >
            Halfmoon Rank
          </button>
          <button
            onClick={() => filterProjects('crowntail')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === 'crowntail'
                ? 'bg-blue-600 text-white'
                : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50'
            }`}
          >
            Crowntail Rank
          </button>
          <button
            onClick={() => filterProjects('veiltail')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === 'veiltail'
                ? 'bg-green-600 text-white'
                : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50'
            }`}
          >
            Veiltail Rank
          </button>
        </div>

        {/* Projects Grid/List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {viewMode === 'grid' ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative">
                      <img
                        src={project.thumbnail || '/fighterfish.png'}
                        alt={project.title}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/fighterfish.png';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <button
                          onClick={openRegisterModal}
                          className="m-4 px-4 py-2 bg-white text-primary-600 rounded-lg text-sm font-medium hover:bg-primary-50 transition-colors duration-300"
                        >
                          View Service Details
                        </button>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                        {project.title}
                      </h3>

                      <div className="flex items-center mb-3">
                        <img
                          src={project.fytrAvatar || '/fighterfish.png'}
                          alt={project.fytrName}
                          className="w-8 h-8 rounded-full object-cover mr-2 border border-gray-200 dark:border-gray-700"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/fighterfish.png';
                          }}
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {project.fytrName}
                          </p>
                          {renderStarRating(project.rating)}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {/* Rank Badge */}
                        <div className="flex items-center">
                          {project.fytrRank && (
                            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getRankBadge(project.fytrRank).color}`}>
                              <img
                                src={getRankBadge(project.fytrRank).image}
                                alt={getRankBadge(project.fytrRank).name}
                                className="w-3 h-3 object-contain"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = '/fighterfish.png';
                                }}
                              />
                              <span>{getRankBadge(project.fytrRank).name}</span>
                            </div>
                          )}
                        </div>

                        {/* Category */}
                        <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                          <FaTag className="w-3 h-3" />
                          <span>{project.category}</span>
                        </div>

                        {/* Delivery Time */}
                        <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                          <FaClock className="w-3 h-3" />
                          <span>{project.deliveryTime}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row group"
                    variants={itemVariants}
                    whileHover={{ y: -3 }}
                  >
                    <div className="relative md:w-1/3">
                      <img
                        src={project.thumbnail || '/fighterfish.png'}
                        alt={project.title}
                        className="w-full h-48 md:h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/fighterfish.png';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <button
                          onClick={openRegisterModal}
                          className="m-4 px-4 py-2 bg-white text-primary-600 rounded-lg text-sm font-medium hover:bg-primary-50 transition-colors duration-300"
                        >
                          View Service Details
                        </button>
                      </div>
                    </div>

                    <div className="p-6 md:w-2/3">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {project.title}
                      </h3>

                      <div className="flex items-center mb-4">
                        <img
                          src={project.fytrAvatar || '/fighterfish.png'}
                          alt={project.fytrName}
                          className="w-10 h-10 rounded-full object-cover mr-3 border border-gray-200 dark:border-gray-700"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/fighterfish.png';
                          }}
                        />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {project.fytrName}
                          </p>
                          {renderStarRating(project.rating)}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {/* Rank Badge */}
                        <div className="flex items-center">
                          {project.fytrRank && (
                            <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getRankBadge(project.fytrRank).color}`}>
                              <img
                                src={getRankBadge(project.fytrRank).image}
                                alt={getRankBadge(project.fytrRank).name}
                                className="w-4 h-4 object-contain"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = '/fighterfish.png';
                                }}
                              />
                              <span>{getRankBadge(project.fytrRank).name}</span>
                            </div>
                          )}
                        </div>

                        {/* Category */}
                        <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                          <FaTag className="w-3 h-3" />
                          <span>{project.category}</span>
                        </div>

                        {/* Delivery Time */}
                        <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                          <FaClock className="w-3 h-3" />
                          <span>{project.deliveryTime}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
