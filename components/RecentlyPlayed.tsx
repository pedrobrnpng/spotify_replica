import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentTrackIdState } from '../atoms/songAtom';
import useSpotify from '../hooks/useSpotify';
import { timePassed } from '../lib/time';

function RecentlyPlayed() {
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);

  const spotifyApi = useSpotify();
  const router = useRouter();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getMyRecentlyPlayedTracks({ limit: 5 })
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
    <div>
      <h4 className="text-2xl">Recently Played</h4>
      {recentlyPlayed.map((item, idx) => (
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
  );
}

export default RecentlyPlayed;
