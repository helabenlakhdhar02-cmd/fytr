'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLightbulb, FaSearch, FaTimes, FaArrowRight } from 'react-icons/fa';

const SmartMatch = ({ freelancers, onApplyFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [projectType, setProjectType] = useState('');
  const [budget, setBudget] = useState('');
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [timeframe, setTimeframe] = useState('');

  // Common skills for autocomplete
  const commonSkills = [
    'JavaScript', 'React', 'Node.js', 'Python', 'UI/UX Design',
    'Graphic Design', 'Content Writing', 'SEO', 'Digital Marketing',
    'Data Analysis', 'Mobile Development', 'WordPress', 'PHP', 'HTML/CSS'
  ];

  // Filter suggestions based on input
  const filteredSuggestions = commonSkills.filter(
    skill => skill.toLowerCase().includes(skillInput.toLowerCase()) && !skills.includes(skill)
  );

  // Handle adding a skill
  const addSkill = (skill) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      setSkillInput('');
    }
  };

  // Handle removing a skill
  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create filters based on form inputs
    const filters = {
      search: skills.join(' '), // Use skills as search terms
      sortBy: 'best_match'
    };
    
    // Add budget filter logic
    if (budget) {
      // This is a simplified example - in a real app, you'd have more sophisticated filtering
      switch (budget) {
        case 'low':
          // For low budget, prefer beginners
          filters.experience = 'beginner';
          break;
        case 'medium':
          // For medium budget, prefer intermediate
          filters.experience = 'intermediate';
          break;
        case 'high':
          // For high budget, prefer experts
          filters.experience = 'expert';
          break;
      }
    }
    
    // Apply availability filter based on timeframe
    if (timeframe === 'urgent') {
      filters.availability = 'available';
    }
    
    // Apply filters
    onApplyFilters(filters);
    
    // Close the form
    setIsOpen(false);
  };

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
      >
        <FaLightbulb className="mr-2" size={18} />
        <span className="text-lg font-medium">Smart Match: Find the Perfect Fytr for Your Project</span>
        <FaArrowRight className="ml-auto" size={16} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Tell us about your project</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Project Type
                    </label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select project type</option>
                      <option value="web">Web Development</option>
                      <option value="mobile">Mobile App</option>
                      <option value="design">Design</option>
                      <option value="writing">Content Writing</option>
                      <option value="marketing">Digital Marketing</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Budget Range
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select budget range</option>
                      <option value="low">$100 - $500</option>
                      <option value="medium">$500 - $2,000</option>
                      <option value="high">$2,000+</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Required Skills
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        >
                          <FaTimes size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      placeholder="Type a skill and press Enter"
                      className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && skillInput.trim()) {
                          e.preventDefault();
                          addSkill(skillInput.trim());
                        }
                      }}
                    />
                    <FaSearch className="absolute right-3 top-3 text-gray-400" size={16} />
                    
                    {filteredSuggestions.length > 0 && skillInput && (
                      <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {filteredSuggestions.map((suggestion) => (
                          <button
                            key={suggestion}
                            type="button"
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                            onClick={() => addSkill(suggestion)}
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Timeframe
                  </label>
                  <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select timeframe</option>
                    <option value="urgent">Urgent (ASAP)</option>
                    <option value="short">Short term (1-2 weeks)</option>
                    <option value="medium">Medium term (2-4 weeks)</option>
                    <option value="long">Long term (1+ months)</option>
                  </select>
                </div>
                
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Find Matches
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SmartMatch;
