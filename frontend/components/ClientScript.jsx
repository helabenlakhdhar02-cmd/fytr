'use client';

import { useEffect } from 'react';
import { initProfileImageSync } from '../lib/profileImageSync';
import { initOptimizedTransitions } from '../lib/optimizeTransitions';

/**
 * ClientScript component that initializes client-side scripts
 * This component doesn't render anything visible
 */
const ClientScript = () => {
  useEffect(() => {
    // Initialize profile image synchronization
    initProfileImageSync();

    // Initialize optimized theme transitions
    initOptimizedTransitions();

    console.log('Client scripts initialized');
  }, []);

  // This component doesn't render anything visible
  return null;
};

export default ClientScript;
