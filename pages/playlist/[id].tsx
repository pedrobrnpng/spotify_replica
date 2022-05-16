import { shuffle } from 'lodash';
import { getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Songs from '../../components/songs';
import useSpotify from '../../hooks/useSpotify';

function Playlist({ playlistId }) {
  const [color, setcolor] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const spotifyApi = useSpotify();
  const [songs, setSongs] = useState([]);

  const colors = [
    'from-indigo-500',
    'from-blue-500',
    'from-green-500',
    'from-yellow-500',
    'from-orange-500',
    'from-red-500',
    'from-purple-500',
    'from-pink-500',
  ];

  useEffect(() => {
    setcolor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getPlaylist(playlistId)
        .then((data: any) => {
          setPlaylist(data.body);
          setSongs(data.body.tracks?.items.map((item: any) => item.track));
        })
        .catch((err) => console.log('something went wrong', err));
    }
  }, [spotifyApi, playlistId]);

  return (
    <div className="h-screen flex-grow overflow-y-scroll text-white scrollbar-hide">
      <Header data={playlist} type="playlist" />
      <section>
        <Songs songs={songs} />
      </section>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  return {
    props: { playlistId: ctx.params.id },
  };
}

export default Playlist;
