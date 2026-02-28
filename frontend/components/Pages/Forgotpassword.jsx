"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { API_BASE_URL } from '../../config/api';

const ForgotPassword = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
        const data = await response.json();
        console.log("Password reset request successful", data);
      } else {
        const errorData = await response.json();
        console.error(`Error: ${errorData.detail || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }

    console.log(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white w-96 p-8 mx-auto my-10 shadow-lg rounded-lg text-center"
    >
      <h2 className="text-2xl font-bold mb-6 text-black">Forgot Password</h2>

      <input
        type="email"
        name="email"
        placeholder="Enter your email address"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-3 mb-4 border border-gray-300 rounded"
      />

      <button
        type="submit"
        className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit
      </button>

      <p className="mt-4">
        Remembered your password? <Link href="/" className="text-blue-500">Login</Link>
      </p>
    </form>
  );
};

export default ForgotPassword;
