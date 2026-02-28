import React, { useState } from 'react';
import { API_BASE_URL } from '../../../config/api';
import Cookies from 'js-cookie';

const EditProfile = ({ profile, onClose, onProfileUpdated }) => {
  const [formData, setFormData] = useState({
    full_name: profile.user.full_name || '',
    phone: profile.user.phone || '',
    region: profile.user.region || '',
    skills: profile.skills || '',
    portfolio_link: profile.portfolio_link || '',
    bio: profile.bio || '',
    rate: profile.rate || '',
  });
  const [newImage, setNewImage] = useState(null);
  const [previewImg, setPreviewImg] = useState(`${API_BASE_URL}/${profile.user.profileImg}`);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
    if (file) setPreviewImg(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const token = Cookies.get('access_token');
    try {
      let res;
      if (newImage) {
        const form = new FormData();
        Object.entries(formData).forEach(([k, v]) => form.append(k, v));
        form.append('profileImg', newImage);
        res = await fetch(`${API_BASE_URL}/fyter/user-profile/`, {
          method: 'PUT',
          headers: { 'Authorization': `Bearer ${token}` },
          body: form,
        });
      } else {
        res = await fetch(`${API_BASE_URL}/fyter/user-profile/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
      }
      if (res.ok) {
        setMessage('Profile updated!');
        onProfileUpdated();
      } else {
        const errorData = await res.json();
        setMessage(errorData.detail || JSON.stringify(errorData) || 'Failed to update profile.');
      }
    } catch {
      setMessage('Error updating profile.');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-4">
            <img
              src={previewImg || '/default-profile.png'}
              alt="Profile"
              className="w-20 h-20 rounded-full border-2 border-primary-500 object-cover"
            />
            <label className="bg-blue-600 text-white rounded-full p-1 cursor-pointer hover:bg-blue-700 transition">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <span>Change</span>
            </label>
          </div>
          <input
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Full Name"
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Phone"
          />
          <input
            name="region"
            value={formData.region}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Region"
          />
          <input
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Skills"
          />
          <input
            name="portfolio_link"
            value={formData.portfolio_link}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Portfolio Link"
          />
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded min-h-[60px]"
            placeholder="Bio"
          />
          <input
            name="rate"
            value={formData.rate}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Rate"
            disabled
          />
          <div className="flex gap-2 justify-end mt-4">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded" disabled={loading}>
              Save
            </button>
            <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">
              Cancel
            </button>
          </div>
          {message && <div className="text-red-500 mt-2">{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default EditProfile;