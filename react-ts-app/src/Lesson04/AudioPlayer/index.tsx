import React, { useState, useRef, useEffect } from 'react';

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Update progress bar as audio plays
  const updateProgress = () => {
    const current = audioRef.current;
    if (current) {
      setProgress((current.currentTime / current.duration) * 100);
    }
  };

  // Play the audio
  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Pause the audio
  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Stop the audio
  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  // Set up an event listener to update the progress
  useEffect(() => {
    const current = audioRef.current;
    if (current) {
      current.addEventListener('timeupdate', updateProgress);
    }

    return () => {
      if (current) {
        current.removeEventListener('timeupdate', updateProgress);
      }
    };
  }, []);

  return (
    <div>
      <audio ref={audioRef} src={src} />
      <div>
        {!isPlaying ? <button onClick={handlePlay}>Play</button> : <button onClick={handlePause}>Pause</button>}
        <button onClick={handleStop}>Stop</button>
      </div>
      <div>
        <p>{isPlaying ? 'Playing...' : 'Paused'}</p>
      </div>
      <div>
        <progress value={progress} max='100' />
      </div>
    </div>
  );
};

export default AudioPlayer;
