"use client";
import { useState, useEffect } from "react";
import { FaUser, FaUserTie, FaChalkboardTeacher } from "react-icons/fa";
import { getStats } from "../lib/auth";

// Animated counter component
const AnimatedCounter = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value.replace(/,/g, "").replace(/\+/g, ""));
    const incrementTime = Math.floor(duration / end);

    // Don't run if value is zero or invalid
    if (end === 0) return;

    // Timer to increment counter
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, incrementTime);

    // Cleanup
    return () => {
      clearInterval(timer);
    };
  }, [value, duration]);

  return <>{count}+</>;
};

export default function StatsSection() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getStats();
      const formattedStats = [
        {
          count: data.users.toString(),
          label: "Users",
          icon: <FaUser size={24} />,
          color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
        },
        {
          count: data.freelancers.toString(),
          label: "Freelancers",
          icon: <FaUserTie size={24} />,
          color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
        },
        {
          count: data.trainers.toString(),
          label: "Trainers",
          icon: <FaChalkboardTeacher size={24} />,
          color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
        },
      ];
      setStats(formattedStats);
      setLoading(false);
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <section className="bg-gray-100 dark:bg-gray-900 py-4">
        <div className="flex flex-col md:flex-row justify-around items-center gap-4 md:gap-0 w-auto text-center max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transform -mt-10 relative z-10">
          <p className="text-gray-600 dark:text-gray-400">Loading stats...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-4">
      <div className="flex flex-col md:flex-row justify-around items-center gap-4 md:gap-0 w-auto text-center max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transform -mt-10 relative z-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-2 transition-transform duration-300 hover:scale-105"
          >
            <div className={`${stat.color} rounded-full p-3 shadow-md`}>
              {stat.icon}
            </div>
            <div className="text-gray-900 dark:text-white text-left">
              <h2 className="text-xl md:text-2xl font-bold">
                <AnimatedCounter value={stat.count} />
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
            </div>
            {index !== stats.length - 1 && (
              <div className="hidden md:block h-10 w-[1px] bg-gray-200 dark:bg-gray-700 ml-4" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
