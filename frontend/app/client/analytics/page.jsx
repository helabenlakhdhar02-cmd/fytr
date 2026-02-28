'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import Navbar from '../../../components/Navbar';
import {
  FaChartLine,
  FaChartBar,
  FaChartPie,
  FaCalendarAlt,
  FaUsers,
  FaMoneyBillWave,
  FaArrowUp,
  FaArrowDown,
  FaFilter,
  FaDownload
} from 'react-icons/fa';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title } from 'chart.js';
import { Pie, Line, Bar, Doughnut } from 'react-chartjs-2';
import { mockProjects, mockClients } from '../../../lib/mockData';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title
);

const ClientAnalyticsPage = () => {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('6months');
  const [projects, setProjects] = useState([]);
  const [freelancers, setFreelancers] = useState([]);

  // Fetch data
  useEffect(() => {
    // In a real app, this would fetch from an API
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // For now, use mock data
        setProjects(mockProjects);
        setFreelancers(mockProjects.map(p => p.assigned_freelancer).filter(Boolean));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!loading) {
      if (!isAuthenticated) {
        // Redirect to login if not authenticated
        router.push('/login');
      } else {
        fetchData();
      }
    }
  }, [isAuthenticated, loading, router]);

  // Generate chart data
  const generateChartData = () => {
    // Project status distribution for pie chart
    const statusData = {
      labels: ['In Progress', 'Pending', 'Completed'],
      datasets: [
        {
          data: [
            projects.filter(p => p.status === 'in_progress').length,
            projects.filter(p => p.status === 'pending').length,
            projects.filter(p => p.status === 'completed').length,
          ],
          backgroundColor: [
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    // Monthly projects data for line chart
    const monthlyData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Projects Posted',
          data: [2, 3, 1, 4, 2, 3, 5, 2, 4, 3, 1, 2],
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          tension: 0.4,
        },
        {
          label: 'Projects Completed',
          data: [1, 2, 1, 3, 1, 2, 3, 1, 2, 2, 0, 1],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.4,
        },
      ],
    };

    // Budget allocation for bar chart
    const budgetData = {
      labels: ['Web Dev', 'Design', 'Marketing', 'Mobile Dev', 'Content', 'AI/ML'],
      datasets: [
        {
          label: 'Budget Allocation ($)',
          data: [2500, 1200, 800, 3500, 600, 1800],
          backgroundColor: 'rgba(153, 102, 255, 0.7)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
        },
      ],
    };

    // Freelancer performance for doughnut chart
    const freelancerData = {
      labels: ['On Time', 'Delayed', 'Early Delivery'],
      datasets: [
        {
          data: [70, 20, 10],
          backgroundColor: [
            'rgba(75, 192, 192, 0.7)',
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    return { statusData, monthlyData, budgetData, freelancerData };
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'gray',
          font: {
            size: 12
          }
        }
      }
    }
  };

  // Calculate statistics
  const calculateStats = () => {
    const totalBudget = projects.reduce((sum, project) => sum + (project.budget || 0), 0);
    const completedProjects = projects.filter(p => p.status === 'completed');
    const completedBudget = completedProjects.reduce((sum, project) => sum + (project.budget || 0), 0);

    return {
      totalProjects: projects.length,
      activeProjects: projects.filter(p => p.status === 'in_progress').length,
      completedProjects: completedProjects.length,
      totalBudget,
      completedBudget,
      avgProjectCost: projects.length > 0 ? totalBudget / projects.length : 0,
      totalFreelancers: freelancers.length,
      projectCompletionRate: projects.length > 0 ? (completedProjects.length / projects.length) * 100 : 0
    };
  };

  const stats = calculateStats();

  // Show loading state
  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Analytics Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Track your project performance and budget allocation
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex space-x-3">
            <div className="relative">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white appearance-none"
              >
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="6months">Last 6 Months</option>
                <option value="1year">Last Year</option>
                <option value="all">All Time</option>
              </select>
              <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" size={16} />
            </div>

            <button className="flex items-center bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
              <FaDownload className="mr-2" size={14} />
              Export
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Projects</h3>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <FaChartBar className="text-blue-600 dark:text-blue-400" size={16} />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats.totalProjects}
            </p>
            <div className="flex items-center mt-2 text-sm">
              <span className="text-green-500 flex items-center mr-2">
                <FaArrowUp size={12} className="mr-1" />
                12%
              </span>
              <span className="text-gray-500 dark:text-gray-400">vs last period</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Budget</h3>
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                <FaMoneyBillWave className="text-green-600 dark:text-green-400" size={16} />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              ${stats.totalBudget.toLocaleString()}
            </p>
            <div className="flex items-center mt-2 text-sm">
              <span className="text-green-500 flex items-center mr-2">
                <FaArrowUp size={12} className="mr-1" />
                8.5%
              </span>
              <span className="text-gray-500 dark:text-gray-400">vs last period</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Completion Rate</h3>
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <FaChartPie className="text-purple-600 dark:text-purple-400" size={16} />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats.projectCompletionRate.toFixed(1)}%
            </p>
            <div className="flex items-center mt-2 text-sm">
              <span className="text-red-500 flex items-center mr-2">
                <FaArrowDown size={12} className="mr-1" />
                2.3%
              </span>
              <span className="text-gray-500 dark:text-gray-400">vs last period</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg. Project Cost</h3>
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                <FaUsers className="text-yellow-600 dark:text-yellow-400" size={16} />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              ${stats.avgProjectCost.toFixed(0)}
            </p>
            <div className="flex items-center mt-2 text-sm">
              <span className="text-green-500 flex items-center mr-2">
                <FaArrowUp size={12} className="mr-1" />
                5.2%
              </span>
              <span className="text-gray-500 dark:text-gray-400">vs last period</span>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Project Activity</h3>
            <div className="h-80">
              <Line data={generateChartData().monthlyData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Budget Allocation</h3>
            <div className="h-80">
              <Bar data={generateChartData().budgetData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Project Status</h3>
            <div className="h-80">
              <Pie data={generateChartData().statusData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Freelancer Performance</h3>
            <div className="h-80">
              <Doughnut data={generateChartData().freelancerData} options={chartOptions} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientAnalyticsPage;