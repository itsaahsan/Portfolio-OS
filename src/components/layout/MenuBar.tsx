import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
  WifiIcon,
  MoonIcon,
  SpeakerWaveIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

export const MenuBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showControlCenter, setShowControlCenter] = useState(false);
  const [showAppleMenu, setShowAppleMenu] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = format(currentTime, 'h:mm a');
  const formattedDate = format(currentTime, 'EEE MMM d');

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-10 menubar-glass z-50 flex items-center justify-between px-4 backdrop-blur-xl">
        {/* Left Side - Apple Menu */}
        <div className="flex items-center gap-1">
          {/* Apple Logo */}
          <div className="relative">
            <button
              onClick={() => setShowAppleMenu(!showAppleMenu)}
              className="p-2 hover:bg-white/20 dark:hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              <svg
                className="w-5 h-5 text-gray-900 dark:text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-.8 1.94-.8s.16 1.09-.69 2.01c-.78.86-1.91.85-1.91.85s-.17-1.16.66-2.06z" />
              </svg>
            </button>

            {/* Apple Menu Dropdown */}
            {showAppleMenu && (
              <div className="absolute left-0 top-10 w-64 context-menu rounded-xl shadow-2xl p-2 z-50 animate-window-open">
                <div className="px-3 py-3 border-b border-gray-200/20 dark:border-gray-700/50">
                  <p className="text-lg font-bold text-gray-900 dark:text-white">Portfolio OS</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Version 1.0.0</p>
                </div>
                <button className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-macos-blue hover:to-purple-600 hover:text-white rounded-lg transition-all">
                  About Portfolio OS
                </button>
                <div className="my-1 border-t border-gray-200/20 dark:border-gray-700/50" />
                <button className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-macos-blue hover:to-purple-600 hover:text-white rounded-lg transition-all">
                  Preferences
                </button>
                <div className="my-1 border-t border-gray-200/20 dark:border-gray-700/50" />
                <button className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-macos-blue hover:to-purple-600 hover:text-white rounded-lg transition-all">
                  Restart
                </button>
                <button className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-macos-blue hover:to-purple-600 hover:text-white rounded-lg transition-all">
                  Shut Down
                </button>
              </div>
            )}
          </div>

          {/* App Name */}
          <span className="font-semibold text-sm text-gray-900 dark:text-white px-3 hidden sm:block">
            Portfolio OS
          </span>

          {/* File Menu (decorative) */}
          <div className="hidden md:flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
            {['File', 'Edit', 'View', 'Go', 'Window', 'Help'].map(item => (
              <button
                key={item}
                className="px-3 py-1.5 hover:bg-white/20 dark:hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side - Status Icons */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <button className="p-2 hover:bg-white/20 dark:hover:bg-white/10 rounded-lg transition-all duration-200 hidden sm:block">
            <MagnifyingGlassIcon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          </button>

          {/* Control Center */}
          <div className="relative">
            <button
              onClick={() => setShowControlCenter(!showControlCenter)}
              className="p-2 hover:bg-white/20 dark:hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              <svg
                className="w-5 h-5 text-gray-700 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </button>

            {/* Control Center Dropdown - Enhanced */}
            {showControlCenter && (
              <div className="absolute right-0 top-10 w-72 context-menu rounded-2xl shadow-2xl p-4 z-50 animate-window-open border border-white/20">
                <div className="grid grid-cols-2 gap-3">
                  {/* WiFi Toggle */}
                  <button className="flex flex-col items-center gap-2 p-3 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl hover:scale-105 transition-all duration-200 shadow-lg">
                    <div className="p-2 bg-macos-blue rounded-full">
                      <WifiIcon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs font-medium">Wi-Fi</span>
                  </button>

                  {/* Bluetooth Toggle */}
                  <button className="flex flex-col items-center gap-2 p-3 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl hover:scale-105 transition-all duration-200 shadow-lg">
                    <div className="p-2 bg-macos-blue rounded-full">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.71 7.71L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium">Bluetooth</span>
                  </button>

                  {/* Dark Mode Toggle - Info Only */}
                  <div className="flex flex-col items-center gap-2 p-3 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg opacity-70">
                    <div className="p-2 bg-indigo-600 rounded-full">
                      <MoonIcon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs font-medium">Dark Mode</span>
                  </div>

                  {/* Volume Toggle */}
                  <button className="flex flex-col items-center gap-2 p-3 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl hover:scale-105 transition-all duration-200 shadow-lg">
                    <div className="p-2 bg-gray-500 rounded-full">
                      <SpeakerWaveIcon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs font-medium">Sound</span>
                  </button>
                </div>

                {/* Quick Settings */}
                <div className="mt-4 pt-4 border-t border-gray-200/20 dark:border-gray-700/50">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                    Quick Settings
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <span className="text-sm font-medium">AirDrop</span>
                      <div className="w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full relative">
                        <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <span className="text-sm font-medium">Night Shift</span>
                      <div className="w-10 h-5 bg-macos-blue rounded-full relative">
                        <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-lg" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Battery */}
          <div className="flex items-center gap-1.5 px-2 py-1.5 hover:bg-white/20 dark:hover:bg-white/10 rounded-lg transition-all duration-200">
            <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h14v4H3v-4zm14-3H3a1 1 0 00-1 1v6a1 1 0 001 1h14a1 1 0 001-1V8a1 1 0 00-1-1zm4 3h1a1 1 0 011 1v2a1 1 0 01-1 1h-1v-4z" />
            </svg>
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 hidden sm:block">100%</span>
          </div>

          {/* WiFi */}
          <button className="p-2 hover:bg-white/20 dark:hover:bg-white/10 rounded-lg transition-all duration-200 hidden sm:block">
            <WifiIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>

          {/* Date & Time */}
          <div className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/20 dark:hover:bg-white/10 rounded-lg transition-all duration-200">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden md:inline">
              {formattedDate}
            </span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              {formattedTime}
            </span>
          </div>
        </div>
      </header>

      {/* Click outside to close menus */}
      {(showControlCenter || showAppleMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowControlCenter(false);
            setShowAppleMenu(false);
          }}
        />
      )}
    </>
  );
};

export default MenuBar;
