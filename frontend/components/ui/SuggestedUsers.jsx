"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaUserPlus, FaUsers } from "react-icons/fa";

const suggestedUsers = [
  {
    id: 1,
    username: "sarahjohnson",
    full_name: "Sarah Johnson",
    profileImg: "/photos/Academy/student1.jpg",
    role: "UI/UX Designer",
    mutual_connections: 5,
    rating: 4.9,
    verified: true
  },
  {
    id: 2,
    username: "michaelwilson",
    full_name: "Michael Wilson",
    profileImg: "/photos/Academy/student3.png",
    role: "Frontend Developer",
    mutual_connections: 3,
    rating: 4.7,
    verified: true
  },
  {
    id: 3,
    username: "emilydavis",
    full_name: "Emily Davis",
    profileImg: "/photos/Topfreelancers/freelancer 2.PNG",
    role: "Product Manager",
    mutual_connections: 7,
    rating: 5.0,
    verified: true
  },
  {
    id: 4,
    username: "davidbrown",
    full_name: "David Brown",
    profileImg: "/photos/Topfreelancers/freelancer1.PNG",
    role: "Full Stack Developer",
    mutual_connections: 2,
    rating: 4.8,
    verified: false
  },
  {
    id: 5,
    username: "jennifertaylor",
    full_name: "Jennifer Taylor",
    profileImg: "/photos/Academy/student2.jpeg",
    role: "AI Specialist",
    mutual_connections: 4,
    rating: 4.9,
    verified: true
  }
];

const SuggestedUsers = () => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mt-4 border border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FaUsers className="text-primary-600 dark:text-primary-400" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Top Freelancers</h3>
        </div>
        <span className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 px-2 py-1 rounded-full">
          Recommended
        </span>
      </div>

      <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar">
        {suggestedUsers.map((user, index) => (
          <motion.div
            key={user.id}
            className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ x: 3 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                <img
                  src={user.profileImg}
                  alt={user.full_name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/fighterfish.png";
                  }}
                />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">{user.full_name}</h4>
                  {user.verified && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-500">
                      <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user.role}</p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        className={`w-3 h-3 ${i < Math.floor(user.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}>
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{user.rating}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button className="text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 p-2 rounded-full transition-colors">
                <FaUserPlus />
              </button>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {user.mutual_connections} mutual
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline w-full text-center flex items-center justify-center gap-1">
          <span>Browse all freelancers</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default SuggestedUsers;
