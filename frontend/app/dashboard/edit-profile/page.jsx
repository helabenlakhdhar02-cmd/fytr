'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../../../context/UserContext';
import { updateProfile } from '../../../lib/auth';
import Navbar from '../../../components/Navbar';
import {
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaVenusMars,
  FaStar,
  FaLink,
  FaEdit,
  FaSave,
  FaTimes,
  FaCamera,
  FaSpinner,
  FaCheck,
  FaExclamationTriangle
} from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function EditProfilePage() {
  const router = useRouter();
  const { userData, loading, refreshUserData } = useUser();
  const fileInputRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [activeSection, setActiveSection] = useState('personal');
  const [errors, setErrors] = useState({});

  const [profile, setProfile] = useState({
    email: '',
    full_name: '',
    phone: '',
    region: '',
    profileImg: '',
    gender: '',
    date_of_birth: '',
    skills: '',
    rate: '',
    level: '',
    score: '',
    portfolio_link: '',
    bio: '',
  });

  useEffect(() => {
    if (userData) {
      setProfile({
        email: userData.email || '',
        full_name: userData.full_name || '',
        phone: userData.phone || '',
        region: userData.region || '',
        profileImg: userData.profileImg || '',
        gender: userData.gender || '',
        date_of_birth: userData.date_of_birth || '',
        skills: userData.role_details?.skills || '',
        rate: userData.role_details?.rate || '',
        level: userData.role_details?.level || '',
        score: userData.role_details?.score || '',
        portfolio_link: userData.role_details?.portfolio_link || '',
        bio: userData.role_details?.bio || '',
      });
      setImagePreview(userData.profileImg);
    }
  }, [userData]);

  const validateForm = () => {
    const newErrors = {};

    if (!profile.full_name.trim()) {
      newErrors.full_name = 'Full name is required';
    }

    if (!profile.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(profile.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (profile.portfolio_link && !/^https?:\/\/.+/.test(profile.portfolio_link)) {
      newErrors.portfolio_link = 'Portfolio link must be a valid URL';
    }

    if (profile.rate && (isNaN(profile.rate) || profile.rate < 0)) {
      newErrors.rate = 'Rate must be a valid positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      const file = files[0];
      if (file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          toast.error('Please select a valid image file');
          return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast.error('Image size must be less than 5MB');
          return;
        }

        setProfile(prev => ({ ...prev, [name]: file }));

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => setImagePreview(e.target.result);
        reader.readAsDataURL(file);
      }
    } else {
      setProfile(prev => ({ ...prev, [name]: value }));
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors before submitting');
      return;
    }

    setIsSaving(true);

    const formData = new FormData();
    Object.keys(profile).forEach(key => {
      if (profile[key] !== null && profile[key] !== undefined) {
        formData.append(key, profile[key]);
      }
    });

    try {
      const response = await updateProfile(formData);
      if (response.status === 200) {
        toast.success('Profile updated successfully!');
        refreshUserData();
        router.push('/dashboard/profile');
      } else {
        toast.error('Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const InputField = ({ label, name, type = 'text', placeholder, required = false, icon: Icon, ...props }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          type={type}
          name={name}
          value={profile[name] || ''}
          onChange={handleChange}
          placeholder={placeholder}
          className={`block w-full ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            errors[name]
              ? 'border-red-300 dark:border-red-600'
              : 'border-gray-300 dark:border-gray-600'
          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
          {...props}
        />
      </div>
      {errors[name] && (
        <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
          <FaExclamationTriangle className="w-3 h-3" />
          {errors[name]}
        </p>
      )}
    </div>
  );

  const TextAreaField = ({ label, name, placeholder, rows = 4, required = false }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        name={name}
        value={profile[name] || ''}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
          errors[name]
            ? 'border-red-300 dark:border-red-600'
            : 'border-gray-300 dark:border-gray-600'
        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-vertical`}
      />
      {errors[name] && (
        <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
          <FaExclamationTriangle className="w-3 h-3" />
          {errors[name]}
        </p>
      )}
    </div>
  );

  const SelectField = ({ label, name, options, required = false, icon: Icon }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <select
          name={name}
          value={profile[name] || ''}
          onChange={handleChange}
          className={`block w-full ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            errors[name]
              ? 'border-red-300 dark:border-red-600'
              : 'border-gray-300 dark:border-gray-600'
          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
        >
          <option value="">Select {label}</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {errors[name] && (
        <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
          <FaExclamationTriangle className="w-3 h-3" />
          {errors[name]}
        </p>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
          >
            <FaArrowLeft />
            <span>Back</span>
          </button>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Edit Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Update your personal information and professional details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Image Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Profile Picture
            </h2>

            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUser className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-colors"
                >
                  <FaCamera className="w-3 h-3" />
                </button>
              </div>

              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                  Upload new picture
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  JPG, PNG or GIF. Max size 5MB.
                </p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Choose File
                  </button>
                  {imagePreview && (
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setProfile(prev => ({ ...prev, profileImg: '' }));
                      }}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                name="profileImg"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Section Navigation */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex">
                {[
                  { id: 'personal', label: 'Personal Info', icon: FaUser },
                  { id: 'professional', label: 'Professional', icon: FaStar },
                ].map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                        activeSection === section.id
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {section.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-6">
              {/* Personal Information */}
              {activeSection === 'personal' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      label="Full Name"
                      name="full_name"
                      placeholder="Enter your full name"
                      required
                      icon={FaUser}
                    />

                    <InputField
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                      icon={FaEnvelope}
                    />

                    <InputField
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      icon={FaPhone}
                    />

                    <InputField
                      label="Region"
                      name="region"
                      placeholder="Enter your region/city"
                      icon={FaMapMarkerAlt}
                    />

                    <InputField
                      label="Date of Birth"
                      name="date_of_birth"
                      type="date"
                      icon={FaCalendarAlt}
                    />

                    <SelectField
                      label="Gender"
                      name="gender"
                      icon={FaVenusMars}
                      options={[
                        { value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' },
                        { value: 'other', label: 'Other' },
                        { value: 'prefer_not_to_say', label: 'Prefer not to say' }
                      ]}
                    />
                  </div>
                </div>
              )}

              {/* Professional Information */}
              {activeSection === 'professional' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Professional Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <TextAreaField
                        label="Skills"
                        name="skills"
                        placeholder="List your skills (e.g., JavaScript, React, Node.js)"
                        rows={3}
                      />
                    </div>

                    <InputField
                      label="Hourly Rate ($)"
                      name="rate"
                      type="number"
                      placeholder="Enter your hourly rate"
                      min="0"
                      step="0.01"
                    />

                    <SelectField
                      label="Experience Level"
                      name="level"
                      options={[
                        { value: 'beginner', label: 'Beginner' },
                        { value: 'intermediate', label: 'Intermediate' },
                        { value: 'advanced', label: 'Advanced' },
                        { value: 'expert', label: 'Expert' }
                      ]}
                    />

                    <div className="md:col-span-2">
                      <InputField
                        label="Portfolio Link"
                        name="portfolio_link"
                        type="url"
                        placeholder="https://your-portfolio.com"
                        icon={FaLink}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <TextAreaField
                        label="Bio"
                        name="bio"
                        placeholder="Tell us about yourself and your experience..."
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <FaSpinner className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <FaSave className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
