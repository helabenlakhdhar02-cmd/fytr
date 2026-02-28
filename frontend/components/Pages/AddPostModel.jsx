import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';
import Cookies from 'js-cookie';

const AddPostModel = ({ show, onHide, user, setUpdated }) => {
  const [post, setPost] = useState({
    title: '',
    content: '',
    images: [],
  });

  const [postType, setPostType] = useState('regular');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    technologies: '',
    category: '',
    skills: '',
  });

  const MAX_IMAGES = 5;

  const categories = [
    "Web Development",
    "Mobile Development",
    "Design",
    "Writing",
    "Marketing",
    "Business",
    "Other"
  ];

  // Handle input for regular post
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      if (files.length + post.images.length > MAX_IMAGES) {
        alert(`You can upload a maximum of ${MAX_IMAGES} images.`);
        return;
      }
      setPost((prevPost) => ({
        ...prevPost,
        images: [...prevPost.images, ...files],
      }));
    } else {
      setPost({
        ...post,
        [name]: value,
      });
    }
  };

  // Handle input for service form
  const handleServiceInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit regular post
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, content, images } = post;
    if (!title || !content) {
      alert('Please fill in all fields');
      return;
    }
    const formDataPost = new FormData();
    formDataPost.append('title', title);
    formDataPost.append('content', content);
    formDataPost.append('username', user.username);
    formDataPost.append('type', 'regular');
    images.forEach((image) => {
      formDataPost.append('files', image);
    });

    try {
      await axios.post(`${API_BASE_URL}/fyter/posts/`, formDataPost, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Post successfully created!');
      setPost({ title: '', content: '', images: [] });
      setUpdated(true);
      onHide();
      setPostType('regular');
    } catch (error) {
      // Handle error if needed
    }
  };

  // Submit service (like Services.jsx)
  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('access_token');
    if (!token) {
      alert('You are not authenticated. Please log in again.');
      return;
    }
    if (!formData.title || !formData.description || !formData.price || !formData.category) {
      alert('Please fill in all required fields for service.');
      return;
    }
    try {
      await axios.post(
        `${API_BASE_URL}/fyter/freelancer/service/`,
        formData,
        { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } }
      );
      alert('Service successfully created!');
      setFormData({
        title: '',
        description: '',
        price: '',
        technologies: '',
        category: '',
        skills: '',
      });
      setUpdated(true);
      onHide();
      setPostType('regular');
    } catch (err) {
      // Handle error if needed
    }
  };

  const handleCancel = () => {
    setPost({ title: '', content: '', images: [] });
    setFormData({
      title: '',
      description: '',
      price: '',
      technologies: '',
      category: '',
      skills: '',
    });
    setPostType('regular');
    onHide();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 w-full max-w-md p-4 rounded-lg shadow-lg overflow-hidden">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {postType === 'regular' ? 'Create Post' : 'Add Service'}
          </h2>
          <button onClick={onHide} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            <span className="font-bold text-xl">&times;</span>
          </button>
        </div>

        <div className="mb-3 flex space-x-2">
          <button
            type="button"
            onClick={() => setPostType('regular')}
            className={`flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center text-sm ${
              postType === 'regular'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            Regular Post
          </button>
          <button
            type="button"
            onClick={() => user?.role === 'freelancer' && setPostType('service')}
            className={`flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center text-sm ${
              postType === 'service'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
            disabled={user?.role !== 'freelancer'}
            style={user?.role !== 'freelancer' ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
            title={user?.role !== 'freelancer' ? "Only freelancers can add a service" : ""}
          >
            Add Service
          </button>
        </div>

        {postType === 'regular' && (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm">Title</label>
              <input
                type="text"
                className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                name="title"
                value={post.title}
                onChange={handleChange}
                placeholder="Post title"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm">Content</label>
              <textarea
                className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                name="content"
                value={post.content}
                onChange={handleChange}
                placeholder="What's on your mind?"
                rows="3"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm">Images (Max {MAX_IMAGES} images)</label>
              <input
                type="file"
                className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                name="images"
                onChange={handleChange}
                multiple
              />
            </div>
            <div className="mb-3">
              {post.images && post.images.length > 0 && (
                <div className="space-y-2">
                  {Array.from(post.images).map((image, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300 text-xs truncate max-w-[120px]">{image.name}</span>
                      <button
                        type="button"
                        className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-xs"
                        onClick={() => {
                          setPost({
                            ...post,
                            images: Array.from(post.images).filter((_, idx) => idx !== index),
                          });
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2 border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
              <button
                type="button"
                className="px-3 py-1.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center text-sm"
              >
                Post
              </button>
            </div>
          </form>
        )}

        {postType === 'service' && user?.role === 'freelancer' && (
          <form onSubmit={handleServiceSubmit}>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleServiceInputChange}
                  required
                  className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleServiceInputChange}
                  required
                  rows="2"
                  className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleServiceInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Technologies</label>
                <input
                  type="text"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleServiceInputChange}
                  className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleServiceInputChange}
                  className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Skills</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleServiceInputChange}
                  className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
              <button
                type="button"
                className="px-3 py-1.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center text-sm"
              >
                Create Service
              </button>
            </div>
          </form>
        )}

        {postType === 'service' && user?.role !== 'freelancer' && (
          <div className="text-center text-red-500 py-6">
            Only freelancers can add a service.
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPostModel;
