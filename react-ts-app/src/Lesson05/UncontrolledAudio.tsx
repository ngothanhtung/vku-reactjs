import { useRef } from 'react';

export default function UncontrolledAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset to the beginning
    }
  };

  return (
    <div>
      <audio ref={audioRef}>
        <source src='/assets/Song-Xa-Anh-Chang-De-Dang-Bao-Anh.mp3' type='audio/mpeg' />
        Your browser does not support the audio element.
      </audio>

      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
}
