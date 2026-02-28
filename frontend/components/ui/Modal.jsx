'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

export default function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-4xl', showHeader = true, imageSrc }) {
  const modalRef = useRef(null);
  const containerRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      // Restore scrolling when modal is closed
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  // Close modal on escape key press
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  };

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        type: 'tween',
        ease: 'easeOut',
        duration: 0.25
      }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2, ease: 'easeIn' }
    }
  };

  // Adjust max width for mobile
  const responsiveMaxWidth = maxWidth === 'max-w-4xl' ? 'max-w-[95%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl' : maxWidth;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          ref={containerRef}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden px-4 mx-auto"
        >
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-[2px]"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            className={`relative bg-white dark:bg-gray-800 shadow-lg ${responsiveMaxWidth} w-full z-10 flex flex-col md:flex-row border border-gray-100 dark:border-gray-700 my-auto overflow-hidden`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              overflow: 'visible',
              maxHeight: 'calc(100vh - 120px)',
              borderRadius: '8px'
            }}
          >
            {/* Left Side - Content */}
            <div className="w-full md:w-1/2 flex flex-col h-auto max-h-[calc(100vh-120px)] overflow-auto" style={{ borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' }}>
              {/* Header (optional) */}
              {showHeader && (
                <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
                  <button
                    onClick={onClose}
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none transition-all p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    aria-label="Close"
                  >
                    <FiX size={20} />
                  </button>
                </div>
              )}

              {/* Content */}
              <div className="p-4 flex-grow overflow-y-auto">
                {!showHeader && (
                  <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none z-20 p-1.5 bg-white dark:bg-gray-800 rounded-md shadow-sm hover:shadow transition-all"
                    aria-label="Close"
                    style={{ borderRadius: '8px' }}
                  >
                    <FiX size={20} />
                  </button>
                )}
                {children}
              </div>
            </div>

            {/* Right Side - Image (if provided) */}
            {imageSrc && (
              <div className="hidden md:flex md:w-1/2 bg-gradient-to-b from-[#051428] to-[#0a1a3a] flex-col items-center justify-center overflow-hidden h-auto p-8 relative" style={{ borderTopRightRadius: '8px', borderBottomRightRadius: '8px', backgroundImage: `url(${imageSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                {/* Overlay to darken the image */}
                <div className="absolute inset-0 bg-[#051428]/70"></div>

                {/* Subtle water-like light effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {/* Top left light */}
                  <motion.div
                    className="absolute -top-10 -left-10 w-60 h-60 rounded-full bg-blue-300 opacity-15 blur-xl"
                    animate={{
                      x: [0, 10, 0],
                      y: [0, 5, 0]
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                  ></motion.div>

                  {/* Bottom right light */}
                  <motion.div
                    className="absolute bottom-0 right-0 w-60 h-60 rounded-full bg-blue-200 opacity-10 blur-xl"
                    animate={{
                      x: [0, -8, 0],
                      y: [0, -8, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                  ></motion.div>

                  {/* Center right light */}
                  <motion.div
                    className="absolute top-1/3 right-10 w-40 h-40 rounded-full bg-blue-100 opacity-10 blur-lg"
                    animate={{
                      x: [0, 5, 0],
                      y: [0, -5, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                  ></motion.div>

                  {/* Subtle water ripple effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/5"></div>
                </div>

                <div className="flex-grow flex items-center justify-center w-full relative z-10 mt-8">
                  <motion.img
                    src="/fighterfish.png"
                    alt="Betta fish"
                    className="w-auto max-h-[60%] max-w-[60%] object-contain"
                    initial={{ y: 10, opacity: 0.8 }}
                    animate={{
                      y: [0, -5, 0],
                      opacity: 1
                    }}
                    transition={{
                      y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                      opacity: { duration: 1 }
                    }}
                  />
                </div>
                <div className="text-white text-center mt-8 mb-4 relative z-10">
                  <h3 className="text-2xl font-bold mb-2">Join the FytrLance Community</h3>
                  <p className="text-white/80">Connect with top clients and grow your career</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
