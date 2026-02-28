'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaFile, FaImage, FaPaperclip, FaPaperPlane, FaSmile, FaVideo } from 'react-icons/fa';

const ProjectCommunication = ({ projectId, participants = [], initialMessages = [] }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat', 'calls', 'meetings'
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === '' && attachments.length === 0) return;

    const newMsg = {
      id: Date.now(),
      sender: {
        id: 'current-user',
        name: 'You',
        avatar: '/fighterfish.png'
      },
      content: newMessage,
      attachments: attachments,
      timestamp: new Date().toISOString(),
      status: 'sent'
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
    setAttachments([]);
    setIsTyping(false);
  };

  // Handle file attachment
  const handleAttachment = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newAttachments = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type.split('/')[0],
      size: formatFileSize(file.size),
      file
    }));

    setAttachments([...attachments, ...newAttachments]);
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Remove attachment
  const removeAttachment = (id) => {
    setAttachments(attachments.filter(attachment => attachment.id !== id));
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'long' });
    } else {
      return date.toLocaleDateString();
    }
  };

  // Group messages by date
  const groupMessagesByDate = () => {
    const groups = [];
    let currentDate = null;
    let currentGroup = [];

    messages.forEach(message => {
      const messageDate = new Date(message.timestamp).toLocaleDateString();
      
      if (messageDate !== currentDate) {
        if (currentGroup.length > 0) {
          groups.push({
            date: currentDate,
            messages: currentGroup
          });
        }
        currentDate = messageDate;
        currentGroup = [message];
      } else {
        currentGroup.push(message);
      }
    });

    if (currentGroup.length > 0) {
      groups.push({
        date: currentDate,
        messages: currentGroup
      });
    }

    return groups;
  };

  // Get message groups
  const messageGroups = groupMessagesByDate();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col h-[600px]">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Project Communication</h3>
          <div className="ml-2 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full">
            {participants.filter(p => p.online).length} online
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3 py-1 text-sm rounded-lg ${
              activeTab === 'chat'
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Chat
          </button>
          <button
            onClick={() => setActiveTab('calls')}
            className={`px-3 py-1 text-sm rounded-lg ${
              activeTab === 'calls'
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Calls
          </button>
          <button
            onClick={() => setActiveTab('meetings')}
            className={`px-3 py-1 text-sm rounded-lg ${
              activeTab === 'meetings'
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Meetings
          </button>
        </div>
      </div>

      {/* Chat Tab */}
      {activeTab === 'chat' && (
        <>
          {/* Participants */}
          <div className="p-2 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-2 overflow-x-auto">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="flex flex-col items-center p-1 min-w-[60px]"
              >
                <div className="relative">
                  <img
                    src={participant.avatar}
                    alt={participant.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/fighterfish.png";
                    }}
                  />
                  {participant.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  )}
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400 mt-1 truncate w-full text-center">
                  {participant.name}
                </span>
              </div>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-750">
            {messageGroups.map((group, groupIndex) => (
              <div key={group.date} className="mb-6">
                <div className="flex justify-center mb-4">
                  <div className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-xs text-gray-600 dark:text-gray-400">
                    {group.date === new Date().toLocaleDateString() ? 'Today' : group.date}
                  </div>
                </div>
                
                {group.messages.map((message, messageIndex) => {
                  const isCurrentUser = message.sender.id === 'current-user';
                  const showSender = messageIndex === 0 || 
                    group.messages[messageIndex - 1].sender.id !== message.sender.id;
                  
                  return (
                    <div
                      key={message.id}
                      className={`mb-4 ${isCurrentUser ? 'flex flex-col items-end' : 'flex flex-col items-start'}`}
                    >
                      {showSender && !isCurrentUser && (
                        <div className="flex items-center mb-1 ml-12">
                          <img
                            src={message.sender.avatar}
                            alt={message.sender.name}
                            className="w-8 h-8 rounded-full object-cover mr-2"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/fighterfish.png";
                            }}
                          />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {message.sender.name}
                          </span>
                        </div>
                      )}
                      
                      <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} max-w-[80%]`}>
                        <div
                          className={`rounded-lg px-4 py-2 ${
                            isCurrentUser
                              ? 'bg-blue-600 text-white'
                              : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600'
                          }`}
                        >
                          {message.content && (
                            <p className="text-sm whitespace-pre-wrap break-words">
                              {message.content}
                            </p>
                          )}
                          
                          {message.attachments && message.attachments.length > 0 && (
                            <div className="mt-2 space-y-2">
                              {message.attachments.map((attachment) => (
                                <div
                                  key={attachment.id}
                                  className={`flex items-center p-2 rounded-lg ${
                                    isCurrentUser
                                      ? 'bg-blue-700'
                                      : 'bg-gray-100 dark:bg-gray-600'
                                  }`}
                                >
                                  {attachment.type === 'image' ? (
                                    <FaImage className={`mr-2 ${isCurrentUser ? 'text-blue-200' : 'text-blue-500 dark:text-blue-400'}`} size={16} />
                                  ) : (
                                    <FaFile className={`mr-2 ${isCurrentUser ? 'text-blue-200' : 'text-blue-500 dark:text-blue-400'}`} size={16} />
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <p className={`text-xs font-medium truncate ${isCurrentUser ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                                      {attachment.name}
                                    </p>
                                    <p className={`text-xs ${isCurrentUser ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'}`}>
                                      {attachment.size}
                                    </p>
                                  </div>
                                  <button
                                    className={`p-1 rounded-full ${
                                      isCurrentUser
                                        ? 'text-blue-200 hover:text-white hover:bg-blue-800'
                                        : 'text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-500'
                                    }`}
                                  >
                                    <FaFile size={14} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <div className={`text-right mt-1 text-xs ${
                            isCurrentUser ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {formatTimestamp(message.timestamp)}
                            {isCurrentUser && (
                              <span className="ml-1">
                                {message.status === 'sent' ? '✓' : message.status === 'delivered' ? '✓✓' : '✓✓'}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-center mb-4">
                <div className="flex space-x-1 bg-gray-200 dark:bg-gray-700 rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Attachments Preview */}
          {attachments.length > 0 && (
            <div className="p-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750 flex flex-wrap gap-2">
              {attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center bg-white dark:bg-gray-700 rounded-lg p-2 border border-gray-200 dark:border-gray-600"
                >
                  {attachment.type === 'image' ? (
                    <FaImage className="text-blue-500 mr-2" size={14} />
                  ) : (
                    <FaFile className="text-blue-500 mr-2" size={14} />
                  )}
                  <span className="text-xs text-gray-700 dark:text-gray-300 truncate max-w-[100px]">
                    {attachment.name}
                  </span>
                  <button
                    onClick={() => removeAttachment(attachment.id)}
                    className="ml-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Message Input */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-end">
              <div className="flex-1">
                <textarea
                  value={newMessage}
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                    setIsTyping(e.target.value.length > 0);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type a message..."
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none"
                  rows={1}
                ></textarea>
              </div>
              <div className="flex ml-2">
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="p-3 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaPaperclip size={18} />
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    multiple
                    onChange={handleAttachment}
                  />
                </button>
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-3 text-gray-500 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaSmile size={18} />
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={newMessage.trim() === '' && attachments.length === 0}
                  className={`p-3 rounded-full ${
                    newMessage.trim() === '' && attachments.length === 0
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <FaPaperPlane size={18} />
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Calls Tab */}
      {activeTab === 'calls' && (
        <div className="flex-1 p-6 flex flex-col items-center justify-center">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-4">
            <FaVideo className="text-blue-600 dark:text-blue-400" size={32} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Start a Video Call
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6 max-w-md">
            Connect with project participants through video calls to discuss project details in real-time.
          </p>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center">
            <FaVideo className="mr-2" />
            Start New Call
          </button>
          
          <div className="w-full mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Recent Calls
            </h4>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 dark:bg-gray-750 rounded-lg flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
                    <FaVideo className="text-green-600 dark:text-green-400" size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Project Review Call
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Yesterday • 45 minutes • 3 participants
                    </p>
                  </div>
                </div>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm">
                  View Recording
                </button>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-gray-750 rounded-lg flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
                    <FaVideo className="text-green-600 dark:text-green-400" size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Initial Project Discussion
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Oct 15, 2023 • 30 minutes • 4 participants
                    </p>
                  </div>
                </div>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm">
                  View Recording
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Meetings Tab */}
      {activeTab === 'meetings' && (
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Scheduled Meetings
            </h3>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm flex items-center">
              <FaCalendarAlt className="mr-2" size={14} />
              Schedule Meeting
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-white dark:bg-gray-750 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-base font-medium text-gray-900 dark:text-white">
                    Weekly Progress Review
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Discussion of project milestones and next steps
                  </p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Upcoming
                </div>
              </div>
              
              <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <FaCalendarAlt className="mr-2" size={14} />
                <span>Tomorrow, 10:00 AM - 11:00 AM</span>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <div className="flex -space-x-2">
                  {participants.slice(0, 3).map((participant) => (
                    <img
                      key={participant.id}
                      src={participant.avatar}
                      alt={participant.name}
                      className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/fighterfish.png";
                      }}
                    />
                  ))}
                  {participants.length > 3 && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs text-gray-600 dark:text-gray-400">
                      +{participants.length - 3}
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs">
                    Join
                  </button>
                  <button className="px-3 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg text-xs hover:bg-gray-50 dark:hover:bg-gray-600">
                    Details
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-750 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-base font-medium text-gray-900 dark:text-white">
                    Final Design Review
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Review and approve final design deliverables
                  </p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Scheduled
                </div>
              </div>
              
              <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <FaCalendarAlt className="mr-2" size={14} />
                <span>Nov 25, 2023, 2:00 PM - 3:30 PM</span>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <div className="flex -space-x-2">
                  {participants.slice(0, 4).map((participant) => (
                    <img
                      key={participant.id}
                      src={participant.avatar}
                      alt={participant.name}
                      className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/fighterfish.png";
                      }}
                    />
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg text-xs hover:bg-gray-50 dark:hover:bg-gray-600">
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCommunication;
