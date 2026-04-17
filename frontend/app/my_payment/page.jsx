'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import { getMyPayments, getMySkillPoints } from '../../lib/payment';
import {
  FaArrowLeft, FaCheckCircle, FaClock,
  FaTimesCircle, FaStar, FaCoins, FaGraduationCap
} from 'react-icons/fa';

const statusConfig = {
  completed: { label: 'Completed', icon: FaCheckCircle, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
  pending:   { label: 'Pending',   icon: FaClock,        color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
  failed:    { label: 'Failed',    icon: FaTimesCircle,  color: 'text-red-500',    bg: 'bg-red-50 dark:bg-red-900/20' },
  refunded:  { label: 'Refunded',  icon: FaTimesCircle,  color: 'text-gray-500',   bg: 'bg-gray-50 dark:bg-gray-700' },
};

const typeLabel = {
  project: 'Project',
  service: 'Service',
  course:  'Course',
};

export default function MyPaymentsPage() {
  const router = useRouter();
  const [payments, setPayments] = useState([]);
  const [skillPoints, setSkillPoints] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [paymentsData, pointsData] = await Promise.all([
          getMyPayments(),
          getMySkillPoints(),
        ]);
        setPayments(paymentsData);
        setSkillPoints(pointsData);
      } catch (err) {
        console.error('Error fetching payment data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = activeTab === 'all'
    ? payments
    : payments.filter(p => p.payment_type === activeTab);

  const totalEarned = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + parseFloat(p.receiver_amount || 0), 0)
    .toFixed(2);

  const totalPaid = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + parseFloat(p.total_amount || 0), 0)
    .toFixed(2);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex items-center justify-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Payments</h1>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Paid</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{totalPaid} <span className="text-sm font-normal">TND</span></p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Earned</p>
            <p className="text-xl font-bold text-green-600">{totalEarned} <span className="text-sm font-normal">TND</span></p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Transactions</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{payments.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-1">
              <FaStar className="text-yellow-500 text-xs" />
              <p className="text-xs text-gray-500 dark:text-gray-400">Skill Points</p>
            </div>
            <p className="text-xl font-bold text-yellow-600">
              {skillPoints?.points || 0}
              {skillPoints?.free_courses_unlocked > 0 && (
                <span className="text-xs font-normal text-green-500 ml-2">
                  +{skillPoints.free_courses_unlocked} free course{skillPoints.free_courses_unlocked > 1 ? 's' : ''}
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-100 dark:border-gray-700 flex overflow-x-auto">
            {['all', 'project', 'service', 'course'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab === 'all' ? 'All' : typeLabel[tab]}
              </button>
            ))}
          </div>

          {/* Payment List */}
          <div className="divide-y divide-gray-50 dark:divide-gray-700">
            {filtered.length === 0 ? (
              <div className="py-16 text-center">
                <FaCoins className="text-gray-300 dark:text-gray-600 text-4xl mx-auto mb-3" />
                <p className="text-gray-400 dark:text-gray-500">No payments found</p>
              </div>
            ) : (
              filtered.map(payment => {
                const status = statusConfig[payment.status] || statusConfig.pending;
                const StatusIcon = status.icon;
                return (
                  <div key={payment.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${status.bg}`}>
                        <StatusIcon className={`${status.color}`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {typeLabel[payment.payment_type]} Payment
                          {payment.transaction_ref && (
                            <span className="ml-2 text-xs text-gray-400 dark:text-gray-500 font-normal">
                              #{payment.transaction_ref}
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          {payment.payer_username && `From: ${payment.payer_username}`}
                          {payment.receiver_username && ` → ${payment.receiver_username}`}
                          <span className="ml-2">{new Date(payment.created_at).toLocaleDateString()}</span>
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{payment.total_amount} TND</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">Fee: {payment.platform_fee} TND</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}