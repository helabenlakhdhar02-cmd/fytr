'use client';

import { FaHome, FaChalkboardTeacher, FaBook, FaUsers, FaGraduationCap, FaChartLine, FaPlus } from 'react-icons/fa';
import Link from 'next/link';
import { useTheme } from '../../context/ThemeContext';

export default function FormateurNav({ isTopTrainer = false }) {
  // Common link style
  const linkStyle = "flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors px-3 py-2 text-sm font-medium";
  const iconStyle = "text-primary-600";

  return (
    <div className="hidden md:flex items-center w-full">
      {/* Centered layout with links evenly spaced */}
      <div className="flex items-center justify-center w-full relative">
        {/* Left Side Links - Exactly 2 items */}
        <div className="flex items-center space-x-12 absolute left-0">
          <Link href="/dashboard/home" className={linkStyle}>
            <FaHome className={iconStyle} /> <span>Home</span>
          </Link>

          <Link href="/dashboard/my-courses" className={linkStyle}>
            <FaChalkboardTeacher className={iconStyle} /> <span>Courses</span>
          </Link>
        </div>

        {/* Right Side Links - Exactly 2 items */}
        <div className="flex items-center space-x-12 absolute right-0">
          <Link href="/dashboard/students" className={linkStyle}>
            <FaUsers className={iconStyle} /> <span>Students</span>
          </Link>

          {/* Add Course Button */}
          <Link
            href="/dashboard/add-course"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm flex items-center gap-2 hover:shadow-md transition-all duration-300"
          >
            <FaPlus className="text-sm" /> Add Course
          </Link>
        </div>
      </div>
    </div>
  );
}
