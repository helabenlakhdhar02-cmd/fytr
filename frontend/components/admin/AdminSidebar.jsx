'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FaHome, 
  FaUsers, 
  FaUserPlus, 
  FaUserShield, 
  FaFolderOpen, 
  FaTasks, 
  FaGraduationCap, 
  FaBook, 
  FaCreditCard, 
  FaMoneyBillWave, 
  FaChartLine, 
  FaComments, 
  FaFlag, 
  FaCog, 
  FaClipboardList, 
  FaEnvelope, 
  FaChevronDown, 
  FaChevronRight 
} from 'react-icons/fa';
import Image from 'next/image';

export default function AdminSidebar() {
  const pathname = usePathname();
  const [expandedMenus, setExpandedMenus] = useState({
    users: false,
    projects: false,
    courses: false,
    payments: false,
    community: false,
    settings: false
  });

  // Toggle submenu expansion
  const toggleMenu = (menu) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  // Check if a path is active
  const isActive = (path) => {
    if (path === '/admin' && pathname === '/admin') {
      return true;
    }
    return pathname.startsWith(path) && path !== '/admin';
  };

  // Menu item component
  const MenuItem = ({ href, icon, label, isSubmenu = false, hasSubmenu = false, onClick, active = false }) => {
    const Icon = icon;
    
    return (
      <Link 
        href={href}
        onClick={onClick}
        className={`flex items-center px-4 py-3 ${isSubmenu ? 'pl-10' : 'pl-6'} ${
          active 
            ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-medium border-l-4 border-primary-600 dark:border-primary-500' 
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
        } transition-colors duration-200`}
      >
        {Icon && <Icon className={`${isSubmenu ? 'w-4 h-4' : 'w-5 h-5'} ${active ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'} mr-3`} />}
        <span className="text-sm">{label}</span>
        {hasSubmenu && (
          <span className="ml-auto">
            {expandedMenus[href.split('/').pop()] ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
          </span>
        )}
      </Link>
    );
  };

  // Submenu component
  const SubMenu = ({ title, icon, items, menuKey }) => {
    const isMenuActive = items.some(item => isActive(item.href));
    const isExpanded = expandedMenus[menuKey] || isMenuActive;

    return (
      <div className="mb-1">
        <button
          onClick={() => toggleMenu(menuKey)}
          className={`w-full flex items-center px-6 py-3 ${
            isMenuActive 
              ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-medium' 
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
          } transition-colors duration-200`}
        >
          {icon}
          <span className="text-sm ml-3">{title}</span>
          <span className="ml-auto">
            {isExpanded ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
          </span>
        </button>
        
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {items.map((item, index) => (
              <MenuItem
                key={index}
                href={item.href}
                icon={item.icon}
                label={item.label}
                isSubmenu={true}
                active={isActive(item.href)}
              />
            ))}
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* Admin Logo/Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-center">
        <div className="relative h-8 w-32 flex items-center">
          <Image
            src="/fyterlance-new.png"
            alt="FytrLance Admin"
            width={128}
            height={32}
            className="object-contain"
          />
          <span className="ml-2 text-xs font-semibold bg-gray-700 text-white px-2 py-0.5 rounded">Admin</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="space-y-1">
          {/* Dashboard */}
          <MenuItem 
            href="/admin" 
            icon={FaHome} 
            label="Dashboard Overview" 
            active={isActive('/admin')}
          />

          {/* User Management */}
          <SubMenu
            title="User Management"
            icon={<FaUsers className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
            menuKey="users"
            items={[
              { href: '/admin/users', icon: FaUsers, label: 'View All Users' },
              { href: '/admin/users/add', icon: FaUserPlus, label: 'Add New User' },
              { href: '/admin/users/roles', icon: FaUserShield, label: 'Manage Roles' },
            ]}
          />

          {/* Projects & Tasks */}
          <SubMenu
            title="Projects & Tasks"
            icon={<FaFolderOpen className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
            menuKey="projects"
            items={[
              { href: '/admin/projects', icon: FaFolderOpen, label: 'View All Projects' },
              { href: '/admin/tasks', icon: FaTasks, label: 'Manage Submissions' },
            ]}
          />

          {/* Courses & Learning */}
          <SubMenu
            title="Courses & Learning"
            icon={<FaGraduationCap className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
            menuKey="courses"
            items={[
              { href: '/admin/courses', icon: FaBook, label: 'All Courses' },
              { href: '/admin/courses/submissions', icon: FaClipboardList, label: 'Trainer Submissions' },
            ]}
          />

          {/* Payments & Revenue */}
          <SubMenu
            title="Payments & Revenue"
            icon={<FaCreditCard className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
            menuKey="payments"
            items={[
              { href: '/admin/payments/transactions', icon: FaMoneyBillWave, label: 'Transactions' },
              { href: '/admin/payments/withdrawals', icon: FaCreditCard, label: 'Withdrawals' },
              { href: '/admin/payments/reports', icon: FaChartLine, label: 'Reports' },
            ]}
          />

          {/* Community & Moderation */}
          <SubMenu
            title="Community & Moderation"
            icon={<FaComments className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
            menuKey="community"
            items={[
              { href: '/admin/community/forum', icon: FaComments, label: 'Forum / Chat' },
              { href: '/admin/community/reports', icon: FaFlag, label: 'User Reports' },
            ]}
          />

          {/* Settings */}
          <SubMenu
            title="Settings"
            icon={<FaCog className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
            menuKey="settings"
            items={[
              { href: '/admin/settings/platform', icon: FaClipboardList, label: 'Platform Rules' },
              { href: '/admin/settings/scoring', icon: FaChartLine, label: 'Scoring System' },
              { href: '/admin/settings/integrations', icon: FaEnvelope, label: 'Email / Integrations' },
            ]}
          />
        </div>
      </nav>

      {/* Admin Info */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
            <FaUserShield size={14} />
          </div>
          <div className="ml-3">
            <p className="text-xs font-medium text-gray-900 dark:text-white">Admin User</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Super Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
