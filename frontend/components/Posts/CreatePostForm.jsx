'use client';

import { useState, useRef } from 'react';
import {
  FaPencilAlt, FaBriefcase, FaGraduationCap, FaImage,
  FaMoneyBillWave, FaClock
} from 'react-icons/fa';

export default function CreatePostForm({ userRole, onPostCreated }) {
  const [content, setContent] = useState('');
  const [selectedPostType, setSelectedPostType] = useState('regular');
  const [showForm, setShowForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [deliveryDays, setDeliveryDays] = useState('');
  const [category, setCategory] = useState('');
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [serviceType, setServiceType] = useState('soloFin');
  const [skills, setSkills] = useState('');
  const [startDate, setStartDate] = useState('');
  const [duration, setDuration] = useState('');
  const [highlights, setHighlights] = useState(['', '', '']);

  const handlePostTypeSelect = (type) => {
    setSelectedPostType(type);
    setShowForm(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHighlightChange = (index, value) => {
    const newHighlights = [...highlights];
    newHighlights[index] = value;
    setHighlights(newHighlights);
  };

  const addHighlight = () => {
    setHighlights([...highlights, '']);
  };

  const removeHighlight = (index) => {
    const newHighlights = highlights.filter((_, i) => i !== index);
    setHighlights(newHighlights);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let post = {};

    if (selectedPostType === 'regular') {
      post = {
        type: 'regular',
        content,
        image: imagePreview
      };
    } else if (selectedPostType === 'clabte') {
      const skillsArray = skills.split(',').map(s => s.trim()).filter(s => s !== '');
      const finalServiceType = userRole === 'freelancer' ? 'soloFin' : serviceType;
      const spotsTotal = userRole === 'freelancer' ? 1 : (serviceType === 'bettaArena' ? 6 : 1);

      post = {
        type: 'clabte',
        title,
        content,
        image: imagePreview,
        serviceDetails: {
          price,
          deliveryDays,
          category,
          serviceType: finalServiceType,
          skills: skillsArray,
          spotsTotal,
          spotsTaken: 0
        }
      };
    } else if (selectedPostType === 'formation') {
      post = {
        type: 'formation',
        title,
        content,
        image: imagePreview,
        courseDetails: {
          price,
          startDate,
          duration,
          highlights: highlights.filter(h => h.trim() !== ''),
          seatsTotal: 20,
          seatsTaken: 0
        }
      };
    }

    if (onPostCreated) {
      onPostCreated(post);
    }

    resetForm();
  };

  const resetForm = () => {
    setContent('');
    setTitle('');
    setSelectedPostType('regular');
    setShowForm(false);
    setSelectedImage(null);
    setImagePreview(null);
    setPrice('');
    setDeliveryDays('');
    setCategory('');
    setIsCustomCategory(false);
    setServiceType('soloFin');
    setSkills('');
    setStartDate('');
    setDuration('');
    setHighlights(['', '', '']);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const canShowPostType = (type) => {
    if (type === 'regular') return true;
    if (type === 'clabte') return true;
    if (type === 'formation' && (userRole === 'formateur' || userRole === 'admin')) return true;
    return false;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border mb-6">
      {!showForm ? (
        <div className="p-4">
          <div className="flex items-center mb-4">
            <img src="/images/default-avatar.png" className="w-10 h-10 rounded-full mr-3" alt="User" />
            <button
              onClick={() => setShowForm(true)}
              className="flex-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-500 text-left hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              What's on your mind?
            </button>
          </div>
          <div className="flex gap-2">
            {canShowPostType('regular') && (
              <button onClick={() => handlePostTypeSelect('regular')} className="btn-post-type">
                <FaPencilAlt className="mr-2" />
                Regular Post
              </button>
            )}
            {canShowPostType('clabte') && (
              <button onClick={() => handlePostTypeSelect('clabte')} className="btn-post-type bg-blue-100">
                <FaBriefcase className="mr-2" />
                {userRole === 'freelancer' ? 'Service' : 'Request Service'}
              </button>
            )}
            {canShowPostType('formation') && (
              <button onClick={() => handlePostTypeSelect('formation')} className="btn-post-type bg-purple-100">
                <FaGraduationCap className="mr-2" />
                Course Post
              </button>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-4">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {selectedPostType === 'regular' && 'Create Post'}
              {selectedPostType === 'clabte' && (userRole === 'freelancer' ? 'Create Service' : 'Request Service')}
              {selectedPostType === 'formation' && 'Create Course Post'}
            </h3>
            <button
              type="button"
              onClick={resetForm}
              className="text-sm border px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>

          {(selectedPostType === 'clabte' || selectedPostType === 'formation') && (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
              className="mb-3 w-full p-2 border rounded-lg"
            />
          )}

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            rows="3"
            className="w-full p-2 border rounded-lg mb-3"
            required
          />

          {imagePreview && (
            <div className="mb-3 relative">
              <img src={imagePreview} className="w-full h-64 object-cover rounded-lg" />
              <button
                type="button"
                onClick={() => {
                  setSelectedImage(null);
                  setImagePreview(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="absolute top-2 right-2 bg-black text-white p-1 rounded-full"
              >
                ✕
              </button>
            </div>
          )}

          {selectedPostType === 'clabte' && (
            <>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <label>Price</label>
                  <div className="relative">
                    <FaMoneyBillWave className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full pl-10 p-2 border rounded-lg"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label>Delivery Days</label>
                  <div className="relative">
                    <FaClock className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="number"
                      value={deliveryDays}
                      onChange={(e) => setDeliveryDays(e.target.value)}
                      className="w-full pl-10 p-2 border rounded-lg"
                      required
                    />
                  </div>
                </div>
              </div>
              <label>Category</label>
              {isCustomCategory ? (
                <>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 border rounded-lg mb-2"
                  />
                  <button type="button" onClick={() => { setIsCustomCategory(false); setCategory(''); }}>
                    Back to category list
                  </button>
                </>
              ) : (
                <select
                  value={category}
                  onChange={(e) => {
                    if (e.target.value === 'Other') {
                      setIsCustomCategory(true);
                      setCategory('');
                    } else {
                      setCategory(e.target.value);
                    }
                  }}
                  className="w-full p-2 border rounded-lg mb-3"
                >
                  <option value="">Select</option>
                  <option value="Design">Design</option>
                  <option value="Development">Development</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Writing">Writing</option>
                  <option value="Other">Other</option>
                </select>
              )}
              <label>Skills (comma separated)</label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </>
          )}

          <div className="flex items-center justify-between mt-4 border-t pt-4">
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="text-gray-500 hover:text-blue-600"
              title="Add Photo"
            >
              <FaImage />
            </button>
            <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg text-white ${
                selectedPostType === 'formation' ? 'bg-purple-600' : 'bg-blue-600'
              } hover:opacity-90`}
            >
              Post
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
