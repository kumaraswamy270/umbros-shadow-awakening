
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Loader, SkipForward } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  console.log("Video source in VideoPlayer:", videoSrc);

  // Reset state when video source changes
  useEffect(() => {
    setIsLoading(true);
    setIsLoaded(false);
    setError(null);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    console.log("Video source changed to:", videoSrc);
  }, [videoSrc]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (video.duration > 0) {
        const percentage = (video.currentTime / video.duration) * 100;
        setProgress(percentage);
        setCurrentTime(video.currentTime);
      }
    };

    const handleLoadedData = () => {
      setIsLoaded(true);
      setIsLoading(false);
      setError(null);
      setDuration(video.duration);
      console.log("Video loaded successfully:", videoSrc);
      toast.success("Video loaded successfully");
    };

    const handleLoadStart = () => {
      setIsLoading(true);
      console.log("Video loading started:", videoSrc);
    };

    const handleCanPlay = () => {
      console.log("Video can play now:", videoSrc);
    };

    const handleError = (e: Event) => {
      console.error("Video error:", e, video.error);
      setError("Error loading video. Please try again.");
      setIsLoaded(false);
      setIsLoading(false);
      toast.error("Failed to load video");
    };

    const handleEnded = () => {
      setIsPlaying(false);
      console.log("Video playback ended");
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('ended', handleEnded);

    // Try to force load the video
    try {
      video.load();
      console.log("Video load called");
    } catch (err) {
      console.error("Error loading video:", err);
    }

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('ended', handleEnded);
    };
  }, [videoSrc]);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        console.log("Attempting to play video");
        const playPromise = videoRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Video playback failed:", error);
            setIsPlaying(false);
            // Try to reload the video if it failed to play
            if (videoRef.current) {
              videoRef.current.load();
            }
          });
        }
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

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

  // Format time in MM:SS format
  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "00:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const retry = () => {
    if (videoRef.current) {
      setIsLoading(true);
      setError(null);
      console.log("Retrying video load");
      videoRef.current.load();
    }
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
        className="w-full h-full object-cover bg-umbros-dark/90"
        poster={posterSrc}
        preload="auto"
        autoPlay={autoPlay}
        playsInline
        muted={autoPlay || isMuted}
        loop={false}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Video Loading/Error State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-umbros-dark/70">
          <div className="animate-pulse flex flex-col items-center">
            <Loader className="w-10 h-10 text-umbros-flame animate-spin mb-2" />
            <p className="text-white">Loading video...</p>
          </div>
        </div>
      )}

      {error && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-umbros-dark/70">
          <div className="flex flex-col items-center">
            <p className="text-red-400 mb-4">{error}</p>
            <Button variant="secondary" onClick={retry}>Retry</Button>
          </div>
        </div>
      )}
      
      {/* Video Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {/* Progress Bar */}
        <div 
          ref={progressBarRef}
          className="w-full h-2 bg-gray-700 cursor-pointer"
          onClick={handleProgressClick}
        >
          <div 
            className="h-full bg-umbros-flame"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Control Buttons */}
        <div className="flex items-center justify-between p-3 bg-gradient-to-t from-shadow-heavy to-transparent">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-umbros-light"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </Button>
            
            <span className="text-white text-xs">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          
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
