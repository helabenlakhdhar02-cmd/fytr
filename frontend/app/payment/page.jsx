'use client';

import React, { useState, useEffect, Suspense, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import { paymentService } from '../../lib/dataService';
import { useAuth } from '../../context/AuthContext';
import {
  FaCheckCircle, FaSpinner, FaArrowLeft,
  FaShieldAlt, FaCreditCard, FaInfoCircle, FaTimesCircle
} from 'react-icons/fa';

function PaymentForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, loading: authLoading, openLoginModal } = useAuth();

  const type = searchParams.get('type') || 'project';
  const amount = parseFloat(searchParams.get('amount') || '0');
  const receiverId = searchParams.get('receiver_id');
  const projectId = searchParams.get('project_id');
  const serviceId = searchParams.get('service_id');
  const courseId = searchParams.get('course_id');
  const title = searchParams.get('title') || 'Payment';

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [transactionRef, setTransactionRef] = useState('');

  const platformFee = type === 'course'
    ? (amount * 25 / 100).toFixed(2)
    : (amount * 15 / 100).toFixed(2);
  const receiverAmount = (amount - parseFloat(platformFee)).toFixed(2);
  const feePercent = type === 'course' ? 25 : 15;

  const handleSubmit = async () => {
    if (!transactionRef.trim()) {
      setError('Please enter a transaction reference number.');
      return;
    }

    if (transactionRef.trim().length < 5) {
      setError('Transaction reference must be at least 5 characters.');
      return;
    }

    if (!receiverId) {
      setError('Receiver ID is missing. Please go back and try again.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Prepare payment data
      const paymentData = {
        payment_type: type,
        total_amount: parseFloat(amount),
        receiver_id: parseInt(receiverId),
        project_id: projectId ? parseInt(projectId) : null,
        service_id: serviceId ? parseInt(serviceId) : null,
        course_id: courseId ? parseInt(courseId) : null,
        transaction_ref: transactionRef.trim(),
      };

      // Submit payment
      const response = await paymentService.create(paymentData);

      if (response && response.id) {
        // Payment created successfully
        setSuccess(true);
        
        // Optional: Redirect to success page after delay
        setTimeout(() => {
          router.push(`/payment/success?payment_id=${response.id}`);
        }, 2000);
      } else {
        setError('Payment submission failed. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      console.error('Payment error:', err);
      const errorMessage = err.response?.data?.detail || 
                          err.message || 
                          'Payment failed. Please verify your details and try again.';
      setError(errorMessage);
      setLoading(false);
    }
  };

  // Check authentication and redirect if not logged in
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      // Wait a moment for context to stabilize, then redirect
      const timer = setTimeout(() => {
        router.push('/login?next=/payment?' + new URLSearchParams(searchParams).toString());
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [authLoading, isAuthenticated, router, searchParams]);

  // Handle Enter key press
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !loading && transactionRef.trim()) {
        handleSubmit();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleSubmit, loading, transactionRef]);

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-10 animate-fade-in">
            <div className="mb-6">
              <FaCheckCircle className="text-green-500 text-6xl mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Payment Submitted!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your payment of <span className="font-semibold text-green-600 dark:text-green-400">{amount} TND</span> has been submitted for verification.
            </p>
            
            {/* Payment Details Summary */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4 mb-6 text-left">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Payment Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Total Amount</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{amount} TND</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Platform Fee ({feePercent}%)</span>
                  <span className="font-medium text-gray-900 dark:text-white">-{platformFee} TND</span>
                </div>
                <div className="flex justify-between text-sm border-t border-blue-200 dark:border-blue-700 pt-2 mt-2">
                  <span className="text-gray-700 dark:text-gray-300">Receiver Gets</span>
                  <span className="font-bold text-green-600 dark:text-green-400">{receiverAmount} TND</span>
                </div>
                <div className="flex justify-between text-sm border-t border-blue-200 dark:border-blue-700 pt-2 mt-2">
                  <span className="text-gray-600 dark:text-gray-300">Reference</span>
                  <span className="font-mono text-xs text-gray-900 dark:text-white">{transactionRef}</span>
                </div>
              </div>
            </div>

            {/* Status Message */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                ✓ Your payment is now pending verification. Our team will review it within <strong>24 hours</strong> and update you via email.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => router.push('/dashboard')}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => router.push('/payment/history')}
                className="w-full py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-xl transition-colors"
              >
                View Payment History
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <FaSpinner className="text-blue-600 dark:text-blue-400 text-5xl mb-4 animate-spin mx-auto" />
          <p className="text-gray-600 dark:text-gray-400 font-medium">Verifying your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-lg mx-auto px-4 py-10">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          <button
            onClick={() => router.push('/payment/history')}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium text-sm px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            View History
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5">
            <div className="flex items-center gap-3">
              <FaCreditCard className="text-white text-2xl" />
              <div>
                <h1 className="text-xl font-bold text-white">Complete Payment</h1>
                <p className="text-blue-100 text-sm">{title}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Amount Breakdown */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 mb-6 border border-blue-100 dark:border-blue-800">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Payment Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Amount</span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">{amount.toFixed(2)} TND</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    Platform Fee
                    <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs px-2 py-0.5 rounded-full">
                      {feePercent.toFixed(0)}%
                    </span>
                  </span>
                  <span className="text-gray-900 dark:text-white font-medium">-{platformFee.toFixed(2)} TND</span>
                </div>
                <div className="border-t border-blue-200 dark:border-blue-700 pt-3 flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Receiver Gets</span>
                  <span className="text-lg font-bold text-green-600 dark:text-green-400">{receiverAmount.toFixed(2)} TND</span>
                </div>
              </div>
            </div>

            {/* Payment Instructions */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4 mb-6">
              <div className="flex gap-3">
                <FaInfoCircle className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0 text-lg" />
                <div className="text-sm text-blue-900 dark:text-blue-200">
                  <p className="font-semibold mb-2">How to Complete Payment:</p>
                  <ol className="space-y-1 ml-4 list-decimal text-xs">
                    <li>Transfer <strong>{amount.toFixed(2)} TND</strong> via bank transfer or BaridiMob</li>
                    <li>Copy your transaction reference number</li>
                    <li>Paste it below and submit</li>
                    <li>Payment will be verified within 24 hours</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Transaction Reference Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Transaction Reference *
              </label>
              <input
                type="text"
                value={transactionRef}
                onChange={(e) => setTransactionRef(e.target.value)}
                placeholder="e.g., BARIDIMOB-123456 or TRANSFER-789456"
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 disabled:cursor-not-allowed transition-all"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Copy the reference/confirmation number from your bank or BaridiMob receipt
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-xl px-4 py-3 text-sm mb-4 flex items-start gap-3">
                <FaTimesCircle className="mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading || !transactionRef.trim()}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:shadow-none"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <FaShieldAlt /> Confirm Payment
                </>
              )}
            </button>

            {/* Footer Note */}
            <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="mb-2">🔒 Your payment information is secure</p>
              <p>Payments are reviewed and verified within 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading payment form...</p>
        </div>
      </div>
    }>
      <PaymentForm />
    </Suspense>
  );
}