import { PlayIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import Songs from '../../components/songs';
import useSpotify from '../../hooks/useSpotify';

function ArtistPage({ artistId }) {
  const [artist, setArtist] = useState(null);
  const [followArtist, setFollowArtist] = useState<boolean>();
  const [topTracks, setTopTracks] = useState<any[]>([]);

  const spotifyApi = useSpotify();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getArtist(artistId)
        .then((data) => {
          setArtist(data.body);
        })
        .then(() => {
          spotifyApi.isFollowingArtists([artistId]).then((data) => {
            setFollowArtist(data.body[0]);
          });
        })
        .then(() => {
          spotifyApi.getArtistTopTracks(artistId, 'US').then((data) => {
            setTopTracks(data.body.tracks.slice(0, 5));
          });
        })
        .catch((err) => console.log('something went wrong', err));
    }
  }, [artistId]);

  const follow = () => {
    if (followArtist) spotifyApi.unfollowArtists([artistId]);
    else spotifyApi.followArtists([artistId]);
    setFollowArtist(!followArtist);
  };

  return (
    <section className="h-screen space-y-8 p-8 text-white">
      <header className="flex items-end space-x-8">
        <img
          className="h-48 w-48 rounded-full"
          src={artist?.images[0].url}
          alt=""
        />
        <div className="space-y-4">
          <h1 className="text-5xl font-bold">{artist?.name}</h1>
          <p> {artist?.followers?.total} monthly listeners </p>
        </div>
      </header>
      <div className="flex items-center space-x-8">
        <PlayIcon className="h-20 w-20 cursor-pointer text-spotify-green transition-all hover:scale-110" />
        <button
          className="h-10 cursor-pointer rounded-sm border-[1px] border-gray-400 px-2 font-semibold uppercase hover:border-white"
          onClick={() => follow()}
        >
          {followArtist ? 'Following' : 'Follow'}
        </button>
      </div>
      <div>
        <h4 className="pb-8 text-2xl font-bold">Popular tracks</h4>
        <Songs songs={topTracks} />
      </div>
    </section>
  );
}

export async function getServerSideProps(ctx) {
  return {
    props: { artistId: ctx.params.id },
  };
}

export default ArtistPage;
