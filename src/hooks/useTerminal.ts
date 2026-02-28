import { useState, useCallback, useRef, useEffect } from 'react';

export interface TerminalCommand {
  command: string;
  output: string | string[];
  type?: 'text' | 'success' | 'error' | 'link';
  timestamp: Date;
}

export interface TerminalHistory {
  entries: string[];
  currentIndex: number;
}

const AVAILABLE_COMMANDS = [
  'whoami',
  'skills',
  'projects',
  'contact',
  'education',
  'github',
  'linkedin',
  'email',
  'help',
  'clear',
  'echo',
  'date',
  'uname',
  'pwd',
  'ls',
  'cat',
  'neofetch',
  'matrix',
];

const COMMAND_DESCRIPTIONS: Record<string, string> = {
  whoami: 'Shows your name and title',
  skills: 'Lists all your technical skills',
  projects: 'Lists all your projects with links',
  contact: 'Shows your contact information',
  education: 'Shows your certificates and courses',
  github: 'Opens your GitHub in new tab',
  linkedin: 'Opens your LinkedIn in new tab',
  email: 'Shows your email address',
  help: 'Shows all available commands',
  clear: 'Clears the terminal',
  echo: 'Echoes a message',
  date: 'Shows current date and time',
  uname: 'Shows system information',
  pwd: 'Prints working directory',
  ls: 'Lists directory contents',
  cat: 'Displays file contents',
  neofetch: 'System information (easter egg)',
  matrix: 'Matrix reference (easter egg)',
};

