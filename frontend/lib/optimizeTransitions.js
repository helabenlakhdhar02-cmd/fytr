'use client';

/**
 * This script optimizes theme transitions by only applying transition effects
 * to elements that actually need them, rather than applying them globally.
 * This significantly improves performance by reducing the number of elements
 * that need to be repainted during theme changes.
 */

export function initOptimizedTransitions() {
  if (typeof window === 'undefined') return;

  // Instead of dynamically adding classes, we'll use CSS-in-JS approach
  // to avoid hydration mismatches

  // Create a style element for theme transitions
  function createThemeTransitionStyles() {
    // Check if styles already exist
    if (document.getElementById('theme-transition-styles')) return;

    const style = document.createElement('style');
    style.id = 'theme-transition-styles';
    style.textContent = `
      /* Optimized theme transitions - applied via CSS to avoid hydration issues */
      body,
      .dark,
      .card,
      .btn,
      .badge,
      .input,
      [class*="bg-white"],
      [class*="bg-gray"],
      [class*="bg-primary"],
      [class*="text-gray"],
      [class*="text-white"],
      [class*="text-primary"],
      [class*="border-gray"],
      [class*="border-primary"] {
        transition-property: background-color, border-color, color, fill, stroke;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 200ms;
      }
    `;

    document.head.appendChild(style);
    console.log('Applied optimized theme transitions via CSS');
  }

  // Apply transitions when the DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createThemeTransitionStyles);
  } else {
    createThemeTransitionStyles();
  }

  // Also apply transitions when the theme changes
  window.addEventListener('themeChanged', createThemeTransitionStyles);
}
