import React from 'react';
import Player from './Player';
import RecentlyPlayed from './RecentlyPlayed';

function RightSideBar() {
  return (
    <div>
      <RecentlyPlayed />
      <Player />
    </div>
  );
}

export default RightSideBar;
