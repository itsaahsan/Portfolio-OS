import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ContextMenuState } from '../../types';

interface ContextMenuProps {
  menu: ContextMenuState;
  onClose: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ menu, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (menu.visible) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [menu.visible, onClose]);

  useEffect(() => {
    if (menu.visible && menuRef.current) {
      // Position adjustment logic could be added here if needed
    }
  }, [menu.visible, menu.x, menu.y]);

  if (!menu.visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={menuRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.1 }}
        className="fixed context-menu rounded-lg shadow-macos py-1 min-w-[200px] z-[1000]"
        style={{ left: menu.x, top: menu.y }}
      >
        {menu.items.map((item, index) =>
          item.divider ? (
            <div key={`divider-${index}`} className="my-1 border-t border-gray-200 dark:border-gray-700" />
          ) : (
            <button
              key={index}
              onClick={() => {
                item.action();
                onClose();
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-macos-blue hover:text-white flex items-center gap-3 transition-colors"
            >
              {item.icon && <item.icon className="w-4 h-4" />}
              <span>{item.label}</span>
            </button>
          )
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ContextMenu;
