import { useState, useCallback, useEffect } from 'react';

type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

interface ResizeState {
  isResizing: boolean;
  direction: ResizeDirection | null;
  startX: number;
  startY: number;
  initialWidth: number;
  initialHeight: number;
  initialX: number;
  initialY: number;
}

interface UseResizableOptions {
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  onResize?: (size: { width: number; height: number }) => void;
  disabled?: boolean;
}

export const useResizable = ({
  minWidth = 400,
  minHeight = 300,
  maxWidth = window.innerWidth - 100,
  maxHeight = window.innerHeight - 100,
  onResize,
  disabled = false,
}: UseResizableOptions = {}) => {
  const [size, setSize] = useState({ width: 800, height: 600 });
  const [resizeState, setResizeState] = useState<ResizeState>({
    isResizing: false,
    direction: null,
    startX: 0,
    startY: 0,
    initialWidth: 0,
    initialHeight: 0,
    initialX: 0,
    initialY: 0,
  });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, direction: ResizeDirection) => {
      if (disabled || e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation();

      setResizeState({
        isResizing: true,
        direction,
        startX: e.clientX,
        startY: e.clientY,
        initialWidth: size.width,
        initialHeight: size.height,
        initialX: 0,
        initialY: 0,
      });
    },
    [disabled, size.width, size.height]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!resizeState.isResizing || !resizeState.direction) return;

      const deltaX = e.clientX - resizeState.startX;
      const deltaY = e.clientY - resizeState.startY;
      const direction = resizeState.direction;

      let newWidth = resizeState.initialWidth;
      let newHeight = resizeState.initialHeight;

      // Calculate new dimensions based on resize direction
      if (direction.includes('e')) {
        newWidth = Math.max(minWidth, Math.min(resizeState.initialWidth + deltaX, maxWidth));
      }
      if (direction.includes('w')) {
        newWidth = Math.max(minWidth, Math.min(resizeState.initialWidth - deltaX, maxWidth));
      }
      if (direction.includes('s')) {
        newHeight = Math.max(minHeight, Math.min(resizeState.initialHeight + deltaY, maxHeight));
      }
      if (direction.includes('n')) {
        newHeight = Math.max(minHeight, Math.min(resizeState.initialHeight - deltaY, maxHeight));
      }

      setSize({ width: newWidth, height: newHeight });
      onResize?.({ width: newWidth, height: newHeight });
    },
    [resizeState, minWidth, minHeight, maxWidth, maxHeight, onResize]
  );

  const handleMouseUp = useCallback(() => {
    setResizeState(prev => ({ ...prev, isResizing: false, direction: null }));
  }, []);

  useEffect(() => {
    if (resizeState.isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = `${resizeState.direction}-resize`;

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
      };
    }
  }, [resizeState.isResizing, resizeState.direction, handleMouseMove, handleMouseUp]);

  return {
    size,
    isResizing: resizeState.isResizing,
    handleMouseDown,
    setSize,
  };
};

export default useResizable;
