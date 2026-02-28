import { createContext, useContext, useReducer, useCallback, type ReactNode } from 'react';
import type { WindowState, WindowAction, WindowContextState } from '../types';

const WindowContext = createContext<WindowContextState | undefined>(undefined);

const generateWindowId = (): string => {
  return `window-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const windowReducer = (state: WindowContextState, action: WindowAction): WindowContextState => {
  switch (action.type) {
    case 'OPEN_WINDOW': {
      const existingWindow = state.windows.find(w => w.appId === action.payload.appId);
      if (existingWindow && !existingWindow.isMinimized) {
        // If window is already open, just focus it
        return {
          ...state,
          windows: state.windows.map(w =>
            w.id === existingWindow.id ? { ...w, isOpen: true, zIndex: state.zIndexCounter + 1 } : w
          ),
          focusedWindowId: existingWindow.id,
          zIndexCounter: state.zIndexCounter + 1,
        };
      }

      if (existingWindow && existingWindow.isMinimized) {
        // Restore minimized window
        return {
          ...state,
          windows: state.windows.map(w =>
            w.id === existingWindow.id
              ? { ...w, isOpen: true, isMinimized: false, zIndex: state.zIndexCounter + 1 }
              : w
          ),
          focusedWindowId: existingWindow.id,
          zIndexCounter: state.zIndexCounter + 1,
        };
      }

      // Create new window
      const newWindow: WindowState = {
        id: generateWindowId(),
        appId: action.payload.appId,
        title: action.payload.appId,
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        position: action.payload.position || {
          x: 100 + state.windows.length * 30,
          y: 100 + state.windows.length * 30,
        },
        size: { width: 800, height: 600 },
        zIndex: state.zIndexCounter + 1,
      };

      return {
        ...state,
        windows: [...state.windows, newWindow],
        focusedWindowId: newWindow.id,
        zIndexCounter: state.zIndexCounter + 1,
      };
    }

    case 'CLOSE_WINDOW': {
      return {
        ...state,
        windows: state.windows.filter(w => w.id !== action.payload.windowId),
        focusedWindowId:
          state.focusedWindowId === action.payload.windowId ? null : state.focusedWindowId,
      };
    }

    case 'MINIMIZE_WINDOW': {
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.payload.windowId ? { ...w, isMinimized: true } : w
        ),
        focusedWindowId:
          state.focusedWindowId === action.payload.windowId ? null : state.focusedWindowId,
      };
    }

    case 'MAXIMIZE_WINDOW': {
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.payload.windowId ? { ...w, isMaximized: !w.isMaximized } : w
        ),
      };
    }

    case 'RESTORE_WINDOW': {
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.payload.windowId ? { ...w, isMinimized: false, zIndex: state.zIndexCounter + 1 } : w
        ),
        focusedWindowId: action.payload.windowId,
        zIndexCounter: state.zIndexCounter + 1,
      };
    }

    case 'FOCUS_WINDOW': {
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.payload.windowId ? { ...w, zIndex: state.zIndexCounter + 1 } : w
        ),
        focusedWindowId: action.payload.windowId,
        zIndexCounter: state.zIndexCounter + 1,
      };
    }

    case 'UPDATE_POSITION': {
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.payload.windowId ? { ...w, position: action.payload.position } : w
        ),
      };
    }

    case 'UPDATE_SIZE': {
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.payload.windowId ? { ...w, size: action.payload.size } : w
        ),
      };
    }

    case 'BRING_TO_FRONT': {
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.payload.windowId ? { ...w, zIndex: state.zIndexCounter + 1 } : w
        ),
        zIndexCounter: state.zIndexCounter + 1,
      };
    }

    default:
      return state;
  }
};

interface WindowProviderProps {
  children: ReactNode;
}

export const WindowProvider: React.FC<WindowProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(windowReducer, {
    windows: [],
    focusedWindowId: null,
    zIndexCounter: 100,
    dispatch: () => {}, // Placeholder, will be set below
    openWindow: () => {},
    closeWindow: () => {},
    minimizeWindow: () => {},
    maximizeWindow: () => {},
    restoreWindow: () => {},
    focusWindow: () => {},
    updatePosition: () => {},
    updateSize: () => {},
    isWindowOpen: () => false,
    getWindowByAppId: () => undefined,
  });

  // Update dispatch reference in state
  const contextValue: WindowContextState = {
    ...state,
    dispatch,
    openWindow: useCallback((appId: string, position?: { x: number; y: number }) => {
      dispatch({ type: 'OPEN_WINDOW', payload: { appId, position } });
    }, []),
    closeWindow: useCallback((windowId: string) => {
      dispatch({ type: 'CLOSE_WINDOW', payload: { windowId } });
    }, []),
    minimizeWindow: useCallback((windowId: string) => {
      dispatch({ type: 'MINIMIZE_WINDOW', payload: { windowId } });
    }, []),
    maximizeWindow: useCallback((windowId: string) => {
      dispatch({ type: 'MAXIMIZE_WINDOW', payload: { windowId } });
    }, []),
    restoreWindow: useCallback((windowId: string) => {
      dispatch({ type: 'RESTORE_WINDOW', payload: { windowId } });
    }, []),
    focusWindow: useCallback((windowId: string) => {
      dispatch({ type: 'FOCUS_WINDOW', payload: { windowId } });
    }, []),
    updatePosition: useCallback((windowId: string, position: { x: number; y: number }) => {
      dispatch({ type: 'UPDATE_POSITION', payload: { windowId, position } });
    }, []),
    updateSize: useCallback((windowId: string, size: { width: number; height: number }) => {
      dispatch({ type: 'UPDATE_SIZE', payload: { windowId, size } });
    }, []),
    isWindowOpen: useCallback(
      (appId: string) => {
        return state.windows.some(w => w.appId === appId && w.isOpen && !w.isMinimized);
      },
      [state.windows]
    ),
    getWindowByAppId: useCallback(
      (appId: string) => {
        return state.windows.find(w => w.appId === appId);
      },
      [state.windows]
    ),
  };

  return (
    <WindowContext.Provider value={contextValue}>{children}</WindowContext.Provider>
  );
};

export const useWindows = (): WindowContextState => {
  const context = useContext(WindowContext);
  if (context === undefined) {
    throw new Error('useWindows must be used within a WindowProvider');
  }
  return context;
};

export default WindowContext;
