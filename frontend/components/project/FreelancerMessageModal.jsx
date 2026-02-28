import React, { useState } from 'react';
import { FaPaperPlane, FaTimes } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { API_BASE_URL, API_ENDPOINTS, createAuthHeaders } from '../../config/api';

const FreelancerMessageModal = ({ isOpen, onClose, clientId, clientName, projectId, projectTitle }) => {
  const [messageText, setMessageText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleMessageChange = (e) => {
    setMessageText(e.target.value);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!messageText.trim()) {
      setError('Message cannot be empty');
      return;
    }
    
    setIsSending(true);
    setError(null);
    
    try {
      const token = Cookies.get('access_token');
      const response = await fetch(API_ENDPOINTS.MESSAGES, {
        method: 'POST',
        headers: createAuthHeaders(token),
        body: JSON.stringify({
          receiver: clientId,
          content: `[Project: ${projectTitle}] ${messageText.trim()}`
        }),
      });
      
      if (response.ok) {
        setSuccess(true);
        setMessageText('');
        setTimeout(() => {
          setSuccess(false);
          onClose();
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsSending(false);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Message to {clientName}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
          >
            <FaTimes size={18} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md text-sm">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-md text-sm">
              Message sent successfully!
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              About Project: {projectTitle}
            </label>
            <textarea
              value={messageText}
              onChange={handleMessageChange}
              rows={5}
              placeholder="Type your message here..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              disabled={isSending || success}
            />
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={isSending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
              disabled={isSending || !messageText.trim() || success}
            >
              {isSending ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center">
                  <FaPaperPlane className="mr-2" size={14} />
                  Send Message
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FreelancerMessageModal;

