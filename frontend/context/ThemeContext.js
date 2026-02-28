'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const ThemeContext = createContext();

// Theme provider component
export function ThemeProvider({ children }) {
  // Initialize with a default theme, will be updated in useEffect
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    // Set mounted to true to indicate client-side rendering
    setMounted(true);

    // Try to get theme from localStorage
    try {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        setTheme(storedTheme);
      } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
        localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  }, []);

  // Apply theme changes to document
  useEffect(() => {
    if (!mounted) return;

    // When theme changes, update the document class and localStorage
    try {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      localStorage.setItem('theme', theme);
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  }, [theme, mounted]);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    // Dispatch a custom event for theme change
    if (typeof window !== 'undefined') {
      const themeChangedEvent = new CustomEvent('themeChanged', {
        detail: { theme: newTheme }
      });
      window.dispatchEvent(themeChangedEvent);
    }
  };

  // Provide the context value
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