export const useTerminal = () => {
  const [commands, setCommands] = useState<TerminalCommand[]>([]);
  const [history, setHistory] = useState<TerminalHistory>({ entries: [], currentIndex: -1 });
  const [currentInput, setCurrentInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [commands]);

  const addCommand = useCallback((command: string, output: string | string[], type: 'text' | 'success' | 'error' | 'link' = 'text') => {
    const newCommand: TerminalCommand = {
      command,
      output,
      type,
      timestamp: new Date(),
    };
    setCommands(prev => [...prev, newCommand]);
  }, []);

  const processCommand = useCallback(
    (input: string, callbacks: {
      openUrl: (url: string) => void;
    }) => {
      const trimmedInput = input.trim();
      if (!trimmedInput) return;

      // Add to history
      setHistory(prev => ({
        entries: [...prev.entries, trimmedInput],
        currentIndex: prev.entries.length + 1,
      }));

      const [cmd, ...args] = trimmedInput.split(' ');
      const command = cmd.toLowerCase();
      const argument = args.join(' ');

      let output: string | string[];
      let type: 'text' | 'success' | 'error' | 'link' = 'text';

      switch (command) {
        case 'whoami':
          output = [
            'Amimul Ahsan',
            'AI/ML Engineer and Full-Stack Developer',
            'Dhaka, Bangladesh',
          ];
          break;

        case 'skills':
          output = [
            'AI/ML: Python (95%), TensorFlow (90%), PyTorch (88%)',
            'Backend: FastAPI (92%), Django (90%), Node.js (85%)',
            'Frontend: React (92%), TypeScript (90%), Tailwind CSS (92%)',
            '...and more. Visit the About app for full list.',
          ];
          break;

        case 'projects':
          output = [
            '1. Shop Hub - Full-stack e-commerce platform',
            '   GitHub: https://github.com/itsaahsan/shop-hub',
            '2. LiftIQ - AI-powered fitness tracking app',
            '   GitHub: https://github.com/itsaahsan/liftiq',
            '3. AI E-Commerce Platform - ML-powered recommendations',
            '   GitHub: https://github.com/itsaahsan/ai-ecommerce',
            '4. Portfolio OS - macOS-style portfolio',
            '   GitHub: https://github.com/itsaahsan/portfolio-os',
          ];
          type = 'link';
          break;

        case 'contact':
          output = [
            'Email: itsaahsan@gmail.com',
            'GitHub: https://github.com/itsaahsan',
            'LinkedIn: https://linkedin.com/in/itsaahsan',
            'Location: Dhaka, Bangladesh',
          ];
          type = 'link';
          break;

        case 'education':
          output = [
            'Certificates:',
            '- Harvard CS50: Introduction to Computer Science (2023)',
            '- Deep Learning Specialization - Andrew Ng (2023)',
            '- Google Data Analytics Professional Certificate (2023)',
            '- Meta Front-End Developer Professional Certificate (2023)',
            '- TensorFlow Developer Professional Certificate (2023)',
            '- AWS Certified Cloud Practitioner (2024)',
          ];
          break;

        case 'github':
          callbacks.openUrl('https://github.com/itsaahsan');
          output = 'Opening GitHub...';
          type = 'success';
          break;

        case 'linkedin':
          callbacks.openUrl('https://linkedin.com/in/itsaahsan');
          output = 'Opening LinkedIn...';
          type = 'success';
          break;

        case 'email':
          output = 'itsaahsan@gmail.com';
          type = 'link';
          break;

        case 'help':
          output = [
            'Available Commands:',
            ...AVAILABLE_COMMANDS.map(cmd => `  ${cmd.padEnd(15)} - ${COMMAND_DESCRIPTIONS[cmd] || ''}`),
            '',
            'Tips: Use Tab for autocomplete, Up/Down for history',
          ];
          break;

        case 'clear':
          setCommands([]);
          return;

        case 'echo':
          output = argument;
          break;

        case 'date':
          output = new Date().toString();
          break;

        case 'uname':
          output = `PortfolioOS 1.0.0 ${navigator.platform.includes('Win') ? 'Windows' : navigator.platform}`;
          break;

        case 'pwd':
          output = '/home/amimul/portfolio';
          break;

        case 'ls':
          output = ['about/', 'projects/', 'certificates/', 'resume.pdf', 'contact.txt'];
          break;

        case 'cat':
          if (argument === 'contact.txt') {
            output = [
              'Name: Amimul Ahsan',
              'Email: itsaahsan@gmail.com',
              'GitHub: github.com/itsaahsan',
              'LinkedIn: linkedin.com/in/itsaahsan',
            ];
          } else if (argument === 'resume.pdf') {
            output = 'Binary file. Download resume from the About app or Finder.';
          } else {
            output = `cat: ${argument || ''}: No such file`;
            type = 'error';
          }
          break;

        // Easter eggs
        case 'sudo':
          output = "Nice try! But you're already talking to the admin. 😄";
          type = 'error';
          break;

        case 'rm':
          if (argument.includes('-rf') || argument.includes('--no-preserve-root')) {
            output = [
              '⚠️ Nice try!',
              'This is a portfolio, not a production server. But I appreciate the enthusiasm! 🔥',
            ];
          } else {
            output = 'rm: permission denied';
            type = 'error';
          }
          break;

        case 'neofetch':
          output = [
            '       ___       ___       ___       ___       ___',
            '      /\\__\\     /\\__\\     /\\__\\     /\\  \\     /\\__\\',
            '     /::|  |   /::|  |   /::|  |   /::\\  \\   /::|  |',
            '    /:|:|  |  /:|:|  |  /:|:|  |  /:/\\:\\  \\ /:|:|  |',
            '   /:/|:|__| /:/|:|__| /:/|:|__| /:/  \\:\\  /:/|:|__|',
            '  /:/ |::::\\/__/:/::::\\/__/:/::::\\/__/:/ \\:\\/__/:/::::\\',
            '  \\/__/~~|  |  \\/__~~|  |  \\/__~~|  |  \\/__/~~|  |  \\/__',
            '',
            `  amimul@portfolio-os`,
            `  OS: PortfolioOS 1.0.0`,
            `  Shell: zsh 5.8`,
            `  Editor: VS Code`,
            `  Location: Dhaka, Bangladesh`,
          ];
          break;

        case 'matrix':
          output = [
            'Wake up, Neo... The Matrix has you...',
            'Follow the white rabbit. 🐇',
          ];
          break;

        case 'star':
        case 'favorite':
          output = [
            '⭐ Thanks for the interest!',
            `Consider starring the repo: https://github.com/itsaahsan/portfolio-os`,
          ];
          type = 'link';
          break;

        default:
          output = `Command not found: ${command}. Type 'help' for available commands.`;
          type = 'error';
      }

      addCommand(trimmedInput, output, type);
    },
    [addCommand]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, callbacks: {
      openUrl: (url: string) => void;
    }) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        processCommand(currentInput, callbacks);
        setCurrentInput('');
        setSuggestions([]);
        setSelectedSuggestion(0);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (history.currentIndex > 0) {
          const newIndex = history.currentIndex - 1;
          setHistory(prev => ({ ...prev, currentIndex: newIndex }));
          setCurrentInput(history.entries[newIndex] || '');
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (history.currentIndex < history.entries.length - 1) {
          const newIndex = history.currentIndex + 1;
          setHistory(prev => ({ ...prev, currentIndex: newIndex }));
          setCurrentInput(history.entries[newIndex] || '');
        } else {
          setHistory(prev => ({ ...prev, currentIndex: prev.entries.length }));
          setCurrentInput('');
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        if (suggestions.length > 0) {
          const nextIndex = (selectedSuggestion + 1) % suggestions.length;
          setSelectedSuggestion(nextIndex);
          setCurrentInput(suggestions[nextIndex] + ' ');
        } else {
          const inputParts = currentInput.split(' ');
          const currentCmd = inputParts[0].toLowerCase();
          const matches = AVAILABLE_COMMANDS.filter(cmd => cmd.startsWith(currentCmd));
          if (matches.length === 1) {
            setCurrentInput(matches[0] + ' ');
          }
        }
      } else if (e.key === 'Escape') {
        setSuggestions([]);
      }
    },
    [currentInput, history, suggestions, selectedSuggestion, processCommand]
  );

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentInput(value);

    if (value.trim()) {
      const inputParts = value.split(' ');
      const currentCmd = inputParts[0].toLowerCase();
      const matches = AVAILABLE_COMMANDS.filter(cmd => cmd.startsWith(currentCmd));
      setSuggestions(matches);
      setSelectedSuggestion(0);
    } else {
      setSuggestions([]);
    }
  }, []);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return {
    commands,
    currentInput,
    suggestions,
    selectedSuggestion,
    inputRef,
    outputRef,
    handleKeyDown,
    handleInputChange,
    processCommand,
    focusInput,
    setCurrentInput,
  };
};

export default useTerminal;
