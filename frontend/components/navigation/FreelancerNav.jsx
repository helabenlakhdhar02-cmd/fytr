'use client';

import { FaHome, FaLayerGroup, FaHistory } from 'react-icons/fa';
import Link from 'next/link';

export default function FreelancerNav({ userRank = 'Bronze' }) {
  // Common link style
  const linkStyle = "nav-link flex items-center gap-1.5 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors px-2 py-1 text-sm hover:scale-105 transition-transform duration-200";

  return (
    <div className="hidden md:flex items-center justify-center w-full">
      {/* Left Side Links */}
      <div className="flex items-center space-x-8 lg:space-x-10 mr-12">
        <Link href="/clabte-freelancer" className={linkStyle}>
          <FaLayerGroup className="text-primary-600" /> <span>Workspace</span>
        </Link>

        <Link href="/payment/history" className={linkStyle}>
          <FaHistory className="text-primary-600" /> <span>Payments</span>
        </Link>
      </div>

      {/* Right Side Links */}
      <div className="flex items-center space-x-8 lg:space-x-10 ml-12">
        <Link href="/dashboard/home" className={linkStyle}>
          <FaHome className="text-primary-600" /> <span>Home</span>
        </Link>

        {/* Rank Badge */}
        <Link href="/dashboard/ranked" className="px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs rounded-full shadow-sm flex items-center hover:shadow-md transition-all duration-300 hover:scale-105">
          Ranked
        </Link>
      </div>
    </div>
  );
}
