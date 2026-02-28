import { useState, useEffect, useCallback } from 'react';
import { useWindows } from './context/WindowContext';
import { useTheme } from './context/ThemeContext';
import type { AppConfig } from './types';
import { MenuBar } from './components/layout/MenuBar';
import { Dock } from './components/layout/Dock';
import { Desktop } from './components/layout/Desktop';
import { BootScreen } from './components/common/BootScreen';
import { MobileFallback } from './components/layout/MobileFallback';

// App Components
import { AboutApp } from './components/apps/AboutApp';
import { ProjectsApp } from './components/apps/ProjectsApp';
import { TerminalApp } from './components/apps/TerminalApp';
import { CertificatesApp } from './components/apps/CertificatesApp';
import { ContactApp } from './components/apps/ContactApp';
import { MusicApp } from './components/apps/MusicApp';
import { SafariApp } from './components/apps/SafariApp';
import { FinderApp } from './components/apps/FinderApp';

// Icons
import {
  UserCircleIcon,
  FolderIcon,
  CommandLineIcon,
  AcademicCapIcon,
  EnvelopeIcon,
  SpeakerWaveIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

// App configurations
const apps: AppConfig[] = [
  {
    id: 'finder',
    name: 'Finder',
    icon: FolderIcon,
    component: FinderApp,
    defaultSize: { width: 700, height: 500 },
  },
  {
    id: 'about',
    name: 'About Me',
    icon: UserCircleIcon,
    component: AboutApp,
    defaultSize: { width: 800, height: 650 },
  },
  {
    id: 'projects',
    name: 'Projects',
    icon: FolderIcon,
    component: ProjectsApp,
    defaultSize: { width: 900, height: 600 },
  },
  {
    id: 'terminal',
    name: 'Terminal',
    icon: CommandLineIcon,
    component: TerminalApp,
    defaultSize: { width: 700, height: 500 },
  },
  {
    id: 'certificates',
    name: 'Certificates',
    icon: AcademicCapIcon,
    component: CertificatesApp,
    defaultSize: { width: 800, height: 600 },
  },
  {
    id: 'contact',
    name: 'Contact',
    icon: EnvelopeIcon,
    component: ContactApp,
    defaultSize: { width: 600, height: 650 },
  },
  {
    id: 'music',
    name: 'Music',
    icon: SpeakerWaveIcon,
    component: MusicApp,
    defaultSize: { width: 380, height: 550 },
  },
  {
    id: 'safari',
    name: 'Safari',
    icon: ArrowPathIcon,
    component: SafariApp,
    defaultSize: { width: 1000, height: 700 },
  },
];

function App() {
  const { windows, openWindow } = useWindows();
  const { theme } = useTheme();
  const [isBooting, setIsBooting] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Boot animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBooting(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  // Auto-open some apps on boot
  useEffect(() => {
    if (!isBooting) {
      const bootTimer = setTimeout(() => {
        openWindow('terminal', { x: 100, y: 100 });
      }, 500);

      return () => clearTimeout(bootTimer);
    }
  }, [isBooting, openWindow]);

  const renderApp = useCallback(
    (app: AppConfig) => {
      const AppComponent = app.component;
      return <AppComponent key={app.id} />;
    },
    []
  );

  // Show mobile fallback for small screens
  if (isMobile) {
    return <MobileFallback />;
  }

  return (
    <>
      {/* Boot Screen */}
      {isBooting && <BootScreen onComplete={() => setIsBooting(false)} />}

      {/* Main Desktop */}
      {!isBooting && (
        <div className={`h-full w-full ${theme === 'dark' ? 'dark' : ''}`}>
          <Desktop>
            {/* Menu Bar */}
            <MenuBar />

            {/* Render Open Windows */}
            {apps.map(app => {
              const windowState = windows.find(w => w.appId === app.id);
              if (windowState?.isOpen) {
                return renderApp(app);
              }
              return null;
            })}

            {/* Dock */}
            <Dock apps={apps} />
          </Desktop>
        </div>
      )}
    </>
  );
}

export default App;
