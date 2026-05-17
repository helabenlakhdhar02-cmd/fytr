'use client';

import { FaHome, FaUser, FaBriefcase, FaUsers, FaLayerGroup, FaThLarge, FaColumns, FaHistory } from 'react-icons/fa';
import Link from 'next/link';

export default function ClientNav({ activeProjects = 0, pendingSubmissions = 0 }) {
  // Calculate total notifications
  const totalNotifications = activeProjects + pendingSubmissions;

  // Common link style
  const linkStyle = "nav-link flex items-center gap-1.5 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors px-2 py-1 text-sm hover:scale-105 transition-transform duration-200";
  const iconStyle = "text-primary-600 text-lg";

  return (
    <div className="hidden md:flex items-center w-full">
      {/* Layout with proper spacing for theme toggle */}
      <div className="flex items-center justify-between w-full relative">
        {/* Left Side Links - Exactly 3 items */}
        <div className="flex items-center space-x-12 flex-1">
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

        {/* Right Side Links - Exactly 2 items */}
        <div className="flex items-center space-x-12 flex-1 justify-end">
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
