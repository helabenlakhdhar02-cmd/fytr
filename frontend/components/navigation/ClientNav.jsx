'use client';

import { FaHome, FaUser, FaBriefcase, FaUsers, FaLayerGroup, FaThLarge, FaColumns, FaHistory } from 'react-icons/fa';
import { FiSun, FiMoon } from 'react-icons/fi';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export default function ClientNav({ activeProjects = 0, pendingSubmissions = 0 }) {
  // Get theme context
  const { theme, toggleTheme } = useTheme();

  // Calculate total notifications
  const totalNotifications = activeProjects + pendingSubmissions;

  // Common link style
  const linkStyle = "nav-link flex items-center gap-1.5 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors px-2 py-1 text-sm hover:scale-105 transition-transform duration-200";
  const iconStyle = "text-primary-600 text-lg";

  return (
    <div className="hidden md:flex items-center w-full">
      {/* Centered layout with theme toggle in the absolute center */}
      <div className="flex items-center justify-center w-full relative">
        {/* Left Side Links - Exactly 3 items */}
        <div className="flex items-center space-x-12 absolute left-0">
          <Link href="/dashboard/home" className={`${linkStyle} relative`}>
            <FaHome className={iconStyle} /> <span>Home</span>
            {totalNotifications > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalNotifications}
              </span>
            )}
          </Link>

          <Link href="/fytrs" className={linkStyle}>
            <FaUsers className={iconStyle} /> <span>Fytrs</span>
          </Link>

          <Link href="/payment/history" className={linkStyle}>
            <FaHistory className={iconStyle} /> <span>Payments</span>
          </Link>
        </div>

        {/* Center - Theme Toggle - Absolutely centered */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <motion.button
            onClick={toggleTheme}
            whileTap={{ scale: 0.9 }}
            className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 relative overflow-hidden shadow-md"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <motion.div
              className="relative z-10"
              initial={false}
              animate={{ rotate: theme === 'dark' ? 0 : 180 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {theme === 'dark' ?
                <FiSun size={20} className="text-yellow-500" /> :
                <FiMoon size={20} className="text-blue-600" style={{ transform: 'rotate(180deg)' }} />
              }
            </motion.div>
            <div
              className={`absolute inset-0 transition-all duration-300 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'} bg-gray-700`}
              style={{ zIndex: 1 }}
            ></div>
          </motion.button>
        </div>

        {/* Right Side Links - Exactly 2 items */}
        <div className="flex items-center space-x-12 absolute right-0">
          <Link href="/client/dashboard" className={linkStyle}>
            <FaColumns className={iconStyle} /> <span>Panel</span>
          </Link>

          {/* Projects with Badge */}
          <Link href="/client/projects" className={`${linkStyle} relative`}>
            <FaLayerGroup className={iconStyle} />
            <span>Projects</span>
            {pendingSubmissions > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {pendingSubmissions}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
