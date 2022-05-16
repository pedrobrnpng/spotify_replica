import { PlayIcon } from '@heroicons/react/solid';
import type { NextPage } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentTrackIdState } from '../atoms/songAtom';
import RecentlyPlayed2 from '../components/RecentlyPlayed2';
import useSpotify from '../hooks/useSpotify';

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  const [recommendations, setRecommendations] = useState([]);
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);

  const [topArtists, setTopArtists] = useState([]);

  const spotifyApi = useSpotify();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getMyTopArtists({ limit: 20 })
        .then((data) => {
          setTopArtists(data.body.items);
        })
        .then(() => {
          const ids = [];
          topArtists.map((e) => ids.push(`${e.id}`));
          spotifyApi
            .getRecommendations({
              min_energy: 0.5,
              seed_artists: ids.slice(0, 5),
              min_popularity: 50,
              limit: 3,
            })
            .then((data) => {
              console.log(data.body.tracks);

              setRecommendations(data.body.tracks);
            })
            .then((err) => {
              console.log(err);
            });
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
    <div className="h-screen px-4">
      <section className="py-4">
        <h4 className="pb-4 text-xl text-black">Popular Artists</h4>
        <div className="group flex space-x-6 hover:cursor-pointer">
          {topArtists.slice(0, 5).map((artist) => (
            <div className="flex w-24 flex-col items-center space-y-2">
              <img
                className="h-20 rounded-full shadow-md"
                src={artist.images[0].url}
              />
              <p className="max-w-24 truncate">{artist.name}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="py-4">
        <h4 className="pb-4 text-xl text-black">Recommended Songs</h4>
        <div className="flex space-x-6">
          {recommendations.map((song) => (
            <div className="group hover:cursor-pointer">
              <div
                style={{
                  backgroundImage: `url(${song.album.images[0].url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                className="mb-4 h-56 w-44 rounded-xl shadow-md transition-all group-hover:shadow-lg"
              ></div>
              <h6 className="w-20 truncate text-sm">{song.name}</h6>
              <p className="w-20 truncate text-xs text-gray-500">
                {song.album.name}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="py-4">
        <h4 className="pb-4 text-xl text-black">Recently Played</h4>
        <RecentlyPlayed2 />
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: { session },
  };
}

export default Home;
