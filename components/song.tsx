import React from 'react';
import useSpotify from '../hooks/useSpotify';

function Song({ order, track }) {
  const spotifyApi = useSpotify();

  console.log(track);

  return (
    <div className="grid grid-cols-2">
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img
          src={track.track.album.images[0].url}
          className="h-10 w-10"
          alt=""
        />
        <div>
          <p>{track.track.name}</p>
          <p>{track.track.artists[0].name}</p>
        </div>
      </div>
      <div className="ml-auto flex items-center justify-between md:ml-0">
        <p className="hidden md:inline">{track.track.album.name}</p>
        <p>3:50</p>
      </div>
    </div>
  );
}

export default Song;
