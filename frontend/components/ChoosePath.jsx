"use client";
import { FaLaptop, FaBriefcase, FaChalkboardTeacher, FaArrowRight } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

export default function ChoosePath() {
  const { openRegisterModal } = useAuth();

  const paths = [
    {
      title: "Freelancer",
      icon: <FaLaptop className="text-blue-600 dark:text-blue-400" />,
      description: "Find Work and Grow Your Career",
      details: "Join a mission-based freelancing system where you gain experience, earn money, and level up your skills.",
      image: "/photos/freelancer.PNG",
      color: "from-blue-50 to-blue-200",
      darkColor: "from-blue-900/40 to-indigo-800/40",
      action: "Find Projects"
    },
    {
      title: "Client",
      icon: <FaBriefcase className="text-green-600 dark:text-green-400" />,
      description: "Hire the Best Talent for Your Business",
      details: "Post projects and get matched with skilled freelancers using our AI-powered system.",
      image: "/photos/client.PNG",
      color: "from-green-50 to-green-200",
      darkColor: "from-emerald-900/40 to-teal-800/40",
      action: "Post a Project"
    },
    {
      title: "Trainer",
      icon: <FaChalkboardTeacher className="text-red-600 dark:text-red-400" />,
      description: "Train the Next Generation",
      details: "Monetize your knowledge by creating courses or mentoring freelancers.",
      image: "/photos/Trainer.PNG",
      color: "from-red-50 to-red-200",
      darkColor: "from-rose-900/40 to-red-800/40",
      action: "Start Teaching"
    },
  ];

  return (
    <section id="choose-path-section" className="py-16 px-6 md:px-16 text-center bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white transition-colors duration-200">
        Choose Your Path on <span className="text-primary-600 dark:text-primary-400 transition-colors duration-200">FytrLance</span>
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto transition-colors duration-200">
        Whether you're a freelancer looking for work, a business searching for top talent, or a trainer ready to share knowledge, we've got you covered!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        {paths.map((path, index) => (
          <div
            key={index}
            className="relative group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="relative w-full h-48 overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${path.color} dark:bg-gradient-to-br dark:${path.darkColor} transition-opacity duration-300 group-hover:opacity-90 backdrop-blur-sm`}></div>
              <img
                src={path.image}
                alt={path.title}
                className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-soft-light transition-transform duration-500 group-hover:scale-110 filter saturate-90"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/fighterfish.png";
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                <div className="w-16 h-16 bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 shadow-md ring-2 ring-white/60 dark:ring-gray-600/50">
                  {path.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white drop-shadow-md">{path.title}</h3>
              </div>
            </div>
            <div className="p-6">
              <h4 className="text-lg text-gray-900 dark:text-white font-semibold mb-2 transition-colors duration-200">{path.description}</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-6 transition-colors duration-200">{path.details}</p>
              <button
                onClick={openRegisterModal}
                className="flex items-center justify-center w-full py-2 px-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 group"
              >
                <span>{path.action}</span>
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
