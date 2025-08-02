import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  SkipBack, 
  SkipForward,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Clock,
  BookOpen,
  Award,
  Download,
  Menu,
  X,
  ArrowLeft,
  Settings,
  Zap
} from 'lucide-react';
import { courseContent } from '../data/courseContent';

const CourseLearning = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedTopics, setExpandedTopics] = useState({});
  const [notes, setNotes] = useState('');
  const [activeTab, setActiveTab] = useState('curriculum');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [videoQuality, setVideoQuality] = useState('auto');
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hoverTime, setHoverTime] = useState(0);
  const [showHoverTime, setShowHoverTime] = useState(false);
  const [hoverPosition, setHoverPosition] = useState(0);

  const course = courseContent[courseId];

  useEffect(() => {
    if (!course) return;

    // Find current lesson
    let foundLesson = null;
    if (lessonId) {
      for (const topic of course.topics) {
        const lesson = topic.subtopics.find(sub => sub.id === parseInt(lessonId));
        if (lesson) {
          foundLesson = lesson;
          break;
        }
      }
    } else {
      // Default to first video lesson
      for (const topic of course.topics) {
        const videoLesson = topic.subtopics.find(sub => sub.type === 'video');
        if (videoLesson) {
          foundLesson = videoLesson;
          break;
        }
      }
    }

    if (foundLesson) {
      setCurrentVideo(foundLesson);
      // Auto-expand the topic containing current lesson
      for (const topic of course.topics) {
        if (topic.subtopics.some(sub => sub.id === foundLesson.id)) {
          setExpandedTopics(prev => ({ ...prev, [topic.id]: true }));
          break;
        }
      }
    }
  }, [courseId, lessonId, course]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
        setCurrentTime(video.currentTime);
      }
    };

    const updateDuration = () => {
      setDuration(video.duration);
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [currentVideo]);

  // Effect to ensure playback speed is applied when it changes
  useEffect(() => {
    const video = videoRef.current;
    if (video && video.readyState >= 1) {
      video.playbackRate = playbackSpeed;
      console.log(`Playback speed applied: ${playbackSpeed}, actual rate: ${video.playbackRate}`);
    }
  }, [playbackSpeed]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
  };

  const handleSpeedChange = (speed) => {
    console.log(`Changing speed from ${playbackSpeed} to ${speed}`);
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      console.log(`Video playback rate set to: ${speed}`);
    }
    setShowSpeedMenu(false);
  };

  const handleQualityChange = (quality) => {
    console.log(`Changing quality from ${videoQuality} to ${quality}`);
    setVideoQuality(quality);
    // In a real implementation, you would switch video sources here
    // For now, we'll just update the state
    setShowQualityMenu(false);
  };

  const handleProgressClick = (e) => {
    const video = videoRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
  };

  const handleProgressMouseDown = (e) => {
    e.stopPropagation();
    e.preventDefault(); // Prevent text selection
    setIsDragging(true);
    handleProgressClick(e);
    
    // Disable text selection during drag
    document.body.style.userSelect = 'none';
  };

  const handleProgressMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const clampedPos = Math.max(0, Math.min(1, pos));
    
    // Calculate hover time and position in real-time
    const time = clampedPos * duration;
    const mouseX = e.clientX - rect.left;
    
    // Ensure tooltip stays within reasonable bounds of the progress bar
    const tooltipPosition = Math.max(30, Math.min(mouseX, rect.width - 30));
    
    setHoverTime(time);
    // Update position to follow mouse but keep tooltip visible
    setHoverPosition(tooltipPosition);
    
    // If dragging, update video time
    if (isDragging) {
      const video = videoRef.current;
      if (video && duration) {
        video.currentTime = time;
      }
    }
  };

  const handleProgressMouseEnter = () => {
    setShowHoverTime(true);
  };

  const handleProgressMouseLeave = () => {
    setShowHoverTime(false);
  };

  // Global mouse up handler for dragging
  useEffect(() => {
    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        // Re-enable text selection
        document.body.style.userSelect = '';
      }
    };

    const handleMouseMove = (e) => {
      if (isDragging) {
        // Find the progress bar element and update if mouse is over it
        const progressBar = document.querySelector('[data-progress-bar]');
        if (progressBar) {
          const rect = progressBar.getBoundingClientRect();
          const pos = (e.clientX - rect.left) / rect.width;
          const clampedPos = Math.max(0, Math.min(1, pos));
          
          const time = clampedPos * duration;
          const mouseX = e.clientX - rect.left;
          
          // Ensure tooltip stays within reasonable bounds of the progress bar
          const tooltipPosition = Math.max(30, Math.min(mouseX, rect.width - 30));
          
          // Update hover time and position for tooltip
          setHoverTime(time);
          setHoverPosition(tooltipPosition);
          
          const video = videoRef.current;
          if (video && duration) {
            video.currentTime = time;
          }
        }
      }
    };

    if (isDragging) {
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging, duration]);

  const skipForward = () => {
    const video = videoRef.current;
    video.currentTime = Math.min(video.currentTime + 10, video.duration);
  };

  const skipBackward = () => {
    const video = videoRef.current;
    video.currentTime = Math.max(video.currentTime - 10, 0);
  };

  const toggleFullscreen = () => {
    const videoContainer = videoRef.current?.parentElement;
    if (!document.fullscreenElement) {
      videoContainer.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Unified mouse inactivity and auto-hide controls system
  useEffect(() => {
    let inactivityTimeout;
    
    const resetInactivityTimer = () => {
      // Clear existing timeout
      if (inactivityTimeout) {
        clearTimeout(inactivityTimeout);
        inactivityTimeout = null;
      }
      
      // Only set timer for fullscreen + playing
      if (isFullscreen && isPlaying) {
        setShowControls(true);
        inactivityTimeout = setTimeout(() => {
          setShowControls(false);
          setShowSpeedMenu(false);
          setShowQualityMenu(false);
        }, 3000);
      }
    };

    const handleMouseMove = () => {
      if (isFullscreen && isPlaying) {
        resetInactivityTimer();
      }
    };

    // Always show controls when not in fullscreen or when paused
    if (!isFullscreen || !isPlaying) {
      setShowControls(true);
      if (inactivityTimeout) {
        clearTimeout(inactivityTimeout);
        inactivityTimeout = null;
      }
    }

    // Add mouse tracking for fullscreen
    if (isFullscreen && isPlaying) {
      document.addEventListener('mousemove', handleMouseMove);
      resetInactivityTimer(); // Start the timer immediately
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (inactivityTimeout) {
        clearTimeout(inactivityTimeout);
      }
    };
  }, [isFullscreen, isPlaying]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!currentVideo || currentVideo.type !== 'video') return;
      
      // Check if user is typing in an input field or textarea
      const activeElement = document.activeElement;
      const isTyping = activeElement && (
        activeElement.tagName === 'INPUT' || 
        activeElement.tagName === 'TEXTAREA' || 
        activeElement.contentEditable === 'true'
      );
      
      // Don't trigger shortcuts if user is typing
      if (isTyping) return;
      
      // Prevent default behavior for our handled keys
      if (['Space', 'ArrowLeft', 'ArrowRight', 'KeyF', 'KeyM'].includes(e.code)) {
        e.preventDefault();
      }
      
      // Close menus when any key is pressed
      setShowSpeedMenu(false);
      setShowQualityMenu(false);
      
      switch (e.code) {
        case 'Space':
          togglePlay();
          setShowControls(true); // Show controls when interacting
          break;
        case 'ArrowLeft':
          skipBackward();
          setShowControls(true);
          break;
        case 'ArrowRight':
          skipForward();
          setShowControls(true);
          break;
        case 'KeyF':
          toggleFullscreen();
          setShowControls(true);
          break;
        case 'KeyM':
          toggleMute();
          setShowControls(true);
          break;
        case 'Escape':
          if (isFullscreen) {
            document.exitFullscreen();
          }
          break;
        default:
          break;
      }
    };

    // Add event listener to document to ensure it works in fullscreen
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentVideo, isPlaying, isFullscreen]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleTopic = (topicId) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  const selectLesson = (lesson) => {
    if (lesson.type === 'video') {
      setCurrentVideo(lesson);
      navigate(`/learn/${courseId}/lesson/${lesson.id}`);
    }
  };

  const getNextLesson = () => {
    if (!currentVideo) return null;
    
    let foundCurrent = false;
    for (const topic of course.topics) {
      for (const subtopic of topic.subtopics) {
        if (foundCurrent && subtopic.type === 'video') {
          return subtopic;
        }
        if (subtopic.id === currentVideo.id) {
          foundCurrent = true;
        }
      }
    }
    return null;
  };

  const getPreviousLesson = () => {
    if (!currentVideo) return null;
    
    let previousVideo = null;
    for (const topic of course.topics) {
      for (const subtopic of topic.subtopics) {
        if (subtopic.id === currentVideo.id) {
          return previousVideo;
        }
        if (subtopic.type === 'video') {
          previousVideo = subtopic;
        }
      }
    }
    return null;
  };

  const nextLesson = getNextLesson();
  const previousLesson = getPreviousLesson();

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Course not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 pt-16">
      <div className="flex h-screen">
        {/* Main Video Area */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'mr-96' : 'mr-0'}`}>
          {/* Video Player */}
          <div 
            className="relative bg-black flex-1 flex items-center justify-center group cursor-pointer"
            onClick={togglePlay}
            style={{ 
              WebkitUserSelect: 'none',
              userSelect: 'none'
            }}
            onMouseDown={() => {
              setShowSpeedMenu(false);
              setShowQualityMenu(false);
            }}
          >
            {currentVideo && currentVideo.type === 'video' ? (
              <>
                <video
                  ref={videoRef}
                  className="w-full h-full object-contain"
                  src={currentVideo.videoUrl}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  controls={false}
                  disablePictureInPicture
                  controlsList="nodownload noplaybackrate noremoteplayback"
                  preload="metadata"
                  style={{ outline: 'none', pointerEvents: 'none' }}
                />
                
                {/* Video Controls */}
                <AnimatePresence>
                  {(showControls || !isPlaying) && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Top Controls - Only show when not in fullscreen or when controls are visible */}
                      {!isFullscreen && (
                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto z-10">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              console.log('Navigating to dashboard...');
                              navigate('/dashboard');
                            }}
                            className="flex items-center space-x-2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-colors cursor-pointer relative z-20"
                          >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Back to Dashboard</span>
                          </button>
                          
                          <div className="text-white text-right pointer-events-none">
                            <h2 className="text-lg font-semibold">{currentVideo.title}</h2>
                            <p className="text-sm text-gray-300">{course.title}</p>
                          </div>
                        </div>
                      )}

                      {/* Fullscreen top controls */}
                      {isFullscreen && (
                        <div className="absolute top-4 left-4 right-4 flex items-center justify-center pointer-events-none">
                          <div className="text-white text-center">
                            <h2 className="text-lg font-semibold">{currentVideo.title}</h2>
                            <p className="text-sm text-gray-300">{course.title}</p>
                          </div>
                        </div>
                      )}

                      {/* Center Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePlay();
                          }}
                          className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300 cursor-pointer"
                        >
                          {isPlaying ? (
                            <Pause className="w-8 h-8 text-white" />
                          ) : (
                            <Play className="w-8 h-8 text-white ml-1" />
                          )}
                        </button>
                      </div>

                      {/* Skip buttons - Always visible on hover */}
                      <div className="absolute inset-0 flex items-center justify-between px-8 pointer-events-auto">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            skipBackward();
                          }}
                          className="w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 hover:bg-black/70 transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
                          title="Skip back 10 seconds (←)"
                        >
                          <div className="flex items-center">
                            <SkipBack className="w-4 h-4 text-white" />
                            <span className="text-xs text-white ml-1">10</span>
                          </div>
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            skipForward();
                          }}
                          className="w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 hover:bg-black/70 transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
                          title="Skip forward 10 seconds (→)"
                        >
                          <div className="flex items-center">
                            <span className="text-xs text-white mr-1">10</span>
                            <SkipForward className="w-4 h-4 text-white" />
                          </div>
                        </button>
                      </div>

                      {/* Bottom Controls - Always show the full control bar */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-auto">
                        {/* Progress Bar */}
                        <div className="relative">
                          <div
                            data-progress-bar
                            className={`w-full h-2 bg-gray-600 rounded-full cursor-pointer mb-4 transition-all duration-200 relative ${
                              showHoverTime || isDragging ? 'h-3' : 'hover:h-3'
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleProgressClick(e);
                            }}
                            onMouseDown={(e) => {
                              handleProgressMouseDown(e);
                            }}
                            onMouseMove={handleProgressMouseMove}
                            onMouseEnter={handleProgressMouseEnter}
                            onMouseLeave={handleProgressMouseLeave}
                          >
                            <div
                              className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full transition-all duration-200"
                              style={{ width: `${progress}%` }}
                            ></div>
                            
                            {/* Progress Bar Thumb/Handle */}
                            <div 
                              className={`absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg border-2 border-cyan-500 transition-opacity duration-200 ${
                                isDragging || showHoverTime ? 'opacity-100' : 'opacity-0 hover:opacity-100'
                              }`}
                              style={{ left: `${progress}%`, marginLeft: '-6px' }}
                            ></div>
                            
                            {/* Time Preview Tooltip */}
                            {showHoverTime && duration > 0 && (
                              <div 
                                className="absolute bottom-6 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded pointer-events-none z-10 whitespace-nowrap"
                                style={{ 
                                  left: `${hoverPosition}px`
                                }}
                              >
                                {formatTime(hoverTime)}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Control Buttons */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                togglePlay();
                              }}
                              className="text-white hover:text-cyan-400 transition-colors cursor-pointer"
                              title="Play/Pause (Space)"
                            >
                              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                            </button>
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                skipBackward();
                              }}
                              className="text-white hover:text-cyan-400 transition-colors cursor-pointer"
                              title="Skip back 10 seconds (←)"
                            >
                              <div className="flex items-center">
                                <SkipBack className="w-5 h-5" />
                                <span className="text-xs ml-1">10</span>
                              </div>
                            </button>
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                skipForward();
                              }}
                              className="text-white hover:text-cyan-400 transition-colors cursor-pointer"
                              title="Skip forward 10 seconds (→)"
                            >
                              <div className="flex items-center">
                                <span className="text-xs mr-1">10</span>
                                <SkipForward className="w-5 h-5" />
                              </div>
                            </button>
                            
                            {!isFullscreen && (
                              <>
                                <button
                                  onClick={() => previousLesson && selectLesson(previousLesson)}
                                  disabled={!previousLesson}
                                  className="text-white hover:text-cyan-400 transition-colors disabled:text-gray-500 cursor-pointer disabled:cursor-not-allowed"
                                  title="Previous lesson"
                                >
                                  <div className="flex items-center">
                                    <SkipBack className="w-5 h-5" />
                                    <SkipBack className="w-5 h-5 -ml-2" />
                                  </div>
                                </button>
                                
                                <button
                                  onClick={() => nextLesson && selectLesson(nextLesson)}
                                  disabled={!nextLesson}
                                  className="text-white hover:text-cyan-400 transition-colors disabled:text-gray-500 cursor-pointer disabled:cursor-not-allowed"
                                  title="Next lesson"
                                >
                                  <div className="flex items-center">
                                    <SkipForward className="w-5 h-5" />
                                    <SkipForward className="w-5 h-5 -ml-2" />
                                  </div>
                                </button>
                              </>
                            )}

                            <div className="flex items-center space-x-2">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleMute();
                                }}
                                className="text-white hover:text-cyan-400 transition-colors cursor-pointer"
                                title="Mute/Unmute (M)"
                              >
                                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                              </button>
                              <div 
                                className="relative w-20"
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                onMouseDown={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                <input
                                  type="range"
                                  min="0"
                                  max="1"
                                  step="0.1"
                                  value={isMuted ? 0 : volume}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    handleVolumeChange(e);
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                  onMouseDown={(e) => {
                                    e.stopPropagation();
                                  }}
                                  onMouseUp={(e) => {
                                    e.stopPropagation();
                                  }}
                                  className="w-full h-1 bg-gray-600 rounded-lg appearance-none slider cursor-pointer"
                                  title="Volume"
                                  style={{
                                    background: `linear-gradient(to right, #06b6d4 0%, #8b5cf6 ${(isMuted ? 0 : volume) * 100}%, #475569 ${(isMuted ? 0 : volume) * 100}%, #475569 100%)`
                                  }}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4">
                            <span className="text-white text-sm pointer-events-none">
                              {formatTime(currentTime)} / {formatTime(duration)}
                            </span>
                            
                            {/* Speed Control */}
                            <div 
                              className="relative"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log('Speed button clicked, current:', playbackSpeed);
                                  console.log('Available speeds:', [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]);
                                  setShowSpeedMenu(prev => {
                                    console.log('Toggling speed menu from', prev, 'to', !prev);
                                    return !prev;
                                  });
                                  setShowQualityMenu(false);
                                }}
                                className="text-white hover:text-cyan-400 transition-colors cursor-pointer flex items-center space-x-1 px-2 py-1 rounded bg-slate-800/50 border border-slate-600 hover:border-cyan-400"
                                title="Playback speed"
                              >
                                <Zap className="w-4 h-4" />
                                <span className="text-xs font-medium">{playbackSpeed}x</span>
                                <ChevronDown className="w-3 h-3" />
                              </button>
                              
                              {showSpeedMenu && (
                                <div className="absolute bottom-full right-0 mb-2 bg-black/90 backdrop-blur-sm rounded-lg border border-slate-600 py-2 min-w-[80px]">
                                  {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((speed) => {
                                    const isSelected = playbackSpeed === speed;
                                    console.log(`Speed ${speed}: current=${playbackSpeed}, isSelected=${isSelected}`);
                                    return (
                                      <button
                                        key={speed}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          console.log(`Speed ${speed} clicked, current: ${playbackSpeed}, selected: ${isSelected}`);
                                          handleSpeedChange(speed);
                                        }}
                                        className={`w-full px-3 py-1 text-left text-sm transition-colors flex items-center justify-between ${
                                          isSelected 
                                            ? 'text-cyan-400 bg-cyan-900/30 font-semibold' 
                                            : 'text-white hover:bg-slate-700'
                                        }`}
                                      >
                                        <span>{speed}x</span>
                                        {isSelected && <span className="text-cyan-400">✓</span>}
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>

                            {/* Quality Control */}
                            <div 
                              className="relative"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log('Quality button clicked, current:', videoQuality);
                                  console.log('Available qualities:', ['auto', '1080p', '720p', '480p', '360p']);
                                  setShowQualityMenu(prev => {
                                    console.log('Toggling quality menu from', prev, 'to', !prev);
                                    return !prev;
                                  });
                                  setShowSpeedMenu(false);
                                }}
                                className="text-white hover:text-cyan-400 transition-colors cursor-pointer flex items-center space-x-1 px-2 py-1 rounded bg-slate-800/50 border border-slate-600 hover:border-cyan-400"
                                title="Video quality"
                              >
                                <Settings className="w-4 h-4" />
                                <span className="text-xs font-medium">{videoQuality}</span>
                                <ChevronDown className="w-3 h-3" />
                              </button>
                              
                              {showQualityMenu && (
                                <div className="absolute bottom-full right-0 mb-2 bg-black/90 backdrop-blur-sm rounded-lg border border-slate-600 py-2 min-w-[100px]">
                                  {['auto', '1080p', '720p', '480p', '360p'].map((quality) => {
                                    const isSelected = videoQuality === quality;
                                    console.log(`Quality ${quality}: current=${videoQuality}, isSelected=${isSelected}`);
                                    return (
                                      <button
                                        key={quality}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          console.log(`Quality ${quality} clicked, current: ${videoQuality}, selected: ${isSelected}`);
                                          handleQualityChange(quality);
                                        }}
                                        className={`w-full px-3 py-1 text-left text-sm transition-colors flex items-center justify-between ${
                                          isSelected 
                                            ? 'text-cyan-400 bg-cyan-900/30 font-semibold' 
                                            : 'text-white hover:bg-slate-700'
                                        }`}
                                      >
                                        <span>{quality}</span>
                                        {isSelected && <span className="text-cyan-400">✓</span>}
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                            
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFullscreen();
                              }}
                              className="text-white hover:text-cyan-400 transition-colors cursor-pointer"
                              title={isFullscreen ? "Exit fullscreen (F or Esc)" : "Enter fullscreen (F)"}
                            >
                              <Maximize className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Keyboard shortcuts help - Show briefly when entering fullscreen */}
                      {isFullscreen && (
                        <motion.div
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-sm rounded-lg p-4 text-white text-sm pointer-events-none"
                          initial={{ opacity: 1 }}
                          animate={{ opacity: 0 }}
                          transition={{ delay: 2, duration: 1 }}
                        >
                          <div className="text-center">
                            <div className="text-xs text-gray-300 mb-2">Keyboard Shortcuts:</div>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>Space: Play/Pause</div>
                              <div>F: Fullscreen</div>
                              <div>←: Back 10s</div>
                              <div>→: Forward 10s</div>
                              <div>M: Mute</div>
                              <div>Esc: Exit</div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <div className="text-center text-white">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold mb-2">
                  {currentVideo ? currentVideo.title : 'Select a lesson to start learning'}
                </h3>
                {currentVideo && currentVideo.type === 'quiz' && (
                  <p className="text-gray-300">This is a quiz lesson. Quiz functionality coming soon!</p>
                )}
                {currentVideo && currentVideo.type === 'project' && (
                  <p className="text-gray-300">This is a project lesson. Project workspace coming soon!</p>
                )}
              </div>
            )}
          </div>

          {/* Lesson Info Panel */}
          {currentVideo && (
            <motion.div 
              className="bg-slate-800 p-6 border-t border-slate-700"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{currentVideo.title}</h3>
                  <p className="text-gray-300 mb-3">{currentVideo.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{currentVideo.duration}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span className={`w-2 h-2 rounded-full ${currentVideo.completed ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                      <span>{currentVideo.completed ? 'Completed' : 'Not completed'}</span>
                    </span>
                  </div>
                </div>
                
                {!currentVideo.completed && (
                  <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all duration-300">
                    Mark Complete
                  </button>
                )}
              </div>

              {/* Lesson Navigation */}
              <div className="flex items-center justify-between">
                {previousLesson ? (
                  <button
                    onClick={() => selectLesson(previousLesson)}
                    className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                  >
                    <SkipBack className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                ) : (
                  <div></div>
                )}
                
                {nextLesson && (
                  <button
                    onClick={() => selectLesson(nextLesson)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    <span>Next Lesson</span>
                    <SkipForward className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              className={`fixed right-0 w-96 bg-slate-800 border-l border-slate-700 flex flex-col ${
                isFullscreen ? 'top-0 bottom-0 z-[99999]' : 'top-16 bottom-0 z-30'
              }`}
              initial={{ x: 384 }}
              animate={{ x: 0 }}
              exit={{ x: 384 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              style={{
                zIndex: isFullscreen ? 99999 : 30
              }}
            >
              {/* Sidebar Header */}
              <div className="p-4 border-b border-slate-700 flex-shrink-0">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">{course.title}</h2>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Tabs */}
                <div className="flex space-x-1 bg-slate-700 p-1 rounded-lg">
                  <button
                    onClick={() => setActiveTab('curriculum')}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'curriculum'
                        ? 'bg-cyan-500 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Curriculum
                  </button>
                  <button
                    onClick={() => setActiveTab('notes')}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'notes'
                        ? 'bg-cyan-500 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Notes
                  </button>
                </div>
              </div>

              {/* Sidebar Content */}
              <div className="flex-1 overflow-y-auto p-4 min-h-0">
                {activeTab === 'curriculum' && (
                  <div className="space-y-4">
                    {course.topics.map((topic) => (
                      <div key={topic.id} className="border border-slate-600 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleTopic(topic.id)}
                          className="w-full p-4 bg-slate-700 hover:bg-slate-600 transition-colors text-left"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-white">{topic.title}</h3>
                              <p className="text-sm text-gray-400">{topic.duration} • {topic.subtopics.length} lessons</p>
                            </div>
                            {expandedTopics[topic.id] ? (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        </button>
                        
                        <AnimatePresence>
                          {expandedTopics[topic.id] && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="p-2 bg-slate-700/50">
                                {topic.subtopics.map((subtopic) => (
                                  <button
                                    key={subtopic.id}
                                    onClick={() => selectLesson(subtopic)}
                                    className={`w-full p-3 mb-2 rounded-lg text-left hover:bg-slate-600 transition-colors ${
                                      currentVideo?.id === subtopic.id ? 'bg-cyan-500/20 border border-cyan-500/50' : ''
                                    }`}
                                  >
                                    <div className="flex items-start space-x-3">
                                      <div className="mt-1">
                                        {subtopic.type === 'video' && (
                                          <Play className="w-4 h-4 text-cyan-400" />
                                        )}
                                        {subtopic.type === 'quiz' && (
                                          <Award className="w-4 h-4 text-yellow-400" />
                                        )}
                                        {subtopic.type === 'project' && (
                                          <BookOpen className="w-4 h-4 text-green-400" />
                                        )}
                                      </div>
                                      <div className="flex-1">
                                        <h4 className="text-sm font-medium text-white">{subtopic.title}</h4>
                                        <p className="text-xs text-gray-400">{subtopic.duration}</p>
                                      </div>
                                      {subtopic.completed && (
                                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-1" />
                                      )}
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'notes' && (
                  <div>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Take notes while learning..."
                      className="w-full h-64 p-4 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 resize-none focus:border-cyan-500 focus:outline-none"
                    />
                    <button className="mt-4 w-full py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300">
                      Save Notes
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sidebar Toggle Button */}
        {!sidebarOpen && (
          <motion.button
            onClick={() => setSidebarOpen(true)}
            className="fixed right-4 top-24 z-40 p-3 bg-slate-800 border border-slate-700 rounded-lg text-white hover:bg-slate-700 transition-colors"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Menu className="w-5 h-5" />
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default CourseLearning;
