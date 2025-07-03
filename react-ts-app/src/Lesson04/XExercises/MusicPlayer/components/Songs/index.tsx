import Equalizer from '../Equalizer';
import LoveButton from '../LoveButton';
import styles from './songs.module.css';

import type { Song } from '../types';
import PlayerContext from '../Context';
import { useContext } from 'react';

// Use ContextAPI

type Props = {
  onClick?: () => void;
};

// Danh sách các bài hát
export default function Songs({ onClick }: Props) {
  const { playing, songs, selectedSongIndex, setSelectedSongIndex } = useContext(PlayerContext);
  const selectedSong = songs[selectedSongIndex] || null;

  const handleOnClick = (song: Song) => () => {
    const i = songs.findIndex((s) => s.id === song.id);
    setSelectedSongIndex(i);
    if (onClick && typeof onClick === 'function') {
      onClick();
    }
  };

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration - minutes * 60;

    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  return (
    <div>
      {songs.map((song, index) => {
        const isSelected = selectedSong && selectedSong.id === song.id;

        return (
          <div key={`song-${song.id}`} className={styles.song_container}>
            <div style={{ display: 'flex', alignItems: 'center', width: 40 }}>
              {isSelected && playing && <Equalizer />}
              {!isSelected && <span className={styles.number}>{index + 1}</span>}
            </div>
            <div style={{ paddingRight: 4 }}>
              <img src={song.imageUrl} style={{ height: 48, width: 48 }} alt='' onClick={handleOnClick(song)} />
            </div>

            <div className={styles.song_text_container} onClick={handleOnClick(song)}>
              <div className={styles.song_text} style={{ color: isSelected ? '#4834d4' : 'inherit', fontWeight: isSelected ? '600' : '400' }}>
                {song.title}
              </div>
              <div style={{ fontSize: 12, marginTop: 2, fontFamily: 'Roboto, sans-serif' }}>{song.artist}</div>
            </div>
            <div className={styles.song_duration_container}>
              <span className={styles.song_duration_text}>{formatDuration(song.duration)}</span>
              <LoveButton />
            </div>
          </div>
        );
      })}
    </div>
  );
}
