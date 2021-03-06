import {
  FastForwardIcon,
  VolumeUpIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  RewindIcon,
  SwitchHorizontalIcon,
} from '@heroicons/react/solid';
import { VolumeUpIcon as VolumeDownIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import useSongInfo from '../hooks/useSongInfo';
import useSpotify from '../hooks/useSpotify';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';

function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);

  const router = useRouter();

  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    spotifyApi.getMyCurrentPlayingTrack().then((data) => {
      setCurrentTrackId(data.body?.item?.id);

      spotifyApi.getMyCurrentPlaybackState().then((data) => {
        setIsPlaying(data.body?.is_playing);
      });
    });
  };

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume);
    }, 500),
    []
  );

  return (
    <div
      style={{
        backgroundImage: `url(${songInfo?.album?.images[0]?.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
      }}
      className="flex h-[24rem] w-[20rem] flex-col items-center justify-end overflow-hidden rounded-lg px-2 text-center text-xs text-white drop-shadow-xl md:px-8 md:text-base "
    >
      <div
        className="flex w-[20rem] flex-col items-center space-y-2 p-4"
        style={{
          backgroundColor: 'rgba(200,200,200,0.5)',
          backdropFilter: 'blur(5px)',
        }}
      >
        <div>
          <h3
            className="cursor-pointer text-white hover:underline"
            onClick={() => router.push(`/album/${songInfo?.album.id}`)}
          >
            {songInfo?.name}
          </h3>
          <p
            className="cursor-pointer text-gray-300 hover:underline"
            onClick={() => router.push(`/artist/${songInfo?.artists[0].id}`)}
          >
            {songInfo?.artists[0]?.name}
          </p>
        </div>
        <div className="flex items-center justify-evenly space-x-4">
          <SwitchHorizontalIcon className="button" />
          <RewindIcon
            onClick={() => spotifyApi.skipToPrevious()}
            className="button"
          />
          {!isPlaying ? (
            <PlayIcon
              onClick={() => {
                handlePlayPause();
              }}
              className="button h-10 w-10"
            />
          ) : (
            <PauseIcon
              onClick={() => {
                handlePlayPause();
              }}
              className="button h-10 w-10"
            />
          )}
          <FastForwardIcon
            className="button"
            onClick={() => spotifyApi.skipToNext()}
          />
          <ReplyIcon className="button" />
        </div>
        <div className="flex items-center justify-end space-x-2 pr-5 md:space-x-4">
          <VolumeDownIcon
            onClick={() => volume > 0 && setVolume(volume - 10)}
            className="button"
          />
          <input
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-14 md:w-28"
            type="range"
            value={volume}
            min={0}
            max={100}
          />
          <VolumeUpIcon
            onClick={() => volume < 100 && setVolume(volume + 10)}
            className="button"
          />
        </div>
      </div>
    </div>
  );
}

export default Player;
