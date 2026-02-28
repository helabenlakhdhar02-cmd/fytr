'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaSmile, FaPaperclip, FaInfoCircle, FaTimes } from 'react-icons/fa';

// Sample messages data
const sampleMessages = [
  {
    id: 1,
    sender: 'John Smith',
    message: 'Hi! I\'m excited to work on your logo design project. I have some initial questions about your brand vision.',
    timestamp: '2023-11-15T10:30:00Z',
    isCurrentUser: false
  },
  {
    id: 2,
    sender: 'You',
    message: 'Great! I\'m looking for something modern and clean. The brand is for a coffee shop called "Brew & Bean".',
    timestamp: '2023-11-15T10:35:00Z',
    isCurrentUser: true
  },
  {
    id: 3,
    sender: 'John Smith',
    message: 'Perfect! What colors do you have in mind? And do you prefer minimalist or more detailed designs?',
    timestamp: '2023-11-15T10:40:00Z',
    isCurrentUser: false
  },
  {
    id: 4,
    sender: 'You',
    message: 'I\'m thinking earth tones - browns, greens, maybe some cream. Definitely leaning towards minimalist.',
    timestamp: '2023-11-15T10:45:00Z',
    isCurrentUser: true
  },
  {
    id: 5,
    sender: 'John Smith',
    message: 'Excellent! I\'ll start working on some concepts and share them with you by tomorrow. Any specific fonts you like?',
    timestamp: '2023-11-15T11:00:00Z',
    isCurrentUser: false
  },
  {
    id: 6,
    sender: 'You',
    message: 'I like clean, readable fonts. Nothing too fancy. Looking forward to seeing your concepts!',
    timestamp: '2023-11-15T11:05:00Z',
    isCurrentUser: true
  },
  {
    id: 7,
    sender: 'John Smith',
    message: 'I\'ve uploaded the first draft of your logo concepts. Please take a look and let me know your thoughts!',
    timestamp: '2023-11-16T09:15:00Z',
    isCurrentUser: false
  }
];

const ProjectMessageContainer = ({ onClose }) => {
  const [newMessage, setNewMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [messages, setMessages] = useState(sampleMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [questionsRemaining, setQuestionsRemaining] = useState(3);
  const [isInputExpanded, setIsInputExpanded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const tooltipRef = useRef(null);

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [newMessage]);

  // Handle sending message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: 'You',
        message: newMessage.trim(),
        timestamp: new Date().toISOString(),
        isCurrentUser: true
      };
      
      setMessages([...messages, message]);
      setNewMessage('');
      setIsInputExpanded(false);
      
      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        // Simulate response (in real app, this would come from API)
        const response = {
          id: messages.length + 2,
          sender: 'John Smith',
          message: 'Thanks for your message! I\'ll get back to you shortly.',
          timestamp: new Date().toISOString(),
          isCurrentUser: false
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }
  };

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Format date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = formatDate(message.timestamp);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  // Tooltip styles
  const tooltipStyles = `
    .tooltip {
      position: relative;
      display: inline-block;
    }
    
    .tooltip .tooltiptext {
      visibility: hidden;
      width: 200px;
      background-color: #374151;
      color: white;
      text-align: center;
      border-radius: 6px;
      padding: 8px;
      position: absolute;
      z-index: 1000;
      bottom: 125%;
      left: 50%;
      margin-left: -100px;
      opacity: 0;
      transition: opacity 0.3s;
      font-size: 12px;
      line-height: 1.4;
    }
    
    .tooltip .tooltiptext::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: #374151 transparent transparent transparent;
    }
    
    .tooltip:hover .tooltiptext {
      visibility: visible;
      opacity: 1;
    }
  `;

  // Handle tooltip click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setShowTooltip(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col overflow-hidden" id="project-message-container">
      <style dangerouslySetInnerHTML={{ __html: tooltipStyles }} />
      <div className="flex flex-col overflow-hidden relative h-full">
        {/* No header here - using the one from parent component */}
        {/* Messages Area - will automatically adjust its size based on the input area height */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 custom-scrollbar bg-blue-50 dark:bg-blue-900 dark:bg-opacity-30 border-b border-blue-100 dark:border-blue-800/50">
          {Object.entries(groupedMessages).map(([date, dayMessages]) => (
            <div key={date}>
              {/* Date separator */}
              <div className="flex items-center justify-center my-4">
                <div className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full text-xs font-medium">
                  {date}
                </div>
              </div>
              
              {/* Messages for this date */}
              {dayMessages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'} mb-3`}
                >
                  <div className={`max-w-[70%] ${message.isCurrentUser ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`px-4 py-2 rounded-2xl shadow-sm ${
                        message.isCurrentUser
                          ? 'bg-blue-600 text-white rounded-br-md'
                          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-md border border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <p className="text-sm leading-relaxed break-words">{message.message}</p>
                    </div>
                    <div className={`flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400 ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                      <span>{formatTime(message.timestamp)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
          
          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex justify-start mb-3"
              >
                <div className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-2xl rounded-bl-md">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-3 sm:p-4">
          {/* Questions remaining indicator */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {questionsRemaining} questions remaining
              </span>
            </div>
            
            <div className="tooltip" ref={tooltipRef}>
              <button
                onClick={() => setShowTooltip(!showTooltip)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <FaInfoCircle size={14} />
              </button>
              <span className="tooltiptext">
                You can ask up to 3 questions before the project starts. Use them wisely to clarify requirements!
              </span>
            </div>
          </div>

          {/* Message input */}
          <div className="flex items-end space-x-2">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => setIsInputExpanded(true)}
                onBlur={() => !newMessage && setIsInputExpanded(false)}
                placeholder="Type your message..."
                className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none overflow-hidden transition-all duration-200"
                style={{ minHeight: '48px', maxHeight: '120px' }}
                rows={1}
              />
              
              {/* Attachment button */}
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                <FaPaperclip size={16} />
              </button>
            </div>
            
            {/* Send button */}
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-3 rounded-2xl transition-colors duration-200 flex-shrink-0"
            >
              <FaPaperPlane size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectMessageContainer;
