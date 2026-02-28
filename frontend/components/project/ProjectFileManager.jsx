'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaEye, FaFile, FaFileAlt, FaFileArchive, FaFileCode, FaFileImage, FaFilePdf, FaFolder, FaFolderOpen, FaPlus, FaTrash, FaUpload } from 'react-icons/fa';

const ProjectFileManager = ({ projectFiles = [], onUpload, onDelete, onCreateFolder }) => {
  const [currentFolder, setCurrentFolder] = useState('/');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Get file icon based on file type
  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'image':
        return <FaFileImage className="text-blue-500" />;
      case 'pdf':
        return <FaFilePdf className="text-red-500" />;
      case 'zip':
      case 'rar':
        return <FaFileArchive className="text-yellow-500" />;
      case 'code':
        return <FaFileCode className="text-green-500" />;
      case 'doc':
      case 'docx':
      case 'txt':
        return <FaFileAlt className="text-blue-400" />;
      case 'folder':
        return <FaFolder className="text-yellow-600 dark:text-yellow-400" />;
      default:
        return <FaFile className="text-gray-500" />;
    }
  };

  // Get files in current folder
  const getCurrentFolderFiles = () => {
    let files = projectFiles.filter(file => {
      // Check if file is in current folder
      const isInCurrentFolder = file.path.startsWith(currentFolder) && 
        file.path.split('/').length === currentFolder.split('/').filter(Boolean).length + 2;
      
      // Apply search filter if any
      const matchesSearch = searchQuery 
        ? file.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
        
      return isInCurrentFolder && matchesSearch;
    });

    // Sort files
    files.sort((a, b) => {
      // Folders first
      if (a.type === 'folder' && b.type !== 'folder') return -1;
      if (a.type !== 'folder' && b.type === 'folder') return 1;

      // Then sort by selected criteria
      let valueA, valueB;
      
      switch (sortBy) {
        case 'name':
          valueA = a.name.toLowerCase();
          valueB = b.name.toLowerCase();
          break;
        case 'size':
          valueA = a.size || 0;
          valueB = b.size || 0;
          break;
        case 'date':
          valueA = new Date(a.uploadedAt || 0);
          valueB = new Date(b.uploadedAt || 0);
          break;
        case 'type':
          valueA = a.type;
          valueB = b.type;
          break;
        default:
          valueA = a.name.toLowerCase();
          valueB = b.name.toLowerCase();
      }

      // Apply sort order
      if (sortOrder === 'asc') {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      } else {
        return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
      }
    });

    return files;
  };

  // Get breadcrumb path
  const getBreadcrumbPath = () => {
    const parts = currentFolder.split('/').filter(Boolean);
    let path = '/';
    
    return [
      { name: 'Home', path: '/' },
      ...parts.map(part => {
        path += part + '/';
        return { name: part, path };
      })
    ];
  };

  // Handle file selection
  const toggleFileSelection = (fileId) => {
    if (selectedFiles.includes(fileId)) {
      setSelectedFiles(selectedFiles.filter(id => id !== fileId));
    } else {
      setSelectedFiles([...selectedFiles, fileId]);
    }
  };

  // Handle folder navigation
  const navigateToFolder = (folderPath) => {
    setCurrentFolder(folderPath);
    setSelectedFiles([]);
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Simulate upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowUploadModal(false);
            setUploadProgress(0);
            // Call the onUpload callback with the files and current folder
            if (onUpload) {
              onUpload(Array.from(files), currentFolder);
            }
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  // Handle file deletion
  const handleDeleteSelected = () => {
    if (onDelete && selectedFiles.length > 0) {
      onDelete(selectedFiles);
      setSelectedFiles([]);
    }
  };

  // Handle folder creation
  const handleCreateFolder = () => {
    const folderName = prompt('Enter folder name:');
    if (folderName && onCreateFolder) {
      onCreateFolder(currentFolder, folderName);
    }
  };

  const currentFiles = getCurrentFolderFiles();
  const breadcrumbs = getBreadcrumbPath();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Project Files</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {viewMode === 'grid' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            )}
          </button>
          <button
            onClick={() => setShowUploadModal(true)}
            className="p-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center"
          >
            <FaUpload className="mr-1" size={14} />
            <span className="text-sm">Upload</span>
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="p-3 bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700 flex flex-wrap gap-2 justify-between">
        {/* Breadcrumbs */}
        <div className="flex items-center overflow-x-auto whitespace-nowrap">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.path}>
              {index > 0 && <span className="mx-1 text-gray-500 dark:text-gray-400">/</span>}
              <button
                onClick={() => navigateToFolder(crumb.path)}
                className={`text-sm ${
                  index === breadcrumbs.length - 1
                    ? 'font-medium text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {crumb.name}
              </button>
            </React.Fragment>
          ))}
        </div>

        {/* Search and Actions */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="name">Name</option>
            <option value="date">Date</option>
            <option value="size">Size</option>
            <option value="type">Type</option>
          </select>
          
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="p-1 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
          >
            {sortOrder === 'asc' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* File Actions */}
      {selectedFiles.length > 0 && (
        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800 flex justify-between items-center">
          <span className="text-sm text-blue-700 dark:text-blue-300">
            {selectedFiles.length} {selectedFiles.length === 1 ? 'file' : 'files'} selected
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedFiles([])}
              className="px-3 py-1 text-xs text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteSelected}
              className="px-3 py-1 text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 flex items-center"
            >
              <FaTrash className="mr-1" size={12} />
              Delete
            </button>
            <button
              onClick={() => console.log('Download selected')}
              className="px-3 py-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center"
            >
              <FaDownload className="mr-1" size={12} />
              Download
            </button>
          </div>
        </div>
      )}

      {/* File List */}
      <div className="p-4 overflow-auto" style={{ maxHeight: '400px' }}>
        {currentFiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <FaFolder className="text-gray-300 dark:text-gray-600 mb-3" size={48} />
            <p className="text-gray-500 dark:text-gray-400 mb-4">No files in this folder</p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm flex items-center"
              >
                <FaUpload className="mr-2" size={14} />
                Upload Files
              </button>
              <button
                onClick={handleCreateFolder}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm flex items-center"
              >
                <FaFolderOpen className="mr-2" size={14} />
                Create Folder
              </button>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {currentFiles.map((file) => (
              <div
                key={file.id}
                onClick={() => file.type === 'folder' 
                  ? navigateToFolder(file.path) 
                  : toggleFileSelection(file.id)
                }
                className={`p-3 rounded-lg border ${
                  selectedFiles.includes(file.id)
                    ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                } cursor-pointer transition-colors`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 flex items-center justify-center mb-2">
                    {getFileIcon(file.type)}
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate w-full">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {file.type !== 'folder' && file.size}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {currentFiles.map((file) => (
              <div
                key={file.id}
                onClick={() => file.type === 'folder' 
                  ? navigateToFolder(file.path) 
                  : toggleFileSelection(file.id)
                }
                className={`py-2 px-3 flex items-center justify-between ${
                  selectedFiles.includes(file.id)
                    ? 'bg-blue-50 dark:bg-blue-900/20'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-750'
                } cursor-pointer rounded-lg transition-colors`}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 flex items-center justify-center mr-3">
                    {getFileIcon(file.type)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {file.type !== 'folder' 
                        ? `${file.size} • ${new Date(file.uploadedAt).toLocaleDateString()}`
                        : 'Folder'
                      }
                    </p>
                  </div>
                </div>
                {file.type !== 'folder' && (
                  <div className="flex space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Preview file', file.id);
                      }}
                      className="p-1 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FaEye size={14} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Download file', file.id);
                      }}
                      className="p-1 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FaDownload size={14} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Upload Files
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Select files to upload to <span className="font-medium">{currentFolder}</span>
            </p>
            
            <div className="mb-4">
              <label className="block w-full p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-400">
                <FaUpload className="mx-auto text-gray-400 dark:text-gray-500 mb-2" size={24} />
                <span className="text-gray-600 dark:text-gray-400">Click to select files or drag and drop</span>
                <input 
                  type="file" 
                  multiple 
                  className="hidden" 
                  onChange={handleFileUpload}
                />
              </label>
            </div>
            
            {uploadProgress > 0 && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Uploading...</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectFileManager;
