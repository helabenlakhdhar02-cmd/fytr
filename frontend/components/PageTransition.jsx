'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

/**
 * PageTransition component that provides smooth transitions between pages
 * and shows a loading indicator during navigation
 */
const PageTransition = ({ children }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [prevPathname, setPrevPathname] = useState('');

  // Track navigation changes
  useEffect(() => {
    // If the path changed
    if (prevPathname !== pathname) {
      // Start loading animation
      setIsLoading(true);
      
      // Store the current path
      setPrevPathname(pathname);
      
      // Simulate completion of loading after a short delay
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300); // Short delay to allow for smooth transition
      
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams, prevPathname]);

  return (
    <>
      {/* Loading indicator - only shown during page transitions */}
      {isLoading && (
        <div className="fixed top-0 left-0 w-full z-50">
          <div className="h-1 bg-primary-500 animate-pulse">
            <div className="h-full bg-primary-600 w-1/3 animate-[loading_1s_ease-in-out_infinite]"></div>
          </div>
        </div>
      )}
      
      {/* Page content with transition effect */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageTransition;
