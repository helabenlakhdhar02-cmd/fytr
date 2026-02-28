"use client";
import Navbar from "../../components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="w-full relative bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

      <div className="w-full">
        <div className="min-h-screen w-full max-w-none px-0 py-0">
          {children}
        </div>
      </div>
    </div>
  );
}
