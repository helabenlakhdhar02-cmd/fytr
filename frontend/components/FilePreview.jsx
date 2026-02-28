'use client';

import React, { useState, useEffect } from 'react';
import { FaFile, FaFilePdf, FaFileImage, FaFileCode, FaFileAlt, FaFileArchive, FaExternalLinkAlt, FaDownload, FaExclamationTriangle, FaComment } from 'react-icons/fa';

const FilePreview = ({ submission }) => {
  const [previewType, setPreviewType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!submission) {
      setPreviewType(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    // Determine preview type based on submission data
    if (submission.file_url) {
      // Handle file URL
      const url = submission.file_url.toLowerCase();
      if (url.match(/\.(jpeg|jpg|gif|png)$/)) {
        setPreviewType('image');
      } else if (url.match(/\.(pdf)$/)) {
        setPreviewType('pdf');
      } else if (url.match(/\.(html|htm)$/)) {
        setPreviewType('html');
      } else if (url.match(/\.(txt|md|js|jsx|ts|tsx|css|json|xml|yaml|yml)$/)) {
        setPreviewType('code');
      } else if (url.match(/\.(zip|rar|7z|tar|gz)$/)) {
        setPreviewType('archive');
      } else if (url.match(/\.(doc|docx|xls|xlsx|ppt|pptx)$/)) {
        setPreviewType('office');
      } else {
        setPreviewType('file');
      }
    } else if (submission.external_link) {
      // Handle external link
      const url = submission.external_link.toLowerCase();
      if (url.includes('figma.com')) {
        setPreviewType('figma');
      } else if (url.includes('github.com')) {
        setPreviewType('github');
      } else if (url.includes('behance.net')) {
        setPreviewType('behance');
      } else if (url.includes('dribbble.com')) {
        setPreviewType('dribbble');
      } else if (url.match(/\.(jpeg|jpg|gif|png)$/)) {
        setPreviewType('image');
      } else if (url.match(/\.(pdf)$/)) {
        setPreviewType('pdf');
      } else {
        setPreviewType('link');
      }
    } else {
      setPreviewType(null);
    }

    setIsLoading(false);
  }, [submission]);

  // Handle preview loading error
  const handlePreviewError = () => {
    setError('Failed to load preview');
    setPreviewType('error');
  };

  // Render preview based on type
  const renderPreview = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-64 bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center">
          <FaExclamationTriangle className="text-yellow-500 text-3xl mb-2" />
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-1">Preview Unavailable</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
            We couldn't generate a preview for this file. Please download it to view.
          </p>
          {submission?.file_url && (
            <a
              href={submission.file_url}
              download
              className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <FaDownload className="mr-2" />
              Download File
            </a>
          )}
        </div>
      );
    }

    if (!submission) {
      return (
        <div className="flex flex-col items-center justify-center h-64 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <FaFile className="text-gray-400 text-3xl mb-2" />
          <p className="text-gray-500 dark:text-gray-400">No submission available</p>
        </div>
      );
    }

    switch (previewType) {
      case 'image':
        const imageUrl = submission.file_url || submission.external_link;
        return (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            <div className="aspect-video flex items-center justify-center bg-white dark:bg-gray-900 p-2">
              <img
                src={imageUrl}
                alt="Submission Preview"
                className="max-w-full max-h-[400px] object-contain"
                onError={handlePreviewError}
              />
            </div>
            <div className="p-3 flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Image Preview</span>
              <a
                href={imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm flex items-center"
              >
                Open Full Size <FaExternalLinkAlt className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>
        );

      case 'pdf':
        const pdfUrl = submission.file_url || submission.external_link;
        return (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            <div className="aspect-video bg-white dark:bg-gray-900">
              <iframe
                src={pdfUrl}
                title="PDF Preview"
                className="w-full h-[400px]"
                onError={handlePreviewError}
              />
            </div>
            <div className="p-3 flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">PDF Document</span>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm flex items-center"
              >
                Open in New Tab <FaExternalLinkAlt className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>
        );

      case 'html':
        return (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            <div className="aspect-video bg-white dark:bg-gray-900">
              <iframe
                src={submission.file_url}
                title="HTML Preview"
                className="w-full h-[400px]"
                sandbox="allow-scripts allow-same-origin"
                onError={handlePreviewError}
              />
            </div>
            <div className="p-3 flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">HTML Preview</span>
              <a
                href={submission.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm flex items-center"
              >
                Open in New Tab <FaExternalLinkAlt className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>
        );

      case 'figma':
      case 'github':
      case 'behance':
      case 'dribbble':
        const platformName = previewType.charAt(0).toUpperCase() + previewType.slice(1);
        let platformIcon;

        switch (previewType) {
          case 'figma':
            platformIcon = '🎨';
            break;
          case 'github':
            platformIcon = '💻';
            break;
          case 'behance':
            platformIcon = '🎭';
            break;
          case 'dribbble':
            platformIcon = '🏀';
            break;
          default:
            platformIcon = '🔗';
        }

        return (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            <div className="p-6 text-center">
              <div className="text-4xl mb-3">{platformIcon}</div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-1">
                {platformName} Project
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                This submission is hosted on {platformName}
              </p>
              <a
                href={submission.external_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                View on {platformName} <FaExternalLinkAlt className="ml-2 h-3 w-3" />
              </a>
            </div>
          </div>
        );

      case 'link':
        return (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden p-6 text-center">
            <div className="text-4xl mb-3">🔗</div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-1">
              External Link
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 break-all">
              {submission.external_link}
            </p>
            <a
              href={submission.external_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mt-4"
            >
              Open Link <FaExternalLinkAlt className="ml-2 h-3 w-3" />
            </a>
          </div>
        );

      case 'file':
      case 'archive':
      case 'office':
      case 'code':
        let icon = <FaFile className="text-blue-500 text-4xl mb-3" />;
        let fileType = 'File';

        if (previewType === 'archive') {
          icon = <FaFileArchive className="text-orange-500 text-4xl mb-3" />;
          fileType = 'Archive';
        } else if (previewType === 'office') {
          icon = <FaFileAlt className="text-red-500 text-4xl mb-3" />;
          fileType = 'Document';
        } else if (previewType === 'code') {
          icon = <FaFileCode className="text-green-500 text-4xl mb-3" />;
          fileType = 'Code';
        }

        // Extract filename from URL
        const url = submission.file_url;
        const filename = url ? url.split('/').pop() : 'file';

        return (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden p-6 text-center">
            {icon}
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-1">
              {fileType} Download
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 break-all">
              {filename}
            </p>
            <a
              href={url}
              download
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mt-4"
            >
              <FaDownload className="mr-2" />
              Download {fileType}
            </a>
          </div>
        );

      case 'error':
        return (
          <div className="flex flex-col items-center justify-center h-64 bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center">
            <FaExclamationTriangle className="text-yellow-500 text-3xl mb-2" />
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-1">Preview Unavailable</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
              {error || "We couldn't generate a preview for this submission."}
            </p>
            {submission?.file_url && (
              <a
                href={submission.file_url}
                download
                className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <FaDownload className="mr-2" />
                Download File
              </a>
            )}
            {submission?.external_link && (
              <a
                href={submission.external_link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <FaExternalLinkAlt className="mr-2" />
                Open Link
              </a>
            )}
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center h-64 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <FaFile className="text-gray-400 text-3xl mb-2" />
            <p className="text-gray-500 dark:text-gray-400">No preview available</p>
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      {renderPreview()}

      {/* Comment section if available */}
      {submission?.comment && (
        <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
            <FaComment className="text-blue-500 mr-2" />
            Freelancer Comment
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {submission.comment}
          </p>
        </div>
      )}
    </div>
  );
};

export default FilePreview;
