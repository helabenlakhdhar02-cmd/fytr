import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { updateProfile } from '../../lib/auth';
import { useUser } from '../../context/UserContext';

const EditProfileModal = ({ show, onHide, user, setUpdated }) => {
  const { refreshUserData } = useUser();
  const [profile, setProfile] = useState({
    email: user.email || '',
    full_name: user.full_name || '',
    phone: user.phone || '',
    region: user.region || '',
    profileImg: user.profileImg || '',
    gender: user.gender || '',
    date_of_birth: user.date_of_birth || '',
    skills: user.role_details.skills || '',
    rate: user.role_details.rate || '',
    level: user.role_details.level || '',
    score: user.role_details.score || '',
    portfolio_link: user.role_details.portfolio_link || '',
    bio: user.role_details.bio || '',
  });

  useEffect(() => {
    setProfile({
      email: user.email || '',
      full_name: user.full_name || '',
      phone: user.phone || '',
      region: user.region || '',
      profileImg: user.profileImg || '',
      gender: user.gender || '',
      date_of_birth: user.date_of_birth || '',
      skills: user.role_details.skills || '',
      rate: user.role_details.rate || '',
      level: user.role_details.level || '',
      score: user.role_details.score || '',
      portfolio_link: user.role_details.portfolio_link || '',
      bio: user.role_details.bio || '',
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setProfile({
        ...profile,
        [name]: files[0],
      });
    } else {
      setProfile({
        ...profile,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', profile.email);
    formData.append('full_name', profile.full_name);
    formData.append('phone', profile.phone);
    formData.append('region', profile.region);
    formData.append('gender', profile.gender);
    formData.append('date_of_birth', profile.date_of_birth);
    formData.append('skills', profile.skills);
    formData.append('rate', profile.rate);
    formData.append('level', profile.level);
    formData.append('score', profile.score);
    formData.append('portfolio_link', profile.portfolio_link);
    formData.append('bio', profile.bio);


    for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

    try {
    const response = await updateProfile(formData);
    if (response.status === 200) {
      alert('Update successfully created!');
      // Refresh user data in context to update all components
      refreshUserData();
      // Also set local updated flag for backward compatibility
      if (setUpdated) setUpdated(true);
      onHide();
    } else {
      alert('Failed to update profile.');
    }
    } catch (error) {
    console.error('Error updating profile:', error);
    alert('Failed to update profile.');
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg overflow-hidden">
        <div className="text-right">
          <button onClick={onHide} className="text-gray-500 hover:text-gray-700">
            <span className="font-bold text-xl">&times;</span>
          </button>
        </div>
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[75vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="mb-3">
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                className="w-full mt-2 px-4 py-2 text-black border border-gray-300 rounded-lg"
                name="full_name"
                value={profile.full_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full mt-2 px-4 py-2 text-black border border-gray-300 rounded-lg"
                name="email"
                value={profile.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="block text-gray-700">Phone</label>
              <input
                type="text"
                className="w-full mt-2 px-4 py-2 text-black border border-gray-300 rounded-lg"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="block text-gray-700">Region</label>
              <input
                type="text"
                className="w-full mt-2 px-4 py-2 text-black border border-gray-300 rounded-lg"
                name="region"
                value={profile.region}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="block text-gray-700">Gender</label>
              <select
                className="w-full mt-2 px-4 py-2 text-black border border-gray-300 rounded-lg"
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="block text-gray-700">Date of Birth</label>
              <input
                type="date"
                className="w-full mt-2 px-4 py-2 text-black border border-gray-300 rounded-lg"
                name="date_of_birth"
                value={profile.date_of_birth}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="block text-gray-700">Skills</label>
              <input
                type="text"
                className="w-full mt-2 px-4 py-2 text-black border border-gray-300 rounded-lg"
                name="skills"
                value={profile.skills}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="block text-gray-700">Rate</label>
              <input
                type="number"
                className="w-full mt-2 px-4 py-2 text-black border border-gray-300 rounded-lg"
                name="rate"
                value={profile.rate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="block text-gray-700">Level</label>
              <input
                type="text"
                className="w-full mt-2 px-4 py-2 text-black border border-gray-300 rounded-lg"
                name="level"
                value={profile.level}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="block text-gray-700">Score</label>
              <input
                type="number"
                className="w-full mt-2 px-4 py-2 text-black border border-gray-300 rounded-lg"
                name="score"
                value={profile.score}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="block text-gray-700">Portfolio Link</label>
              <input
                type="url"
                className="w-full mt-2 px-4 py-2 text-black border border-gray-300 rounded-lg"
                name="portfolio_link"
                value={profile.portfolio_link}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="block text-gray-700">Bio</label>
              <textarea
                className="w-full mt-2 px-4 py-2 text-black border border-gray-300 rounded-lg"
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex justify-between gap-4">
            <button
              type="button"
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              onClick={onHide}
            >
              Close
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
