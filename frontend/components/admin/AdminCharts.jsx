'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function AdminCharts({ type = 'bar' }) {
  const { theme } = useTheme();
  const [chartRendered, setChartRendered] = useState(false);

  // Mock data for charts
  const barChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'New Users',
        data: [12, 19, 8, 15, 22, 14, 10],
        backgroundColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.7)',
        borderColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        borderRadius: 4,
      }
    ]
  };

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 22000, 18000, 24000],
        backgroundColor: 'rgba(124, 58, 237, 0.1)',
        borderColor: theme === 'dark' ? 'rgba(124, 58, 237, 0.8)' : 'rgba(124, 58, 237, 1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      }
    ]
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: theme === 'dark' ? 'rgba(17, 24, 39, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: theme === 'dark' ? '#fff' : '#111827',
        bodyColor: theme === 'dark' ? '#d1d5db' : '#4b5563',
        borderColor: theme === 'dark' ? 'rgba(55, 65, 81, 0.3)' : 'rgba(229, 231, 235, 0.8)',
        borderWidth: 1,
        padding: 10,
        boxPadding: 4,
        usePointStyle: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: theme === 'dark' ? '#9ca3af' : '#6b7280',
        },
      },
      y: {
        grid: {
          color: theme === 'dark' ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.8)',
          drawBorder: false,
        },
        ticks: {
          color: theme === 'dark' ? '#9ca3af' : '#6b7280',
          padding: 10,
          callback: function(value) {
            if (type === 'line') {
              return '$' + value.toLocaleString();
            }
            return value;
          }
        },
        beginAtZero: true,
      },
    },
  };

  // Render chart using Chart.js
  useEffect(() => {
    // We're simulating chart rendering here
    // In a real implementation, you would use Chart.js or another charting library
    const timer = setTimeout(() => {
      setChartRendered(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [type, theme]);

  if (!chartRendered) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary-600 dark:border-primary-400 mb-2"></div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading chart...</p>
        </div>
      </div>
    );
  }

  // Render a placeholder for the chart
  // In a real implementation, you would render the actual Chart.js component
  return (
    <div className="relative h-64">
      {type === 'bar' ? (
        <div className="absolute inset-0 flex items-end justify-around px-4">
          {barChartData.labels.map((label, index) => (
            <div key={label} className="flex flex-col items-center">
              <div 
                className="w-10 bg-blue-500 dark:bg-blue-600 rounded-t-md transition-all duration-500"
                style={{ 
                  height: `${(barChartData.datasets[0].data[index] / Math.max(...barChartData.datasets[0].data)) * 180}px`,
                  opacity: theme === 'dark' ? 0.8 : 1
                }}
              ></div>
              <span className="mt-2 text-xs text-gray-600 dark:text-gray-400">{label}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 400 200" className="w-full h-full">
            <path
              d="M 0,100 C 100,80 150,20 200,50 S 300,120 400,100"
              fill="none"
              stroke={theme === 'dark' ? 'rgba(124, 58, 237, 0.8)' : 'rgba(124, 58, 237, 1)'}
              strokeWidth="3"
            />
            <path
              d="M 0,100 C 100,80 150,20 200,50 S 300,120 400,100 L 400,200 L 0,200 Z"
              fill={theme === 'dark' ? 'rgba(124, 58, 237, 0.1)' : 'rgba(124, 58, 237, 0.1)'}
              stroke="none"
            />
            {lineChartData.labels.map((label, index) => (
              <g key={label} transform={`translate(${index * 80 + 20}, 180)`}>
                <text 
                  fontSize="10" 
                  textAnchor="middle" 
                  fill={theme === 'dark' ? '#9ca3af' : '#6b7280'}
                >
                  {label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      )}
    </div>
  );
}
