'use client';

import { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaUserPlus, FaEllipsisH, FaEdit, FaTrash, FaBan, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';

export default function UsersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  // Mock user data
  const mockUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'freelancer',
      status: 'active',
      joinDate: '2023-05-15',
      profileImg: '/fighterfish.png'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'client',
      status: 'active',
      joinDate: '2023-06-22',
      profileImg: '/fighterfish.png'
    },
    {
      id: 3,
      name: 'Robert Johnson',
      email: 'robert.johnson@example.com',
      role: 'formateur',
      status: 'active',
      joinDate: '2023-04-10',
      profileImg: '/fighterfish.png'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      role: 'client',
      status: 'suspended',
      joinDate: '2023-07-05',
      profileImg: '/fighterfish.png'
    },
    {
      id: 5,
      name: 'Michael Wilson',
      email: 'michael.wilson@example.com',
      role: 'freelancer',
      status: 'active',
      joinDate: '2023-03-18',
      profileImg: '/fighterfish.png'
    },
    {
      id: 6,
      name: 'Sarah Brown',
      email: 'sarah.brown@example.com',
      role: 'admin',
      status: 'active',
      joinDate: '2023-02-01',
      profileImg: '/fighterfish.png'
    }
  ];

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setUsers(mockUsers);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter users based on search query and role filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    
    return matchesSearch && matchesRole;
  });

  // Role badge component
  const RoleBadge = ({ role }) => {
    const badgeClasses = {
      admin: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      freelancer: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      client: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      formateur: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
    };

    const roleLabels = {
      admin: 'Admin',
      freelancer: 'Freelancer',
      client: 'Client',
      formateur: 'Trainer'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${badgeClasses[role] || badgeClasses.client}`}>
        {roleLabels[role] || role}
      </span>
    );
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const badgeClasses = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      suspended: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${badgeClasses[status] || badgeClasses.active}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600 dark:border-primary-400 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            View and manage all users on the platform
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link 
            href="/admin/users/add" 
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg shadow-sm transition-colors duration-200 flex items-center justify-center"
          >
            <FaUserPlus className="mr-2" />
            Add New User
          </Link>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <FaFilter className="text-gray-400 mr-2" />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="freelancer">Freelancer</option>
                <option value="client">Client</option>
                <option value="formateur">Trainer</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Joined
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img 
                          className="h-10 w-10 rounded-full object-cover border border-gray-200 dark:border-gray-700" 
                          src={user.profileImg} 
                          alt={user.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/fighterfish.png";
                          }}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <RoleBadge role={user.role} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(user.joinDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300" title="Edit">
                        <FaEdit />
                      </button>
                      <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300" title="Delete">
                        <FaTrash />
                      </button>
                      <button className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300" title="Suspend">
                        <FaBan />
                      </button>
                      <button className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300" title="Email">
                        <FaEnvelope />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredUsers.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No users found matching your criteria</p>
          </div>
        )}
        
        {/* Pagination */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-medium">{filteredUsers.length}</span> of <span className="font-medium">{users.length}</span> users
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
