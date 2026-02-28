// Mock data for when API is not available

export const mockFreelancers = [
  {
    id: 1,
    user: {
      username: "alexmorgan",
      full_name: "Alex Morgan",
      profileImg: "/photos/Topfreelancers/freelancer1.PNG"
    },
    skills: "UI/UX Design, Figma, Adobe XD, Wireframing, Prototyping",
    portfolio_link: "https://alexmorgan.portfolio.com",
    verified: true,
    bio: "Passionate UI/UX designer with 5+ years of experience creating intuitive and beautiful interfaces for web and mobile applications.",
    rate: 4.9,
    score: 9.5,
    level: "expert"
  },
  {
    id: 2,
    user: {
      username: "sophiachen",
      full_name: "Sophia Chen",
      profileImg: "/photos/Topfreelancers/freelancer 2.PNG"
    },
    skills: "React, Node.js, MongoDB, Express, Full-Stack Development",
    portfolio_link: "https://sophiachen.dev",
    verified: true,
    bio: "Full-stack developer specializing in MERN stack applications. I build scalable, responsive web applications with clean code and modern best practices.",
    rate: 4.8,
    score: 9.2,
    level: "advanced"
  },
  {
    id: 3,
    user: {
      username: "marcusjohnson",
      full_name: "Marcus Johnson",
      profileImg: "/photos/Topfreelancers/freelancer3.PNG"
    },
    skills: "React Native, Flutter, Swift, Mobile Development, App Design",
    portfolio_link: "https://marcusjohnson.io",
    verified: true,
    bio: "Mobile app developer with expertise in cross-platform and native development. I've published over 20 apps to the App Store and Google Play.",
    rate: 4.7,
    score: 9.0,
    level: "advanced"
  },
  {
    id: 4,
    user: {
      username: "emmawilson",
      full_name: "Emma Wilson",
      profileImg: "/photos/Academy/student1.jpg"
    },
    skills: "SEO, Content Strategy, Google Analytics, Digital Marketing, Social Media",
    portfolio_link: "https://emmawilson.marketing",
    verified: true,
    bio: "Digital marketing specialist with a focus on SEO and content strategy. I help businesses improve their online visibility and drive organic traffic.",
    rate: 4.9,
    score: 9.3,
    level: "expert"
  },
  {
    id: 5,
    user: {
      username: "davidkim",
      full_name: "David Kim",
      profileImg: "/photos/Academy/student2.jpeg"
    },
    skills: "Python, Machine Learning, Data Analysis, TensorFlow, AI",
    portfolio_link: "https://davidkim.ai",
    verified: false,
    bio: "Machine learning engineer with a background in data science. I develop AI solutions for complex business problems and automate data-driven processes.",
    rate: 4.6,
    score: 8.8,
    level: "intermediate"
  },
  {
    id: 6,
    user: {
      username: "jenniferlopez",
      full_name: "Jennifer Lopez",
      profileImg: "/photos/Academy/student3.png"
    },
    skills: "Graphic Design, Branding, Illustration, Adobe Creative Suite",
    portfolio_link: "https://jenniferlopez.design",
    verified: true,
    bio: "Creative graphic designer with an eye for detail and a passion for branding. I create visual identities that help businesses stand out.",
    rate: 4.8,
    score: 9.1,
    level: "advanced"
  },
  {
    id: 7,
    user: {
      username: "michaelbrown",
      full_name: "Michael Brown",
      profileImg: "/fighterfish.png"
    },
    skills: "WordPress, PHP, Web Development, Theme Customization",
    portfolio_link: "https://michaelbrown.dev",
    verified: false,
    bio: "WordPress developer specializing in custom themes and plugins. I build fast, secure, and SEO-friendly websites that are easy to manage.",
    rate: 4.5,
    score: 8.7,
    level: "intermediate"
  },
  {
    id: 8,
    user: {
      username: "sarahjones",
      full_name: "Sarah Jones",
      profileImg: "/photos/Academy/student1.jpg"
    },
    skills: "Content Writing, Copywriting, Editing, SEO Writing",
    portfolio_link: "https://sarahjones.writing",
    verified: true,
    bio: "Professional content writer with experience in various industries. I create engaging, SEO-optimized content that drives traffic and conversions.",
    rate: 4.7,
    score: 9.0,
    level: "advanced"
  },
  {
    id: 9,
    user: {
      username: "robertwilliams",
      full_name: "Robert Williams",
      profileImg: "/photos/Academy/student2.jpeg"
    },
    skills: "Video Editing, Motion Graphics, After Effects, Premiere Pro",
    portfolio_link: "https://robertwilliams.video",
    verified: false,
    bio: "Video editor and motion graphics artist with a background in film. I create compelling visual stories that captivate audiences.",
    rate: 4.6,
    score: 8.9,
    level: "intermediate"
  },
  {
    id: 10,
    user: {
      username: "lisaanderson",
      full_name: "Lisa Anderson",
      profileImg: "/photos/Academy/student3.png"
    },
    skills: "Social Media Management, Content Creation, Instagram, TikTok",
    portfolio_link: "https://lisaanderson.social",
    verified: true,
    bio: "Social media manager with a knack for creating viral content. I help brands build their online presence and engage with their audience.",
    rate: 4.8,
    score: 9.2,
    level: "advanced"
  },
  {
    id: 11,
    user: {
      username: "thomaslee",
      full_name: "Thomas Lee",
      profileImg: "/fighterfish.png"
    },
    skills: "DevOps, AWS, Docker, Kubernetes, CI/CD",
    portfolio_link: "https://thomaslee.tech",
    verified: true,
    bio: "DevOps engineer with expertise in cloud infrastructure and automation. I help teams streamline their development and deployment processes.",
    rate: 4.9,
    score: 9.4,
    level: "expert"
  },
  {
    id: 12,
    user: {
      username: "oliviamartin",
      full_name: "Olivia Martin",
      profileImg: "/photos/Academy/student1.jpg"
    },
    skills: "UX Research, User Testing, Information Architecture, Accessibility",
    portfolio_link: "https://oliviamartin.ux",
    verified: false,
    bio: "UX researcher focused on creating user-centered designs. I conduct research to understand user needs and improve product usability.",
    rate: 4.7,
    score: 9.0,
    level: "advanced"
  }
];

