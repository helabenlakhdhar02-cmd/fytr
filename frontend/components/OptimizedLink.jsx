'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

/**
 * OptimizedLink component that enhances Next.js Link with:
 * - Preloading on hover
 * - Visual feedback during navigation
 * - Smooth transitions
 */
const OptimizedLink = ({ 
  href, 
  children, 
  className = '', 
  activeClassName = '',
  prefetch = true,
  onClick,
  ...props 
}) => {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Handle click with transition state
  const handleClick = useCallback((e) => {
    // If it's an external link or has a custom onClick, don't handle specially
    if (href.startsWith('http') || onClick) {
      if (onClick) onClick(e);
      return;
    }
    
    // Prevent default navigation
    e.preventDefault();
    
    // Set transitioning state for visual feedback
    setIsTransitioning(true);
    
    // Short delay for visual feedback before navigation
    setTimeout(() => {
      router.push(href);
    }, 100);
    
  }, [href, router, onClick]);

  return (
    <Link
      href={href}
      className={`${className} ${isTransitioning ? 'opacity-70' : ''}`}
      prefetch={prefetch}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
};

export default OptimizedLink;
