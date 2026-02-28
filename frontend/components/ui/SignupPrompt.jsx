"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserPlus, FaArrowRight, FaTimes } from "react-icons/fa";
import { useAuth } from '../../context/AuthContext';

const SignupPrompt = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { openLoginModal } = useAuth();

  const handleDismiss = () => {
    setIsVisible(false);
  };

  const handleSignup = () => {
    openLoginModal();
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-lg overflow-hidden mb-6"
        >
          <div className="relative p-6">
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors"
              aria-label="Dismiss"
            >
              <FaTimes />
            </button>
            
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <FaUserPlus className="text-white text-2xl" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Join the FyterLance Community</h3>
                <p className="text-white/90 mb-4">
                  Create an account to connect with talented freelancers, post projects, and unlock all features.
                </p>
                
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleSignup}
                    className="px-4 py-2 bg-white text-primary-700 rounded-lg font-medium hover:bg-white/90 transition-colors flex items-center gap-2"
                  >
                    <span>Sign Up Now</span>
                    <FaArrowRight className="text-sm" />
                  </button>
                  
                  <button
                    onClick={handleDismiss}
                    className="px-4 py-2 bg-transparent border border-white/50 text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
                  >
                    Continue Browsing
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-primary-800 px-6 py-3 text-white/80 text-sm">
            <p>Already have an account? <button onClick={openLoginModal} className="text-white underline hover:text-white/90 transition-colors">Sign in</button></p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignupPrompt;
