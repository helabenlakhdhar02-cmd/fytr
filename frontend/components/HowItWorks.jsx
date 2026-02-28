"use client";
import { motion } from "framer-motion";
import { FaUserPlus, FaBriefcase, FaMoneyBillWave, FaUsers } from "react-icons/fa";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      icon: <FaUserPlus className="text-white" />,
      title: "Sign Up & Create Your Profile",
      description:
        "Join FytrLance as a Freelancer, Client, or Trainer. Set up your profile and verify your skills to get started.",
      color: "bg-blue-600 dark:bg-blue-700",
      shadowColor: "shadow-blue-500/30"
    },
    {
      number: "2",
      icon: <FaBriefcase className="text-white" />,
      title: "Work or Hire with Confidence",
      description:
        "Freelancers join projects and compete fairly, while businesses get AI-matched to top talent for their needs.",
      color: "bg-green-600 dark:bg-green-700",
      shadowColor: "shadow-green-500/30"
    },
    {
      number: "3",
      icon: <FaMoneyBillWave className="text-white" />,
      title: "Get Paid & Level Up",
      description:
        "Payments are secured through our escrow system, ensuring safe transactions. Freelancers earn XP and rank up to unlock better opportunities.",
      color: "bg-purple-600 dark:bg-purple-700",
      shadowColor: "shadow-purple-500/30"
    },
    {
      number: "4",
      icon: <FaUsers className="text-white" />,
      title: "Grow & Engage with the Community",
      description:
        "Take free courses, earn certifications, and network with top professionals in the FytrLance community. The more you learn and contribute, the more opportunities you unlock!",
      color: "bg-red-600 dark:bg-red-700",
      shadowColor: "shadow-red-500/30"
    },
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-800 p-8 md:p-12">
      <div className="bg-primary-50 dark:bg-primary-900/10 mx-auto py-12 px-7 rounded-xl shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="hidden lg:block relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-2xl filter blur-md transform scale-105"
              animate={{ opacity: [0.5, 0.7, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            ></motion.div>
            <motion.img
              src="/photos/fyter.png"
              alt="FyterLance Process"
              className="relative z-10 max-w-full ml-20 drop-shadow-xl"
              initial={{ y: 10 }}
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/fighterfish.png";
              }}
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              How <span className="text-primary-600 dark:text-primary-400">FytrLance</span> Works
            </h2>
            <div className="flex flex-col gap-6 relative">
              {/* Vertical line connecting steps */}
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-200 dark:bg-gray-700 z-0"></div>

              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="flex flex-row gap-5 relative z-10"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <motion.div
                    className={`${step.color} w-12 h-12 rounded-full flex justify-center items-center text-white shadow-lg ${step.shadowColor} flex-shrink-0`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {step.icon}
                  </motion.div>
                  <div className="max-w-xl gap-2 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md flex flex-col justify-center items-start flex-grow">
                    <div className="text-xl text-gray-900 dark:text-white font-semibold flex items-center gap-2">
                      <span className="text-primary-600 dark:text-primary-400">{step.number}.</span> {step.title}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">{step.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}