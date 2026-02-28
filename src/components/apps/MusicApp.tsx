import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  PlayIcon,
  PauseIcon,
  ForwardIcon,
  BackwardIcon,
  SpeakerWaveIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { Window } from '../common/Window';
import { useWindows } from '../../context/WindowContext';
import { tracks } from '../../data/music';

export const MusicApp: React.FC = () => {
  const { closeWindow, minimizeWindow, maximizeWindow, getWindowByAppId } = useWindows();
  const windowState = getWindowByAppId('music');
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [volume, setVolume] = useState(75);
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  if (!windowState) return null;

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          return prev + 0.5;
        });
      }, 100);
    } else {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrackIndex(prev => (prev + 1) % tracks.length);
    setProgress(0);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    setCurrentTrackIndex(prev => (prev - 1 + tracks.length) % tracks.length);
    setProgress(0);
    setIsPlaying(true);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(Number(e.target.value));
  };

  const formatTime = (progress: number, duration: string) => {
    const [mins, secs] = duration.split(':').map(Number);
    const totalSeconds = mins * 60 + secs;
    const currentSeconds = Math.floor((progress / 100) * totalSeconds);
    const currentMins = Math.floor(currentSeconds / 60);
    const currentSecs = currentSeconds % 60;
    return `${currentMins}:${currentSecs.toString().padStart(2, '0')}`;
  };

  return (
    <Window
      window={windowState}
      title="Music"
      icon={SpeakerWaveIcon}
      onClose={() => closeWindow(windowState.id)}
      onMinimize={() => minimizeWindow(windowState.id)}
      onMaximize={() => maximizeWindow(windowState.id)}
      minWidth={350}
      minHeight={500}
      resizable={false}
    >
      <div className="h-full bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 flex flex-col">
        {/* Album Art */}
        <motion.div
          key={currentTrack.id}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="aspect-square rounded-2xl overflow-hidden shadow-2xl mb-6"
        >
          <img
            src={currentTrack.albumArt}
            alt={currentTrack.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x300?text=Album+Art';
            }}
          />
        </motion.div>

        {/* Track Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1 min-w-0">
            <motion.h3
              key={currentTrack.title}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-lg font-semibold truncate"
            >
              {currentTrack.title}
            </motion.h3>
            <motion.p
              key={currentTrack.artist}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-sm truncate"
            >
              {currentTrack.artist}
            </motion.p>
          </div>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            {isLiked ? (
              <HeartSolidIcon className="w-6 h-6 text-red-500" />
            ) : (
              <HeartIcon className="w-6 h-6 text-gray-400" />
            )}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            className="w-full h-1 bg-gray-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{formatTime(progress, currentTrack.duration)}</span>
            <span>{currentTrack.duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <button
            onClick={handlePrevious}
            className="p-3 hover:bg-white/10 rounded-full transition-colors"
          >
            <BackwardIcon className="w-6 h-6" />
          </button>
          <button
            onClick={handlePlayPause}
            className="p-4 bg-white text-gray-900 rounded-full hover:scale-105 transition-transform"
          >
            {isPlaying ? (
              <PauseIcon className="w-8 h-8" />
            ) : (
              <PlayIcon className="w-8 h-8 ml-1" />
            )}
          </button>
          <button
            onClick={handleNext}
            className="p-3 hover:bg-white/10 rounded-full transition-colors"
          >
            <ForwardIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-3">
          <SpeakerWaveIcon className="w-5 h-5 text-gray-400" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="flex-1 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
          />
          <span className="text-xs text-gray-400 w-8">{volume}%</span>
        </div>

        {/* Equalizer Animation */}
        {isPlaying && (
          <div className="flex items-end justify-center gap-1 h-8 mt-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-macos-green rounded-full equalizer-bar"
                style={{
                  height: `${4 + Math.random() * 12}px`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Playlist hint */}
        <div className="mt-auto pt-4 text-center text-xs text-gray-500">
          🎵 Lofi Beats for Coding
        </div>
      </div>
    </Window>
  );
};

export default MusicApp;
