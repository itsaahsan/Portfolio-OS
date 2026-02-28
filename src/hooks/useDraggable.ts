import { useState, useCallback, useEffect, type RefObject } from 'react';

interface DragState {
  isDragging: boolean;
  startX: number;
  startY: number;
  initialX: number;
  initialY: number;
}

interface UseDraggableOptions {
  initialPosition?: { x: number; y: number };
  onPositionChange?: (position: { x: number; y: number }) => void;
  disabled?: boolean;
  boundaryRef?: RefObject<HTMLElement>;
}

export const useDraggable = ({
  initialPosition = { x: 100, y: 100 },
  onPositionChange,
  disabled = false,
  boundaryRef,
}: UseDraggableOptions = {}) => {
  const [position, setPosition] = useState(initialPosition);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
  });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (disabled || e.button !== 0) return;
      
      // Don't drag if clicking on buttons or interactive elements
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('.no-drag')
      ) {
        return;
      }

      e.preventDefault();
      setDragState({
        isDragging: true,
        startX: e.clientX,
        startY: e.clientY,
        initialX: position.x,
        initialY: position.y,
      });
    },
    [disabled, position.x, position.y]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragState.isDragging) return;

      const deltaX = e.clientX - dragState.startX;
      const deltaY = e.clientY - dragState.startY;
      let newX = dragState.initialX + deltaX;
      let newY = dragState.initialY + deltaY;

      // Boundary constraints
      if (boundaryRef?.current) {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        newX = Math.max(0, Math.min(newX, windowWidth - 200));
        newY = Math.max(0, Math.min(newY, windowHeight - 100));
      }

      setPosition({ x: newX, y: newY });
      onPositionChange?.({ x: newX, y: newY });
    },
    [dragState, boundaryRef, onPositionChange]
  );

  const handleMouseUp = useCallback(() => {
    setDragState(prev => ({ ...prev, isDragging: false }));
  }, []);

  useEffect(() => {
    if (dragState.isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [dragState.isDragging, handleMouseMove, handleMouseUp]);

  return {
    position,
    isDragging: dragState.isDragging,
    handleMouseDown,
    setPosition,
  };
};

export default useDraggable;
