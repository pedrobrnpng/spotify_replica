import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentTrackIdState } from '../atoms/songAtom';
import useSpotify from '../hooks/useSpotify';
import { timePassed } from '../lib/time';

function RecentlyPlayed2() {
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const router = useRouter();

  const spotifyApi = useSpotify();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getMyRecentlyPlayedTracks({ limit: 3 })
        .then((data: any) => {
          setRecentlyPlayed(data.body.items);
        })
        .then((err) => {
          console.log(err);
        });
    }
  }, [spotifyApi]);

  const playSong = (song) => {
    spotifyApi
      .play({
        uris: [song.uri],
      })
      .then(() => setCurrentTrackId(song.id));
  };
  return (
    <div className="flex w-max flex-row items-center space-x-4">
      <div>
        <img
          className="h-56 rounded-xl"
          src={recentlyPlayed[0].track.album.images[0].url}
        />
      </div>
      <div className="flex flex-col">
        {recentlyPlayed.slice(1, 3).map((item, idx) => (
          <div
            className="my-2 flex justify-between p-4 transition-all hover:cursor-pointer hover:rounded-md hover:bg-pearl-dark"
            key={`${idx}-${item.track.id}`}
            onClick={() => playSong(item.track)}
          >
            <div className="flex">
              <img
                className="h-14 rounded-full"
                src={item.track.album.images[0].url}
              />
              <div className="justify-start pl-4">
                <p className="w-36 truncate text-black">{item.track.name}</p>
                <p
                  onClick={() =>
                    router.push(`/artist/${item.track.artists[0].id}`)
                  }
                  className="truncate text-gray-500 hover:underline"
                >
                  {item.track.artists[0].name}
                </p>
              </div>
            </div>

            <p className="justify-end">{timePassed(item.played_at)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentlyPlayed2;
