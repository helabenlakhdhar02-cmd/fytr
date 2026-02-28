'use client';

import { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * ThemeTransition component that handles theme transitions without causing hydration issues
 * This component only runs on the client side after hydration is complete
 */
const ThemeTransition = () => {
  const { mounted } = useTheme();

  useEffect(() => {
    // Only run after component is mounted (client-side)
    if (!mounted) return;

    // Add theme transition styles dynamically after hydration
    const addThemeTransitions = () => {
      // Check if styles already exist
      if (document.getElementById('dynamic-theme-transitions')) return;

      const style = document.createElement('style');
      style.id = 'dynamic-theme-transitions';
      style.textContent = `
        /* Dynamic theme transitions - added after hydration to avoid SSR issues */
        body,
        .btn,
        .card,
        .input,
        .badge,
        [class*="bg-white"],
        [class*="bg-gray"],
        [class*="bg-blue"],
        [class*="bg-primary"],
        [class*="text-gray"],
        [class*="text-white"],
        [class*="text-blue"],
        [class*="text-primary"],
        [class*="border-gray"],
        [class*="border-blue"],
        [class*="border-primary"] {
          transition: background-color 200ms ease, border-color 200ms ease, color 200ms ease !important;
        }
        
        /* Specific transitions for common elements */
        .dark {
          transition: background-color 200ms ease, color 200ms ease !important;
        }
        
        /* Hover transitions */
        .hover\\:bg-gray-50:hover,
        .hover\\:bg-gray-100:hover,
        .hover\\:bg-blue-50:hover,
        .hover\\:bg-blue-600:hover,
        .hover\\:bg-blue-700:hover {
          transition: background-color 150ms ease !important;
        }
      `;

      document.head.appendChild(style);
      console.log('Theme transitions added after hydration');
    };

    // Add transitions after a small delay to ensure DOM is ready
    const timer = setTimeout(addThemeTransitions, 100);

    return () => clearTimeout(timer);
  }, [mounted]);

  // This component doesn't render anything visible
  return null;
};

export default ThemeTransition;
