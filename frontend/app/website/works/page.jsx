'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../../components/Navbar';
import SearchHeader from '../../../components/SearchHeader';
import CategorySection from '../../../components/CategorySection';
import TestimonialSection from '../../../components/TestimonialSection';

// Mock data for projects
const mockProjects = [
  {
    id: 1,
    title: 'E-commerce Website Redesign',
    description: 'Looking for a talented web designer to revamp our online store with a modern, user-friendly interface.',
    budget: '$1,000 - $2,500',
    deadline: '30 days',
    skills: ['Web Design', 'UI/UX', 'Shopify', 'HTML/CSS'],
    client: {
      name: 'TechStore Inc.',
      rating: 4.8,
      projects: 12
    }
  },
  {
    id: 2,
    title: 'Mobile App Development for Fitness Tracking',
    description: 'Need a developer to create a fitness tracking app for iOS and Android with workout plans and progress tracking.',
    budget: '$3,000 - $5,000',
    deadline: '60 days',
    skills: ['React Native', 'iOS', 'Android', 'API Integration'],
    client: {
      name: 'FitLife Solutions',
      rating: 4.9,
      projects: 8
    }
  },
  {
    id: 3,
    title: 'Brand Identity Design for Startup',
    description: 'Seeking a graphic designer to create a complete brand identity including logo, color palette, and style guide.',
    budget: '$800 - $1,500',
    deadline: '21 days',
    skills: ['Logo Design', 'Branding', 'Adobe Illustrator', 'Typography'],
    client: {
      name: 'NexGen Innovations',
      rating: 4.7,
      projects: 5
    }
  },
  {
    id: 4,
    title: 'Content Writing for Tech Blog',
    description: 'Looking for experienced writers to create engaging articles about the latest technology trends and innovations.',
    budget: '$50 - $100 per article',
    deadline: 'Ongoing',
    skills: ['Content Writing', 'SEO', 'Tech Knowledge', 'Research'],
    client: {
      name: 'TechInsider Blog',
      rating: 4.6,
      projects: 20
    }
  },
  {
    id: 5,
    title: 'Video Editing for YouTube Channel',
    description: 'Need a video editor to create engaging content for our growing YouTube channel focused on travel adventures.',
    budget: '$200 - $500 per video',
    deadline: 'Weekly delivery',
    skills: ['Video Editing', 'Adobe Premiere', 'After Effects', 'Storytelling'],
    client: {
      name: 'Wanderlust Adventures',
      rating: 4.9,
      projects: 15
    }
  },
  {
    id: 6,
    title: 'Social Media Marketing Campaign',
    description: 'Seeking a social media expert to plan and execute a marketing campaign for our new product launch.',
    budget: '$1,500 - $3,000',
    deadline: '45 days',
    skills: ['Social Media Marketing', 'Content Creation', 'Analytics', 'Campaign Management'],
    client: {
      name: 'InnovatePro',
      rating: 4.7,
      projects: 10
    }
  }
];

// Categories for projects
const categories = [
  { name: 'Web Development', icon: '💻', count: 128 },
  { name: 'Graphic Design', icon: '🎨', count: 85 },
  { name: 'Content Writing', icon: '✍️', count: 64 },
  { name: 'Digital Marketing', icon: '📱', count: 72 },
  { name: 'Video Production', icon: '🎬', count: 43 },
  { name: 'Mobile Development', icon: '📱', count: 56 }
];

// Testimonials
const testimonials = [
  {
    id: 1,
    content: "I found the perfect project for my skills on FyterLance. The platform made it easy to connect with clients and showcase my portfolio.",
    author: "Alex Morgan",
    role: "UI/UX Designer",
    avatar: "/photos/Topfreelancers/freelancer1.PNG",
    rating: 5
  },
  {
    id: 2,
    content: "As a freelance developer, FyterLance has been a game-changer for me. The project matching system is spot on!",
    author: "Sophia Chen",
    role: "Full-Stack Developer",
    avatar: "/photos/Topfreelancers/freelancer 2.PNG",
    rating: 5
  },
  {
    id: 3,
    content: "The quality of projects on FyterLance is consistently high. I've built long-term relationships with several clients I met here.",
    author: "Marcus Johnson",
    role: "Mobile Developer",
    avatar: "/photos/Topfreelancers/freelancer3.PNG",
    rating: 4.5
  }
];

// Project Card Component
const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
          <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 text-sm rounded-full">
            {project.budget}
          </span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.skills.slice(0, 3).map((skill, i) => (
            <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md">
              {skill}
            </span>
          ))}
          {project.skills.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md">
              +{project.skills.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-sm">
              <p className="text-gray-900 dark:text-white font-medium">{project.client.name}</p>
              <div className="flex items-center">
                <span className="text-yellow-400">★</span>
                <span className="text-gray-600 dark:text-gray-400 ml-1">{project.client.rating}</span>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">Deadline:</span> {project.deadline}
          </div>
        </div>
        
        <button className="mt-4 w-full py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors duration-300">
          View Project
        </button>
      </div>
    </motion.div>
  );
};

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch with mock data
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch from an API
        setProjects(mockProjects);
        setFilteredProjects(mockProjects);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterProjects(term, selectedCategory);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    filterProjects(searchTerm, category);
  };

  const filterProjects = (term, category) => {
    let filtered = projects;
    
    if (term) {
      const lowercasedTerm = term.toLowerCase();
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(lowercasedTerm) || 
        project.description.toLowerCase().includes(lowercasedTerm) ||
        project.skills.some(skill => skill.toLowerCase().includes(lowercasedTerm))
      );
    }
    
    if (category) {
      filtered = filtered.filter(project => 
        project.skills.some(skill => skill.includes(category))
      );
    }
    
    setFilteredProjects(filtered);
  };

  const viewOptions = [
    { label: "Find Work", value: "freelancer" },
    { label: "Post Project", value: "client" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main>
        {/* Search Header */}
        <SearchHeader
          title="Find Projects to Work On"
          subtitle="Discover opportunities that match your skills and interests"
          placeholder="Search for projects, skills, or keywords"
          onSearch={handleSearch}
          viewOptions={viewOptions}
        />

        {/* Category Section */}
        <CategorySection
          categories={categories}
          title="Browse Project Categories"
          subtitle="Find work in your area of expertise"
          type="projects"
          onCategorySelect={handleCategorySelect}
        />

        {/* Projects Listing */}
        <section className="py-12 px-6 md:px-16">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Available Projects
            </h2>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">No projects found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your search or filters</p>
                <button 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("");
                    setFilteredProjects(projects);
                  }}
                  className="mt-4 px-6 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialSection
          testimonials={testimonials}
          title="What Our Freelancers Say"
        />
      </main>
    </div>
  );
};

export default ProjectsPage;
