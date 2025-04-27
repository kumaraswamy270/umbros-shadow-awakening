
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface VideoPlayerProps {
  videoSrc: string;
  posterSrc?: string;
  title?: string;
  autoPlay?: boolean;
  className?: string;
}

const VideoPlayer = ({
  videoSrc,
  posterSrc,
  title,
  autoPlay = false,
  className,
}: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (video.duration > 0) {
        const percentage = (video.currentTime / video.duration) * 100;
        setProgress(percentage);
      }
    };

    const handleLoadedData = () => {
      setIsLoaded(true);
      setError(null);
    };

    const handleError = () => {
      setError("Error loading video. Please try again.");
      setIsLoaded(false);
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, [videoSrc]);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        const playPromise = videoRef.current.play();
        
        // Handle asynchronous play promise
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Video playback failed:", error);
            setIsPlaying(false);
          });
        }
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, videoSrc]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !videoRef.current) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * videoRef.current.duration;
  };

  return (
    <div className={cn("relative rounded-lg overflow-hidden shadow-xl group", className)}>
      {/* Video Title */}
      {title && (
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-shadow-heavy to-transparent p-4">
          <h3 className="text-white font-bold text-lg md:text-xl shadow-text">{title}</h3>
        </div>
      )}
      
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={posterSrc}
        autoPlay={autoPlay}
        playsInline
        muted={autoPlay || isMuted}
        loop
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Video Loading/Error State */}
      {!isLoaded && videoSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-umbros-dark/70">
          {error ? (
            <p className="text-red-400">{error}</p>
          ) : (
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-10 h-10 border-4 border-umbros-flame border-t-transparent rounded-full animate-spin mb-2"></div>
              <p className="text-white">Loading video...</p>
            </div>
          )}
        </div>
      )}
      
      {/* Video Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {/* Progress Bar */}
        <div 
          ref={progressBarRef}
          className="w-full h-1 bg-gray-700 cursor-pointer"
          onClick={handleProgressClick}
        >
          <div 
            className="h-full bg-umbros-flame"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Control Buttons */}
        <div className="flex items-center justify-between p-3 bg-gradient-to-t from-shadow-heavy to-transparent">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-umbros-light"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-umbros-light"
            onClick={toggleMute}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