export const mockProjects = [
  {
    id: 1,
    title: "E-commerce Website Development",
    description: "Looking for an experienced developer to build a modern e-commerce website with product catalog, shopping cart, and payment integration.",
    budget: 2500,
    deadline: "2023-12-15",
    technologies: "React, Node.js, MongoDB",
    skills_required: "Frontend Development, Backend Development, E-commerce",
    status: "in_progress",
    progress: 65,
    created_at: "2023-10-05",
    updated_at: "2023-11-10",
    applicants: 8,
    assigned_freelancer: {
      id: 2,
      name: "Sophia Chen",
      avatar: "/photos/Topfreelancers/freelancer 2.PNG",
      rating: 4.8
    },
    milestones: [
      {
        id: 1,
        title: "Design and Wireframes",
        description: "Create wireframes and design mockups for all pages",
        status: "completed",
        due_date: "2023-10-25",
        amount: 500
      },
      {
        id: 2,
        title: "Frontend Development",
        description: "Implement the frontend UI based on approved designs",
        status: "in_progress",
        due_date: "2023-11-20",
        amount: 1000
      },
      {
        id: 3,
        title: "Backend Development",
        description: "Develop backend API and database integration",
        status: "pending",
        due_date: "2023-12-05",
        amount: 1000
      }
    ],
    client: {
      id: 1,
      user: {
        full_name: "John Anderson",
        profileImg: "/photos/Academy/student1.jpg"
      }
    }
  },
  {
    id: 2,
    title: "Logo and Brand Identity Design",
    description: "Need a professional designer to create a logo and brand identity for a new fitness startup. Looking for modern, energetic designs.",
    budget: 800,
    deadline: "2023-11-30",
    technologies: "Adobe Illustrator, Photoshop",
    skills_required: "Logo Design, Brand Identity, Typography",
    status: "completed",
    progress: 100,
    created_at: "2023-09-15",
    updated_at: "2023-11-05",
    applicants: 12,
    assigned_freelancer: {
      id: 6,
      name: "Jennifer Lopez",
      avatar: "/photos/Academy/student3.png",
      rating: 4.8
    },
    milestones: [
      {
        id: 1,
        title: "Logo Concepts",
        description: "Create 3-5 initial logo concepts",
        status: "completed",
        due_date: "2023-10-01",
        amount: 300
      },
      {
        id: 2,
        title: "Brand Identity Package",
        description: "Develop complete brand identity including color palette, typography, and usage guidelines",
        status: "completed",
        due_date: "2023-10-30",
        amount: 500
      }
    ],
    client: {
      id: 2,
      user: {
        full_name: "Sarah Williams",
        profileImg: "/photos/Academy/student2.jpeg"
      }
    }
  },
  {
    id: 3,
    title: "Mobile App Development for Food Delivery",
    description: "Seeking a mobile developer to build a food delivery app for iOS and Android. Must include user authentication, restaurant listings, and order tracking.",
    budget: 3500,
    deadline: "2024-01-20",
    technologies: "React Native, Firebase",
    skills_required: "Mobile Development, UI/UX Design, API Integration",
    status: "in_progress",
    progress: 30,
    created_at: "2023-10-20",
    updated_at: "2023-11-15",
    applicants: 6,
    assigned_freelancer: {
      id: 3,
      name: "Marcus Johnson",
      avatar: "/photos/Topfreelancers/freelancer3.PNG",
      rating: 4.7
    },
    milestones: [
      {
        id: 1,
        title: "UI/UX Design",
        description: "Design user interface and experience for the app",
        status: "completed",
        due_date: "2023-11-15",
        amount: 800
      },
      {
        id: 2,
        title: "Frontend Development",
        description: "Implement the app UI and user flows",
        status: "in_progress",
        due_date: "2023-12-20",
        amount: 1500
      },
      {
        id: 3,
        title: "Backend Integration",
        description: "Integrate with backend services and APIs",
        status: "pending",
        due_date: "2024-01-10",
        amount: 1200
      }
    ],
    client: {
      id: 3,
      user: {
        full_name: "Michael Chen",
        profileImg: "/photos/Academy/student3.png"
      }
    }
  },
  {
    id: 4,
    title: "AI Chatbot for Customer Support",
    description: "Looking to implement an AI-powered chatbot for our customer support website. Should be able to handle common queries and escalate to human support when needed.",
    budget: 1800,
    deadline: "2023-12-10",
    technologies: "Python, TensorFlow, NLP",
    skills_required: "Machine Learning, Natural Language Processing, API Development",
    status: "pending",
    progress: 0,
    created_at: "2023-11-01",
    updated_at: "2023-11-01",
    applicants: 4,
    assigned_freelancer: null,
    milestones: [
      {
        id: 1,
        title: "Requirements Analysis",
        description: "Analyze requirements and define chatbot capabilities",
        status: "pending",
        due_date: "2023-11-15",
        amount: 300
      },
      {
        id: 2,
        title: "Chatbot Development",
        description: "Develop and train the AI chatbot",
        status: "pending",
        due_date: "2023-12-01",
        amount: 1000
      },
      {
        id: 3,
        title: "Integration and Testing",
        description: "Integrate with website and perform testing",
        status: "pending",
        due_date: "2023-12-10",
        amount: 500
      }
    ],
    client: {
      id: 1,
      user: {
        full_name: "John Anderson",
        profileImg: "/photos/Academy/student1.jpg"
      }
    }
  },
  {
    id: 5,
    title: "SEO Optimization for E-commerce Site",
    description: "Need an SEO expert to improve our e-commerce website's search engine ranking. Looking for comprehensive strategy and implementation.",
    budget: 1200,
    deadline: "2023-11-25",
    technologies: "Google Analytics, SEMrush, Ahrefs",
    skills_required: "SEO, Content Strategy, Keyword Research",
    status: "pending",
    progress: 0,
    created_at: "2023-10-25",
    updated_at: "2023-10-25",
    applicants: 7,
    assigned_freelancer: null,
    milestones: [
      {
        id: 1,
        title: "SEO Audit",
        description: "Perform comprehensive SEO audit of the website",
        status: "pending",
        due_date: "2023-11-05",
        amount: 300
      },
      {
        id: 2,
        title: "Strategy Development",
        description: "Develop SEO strategy and implementation plan",
        status: "pending",
        due_date: "2023-11-15",
        amount: 400
      },
      {
        id: 3,
        title: "Implementation",
        description: "Implement SEO optimizations and monitor results",
        status: "pending",
        due_date: "2023-11-25",
        amount: 500
      }
    ],
    client: {
      id: 2,
      user: {
        full_name: "Sarah Williams",
        profileImg: "/photos/Academy/student2.jpeg"
      }
    }
  },
  {
    id: 6,
    title: "UI/UX Redesign for Financial App",
    description: "Seeking a UI/UX designer to redesign our financial management application. Focus on improving user experience and modernizing the interface.",
    budget: 2000,
    deadline: "2023-12-20",
    technologies: "Figma, Adobe XD, Sketch",
    skills_required: "UI Design, UX Research, Prototyping",
    status: "pending",
    progress: 0,
    created_at: "2023-11-05",
    updated_at: "2023-11-05",
    applicants: 9,
    assigned_freelancer: null,
    milestones: [
      {
        id: 1,
        title: "User Research",
        description: "Conduct user research and analyze pain points",
        status: "pending",
        due_date: "2023-11-20",
        amount: 500
      },
      {
        id: 2,
        title: "UI/UX Design",
        description: "Create wireframes and high-fidelity designs",
        status: "pending",
        due_date: "2023-12-10",
        amount: 1000
      },
      {
        id: 3,
        title: "Prototyping",
        description: "Develop interactive prototypes for testing",
        status: "pending",
        due_date: "2023-12-20",
        amount: 500
      }
    ],
    client: {
      id: 3,
      user: {
        full_name: "Michael Chen",
        profileImg: "/photos/Academy/student3.png"
      }
    }
  }
];

