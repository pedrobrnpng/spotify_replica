import React from 'react';
import Header from '../../components/Header';
import Songs from '../../components/songs';
import { getSpotify } from '../../hooks/useSpotify';

function Playlist({ songs, playlist }) {
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
  const spotifyApi = await getSpotify(ctx);

  const playlist = await spotifyApi
    .getPlaylist(ctx.params.id)
    .then((data: any) => {
      return data.body;
    })
    .catch((err) => console.log('something went wrong', err));

  const songs = playlist.tracks.items.map((item) => item.track);

  return {
    props: { playlist, songs },
  };
}

export default Playlist;
