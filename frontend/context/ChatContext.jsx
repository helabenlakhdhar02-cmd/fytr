'use client';

import React, { createContext, useState, useContext } from 'react';

// Create the chat context
export const ChatContext = createContext({
  showChat: false,
  setShowChat: () => {},
});

// Create a provider component
export const ChatProvider = ({ children }) => {
  const [showChat, setShowChat] = useState(false);

  return (
    <ChatContext.Provider value={{ showChat, setShowChat }}>
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook to use the chat context
export const useChat = () => useContext(ChatContext);
