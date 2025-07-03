import React, { createContext } from 'react';

import { songs } from '../data';

const PlayerContext = createContext({
  refPlayer: React.createRef<HTMLAudioElement>(),
  songs: songs,
  playing: false,
  setPlaying: (playing: boolean) => {},
  selectedSongIndex: 0,
  setSelectedSongIndex: (index: number) => {},
  currentValue: 0,
});

export default PlayerContext;
