// Sample posts for the community feed

export const samplePosts = [
  {
    id: 1001,
    post: {
      id: 1001,
      title: "Available for UI/UX Design Projects",
      content: "I'm currently taking on new UI/UX design projects! Specializing in creating intuitive, user-centered designs for web and mobile applications. My process includes user research, wireframing, prototyping, and usability testing. Check out my portfolio for examples of my recent work. #UIUXDesign #FreelanceDesigner #UserExperience #AvailableForHire",
      created_at: "2023-11-15T09:30:00Z",
      updated_at: "2023-11-15T09:30:00Z",
      user: {
        username: "sarahjohnson",
        full_name: "Sarah Johnson",
        profileImg: "/photos/Academy/student1.jpg"
      },
      likes: [
        { username: "alexsmith" },
        { username: "michaelwilson" },
        { username: "emilydavis" }
      ],
      comments: [
        {
          id: 101,
          content: "Your portfolio is amazing! I might have a project for you.",
          created_at: "2023-11-15T10:15:00Z",
          user: {
            username: "alexsmith",
            full_name: "Alex Smith",
            profileImg: "/photos/Academy/student2.jpeg"
          }
        }
      ],
      images: ["/photos/works/design.PNG"]
    }
  },
  {
    id: 1002,
    post: {
      id: 1002,
      title: "Just Completed a Full-Stack E-commerce Project",
      content: "Excited to share that I just completed a full-stack e-commerce project using React, Node.js, and MongoDB! The site features a responsive design, secure payment processing, and a custom admin dashboard. Looking forward to taking on similar projects. Feel free to reach out if you need help with your e-commerce platform! #WebDevelopment #FullStack #Ecommerce #ReactJS #NodeJS",
      created_at: "2023-11-14T14:45:00Z",
      updated_at: "2023-11-14T14:45:00Z",
      user: {
        username: "michaelwilson",
        full_name: "Michael Wilson",
        profileImg: "/photos/Academy/student3.png"
      },
      likes: [
        { username: "sarahjohnson" },
        { username: "davidbrown" },
        { username: "emilydavis" },
        { username: "alexsmith" }
      ],
      comments: [
        {
          id: 102,
          content: "This looks impressive! How did you handle the payment processing?",
          created_at: "2023-11-14T15:20:00Z",
          user: {
            username: "davidbrown",
            full_name: "David Brown",
            profileImg: "/photos/Academy/student2.jpeg"
          }
        },
        {
          id: 103,
          content: "Great work! Would love to collaborate on a project sometime.",
          created_at: "2023-11-14T16:05:00Z",
          user: {
            username: "emilydavis",
            full_name: "Emily Davis",
            profileImg: "/photos/Academy/student1.jpg"
          }
        }
      ],
      images: ["/photos/works/web.PNG"]
    }
  },
  {
    id: 1003,
    post: {
      id: 1003,
      title: "Mobile App Development Services",
      content: "Looking for a mobile app developer? I specialize in creating native and cross-platform mobile applications for iOS and Android. With 5+ years of experience in React Native and Flutter, I can help bring your app idea to life. Currently available for new projects starting next month. DM me for details and rates! #MobileAppDevelopment #ReactNative #Flutter #iOSDevelopment #AndroidDevelopment",
      created_at: "2023-11-13T11:20:00Z",
      updated_at: "2023-11-13T11:20:00Z",
      user: {
        username: "davidbrown",
        full_name: "David Brown",
        profileImg: "/photos/Topfreelancers/freelancer1.PNG"
      },
      likes: [
        { username: "sarahjohnson" },
        { username: "alexsmith" }
      ],
      comments: [],
      images: ["/photos/works/mobile.PNG"]
    }
  },
  {
    id: 1004,
    post: {
      id: 1004,
      title: "Tips for Freelancers: Building Your Personal Brand",
      content: "As freelancers, our personal brand is one of our most valuable assets. Here are some tips I've learned over the years:\\n\\n1. Define your unique value proposition\\n2. Create a consistent visual identity\\n3. Showcase your expertise through content creation\\n4. Engage with your target audience on social media\\n5. Collect and display testimonials from satisfied clients\\n\\nWhat strategies have worked for you? Share in the comments! #FreelanceTips #PersonalBranding #SelfEmployed #FreelanceAdvice",
      created_at: "2023-11-12T16:15:00Z",
      updated_at: "2023-11-12T16:15:00Z",
      user: {
        username: "emilydavis",
        full_name: "Emily Davis",
        profileImg: "/photos/Topfreelancers/freelancer 2.PNG"
      },
      likes: [
        { username: "sarahjohnson" },
        { username: "michaelwilson" },
        { username: "davidbrown" },
        { username: "alexsmith" },
        { username: "jennifertaylor" }
      ],
      comments: [
        {
          id: 104,
          content: "Great tips! I'd add that consistency in delivering quality work is key to building a strong reputation.",
          created_at: "2023-11-12T17:30:00Z",
          user: {
            username: "sarahjohnson",
            full_name: "Sarah Johnson",
            profileImg: "/photos/Academy/student1.jpg"
          }
        }
      ],
      images: []
    }
  },
  {
    id: 1005,
    post: {
      id: 1005,
      title: "Looking for a Graphic Designer for Logo Project",
      content: "Our startup is looking for a talented graphic designer to create a modern, memorable logo. We're in the tech education space and want something that conveys innovation and accessibility. Budget is $500-700, and we need it completed within 2 weeks. If interested, please DM with your portfolio and availability. #GraphicDesignJobs #LogoDesign #FreelanceOpportunity #HiringFreelancers",
      created_at: "2023-11-11T13:40:00Z",
      updated_at: "2023-11-11T13:40:00Z",
      user: {
        username: "alexsmith",
        full_name: "Alex Smith",
        profileImg: "/photos/Topfreelancers/freelancer3.PNG"
      },
      likes: [
        { username: "sarahjohnson" },
        { username: "jennifertaylor" }
      ],
      comments: [
        {
          id: 105,
          content: "I'm interested! Just sent you a DM with my portfolio.",
          created_at: "2023-11-11T14:05:00Z",
          user: {
            username: "jennifertaylor",
            full_name: "Jennifer Taylor",
            profileImg: "/photos/Academy/student1.jpg"
          }
        }
      ],
      images: []
    }
  },
  {
    id: 1006,
    post: {
      id: 1006,
      title: "AI Integration Services for Your Business",
      content: "Helping businesses leverage AI to automate processes and gain insights from their data. Whether you need chatbots, recommendation systems, or predictive analytics, I can develop custom AI solutions tailored to your specific needs. Currently offering a free 30-minute consultation to discuss how AI can benefit your business. #ArtificialIntelligence #MachineLearning #BusinessAutomation #DataScience #FreelanceServices",
      created_at: "2023-11-10T10:25:00Z",
      updated_at: "2023-11-10T10:25:00Z",
      user: {
        username: "jennifertaylor",
        full_name: "Jennifer Taylor",
        profileImg: "/photos/Academy/student2.jpeg"
      },
      likes: [
        { username: "michaelwilson" },
        { username: "davidbrown" },
        { username: "alexsmith" }
      ],
      comments: [
        {
          id: 106,
          content: "This is exactly what our company has been looking for. Will definitely reach out for a consultation!",
          created_at: "2023-11-10T11:15:00Z",
          user: {
            username: "michaelwilson",
            full_name: "Michael Wilson",
            profileImg: "/photos/Academy/student3.png"
          }
        }
      ],
      images: ["/photos/works/IA.PNG"]
    }
  },
  {
    id: 1007,
    post: {
      id: 1007,
      title: "How I Landed My First $10K Project on FyterLance",
      content: "I wanted to share my success story with the community! After 3 months on FyterLance, I just secured my first $10K project. Here's what worked for me:\\n\\n1. I niched down to focus specifically on SaaS companies\\n2. I completely revamped my portfolio to showcase relevant case studies\\n3. I personalized every proposal and focused on the client's ROI\\n4. I followed up consistently but respectfully\\n\\nDon't get discouraged if success doesn't come immediately. Keep refining your approach! #FreelanceSuccess #FyterLance #ClientAcquisition #FreelanceTips",
      created_at: "2023-11-09T15:50:00Z",
      updated_at: "2023-11-09T15:50:00Z",
      user: {
        username: "robertjohnson",
        full_name: "Robert Johnson",
        profileImg: "/photos/Academy/student3.png"
      },
      likes: [
        { username: "sarahjohnson" },
        { username: "michaelwilson" },
        { username: "davidbrown" },
        { username: "emilydavis" },
        { username: "alexsmith" },
        { username: "jennifertaylor" }
      ],
      comments: [
        {
          id: 107,
          content: "Congratulations! This is really inspiring. I'm going to try implementing some of these strategies.",
          created_at: "2023-11-09T16:20:00Z",
          user: {
            username: "emilydavis",
            full_name: "Emily Davis",
            profileImg: "/photos/Topfreelancers/freelancer 2.PNG"
          }
        },
        {
          id: 108,
          content: "Great job! Would you mind sharing more about how you approached the ROI conversation with clients?",
          created_at: "2023-11-09T17:05:00Z",
          user: {
            username: "davidbrown",
            full_name: "David Brown",
            profileImg: "/photos/Topfreelancers/freelancer1.PNG"
          }
        }
      ],
      images: []
    }
  }
];
