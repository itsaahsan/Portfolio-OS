import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  UserCircleIcon,
  FolderIcon,
  CommandLineIcon,
  DocumentIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import type { WallpaperType, ContextMenuState, ContextMenuItem } from '../../types';
import { useWindows } from '../../context/WindowContext';

interface DesktopProps {
  children: React.ReactNode;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export const Desktop: React.FC<DesktopProps> = ({ children }) => {
  const { openWindow } = useWindows();
  const [wallpaper, setWallpaper] = useState<WallpaperType>('aurora');
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    visible: false,
    x: 0,
    y: 0,
    items: [],
  });
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  const wallpapers: Record<WallpaperType, string> = {
    dark: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900',
    light: 'bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100',
    sunset: 'bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600',
    ocean: 'bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700',
    mountain: 'bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-600',
    aurora: 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500',
  };

  const desktopIcons = [
    {
      id: 'about',
      name: 'About Me',
      icon: UserCircleIcon,
      action: () => openWindow('about'),
    },
    {
      id: 'projects',
      name: 'Projects',
      icon: FolderIcon,
      action: () => openWindow('projects'),
    },
    {
      id: 'terminal',
      name: 'Terminal',
      icon: CommandLineIcon,
      action: () => openWindow('terminal'),
    },
    {
      id: 'resume',
      name: 'Resume',
      icon: DocumentIcon,
      action: () => openWindow('finder'),
    },
  ];

  const handleRightClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    
    const items: ContextMenuItem[] = [
      {
        label: 'Change Wallpaper',
        action: () => {},
        icon: Cog6ToothIcon,
        divider: false,
      },
      {
        label: 'Dark Gradient',
        action: () => setWallpaper('dark'),
      },
      {
        label: 'Sunset',
        action: () => setWallpaper('sunset'),
      },
      {
        label: 'Ocean',
        action: () => setWallpaper('ocean'),
      },
      {
        label: 'Mountain',
        action: () => setWallpaper('mountain'),
      },
      {
        label: 'Aurora',
        action: () => setWallpaper('aurora'),
      },
      {
        label: 'Refresh Desktop',
        action: () => {},
        divider: true,
      },
    ];

    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      items,
    });
  }, []);

  const closeContextMenu = useCallback(() => {
    setContextMenu(prev => ({ ...prev, visible: false }));
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full ${wallpapers[wallpaper]} transition-colors duration-700 overflow-hidden`}
      onContextMenu={handleRightClick}
      onClick={closeContextMenu}
    >
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/30 pointer-events-none" />
      
      {/* Mesh Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Particle Effects */}
      <div className="particles">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Desktop Icons */}
      <div className="absolute top-14 left-4 flex flex-col gap-4 z-10">
        {desktopIcons.map((icon, index) => (
          <motion.button
            key={icon.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
            onClick={icon.action}
            onDoubleClick={icon.action}
            className="group flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-white/15 transition-all duration-300 w-26 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border border-white/20">
              <icon.icon className="w-9 h-9 text-white drop-shadow-lg" />
            </div>
            <span className="text-xs text-white text-center drop-shadow-lg font-medium px-2 py-1 rounded-lg bg-black/20 backdrop-blur-sm">
              {icon.name}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Window Container */}
      <div className="absolute inset-0 pt-10 pb-24">
        {children}
      </div>

      {/* Context Menu */}
      {contextMenu.visible && (
        <div
          className="fixed context-menu rounded-xl shadow-2xl py-1 min-w-[220px] z-[1000] animate-window-open border border-white/20"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-3 py-2 border-b border-gray-200/20 dark:border-gray-700/50">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Desktop Options
            </p>
          </div>
          {contextMenu.items.map((item, index) =>
            item.divider ? (
              <div key={`divider-${index}`} className="my-1.5 border-t border-gray-200/20 dark:border-gray-700/50" />
            ) : (
              <button
                key={index}
                onClick={() => {
                  item.action();
                  closeContextMenu();
                }}
                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-macos-blue hover:to-purple-600 hover:text-white flex items-center gap-3 transition-all duration-200 rounded-lg mx-1"
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                <span className="font-medium">{item.label}</span>
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Desktop;
