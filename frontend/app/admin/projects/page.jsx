'use client';

import { useState, useEffect } from 'react';
import {
  FaSearch,
  FaFilter,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaExclamationTriangle,
  FaCalendarAlt,
  FaUsers,
  FaMoneyBillWave
} from 'react-icons/fa';
import Link from 'next/link';

export default function ProjectsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  // Mock project data
  const mockProjects = [
    {
      id: 1,
      title: 'E-commerce Website Redesign',
      client: 'Global Shop Inc.',
      clientId: 12,
      description: 'Complete redesign of an e-commerce platform with modern UI/UX principles',
      type: 'SoloFin',
      status: 'active',
      budget: 2500,
      deadline: '2023-12-15',
      createdAt: '2023-09-05',
      applicants: 8,
      assignedTo: [
        { id: 101, name: 'John Doe', role: 'UI Designer', img: '/fighterfish.png' }
      ]
    },
    {
      id: 2,
      title: 'Mobile App Development',
      client: 'TechStart Solutions',
      clientId: 15,
      description: 'Develop a cross-platform mobile application for task management',
      type: 'BettaArena',
      status: 'pending',
      budget: 4800,
      deadline: '2024-01-20',
      createdAt: '2023-10-12',
      applicants: 12,
      assignedTo: []
    },
    {
      id: 3,
      title: 'Content Marketing Strategy',
      client: 'Bloom Marketing',
      clientId: 8,
      description: 'Create a comprehensive content marketing strategy for Q1 2024',
      type: 'SoloFin',
      status: 'completed',
      budget: 1800,
      deadline: '2023-11-30',
      createdAt: '2023-08-22',
      applicants: 5,
      assignedTo: [
        { id: 105, name: 'Sarah Brown', role: 'Marketing Specialist', img: '/fighterfish.png' }
      ]
    },
    {
      id: 4,
      title: 'Database Optimization',
      client: 'DataFlow Systems',
      clientId: 23,
      description: 'Optimize database performance and implement better query structures',
      type: 'BettaArena',
      status: 'active',
      budget: 3200,
      deadline: '2023-12-28',
      createdAt: '2023-10-05',
      applicants: 6,
      assignedTo: [
        { id: 110, name: 'Michael Chen', role: 'Database Engineer', img: '/fighterfish.png' },
        { id: 112, name: 'Lisa Wong', role: 'Backend Developer', img: '/fighterfish.png' }
      ]
    },
    {
      id: 5,
      title: 'Brand Identity Design',
      client: 'Startup Ventures',
      clientId: 17,
      description: 'Design a complete brand identity including logo, color palette, and style guide',
      type: 'SoloFin',
      status: 'cancelled',
      budget: 2000,
      deadline: '2023-11-15',
      createdAt: '2023-09-18',
      applicants: 10,
      assignedTo: []
    },
    {
      id: 6,
      title: 'SEO Optimization Campaign',
      client: 'GrowthHackers',
      clientId: 29,
      description: 'Implement SEO best practices to improve organic search rankings',
      type: 'SoloFin',
      status: 'active',
      budget: 1500,
      deadline: '2024-01-10',
      createdAt: '2023-10-25',
      applicants: 4,
      assignedTo: [
        { id: 118, name: 'Robert Johnson', role: 'SEO Specialist', img: '/fighterfish.png' }
      ]
    }
  ];

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setProjects(mockProjects);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter projects based on search query and filters
  const filteredProjects = projects.filter(project => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    const matchesType = filterType === 'all' || project.type === filterType;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Status badge component
  const StatusBadge = ({ status }) => {
    const badgeClasses = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
    };

    const statusLabels = {
      active: 'Active',
      pending: 'Pending',
      completed: 'Completed',
      cancelled: 'Cancelled'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${badgeClasses[status] || badgeClasses.pending}`}>
        {statusLabels[status] || status}
      </span>
    );
  };

  // Type badge component
  const TypeBadge = ({ type }) => {
    const badgeClasses = {
      SoloFin: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      BettaArena: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${badgeClasses[type] || badgeClasses.SoloFin}`}>
        {type}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            View and manage projects
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link
            href="/admin/projects/add"
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg shadow-sm transition-colors duration-200 flex items-center justify-center"
          >
            <FaPlus className="mr-2" />
            Add New Project
          </Link>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center">
              <FaFilter className="text-gray-400 mr-2" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex items-center ml-0 md:ml-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Types</option>
                <option value="SoloFin">SoloFin</option>
                <option value="BettaArena">BettaArena</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Loading projects...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Project
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Budget
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Deadline
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {project.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Client: {project.client}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <TypeBadge type={project.type} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={project.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      ${project.budget.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(project.deadline).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          href={`/admin/projects/${project.id}`}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                          title="View Details"
                        >
                          <FaEye />
                        </Link>
                        <button className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300" title="Edit">
                          <FaEdit />
                        </button>
                        <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300" title="Delete">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!isLoading && filteredProjects.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No projects found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
