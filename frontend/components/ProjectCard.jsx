"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaDollarSign, FaCode, FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";

const ProjectCard = ({ project, index }) => {
  // Format date to a readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 flex flex-col h-full"
    >
      {/* Project Status Badge */}
      <div className="relative">
        <div
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
            project.status === "open"
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              : project.status === "in_progress"
              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          {project.status === "open"
            ? "Open"
            : project.status === "in_progress"
            ? "In Progress"
            : "Completed"}
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
          {project.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Project Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <FaDollarSign className="mr-2 text-primary-600 dark:text-primary-400" />
            <span className="font-medium">${project.budget}</span>
          </div>
          
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <FaCalendarAlt className="mr-2 text-primary-600 dark:text-primary-400" />
            <span>Deadline: {formatDate(project.deadline)}</span>
          </div>
          
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <FaCode className="mr-2 text-primary-600 dark:text-primary-400" />
            <span className="line-clamp-1">{project.technologies}</span>
          </div>
        </div>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.skills_required.split(',').map((skill, i) => (
            <span
              key={i}
              className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-1 rounded-md text-xs"
            >
              {skill.trim()}
            </span>
          ))}
        </div>
      </div>

      {/* Client Info & Action Button */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={project.client?.user?.profileImg || "/fighterfish.png"}
              alt={project.client?.user?.full_name || "Client"}
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/fighterfish.png";
              }}
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {project.client?.user?.full_name || "Anonymous Client"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Client</p>
            </div>
          </div>
          
          <Link href={`/projects/${project.id}`} passHref>
            <button className="flex items-center gap-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-300 text-sm font-medium">
              <span>Apply</span>
              <FaExternalLinkAlt size={12} />
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
