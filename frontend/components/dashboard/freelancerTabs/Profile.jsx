import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../../config/api';
import Cookies from 'js-cookie';
import EditProfile from './EditProfile';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Fetch profile on mount or after save
  const fetchProfile = async () => {
    setLoading(true);
    setMessage('');
    const token = Cookies.get('access_token');
    try {
      const res = await fetch(`${API_BASE_URL}/fyter/user-profile/`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      } else {
        setMessage('Failed to load profile.');
      }
    } catch {
      setMessage('Error loading profile.');
    }
    setLoading(false);
  };

  useEffect(() => { fetchProfile(); }, []);

  // Handle profile update from modal
  const handleProfileUpdated = async () => {
    await fetchProfile();
    setShowModal(false);
  };

  if (loading) return <div className="flex justify-center items-center h-40">Loading...</div>;
  if (!profile) return <div>No profile data.</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
      <div className="flex items-center mb-6 gap-4">
        <img
          src={`${API_BASE_URL}/${profile.user.profileImg}` || '/default-profile.png'}
          alt="Profile"
          className="w-20 h-20 rounded-full border-2 border-primary-500 object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{profile.user.full_name || profile.user.username}</h2>
          <p className="text-gray-500">{profile.user.email}</p>
          <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded bg-blue-100 text-blue-700 capitalize">
            {profile.user.role}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 font-medium">Username</label>
          <input value={profile.user.username} disabled className="w-full border px-3 py-2 rounded bg-gray-100" />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Phone</label>
          <input value={profile.user.phone} disabled className="w-full border px-3 py-2 rounded bg-gray-100" />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Region</label>
          <input value={profile.user.region} disabled className="w-full border px-3 py-2 rounded bg-gray-100" />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Skills</label>
          <input value={profile.skills} disabled className="w-full border px-3 py-2 rounded bg-gray-100" />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Portfolio Link</label>
          <input value={profile.portfolio_link} disabled className="w-full border px-3 py-2 rounded bg-gray-100" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium">Bio</label>
          <textarea value={profile.bio} disabled className="w-full border px-3 py-2 rounded min-h-[60px] bg-gray-100" />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Rate</label>
          <input value={profile.rate} disabled className="w-full border px-3 py-2 rounded bg-gray-100" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 font-medium">Verified</label>
          <input value={profile.verified ? 'Yes' : 'No'} disabled className="w-full border px-3 py-2 rounded bg-gray-100" />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Score</label>
          <input value={profile.score} disabled className="w-full border px-3 py-2 rounded bg-gray-100" />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Level</label>
          <input value={profile.level} disabled className="w-full border px-3 py-2 rounded bg-gray-100" />
        </div>
      </div>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded shadow"
      >
        Edit
      </button>

      {showModal && (
        <EditProfile
          profile={profile}
          onClose={() => setShowModal(false)}
          onProfileUpdated={handleProfileUpdated}
        />
      )}
      {message && <div className="text-red-500 mt-2">{message}</div>}
    </div>
  );
};

export default Profile;
