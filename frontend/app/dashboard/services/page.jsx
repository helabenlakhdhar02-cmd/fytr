"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaUser, FaEdit, FaCog, FaChevronDown, FaBriefcase,
  FaLayerGroup, FaEye, FaStar, FaCertificate,
  FaGraduationCap, FaAward, FaTrophy, FaCode, FaLaptopCode, FaProjectDiagram,
  FaCalendarAlt, FaLink, FaExternalLinkAlt, FaPlus, FaChalkboardTeacher, FaUsers, FaBook,
  FaCamera, FaLinkedin, FaGlobe, FaTwitter, FaCheckCircle, FaTimesCircle, FaClock,
  FaFileAlt, FaComments, FaMoneyBillWave, FaTasks, FaFileUpload, FaTrash, FaCopy,
  FaTag, FaInfoCircle, FaLightbulb, FaShieldAlt, FaRocket
} from "react-icons/fa";

import Navbar from "../../../components/Navbar";
import { useAuth } from "../../../context/AuthContext";
import { useUser } from "../../../context/UserContext";
import Link from "next/link";

// Custom toast notification function
const showToast = (message, type = 'success') => {
  // Create a toast element
  const toast = document.createElement('div');
  toast.className = `fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${
    type === 'success' ? 'bg-green-500' : 'bg-red-500'
  } text-white transform transition-all duration-300 opacity-0 translate-y-2`;
  toast.textContent = message;

  // Add to DOM
  document.body.appendChild(toast);

  // Trigger animation
  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  }, 10);

  // Remove after delay
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(2px)';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
};

const TrainerServices = () => {
  const router = useRouter();
  const { userData: user, loading: userLoading } = useUser();
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    category: '',
    type: 'standard' // standard, premium, custom
  });

  // Mock data for services
  const mockServices = [
    {
      id: 1,
      title: 'React.js Fundamentals Training',
      description: 'Comprehensive training on React.js fundamentals including hooks, state management, and component lifecycle.',
      price: 120,
      duration: '4 weeks',
      category: 'Web Development',
      type: 'standard',
      isActive: true,
      rating: 4.8,
      completedSessions: 12
    },
    {
      id: 2,
      title: 'Advanced JavaScript Mentorship',
      description: 'One-on-one mentorship for advanced JavaScript concepts, design patterns, and performance optimization.',
      price: 200,
      duration: '8 weeks',
      category: 'Programming',
      type: 'premium',
      isActive: true,
      rating: 4.9,
      completedSessions: 8
    },
    {
      id: 3,
      title: 'Custom Web Development Workshop',
      description: 'Tailored workshop for teams looking to improve their web development skills with custom curriculum.',
      price: 350,
      duration: 'Custom',
      category: 'Team Training',
      type: 'custom',
      isActive: false,
      rating: 4.7,
      completedSessions: 5
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, you would fetch services from the API
        // For now, we'll use mock data
        setServices(mockServices);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle service creation
  const handleCreateService = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!newService.title || !newService.description || !newService.price || !newService.duration || !newService.category) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    // Create new service
    const newServiceObj = {
      id: services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1,
      ...newService,
      price: parseFloat(newService.price),
      isActive: true,
      rating: 0,
      completedSessions: 0
    };

    // Add to services list
    setServices(prev => [...prev, newServiceObj]);
    
    // Reset form and close modal
    setNewService({
      title: '',
      description: '',
      price: '',
      duration: '',
      category: '',
      type: 'standard'
    });
    setShowAddModal(false);
    
    showToast('Service created successfully');
  };

  // Handle service toggle (active/inactive)
  const handleToggleService = (id) => {
    setServices(prev => 
      prev.map(service => 
        service.id === id 
          ? { ...service, isActive: !service.isActive } 
          : service
      )
    );
    
    showToast('Service status updated');
  };

  // Get service type badge
  const getServiceTypeBadge = (type) => {
    switch (type) {
      case 'standard':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            <FaTag className="mr-1" size={10} />
            Standard
          </span>
        );
      case 'premium':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
            <FaShieldAlt className="mr-1" size={10} />
            Premium
          </span>
        );
      case 'custom':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            <FaLightbulb className="mr-1" size={10} />
            Custom
          </span>
        );
      default:
        return null;
    }
  };

  if (userLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Loading Services</h2>
          <p className="text-gray-600 dark:text-gray-400">Please wait while we load your services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Services</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage your training services and offerings
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Link 
              href="/dashboard/trainer-profile"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FaUser className="mr-2 -ml-1" />
              Back to Profile
            </Link>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FaPlus className="mr-2 -ml-1" />
              Add Service
            </button>
          </div>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => (
            <div 
              key={service.id} 
              className={`bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden border-t-4 ${
                service.type === 'standard' ? 'border-blue-500' : 
                service.type === 'premium' ? 'border-purple-500' : 'border-green-500'
              } ${!service.isActive ? 'opacity-75' : ''}`}
            >
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white truncate" title={service.title}>
                    {service.title}
                  </h2>
                  {getServiceTypeBadge(service.type)}
                </div>
              </div>
              
              <div className="px-6 py-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3" title={service.description}>
                  {service.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg text-center">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">${service.price}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Price</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg text-center">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{service.duration}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Duration</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">{service.category}</span>
                  </div>
                  {service.completedSessions > 0 && (
                    <div className="flex items-center">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            className={`w-3 h-3 ${
                              star <= Math.floor(service.rating)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-1 text-xs text-gray-600 dark:text-gray-400">
                        ({service.completedSessions})
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      service.isActive 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {service.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => router.push(`/dashboard/services/edit/${service.id}`)}
                      className="inline-flex items-center p-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      title="Edit Service"
                    >
                      <FaEdit size={14} />
                    </button>
                    <button
                      onClick={() => handleToggleService(service.id)}
                      className="inline-flex items-center p-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      title={service.isActive ? 'Deactivate Service' : 'Activate Service'}
                    >
                      {service.isActive ? <FaTimesCircle size={14} /> : <FaCheckCircle size={14} />}
                    </button>
                    <Link
                      href={`/services/${service.id}`}
                      className="inline-flex items-center p-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      title="View Public Page"
                    >
                      <FaEye size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Add Service Card (Quick Access) */}
          <div 
            onClick={() => setShowAddModal(true)}
            className="bg-gray-50 dark:bg-gray-800/50 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3">
              <FaPlus className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Add New Service</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Create a new training service or offering
            </p>
          </div>
        </div>
        
        {/* Add Service Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Add New Service</h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <FaTimesCircle size={20} />
                  </button>
                </div>
              </div>
              
              <form onSubmit={handleCreateService} className="px-6 py-4">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Service Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={newService.title}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows="3"
                      value={newService.description}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Price ($) *
                      </label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        min="0"
                        step="0.01"
                        value={newService.price}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Duration *
                      </label>
                      <input
                        type="text"
                        id="duration"
                        name="duration"
                        placeholder="e.g. 4 weeks"
                        value={newService.duration}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Category *
                    </label>
                    <input
                      type="text"
                      id="category"
                      name="category"
                      placeholder="e.g. Web Development"
                      value={newService.category}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Service Type *
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={newService.type}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                      required
                    >
                      <option value="standard">Standard</option>
                      <option value="premium">Premium</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Create Service
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainerServices;
