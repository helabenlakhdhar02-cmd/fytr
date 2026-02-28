import React from 'react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
      <span className="ml-2 text-gray-600 dark:text-gray-400">Loading...</span>
    </div>
  );
};

export default Loading;
