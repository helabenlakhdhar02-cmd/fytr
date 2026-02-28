"use client"
import { GroupCard } from "../../components/ui/GroupCard";
import { PostCard } from "../../components/ui/Post";
import ProfileBanner from "../../components/ui/ProfileBanner";
import ProfileCard from "../../components/ui/ProfileCrad";
import StatusBox from "../../components/ui/Status";
import React from "react";
import { useEffect, useState } from 'react';
import { refreshAccessToken, logoutUser } from '../../lib/auth';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import Navbar from "../../components/Navbar";







const page = () => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const checkToken = async () => {
        let newToken = await refreshAccessToken();
        if (!newToken) {
            logoutUser();
            router.push('/login');
          } else {
            setToken(newToken);
        }
    };

    checkToken();
    const interval = setInterval(checkToken, 5 * 60 * 1000);
    return () => clearInterval(interval);
}, []);
  const router = useRouter();
  const [user, setUser]=useState('')

useEffect(() => {
        const accessToken = Cookies.get('access_token');
        if (accessToken) {
            const decoded = jwt.decode(accessToken);
            console.log('User from token:', decoded.user);
            setUser(decoded.user);
        }
    }, [token]);
  const [isUpdated, setIsUpdated] = useState(false)

  const [posts, setPostes] = useState(null);

    useEffect(() => {
      if (!user) return;

      const fetchUser = async () => {
        try {
          const response = await fetch(`http://localhost:8000/fyter/posts/${user.username}/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const userData = await response.json();
            console.log("ttttt", userData);
            setPostes(userData);
          } else {
            const errorData = await response.json();
            alert(`An error occurred: ${errorData.detail || "Unknown error"}`);
          }
        } catch (error) {
          console.error("An error occurred:", error);
          alert("An error occurred. Please try again later.");
        }
      };

      fetchUser();
    }, [user, router]);
    if (isUpdated){
      const fetchUser = async () => {
        try {
        const response = await fetch(`http://localhost:8000/fyter/posts/${user.username}/`, {
          method: 'GET',
          headers: {
          'Content-Type': 'application/json',
        }
        });

        if (response.ok) {
          const userData = await response.json();
          console.log("ttttt",userData)
          setPostes(userData);
        } else {
          const errorData = await response.json();
          alert(`An error occurred: ${errorData.detail || "Unknown error"}`);
        }
        } catch (error) {
        console.error("An error occurred:", error);
        alert("An error occurred. Please try again later.dash");
        }
      };

      fetchUser();
            setIsUpdated(false)

    }


  return (
    <div >
      <Navbar/>

      <div className="relative w-full grid grid-cols-5 gap-5 h-auto p-4">
        <div className=" col-span-5"><ProfileBanner /></div>
        {/* Left Sidebar */}
        <div className="relative col-span-2 space-y-4 ">
          <aside className="sticky top-4 space-y-4">
            <ProfileCard />

            {/* Quick Actions Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="p-5 border-b border-gray-100 dark:border-gray-700">
                <h2 className="font-bold text-gray-900 dark:text-white text-lg">Trainer Quick Actions</h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="/dashboard/trainer-profile"
                    className="flex flex-col items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">My Profile</span>
                  </a>

                  <a
                    href="/dashboard/project-requests"
                    className="flex flex-col items-center justify-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors relative"
                  >
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Requests</span>
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">3</span>
                  </a>

                  <a
                    href="/dashboard/active-projects"
                    className="flex flex-col items-center justify-center p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-800 flex items-center justify-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 dark:text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Projects</span>
                  </a>

                  <a
                    href="/dashboard/services"
                    className="flex flex-col items-center justify-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Services</span>
                  </a>

                  <a
                    href="/dashboard/courses"
                    className="flex flex-col items-center justify-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Courses</span>
                  </a>

                  <a
                    href="/dashboard/learning-paths"
                    className="flex flex-col items-center justify-center p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-800 flex items-center justify-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 dark:text-teal-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Learning Paths</span>
                  </a>

                  <a
                    href="/dashboard/students"
                    className="flex flex-col items-center justify-center p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-800 flex items-center justify-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 dark:text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Students</span>
                  </a>

                  <a
                    href="/dashboard/messages"
                    className="flex flex-col items-center justify-center p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors relative"
                  >
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-800 flex items-center justify-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 dark:text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                        <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Messages</span>
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">2</span>
                  </a>
                </div>
              </div>
            </div>

            <GroupCard />
          </aside>
        </div>
        {/* Posts */}
        <main className="col-span-3 space-y-4">
          <StatusBox setUpdated={setIsUpdated}/>
          {posts && posts.map((post) => (
         <div key={post.id}>
          <PostCard key={post.id} post={post} setUpdated={setIsUpdated} /></div>
        ))}
        </main>
      </div>
    </div>
  );
};

export default page;
