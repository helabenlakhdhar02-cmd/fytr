"use client";
import { useState } from 'react';
import { FaCalendarAlt, FaClock, FaUsers, FaEdit, FaTrash } from 'react-icons/fa';

const ScheduleCalendar = ({ 
  schedules = [], 
  view = 'week', 
  currentDate = new Date(),
  onEditSession = () => {},
  onDeleteSession = () => {}
}) => {
  // Format date for display
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Get days of the current week
  const getDaysOfWeek = () => {
    const days = [];
    const day = new Date(currentDate);
    day.setDate(day.getDate() - day.getDay()); // Start with Sunday

    for (let i = 0; i < 7; i++) {
      days.push(new Date(day));
      day.setDate(day.getDate() + 1);
    }
    return days;
  };

  // Filter schedules based on the selected view
  const getFilteredSchedules = () => {
    let filtered = [...schedules];
    
    // Apply date filter based on view
    if (view === 'day') {
      filtered = filtered.filter(schedule => 
        schedule.date.getDate() === currentDate.getDate() &&
        schedule.date.getMonth() === currentDate.getMonth() &&
        schedule.date.getFullYear() === currentDate.getFullYear()
      );
    } else if (view === 'week') {
      const weekStart = new Date(currentDate);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      
      filtered = filtered.filter(schedule => 
        schedule.date >= weekStart && schedule.date <= weekEnd
      );
    } else if (view === 'month') {
      filtered = filtered.filter(schedule => 
        schedule.date.getMonth() === currentDate.getMonth() &&
        schedule.date.getFullYear() === currentDate.getFullYear()
      );
    }
    
    return filtered;
  };

  // Group sessions by day for week view
  const getSessionsByDay = () => {
    const days = getDaysOfWeek();
    const sessionsByDay = days.map(day => ({
      date: day,
      sessions: schedules.filter(session => 
        session.date.getDate() === day.getDate() &&
        session.date.getMonth() === day.getMonth() &&
        session.date.getFullYear() === day.getFullYear()
      )
    }));
    return sessionsByDay;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      {/* Week View */}
      {view === 'week' && (
        <div>
          {/* Week Header */}
          <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
            {getDaysOfWeek().map((day, index) => (
              <div 
                key={index} 
                className={`p-3 text-center border-r border-gray-200 dark:border-gray-700 last:border-r-0 ${
                  day.getDate() === new Date().getDate() && 
                  day.getMonth() === new Date().getMonth() && 
                  day.getFullYear() === new Date().getFullYear() 
                    ? 'bg-blue-50 dark:bg-blue-900/20' 
                    : ''
                }`}
              >
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {day.toLocaleDateString('en-US', { weekday: 'short' })}
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {day.getDate()}
                </p>
              </div>
            ))}
          </div>
          
          {/* Week Content */}
          <div className="grid grid-cols-7 min-h-[300px]">
            {getSessionsByDay().map((dayData, dayIndex) => (
              <div 
                key={dayIndex} 
                className={`border-r border-gray-200 dark:border-gray-700 last:border-r-0 ${
                  dayData.date.getDate() === new Date().getDate() && 
                  dayData.date.getMonth() === new Date().getMonth() && 
                  dayData.date.getFullYear() === new Date().getFullYear() 
                    ? 'bg-blue-50/50 dark:bg-blue-900/10' 
                    : ''
                }`}
              >
                <div className="p-2 space-y-2">
                  {dayData.sessions.length > 0 ? (
                    dayData.sessions.map(session => (
                      <div 
                        key={session.id} 
                        className="p-2 rounded-md bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800/50 text-xs hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <div className="font-medium text-gray-900 dark:text-white truncate">
                          {session.title}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 flex items-center mt-1">
                          <FaClock className="mr-1 h-3 w-3" />
                          {session.startTime} - {session.endTime}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 flex items-center mt-1">
                          <FaUsers className="mr-1 h-3 w-3" />
                          {session.studentCount}/{session.studentLimit}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400 dark:text-gray-600 text-xs italic p-4">
                      No sessions
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Day and Month Views */}
      {(view === 'day' || view === 'month') && (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {getFilteredSchedules().length > 0 ? (
            getFilteredSchedules().map((session) => (
              <div key={session.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{session.title}</h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400">{session.courseName}</p>
                    
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center">
                        <FaCalendarAlt className="mr-1" />
                        {formatDate(session.date)}
                      </span>
                      <span className="flex items-center">
                        <FaClock className="mr-1" />
                        {session.startTime} - {session.endTime}
                      </span>
                      <span className="flex items-center">
                        <FaUsers className="mr-1" />
                        {session.studentCount}/{session.studentLimit} Students
                      </span>
                    </div>
                    
                    {session.description && (
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {session.description}
                      </p>
                    )}
                  </div>
                  
                  <div className="mt-4 md:mt-0 flex items-center space-x-2">
                    <button 
                      className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full"
                      onClick={() => onEditSession(session)}
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                      onClick={() => onDeleteSession(session.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 mb-4">
                <FaCalendarAlt className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No teaching sessions found</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                You have no teaching sessions scheduled for this period.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ScheduleCalendar;
