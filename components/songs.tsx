import React from 'react';
import { useRecoilValue } from 'recoil';
import { playlistState } from '../atoms/playlistAtom';
import Song from './song';

function Songs() {
  const playlist = useRecoilValue(playlistState);

  console.log(playlist);

  return (
    <div className="flex flex-col space-y-1 px-8 pb-28 text-white">
      {playlist?.tracks.items.map((song: any, index) => (
        <Song key={song.track.id} track={song} order={index} />
      ))}
    </div>
  );
}

export default Songs;
