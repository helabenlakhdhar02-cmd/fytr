'use client';
import { PostCard } from '../../components/ui/Post'

import { useState, useEffect } from 'react';
import RegularPost from './RegularPost';
import ClabteServicePost from './ClabteServicePost';
import FormationPost from './FormationPost';
import { useAuth } from '../../context/AuthContext'

// Import AddPostModel instead of CreatePostForm
import AddPostModel from '../Pages/AddPostModel';
import { FaFilter, FaSpinner, FaPlus } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '../../config/api';
import jwt from 'jsonwebtoken';
export default function PostFeed({ userRole = 'freelancer' }) {
  const [isUpdated, setIsUpdated] = useState(false)
  const { isAuthenticated } = useAuth();



  const [token, setToken] = useState(null);

  const [user, setUser] = useState(null);
  useEffect(() => {
    const accessToken = Cookies.get('access_token');
    if (accessToken) {
      const decoded = jwt.decode(accessToken);
      console.log('User from token:', decoded.user);
      setUser(decoded.user);
    }
  }, [token]);
  const [posts, setPosts] = useState([]);


  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'regular', 'clabte', 'formation'
  const [modalOpen, setModalOpen] = useState(false);
  const [updated, setUpdated] = useState(false); // to trigger re-fetch on new post

  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [applyMessage, setApplyMessage] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [applyLoading, setApplyLoading] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);
  const [applyError, setApplyError] = useState('');
  const [contactError, setContactError] = useState('');
  const [applySuccess, setApplySuccess] = useState('');
  const [contactSuccess, setContactSuccess] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const postsResponse = await fetch(`${API_BASE_URL}/fyter/posts/`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });

        if (postsResponse.ok) {
          const postsData = await postsResponse.json();
          setPosts(postsData);
        } else {
          console.error('Failed to fetch posts');
        }

        // Fetch projects
        const projectsResponse = await fetch(`${API_BASE_URL}/fyter/public/projects/`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });

        if (projectsResponse.ok) {
          const projectsData = await projectsResponse.json();
          setProjects(projectsData);
        } else {
          console.error('Failed to fetch projects');
        }

        // Fetch services
        const servicesResponse = await fetch(`${API_BASE_URL}/fyter/public/services/`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });

        if (servicesResponse.ok) {
          const servicesData = await servicesResponse.json();
          setServices(servicesData);
        } else {
          console.error('Failed to fetch services');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [updated]); // refetch when updated changes

  
    if (isUpdated) {
      const fetchPosts = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/fyter/posts/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          });

          if (response.ok) {
            const postsData = await response.json();
            setPosts(postsData);
          }
        } catch (error) {
          console.error("An error occurred:", error);
        } finally {
          setIsUpdated(false);
        }
      };

      fetchPosts();
    }


  // This function can be passed to AddPostModel to toggle update and close modal
  const handlePostCreated = () => {
    setUpdated(prev => !prev); // toggle to trigger re-fetch
    setModalOpen(false); // close modal after successful post
  };

  const renderEmptyState = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 p-8 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No posts found</h3>
      <p className="text-gray-600 dark:text-gray-400">
        {filter === 'all'
          ? "There are no posts to display. Be the first to create a post!"
          : `There are no ${filter} posts to display.`}
      </p>
    </div>
  );

  // For contacting a service
  const handleContactService = (serviceId) => {
    setSelectedServiceId(serviceId);
    setContactModalOpen(true);
    setContactMessage('');
    setContactError('');
    setContactSuccess('');
  };

  // For applying to a project
  const handleApplyProject = (project) => {
    setSelectedProject(project);
    setApplyModalOpen(true);
    setApplyMessage('');
    setApplyError('');
    setApplySuccess('');
  };

  // Submit contact
  const submitContact = async () => {
    if (!contactMessage.trim()) {
      setContactError('Please enter a message.');
      return;
    }
    setContactLoading(true);
    setContactError('');
    setContactSuccess('');
    try {
      const res = await fetch(`${API_BASE_URL}/fyter/services/${selectedServiceId}/contact/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('access_token')}`,
        },
        body: JSON.stringify({ message: contactMessage }),
      });
      const data = await res.json();
      if (res.ok) {
        setContactSuccess('Message sent! Chatroom created.');
        setContactModalOpen(false);
        // Optionally: redirect to chatroom or refresh chat list
      } else {
        setContactError(data.error || 'Failed to contact.');
      }
    } catch (err) {
      setContactError('Network error.');
    } finally {
      setContactLoading(false);
    }
  };

  // Submit application
  const submitApply = async () => {
    setApplyLoading(true);
    setApplyError('');
    setApplySuccess('');
    try {
      let endpoint = '';
      if (selectedProject.type === 'bettaArena') {
        endpoint = `${API_BASE_URL}/fyter/projects/${selectedProject.id}/apply/bettaarena/`;
      } else if (selectedProject.type === 'soloFin') {
        endpoint = `${API_BASE_URL}/fyter/projects/${selectedProject.id}/apply/solofin/`;
      } else {
        // fallback for normal projects if needed
        endpoint = `${API_BASE_URL}/fyter/projects/${selectedProject.id}/apply/bettaarena/`;
      }
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('access_token')}`,
        },
        body: JSON.stringify({ message: applyMessage }),
      });
      const data = await res.json();
      if (res.ok) {
        setApplySuccess('Application sent!');
        setTimeout(() => setApplyModalOpen(false), 1000);
      } else {
        setApplyError(data.error || 'Failed to apply.');
      }
    } catch (err) {
      setApplyError('Network error.');
    } finally {
      setApplyLoading(false);
    }
  };

  return (
    <div>
      {/* Button to open modal */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          <FaPlus /> Create Post
        </button>
      </div>

      {/* AddPostModel modal */}
      <AddPostModel
        show={modalOpen}
        onHide={() => setModalOpen(false)}   // <-- change onClose to onHide
        setUpdated={handlePostCreated}
        userRole={userRole}
        user={user}
      />

      {/* Filter Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 mb-6 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Posts</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${filter === 'all'
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('regular')}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${filter === 'regular'
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              Regular
            </button>
            <button
              onClick={() => setFilter('clabte')}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${filter === 'clabte'
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              Projects
            </button>
            <button
              onClick={() => setFilter('services')}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${filter === 'services'
                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              Services
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <FaSpinner className="animate-spin text-blue-600 dark:text-blue-400 text-2xl" />
          </div>
        ) : (
          <>
            {(filter === 'all' || filter === 'regular') && posts.length > 0 && posts.map(post => (
              <motion.div
                key={`post-${post.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <PostCard key={post.id} post={post} setUpdated={setIsUpdated} isAuthenticated={isAuthenticated} />

              </motion.div>
            ))}

            {(filter === 'all' || filter === 'services') && services.length > 0 && (
              <div className="space-y-6">
                {services.map((service, index) => (
                  <div
                    key={service.id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex flex-col p-6"
                  >
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                        <img
                          src={service.freelancer?.user?.profileImg || "/fighterfish.png"}
                          alt="Freelancer"
                          className="w-full h-full object-cover"
                          onError={e => { e.target.onerror = null; e.target.src = "/fighterfish.png"; }}
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white text-sm">{service.freelancer?.user?.full_name || "Freelancer"}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{service.category}</div>
                      </div>
                      {/* Price always visible on the right */}
                      <div className="ml-auto text-lg font-bold text-primary-600 dark:text-primary-400">
                        From ${service.price || service.budget || 0}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{service.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {service.technologies?.split(',').map((tech, i) => (
                        <span key={i} className="px-2 py-0.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-xs">{tech.trim()}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{service.skills}</span>
                    </div>
                    {/* Role-based button: Contacter for clients */}
                    {user?.role === "client" ? (
                      <button
                        className="w-full py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all duration-300 font-medium shadow-md"
                        onClick={() => handleContactService(service.id)}
                      >
                        Contacter
                      </button>
                    ) : (
                      <button className="w-full py-2 bg-gray-400 text-white rounded-lg font-medium cursor-not-allowed" disabled>
                        Contacter
                      </button>
                    )
                    }
                  </div>
                ))}
              </div>
            )}

            {(filter === 'all' || filter === 'clabte') && projects.length > 0 && projects.map(project => (
              <motion.div
                key={`project-${project.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ClabteServicePost
                  key={`project-${project.id}`}
                  post={{
                    id: project.id,
                    title: project.title,
                    content: project.description,
                    type: project.type, // <-- This should be the real type from backend
                    author: {
                      name: project.client?.user?.full_name || 'Unknown',
                      avatar: project.client?.user?.profileImg || '/images/default-avatar.png',
                      role: 'client'
                    },
                    serviceDetails: {
                      price: project.budget,
                      deliveryDays: new Date(project.deadline).toLocaleDateString(),
                      category: project.technologies,
                      skills: project.skills_required?.split(',') || []
                    }
                  }}
                />
                {/* Role-based button: Apply for freelancers */}
                {user?.role === "freelancer" ? (
                  <button className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-300 font-medium shadow-md mt-2"
                    onClick={() => handleApplyProject(project)}
                  >
                    Apply
                  </button>
                ) : (
                  <button className="w-full py-2 bg-gray-400 text-white rounded-lg font-medium cursor-not-allowed mt-2" disabled>
                    Apply
                  </button>
                )}
              </motion.div>
            ))}

            {(filter === 'all' || filter === 'formation') && (
              // Formation posts placeholder
              <></>
            )}

            {/* Show empty state */}
            {((filter === 'all' && posts.length === 0 && services.length === 0) ||
              (filter === 'regular' && posts.length === 0) ||
              (filter === 'clabte' && services.length === 0)
              // Removed (filter === 'formation')
            ) && renderEmptyState()}
          </>
        )}
      </div>

      {/* Contact Modal */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-2">Contact Service</h2>
            <textarea
              className="w-full border rounded p-2 mb-2"
              rows={3}
              placeholder="Your message"
              value={contactMessage}
              onChange={e => setContactMessage(e.target.value)}
            />
            {contactError && <div className="text-red-500 mb-2">{contactError}</div>}
            {contactSuccess && <div className="text-green-500 mb-2">{contactSuccess}</div>}
            <div className="flex gap-2">
              <button
                className="bg-primary-600 text-white px-4 py-2 rounded"
                onClick={submitContact}
                disabled={contactLoading}
              >
                {contactLoading ? 'Sending...' : 'Send'}
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setContactModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Apply Modal */}
      {applyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-2">Apply to Project</h2>
            <textarea
              className="w-full border rounded p-2 mb-2"
              rows={3}
              placeholder="Your message"
              value={applyMessage}
              onChange={e => setApplyMessage(e.target.value)}
            />
            {applyError && <div className="text-red-500 mb-2">{applyError}</div>}
            {applySuccess && <div className="text-green-500 mb-2">{applySuccess}</div>}
            <div className="flex gap-2">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={submitApply}
                disabled={applyLoading}
              >
                {applyLoading ? 'Applying...' : 'Apply'}
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setApplyModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
