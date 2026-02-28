// Window Management Types
export interface WindowState {
  id: string;
  appId: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export interface AppConfig {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  component: React.ComponentType;
  defaultSize: { width: number; height: number };
  defaultPosition?: { x: number; y: number };
  minSize?: { width: number; height: number };
  resizable?: boolean;
}

// Window Actions
export type WindowAction =
  | { type: 'OPEN_WINDOW'; payload: { appId: string; position?: { x: number; y: number } } }
  | { type: 'CLOSE_WINDOW'; payload: { windowId: string } }
  | { type: 'MINIMIZE_WINDOW'; payload: { windowId: string } }
  | { type: 'MAXIMIZE_WINDOW'; payload: { windowId: string } }
  | { type: 'RESTORE_WINDOW'; payload: { windowId: string } }
  | { type: 'FOCUS_WINDOW'; payload: { windowId: string } }
  | { type: 'UPDATE_POSITION'; payload: { windowId: string; position: { x: number; y: number } } }
  | { type: 'UPDATE_SIZE'; payload: { windowId: string; size: { width: number; height: number } } }
  | { type: 'BRING_TO_FRONT'; payload: { windowId: string } };

// Window Context State
export interface WindowContextState {
  windows: WindowState[];
  focusedWindowId: string | null;
  zIndexCounter: number;
  dispatch: React.Dispatch<WindowAction>;
  openWindow: (appId: string, position?: { x: number; y: number }) => void;
  closeWindow: (windowId: string) => void;
  minimizeWindow: (windowId: string) => void;
  maximizeWindow: (windowId: string) => void;
  restoreWindow: (windowId: string) => void;
  focusWindow: (windowId: string) => void;
  updatePosition: (windowId: string, position: { x: number; y: number }) => void;
  updateSize: (windowId: string, size: { width: number; height: number }) => void;
  isWindowOpen: (appId: string) => boolean;
  getWindowByAppId: (appId: string) => WindowState | undefined;
}

// Terminal Types
export interface TerminalCommand {
  command: string;
  output: React.ReactNode;
  timestamp: Date;
}

export interface TerminalHistory {
  entries: string[];
  currentIndex: number;
}

// Project Types
export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

// Certificate Types
export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  imageUrl: string;
  credentialUrl?: string;
  credentialId?: string;
}

// Skill Types
export interface Skill {
  name: string;
  level: number; // 0-100
  category: string;
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Music Player Types
export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  albumArt: string;
}

// Wallpaper Types
export type WallpaperType = 'dark' | 'light' | 'sunset' | 'ocean' | 'mountain' | 'aurora';

// Context Menu Types
export interface ContextMenuItem {
  label: string;
  action: () => void;
  icon?: React.ComponentType<{ className?: string }>;
  divider?: boolean;
}

export interface ContextMenuState {
  visible: boolean;
  x: number;
  y: number;
  items: ContextMenuItem[];
}

// Boot State Types
export interface BootState {
  isBooting: boolean;
  progress: number;
  showApple: boolean;
}

// Theme Types
export type ThemeMode = 'dark' | 'light';

export interface ThemeContextState {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

// Desktop Icon Types
export interface DesktopIcon {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
}

// Browser History Types (for Safari)
export interface BrowserHistoryEntry {
  url: string;
  title: string;
}
