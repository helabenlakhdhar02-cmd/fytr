'use client';

import { FaHome, FaBookOpen, FaBook, FaCog, FaUser, FaSearch, FaGraduationCap, FaBriefcase, FaUsers, FaChartBar, FaChalkboardTeacher, FaNewspaper, FaFileAlt, FaLayerGroup, FaProjectDiagram, FaTools, FaMoneyBillWave, FaBell, FaUserPlus, FaHistory } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function MobileNav({ user, role, logout, closeMenu, openLoginModal, openRegisterModal }) {
  // Role-specific links
  const roleLinks = {
    freelancer: [
      { href: '/academy', icon: <FaGraduationCap className="text-primary-600" />, label: 'Academy' },
      { href: '/clabte-freelancer', icon: <FaLayerGroup className="text-primary-600" />, label: 'Workspace' },
      { href: '/payment/history', icon: <FaHistory className="text-primary-600" />, label: 'Payments' },
      { href: '/dashboard/home', icon: <FaHome className="text-primary-600" />, label: 'Home' },
      {
        href: '/dashboard/ranked',
        icon: <FaChartBar className="text-white" />,
        label: 'Ranked',
        isButton: true,
        className: "bg-gradient-to-r from-amber-500 to-amber-600 text-white"
      },
    ],
    client: [
      { href: '/dashboard/home', icon: <FaHome className="text-primary-600" />, label: 'Home' },
      { href: '/fytrs', icon: <FaUsers className="text-primary-600" />, label: 'Fytrs' },
      { href: '/payment/history', icon: <FaHistory className="text-primary-600" />, label: 'Payments' },
      { href: '/services-list', icon: <FaBriefcase className="text-primary-600" />, label: 'Services' },
      { href: '/clabte-client', icon: <FaLayerGroup className="text-primary-600" />, label: 'Projects' },

    ],
    admin: [
      { href: '/admin', icon: <FaHome className="text-primary-600" />, label: 'Home' },
      { href: '/admin/users', icon: <FaUsers className="text-primary-600" />, label: 'Users' },
      { href: '/admin/projects', icon: <FaTools className="text-primary-600" />, label: 'Projects' },
      { href: '/admin/courses', icon: <FaBook className="text-primary-600" />, label: 'Courses' },
      { href: '/admin/payments/transactions', icon: <FaMoneyBillWave className="text-primary-600" />, label: 'Finance' },
      { href: '/admin/community/reports', icon: <FaBell className="text-primary-600" />, label: 'Alerts' },
      {
        href: '/admin/users/add',
        icon: <FaUserPlus className="text-white" />,
        label: 'Add User',
        isButton: true,
        className: "bg-gray-700 text-white"
      },
    ],
    formateur: [
      { href: '/dashboard/my-courses', icon: <FaChalkboardTeacher className="text-primary-600" />, label: 'My Courses' },
      { href: '/dashboard/students', icon: <FaUsers className="text-primary-600" />, label: 'My Students' },
      { href: '/dashboard/home', icon: <FaHome className="text-primary-600" />, label: 'Home' },
      {
        href: '/dashboard/add-course',
        icon: <FaBookOpen className="text-white" />,
        label: 'Add Course',
        isButton: true,
        className: "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
      },
    ],
    guest: [
      { href: '/', icon: <FaHome className="text-primary-600" />, label: 'Home' },
      { href: '/academy', icon: <FaGraduationCap className="text-primary-600" />, label: 'Academy' },
      { href: '/services-list', icon: <FaBriefcase className="text-primary-600" />, label: 'Services' },
      { href: '/website/projects', icon: <FaProjectDiagram className="text-primary-600" />, label: 'Projects' },
      { href: '/fytrs', icon: <FaUsers className="text-primary-600" />, label: 'Fytrs' },
      { href: '/postes', icon: <FaNewspaper className="text-primary-600" />, label: 'Posts' }
    ]
  };

  // Determine which links to show based on role
  const links = user && role && roleLinks[role] ? roleLinks[role] : roleLinks.guest;

  return (
    <nav className="space-y-3">
      {links.map((link, index) => (
        link.isButton ? (
          <div key={index} className="mt-4">
            {link.href ? (
              <Link href={link.href} onClick={closeMenu}>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-2.5 rounded-md shadow-sm flex items-center justify-center gap-2 ${link.className}`}
                >
                  {link.icon} <span>{link.label}</span>
                </motion.button>
              </Link>
            ) : (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (link.action) link.action();
                  closeMenu();
                }}
                className={`w-full py-2.5 rounded-md shadow-sm flex items-center justify-center gap-2 ${link.className}`}
              >
                {link.icon} <span>{link.label}</span>
              </motion.button>
            )}
          </div>
        ) : (
          <Link
            key={index}
            href={link.href}
            className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            onClick={closeMenu}
          >
            {link.icon} <span>{link.label}</span>
          </Link>
        )
      ))}

      {user ? (
        <>
          <div className="border-t border-gray-200 dark:border-gray-700 my-3 pt-3">
            <Link
              href={
                role === 'client'
                  ? "/dashboard/clante-profile"
                  : role === 'formateur'
                    ? "/dashboard/trainer-profile"
                    : "/dashboard/freelancer-profile"
              }
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              onClick={closeMenu}
            >
              <FaUser className="text-primary-600" /> <span>Profile</span>
            </Link>
            <button
              onClick={() => {
                logout();
                closeMenu();
              }}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400 w-full text-left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-5-5H3zm7 2a1 1 0 00-1 1v1H5a1 1 0 100 2h4v1a1 1 0 102 0V9.414l3 3V16H5V8h4V7a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>Sign out</span>
            </button>
          </div>
        </>
      ) : (
        <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4 space-y-3">
          <button
            onClick={() => {
              openLoginModal();
              closeMenu();
            }}
            className="w-full py-2.5 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium flex items-center justify-center"
          >
            Log in
          </button>
          <button
            onClick={() => {
              openRegisterModal();
              closeMenu();
            }}
            className="w-full py-2.5 rounded-md bg-primary-600 hover:bg-primary-700 text-white transition-all duration-200 font-medium shadow-sm flex items-center justify-center"
          >
            Sign up
          </button>
        </div>
      )}
    </nav>
  );
}
