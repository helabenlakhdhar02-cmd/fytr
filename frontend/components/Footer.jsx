'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub, FaHeart, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useAuth } from '../context/AuthContext';

const Footer = () => {
  const { isAuthenticated, openLoginModal, openRegisterModal } = useAuth();

  const footerLinks = [
    {
      title: 'For Clients',
      links: [
        { name: 'Find Freelancers', href: '/freelancers-list' },
        { name: 'Post a Project', href: '/dashboard/post-service' },
        { name: 'Browse Services', href: '/website/services' },
        { name: 'How it Works', href: '/#how-it-works' },
      ]
    },
    {
      title: 'For Freelancers',
      links: [
        { name: 'Find Projects', href: '/services-list' },
        { name: 'Create a Service', href: '/clabte-freelancer' },
        { name: 'Academy', href: '/Academy' },
        { name: 'Community', href: '/postes' },
      ]
    }
   
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white pt-16 pb-8 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-6">
              <img
                src="/fyterlance-new.png"
                alt="FytrLance Logo"
                className="h-16 mr-3"
              />
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md transition-colors duration-300">
              FytrLance is a platform connecting talented freelancers with clients looking for quality services. Join our community and grow your career or business.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                <FaXTwitter size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                <FaGithub size={20} />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4 text-primary-600 dark:text-primary-400 transition-colors duration-300">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href} className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>



        {/* Contact Info */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 pb-6 transition-colors duration-300">
          <div className="flex flex-wrap justify-center gap-8 mb-6">
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <FaEnvelope className="text-primary-600 dark:text-primary-500 mr-2" />
              <a href="mailto:support@fytrlance.com" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">support@fytrlance.com</a>
            </div>
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <FaPhone className="text-primary-600 dark:text-primary-500 mr-2" />
              <a href="tel:+216 52 179 854" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">+216 52 179 854</a>
            </div>
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <FaMapMarkerAlt className="text-primary-600 dark:text-primary-500 mr-2" />
              <span className="text-gray-600 dark:text-gray-400 transition-colors duration-300">not yet</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-6 text-center transition-colors duration-300">
          
          <p className="text-gray-500 dark:text-gray-500 text-sm transition-colors duration-300">
            &copy; {new Date().getFullYear()} FytrLance. All rights reserved.
          </p>
          <p className="text-gray-500 dark:text-gray-600 text-xs mt-2 flex items-center justify-center transition-colors duration-300">
            Made with <FaHeart className="text-red-500 mx-1" size={12} /> by FytrLance Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
