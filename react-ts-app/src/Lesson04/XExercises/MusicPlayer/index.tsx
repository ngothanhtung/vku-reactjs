import React from 'react';

import PlayerContext from './components/Context';
import Disc from './components/Disc';
import Player from './components/Player';
import Songs from './components/Songs';
import { songs } from './data';

function MusicPlayer() {
  const [selectedSongIndex, setSelectedSongIndex] = React.useState(0);

  const [playing, setPlaying] = React.useState(false);
  const refPlayer = React.useRef<HTMLAudioElement>(null);

  return (
    <PlayerContext.Provider
      value={{
        playing,
        setPlaying,
        refPlayer,
        selectedSongIndex,
        setSelectedSongIndex,
        currentValue: selectedSongIndex,
        songs: songs,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', padding: 24 }}>
        {/* DIA NHAC */}
        <Disc />

        {/* HTML AUDIO */}
        <Player
          onPlaying={() => {
            setPlaying(true);
          }}
          onEnded={() => {
            refPlayer.current?.pause();
            setPlaying(false);
          }}
        />

        {/* DANH SACH BAI HAT */}
        <Songs
          onClick={() => {
            refPlayer.current?.play();
          }}
        />
      </div>
    </PlayerContext.Provider>
  );
}

export default MusicPlayer;
