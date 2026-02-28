'use client';

import { useEffect, useState, useRef, memo } from 'react';
import { FiSearch, FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { FaBookOpen } from "react-icons/fa";
import { FaHome, FaProjectDiagram, FaUser, FaCog, FaChevronDown, FaEnvelope } from 'react-icons/fa';
import NotificationsDropdown from '../components/ui/NotificationsDropdown';
import NotificationCenter from './notifications/NotificationCenter';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';
import OptimizedLink from './OptimizedLink';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import AuthModals from './auth/AuthModals';
import { API_BASE_URL } from '../config/api';

// Import role-specific navigation components
import FreelancerNav from './navigation/FreelancerNav';
import ClientNav from './navigation/ClientNav';
import AdminNav from './navigation/AdminNav';
import FormateurNav from './navigation/FormateurNav';
import GuestNav from './navigation/GuestNav';
import MobileNav from './navigation/MobileNav';
// const API_URL = 'http://127.0.0.1:8000';

function NavbarComponent() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout, openLoginModal, openRegisterModal } = useAuth();

  const [messagesLoaded, setMessagesLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [chatrooms, setChatrooms] = useState([]);
  const [chatroomsLoading, setChatroomsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [banModalOpen, setBanModalOpen] = useState(false);
  const [selectedBanUser, setSelectedBanUser] = useState('');

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const dropdownTimeout = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(dropdownTimeout.current);
    setProfileDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setProfileDropdownOpen(false);
    }, 200); // adjust delay as needed
  };

  // Fetch chatrooms for the current user
  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchChatrooms = async () => {
      setChatroomsLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/fyter/chatrooms/my/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setChatrooms(data);
        } else {
          setChatrooms([]);
        }
      } catch (err) {
        setChatrooms([]);
      } finally {
        setChatroomsLoading(false);
      }
    };
    fetchChatrooms();
  }, [isAuthenticated]);

  // Fetch messages when a chatroom is clicked
  const handleRoomClick = async (room) => {
    setSelectedRoom(room); // store the whole room object
    try {
      const accessToken = Cookies.get('access_token');
      const response = await fetch(
        `${API_BASE_URL}/fyter/chatrooms/${room.id}/messages/`,
        {
          headers:
          {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          }
        }
      );
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        setMessages([]);
      }
    } catch (error) {
      setMessages([]);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedRoom) return;
    try {
      const accessToken = Cookies.get('access_token');
      const response = await fetch(
        `${API_BASE_URL}/fyter/chatroom/${selectedRoom.id}/messages/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ content: newMessage }),
        }
      );
      if (response.ok) {
        setNewMessage('');
        handleRoomClick(selectedRoom); // Refresh messages after sending
      }
    } catch (error) {
      // Optionally handle error (e.g., show a notification)
    }
  };

  // Handler to go to next phase
  const handleGoNextPhase = async () => {
    if (!selectedRoom) return;
    try {
      const accessToken = Cookies.get('access_token');
      const response = await fetch(
        `${API_BASE_URL}/fyter/chatroom/${selectedRoom.id}/change-phase/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        // Update selectedRoom with new phase
        setSelectedRoom(prev => ({ ...prev, phase: data.phase }));
        alert('Phase changed to: ' + data.phase);
      } else {
        alert(data.error || 'Could not change phase');
      }
    } catch (error) {
      alert('Error changing phase');
    }
  };

  // Handler to ban a user (with a select dropdown, excluding the client)
  const handleBanUser = async () => {
    if (!selectedRoom) return;
    // Exclude client from selectable users
    const clientUser = selectedRoom.users.find(u => u.role === 'client');
    const bannableUsers = selectedRoom.users.filter(u => u.id !== clientUser?.id);

    // Show a prompt with user names (replace with a modal/select for better UX)
    const userOptions = bannableUsers.map(u => `${u.id}: ${u.full_name}`).join('\n');
    const userId = prompt(`Enter the user ID to ban from this chatroom:\n${userOptions}`);
    if (!userId) return;

    try {
      const accessToken = Cookies.get('access_token');
      const response = await fetch(
        `${API_BASE_URL}/fyter/chatroom/${selectedRoom.id}/ban-user/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ user_id: userId }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert('User banned successfully');
        // Optionally update selectedRoom.users_banned in state
        setSelectedRoom(prev => ({
          ...prev,
          users_banned: [...prev.users_banned, bannableUsers.find(u => u.id == userId)]
        }));
      } else {
        alert(data.error || 'Could not ban user');
      }
    } catch (error) {
      alert('Error banning user');
    }
  };

  const messagesContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <AuthModals />
      <nav className="w-full bg-white dark:bg-gray-900 shadow-md py-2 px-6 md:px-10 flex items-center justify-between sticky top-0 z-50 transition-all duration-300 relative">
        {/* Left Section: Logo */}
        <div className="flex items-center w-1/4 justify-start">
          <OptimizedLink href={isAuthenticated ? "/dashboard/home" : "/"} className="flex items-center transition-transform hover:scale-105">
            <div className="relative h-10 w-32">
              <Image
                src="/fyterlance-new.png"
                alt="Logo"
                fill
                sizes="128px"
                priority
                className="scale-x-110 transform-gpu origin-left object-contain"
              />
            </div>
          </OptimizedLink>
        </div>

        {/* Navigation Section with Theme Toggle in Center */}
        <div className="hidden md:flex items-center justify-center flex-1 px-4 relative">
          {/* Theme Toggle Button - Absolutely Centered */}
          <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
            <motion.button
              onClick={toggleTheme}
              whileTap={{ scale: 0.9 }}
              className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 relative overflow-hidden shadow-md"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <motion.div
                className="relative z-10"
                initial={false}
                animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {theme === 'dark' ? <FiSun size={20} className="text-yellow-500" /> : <FiMoon size={20} className="text-blue-600" style={{ transform: 'rotate(180deg)' }} />}
              </motion.div>
              <div className={`absolute inset-0 transition-all duration-300 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'} bg-gray-700`} style={{ zIndex: 1 }}></div>
            </motion.button>
          </div>

          {/* Role-based Navigation Links - Full Width to Balance Items */}
          <div className="w-full">
            {isAuthenticated && user ? (
              <>
                {user.role === 'freelancer' && <FreelancerNav userRank={user.role_details?.level || 'Bronze'} />}
                {user.role === 'client' && <ClientNav activeProjects={user.role_details?.active_projects || 0} pendingSubmissions={user.role_details?.pending_submissions || 0} />}
                {user.role === 'admin' && <AdminNav />}
                {user.role === 'formateur' && <FormateurNav isTopTrainer={user.role_details?.is_top_trainer || false} />}
                {!['freelancer', 'client', 'admin', 'formateur'].includes(user.role) && <GuestNav />}
              </>
            ) : (
              <GuestNav />
            )}
          </div>
        </div>

        {/* Right Section: User Actions */}
        <div className="hidden md:flex items-center gap-4 w-1/4 justify-end">

          {/* User Actions */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-4">
              {/* Notifications Center */}
              <NotificationCenter isInstructor={user?.role === 'formateur'} />

              {/* Messages Dropdown */}
              <div className="relative inline-block text-left">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="btn-primary flex items-center gap-1 rounded-full px-3 py-2 text-sm"
                >
                  <FaEnvelope /> <span>Messages </span>
                </button>

                {isOpen && (
                  <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 fade-in">
                    <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {user.role === 'formateur' ? 'Conversations' : 'Messages'}
                      </h3>
                    </div>

                    {/* If a room is selected, show messages. Otherwise, show chatrooms */}
                    {selectedRoom ? (
                      <div className="flex flex-col h-96">
                        <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                          <button
                            onClick={() => {
                              setSelectedRoom(null);
                              setMessages([]);
                            }}
                            className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 border px-2 py-1 rounded"
                          >
                            Back
                          </button>
                          {selectedRoom && <p className='text-xs text-gray-500'> {selectedRoom.phase}</p>}
                          <button
                            onClick={() => handleRoomClick(selectedRoom)}
                            className="text-xs text-blue-600 hover:text-blue-800 border px-2 py-1 rounded"
                          >
                            Refresh
                          </button>
                        </div>
                        <div className="flex-1 overflow-y-auto px-4 py-2" style={{ maxHeight: '400px' }} ref={messagesContainerRef}>
                          {messages.length > 0 ? (
                            messages.map(msg => {
                              // Check if sender is banned
                              const isBanned = selectedRoom.users_banned.some(u => u.id === msg.sender);
                              return (
                                <div
                                  key={msg.id}
                                  className={`mb-2 p-2 rounded-md max-w-[80%] ${
                                    isBanned
                                      ? 'bg-red-100 text-red-700'
                                      : msg.sender === user.id
                                        ? 'bg-blue-500 text-white ml-auto'
                                        : 'bg-gray-200 text-gray-900 mr-auto'
                                  }`}
                                  style={{ wordBreak: 'break-word' }}
                                >
                                  <div className="text-sm font-semibold">
                                    {msg.sender_name}
                                  </div>
                                  <div className="text-base mt-1 mb-1">
                                    {msg.content}
                                  </div>
                                  <div className="text-xs text-gray-300 mt-1">
                                    {new Date(msg.timestamp).toLocaleString()
                                    }
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
                              No messages in this room.
                            </div>
                          )}
                          <div ref={messagesEndRef} />
                        </div>
                        <div className="p-2 border-t border-gray-200 dark:border-gray-700 flex gap-2 items-center">
                          {selectedRoom && selectedRoom.users_banned.some(u => u.id === user.id) ? (
                            <div className="text-red-600 text-sm flex-1">
                              You have been eliminated from this chatroom.
                            </div>
                          ) : (
                            <>
                              <input
                                type="text"
                                value={newMessage}
                                onChange={e => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 rounded-md px-2 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                              />
                              <button
                                onClick={handleSendMessage}
                                className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition"
                              >
                                Send
                              </button>
                              <div className="relative">
                                <button
                                  onClick={() => setDropdownOpen((prev) => !prev)}
                                  className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-md ml-1 flex items-center"
                                >
                                  <FaChevronDown />
                                </button>
                                {dropdownOpen && (
                                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-20">
                                    {user.role === 'client' ? (
                                      <>
                                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={handleGoNextPhase}>
                                          Go Next Phase
                                        </button>
                                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setBanModalOpen(true)}>
                                          Ban/Unban 
                                        </button>
                                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">One</button>
                                      </>
                                    ) : user.role === 'freelancer' ? (
                                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Ready to Next Phase</button>
                                    ) : null}
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="max-h-80 overflow-y-auto">
                        {chatroomsLoading ? (
                          <div className="px-4 py-6 text-center text-gray-500 dark:text-gray-400 text-sm">
                            Loading...
                          </div>
                        ) : chatrooms && chatrooms.length > 0 ? (
                          [...chatrooms].reverse().map((room) => (
                            <div
                              key={room.id}
                              className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
                              onClick={() => handleRoomClick(room)}
                            >
                              <div className="font-medium text-gray-900 dark:text-gray-100">{room.room_name}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Owner: {room.owner_name || room.owner}</div>
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-6 text-center text-gray-500 dark:text-gray-400 text-sm">
                            No chatrooms found.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* User Profile */}
              <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <button
                  type="button"
                  onClick={() => {
                    router.push(
                      user?.role === 'client'
                        ? "/dashboard/clante-profile"
                        : user?.role === 'formateur'
                          ? "/dashboard/trainer-profile"
                          : "/dashboard/freelancer-profile"
                    );
                  }}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity bg-transparent border-none p-0 m-0"
                  style={{ cursor: 'pointer' }}
                >
                  <div className="w-9 h-9 bg-primary-500 rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-sm relative">
                    {user.profileImg ? (
                      <Image
                        src={user.profileImg.startsWith('data:')
                          ? user.profileImg // Use base64 image directly
                          : `${API_BASE_URL}${user.profileImg}`} // Use server path
                        alt={user.full_name}
                        fill
                        sizes="36px"
                        className="object-cover profile-image"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/fighterfish.png"; // Fallback image
                        }}
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 text-white text-sm font-bold">
                        {user.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user.full_name?.split(' ')[0]}</span>
                </button>

                {/* Dropdown menu */}
                {profileDropdownOpen && (
                  <div
                    className="absolute right-0 top-full w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50"
                    style={{ marginTop: 0 }}
                  >
                    <div className="py-1">
                      <button
                        type="button"
                        onClick={() => {
                          router.push(
                            user?.role === 'client'
                              ? "/dashboard/clante-profile"
                              : user?.role === 'formateur'
                                ? "/dashboard/promoteur-profile"
                                : "/dashboard/freelancer-profile"
                          );
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 bg-transparent border-none"
                      >
                        Profile
                      </button>
                      <button
                        type="button"
                        onClick={() => router.push("/dashboard/main")}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 bg-transparent border-none"
                      >
                        Settings
                      </button>
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <motion.button
                onClick={openLoginModal}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-sm px-4 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
              >
                Log in
              </motion.button>
              <motion.button
                onClick={openRegisterModal}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-sm px-4 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 font-medium"
              >
                Sign up
              </motion.button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-700 dark:text-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMobileMenu}></div>
        )}

        {/* Mobile Menu Panel */}
        <div className={`md:hidden fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-800 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="relative h-8 w-24">
                <Image
                  src="/fyterlance-new.png"
                  alt="Logo"
                  fill
                  sizes="96px"
                  className="scale-x-110 transform-gpu origin-left object-contain"
                />
              </div>
            </div>
            <button onClick={toggleMobileMenu} className="text-gray-500 dark:text-gray-400 focus:outline-none hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
              <FiX size={24} />
            </button>
          </div>

          <div className="p-4 space-y-4">


            {/* Mobile Nav Links */}
            <div className="space-y-3">
              {/* Theme Toggle - Mobile */}
              <div className="flex items-center justify-between p-3 rounded-md bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 shadow-sm">
                <div className="flex items-center gap-2">
                  {theme === 'dark'
                    ? <FiSun className="text-yellow-500" size={18} />
                    : <FiMoon className="text-blue-600" size={18} style={{ transform: 'rotate(180deg)' }} />
                  }
                  <span className="font-medium">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </div>
                <motion.button
                  onClick={toggleTheme}
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-7 rounded-full bg-gray-200 dark:bg-gray-600 relative transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-inner"
                >
                  <motion.div
                    className={`absolute w-5 h-5 rounded-full bg-white shadow-md top-1 flex items-center justify-center ${theme === 'dark' ? 'right-1' : 'left-1'}`}
                    animate={{
                      x: theme === 'dark' ? 0 : 0,
                      backgroundColor: theme === 'dark' ? '#ffffff' : '#ffffff'
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <div className="w-3 h-3 rounded-full bg-primary-500 opacity-50"></div>
                  </motion.div>
                  <div className={`absolute inset-0 rounded-full transition-all duration-300 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'} bg-primary-700/30`}></div>
                </motion.button>
              </div>

              {/* Role-based Mobile Navigation */}
              <div className="mt-2">
                <MobileNav
                  user={user}
                  role={user?.role}
                  logout={logout}
                  closeMenu={() => setMobileMenuOpen(false)}
                  openLoginModal={() => {
                    openLoginModal();
                    setMobileMenuOpen(false);
                  }}
                  openRegisterModal={() => {
                    openRegisterModal();
                    setMobileMenuOpen(false);
                  }}

                />
              </div>
            </div>
          </div>
        </div>

        {/* Ban User Modal */}
        {banModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-80 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Eliminate (Ban) User</h3>
              <select
                className="w-full mb-4 p-2 border rounded"
                value={selectedBanUser}
                onChange={e => setSelectedBanUser(e.target.value)}
              >
                <option value="">Select a user</option>
                {selectedRoom.users
                  .filter(u => u.role !== 'client') // Exclude client from ban list
                  .map(u => {
                    const isBanned = selectedRoom.users_banned.some(bu => bu.id === u.id);
                    return (
                      <option
                        key={u.id}
                        value={u.id}
                        style={isBanned ? { color: 'red', fontWeight: 'bold' } : {}}
                      >
                        {u.full_name}
                        {isBanned ? ' (banned)' : ''}
                      </option>
                    );
                  })}
              </select>
              <div className="flex justify-end gap-2">
                <button
                  className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  onClick={() => {
                    setBanModalOpen(false);
                    setSelectedBanUser('');
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-3 py-1 rounded bg-red-600 text-white"
                  onClick={async () => {
                    if (!selectedBanUser) return;
                    try {
                      const accessToken = Cookies.get('access_token');
                      const response = await fetch(
                        `${API_BASE_URL}/fyter/chatroom/${selectedRoom.id}/ban-user/`,
                        {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`,
                          },
                          body: JSON.stringify({ user_id: selectedBanUser }),
                        }
                      );
                      const data = await response.json();
                      if (response.ok) {
                        // Update users_banned in selectedRoom based on action
                        setSelectedRoom(prev => {
                          const userObj = prev.users.find(u => u.id == selectedBanUser);
                          if (data.action === 'banned') {
                            return {
                              ...prev,
                              users_banned: [...prev.users_banned, userObj]
                            };
                          } else if (data.action === 'unbanned') {
                            return {
                              ...prev,
                              users_banned: prev.users_banned.filter(u => u.id != selectedBanUser)
                            };
                          }
                          return prev;
                        });
                        setBanModalOpen(false);
                        setSelectedBanUser('');
                        alert(
                          data.action === 'banned'
                            ? 'User banned successfully'
                            : 'User unbanned successfully'
                        );
                      } else {
                        alert(data.error || 'Could not ban/unban user');
                      }
                    } catch (error) {
                      alert('Error banning/unbanning user');
                    }
                  }}
                >
                  Ban / Unban
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

// Memoize the Navbar component to prevent unnecessary re-renders
export default memo(NavbarComponent);
