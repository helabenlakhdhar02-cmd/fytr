'use client';
import Link from 'next/link';

export function GroupCard() {
  // Sample group data - in a real app, this would come from props or API
  const groups = [
    { id: 1, name: 'Web Development', members: 128, image: '/placeholder-group-1.jpg' },
    { id: 2, name: 'UI/UX Design', members: 94, image: '/placeholder-group-2.jpg' },
    { id: 3, name: 'Mobile App Developers', members: 156, image: '/placeholder-group-3.jpg' },
    { id: 4, name: 'Freelance Writers', members: 72, image: '/placeholder-group-4.jpg' },
  ];

  return (
    <div className="card bg-white dark:bg-gray-800 rounded-lg overflow-hidden w-full max-w-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300">
      {/* Card Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
        <h3 className="text-primary-600 dark:text-primary-400 font-bold flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
          Your Groups
        </h3>
        <Link href="/groups" className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline flex items-center">
          See All
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>

      {/* Card Body */}
      <div className="p-4">
        <div className="space-y-3">
          {groups.map((group) => (
            <Link href={`/groups/${group.id}`} key={group.id}>
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-400/90 to-primary-600/90 rounded-full flex items-center justify-center text-white font-bold text-sm overflow-hidden transition-transform duration-300 hover:scale-105">
                  {group.image ? (
                    <img src={group.image} alt={group.name} className="w-full h-full object-cover" />
                  ) : (
                    group.name.charAt(0)
                  )}
                </div>
                <div>
                  <p className="text-gray-900 dark:text-gray-100 font-medium">{group.name}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">{group.members} members</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Card Footer */}
      <div className="bg-gray-50 dark:bg-gray-800/50 p-3 text-center border-t border-gray-200 dark:border-gray-700">
        <button className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors flex items-center justify-center w-full group">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Create New Group
        </button>
      </div>
    </div>
  );
}