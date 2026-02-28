import React from 'react';
import { motion } from 'framer-motion';
import {
  UserCircleIcon,
  FolderIcon,
  AcademicCapIcon,
  EnvelopeIcon,
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';
import { personalInfo } from '../../data/personalInfo';
import { projects } from '../../data/projects';
import { certificates } from '../../data/certificates';
import { skills } from '../../data/skills';

export const MobileFallback: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-.8 1.94-.8s.16 1.09-.69 2.01c-.78.86-1.91.85-1.91.85s-.17-1.16.66-2.06z" />
            </svg>
            <span className="font-semibold">Portfolio OS</span>
          </div>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <CodeBracketIcon className="w-5 h-5" />
          </a>
        </div>
      </header>

      {/* Notice Banner */}
      <div className="pt-20 pb-4 px-4 bg-macos-blue/20 border-b border-macos-blue/30">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-gray-300">
            📱 This portfolio is best viewed on desktop for the full macOS experience.
            <br />
            <span className="text-gray-400">Here's a mobile-friendly preview:</span>
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-macos-blue to-macos-purple flex items-center justify-center">
            <UserCircleIcon className="w-24 h-24 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">{personalInfo.name}</h1>
          <p className="text-xl text-macos-blue mb-4">{personalInfo.title}</p>
          <p className="text-gray-400 mb-6">{personalInfo.location}</p>
          <div className="flex justify-center gap-4">
            <a
              href={`mailto:${personalInfo.email}`}
              className="px-6 py-3 bg-macos-blue rounded-lg hover:bg-blue-600 transition-colors"
            >
              Contact Me
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </motion.section>

        {/* Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="text-center p-4 bg-gray-800 rounded-xl">
            <p className="text-3xl font-bold text-macos-blue">{personalInfo.stats.hoursTrained}</p>
            <p className="text-sm text-gray-400 mt-1">Hours Trained</p>
          </div>
          <div className="text-center p-4 bg-gray-800 rounded-xl">
            <p className="text-3xl font-bold text-macos-green">{personalInfo.stats.certificates}</p>
            <p className="text-sm text-gray-400 mt-1">Certificates</p>
          </div>
          <div className="text-center p-4 bg-gray-800 rounded-xl">
            <p className="text-3xl font-bold text-macos-yellow">{personalInfo.stats.projects}</p>
            <p className="text-sm text-gray-400 mt-1">Projects</p>
          </div>
          <div className="text-center p-4 bg-gray-800 rounded-xl">
            <p className="text-3xl font-bold text-macos-orange">{personalInfo.stats.yearsExperience}</p>
            <p className="text-sm text-gray-400 mt-1">Years Exp.</p>
          </div>
        </motion.section>

        {/* About */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 rounded-2xl p-6"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <UserCircleIcon className="w-6 h-6 text-macos-blue" />
            About Me
          </h2>
          <p className="text-gray-300 leading-relaxed whitespace-pre-line">
            {personalInfo.bio}
          </p>
        </motion.section>

        {/* Skills */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800 rounded-2xl p-6"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <CodeBracketIcon className="w-6 h-6 text-macos-green" />
            Skills
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {skills.slice(0, 10).map(skill => (
              <div key={skill.name} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <span>{skill.name}</span>
                <span className="text-macos-blue font-semibold">{skill.level}%</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Projects */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800 rounded-2xl p-6"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <FolderIcon className="w-6 h-6 text-macos-yellow" />
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map(project => (
              <div key={project.id} className="p-4 bg-gray-700 rounded-xl">
                <h3 className="font-semibold text-lg mb-2">{project.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.techStack.slice(0, 4).map(tech => (
                    <span key={tech} className="px-2 py-1 bg-macos-blue/20 text-macos-blue text-xs rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
                    >
                      <CodeBracketIcon className="w-4 h-4" />
                      Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-macos-blue hover:text-blue-400"
                    >
                      <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                      Live
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Certificates */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-800 rounded-2xl p-6"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <AcademicCapIcon className="w-6 h-6 text-macos-orange" />
            Certificates
          </h2>
          <div className="space-y-3">
            {certificates.map(cert => (
              <div key={cert.id} className="p-4 bg-gray-700 rounded-xl">
                <h3 className="font-semibold">{cert.name}</h3>
                <p className="text-sm text-gray-400 mt-1">
                  {cert.issuer} • {cert.date}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Contact */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-800 rounded-2xl p-6"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <EnvelopeIcon className="w-6 h-6 text-macos-green" />
            Get in Touch
          </h2>
          <div className="space-y-3">
            <a
              href={`mailto:${personalInfo.email}`}
              className="block p-4 bg-gray-700 rounded-xl hover:bg-gray-600 transition-colors"
            >
              <p className="text-sm text-gray-400">Email</p>
              <p className="font-medium">{personalInfo.email}</p>
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-gray-700 rounded-xl hover:bg-gray-600 transition-colors"
            >
              <p className="text-sm text-gray-400">LinkedIn</p>
              <p className="font-medium">linkedin.com/in/itsaahsan</p>
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-gray-700 rounded-xl hover:bg-gray-600 transition-colors"
            >
              <p className="text-sm text-gray-400">GitHub</p>
              <p className="font-medium">github.com/itsaahsan</p>
            </a>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-8 border-t border-gray-800 text-center text-gray-500">
        <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
        <p className="mt-2 text-sm">Built with React, TypeScript, Tailwind CSS & Framer Motion</p>
      </footer>
    </div>
  );
};

export default MobileFallback;
