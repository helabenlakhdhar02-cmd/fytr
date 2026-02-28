"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { API_BASE_URL } from '../../config/api';
import { useEffect, useState, useRef, useMemo, memo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
  FaHeart, FaComment, FaBookmark, FaEllipsisH, FaHashtag,
  FaEdit, FaTrash, FaImage, FaFileAlt, FaLink, FaPaperclip, FaPin, FaRegHeart
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

// Component to render post content with hashtag highlighting
const PostContent = ({ content }) => {
  // Extract hashtags and format content
  const { formattedContent, hashtags } = useMemo(() => {
    if (!content) return { formattedContent: '', hashtags: [] };

    // Replace newlines with <br> tags
    let processedContent = content.replace(/\\n/g, '<br>');

    // Find hashtags using regex
    const hashtagRegex = /#(\w+)/g;
    const tags = [];
    let match;

    // Find all hashtags
    while ((match = hashtagRegex.exec(processedContent)) !== null) {
      tags.push(match[1]);
    }

    // Replace hashtags with styled spans
    processedContent = processedContent.replace(hashtagRegex, '<span class="text-primary-600 dark:text-primary-400 font-medium">#$1</span>');

    return { formattedContent: processedContent, hashtags: tags };
  }, [content]);

  return (
    <div className="space-y-3">
      <p
        className="text-gray-600 dark:text-gray-400 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: formattedContent }}
      ></p>

      {hashtags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {hashtags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 text-xs text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-2 py-1 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900/30 cursor-pointer transition-colors"
            >
              <FaHashtag className="text-xs" />
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Set to true for AM/PM format
  };
  return new Date(dateString).toLocaleString("en-US", options);
};
function PostCardComponent( post ) {
  const { openLoginModal } = useAuth();
  const [comment, setComment] = useState('');

    const handleAddComment = async (id,nn) => {
      if (comment.trim()) {
        try {
          const token = Cookies.get('access_token');
          const response = await fetch(`${API_BASE_URL}/fyter/comment/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({post_id:id,
              username:nn,
              content:comment.trim()}),
          });

          if (response.ok) {
            post.setUpdated(true)

            const data = await response.json();
            console.log('Comment added:', data);
            setComment(''); // Clear the input field after successful submission
          } else {
            console.error('Failed to add comment:', response.statusText);
          }
        } catch (error) {
          console.error('Error posting comment:', error);
        }
      }
    };

  const [token, setToken] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const router = useRouter();


  const handleLike = async (postId, username) => {
    try {
      const response = await fetch(`${API_BASE_URL}/fyter/like/${username}/${postId}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Post liked successfully!");
        post.setUpdated(true)
        // Optionally update the UI to reflect the like change
      } else {
        console.error("Failed to like post");
      }
    } catch (error) {
      console.error("Error while liking the post:", error);
    }
  };
  const handleUnlike = async (postId, username) => {
    try {
      const response = await fetch(`${API_BASE_URL}/fyter/like/${username}/${postId}/`, {
        method: "DELETE", // Assuming DELETE is used for unliking
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Post unliked successfully!");
        post.setUpdated(true)
        // Optionally update the UI to reflect the like change
      } else {
        console.error("Failed to unlike post");
      }
    } catch (error) {
      console.error("Error while unliking the post:", error);
    }
  };
  // Check if the current user has liked the post
  const hasLiked = user && post.post && post.post.likes &&
    (Array.isArray(post.post.likes) ?
      post.post.likes.includes(user.username) :
      post.post.likes.some && post.post.likes.some(like => like && like.username === user.username));
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
    useEffect(() => {

      const fetchLoggedInUser = async () => {
        try {
          const token = Cookies.get('access_token');
          const response = await fetch(`${API_BASE_URL}/fyter/profile/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            console.log("Logged in user:", userData);
          } else {
            const errorData = await response.json();
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      };

      fetchLoggedInUser();

    }, []);
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 w-full border border-gray-200 dark:border-gray-700 transition-all duration-300 transform hover:-translate-y-0.5">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-gray-700 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 relative">
            <Image
              src={`${post?.post?.user?.profileImg || '/default-profile.png'}`}
              alt={post.post && post.post.user ? post.post.user.full_name : "User"}
              fill
              sizes="48px"
              priority
              className="object-cover transition-opacity hover:opacity-90"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/fighterfish.png";
              }}
            />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 dark:text-gray-100 text-lg hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer">
              {post.post && post.post.user ? post.post.user.full_name : 'User'}
            </h4>
            <div className="flex flex-col sm:flex-row sm:gap-3 items-baseline">
              <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 dark:bg-green-400"></span>
                {post.post && post.post.created_at ? formatDate(post.post.created_at) : 'Unknown'}
              </p>
              {post.post && post.post.updated_at && post.post.updated_at !== post.post.created_at && (
                <p className="text-gray-500 dark:text-gray-400 text-sm italic">• Edited {formatDate(post.post.updated_at)}</p>
              )}
            </div>
          </div>
        </div>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
          >
            <FaEllipsisH className="text-gray-500 dark:text-gray-400 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors" />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700 py-1 animate-fadeIn">
              <button
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                onClick={() => {
                  setIsOpen(false);
                  // Add edit functionality here
                  console.log('Edit post', post.post?.id);
                }}
              >
                <FaEdit className="mr-2 text-blue-500" /> Edit Post
              </button>
              <button
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                onClick={() => {
                  setIsOpen(false);
                  // Add delete functionality here
                  if (confirm('Are you sure you want to delete this post?')) {
                    console.log('Delete post', post.post?.id);
                  }
                }}
              >
                <FaTrash className="mr-2 text-red-500" /> Delete Post
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-gray-800 dark:text-gray-100 font-semibold text-xl hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer">
            {post.post && post.post.title ? post.post.title : 'Untitled Post'}
          </h3>

          {/* Content Type Indicator */}
          <div className="flex items-center">
            {post.post && post.post.images && post.post.images.length > 0 && (
              <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-medium mr-2">
                <FaImage className="mr-1" /> Photo
              </span>
            )}
            {post.post && post.post.content && post.post.content.length > 200 && (
              <span className="inline-flex items-center px-2 py-1 rounded-md bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-xs font-medium">
                <FaFileAlt className="mr-1" /> Article
              </span>
            )}
            {post.post && post.post.content && post.post.content.includes('<a href') && (
              <span className="inline-flex items-center px-2 py-1 rounded-md bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs font-medium ml-2">
                <FaLink className="mr-1" /> Link
              </span>
            )}
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border-l-4 border-primary-500 dark:border-primary-600 mb-4">
          <PostContent content={post.post && post.post.content ? post.post.content : ''} />
        </div>

        {/* Post Images - Only show if not using Swiper */}
        {post.post && post.post.images && post.post.images.length > 0 && post.post.images[0] && !post.post.images[0].image && (
          <div className="mt-5 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300">
            <div className="relative group h-[400px]">
              <Image
                src={post.post.images[0]}
                alt="Post attachment"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out cursor-pointer"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/fighterfish.png";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
                <span className="text-white text-sm font-medium">View full image</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Only show Swiper if there are multiple images from API */}
      {post.post && post.post.images && post.post.images.length > 0 && (
        <div className="mb-5 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300">
          {/* Check if images are in API format (with image property) or direct URLs */}
          {post.post.images[0] && post.post.images[0].image ? (
            <div className="relative">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                className="rounded-xl"
                style={{ height: '400px' }}
              >
                {post.post.images.map((img, index) => (
                  <SwiperSlide key={index} className="flex justify-center items-center rounded-xl overflow-hidden">
                    <div className="relative group w-full h-full">
                      <div className="relative h-full w-full">
                        <Image
                          src={`${API_BASE_URL}${img.image}`}
                          alt={`Post Image ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 800px"
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                          loading="lazy"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/fighterfish.png";
                          }}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                        <span className="text-white text-sm font-medium">Image {index + 1} of {post.post.images.length}</span>
                        <button className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs hover:bg-white/30 transition-colors">
                          View Full
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="absolute top-4 right-4 z-10 bg-black/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
                {post.post.images.length} photos
              </div>
            </div>
          ) : (
            /* For sample posts with direct image URLs */
            <div className="relative">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                className="rounded-xl"
                style={{ height: '400px' }}
              >
                {post.post.images.map((imgUrl, index) => (
                  <SwiperSlide key={index} className="flex justify-center items-center rounded-xl overflow-hidden">
                    <div className="relative group w-full h-full">
                      <div className="relative h-full w-full">
                        <Image
                          src={imgUrl}
                          alt={`Post Image ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 800px"
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                          loading="lazy"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/fighterfish.png";
                          }}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                        <span className="text-white text-sm font-medium">Image {index + 1} of {post.post.images.length}</span>
                        <button className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs hover:bg-white/30 transition-colors">
                          View Full
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="absolute top-4 right-4 z-10 bg-black/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
                {post.post.images.length} photos
              </div>
            </div>
          )}
        </div>
      )}

      <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4 my-4">
        <div className="flex flex-wrap items-center justify-between text-gray-600 dark:text-gray-400 gap-2">
          <div className="flex items-center gap-3">
            {user ? (
              hasLiked ? (
                <button
                  onClick={() => handleUnlike(post.post.id, user.username)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <FaHeart className="text-red-500" />
                  <span className="font-medium">{post.post && post.post.likes ? post.post.likes.length : 0} Likes</span>
                </button>
              ) : (
                <button
                  onClick={() => handleLike(post.post.id, user.username)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <FaHeart className="text-gray-400 dark:text-gray-500 group-hover:text-primary-500" />
                  <span className="font-medium">{post.post && post.post.likes ? post.post.likes.length : 0} Likes</span>
                </button>
              )
            ) : (
              <button
                onClick={openLoginModal}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <FaHeart className="text-gray-400 dark:text-gray-500" />
                <span className="font-medium">{post.post && post.post.likes ? post.post.likes.length : 0} Likes</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative" ref={dropdownRef}>
              {/* Button to toggle dropdown */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <FaComment className="text-gray-400 dark:text-gray-500" />
                <span className="font-medium">{post.post && post.post.comments ? post.post.comments.length : 0} Comments</span>
              </button>

              {/* Dropdown menu */}
              {isOpen && (
                <div className="absolute left-0 mt-3 w-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 z-10 animate-fadeIn">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-gray-900 dark:text-gray-100 font-semibold">Comments ({post.post && post.post.comments ? post.post.comments.length : 0})</h3>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>

                  {post.post && post.post.comments && post.post.comments.length > 0 ? (
                    <div className="max-h-80 overflow-y-auto pr-1 space-y-3 custom-scrollbar">
                      {post.post.comments.map((comment) => {
                        return comment ? (
                          <div key={comment.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg mb-2 bg-gray-50 dark:bg-gray-900/50 transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-900/70">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 overflow-hidden">
                                {comment.user && comment.user.profileImg ? (
                                  <div className="relative w-full h-full">
                                    <Image
                                      src={comment.user.profileImg.startsWith('/') ? comment.user.profileImg : `${comment.user.profileImg}`}
                                      alt={comment.user.full_name}
                                      fill
                                      sizes="32px"
                                      className="object-cover"
                                      loading="lazy"
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/fighterfish.png";
                                      }}
                                    />
                                  </div>
                                ) : (
                                  <span>{(comment.name || (comment.user && comment.user.full_name) || 'A').charAt(0).toUpperCase()}</span>
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{comment.name || (comment.user && comment.user.full_name) || 'Anonymous'}</p>
                                <p className="text-xs text-gray-400 dark:text-gray-500">{comment.created_at ? new Date(comment.created_at).toLocaleString() : 'Unknown date'}</p>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 ml-11">{comment.content || ''}</p>
                          </div>
                        ) : null;
                      })}
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">No comments yet. Be the first to comment!</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 transform hover:-translate-y-0.5">
              <FaBookmark className="text-gray-400 dark:text-gray-500" />
              <span className="font-medium">Save</span>
            </button>
          </div>
        </div>
      </div>
      {user && (
        <div className="flex items-center bg-gray-50 dark:bg-gray-800/70 p-4 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus-within:border-primary-300 dark:focus-within:border-primary-700 focus-within:ring-2 focus-within:ring-primary-500/20">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-gray-700 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 mr-3 relative">
            <Image
              src={`${API_BASE_URL}${user.profileImg}`}
              alt={user ? user.full_name : "User"}
              fill
              sizes="40px"
              className="object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/fighterfish.png";
              }}
            />
          </div>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Write your comment..."
              className="w-full bg-white dark:bg-gray-700 px-4 py-2.5 rounded-full focus:outline-none text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 border border-gray-200 dark:border-gray-600 focus:border-primary-300 dark:focus:border-primary-700"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && comment.trim()) {
                  post.post && post.post.id && handleAddComment(post.post.id, user.username);
                }
              }}
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
              <button className="p-1.5 text-gray-400 hover:text-primary-500 dark:text-gray-500 dark:hover:text-primary-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <button
                className="ml-1 px-4 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium transform hover:-translate-y-0.5 active:translate-y-0"
                onClick={() => post.post && post.post.id && handleAddComment(post.post.id, user.username)}
                disabled={!comment.trim()}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

    </div>

  );
}

// Memoize the PostCard component to prevent unnecessary re-renders
export const PostCard = memo(PostCardComponent, (prevProps, nextProps) => {
  const prevPost = prevProps.post?.post;
  const nextPost = nextProps.post?.post;

  if (!prevPost || !nextPost) return false;

  // Basic shallow checks
  if (
    prevPost.id !== nextPost.id ||
    prevPost.content !== nextPost.content ||
    prevPost.title !== nextPost.title ||
    prevPost.likes.length !== nextPost.likes.length ||
    prevPost.comments.length !== nextPost.comments.length
  ) {
    return false;
  }

  // Optionally, compare comment IDs to detect changes even if length same
  const prevCommentIds = prevPost.comments.map(c => c.id).join(',');
  const nextCommentIds = nextPost.comments.map(c => c.id).join(',');

  if (prevCommentIds !== nextCommentIds) return false;

  return true;
});
