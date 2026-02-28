'use client';

import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function StatCard({ 
  title, 
  value, 
  icon, 
  color = 'blue', 
  change, 
  changeLabel,
  reverseColors = false
}) {
  // Define color schemes
  const colorSchemes = {
    blue: {
      bgLight: 'bg-blue-50',
      bgDark: 'dark:bg-blue-900/20',
      iconBg: 'bg-blue-100 dark:bg-blue-800/50',
      iconColor: 'text-blue-600 dark:text-blue-400',
      textColor: 'text-blue-600 dark:text-blue-400'
    },
    green: {
      bgLight: 'bg-green-50',
      bgDark: 'dark:bg-green-900/20',
      iconBg: 'bg-green-100 dark:bg-green-800/50',
      iconColor: 'text-green-600 dark:text-green-400',
      textColor: 'text-green-600 dark:text-green-400'
    },
    red: {
      bgLight: 'bg-red-50',
      bgDark: 'dark:bg-red-900/20',
      iconBg: 'bg-red-100 dark:bg-red-800/50',
      iconColor: 'text-red-600 dark:text-red-400',
      textColor: 'text-red-600 dark:text-red-400'
    },
    yellow: {
      bgLight: 'bg-yellow-50',
      bgDark: 'dark:bg-yellow-900/20',
      iconBg: 'bg-yellow-100 dark:bg-yellow-800/50',
      iconColor: 'text-yellow-600 dark:text-yellow-400',
      textColor: 'text-yellow-600 dark:text-yellow-400'
    },
    purple: {
      bgLight: 'bg-purple-50',
      bgDark: 'dark:bg-purple-900/20',
      iconBg: 'bg-purple-100 dark:bg-purple-800/50',
      iconColor: 'text-purple-600 dark:text-purple-400',
      textColor: 'text-purple-600 dark:text-purple-400'
    },
    gray: {
      bgLight: 'bg-gray-50',
      bgDark: 'dark:bg-gray-800/50',
      iconBg: 'bg-gray-100 dark:bg-gray-700',
      iconColor: 'text-gray-600 dark:text-gray-400',
      textColor: 'text-gray-600 dark:text-gray-400'
    }
  };

  const scheme = colorSchemes[color] || colorSchemes.blue;

  // Determine change indicator
  const isPositiveChange = change > 0;
  const changeIndicator = isPositiveChange ? <FaArrowUp size={12} /> : <FaArrowDown size={12} />;
  
  // Determine change color (positive is green, negative is red, unless reversed)
  const getChangeColorClass = () => {
    if (reverseColors) {
      return isPositiveChange 
        ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20' 
        : 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
    }
    return isPositiveChange 
      ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20' 
      : 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${scheme.bgLight} ${scheme.bgDark} rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-all duration-200 hover:shadow-md`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
          
          {change !== undefined && (
            <div className="flex items-center mt-2">
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getChangeColorClass()}`}>
                {changeIndicator}
                <span className="ml-1">{Math.abs(change)}%</span>
              </span>
              {changeLabel && (
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
        
        <div className={`p-3 rounded-full ${scheme.iconBg}`}>
          <span className={`${scheme.iconColor}`}>
            {icon}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
