import React from 'react'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const Menu = ({user}) => {

  const router = useRouter();

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem('token'); // Access token


      // Check if tokens are available
      if (!accessToken ) {
        alert('Tokens not found. Please log in again.22');
        return;
      }

      const response = await fetch('http://localhost:8000/api/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${accessToken}`, // Include access token
        },
        body: JSON.stringify({ refresh: accessToken }), // Send refresh token if required
        credentials: 'include',
      });

      if (response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('username'); // Remove access token
        //localStorage.removeItem('refreshToken'); // Remove refresh token if needed
        alert('Logged out successfully');
        router.push('/'); // Redirect to home page
      } else {
        const errorData = await response.json();
        alert(`Logout failed: ${errorData.detail || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
      alert('An error occurred. Please try again later.11');
    }
  };

  return (
    <div className="fixed left-0 top-0 w-64 h-screen bg-gray-800 text-white flex flex-col p-4 shadow-lg">
     <h2> <a href="/dashboard/profile" className="text-xl font-bold mb-4">👤 {user.username}</a></h2>
     <br />
      {user.role === "client" && (
            <nav className="flex flex-col gap-3">

            <a href="/" className="p-2 rounded hover:bg-gray-700">🏠 Home</a>
            <a href="/services-list" className="p-2 rounded hover:bg-gray-700">🛠️ Services</a>
            <a href="/analytics" className="p-2 rounded hover:bg-gray-700">📊 Analytics</a>
            <a href="/settings" className="p-2 rounded hover:bg-gray-700">⚙️ Settings</a>
            <button onClick={handleLogout}>logout</button>

          </nav>
          )}
      {user.role === "freelancer" && (
            <nav className="flex flex-col gap-3">

            <a href="#" className="p-2 rounded hover:bg-gray-700">🏠 Home</a>
            <a href="/clabte-freelancer" className="p-2 rounded hover:bg-gray-700">🛠️ Workspace</a>
            <a href="#" className="p-2 rounded hover:bg-gray-700">📊 Analytics</a>
            <a href="#" className="p-2 rounded hover:bg-gray-700">⚙️ Settings</a>
          </nav>
          )}{user.role === "formateur" && (
            <nav className="flex flex-col gap-3">

            <a href="#" className="p-2 rounded hover:bg-gray-700">🏠 Home</a>
            <a href="/dashboard/my-courses" className="p-2 rounded hover:bg-gray-700">📚 Courses</a>
            <a href="#" className="p-2 rounded hover:bg-gray-700">📊 Analytics</a>
            <a href="#" className="p-2 rounded hover:bg-gray-700">⚙️ Settings</a>
          </nav>
          )}
    </div>

  )
}

export default Menu
