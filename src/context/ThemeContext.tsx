import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { ThemeMode, ThemeContextState } from '../types';

const ThemeContext = createContext<ThemeContextState | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Always start with dark theme
  const [theme, setThemeState] = useState<ThemeMode>('dark');

  useEffect(() => {
    // Always apply dark theme
    document.documentElement.classList.add('dark');
    localStorage.setItem('portfolio-theme', 'dark');
  }, []);

  const toggleTheme = () => {
    // Keep dark theme only - no toggle
    setThemeState('dark');
    document.documentElement.classList.add('dark');
    localStorage.setItem('portfolio-theme', 'dark');
  };

  const setTheme = (newTheme: ThemeMode) => {
    // Force dark theme
    setThemeState('dark');
    document.documentElement.classList.add('dark');
    localStorage.setItem('portfolio-theme', 'dark');
  };

  const value: ThemeContextState = {
    theme: 'dark',
    toggleTheme,
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextState => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
