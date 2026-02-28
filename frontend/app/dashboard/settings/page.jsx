'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../../../context/UserContext';
import Navbar from '../../../components/Navbar';
import {
  FaArrowLeft,
  FaBell,
  FaShieldAlt,
  FaEye,
  FaPalette,
  FaCog,
  FaPlug,
  FaUserCog,
  FaSave,
  FaCheck,
  FaTimes,
  FaToggleOn,
  FaToggleOff,
  FaGlobe,
  FaMoon,
  FaSun,
  FaDesktop,
  FaLock,
  FaClock,
  FaCalendarAlt,
  FaSlack,
  FaGithub,
  FaGoogle
} from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';

export default function SettingsPage() {
  const router = useRouter();
  const { userData, loading } = useUser();
  const [activeTab, setActiveTab] = useState('account');
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Simplified Settings state
  const [settings, setSettings] = useState({
    // Account settings
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    weeklyDigest: true,
    accountUpdates: true,

    // Privacy settings
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowDirectMessages: true,

    // Notification preferences
    projectUpdates: true,
    messageNotifications: true,
    courseNotifications: true,
    systemNotifications: true,

    // Theme settings
    theme: 'system',
    language: 'en',
    fontSize: 'medium',
    animationsEnabled: true,

    // Security settings
    twoFactorEnabled: false,
    loginAlerts: true,
    sessionTimeout: 30,

    // Productivity settings
    workingHoursEnabled: true,
    autoResponderEnabled: false,
    focusModeEnabled: false,
    timeTrackingEnabled: true,

    // Integration settings
    googleCalendarConnected: false,
    slackConnected: false,
    githubConnected: false,
  });

  useEffect(() => {
    // Load user settings from localStorage or API
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      setSettings(prev => ({ ...prev, ...JSON.parse(savedSettings) }));
    }
  }, []);

  const handleSettingChange = (key, value) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: value };
      localStorage.setItem('userSettings', JSON.stringify(newSettings));
      return newSettings;
    });
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('userSettings', JSON.stringify(settings));
      toast.success('Settings saved successfully!');
      setHasChanges(false);
    } catch (error) {
      toast.error('Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const ToggleSwitch = ({ enabled, onChange, label, description }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white">{label}</h4>
        {description && (
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        )}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  const SelectField = ({ value, onChange, options, label, description }) => (
    <div className="py-3">
      <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
        {label}
      </label>
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{description}</p>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  const tabs = [
    { id: 'account', label: 'Account', icon: FaUserCog },
    { id: 'privacy', label: 'Privacy', icon: FaEye },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'theme', label: 'Appearance', icon: FaPalette },
    { id: 'security', label: 'Security', icon: FaShieldAlt },
    { id: 'productivity', label: 'Productivity', icon: FaCog },
    { id: 'integrations', label: 'Integrations', icon: FaPlug },
  ];

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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
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
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your account preferences and privacy settings
          </p>
        </div>

        {/* Save Button - Fixed at top when changes detected */}
        {hasChanges && (
          <div className="fixed top-20 right-6 z-50">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors disabled:opacity-50"
            >
              {isSaving ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <FaSave />
              )}
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Account Settings */}
            {activeTab === 'account' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Account Notifications
                  </h3>
                  <div className="space-y-1">
                    <ToggleSwitch
                      enabled={settings.emailNotifications}
                      onChange={(value) => handleSettingChange('emailNotifications', value)}
                      label="Email Notifications"
                      description="Receive notifications via email"
                    />
                    <ToggleSwitch
                      enabled={settings.pushNotifications}
                      onChange={(value) => handleSettingChange('pushNotifications', value)}
                      label="Push Notifications"
                      description="Receive push notifications in your browser"
                    />
                    <ToggleSwitch
                      enabled={settings.marketingEmails}
                      onChange={(value) => handleSettingChange('marketingEmails', value)}
                      label="Marketing Emails"
                      description="Receive promotional emails and updates"
                    />
                    <ToggleSwitch
                      enabled={settings.weeklyDigest}
                      onChange={(value) => handleSettingChange('weeklyDigest', value)}
                      label="Weekly Digest"
                      description="Get a weekly summary of your activity"
                    />
                    <ToggleSwitch
                      enabled={settings.accountUpdates}
                      onChange={(value) => handleSettingChange('accountUpdates', value)}
                      label="Account Updates"
                      description="Important updates about your account"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Profile Privacy
                  </h3>
                  <div className="space-y-4">
                    <SelectField
                      value={settings.profileVisibility}
                      onChange={(value) => handleSettingChange('profileVisibility', value)}
                      label="Profile Visibility"
                      description="Control who can see your profile"
                      options={[
                        { value: 'public', label: 'Public - Anyone can see your profile' },
                        { value: 'clients', label: 'Clients Only - Only clients can see your profile' },
                        { value: 'private', label: 'Private - Only you can see your profile' }
                      ]}
                    />
                    <ToggleSwitch
                      enabled={settings.showEmail}
                      onChange={(value) => handleSettingChange('showEmail', value)}
                      label="Show Email Address"
                      description="Display your email address on your public profile"
                    />
                    <ToggleSwitch
                      enabled={settings.showPhone}
                      onChange={(value) => handleSettingChange('showPhone', value)}
                      label="Show Phone Number"
                      description="Display your phone number on your public profile"
                    />
                    <ToggleSwitch
                      enabled={settings.allowDirectMessages}
                      onChange={(value) => handleSettingChange('allowDirectMessages', value)}
                      label="Allow Direct Messages"
                      description="Allow clients to send you direct messages"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Notification Preferences */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Notification Preferences
                  </h3>
                  <div className="space-y-1">
                    <ToggleSwitch
                      enabled={settings.projectUpdates}
                      onChange={(value) => handleSettingChange('projectUpdates', value)}
                      label="Project Updates"
                      description="Get notified about project milestones and updates"
                    />
                    <ToggleSwitch
                      enabled={settings.messageNotifications}
                      onChange={(value) => handleSettingChange('messageNotifications', value)}
                      label="Message Notifications"
                      description="Get notified when you receive new messages"
                    />
                    <ToggleSwitch
                      enabled={settings.courseNotifications}
                      onChange={(value) => handleSettingChange('courseNotifications', value)}
                      label="Course Notifications"
                      description="Get notified about course enrollments and comments"
                    />
                    <ToggleSwitch
                      enabled={settings.systemNotifications}
                      onChange={(value) => handleSettingChange('systemNotifications', value)}
                      label="System Notifications"
                      description="Get notified about system updates and maintenance"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Theme Settings */}
            {activeTab === 'theme' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Appearance Settings
                  </h3>
                  <div className="space-y-4">
                    <SelectField
                      value={settings.theme}
                      onChange={(value) => handleSettingChange('theme', value)}
                      label="Theme"
                      description="Choose your preferred color scheme"
                      options={[
                        { value: 'light', label: 'Light Mode' },
                        { value: 'dark', label: 'Dark Mode' },
                        { value: 'system', label: 'System Default' }
                      ]}
                    />
                    <SelectField
                      value={settings.language}
                      onChange={(value) => handleSettingChange('language', value)}
                      label="Language"
                      description="Choose your preferred language"
                      options={[
                        { value: 'en', label: 'English' },
                        { value: 'ar', label: 'العربية' },
                        { value: 'fr', label: 'Français' }
                      ]}
                    />
                    <SelectField
                      value={settings.fontSize}
                      onChange={(value) => handleSettingChange('fontSize', value)}
                      label="Font Size"
                      description="Adjust the text size for better readability"
                      options={[
                        { value: 'small', label: 'Small' },
                        { value: 'medium', label: 'Medium' },
                        { value: 'large', label: 'Large' }
                      ]}
                    />
                    <ToggleSwitch
                      enabled={settings.animationsEnabled}
                      onChange={(value) => handleSettingChange('animationsEnabled', value)}
                      label="Enable Animations"
                      description="Show smooth transitions and animations"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Security Settings
                  </h3>
                  <div className="space-y-4">
                    <ToggleSwitch
                      enabled={settings.twoFactorEnabled}
                      onChange={(value) => handleSettingChange('twoFactorEnabled', value)}
                      label="Two-Factor Authentication"
                      description="Add an extra layer of security to your account"
                    />
                    <ToggleSwitch
                      enabled={settings.loginAlerts}
                      onChange={(value) => handleSettingChange('loginAlerts', value)}
                      label="Login Alerts"
                      description="Get notified when someone logs into your account"
                    />
                    <SelectField
                      value={settings.sessionTimeout}
                      onChange={(value) => handleSettingChange('sessionTimeout', parseInt(value))}
                      label="Session Timeout"
                      description="Automatically log out after period of inactivity"
                      options={[
                        { value: '15', label: '15 minutes' },
                        { value: '30', label: '30 minutes' },
                        { value: '60', label: '1 hour' },
                        { value: '120', label: '2 hours' },
                        { value: '0', label: 'Never' }
                      ]}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Productivity Settings */}
            {activeTab === 'productivity' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Productivity Features
                  </h3>
                  <div className="space-y-1">
                    <ToggleSwitch
                      enabled={settings.workingHoursEnabled}
                      onChange={(value) => handleSettingChange('workingHoursEnabled', value)}
                      label="Working Hours"
                      description="Set your availability hours for clients"
                    />
                    <ToggleSwitch
                      enabled={settings.autoResponderEnabled}
                      onChange={(value) => handleSettingChange('autoResponderEnabled', value)}
                      label="Auto Responder"
                      description="Automatically respond to messages when unavailable"
                    />
                    <ToggleSwitch
                      enabled={settings.focusModeEnabled}
                      onChange={(value) => handleSettingChange('focusModeEnabled', value)}
                      label="Focus Mode"
                      description="Minimize distractions during work hours"
                    />
                    <ToggleSwitch
                      enabled={settings.timeTrackingEnabled}
                      onChange={(value) => handleSettingChange('timeTrackingEnabled', value)}
                      label="Time Tracking"
                      description="Track time spent on projects automatically"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Integration Settings */}
            {activeTab === 'integrations' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Connected Services
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FaGoogle className="text-red-500 text-xl" />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Google Calendar</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Sync your schedule and meetings</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleSettingChange('googleCalendarConnected', !settings.googleCalendarConnected)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          settings.googleCalendarConnected
                            ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400'
                            : 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400'
                        }`}
                      >
                        {settings.googleCalendarConnected ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FaSlack className="text-purple-500 text-xl" />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Slack</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Get notifications in your Slack workspace</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleSettingChange('slackConnected', !settings.slackConnected)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          settings.slackConnected
                            ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400'
                            : 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400'
                        }`}
                      >
                        {settings.slackConnected ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FaGithub className="text-gray-900 dark:text-white text-xl" />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">GitHub</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Connect your GitHub repositories</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleSettingChange('githubConnected', !settings.githubConnected)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          settings.githubConnected
                            ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400'
                            : 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400'
                        }`}
                      >
                        {settings.githubConnected ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
