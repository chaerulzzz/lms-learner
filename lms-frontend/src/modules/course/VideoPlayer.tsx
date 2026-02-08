import { useRef, useEffect, useCallback, useState } from 'react';
import { useCourse } from './CourseProvider';

interface VideoPlayerProps {
  lessonId: number;
  videoUrl: string;
  lessonTitle: string;
  onComplete?: () => void;
}

export default function VideoPlayer({ lessonId, videoUrl, lessonTitle, onComplete }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastReportedTimeRef = useRef(0);
  const { trackProgress, isTrackingProgress } = useCourse();
  const [watchedPercentage, setWatchedPercentage] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

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

    // Report progress every 10 seconds
    const interval = setInterval(() => {
      if (!video.paused) {
        reportProgress();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [reportProgress]);

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
    setWatchedPercentage(Math.round((video.currentTime / video.duration) * 100));
  };

  return (
    <div className="bg-black rounded-lg overflow-hidden">
      {/* Video Header */}
      <div className="bg-gray-900 px-4 py-3 flex items-center justify-between">
        <h3 className="text-white font-medium truncate">{lessonTitle}</h3>
        <div className="flex items-center gap-3">
          {isTrackingProgress && (
            <span className="text-xs text-gray-400">Saving...</span>
          )}
          <span className={`text-xs px-2 py-1 rounded ${
            isCompleted ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'
          }`}>
            {isCompleted ? 'Completed' : `${watchedPercentage}%`}
          </span>
        </div>
      </div>

      {/* Video Player */}
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full aspect-video"
        controls
        onPause={handlePause}
        onEnded={handleEnded}
        onTimeUpdate={handleTimeUpdate}
      >
        Your browser does not support the video tag.
      </video>

      {/* Progress Bar */}
      <div className="bg-gray-900 px-4 py-2">
        <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${isCompleted ? 'bg-green-500' : 'bg-primary-red'}`}
            style={{ width: `${watchedPercentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">
          {isCompleted
            ? 'Lesson completed! You can still rewatch anytime.'
            : 'Watch at least 90% to mark as complete'}
        </p>
      </div>
    </div>
  );
}
