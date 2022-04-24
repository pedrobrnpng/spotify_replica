import React from 'react';
import Song from './song';

function Songs({ songs }) {
  return (
    <div className="flex flex-col space-y-1 px-8 pb-28 text-white">
      {songs?.map((song: any, index) => (
        <Song key={song.id} track={song} order={index} />
      ))}
    </div>
  );
}

export default Songs;
