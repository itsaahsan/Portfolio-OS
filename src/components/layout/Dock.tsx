import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useWindows } from '../../context/WindowContext';
import type { AppConfig } from '../../types';

interface DockIconProps {
  app: AppConfig;
  isOpen: boolean;
  isRunning: boolean;
  onClick: () => void;
}

const DockIcon: React.FC<DockIconProps> = ({ app, isOpen, isRunning, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={iconRef}
      className="relative flex flex-col items-center gap-2 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip with enhanced styling */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? -12 : 10, scale: isHovered ? 1 : 0.9 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="absolute -top-14 px-4 py-2 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-100 dark:to-gray-200 text-white dark:text-gray-900 text-sm font-medium rounded-xl whitespace-nowrap pointer-events-none z-50 shadow-2xl border border-white/10"
      >
        {app.name}
        {isOpen && (
          <span className="ml-2 w-2 h-2 bg-green-400 rounded-full inline-block animate-pulse" />
        )}
        {/* Arrow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900 dark:bg-gray-100" />
      </motion.div>

      {/* Icon with enhanced gradient and shadow */}
      <motion.button
        onClick={onClick}
        className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300 overflow-hidden"
        style={{
          background: app.id === 'terminal' 
            ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
            : app.id === 'about'
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
            : app.id === 'projects'
            ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #ff6b6b 100%)'
            : app.id === 'certificates'
            ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #43e97b 100%)'
            : app.id === 'contact'
            ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 50%, #5ee7df 100%)'
            : app.id === 'music'
            ? 'linear-gradient(135deg, #fa709a 0%, #fee140 50%, #f6d365 100%)'
            : app.id === 'safari'
            ? 'linear-gradient(135deg, #30cfd0 0%, #330867 50%, #667eea 100%)'
            : app.id === 'finder'
            ? 'linear-gradient(135deg, #a8edea 0%, #fed6e3 50%, #fbc2eb 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
        whileHover={{ scale: 1.25, y: -16 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      >
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/20 pointer-events-none" />
        
        {/* Icon */}
        <app.icon className="relative w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-lg" />
        
        {/* Hover glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-white/20 blur-xl" />
        </div>
      </motion.button>

      {/* Running indicator with enhanced styling */}
      {isRunning && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg shadow-green-500/50"
        />
      )}
    </div>
  );
};

interface DockProps {
  apps: AppConfig[];
}

export const Dock: React.FC<DockProps> = ({ apps }) => {
  const { openWindow, getWindowByAppId } = useWindows();
  const dockRef = useRef<HTMLDivElement>(null);

  const handleAppClick = useCallback(
    (appId: string) => {
      openWindow(appId);
    },
    [openWindow]
  );

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50">
      {/* Dock glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-500/30 to-transparent blur-2xl -translate-y-4" />
      
      <div
        ref={dockRef}
        className="relative dock-glass rounded-3xl px-4 py-3 flex items-end gap-2 sm:gap-3 shadow-2xl border border-white/20"
      >
        {/* Inner shine */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent rounded-3xl pointer-events-none" />
        
        {apps.map((app) => {
          const windowState = getWindowByAppId(app.id);
          const isOpen = windowState?.isOpen && !windowState.isMinimized;
          const isRunning = windowState?.isOpen;

          return (
            <DockIcon
              key={app.id}
              app={app}
              isOpen={!!isOpen}
              isRunning={!!isRunning}
              onClick={() => handleAppClick(app.id)}
            />
          );
        })}

        {/* Separator */}
        <div className="relative w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent mx-1 self-center" />

        {/* Minimized windows area placeholder */}
        <div className="flex items-end gap-2 sm:gap-3">
          {/* Could add minimized windows here */}
        </div>
      </div>
    </div>
  );
};

export default Dock;
