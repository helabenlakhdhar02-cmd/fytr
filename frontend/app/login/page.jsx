'use client';

import { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import{useRouter} from "next/navigation"
import { toast } from 'react-toastify';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import { loginUser,refreshAccessToken } from '../../lib/auth';
import Navbar from '../../components/Navbar';
import { API_BASE_URL } from '../../config/api';

export default function Login() {
  const [token, setToken] = useState(null);

  const router=useRouter()
  useEffect(() => {
          const token = Cookies.get('access_token');
          if (token) {
              router.push('/dashboard/home');
          }
      }, []);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
 // Handle form submission
const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Validate input
            if (!formData.email || !formData.password) {
                alert('Please enter both email and password');
                return;
            }

            console.log('Attempting login with:', { email: formData.email });

            // Special case for admin@example.com for testing
            if (formData.email === 'admin@example.com' && formData.password === 'Admin123!') {
                console.log('Using test admin account');
                // Create a mock token (for testing only)
                const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGUiOiJhZG1pbiIsImZpcnN0X2xvZ2luIjpmYWxzZX0sImlhdCI6MTY4MjQzMjU2MCwiZXhwIjoxNjgyNTE4OTYwfQ.mock_signature';

                // Set cookies with mock tokens
                Cookies.set('access_token', mockToken, { expires: 1 });
                Cookies.set('refresh_token', mockToken, { expires: 7 });

                router.push('/dashboard/home'); // Redirect to dashboard
                return;
            }

            // Normal login flow
            const response = await loginUser(formData);
            console.log('Login response:', response.data);

            // Set cookies with proper configuration
            Cookies.set('access_token', response.data.access, { expires: 1 });
            Cookies.set('refresh_token', response.data.refresh, { expires: 7 });

            router.push('/dashboard/home'); // Redirect to dashboard after login
        } catch (error) {
            console.error('Login failed', error);
            // More detailed error handling
            if (error.response) {
                console.error('Error response:', error.response.data);
                alert(error.response.data.detail || 'Login failed. Please check your credentials.');
            } else if (error.request) {
                console.error('Error request:', error.request);
                alert('Network error. Please check your connection.');
            } else {
                console.error('Error message:', error.message);
                alert('An unexpected error occurred. Please try again.');
            }
        }
    };

  return (
    <div> <Navbar/>
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 text-center">Welcome Back</h2>
          <p className="text-gray-500 mb-6 text-center mt-2">Please complete this information in order to log in.</p>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="text"
              name='email'
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
              placeholder="username"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
           <div>
            <input
              type="password"
              name='password'
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
              placeholder="at least 8 characters"
              value={formData.password}
              onChange={handleChange}
              required />

            <a href="/reset-password" className="flex justify-end text-blue-500 text-sm mt-2">Forgot Password?</a>
            </div>
            </div>

          <button onClick={handleSubmit} className="w-full bg-[#03081C] text-white py-2 rounded-lg hover:bg-gray-800">Sign in</button>

          <div className="my-4 text-center text-gray-500">Or</div>

          <button className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg text-gray-700 hover:bg-gray-100">
            <FcGoogle className="text-xl" /> Sign in with Google
          </button>
          <button className="w-full flex items-center justify-center gap-2 border py-2 mt-2 rounded-lg text-gray-700 hover:bg-gray-100">
            <FaFacebook className="text-blue-600 text-xl" /> Sign in with Facebook
          </button>

          <p className="text-gray-800 text-center mt-4">
            Don't have an account? <a href="/register" className="text-blue-500">Sign up</a>
          </p>
        </div>

        {/* Right Side - Image */}
        <div className=" md:block md:w-1/2 bg-[#03081C] bg-cover bg-center flex items-center justify-center">
          <img
          src="/photos/fighterfish.jpg"
          alt="Betta Fish"
          className="object-cover mt-40"
          />
        </div>

      </div>
    </div>
    </div>
  );
}
