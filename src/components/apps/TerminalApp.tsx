import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CommandLineIcon } from '@heroicons/react/24/outline';
import { Window } from '../common/Window';
import { useWindows } from '../../context/WindowContext';
import useTerminal from '../../hooks/useTerminal';

export const TerminalApp: React.FC = () => {
  const { closeWindow, minimizeWindow, maximizeWindow, getWindowByAppId } = useWindows();
  const windowState = getWindowByAppId('terminal');
  const {
    commands,
    currentInput,
    suggestions,
    inputRef,
    outputRef,
    handleKeyDown,
    handleInputChange,
    processCommand,
    focusInput,
  } = useTerminal();

  if (!windowState) return null;

  useEffect(() => {
    const timer = setTimeout(() => {
      focusInput();
    }, 100);
    return () => clearTimeout(timer);
  }, [focusInput]);

  const handleContainerClick = () => {
    focusInput();
  };

  const handleKeyDownWrapper = (e: React.KeyboardEvent<HTMLInputElement>) => {
    handleKeyDown(e, {
      openUrl: (url: string) => window.open(url, '_blank'),
    });
  };

  const processCommandWrapper = (input: string) => {
    processCommand(input, {
      openUrl: (url: string) => window.open(url, '_blank'),
    });
  };

  const getOutputClass = (type?: string) => {
    switch (type) {
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      case 'link':
        return 'text-blue-400';
      default:
        return 'text-gray-300';
    }
  };

  return (
    <Window
      window={windowState}
      title="Terminal"
      icon={CommandLineIcon}
      onClose={() => closeWindow(windowState.id)}
      onMinimize={() => minimizeWindow(windowState.id)}
      onMaximize={() => maximizeWindow(windowState.id)}
      minWidth={600}
      minHeight={400}
      resizable={true}
    >
      <div
        className="h-full bg-gray-900 text-gray-100 font-mono text-sm p-4 overflow-auto cursor-text"
        onClick={handleContainerClick}
      >
        <div ref={outputRef} className="h-full flex flex-col">
          {/* Welcome Message */}
          <div className="mb-4 text-gray-400">
            <p className="text-green-400">Welcome to PortfolioOS Terminal v1.0.0</p>
            <p>Type <span className="text-yellow-400">'help'</span> to see available commands.</p>
            <p className="text-gray-500 mt-2">
              Last login: {new Date().toUTCString()}
            </p>
          </div>

          {/* Commands History */}
          <div className="flex-1 space-y-3">
            {commands.map((cmd, index) => (
              <div key={index}>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">➜</span>
                  <span className="text-blue-400">~</span>
                  <span>{cmd.command}</span>
                </div>
                {cmd.output && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`mt-2 ${getOutputClass(cmd.type)} whitespace-pre-line`}
                  >
                    {Array.isArray(cmd.output) ? cmd.output.join('\n') : cmd.output}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Current Input */}
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <span className="text-green-400">➜</span>
              <span className="text-blue-400">~</span>
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDownWrapper}
                  className="w-full bg-transparent border-none outline-none text-gray-100 terminal-input"
                  autoFocus
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                />
                
                {/* Autocomplete Suggestions */}
                {suggestions.length > 0 && currentInput && (
                  <div className="absolute top-full left-0 mt-1 bg-gray-800 rounded-lg shadow-lg py-1 min-w-[200px] z-10">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={suggestion}
                        className={`px-3 py-1.5 text-sm cursor-pointer ${
                          index === 0 ? 'bg-gray-700' : ''
                        } hover:bg-gray-700`}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <span className="terminal-cursor w-2 h-5 bg-gray-400 inline-block" />
            </div>
          </div>

          {/* Hints */}
          <div className="mt-4 pt-4 border-t border-gray-800 text-gray-500 text-xs">
            <p>💡 Tips: Use <kbd className="px-1.5 py-0.5 bg-gray-800 rounded">Tab</kbd> for autocomplete,{' '}
            <kbd className="px-1.5 py-0.5 bg-gray-800 rounded">↑</kbd> / <kbd className="px-1.5 py-0.5 bg-gray-800 rounded">↓</kbd> for history</p>
            <p className="mt-1">Try: <span className="text-yellow-400">whoami</span>, <span className="text-yellow-400">skills</span>, <span className="text-yellow-400">projects</span>, <span className="text-yellow-400">neofetch</span></p>
          </div>
        </div>
      </div>
    </Window>
  );
};

export default TerminalApp;
