'use client';

import { FaHome, FaProjectDiagram, FaBriefcase, FaGraduationCap, FaUsers, FaNewspaper } from 'react-icons/fa';
import Link from 'next/link';

export default function GuestNav() {
  // Common link style
  const linkStyle = "nav-link flex items-center gap-1.5 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors px-2 py-1 text-sm hover:scale-105 transition-transform duration-200";

  return (
    <div className="hidden md:flex items-center justify-center w-full">
      {/* Left Side Links */}
      <div className="flex items-center space-x-8 lg:space-x-10 mr-12">
        <Link href="/" className={linkStyle}>
          <FaHome className="text-primary-600" /> <span>Home</span>
        </Link>

        <Link href="/Academy" className={linkStyle}>
          <FaGraduationCap className="text-primary-600" /> <span>Academy</span>
        </Link>

        <Link href="/services-list" className={linkStyle}>
          <FaBriefcase className="text-primary-600" /> <span>Services</span>
        </Link>
      </div>

      {/* Right Side Links */}
      <div className="flex items-center space-x-8 lg:space-x-10 ml-12">
        <Link href="/website/projects" className={linkStyle}>
          <FaProjectDiagram className="text-primary-600" /> <span>Projects</span>
        </Link>

        <Link href="/fytrs" className={linkStyle}>
          <FaUsers className="text-primary-600" /> <span>Fytrs</span>
        </Link>

        <Link href="/postes" className={linkStyle}>
          <FaNewspaper className="text-primary-600" /> <span>Posts</span>
        </Link>
      </div>
    </div>
  );
}
