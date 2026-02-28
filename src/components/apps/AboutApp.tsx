import React from 'react';
import { motion } from 'framer-motion';
import { UserCircleIcon, MapPinIcon, EnvelopeIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { personalInfo } from '../../data/personalInfo';
import { skills, skillCategories } from '../../data/skills';
import { Window } from '../common/Window';
import { useWindows } from '../../context/WindowContext';

export const AboutApp: React.FC = () => {
  const { closeWindow, minimizeWindow, maximizeWindow, getWindowByAppId } = useWindows();
  const windowState = getWindowByAppId('about');

  if (!windowState) return null;

  const handleDownloadResume = () => {
    const resumeContent = `
AMIMUL AHSAN
AI/ML Engineer and Full-Stack Developer

Contact:
Email: itsaahsan@gmail.com
Location: Dhaka, Bangladesh
GitHub: github.com/itsaahsan
LinkedIn: linkedin.com/in/itsaahsan

Summary:
Passionate AI/ML Engineer and Full-Stack Developer with 2000+ hours of dedicated training
and 12+ professional certifications.

Skills:
- AI/ML: Python, TensorFlow, PyTorch, Machine Learning, Deep Learning, NLP, Computer Vision
- Backend: FastAPI, Django, Node.js, Express, PostgreSQL, MongoDB, Redis, Docker, AWS
- Frontend: React, TypeScript, Next.js, Tailwind CSS, Framer Motion, React Native

Experience:
- Built multiple AI-powered applications
- Developed full-stack web applications
- Contributed to open-source projects

Education:
- Bachelor of Science in Computer Science, University of Dhaka (2022)
- Harvard CS50: Introduction to Computer Science (2023)
- Deep Learning Specialization - Andrew Ng (2023)

Projects:
- Shop Hub: Full-stack e-commerce platform
- LiftIQ: AI-powered fitness tracking app
- AI E-Commerce Platform: Intelligent e-commerce with ML recommendations
    `;

    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Amimul_Ahsan_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Window
      window={windowState}
      title="About Me"
      icon={UserCircleIcon}
      onClose={() => closeWindow(windowState.id)}
      onMinimize={() => minimizeWindow(windowState.id)}
      onMaximize={() => maximizeWindow(windowState.id)}
      minWidth={600}
      minHeight={500}
    >
      <div className="h-full overflow-auto bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-950">
        <div className="p-8 space-y-8">
          {/* Header with enhanced styling */}
          <div className="flex items-start gap-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-50 animate-pulse" />
              <div className="relative w-32 h-32 rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center shadow-2xl">
                <UserCircleIcon className="w-24 h-24 text-white" />
              </div>
            </motion.div>
            <div className="flex-1">
              <motion.h1
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent"
              >
                {personalInfo.name}
              </motion.h1>
              <p className="text-lg text-purple-600 dark:text-purple-400 mt-2 font-semibold">
                {personalInfo.title}
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full">
                  <MapPinIcon className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium">{personalInfo.location}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full">
                  <EnvelopeIcon className="w-4 h-4 text-purple-500" />
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadResume}
                className="mt-5 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300"
              >
                <ArrowDownTrayIcon className="w-5 h-5" />
                Download Resume
              </motion.button>
            </div>
          </div>

          {/* Stats with enhanced cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: personalInfo.stats.hoursTrained, label: 'Hours Trained', color: 'from-purple-500 to-indigo-500' },
              { value: personalInfo.stats.certificates, label: 'Certificates', color: 'from-green-500 to-emerald-500' },
              { value: personalInfo.stats.projects, label: 'Projects', color: 'from-yellow-500 to-orange-500' },
              { value: personalInfo.stats.yearsExperience, label: 'Years Exp.', color: 'from-pink-500 to-red-500' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`relative overflow-hidden p-5 bg-gradient-to-br ${stat.color} rounded-2xl shadow-xl`}
              >
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
                <div className="relative z-10 text-center text-white">
                  <p className="text-4xl font-bold drop-shadow-lg">{stat.value}</p>
                  <p className="text-sm mt-2 font-medium opacity-90">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bio with enhanced styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700 shadow-xl"
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              My Story
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {personalInfo.bio}
            </p>
          </motion.div>

          {/* Skills with enhanced progress bars */}
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Skills & Expertise
            </h2>
            <div className="space-y-6">
              {skillCategories.map((category, catIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: catIndex * 0.15 }}
                  className="p-5 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700 shadow-lg"
                >
                  <h3 className="text-sm font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-4">
                    {category}
                  </h3>
                  <div className="space-y-4">
                    {skills
                      .filter(skill => skill.category === category)
                      .map((skill, skillIndex) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: catIndex * 0.1 + skillIndex * 0.05 }}
                        >
                          <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                            <span className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 1.5, delay: catIndex * 0.1 + skillIndex * 0.05, ease: 'easeOut' }}
                              className={`h-full rounded-full relative overflow-hidden ${
                                skill.level >= 90
                                  ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                                  : skill.level >= 75
                                  ? 'bg-gradient-to-r from-purple-400 to-purple-600'
                                  : 'bg-gradient-to-r from-yellow-400 to-orange-500'
                              }`}
                            >
                              {/* Shine effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
};

export default AboutApp;
