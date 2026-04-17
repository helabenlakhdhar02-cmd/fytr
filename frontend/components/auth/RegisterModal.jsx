'use client';

import { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaEye, FaEyeSlash, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { registerUser } from '../../lib/auth';
import Modal from '../ui/Modal';
import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE_URL } from '../../config/api';
export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [usernames, setUsernames] = useState([]);

  const [formData, setFormData] = useState({
    role: '',
    username: '',
    email: '',
    date_of_birth: '',
    gender: '',
    password: '',
    first_name: '',
    last_name: '',
    phone: '',
    region: ''
  });

  // Fetch usernames when modal opens
  useEffect(() => {
    if (isOpen) {
      fetch(`${API_BASE_URL}/fyter/usernames/`) 
        .then(res => res.json())
        .then(data => setUsernames(data.usernames || []))
        .catch(() => setUsernames([]));
    }
  }, [isOpen]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user types
    if (error) setError('');
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Check if username is taken
  const isUsernameTaken = (username) => {
    return usernames.includes(username);
  };

  // Validate current step
  const validateStep = () => {
    if (currentStep === 1) {
      if (!formData.role) {
        setError('Please select a role');
        return false;
      }
    } else if (currentStep === 2) {
      if (!formData.username || !formData.email || !formData.password) {
        setError('Please fill in all required fields');
        return false;
      }
      if (isUsernameTaken(formData.username)) {
        setError('Username is already taken');
        return false;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Please enter a valid email address');
        return false;
      }

      // Password validation (at least 8 characters)
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters long');
        return false;
      }
    } else if (currentStep === 3) {
      if (!formData.first_name || !formData.last_name || !formData.region) {
        setError('Please fill in all required fields');
        return false;
      }
    }

    setError('');
    return true;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsLoading(true);
    try {
      const response = await registerUser(formData);
      console.log('Registration successful:', response);

      // Show success message
      setError('');
      alert('Registration successful! Please log in with your new account.');

      onClose(); // Close the modal
      onSwitchToLogin(); // Switch to login modal
    } catch (error) {
      console.error('Registration failed', error);
      if (error.response?.data?.error === 'Username already exists') {
        setError('Username already exists');
      } else if (error.response?.data?.error === 'Email already exists') {
        setError('Email already exists');
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Navigation between steps
  const nextStep = () => {
    if (currentStep < 3 && validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Animation variants
  const slideVariants = {
    hidden: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      transition: { duration: 0.2 }
    })
  };

  // Custom direction for animations
  const [direction, setDirection] = useState(1);

  // Step content
  const renderStepContent = () => {
    return (
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentStep}
          custom={direction}
          variants={slideVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="overflow-hidden"
        >
          {currentStep === 1 && (
            <div className="space-y-2">
              <h3 className="text-center text-base font-medium text-gray-900 dark:text-white">Choose your role</h3>

              <div className="grid grid-cols-1 gap-2">
                {['freelancer', 'client', 'Trainer'].map((role) => (
                  <button
                    key={role}
                    type="button"
                    className={`p-2 border rounded-lg text-left transition-all ${
                      formData.role === role
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 ring-1 ring-primary-500'
                        : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setFormData({ ...formData, role })}
                  >
                    <div className="font-medium text-gray-900 dark:text-white capitalize text-sm">{role}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {role === 'freelancer' && 'Find work and grow your career'}
                      {role === 'client' && 'Hire talent and get your projects done'}
                      {role === 'Trainer' && 'Share your knowledge and train others'}
                    </div>
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  if (validateStep()) {
                    setDirection(1);
                    nextStep();
                  }
                }}
                className="w-full bg-[#03081C] text-white py-1.5 rounded-md hover:bg-gray-800 transition-colors mt-2 text-sm"
                disabled={!formData.role}
              >
                Next
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-2">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-0.5 text-xs">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-3 py-1.5 border rounded-lg focus:outline-none text-black focus:ring-1 focus:ring-blue-500 text-sm"
                  placeholder="Example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-0.5 text-xs">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  className="w-full px-3 py-1.5 border rounded-lg focus:outline-none text-black focus:ring-1 focus:ring-blue-500 text-sm"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                {formData.username && isUsernameTaken(formData.username) && (
                  <div className="text-xs text-red-500 mt-1">
                    Username is already taken
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-0.5 text-xs">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="w-full px-3 py-1.5 border rounded-lg focus:outline-none text-black focus:ring-1 focus:ring-blue-500 pr-10 text-sm"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 focus:outline-none"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between mt-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setDirection(-1);
                    prevStep();
                  }}
                  className="px-3 py-1.5 text-gray-600 dark:text-gray-300 flex items-center justify-center gap-1 hover:underline text-sm"
                >
                  <FaArrowLeft size={10} /> Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (validateStep()) {
                      setDirection(1);
                      nextStep();
                    }
                  }}
                  className="w-24 bg-[#03081C] text-white py-1.5 rounded-md hover:bg-gray-800 transition-colors text-sm"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-0.5 text-xs">
                    First Name*
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    className="w-full px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
                    placeholder="First name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-0.5 text-xs">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    className="w-full px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
                    placeholder="Last name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-0.5 text-xs">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
                  placeholder="Your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-0.5 text-xs">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="date_of_birth"
                    className="w-full px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-0.5 text-xs">
                    Gender
                  </label>
                  <select
                    name="gender"
                    className="w-full px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-0.5 text-xs">
                  Region*
                </label>
                <input
                  type="text"
                  name="region"
                  className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
                  placeholder="Your region"
                  value={formData.region}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex justify-between mt-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setDirection(-1);
                    prevStep();
                  }}
                  className="px-3 py-1.5 text-gray-600 dark:text-gray-300 flex items-center justify-center gap-1 hover:underline text-sm"
                >
                  <FaArrowLeft size={10} /> Back
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-32 bg-[#03081C] text-white py-1.5 rounded-md hover:bg-gray-800 transition-colors text-sm"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showHeader={false}
      imageSrc="/photos/fighterfish.jpg"
    >
      <div className="w-full max-w-sm mx-auto px-2 py-3">
        <div className="text-center mb-1">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Create an account</h2>
          <p className="text-gray-600 dark:text-gray-400 text-xs">
            <button
              onClick={onSwitchToLogin}
              className="text-blue-500 dark:text-blue-400 hover:underline focus:outline-none"
            >
              Already have an account? Login
            </button>
          </p>
        </div>

        {/* Progress indicator - Compact */}
        <div className="mb-2">
          <div className="flex justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium ${
                    currentStep >= step
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {step}
                </div>
                <div className="text-[9px] mt-0.5 text-gray-600 dark:text-gray-400">
                  {step === 1 && 'Role'}
                  {step === 2 && 'Account'}
                  {step === 3 && 'Profile'}
                </div>
              </div>
            ))}
          </div>
          <div className="relative w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full mt-0.5">
            <div
              className="absolute top-0 left-0 h-full bg-primary-600 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <motion.div
            className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-2 rounded-md text-xs mb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        {/* Step content */}
        <form onSubmit={(e) => e.preventDefault()}>
          {renderStepContent()}
        </form>
      </div>
    </Modal>
  );
}

