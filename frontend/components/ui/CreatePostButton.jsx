"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaImage, FaTimes, FaHashtag } from "react-icons/fa";
import { useAuth } from '../../context/AuthContext';

const CreatePostButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { openLoginModal } = useAuth();

  const handleOpenModal = () => {
    // If user is logged in, open the create post modal
    // Otherwise, open the login modal
    const token = localStorage.getItem('token');
    if (token) {
      setIsModalOpen(true);
    } else {
      openLoginModal();
    }
  };

  return (
    <>
      <motion.button
        onClick={handleOpenModal}
        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-md"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <FaPlus />
        <span>Create New Post</span>
      </motion.button>

      <AnimatePresence>
        {isModalOpen && (
          <CreatePostModal onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

const CreatePostModal = ({ onClose }) => {
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    images: []
  });
  const [previewImages, setPreviewImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Create preview URLs for the images
    const newPreviewImages = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...newPreviewImages]);
    
    // Add the files to the postData
    setPostData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const removeImage = (index) => {
    // Remove from preview
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    
    // Remove from postData
    setPostData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you would normally send the data to your API
    console.log("Submitting post:", postData);
    
    // For now, just close the modal
    onClose();
    
    // Show a success message
    alert("Your post has been created successfully!");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create New Post</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={postData.title}
              onChange={handleChange}
              placeholder="What's your post about?"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={postData.content}
              onChange={handleChange}
              placeholder="Share your thoughts, services, or ask a question..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[150px]"
              required
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Tip: Use hashtags like #webdesign or #freelancing to make your post more discoverable
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
              Images (optional)
            </label>
            <div className="flex items-center gap-2">
              <label className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                <FaImage />
                <span>Add Images</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              {previewImages.length > 0 && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {previewImages.length} image(s) selected
                </span>
              )}
            </div>

            {previewImages.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-3">
                {previewImages.map((src, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={src}
                      alt={`Preview ${index + 1}`}
                      className="h-24 w-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-between gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Publish Post
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreatePostButton;
