"use client";

import React, { useState, useEffect } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Cookies from 'js-cookie';
import { registerUser } from '../../lib/auth';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import { API_BASE_URL } from '../../config/api';

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (token) {
      router.push('/dashboard');
    }
  }, []);
  
  const [currentStep, setCurrentStep] = useState(1);
  
  const [formData, setFormData] = useState({
    role: '',
    username: '',
    email: '',
    date_of_birth: '',
    gender: '',
    password: '',
    first_name: '',
    last_name: '',
    phone: '',
    region: ''
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateStep = () => {
    const requiredFields = {
      1: ["email", "username", "password"],
      2: ["first_name", "last_name", "phone"],
      3: ["gender", "region", "date_of_birth", "role"]
    };
  
    const fieldsToCheck = requiredFields[currentStep];
  
    for (let field of fieldsToCheck) {
      if (!formData[field]) {
        alert(`Please fill in the ${field.replace("_", " ")}`);
        return false;
      }
    }
    return true;
  };


  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()){
    try {
      await registerUser(formData);
      router.push('/login'); // Redirect to login after registration
    } catch (error) {
      console.error('Registration failed', error.response?.data);
      if (error.response?.data?.error === 'Username already exists') {
        alert('Username already exists');
      } else if (error.response?.data?.error === 'Email already exists') {
        alert('Email already exists');
      } else {
        alert('Registration failed');
      }
    }
    }
  };

  const nextStep = () => {
    if (currentStep < 3) if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
        <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Left Side - Form */}
          <div className="w-full md:w-1/2 p-8 h-full flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 text-center">
                Create an account
              </h2>
              <p className="text-gray-500 mb-6 text-center mt-2">
                Already have an account?{" "}
                <a href="/login" className="text-blue-500">Login</a>
              </p>

              {currentStep === 1 && (
                <>
                  <button className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                    <FcGoogle className="text-xl" /> Sign in with Google
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 border py-2 mt-2 rounded-lg text-gray-700 hover:bg-gray-100">
                    <FaFacebook className="text-blue-600 text-xl" /> Sign in with
                    Facebook
                  </button>

                  <div className="my-4 text-center text-gray-500">Or</div>
                  <div className="my-4 text-center text-gray-500">Enter your email address to create an account.</div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="w-full px-4 text-black py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Example@email.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Username</label>
                    <input
                      type="text"
                      name="username"
                      className="w-full px-4 py-2 text-black mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="w-full px-4 py-2 mt-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700">First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      className="w-full px-4 py-2 text-black mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="First Name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      className="w-full px-4 py-2 text-black mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Last Name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      className="w-full px-4 py-2 mt-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              )}

              {currentStep === 3 && (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700">Gender</label>
                    <select
                      name="gender"
                      className="w-full text-black px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                      <option value="O">Other</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Region</label>
                    <input
                      type="text"
                      name="region"
                      className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Region"
                      value={formData.region}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Date of Birth</label>
                    <input
                      type="date"
                      name="date_of_birth"
                      className="w-full px-4 py-2 mt-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.date_of_birth}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Role</label>
                    <select
                      name="role"
                      className="w-full px-4 py-2 text-black mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.role}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="freelancer">Freelancer</option>
                      <option value="formateur">Formateur</option>
                      <option value="client">Client</option>
                    </select>
                  </div>
                </>
              )}

              <div className="flex justify-between mt-6">
                {currentStep > 1 && (
                  <button
                    onClick={prevStep}
                    className=" bg-[#03081C] text-white py-2 px-4 rounded-lg hover:bg-gray-900"
                  >
                    Previous
                  </button>
                )}
                {currentStep < 3 ? (
                  <button
                    onClick={nextStep}
                    className="bg-[#03081C] text-white py-2 px-4 rounded-lg hover:bg-gray-900"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="bg-[#03081C] text-white py-2 px-4 rounded-lg hover:bg-gray-900"
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="md:w-1/2 bg-[#03081C] bg-cover bg-center flex items-center justify-center">
            <img
              src="/photos/fighterfish.jpg"
              alt="Betta Fish"
              className="object-cover "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
