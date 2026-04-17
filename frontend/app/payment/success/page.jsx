'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import { paymentService } from '../../../lib/dataService';
import {
  FaCheckCircle, FaSpinner, FaArrowLeft,
  FaClock, FaDownload
} from 'react-icons/fa';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('payment_id');

  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayment = async () => {
      if (!paymentId) {
        setError('No payment ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await paymentService.getById(paymentId);
        setPayment(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching payment:', err);
        setError('Failed to load payment details');
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
  }, [paymentId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (error || !payment) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="max-w-lg mx-auto px-4 py-16">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 text-center">
            <p className="text-red-700 dark:text-red-400 mb-4">{error || 'Payment not found'}</p>
            <button
              onClick={() => router.push('/dashboard')}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const statusColors = {
    pending: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-400',
    completed: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400',
    failed: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400',
    cancelled: 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-400',
  };

  const statusIcons = {
    pending: <FaClock className="text-2xl" />,
    completed: <FaCheckCircle className="text-2xl" />,
    failed: '❌',
    cancelled: '❌',
  };

  const statusMessages = {
    pending: 'Your payment is under review. We will verify it within 24 hours.',
    completed: 'Your payment has been successfully verified and credited.',
    failed: 'Your payment could not be processed. Please try again.',
    cancelled: 'Your payment has been cancelled.',
  };

  const status = payment.status || 'pending';
  const statusColor = statusColors[status] || statusColors.pending;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 font-medium"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
            <div className="text-center">
              {status === 'completed' && (
                <FaCheckCircle className="text-white text-5xl mx-auto mb-4" />
              )}
              {status === 'pending' && (
                <FaClock className="text-yellow-300 text-5xl mx-auto mb-4 animate-pulse" />
              )}
              <h1 className="text-3xl font-bold text-white mb-2">
                {status === 'completed' ? 'Payment Confirmed!' : 'Payment Submitted'}
              </h1>
              <p className="text-blue-100">Transaction ID: {payment.id}</p>
            </div>
          </div>

          <div className="p-8">
            {/* Status Alert */}
            <div className={`border rounded-xl p-4 mb-8 ${statusColor}`}>
              <div className="flex items-start gap-3">
                <div className="mt-1">{statusIcons[status]}</div>
                <div>
                  <p className="font-semibold capitalize mb-1">{status} Payment</p>
                  <p className="text-sm">{statusMessages[status]}</p>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Transaction Reference</p>
                  <p className="font-mono text-lg font-semibold text-gray-900 dark:text-white">{payment.transaction_ref}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Payment Type</p>
                  <p className="font-semibold text-gray-900 dark:text-white capitalize">{payment.payment_type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Payment Date</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {new Date(payment.created_at).toLocaleDateString()} {new Date(payment.created_at).toLocaleTimeString()}
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Amount</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{payment.total_amount.toFixed(2)} TND</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Platform Fee</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{payment.platform_fee.toFixed(2)} TND</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Receiver Amount</p>
                  <p className="font-bold text-green-600 dark:text-green-400">{payment.receiver_amount.toFixed(2)} TND</p>
                </div>
              </div>
            </div>

            {/* Breakdown Table */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-8">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Payment Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Total Amount</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{payment.total_amount.toFixed(2)} TND</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Platform Fee ({((payment.platform_fee / payment.total_amount) * 100).toFixed(0)}%)</span>
                  <span className="text-gray-900 dark:text-white">-{payment.platform_fee.toFixed(2)} TND</span>
                </div>
                <div className="border-t border-gray-300 dark:border-gray-600 pt-3 flex justify-between items-center font-bold">
                  <span className="text-gray-700 dark:text-gray-300">Receiver Gets</span>
                  <span className="text-green-600 dark:text-green-400">{payment.receiver_amount.toFixed(2)} TND</span>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            {status === 'pending' && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4 mb-8">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>What happens next?</strong> Our team will verify your payment within 24 hours. You'll receive an email confirmation once it's processed. You can track the status in your dashboard.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => router.push('/payment/history')}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors"
              >
                Payment History
              </button>
              <button
                onClick={() => {
                  // Implement download receipt functionality
                  alert('Receipt download will be available soon');
                }}
                className="w-full py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <FaDownload /> Download Receipt
              </button>
            </div>
          </div>
        </div>

        {/* Support Info */}
        <div className="text-center mt-8 text-gray-600 dark:text-gray-400 text-sm">
          <p>Need help? <a href="/support" className="text-blue-600 dark:text-blue-400 hover:underline">Contact Support</a></p>
        </div>
      </div>
    </div>
  );
}
