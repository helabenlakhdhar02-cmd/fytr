'use client';

import { useState, useEffect } from 'react';
import {
  FaSearch,
  FaFilter,
  FaEye,
  FaFileDownload,
  FaMoneyBillWave,
  FaCreditCard,
  FaPaypal,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarAlt,
  FaUser,
  FaExchangeAlt
} from 'react-icons/fa';
import Link from 'next/link';

export default function TransactionsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  // Mock transaction data
  const mockTransactions = [
    {
      id: 'TRX-12345',
      type: 'payment',
      amount: 89.99,
      fee: 2.70,
      net: 87.29,
      currency: 'USD',
      status: 'completed',
      date: '2023-11-28T14:30:00',
      paymentMethod: 'credit_card',
      description: 'Course purchase: Complete Web Development Bootcamp',
      user: {
        id: 301,
        name: 'John Smith',
        email: 'john.smith@example.com',
        img: '/fighterfish.png'
      },
      recipient: {
        id: 201,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        img: '/fighterfish.png'
      }
    },
    {
      id: 'TRX-12346',
      type: 'withdrawal',
      amount: 250.00,
      fee: 5.00,
      net: 245.00,
      currency: 'USD',
      status: 'pending',
      date: '2023-11-27T10:15:00',
      paymentMethod: 'bank_transfer',
      description: 'Withdrawal to bank account',
      user: {
        id: 201,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        img: '/fighterfish.png'
      },
      recipient: null
    },
    {
      id: 'TRX-12347',
      type: 'payment',
      amount: 129.99,
      fee: 3.90,
      net: 126.09,
      currency: 'USD',
      status: 'completed',
      date: '2023-11-26T16:45:00',
      paymentMethod: 'paypal',
      description: 'Course purchase: Advanced Machine Learning Specialization',
      user: {
        id: 305,
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
        img: '/fighterfish.png'
      },
      recipient: {
        id: 205,
        name: 'David Chen',
        email: 'david.chen@example.com',
        img: '/fighterfish.png'
      }
    },
    {
      id: 'TRX-12348',
      type: 'refund',
      amount: 69.99,
      fee: 0,
      net: 69.99,
      currency: 'USD',
      status: 'completed',
      date: '2023-11-25T09:30:00',
      paymentMethod: 'credit_card',
      description: 'Refund for: UI/UX Design Principles',
      user: {
        id: 310,
        name: 'Michael Brown',
        email: 'michael.brown@example.com',
        img: '/fighterfish.png'
      },
      recipient: {
        id: 210,
        name: 'Emily Wong',
        email: 'emily.wong@example.com',
        img: '/fighterfish.png'
      }
    },
    {
      id: 'TRX-12349',
      type: 'payment',
      amount: 79.99,
      fee: 2.40,
      net: 77.59,
      currency: 'USD',
      status: 'failed',
      date: '2023-11-24T13:20:00',
      paymentMethod: 'credit_card',
      description: 'Failed payment for: Digital Marketing Masterclass',
      user: {
        id: 315,
        name: 'Jennifer Wilson',
        email: 'jennifer.wilson@example.com',
        img: '/fighterfish.png'
      },
      recipient: {
        id: 215,
        name: 'Michael Roberts',
        email: 'michael.roberts@example.com',
        img: '/fighterfish.png'
      }
    },
    {
      id: 'TRX-12350',
      type: 'withdrawal',
      amount: 180.00,
      fee: 3.60,
      net: 176.40,
      currency: 'USD',
      status: 'completed',
      date: '2023-11-23T11:10:00',
      paymentMethod: 'paypal',
      description: 'Withdrawal to PayPal account',
      user: {
        id: 210,
        name: 'Emily Wong',
        email: 'emily.wong@example.com',
        img: '/fighterfish.png'
      },
      recipient: null
    }
  ];

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setTransactions(mockTransactions);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter transactions based on search query and filters
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (transaction.recipient && transaction.recipient.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
    const matchesType = filterType === 'all' || transaction.type === filterType;

    // Date range filtering
    let matchesDateRange = true;
    if (dateRange !== 'all') {
      const txDate = new Date(transaction.date);
      const now = new Date();

      if (dateRange === 'today') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        matchesDateRange = txDate >= today;
      } else if (dateRange === 'week') {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        matchesDateRange = txDate >= weekAgo;
      } else if (dateRange === 'month') {
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        matchesDateRange = txDate >= monthAgo;
      }
    }

    return matchesSearch && matchesStatus && matchesType && matchesDateRange;
  });

  // Format currency
  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const badgeClasses = {
      completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      failed: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
    };

    const statusLabels = {
      completed: 'Completed',
      pending: 'Pending',
      failed: 'Failed',
      processing: 'Processing'
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
      payment: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      withdrawal: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      refund: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${badgeClasses[type] || badgeClasses.payment}`}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
    );
  };

  // Payment method icon
  const PaymentMethodIcon = ({ method }) => {
    switch (method) {
      case 'credit_card':
        return <FaCreditCard className="text-gray-600 dark:text-gray-400" />;
      case 'paypal':
        return <FaPaypal className="text-blue-600 dark:text-blue-400" />;
      case 'bank_transfer':
        return <FaMoneyBillWave className="text-green-600 dark:text-green-400" />;
      default:
        return <FaMoneyBillWave className="text-gray-600 dark:text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Transactions</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            View and manage payments
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg shadow-sm transition-colors duration-200 flex items-center justify-center"
          >
            <FaFileDownload className="mr-2" />
            Export Transactions
          </button>
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
              placeholder="Search transactions..."
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
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="processing">Processing</option>
              </select>
            </div>

            <div className="flex items-center ml-0 md:ml-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Types</option>
                <option value="payment">Payments</option>
                <option value="withdrawal">Withdrawals</option>
                <option value="refund">Refunds</option>
              </select>
            </div>

            <div className="flex items-center ml-0 md:ml-2">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Loading transactions...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {transaction.id}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {transaction.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-2">
                          <PaymentMethodIcon method={transaction.paymentMethod} />
                        </div>
                        <TypeBadge type={transaction.type} />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={transaction.user.img}
                          alt={transaction.user.name}
                          className="h-8 w-8 rounded-full object-cover border border-gray-200 dark:border-gray-700 mr-2"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/fighterfish.png";
                          }}
                        />
                        <div className="text-sm">
                          <p className="text-gray-900 dark:text-white font-medium">{transaction.user.name}</p>
                          <p className="text-gray-500 dark:text-gray-400 text-xs">{transaction.user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatCurrency(transaction.amount, transaction.currency)}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Fee: {formatCurrency(transaction.fee, transaction.currency)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={transaction.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          href={`/admin/payments/transactions/${transaction.id}`}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                          title="View Details"
                        >
                          <FaEye />
                        </Link>
                        {transaction.status === 'pending' && (
                          <button className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300" title="Approve">
                            <FaCheckCircle />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!isLoading && filteredTransactions.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No transactions found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
