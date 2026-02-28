'use client';

import { FaHome, FaUsers, FaBook, FaTools, FaMoneyBillWave, FaBell, FaSearch, FaUserPlus } from 'react-icons/fa';
import Link from 'next/link';
import { useState } from 'react';
import AdminActivityLog from '../admin/AdminActivityLog';
import { AdminActivityProvider } from '../../context/AdminActivityContext';

export default function AdminNav() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  // Simplified link style
  const linkStyle = "flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors";

  return (
    <div className="hidden md:flex items-center justify-between w-full px-4">
      {/* Left Side Links - Essential Navigation */}
      <div className="flex items-center space-x-8">
        <Link href="/admin" className={linkStyle}>
          <FaHome className="text-primary-600 text-lg" />
          <span>Home</span>
        </Link>

        <Link href="/admin/users" className={linkStyle}>
          <FaUsers className="text-primary-600 text-lg" />
          <span>Users</span>
        </Link>

        <Link href="/admin/projects" className={linkStyle}>
          <FaTools className="text-primary-600 text-lg" />
          <span>Projects</span>
        </Link>

        <Link href="/admin/courses" className={linkStyle}>
          <FaBook className="text-primary-600 text-lg" />
          <span>Courses</span>
        </Link>

        <Link href="/admin/payments/transactions" className={linkStyle}>
          <FaMoneyBillWave className="text-primary-600 text-lg" />
          <span>Finance</span>
        </Link>
      </div>

      {/* Right Side - Search & Notifications */}
      <div className="flex items-center space-x-4">
        {/* Quick Search Bar */}
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-2 pl-9 pr-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white w-40"
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
        </form>

        {/* Admin Activity Log */}
        <AdminActivityProvider>
          <AdminActivityLog />
        </AdminActivityProvider>

        {/* Alerts/Notifications */}
        <Link href="/admin/community/reports" className={linkStyle}>
          <div className="relative">
            <FaBell className="text-primary-600 text-lg" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              8
            </span>
          </div>
        </Link>

        {/* Add Admin Button - Simplified */}
        <Link href="/admin/users/add" className="px-3 py-1.5 bg-gray-700 text-white text-sm rounded-md flex items-center gap-1.5 hover:bg-gray-800 transition-colors">
          <FaUserPlus className="text-sm" /> Add
        </Link>
      </div>
    </div>
  );
}
