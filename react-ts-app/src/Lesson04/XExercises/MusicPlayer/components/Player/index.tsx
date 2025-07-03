import React, { useContext } from 'react';
import { IoIosPause, IoIosPlay, IoIosRepeat, IoIosShuffle, IoIosSkipBackward, IoIosSkipForward } from 'react-icons/io';

import PlayerContext from '../Context';
import Slider from '../Slider';
import styles from './player.module.css';

type Props = {
  onEnded?: () => void;
  onPlaying?: () => void;
};

const Player = React.forwardRef<HTMLAudioElement, Props>(({ onEnded, onPlaying }: Props, ref) => {
  const { refPlayer, playing, selectedSongIndex, setSelectedSongIndex, songs, setPlaying } = useContext(PlayerContext);
  const selectedSong = songs[selectedSongIndex] || null;
  const [currentTime, setCurrentTime] = React.useState(0);

  const handleOnClick = (actionName: string) => {
    switch (actionName) {
      case 'play':
        if (refPlayer && typeof refPlayer !== 'function' && refPlayer.current) {
          refPlayer.current.play();
          setPlaying(true);
        }
        break;
      case 'pause':
        if (refPlayer && typeof refPlayer !== 'function' && refPlayer.current) {
          refPlayer.current.pause();
          setPlaying(false);
        }
        break;

      case 'previous':
        setSelectedSongIndex(selectedSongIndex - 1);
        break;
      case 'next':
        setSelectedSongIndex(selectedSongIndex + 1);
        break;
      default:
        break;
    }
  };
  return (
    <div>
      {/* SLIDER */}
      <Slider
        max={selectedSong.duration}
        currentValue={currentTime}
        onChange={(value) => {
          if (typeof ref !== 'function' && ref && ref.current) {
            ref.current.currentTime = Number(value);
          }
        }}
      />
      {/* AUDIO */}
      <audio
        style={{ display: 'none' }}
        controls
        src={selectedSong.audioUrl}
        autoPlay={!!selectedSong}
        preload='auto'
        ref={refPlayer}
        onTimeUpdate={() => {
          if (typeof refPlayer !== 'function' && refPlayer && refPlayer.current) {
            setCurrentTime(refPlayer.current.currentTime);
          }
        }}
        onEnded={() => {
          if (onEnded && typeof onEnded === 'function') {
            onEnded();
            console.log('End and call next song');
          }
        }}
        onPlaying={() => {
          if (onPlaying && typeof onPlaying === 'function') {
            onPlaying();
          }
        }}
      />
      <div>
        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', marginBottom: 24 }}>
          <div style={{ display: 'flex', flex: 1, justifyContent: 'space-around', maxWidth: 320, alignItems: 'center' }}>
            <button className={styles.button} onClick={() => {}}>
              <IoIosShuffle />
            </button>
            <button className={styles.button} onClick={() => handleOnClick('previous')}>
              <IoIosSkipBackward />
            </button>
            {!playing && (
              <button className={styles.button_play} onClick={() => handleOnClick('play')}>
                <IoIosPlay />
              </button>
            )}
            {playing && (
              <button className={[styles.button_play, styles.playing].join(' ')} onClick={() => handleOnClick('pause')}>
                <IoIosPause />
              </button>
            )}
            <button className={styles.button} onClick={() => handleOnClick('next')}>
              <IoIosSkipForward />
            </button>
            <button className={styles.button} onClick={() => handleOnClick('repeat')}>
              <IoIosRepeat />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Player;