export const mockClients = [
  {
    id: 1,
    name: 'John Anderson',
    email: 'john@example.com',
    company: 'Anderson Enterprises',
    avatar: '/photos/Academy/student1.jpg',
    joinDate: '2023-01-15',
    projectsPosted: 8,
    projectsCompleted: 5,
    totalSpent: 12500,
    preferredCategories: ['Web Development', 'Mobile Development', 'UI/UX Design'],
    rating: 4.8
  },
  {
    id: 2,
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    company: 'Williams Design Studio',
    avatar: '/photos/Academy/student2.jpeg',
    joinDate: '2023-02-20',
    projectsPosted: 5,
    projectsCompleted: 3,
    totalSpent: 7800,
    preferredCategories: ['Graphic Design', 'Logo Design', 'Brand Identity'],
    rating: 4.9
  },
  {
    id: 3,
    name: 'Michael Chen',
    email: 'michael@example.com',
    company: 'FoodTech Solutions',
    avatar: '/photos/Academy/student3.png',
    joinDate: '2023-03-10',
    projectsPosted: 3,
    projectsCompleted: 1,
    totalSpent: 4500,
    preferredCategories: ['Mobile Development', 'React Native', 'Firebase'],
    rating: 4.7
  }
];

export const mockServices = [
  {
    id: 1,
    title: "Professional Web Development",
    description: "I will create a modern, responsive website for your business or personal brand using the latest technologies.",
    price: 250,
    category: "Web Development",
    technologies: "React, Node.js, MongoDB",
    skills: "Frontend Development, Backend Development, Database Design",
    availability: true,
    freelancer: {
      user: {
        full_name: "John Smith",
        profileImg: "/photos/Academy/student1.jpg"
      },
      rate: 4.8
    }
  },
  {
    id: 2,
    title: "Logo & Brand Identity Design",
    description: "I will design a professional logo and complete brand identity package for your business that stands out.",
    price: 180,
    category: "Graphic Design",
    technologies: "Adobe Illustrator, Photoshop",
    skills: "Logo Design, Brand Identity, Typography",
    availability: true,
    freelancer: {
      user: {
        full_name: "Sarah Johnson",
        profileImg: "/photos/Academy/student2.jpeg"
      },
      rate: 4.9
    }
  },
  {
    id: 3,
    title: "Mobile App Development",
    description: "I will develop a high-quality mobile application for iOS and Android platforms with a focus on performance and user experience.",
    price: 350,
    category: "Mobile Development",
    technologies: "React Native, Flutter",
    skills: "Mobile Development, UI/UX Design, API Integration",
    availability: true,
    freelancer: {
      user: {
        full_name: "Michael Chen",
        profileImg: "/photos/Academy/student3.png"
      },
      rate: 4.7
    }
  },
  {
    id: 4,
    title: "AI-Powered Chatbot Development",
    description: "I will create a custom AI chatbot for your website or application that can handle customer inquiries and automate responses.",
    price: 300,
    category: "Intelligence AI",
    technologies: "Python, TensorFlow, NLP",
    skills: "Machine Learning, Natural Language Processing, API Development",
    availability: false,
    freelancer: {
      user: {
        full_name: "Alex Rodriguez",
        profileImg: "/fighterfish.png"
      },
      rate: 4.6
    }
  },
  {
    id: 5,
    title: "SEO Optimization & Strategy",
    description: "I will improve your website's search engine ranking with a comprehensive SEO strategy and implementation plan.",
    price: 200,
    category: "Digital Marketing",
    technologies: "Google Analytics, SEMrush, Ahrefs",
    skills: "SEO, Content Strategy, Keyword Research",
    availability: true,
    freelancer: {
      user: {
        full_name: "Emma Wilson",
        profileImg: "/photos/Academy/student2.jpeg"
      },
      rate: 4.9
    }
  },
  {
    id: 6,
    title: "UI/UX Design for Web & Mobile",
    description: "I will create beautiful, intuitive user interfaces and experiences for your web or mobile application.",
    price: 280,
    category: "Graphic Design",
    technologies: "Figma, Adobe XD, Sketch",
    skills: "UI Design, UX Research, Prototyping",
    availability: true,
    freelancer: {
      user: {
        full_name: "David Kim",
        profileImg: "/photos/Academy/student1.jpg"
      },
      rate: 4.8
    }
  }
];
