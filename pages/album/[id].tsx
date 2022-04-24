import { shuffle } from 'lodash';
import { getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import AlbumSongs from '../../components/AlbumSongs';
import Header from '../../components/Header';
import Songs from '../../components/songs';
import useSpotify from '../../hooks/useSpotify';

function Playlist({ albumId }) {
  const [color, setcolor] = useState(null);
  const [album, setAlbum] = useState(null);
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
  }, [albumId]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getAlbum(albumId)
        .then((data: any) => {
          setAlbum(data.body);
          setSongs(data.body.tracks?.items);
        })
        .catch((err) => console.log('something went wrong', err));
    }
  }, [spotifyApi, albumId]);

  return (
    <div className="h-screen flex-grow overflow-y-scroll text-white scrollbar-hide">
      <Header data={album} type="album" />
      <section>
        <AlbumSongs songs={songs} />
      </section>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  return {
    props: { albumId: ctx.params.id, session },
  };
}

export default Playlist;
