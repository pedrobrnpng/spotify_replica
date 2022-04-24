import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import useSpotify from '../hooks/useSpotify';
import { millisToMinutesAndSeconds } from '../lib/time';

function AlbumSongs({ songs }) {
  return (
    <div className="flex flex-col space-y-1 px-8 pb-28 text-white">
      {songs?.map((song: any, index) => (
        <Song key={song.id} track={song} order={index} />
      ))}
    </div>
  );
}

function Song({ order, track }) {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = async () => {
    setCurrentTrackId(track.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [track.uri],
    });
  };

  return (
    <div
      onClick={playSong}
      className="grid cursor-pointer grid-cols-2 rounded-sm py-2 px-5 text-gray-500 transition-all hover:bg-gray-900"
    >
      <div className="flex items-center space-x-4">
        <p>{track.track_number}</p>
        {/* <img src={track.album.images[0].url} className="h-10 w-10" alt="" /> */}
        <div>
          <p className="w-36 truncate text-white lg:w-64">{track.name}</p>
          <p className="w-36 truncate lg:w-64">
            {track.artists.map((artist: any) => artist.name).join(', ')}
          </p>
        </div>
      </div>
      <div className="ml-auto flex items-center justify-between md:ml-0">
        {/* <p className="hidden w-40 md:inline">{track.album.name}</p> */}
        <p>{millisToMinutesAndSeconds(track.duration_ms)}</p>
      </div>
    </div>
  );
}

export default AlbumSongs;
