import React, { useRef, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindows } from '../../context/WindowContext';
import { useDraggable } from '../../hooks/useDraggable';
import { useResizable } from '../../hooks/useResizable';
import { WindowState } from '../../types';

interface WindowProps {
  window: WindowState;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  minWidth?: number;
  minHeight?: number;
  resizable?: boolean;
}

export const Window: React.FC<WindowProps> = ({
  window: windowState,
  title,
  icon: Icon,
  children,
  onClose,
  onMinimize,
  onMaximize,
  minWidth = 400,
  minHeight = 300,
  resizable = true,
}) => {
  const { focusWindow, updatePosition, updateSize } = useWindows();
  const windowRef = useRef<HTMLDivElement>(null);

  const {
    position,
    isDragging,
    handleMouseDown: handleDragStart,
    setPosition,
  } = useDraggable({
    initialPosition: windowState.position,
    onPositionChange: (pos: { x: number; y: number }) => updatePosition(windowState.id, pos),
    disabled: windowState.isMaximized,
  });

  const { size, handleMouseDown: handleResizeStart, setSize } = useResizable({
    minWidth,
    minHeight,
    onResize: (s: { width: number; height: number }) => updateSize(windowState.id, s),
    disabled: windowState.isMaximized || !resizable,
  });

  useEffect(() => {
    setPosition(windowState.position);
  }, [windowState.position, setPosition]);

  useEffect(() => {
    setSize(windowState.size);
  }, [windowState.size, setSize]);

  const handleFocus = () => {
    focusWindow(windowState.id);
  };

  const handleDoubleClick = () => {
    onMaximize();
  };

  if (windowState.isMinimized) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        ref={windowRef}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{
          opacity: 1,
          scale: 1,
          x: windowState.isMaximized ? 0 : position.x,
          y: windowState.isMaximized ? 48 : position.y,
          width: windowState.isMaximized ? '100%' : size.width,
          height: windowState.isMaximized ? 'calc(100% - 88px)' : size.height,
        }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 350,
          mass: 0.8,
        }}
        className={`absolute window-glass rounded-xl shadow-window overflow-hidden ${
          windowState.isMaximized ? 'inset-0 m-2 rounded-2xl' : ''
        }`}
        style={{
          left: windowState.isMaximized ? 8 : undefined,
          top: windowState.isMaximized ? 48 : undefined,
          right: windowState.isMaximized ? 8 : undefined,
          bottom: windowState.isMaximized ? 88 : undefined,
          zIndex: windowState.zIndex,
        }}
        onMouseDown={handleFocus}
        onDoubleClick={handleDoubleClick}
      >
        {/* Resize Handles */}
        {resizable && !windowState.isMaximized && (
          <>
            <div className="resize-handle-n" onMouseDown={(e) => handleResizeStart(e, 'n')} />
            <div className="resize-handle-s" onMouseDown={(e) => handleResizeStart(e, 's')} />
            <div className="resize-handle-e" onMouseDown={(e) => handleResizeStart(e, 'e')} />
            <div className="resize-handle-w" onMouseDown={(e) => handleResizeStart(e, 'w')} />
            <div className="resize-handle-ne" onMouseDown={(e) => handleResizeStart(e, 'ne')} />
            <div className="resize-handle-nw" onMouseDown={(e) => handleResizeStart(e, 'nw')} />
            <div className="resize-handle-se" onMouseDown={(e) => handleResizeStart(e, 'se')} />
            <div className="resize-handle-sw" onMouseDown={(e) => handleResizeStart(e, 'sw')} />
          </>
        )}

        {/* Title Bar */}
        <div
          className={`h-10 flex items-center justify-between px-4 border-b ${
            'border-gray-200 dark:border-gray-700'
          } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onMouseDown={handleDragStart}
        >
          {/* Window Controls */}
          <div className="flex items-center gap-2 no-drag">
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-macos-red hover:bg-red-700 flex items-center justify-center group transition-colors"
              aria-label="Close"
            >
              <svg
                className="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <button
              onClick={onMinimize}
              className="w-3 h-3 rounded-full bg-macos-yellow hover:bg-yellow-600 flex items-center justify-center group transition-colors"
              aria-label="Minimize"
            >
              <svg
                className="w-2 h-2 text-yellow-900 opacity-0 group-hover:opacity-100"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
              </svg>
            </button>
            <button
              onClick={onMaximize}
              className="w-3 h-3 rounded-full bg-macos-green hover:bg-green-600 flex items-center justify-center group transition-colors"
              aria-label="Maximize"
            >
              <svg
                className="w-2 h-2 text-green-900 opacity-0 group-hover:opacity-100"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4m0 0h4M4 4l10 10m-4 4h4m4-4V4"
                />
              </svg>
            </button>
          </div>

          {/* Title */}
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {Icon && <Icon className="w-4 h-4" />}
            <span>{title}</span>
          </div>

          {/* Spacer for balance */}
          <div className="w-16" />
        </div>

        {/* Content */}
        <div className="h-[calc(100%-2.5rem)] overflow-auto">{children}</div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Window;
