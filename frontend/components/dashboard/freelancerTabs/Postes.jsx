import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaExclamationTriangle } from 'react-icons/fa';
import axios from 'axios';
import { API_BASE_URL } from '../../../config/api';
import Cookies from 'js-cookie';

const Postes = ({ username }) => {
  const [postes, setPostes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    // Ajoute d'autres champs selon ton modèle
  });

  // Auth headers
  const createAuthHeaders = (token) => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  });

  // Fetch posts
  useEffect(() => {
    fetchPostes();
    // eslint-disable-next-line
  }, [username]);

  const fetchPostes = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = Cookies.get('access_token');
      const response = await axios.get(
        `${API_BASE_URL}/fyter/posts/${username}/`,
        { headers: token ? createAuthHeaders(token) : {} }
      );
      setPostes(response.data);
    } catch (err) {
      setError('Failed to load posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Filter posts
  const filteredPostes = postes.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Open add post modal
  const handleAddPost = () => {
    setFormData({
      title: '',
      content: '',
      // Ajoute d'autres champs si besoin
    });
    setShowAddModal(true);
  };

  // Open edit post modal
  const handleEditPost = (post) => {
    setCurrentPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      // Ajoute d'autres champs si besoin
    });
    setShowEditModal(true);
  };

  // Open delete confirmation modal
  const handleDeleteClick = (post) => {
    setCurrentPost(post);
    setShowDeleteModal(true);
  };

  // Submit new post
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('access_token');
    if (!token) {
      alert('You are not authenticated. Please log in again.');
      return;
    }
    try {
      await axios.post(
        `${API_BASE_URL}/fyter/posts/`,
        formData,
        { headers: createAuthHeaders(token) }
      );
      setShowAddModal(false);
      fetchPostes();
    } catch (err) {
      alert('Failed to add post. Please try again.');
    }
  };

  // Update existing post
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('access_token');
    if (!token) {
      alert('You are not authenticated. Please log in again.');
      return;
    }
    try {
      await axios.put(
        `${API_BASE_URL}/fyter/posts/manage/${currentPost.id}/`,
        formData,
        { headers: createAuthHeaders(token) }
      );
      setShowEditModal(false);
      fetchPostes();
    } catch (err) {
      alert('Failed to update post. Please try again.');
    }
  };

  // Delete post
  const handleDeleteConfirm = async () => {
    const token = Cookies.get('access_token');
    if (!token) {
      alert('You are not authenticated. Please log in again.');
      return;
    }
    try {
      await axios.delete(
        `${API_BASE_URL}/fyter/posts/manage/${currentPost.id}/`,
        { headers: createAuthHeaders(token) }
      );
      setShowDeleteModal(false);
      fetchPostes();
    } catch (err) {
      alert('Failed to delete post. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header with Add Post button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Posts</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage all your posts in one place
          </p>
        </div>
        <button
          onClick={handleAddPost}
          className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <FaPlus className="mr-2" /> Add New Post
        </button>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Loading and Error States */}
      {loading && (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Loading posts...</p>
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 rounded-lg p-4 mb-6 flex items-start">
          <FaExclamationTriangle className="text-red-500 mr-3 mt-1 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Posts List */}
      {!loading && !error && (
        <div className="grid grid-cols-1 gap-6">
          {filteredPostes.length > 0 ? (
            filteredPostes.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {post.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                        {post.content}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => handleEditPost(post)}
                        className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        <FaEdit className="mr-2" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(post)}
                        className="inline-flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                      >
                        <FaTrash className="mr-2" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-4">No posts found matching your criteria.</p>
              <button
                onClick={handleAddPost}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <FaPlus className="mr-2" /> Add Your First Post
              </button>
            </div>
          )}
        </div>
      )}

      {/* Add Post Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full mx-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Add New Post</h2>
              <form onSubmit={handleAddSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">content</label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    ></textarea>
                  </div>
                  {/* Ajoute d'autres champs ici si besoin */}
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Create Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Post Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full mx-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Edit Post</h2>
              <form onSubmit={handleEditSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">content</label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    ></textarea>
                  </div>
                  {/* Ajoute d'autres champs ici si besoin */}
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Update Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full mx-auto">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30">
                <FaExclamationTriangle className="text-red-600 dark:text-red-400 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">Delete Post</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                Are you sure you want to delete "{currentPost?.title}"? This action cannot be undone.
              </p>
              <div className="flex justify-center space-x-3">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Postes;
