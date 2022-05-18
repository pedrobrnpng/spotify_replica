import React from 'react';
import AlbumSongs from '../../components/AlbumSongs';
import Header from '../../components/Header';
import { getSpotify } from '../../hooks/useSpotify';

function Playlist({ album, songs }) {
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
  const spotifyApi = await getSpotify(ctx);
  const albumId = ctx.params.id;

  const album = await spotifyApi
    .getAlbum(albumId)
    .then((data: any) => {
      return data.body;
    })
    .catch((err) => console.log('something went wrong', err));
  const songs = album.tracks.items;

  return {
    props: { album, songs },
  };
}

export default Playlist;
