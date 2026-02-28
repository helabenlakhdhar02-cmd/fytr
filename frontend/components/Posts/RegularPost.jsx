'use client';

import { useState } from 'react';
import { FaHeart, FaRegHeart, FaComment, FaShare, FaEllipsisH } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

export default function RegularPost({ post }) {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 mb-6">
      {/* Post Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={post.author.avatar || "/images/default-avatar.png"}
            alt={post.author.name}
            className="w-10 h-10 rounded-full mr-3 object-cover"
          />
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">{post.author.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{post.timeAgo}</p>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <FaEllipsisH className="text-gray-500 dark:text-gray-400" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700">
              <div className="py-1">
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Save Post
                </button>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Report Post
                </button>
                <button className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Hide Post
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Post Content */}
      <div className="p-4">
        <p className="text-gray-800 dark:text-gray-200 mb-4">{post.content}</p>

        {post.image && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img
              src={post.image}
              alt="Post image"
              className="w-full object-cover max-h-96"
            />
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="bg-white dark:bg-gray-700/50 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleLike}
            className="flex items-center text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          >
            {liked ? (
              <FaHeart className="h-5 w-5 mr-1 text-red-500" />
            ) : (
              <FaRegHeart className="h-5 w-5 mr-1" />
            )}
            {liked ? 'Liked' : 'Like'}
          </button>
          <button
            onClick={toggleComments}
            className="flex items-center text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          >
            <FaComment className="h-5 w-5 mr-1" />
            Comment
          </button>
          <button className="flex items-center text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
            <FaShare className="h-5 w-5 mr-1" />
            Share
          </button>
        </div>
      </div>

      {/* Comments Section (conditionally rendered) */}
      {showComments && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="mb-4">
            <div className="flex items-start mb-4">
              <img
                src="/images/default-avatar.png"
                alt="User"
                className="w-8 h-8 rounded-full mr-3 object-cover"
              />
              <div className="flex-1">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">John Doe</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">Great post! Thanks for sharing.</p>
                </div>
                <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                  <button className="mr-2 hover:text-blue-600 dark:hover:text-blue-400">Like</button>
                  <button className="mr-2 hover:text-blue-600 dark:hover:text-blue-400">Reply</button>
                  <span>2h ago</span>
                </div>
              </div>
            </div>

            {/* Add Comment Form */}
            <div className="flex items-start">
              <img
                src="/images/default-avatar.png"
                alt="User"
                className="w-8 h-8 rounded-full mr-3 object-cover"
              />
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
