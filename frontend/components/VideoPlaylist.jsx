import React, { useRef, useEffect } from 'react';
import { FaPlay, FaCheck, FaClock } from 'react-icons/fa';

const VideoPlaylist = ({ videos, currentIndex, onVideoSelect }) => {
  const playlistRef = useRef(null);
  const currentVideoRef = useRef(null);

  // Auto-scroll to the current video when it changes
  useEffect(() => {
    if (currentVideoRef.current && playlistRef.current) {
      const container = playlistRef.current;
      const element = currentVideoRef.current;

      // Calculate position to scroll to
      const elementTop = element.offsetTop;
      const containerScrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const elementHeight = element.clientHeight;

      // If element is not visible, scroll to it
      if (
        elementTop < containerScrollTop ||
        elementTop + elementHeight > containerScrollTop + containerHeight
      ) {
        container.scrollTo({
          top: elementTop - containerHeight / 2 + elementHeight / 2,
          behavior: 'smooth',
        });
      }
    }
  }, [currentIndex]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Course Content
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {videos.length} lessons • {videos.filter(v => v.completed).length} completed
        </p>
      </div>

      <div
        ref={playlistRef}
        className="overflow-y-auto"
        style={{
          height: '350px'
        }}
      >
        {videos.map((video, index) => (
          <div
            key={video.id}
            ref={index === currentIndex ? currentVideoRef : null}
            onClick={() => onVideoSelect(index)}
            className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 ${
              index === currentIndex ? 'bg-blue-50 dark:bg-blue-900/20' : ''
            }`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                {video.completed ? (
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <FaCheck className="text-green-600 dark:text-green-400 text-xs" />
                  </div>
                ) : index === currentIndex ? (
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <FaPlay className="text-blue-600 dark:text-blue-400 text-xs" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-600 dark:text-gray-400 text-xs font-medium">
                      {index + 1}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <h3 className={`font-medium text-sm ${
                  index === currentIndex
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {video.title}
                </h3>

                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                  {video.description}
                </p>

                <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-500">
                  <FaClock className="mr-1" />
                  <span>{video.duration}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPlaylist;
