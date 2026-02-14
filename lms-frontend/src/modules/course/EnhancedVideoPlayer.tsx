import { useRef, useEffect, useCallback, useState } from 'react';
import { useCourse } from './CourseProvider';
import type { VideoQuality } from './types';

interface EnhancedVideoPlayerProps {
  lessonId: number;
  videoUrl: string;
  lessonTitle: string;
  onComplete?: () => void;
}

// Mock quality options (in a real app, these would come from the backend)
const QUALITY_OPTIONS: VideoQuality[] = [
  { label: 'Auto', value: 'auto', bitrate: 'Adaptive' },
  { label: '1080p', value: '1080p', bitrate: 'High' },
  { label: '720p', value: '720p', bitrate: 'Medium' },
  { label: '480p', value: '480p', bitrate: 'Low' },
  { label: '360p', value: '360p', bitrate: 'Very Low' },
];

// Playback speed options
const PLAYBACK_SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];

// Keyboard shortcuts
const KEYBOARD_SHORTCUTS = {
  SPACE: 'Space',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  F: 'f',
  M: 'm',
  C: 'c',
  K: 'k',
} as const;

export default function EnhancedVideoPlayer({ lessonId, videoUrl, lessonTitle, onComplete }: EnhancedVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastReportedTimeRef = useRef(0);
  const { trackProgress, isTrackingProgress } = useCourse();
  
  const [watchedPercentage, setWatchedPercentage] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [selectedQuality, setSelectedQuality] = useState<VideoQuality>(QUALITY_OPTIONS[0]);
  const [isPiPMode, setIsPiPMode] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isVideoPaused, setIsVideoPaused] = useState(true);

  // Chapters data (mock - in real app would come from backend)
  const chapters = [
    { time: 0, title: 'Introduction' },
    { time: 60, title: 'Key Concepts' },
    { time: 180, title: 'Examples' },
    { time: 300, title: 'Summary' },
  ];

  // Update video playing state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsVideoPaused(false);
    const handlePause = () => setIsVideoPaused(true);
    
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    
    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  const reportProgress = useCallback(() => {
    const video = videoRef.current;
    if (!video || video.duration === 0 || isNaN(video.duration)) return;

    const watchedDuration = Math.floor(video.currentTime);
    const totalDuration = Math.floor(video.duration);

    // Only report if watched time has changed by at least 5 seconds
    if (Math.abs(watchedDuration - lastReportedTimeRef.current) < 5) return;

    lastReportedTimeRef.current = watchedDuration;
    trackProgress(lessonId, watchedDuration, totalDuration);

    const percentage = Math.round((watchedDuration / totalDuration) * 100);
    setWatchedPercentage(percentage);

    if (percentage >= 90 && !isCompleted) {
      setIsCompleted(true);
      onComplete?.();
    }
  }, [lessonId, trackProgress, isCompleted, onComplete]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set initial playback speed
    video.playbackRate = playbackSpeed;

    // Report progress every 10 seconds
    const interval = setInterval(() => {
      if (!video.paused) {
        reportProgress();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [reportProgress, playbackSpeed]);

  const handlePause = () => {
    reportProgress();
  };

  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return;

    const totalDuration = Math.floor(video.duration);
    trackProgress(lessonId, totalDuration, totalDuration);
    setWatchedPercentage(100);
    setIsCompleted(true);
    onComplete?.();
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || video.duration === 0 || isNaN(video.duration)) return;
    
    setCurrentTime(video.currentTime);
    setDuration(video.duration);
    setWatchedPercentage(Math.round((video.currentTime / video.duration) * 100));
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    setDuration(video.duration);
  };

  // Playback speed controls
  const handleSpeedChange = useCallback((speed: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = speed;
    setPlaybackSpeed(speed);
  }, []);

  // Quality selection (mock implementation)
  const handleQualityChange = useCallback((quality: VideoQuality) => {
    setSelectedQuality(quality);
    // In a real app, this would switch video source
    console.log(`Switching to quality: ${quality.label}`);
  }, []);

  // Picture-in-Picture mode
  const togglePiP = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        setIsPiPMode(false);
      } else if (document.pictureInPictureEnabled) {
        await video.requestPictureInPicture();
        setIsPiPMode(true);
      }
    } catch (error) {
      console.error('Picture-in-Picture failed:', error);
    }
  }, []);

  // Volume controls
  const handleVolumeChange = useCallback((newVolume: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
    if (!video.muted) {
      setVolume(video.volume);
    }
  }, []);

  // Seek functionality
  const seek = useCallback((seconds: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.max(0, Math.min(video.currentTime + seconds, video.duration));
  }, []);

  const seekTo = useCallback((time: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = time;
  }, []);

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case KEYBOARD_SHORTCUTS.SPACE: {
          e.preventDefault();
          const video = videoRef.current;
          if (video) {
            if (video.paused) {
              video.play();
            } else {
              video.pause();
            }
          }
          break;
        }
        
        case KEYBOARD_SHORTCUTS.ARROW_LEFT: {
          e.preventDefault();
          seek(-5);
          break;
        }
        
        case KEYBOARD_SHORTCUTS.ARROW_RIGHT: {
          e.preventDefault();
          seek(5);
          break;
        }
        
        case KEYBOARD_SHORTCUTS.ARROW_UP: {
          e.preventDefault();
          handleVolumeChange(Math.min(1, volume + 0.1));
          break;
        }
        
        case KEYBOARD_SHORTCUTS.ARROW_DOWN: {
          e.preventDefault();
          handleVolumeChange(Math.max(0, volume - 0.1));
          break;
        }
        
        case KEYBOARD_SHORTCUTS.F: {
          e.preventDefault();
          toggleFullscreen();
          break;
        }
        
        case KEYBOARD_SHORTCUTS.M: {
          e.preventDefault();
          toggleMute();
          break;
        }
        
        case KEYBOARD_SHORTCUTS.K: {
          e.preventDefault();
          const vid = videoRef.current;
          if (vid) {
            if (vid.paused) {
              vid.play();
            } else {
              vid.pause();
            }
          }
          break;
        }
        
        case KEYBOARD_SHORTCUTS.C: {
          // Toggle captions would go here
          console.log('Toggle captions - would need captions track');
          break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [volume, handleVolumeChange, seek, toggleFullscreen, toggleMute]);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate chapter progress
  const getCurrentChapter = () => {
    if (!chapters.length) return null;
    
    for (let i = chapters.length - 1; i >= 0; i--) {
      if (currentTime >= chapters[i].time) {
        return chapters[i];
      }
    }
    return chapters[0];
  };

  const currentChapter = getCurrentChapter();

  return (
    <div 
      ref={containerRef}
      className="bg-black rounded-lg overflow-hidden relative group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Header */}
      <div className="bg-gray-900 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-white font-medium truncate">{lessonTitle}</h3>
          {currentChapter && (
            <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
              {currentChapter.title}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {isTrackingProgress && (
            <span className="text-xs text-gray-400">Saving...</span>
          )}
          <span className={`text-xs px-2 py-1 rounded ${
            isCompleted ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'
          }`}>
            {isCompleted ? 'Completed' : `${watchedPercentage}%`}
          </span>
          <button
            onClick={() => setShowShortcutsHelp(!showShortcutsHelp)}
            className="text-xs text-gray-400 hover:text-white"
            title="Keyboard Shortcuts"
          >
            ⌨️
          </button>
        </div>
      </div>

      {/* Video Player */}
      <div className="relative">
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full aspect-video"
          controls={false}
          onPause={handlePause}
          onEnded={handleEnded}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        >
          Your browser does not support the video tag.
        </video>

        {/* Custom Controls Overlay */}
        {(showControls || showSettings) && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-between">
            {/* Top Controls */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePiP}
                  className="text-white bg-black/50 hover:bg-black/70 p-2 rounded-lg"
                  title="Picture-in-Picture"
                  disabled={!document.pictureInPictureEnabled}
                >
                  {isPiPMode ? '📌' : '📋'}
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="text-white bg-black/50 hover:bg-black/70 p-2 rounded-lg"
                  title="Fullscreen (F)"
                >
                  ⛶
                </button>
              </div>
              
              {/* Settings Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-white bg-black/50 hover:bg-black/70 p-2 rounded-lg"
                  title="Settings"
                >
                  ⚙️
                </button>
                
                {showSettings && (
                  <div className="absolute right-0 top-full mt-2 bg-gray-900 text-white rounded-lg shadow-xl p-4 min-w-48 z-50">
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Playback Speed</h4>
                      <div className="flex flex-wrap gap-2">
                        {PLAYBACK_SPEEDS.map(speed => (
                          <button
                            key={speed}
                            onClick={() => handleSpeedChange(speed)}
                            className={`px-3 py-1 rounded text-sm ${
                              playbackSpeed === speed 
                                ? 'bg-primary-red text-white' 
                                : 'bg-gray-800 hover:bg-gray-700'
                            }`}
                          >
                            {speed}x
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Quality</h4>
                      <div className="space-y-1">
                        {QUALITY_OPTIONS.map(quality => (
                          <button
                            key={quality.value}
                            onClick={() => handleQualityChange(quality)}
                            className={`w-full text-left px-3 py-2 rounded text-sm flex justify-between ${
                              selectedQuality.value === quality.value
                                ? 'bg-primary-red text-white'
                                : 'bg-gray-800 hover:bg-gray-700'
                            }`}
                          >
                            <span>{quality.label}</span>
                            <span className="text-gray-400 text-xs">{quality.bitrate}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Volume</h4>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={toggleMute}
                          className="text-white p-1"
                          title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
                        >
                          {isMuted ? '🔇' : volume > 0.5 ? '🔊' : '🔉'}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={isMuted ? 0 : volume}
                          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                          className="flex-1 accent-primary-red"
                        />
                        <span className="text-xs text-gray-400">{Math.round((isMuted ? 0 : volume) * 100)}%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="space-y-3">
              {/* Progress Bar with Chapter Markers */}
              <div className="relative">
                <div className="absolute top-0 left-0 right-0 h-1">
                  {chapters.map((chapter, index) => (
                    <div
                      key={index}
                      className="absolute h-3 w-0.5 bg-white/50"
                      style={{ left: `${(chapter.time / duration) * 100}%` }}
                      title={chapter.title}
                    />
                  ))}
                </div>
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={(e) => seekTo(parseFloat(e.target.value))}
                  className="w-full h-1 accent-primary-red"
                />
              </div>
              
              {/* Time & Chapter Info */}
              <div className="flex justify-between items-center text-white text-sm">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      const video = videoRef.current;
                      if (video) {
                        if (video.paused) {
                          video.play();
                        } else {
                          video.pause();
                        }
                      }
                    }}
                    className="text-white p-1"
                    title="Play/Pause (Space/K)"
                  >
                    {isVideoPaused ? '▶️' : '⏸️'}
                  </button>
                  <span className="font-mono">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                  {currentChapter && (
                    <span className="text-gray-300">
                      {currentChapter.title}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-gray-300">
                    Speed: {playbackSpeed}x
                  </span>
                  <span className="text-gray-300">
                    Quality: {selectedQuality.label}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Play/Pause Center Button */}
        {!showControls && (
          <button
            onClick={() => {
              const video = videoRef.current;
              if (video) {
                if (video.paused) {
                  video.play();
                } else {
                  video.pause();
                }
              }
            }}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <div className="bg-black/50 rounded-full p-4">
              {isVideoPaused ? (
                <span className="text-white text-4xl">▶️</span>
              ) : (
                <span className="text-white text-4xl">⏸️</span>
              )}
            </div>
          </button>
        )}
      </div>

      {/* Progress Bar (always visible) */}
      <div className="bg-gray-900 px-4 py-2">
        <div className="h-1 bg-gray-700 rounded-full overflow-hidden relative">
          <div
            className={`h-full transition-all ${isCompleted ? 'bg-green-500' : 'bg-primary-red'}`}
            style={{ width: `${watchedPercentage}%` }}
          />
          {/* Chapter markers on progress bar */}
          {chapters.map((chapter, index) => (
            <div
              key={index}
              className="absolute top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-white"
              style={{ left: `${(chapter.time / duration) * 100}%` }}
              title={chapter.title}
            />
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-1">
          {isCompleted
            ? 'Lesson completed! You can still rewatch anytime.'
            : 'Watch at least 90% to mark as complete'}
        </p>
      </div>

      {/* Keyboard Shortcuts Help Modal */}
      {showShortcutsHelp && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Keyboard Shortcuts</h3>
              <button
                onClick={() => setShowShortcutsHelp(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Space / K</span>
                <span className="text-white">Play/Pause</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">← → Arrow</span>
                <span className="text-white">Seek -5/+5 seconds</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">↑ ↓ Arrow</span>
                <span className="text-white">Volume up/down</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">F</span>
                <span className="text-white">Toggle fullscreen</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">M</span>
                <span className="text-white">Mute/Unmute</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">C</span>
                <span className="text-white">Toggle captions</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}