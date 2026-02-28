"use client";
import { motion } from "framer-motion";
import { FaArrowRight, FaGraduationCap, FaClock, FaUsers } from "react-icons/fa";

export default function TopCourses() {
  const courses = [
    {
      title: "Full-Stack Web Development",
      description: "ReactJS, NodeJS, MongoDB, ExpressJS",
      instructor: "John Smith",
      duration: "12 weeks",
      students: 1200,
      level: "Beginner",
      link: "#",
    },
    {
      title: "AI & Machine Learning",
      description: "Build intelligent systems with Python, TensorFlow & AI tools.",
      instructor: "Sarah Johnson",
      duration: "8 weeks",
      students: 950,
      level: "Intermediate",
      link: "#",
    },
    {
      title: "Cybersecurity & Hacking",
      description: "Learn to secure networks, prevent cyber threats & ethical hacking.",
      instructor: "Michael Brown",
      duration: "10 weeks",
      students: 800,
      level: "Advanced",
      link: "#",
    },
  ];

  const getLevelColor = (level) => {
    switch(level) {
      case "Beginner": return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";
      case "Intermediate": return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
      case "Advanced": return "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400";
      default: return "bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <section className="py-16 px-6 md:px-16 text-center bg-gray-50 dark:bg-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Top Courses</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
          Boost your skills with expert-led courses. Whether you're a beginner or a pro, we have the right training for you!
        </p>
      </motion.div>

      {/* Course Highlight Section */}
      <div className="relative mt-10 mx-auto max-w-3xl md:max-w-5xl">
        {/* Background Image with Left Gradient Shadow */}
        <motion.div
          className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img
            src="/photos/top courses.jpg"
            alt="Courses"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/fighterfish.png";
            }}
          />
          {/* Left Gradient Shadow */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent"></div>

          <div className="absolute inset-0 flex flex-col justify-between p-8 text-left">
            {/* View All Link */}
            <motion.a
              href="#"
              className="text-white font-semibold hover:underline inline-flex items-center gap-2 group w-fit"
              whileHover={{ x: 5 }}
            >
              <span>View all courses</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.a>

            {/* Main Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-white text-3xl md:text-4xl font-bold max-w-md">
                Stay ahead in your career
              </h3>
              <ul className="text-gray-300 text-sm mt-5 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
                  <span>Learn and work on real-world projects</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
                  <span>Get certified and boost your resume</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
                  <span>Gain hands-on experience with expert guidance</span>
                </li>
              </ul>
            </motion.div>

            {/* Course Cards */}
            <div className="flex space-x-4 overflow-x-auto pb-2 -mx-2 px-2">
              {courses.map((course, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-900 bg-opacity-95 dark:bg-opacity-95 p-4 rounded-lg shadow-lg flex-shrink-0 w-64 text-left transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">{course.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${getLevelColor(course.level)}`}>{course.level}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{course.description}</p>

                  <div className="flex flex-col gap-1 mb-3 text-xs text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <FaGraduationCap />
                      <span>{course.instructor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaUsers />
                      <span>{course.students} students</span>
                    </div>
                  </div>

                  <a
                    href={course.link}
                    className="text-primary-600 dark:text-primary-400 font-semibold inline-flex items-center gap-1 text-sm group"
                  >
                    <span>Enroll now</span>
                    <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* View All Courses Button */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <a
          href="/Academy"
          className="bg-primary-600 hover:bg-primary-700 text-white transition-all duration-300 px-8 py-3 rounded-lg flex items-center justify-center gap-2 w-fit mx-auto shadow-lg hover:shadow-primary-500/30 group"
        >
          <span className="font-semibold">Explore all courses</span>
          <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
        </a>
      </motion.div>
    </section>
  );
}
