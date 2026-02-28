'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FaUsers,
  FaBriefcase,
  FaMoneyBillWave,
  FaBan,
  FaUserPlus,
  FaFileAlt,
  FaCreditCard,
  FaExclamationTriangle,
  FaGraduationCap,
  FaChartLine,
  FaComments,
  FaFlag,
  FaCog,
  FaArrowRight,
  FaClipboardList,
  FaBook,
  FaTasks,
  FaUserShield,
  FaCheckCircle,
  FaChartBar
} from 'react-icons/fa';
import StatCard from '../../components/admin/StatCard';
import ActivityFeed from '../../components/admin/ActivityFeed';
import AdminCharts from '../../components/admin/AdminCharts';
import PageHeader from '../../components/admin/PageHeader';
import AdminSection from '../../components/admin/AdminSection';
import StatsGrid from '../../components/admin/StatsGrid';
import ContentGrid from '../../components/admin/ContentGrid';
import LinkCard from '../../components/admin/LinkCard';

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeProjects: 0,
    monthlyRevenue: 0,
    suspendedAccounts: 0,
    activeCourses: 0,
    pendingReviews: 0,
    completedProjects: 0,
    totalTrainers: 0,
    totalClients: 0,
    pendingWithdrawals: 0,
    userReports: 0,
    platformConversion: 0
  });

  // Mock data for demonstration
  const mockStats = {
    totalUsers: 1245,
    activeProjects: 87,
    monthlyRevenue: 24680,
    suspendedAccounts: 12,
    activeCourses: 156,
    pendingReviews: 23,
    completedProjects: 342,
    totalTrainers: 378,
    totalClients: 867,
    pendingWithdrawals: 15,
    userReports: 8,
    platformConversion: 68.5
  };

  // Mock activity data
  const mockActivity = [
    {
      id: 1,
      type: 'user_registered',
      icon: <FaUserPlus className="text-green-500" />,
      title: 'New User Registered',
      description: 'John Doe joined as a Freelancer',
      time: '10 minutes ago'
    },
    {
      id: 2,
      type: 'project_posted',
      icon: <FaFileAlt className="text-blue-500" />,
      title: 'New Project Posted',
      description: 'Website Redesign project posted by Client XYZ',
      time: '45 minutes ago'
    },
    {
      id: 3,
      type: 'payment_processed',
      icon: <FaCreditCard className="text-purple-500" />,
      title: 'Payment Processed',
      description: '$750 payment for Project ABC completed',
      time: '2 hours ago'
    },
    {
      id: 4,
      type: 'report_submitted',
      icon: <FaExclamationTriangle className="text-yellow-500" />,
      title: 'Report Submitted',
      description: 'Content violation reported in Forum Thread #123',
      time: '3 hours ago'
    },
    {
      id: 5,
      type: 'user_registered',
      icon: <FaUserPlus className="text-green-500" />,
      title: 'New User Registered',
      description: 'Jane Smith joined as a Client',
      time: '5 hours ago'
    }
  ];

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats(mockStats);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600 dark:border-primary-400 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        title="Overview"
        description="Platform stats and activity"
        action={
          <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg shadow-sm transition-colors duration-200 flex items-center">
            <FaFileAlt className="mr-2" />
            Generate Report
          </button>
        }
      />

      {/* Primary Stats */}
      <StatsGrid>
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<FaUsers />}
          color="blue"
          change={+12.5}
          changeLabel="vs last month"
        />
        <StatCard
          title="Active Projects"
          value={stats.activeProjects}
          icon={<FaBriefcase />}
          color="green"
          change={+8.2}
          changeLabel="vs last month"
        />
        <StatCard
          title="Revenue This Month"
          value={`$${stats.monthlyRevenue.toLocaleString()}`}
          icon={<FaMoneyBillWave />}
          color="purple"
          change={+15.3}
          changeLabel="vs last month"
        />
        <StatCard
          title="Pending Reviews"
          value={stats.pendingReviews}
          icon={<FaClipboardList />}
          color="orange"
          change={+4.7}
          changeLabel="vs last month"
        />
      </StatsGrid>

      {/* Secondary Stats */}
      <StatsGrid>
        <StatCard
          title="Active Courses"
          value={stats.activeCourses}
          icon={<FaGraduationCap />}
          color="indigo"
          change={+10.8}
          changeLabel="vs last month"
        />
        <StatCard
          title="Completed Projects"
          value={stats.completedProjects}
          icon={<FaCheckCircle />}
          color="teal"
          change={+5.4}
          changeLabel="vs last month"
        />
        <StatCard
          title="Pending Withdrawals"
          value={stats.pendingWithdrawals}
          icon={<FaCreditCard />}
          color="pink"
          change={+2.3}
          changeLabel="vs last month"
        />
        <StatCard
          title="User Reports"
          value={stats.userReports}
          icon={<FaFlag />}
          color="red"
          change={-3.5}
          changeLabel="vs last month"
          reverseColors={true}
        />
      </StatsGrid>

      {/* Quick Access Links */}
      <ContentGrid>
        <AdminSection
          title="User Management"
          icon={<FaUsers className="text-blue-600 dark:text-blue-400" />}
        >
          <div className="space-y-3">
            <LinkCard
              href="/admin/users"
              icon={<FaUsers />}
              label="All Users"
            />
            <LinkCard
              href="/admin/users/add"
              icon={<FaUserPlus />}
              label="Add New User"
            />
            <LinkCard
              href="/admin/users/roles"
              icon={<FaUserShield />}
              label="Manage Roles"
            />
          </div>
        </AdminSection>

        <AdminSection
          title="Projects & Tasks"
          icon={<FaBriefcase className="text-green-600 dark:text-green-400" />}
        >
          <div className="space-y-3">
            <LinkCard
              href="/admin/projects"
              icon={<FaBriefcase />}
              label="All Projects"
            />
            <LinkCard
              href="/admin/tasks"
              icon={<FaTasks />}
              label="Manage Submissions"
            />
          </div>
        </AdminSection>

        <AdminSection
          title="Courses & Learning"
          icon={<FaGraduationCap className="text-indigo-600 dark:text-indigo-400" />}
        >
          <div className="space-y-3">
            <LinkCard
              href="/admin/courses"
              icon={<FaBook />}
              label="All Courses"
            />
            <LinkCard
              href="/admin/courses/submissions"
              icon={<FaClipboardList />}
              label="Trainer Submissions"
            />
          </div>
        </AdminSection>
      </ContentGrid>

      {/* Charts Section */}
      <ContentGrid columns={2}>
        <AdminSection
          title="New Users"
          icon={<FaChartBar className="text-blue-600 dark:text-blue-400" />}
        >
          <AdminCharts type="bar" />
        </AdminSection>

        <AdminSection
          title="Monthly Earnings"
          icon={<FaChartLine className="text-green-600 dark:text-green-400" />}
        >
          <AdminCharts type="line" />
        </AdminSection>
      </ContentGrid>

      {/* Activity Feed */}
      <AdminSection
        title="Latest Activity"
        icon={<FaClipboardList className="text-purple-600 dark:text-purple-400" />}
        headerAction={
          <Link href="/admin/activity-log" className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium flex items-center">
            View All <FaArrowRight className="ml-1" />
          </Link>
        }
      >
        <ActivityFeed activities={mockActivity} />
      </AdminSection>
    </div>
  );
}
