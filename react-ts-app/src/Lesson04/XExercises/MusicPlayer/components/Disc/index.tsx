import { useContext } from 'react';

import { songs } from '../../data';
import PlayerContext from '../Context';
import styles from './disc.module.css';

import type { Song } from '../types';
// Use ContextAPI

export default function Disc() {
  const { playing } = useContext(PlayerContext);
  const className = [styles.disc, playing ? styles.disc_rotation : null].join(' ');

  const { selectedSongIndex } = useContext(PlayerContext);
  const song: Song = songs[selectedSongIndex];

  return (
    <div className={styles.disc_container}>
      <div className={className} style={{ backgroundImage: `url(${song.imageUrl})` }}>
        <div className={styles.disc_center}></div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', paddingTop: 24 }}>
        <span className={styles.song_title}>{song.title}</span>
        <span className={styles.song_artist}>{song.artist}</span>
      </div>
    </div>
  );
}
