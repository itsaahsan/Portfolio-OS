import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowPathIcon,
  StarIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';
import { Window } from '../common/Window';
import { useWindows } from '../../context/WindowContext';
import { projects } from '../../data/projects';

export const SafariApp: React.FC = () => {
  const { closeWindow, minimizeWindow, maximizeWindow, getWindowByAppId } = useWindows();
  const windowState = getWindowByAppId('safari');
  const [currentUrl, setCurrentUrl] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  if (!windowState) return null;

  const projectUrls = projects
    .filter(p => p.liveUrl)
    .map(p => ({ name: p.name, url: p.liveUrl! }));

  const handleNavigate = (url: string) => {
    if (!url) return;
    
    setIsLoading(true);
    setHistory(prev => [...prev.slice(0, historyIndex + 1), url]);
    setHistoryIndex(prev => prev + 1);
    setCurrentUrl(url);
    setInputValue(url);

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const url = history[newIndex];
      setCurrentUrl(url);
      setInputValue(url);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      const url = history[newIndex];
      setCurrentUrl(url);
      setInputValue(url);
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      let url = inputValue;
      if (!url.startsWith('http')) {
        url = 'https://' + url;
      }
      handleNavigate(url);
    }
  };

  return (
    <Window
      window={windowState}
      title="Safari"
      icon={ArrowPathIcon}
      onClose={() => closeWindow(windowState.id)}
      onMinimize={() => minimizeWindow(windowState.id)}
      onMaximize={() => maximizeWindow(windowState.id)}
      minWidth={800}
      minHeight={600}
    >
      <div className="h-full flex flex-col bg-white dark:bg-gray-900">
        {/* Safari Toolbar */}
        <div className="flex items-center gap-2 p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          {/* Navigation Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleBack}
              disabled={historyIndex <= 0}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            <button
              onClick={handleForward}
              disabled={historyIndex >= history.length - 1}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowRightIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            <button
              onClick={handleRefresh}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <ArrowPathIcon className={`w-5 h-5 text-gray-700 dark:text-gray-300 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* URL Bar */}
          <div className="flex-1 flex items-center">
            <div className="flex-1 flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search or enter website name"
                className="flex-1 bg-transparent border-none outline-none text-sm text-gray-900 dark:text-white placeholder-gray-500"
              />
              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded">
                <StarIcon className="w-4 h-4 text-gray-400" />
              </button>
              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded">
                <ShareIcon className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto relative">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-900">
              <div className="text-center">
                <ArrowPathIcon className="w-12 h-12 text-macos-blue animate-spin mx-auto mb-4" />
                <p className="text-gray-500">Loading...</p>
              </div>
            </div>
          ) : currentUrl ? (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="max-w-md">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-macos-blue to-macos-purple flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Project Preview
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  You're viewing a preview of the project. In a real browser, this would show the live website.
                </p>
                <p className="text-sm text-gray-500 mb-6 break-all">
                  {currentUrl}
                </p>
                <a
                  href={currentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-macos-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Open in New Tab
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          ) : (
            /* Quick Links */
            <div className="p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Live Project Demos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projectUrls.map((project, index) => (
                  <motion.button
                    key={project.url}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleNavigate(project.url)}
                    className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-macos-blue to-macos-purple flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {project.name}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">{project.url}</p>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Empty State */}
              <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  💡 Click on any project above to preview it in this window, or enter a URL in the address bar.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Window>
  );
};

export default SafariApp;
