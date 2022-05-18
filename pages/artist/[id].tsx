import { PlayIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import Songs from '../../components/songs';
import useSpotify, { getSpotify } from '../../hooks/useSpotify';
import { separateNumberByComma } from '../../lib/number';

function ArtistPage({ artistId, artist, followArtist, topTracks }) {
  const spotifyApi = useSpotify();
  const [userFollowsArtist, setUserFollowsArtist] = useState(followArtist);

  const follow = () => {
    if (followArtist) spotifyApi.unfollowArtists([artistId]);
    else spotifyApi.followArtists([artistId]);
    setUserFollowsArtist(!userFollowsArtist);
  };

  return (
    <section className="h-screen w-full space-y-8 p-8 text-white">
      <header className="flex items-end space-x-8">
        <img
          className="h-48 w-48 rounded-full"
          src={artist?.images[0].url}
          alt=""
        />
        <div className="space-y-4">
          <h1 className="text-5xl font-bold">{artist?.name}</h1>
          <p>
            {' '}
            {separateNumberByComma(artist?.followers?.total)} monthly listeners{' '}
          </p>
        </div>
      </header>
      <div className="flex items-center space-x-8">
        <PlayIcon className="h-20 w-20 cursor-pointer text-spotify-green transition-all hover:scale-110" />
        <button
          className="h-10 cursor-pointer rounded-sm border-[1px] border-gray-400 px-2 font-semibold uppercase hover:border-white"
          onClick={() => follow()}
        >
          {userFollowsArtist ? 'Following' : 'Follow'}
        </button>
      </div>
      <div className="w-full">
        <h4 className="pb-8 text-2xl font-bold">Popular tracks</h4>
        <Songs songs={topTracks} />
      </div>
    </section>
  );
}

export async function getServerSideProps(ctx) {
  const spotifyApi = await getSpotify(ctx);

  const artistId = ctx.params.id;

  let artist = await spotifyApi.getArtist(artistId).then((data) => {
    return data.body;
  });

  let followArtist = await spotifyApi
    .isFollowingArtists([artistId])
    .then((data) => {
      return data.body[0];
    });

  let topTracks = await spotifyApi
    .getArtistTopTracks(artistId, 'PT')
    .then((data) => {
      return data.body.tracks.slice(0, 5);
    });

  return {
    props: { artistId, artist, followArtist, topTracks },
  };
}

export default ArtistPage;
