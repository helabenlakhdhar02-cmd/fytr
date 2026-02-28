"use client";
import React, { memo } from "react";
import { motion } from "framer-motion";
import { FaStar, FaDollarSign, FaCode, FaExternalLinkAlt, FaUser, FaUsers } from "react-icons/fa";
import Link from "next/link";

// Define the component
const ServiceCardComponent = ({ service, index }) => {
  // Log rendering for debugging purposes
  console.log(`Rendering ServiceCard for ${service.title}`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 flex flex-col h-full"
    >
      {/* Badges */}
      <div className="relative">
        {/* Availability Badge */}
        <div
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
            service.availability
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
          }`}
        >
          {service.availability ? "Available" : "Unavailable"}
        </div>

        {/* Service Type Badge */}
        <div
          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium flex items-center ${
            service.serviceType === 'bettaArena'
              ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
              : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
          }`}
        >
          {service.serviceType === 'bettaArena' ? (
            <>
              <FaUsers className="mr-1" size={10} />
              <span>BettaArena</span>
              {service.spotsTotal && service.spotsTaken !== undefined && (
                <span className="ml-1">({service.spotsTaken}/{service.spotsTotal})</span>
              )}
            </>
          ) : (
            <>
              <FaUser className="mr-1" size={10} />
              <span>SoloFin</span>
            </>
          )}
        </div>
      </div>

      {/* Service Content */}
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
          {service.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {service.description}
        </p>

        {/* Service Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <FaDollarSign className="mr-2 text-primary-600 dark:text-primary-400" />
            <span className="font-medium">${service.price}</span>
          </div>

          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-xs font-medium">
              {service.category}
            </span>
          </div>

          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <FaCode className="mr-2 text-primary-600 dark:text-primary-400" />
            <span className="line-clamp-1">{service.technologies}</span>
          </div>
        </div>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {service.skills.split(',').map((skill, i) => (
            <span
              key={i}
              className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-1 rounded-md text-xs"
            >
              {skill.trim()}
            </span>
          ))}
        </div>
      </div>

      {/* Freelancer Info & Action Button */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={service.freelancer?.user?.profileImg || "/fighterfish.png"}
              alt={service.freelancer?.user?.full_name || "Freelancer"}
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/fighterfish.png";
              }}
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {service.freelancer?.user?.full_name || "Anonymous Freelancer"}
              </p>
              <div className="flex items-center">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      size={12}
                      className={
                        i < Math.floor(service.freelancer?.rate || 0)
                          ? "text-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }
                    />
                  ))}
                </div>
                <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                  {service.freelancer?.rate || "0.0"}
                </span>
              </div>
            </div>
          </div>

          <Link href={`/services/${service.id}`} passHref>
            <button className="flex items-center gap-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-300 text-sm font-medium">
              <span>View</span>
              <FaExternalLinkAlt size={12} />
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// Create memoized version of the component
// This prevents unnecessary re-renders when props haven't changed
const ServiceCard = memo(ServiceCardComponent, (prevProps, nextProps) => {
  // Custom comparison function to determine if component should re-render
  // Return true if props are equal (no re-render needed)
  // Return false if props are different (re-render needed)
  return (
    prevProps.service.id === nextProps.service.id &&
    prevProps.index === nextProps.index &&
    prevProps.service.availability === nextProps.service.availability
  );
});

export default ServiceCard;
