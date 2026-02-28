'use client';

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { API_BASE_URL } from '../../config/api';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();
  const { openLoginModal } = useAuth();
  const [formData, setFormData] = useState({ email: '' });
  const [popup, setPopup] = useState({ show: false, message: '', error: false });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/accounts/reset-password-email/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setPopup({
          show: true,
          message: "Password reset email sent! Please check your inbox.",
          error: false,
        });
      } else {
        const errorData = await response.json();
        setPopup({
          show: true,
          message: errorData.detail || "An error occurred. Please try again.",
          error: true,
        });
      }
    } catch (error) {
      setPopup({
        show: true,
        message: "A network error occurred. Please try again.",
        error: true,
      });
    }
  };

  // Close popup handler
  const closePopup = () => setPopup({ ...popup, show: false });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 text-center">Welcome Back</h2>
          <p className="text-gray-500 mb-6 text-center mt-2">Please complete this information in order to log in.</p>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name='email'
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="username"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <button onClick={handleSubmit} className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
            Sign in
          </button>

          <p className="text-gray-500 text-center mt-4">
            Go back{' '}
            <button
              onClick={() => router.back()}
              className="text-blue-500 hover:underline"
            >
              Login
            </button>
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block md:w-1/2 bg-cover bg-center"
          style={{ backgroundImage: "url('/path-to-your-image.png')" }}>
        </div>
      </div>

      {/* Popup */}
      {popup.show && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
          <div className={`bg-white rounded-lg shadow-lg p-6 min-w-[300px] ${popup.error ? 'border-red-500' : 'border-green-500'} border`}>
            <p className={`text-center ${popup.error ? 'text-red-600' : 'text-green-600'}`}>
              {popup.message}
            </p>
            <button
              onClick={closePopup}
              className="mt-4 w-full bg-blue-500 text-white py-1.5 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
