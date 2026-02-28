'use client';

import { useState, useEffect } from 'react';
import {
  FaSave,
  FaUndo,
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle,
  FaGlobe,
  FaUsers,
  FaShieldAlt,
  FaMoneyBillWave,
  FaPercentage,
  FaUserShield,
  FaFileContract,
  FaClipboardList
} from 'react-icons/fa';
import PageHeader from '../../../../components/admin/PageHeader';
import AdminSection from '../../../../components/admin/AdminSection';
import FormGroup from '../../../../components/admin/FormGroup';

export default function PlatformSettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Platform settings state
  const [settings, setSettings] = useState({
    // General settings
    platformName: '',
    supportEmail: '',
    contactPhone: '',
    maintenanceMode: false,

    // User settings
    allowUserRegistration: true,
    emailVerificationRequired: true,
    defaultUserRole: 'client',
    autoApproveTrainers: false,

    // Project settings
    minProjectBudget: 0,
    maxProjectBudget: 0,
    projectFeePercentage: 0,
    allowBettaArenaProjects: true,
    maxTeamSize: 0,

    // Content moderation
    autoModerateContent: true,
    profanityFilterLevel: 'medium',
    requireApprovalForCourses: true,

    // Terms and policies
    termsOfService: '',
    privacyPolicy: '',
    cookiePolicy: '',

    // Platform rules
    platformRules: []
  });

  // Mock platform rules
  const mockPlatformRules = [
    {
      id: 1,
      title: 'Respectful Communication',
      description: 'All users must communicate respectfully. Harassment, hate speech, or discriminatory language is not tolerated.',
      enabled: true
    },
    {
      id: 2,
      title: 'Quality Standards',
      description: 'All submitted work must meet professional quality standards. Low-quality submissions may be rejected.',
      enabled: true
    },
    {
      id: 3,
      title: 'Intellectual Property',
      description: 'Users must respect intellectual property rights. Plagiarism or copyright infringement will result in account suspension.',
      enabled: true
    },
    {
      id: 4,
      title: 'Payment Terms',
      description: 'Payments are processed within 7 days of project completion. Disputes must be filed within 14 days.',
      enabled: true
    },
    {
      id: 5,
      title: 'Account Sharing',
      description: 'Account sharing is prohibited. Each user must maintain their own individual account.',
      enabled: true
    }
  ];

  // Mock settings data
  const mockSettings = {
    platformName: 'Fytrlance',
    supportEmail: 'support@fytrlance.com',
    contactPhone: '+1 (555) 123-4567',
    maintenanceMode: false,

    allowUserRegistration: true,
    emailVerificationRequired: true,
    defaultUserRole: 'client',
    autoApproveTrainers: false,

    minProjectBudget: 50,
    maxProjectBudget: 10000,
    projectFeePercentage: 10,
    allowBettaArenaProjects: true,
    maxTeamSize: 6,

    autoModerateContent: true,
    profanityFilterLevel: 'medium',
    requireApprovalForCourses: true,

    termsOfService: 'These are the terms of service...',
    privacyPolicy: 'This is our privacy policy...',
    cookiePolicy: 'This is our cookie policy...',

    platformRules: mockPlatformRules
  };

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setSettings(mockSettings);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle rule toggle
  const handleRuleToggle = (ruleId) => {
    setSettings(prev => ({
      ...prev,
      platformRules: prev.platformRules.map(rule =>
        rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
      )
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 1500);
  };

  // Reset form to initial values
  const handleReset = () => {
    setSettings(mockSettings);
  };

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        title="Settings"
        description="Configure platform rules"
      />

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30 text-green-800 dark:text-green-300 rounded-lg p-4 flex items-start mb-6">
          <FaCheckCircle className="flex-shrink-0 mt-0.5 mr-3 text-green-500 dark:text-green-400" />
          <div>
            <h3 className="font-medium">Settings saved successfully</h3>
            <p className="text-sm mt-1">Your platform settings have been updated.</p>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <p className="mt-2 text-gray-500 dark:text-gray-400">Loading settings...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* General Settings */}
            <AdminSection
              title="General Settings"
              icon={<FaGlobe className="text-primary-600 dark:text-primary-400" />}
              className="mb-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormGroup
                  label="Platform Name"
                  htmlFor="platformName"
                >
                  <input
                    type="text"
                    id="platformName"
                    name="platformName"
                    value={settings.platformName}
                    onChange={handleInputChange}
                    className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </FormGroup>

                <FormGroup
                  label="Support Email"
                  htmlFor="supportEmail"
                >
                  <input
                    type="email"
                    id="supportEmail"
                    name="supportEmail"
                    value={settings.supportEmail}
                    onChange={handleInputChange}
                    className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </FormGroup>

                <FormGroup
                  label="Contact Phone"
                  htmlFor="contactPhone"
                >
                  <input
                    type="text"
                    id="contactPhone"
                    name="contactPhone"
                    value={settings.contactPhone}
                    onChange={handleInputChange}
                    className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </FormGroup>

                <FormGroup>
                  <div className="flex items-center h-full">
                    <input
                      type="checkbox"
                      id="maintenanceMode"
                      name="maintenanceMode"
                      checked={settings.maintenanceMode}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="maintenanceMode" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Enable Maintenance Mode
                    </label>
                  </div>
                </FormGroup>
              </div>
            </AdminSection>

            {/* User Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                <div className="flex items-center">
                  <FaUsers className="text-primary-600 dark:text-primary-400 mr-3" />
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">User Settings</h2>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="allowUserRegistration"
                      name="allowUserRegistration"
                      checked={settings.allowUserRegistration}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="allowUserRegistration" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Allow User Registration
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="emailVerificationRequired"
                      name="emailVerificationRequired"
                      checked={settings.emailVerificationRequired}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="emailVerificationRequired" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Require Email Verification
                    </label>
                  </div>
                  <div>
                    <label htmlFor="defaultUserRole" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Default User Role
                    </label>
                    <select
                      id="defaultUserRole"
                      name="defaultUserRole"
                      value={settings.defaultUserRole}
                      onChange={handleInputChange}
                      className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="client">Client</option>
                      <option value="freelancer">Freelancer</option>
                      <option value="formateur">Trainer</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="autoApproveTrainers"
                      name="autoApproveTrainers"
                      checked={settings.autoApproveTrainers}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="autoApproveTrainers" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Auto-approve Trainer Applications
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                <div className="flex items-center">
                  <FaMoneyBillWave className="text-primary-600 dark:text-primary-400 mr-3" />
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">Project & Payment Settings</h2>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="minProjectBudget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Minimum Project Budget ($)
                    </label>
                    <input
                      type="number"
                      id="minProjectBudget"
                      name="minProjectBudget"
                      value={settings.minProjectBudget}
                      onChange={handleInputChange}
                      min="0"
                      className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="maxProjectBudget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Maximum Project Budget ($)
                    </label>
                    <input
                      type="number"
                      id="maxProjectBudget"
                      name="maxProjectBudget"
                      value={settings.maxProjectBudget}
                      onChange={handleInputChange}
                      min="0"
                      className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="projectFeePercentage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Platform Fee Percentage (%)
                    </label>
                    <input
                      type="number"
                      id="projectFeePercentage"
                      name="projectFeePercentage"
                      value={settings.projectFeePercentage}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                      className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="maxTeamSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Maximum Team Size
                    </label>
                    <input
                      type="number"
                      id="maxTeamSize"
                      name="maxTeamSize"
                      value={settings.maxTeamSize}
                      onChange={handleInputChange}
                      min="1"
                      className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="allowBettaArenaProjects"
                      name="allowBettaArenaProjects"
                      checked={settings.allowBettaArenaProjects}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="allowBettaArenaProjects" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Enable BettaArena Projects
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Rules */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                <div className="flex items-center">
                  <FaClipboardList className="text-primary-600 dark:text-primary-400 mr-3" />
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">Platform Rules</h2>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-4">
                  {settings.platformRules.map((rule) => (
                    <div key={rule.id} className="flex items-start p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex-shrink-0 mt-0.5">
                        <input
                          type="checkbox"
                          id={`rule-${rule.id}`}
                          checked={rule.enabled}
                          onChange={() => handleRuleToggle(rule.id)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3">
                        <label htmlFor={`rule-${rule.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          {rule.title}
                        </label>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {rule.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <AdminSection className="flex justify-end space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center"
              >
                <FaUndo className="mr-2" />
                Reset
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg shadow-sm transition-colors duration-200 flex items-center"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave className="mr-2" />
                    Save Settings
                  </>
                )}
              </button>
            </AdminSection>
          </div>
        </form>
      )}
    </div>
  );
}
