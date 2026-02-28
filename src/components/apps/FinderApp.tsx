import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FolderIcon,
  DocumentIcon,
  ArrowDownTrayIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';
import { Window } from '../common/Window';
import { useWindows } from '../../context/WindowContext';
import { personalInfo } from '../../data/personalInfo';

interface FinderItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  fileType?: 'pdf' | 'code' | 'text';
  size?: string;
  modified?: string;
  content?: string;
}

export const FinderApp: React.FC = () => {
  const { closeWindow, minimizeWindow, maximizeWindow, getWindowByAppId } = useWindows();
  const windowState = getWindowByAppId('finder');
  const [currentPath, setCurrentPath] = useState<string[]>(['Home']);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  if (!windowState) return null;

  const finderData: Record<string, FinderItem[]> = {
    Home: [
      { id: 'resume', name: 'Resume.pdf', type: 'file', fileType: 'pdf', size: '245 KB', modified: '2024-02-15' },
      { id: 'projects', name: 'Projects', type: 'folder' },
      { id: 'certificates', name: 'Certificates', type: 'folder' },
      { id: 'contact', name: 'Contact.txt', type: 'file', fileType: 'text', size: '1 KB', modified: '2024-02-20' },
    ],
    Projects: [
      { id: 'shop-hub', name: 'Shop Hub', type: 'folder' },
      { id: 'liftiq', name: 'LiftIQ', type: 'folder' },
      { id: 'ai-ecommerce', name: 'AI E-Commerce', type: 'folder' },
      { id: 'portfolio-os', name: 'Portfolio OS', type: 'folder' },
    ],
    Certificates: [
      { id: 'cs50', name: 'CS50 Certificate.pdf', type: 'file', fileType: 'pdf', size: '1.2 MB', modified: '2023-06-15' },
      { id: 'deeplearning', name: 'DeepLearning.AI.pdf', type: 'file', fileType: 'pdf', size: '980 KB', modified: '2023-08-20' },
      { id: 'google', name: 'Google Data Analytics.pdf', type: 'file', fileType: 'pdf', size: '1.1 MB', modified: '2023-09-10' },
      { id: 'meta', name: 'Meta Front-End.pdf', type: 'file', fileType: 'pdf', size: '890 KB', modified: '2023-10-05' },
    ],
  };

  const currentFolder = currentPath[currentPath.length - 1];
  const items = finderData[currentFolder] || [];

  const handleNavigate = (item: FinderItem) => {
    if (item.type === 'folder') {
      setCurrentPath(prev => [...prev, item.name]);
      setSelectedItem(null);
    } else {
      setSelectedItem(item.id);
    }
  };

  const handleBack = () => {
    if (currentPath.length > 1) {
      setCurrentPath(prev => prev.slice(0, -1));
      setSelectedItem(null);
    }
  };

  const handleHome = () => {
    setCurrentPath(['Home']);
    setSelectedItem(null);
  };

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
    a.download = 'Amimul_Ahsan_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getFileIcon = (fileType?: string) => {
    switch (fileType) {
      case 'pdf':
        return <DocumentIcon className="w-12 h-12 text-red-500" />;
      case 'code':
        return <CodeBracketIcon className="w-12 h-12 text-blue-500" />;
      default:
        return <DocumentIcon className="w-12 h-12 text-gray-500" />;
    }
  };

  return (
    <Window
      window={windowState}
      title="Finder"
      icon={FolderIcon}
      onClose={() => closeWindow(windowState.id)}
      onMinimize={() => minimizeWindow(windowState.id)}
      onMaximize={() => maximizeWindow(windowState.id)}
      minWidth={600}
      minHeight={450}
    >
      <div className="h-full flex flex-col bg-white dark:bg-gray-900">
        {/* Toolbar */}
        <div className="flex items-center gap-2 p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <button
            onClick={handleBack}
            disabled={currentPath.length <= 1}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleHome}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <FolderIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>

          {/* Path Bar */}
          <div className="flex-1 flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
            {currentPath.map((folder, index) => (
              <React.Fragment key={folder}>
                {index > 0 && <span className="text-gray-400">/</span>}
                <span className={index === currentPath.length - 1 ? 'font-medium text-gray-900 dark:text-white' : ''}>
                  {folder}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Sidebar and Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <div className="w-48 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-3 space-y-1">
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
              Favorites
            </div>
            <button
              onClick={handleHome}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                currentPath[0] === 'Home'
                  ? 'bg-macos-blue/20 text-macos-blue'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <FolderIcon className="w-4 h-4" />
              Home
            </button>
            <button
              onClick={() => setCurrentPath(['Home', 'Projects'])}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                currentPath.includes('Projects')
                  ? 'bg-macos-blue/20 text-macos-blue'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <CodeBracketIcon className="w-4 h-4" />
              Projects
            </button>
            <button
              onClick={() => setCurrentPath(['Home', 'Certificates'])}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                currentPath.includes('Certificates')
                  ? 'bg-macos-blue/20 text-macos-blue'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <DocumentIcon className="w-4 h-4" />
              Certificates
            </button>

            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mt-4 mb-2">
              iCloud
            </div>
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              {personalInfo.email}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4 overflow-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <FolderIcon className="w-16 h-16 mb-4 opacity-50" />
                <p>This folder is empty</p>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-4">
                {items.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleNavigate(item)}
                    onDoubleClick={() => handleNavigate(item)}
                    className={`flex flex-col items-center p-4 rounded-xl transition-colors ${
                      selectedItem === item.id
                        ? 'bg-macos-blue/20 ring-2 ring-macos-blue'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {item.type === 'folder' ? (
                      <FolderIcon className="w-12 h-12 text-macos-blue" />
                    ) : (
                      getFileIcon(item.fileType)
                    )}
                    <span className="mt-2 text-sm text-center text-gray-700 dark:text-gray-300 line-clamp-2">
                      {item.name}
                    </span>
                    {item.size && (
                      <span className="text-xs text-gray-500 mt-1">{item.size}</span>
                    )}

                    {/* Download button for resume */}
                    {item.name === 'Resume.pdf' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadResume();
                        }}
                        className="mt-2 p-1.5 bg-macos-blue text-white rounded-full hover:bg-blue-600 transition-colors"
                      >
                        <ArrowDownTrayIcon className="w-4 h-4" />
                      </button>
                    )}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Status Bar */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 flex justify-between">
              <span>{items.length} items</span>
              <span>{personalInfo.location}</span>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
};

export default FinderApp;
