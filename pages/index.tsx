import { PlayIcon } from '@heroicons/react/solid';
import type { NextPage } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentTrackIdState } from '../atoms/songAtom';
import useSpotify from '../hooks/useSpotify';

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  const [recentlyPlayed, setRecentlyPlayed] = useState<any[]>([]);
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);

  const spotifyApi = useSpotify();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getMyRecentlyPlayedTracks()
        .then((data: any) => {
          setRecentlyPlayed(data.body.items.slice(0, 4));
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
    <div className="h-screen p-8 pt-12">
      <h1 className="text-2xl text-white">Hello, {session?.user?.name}!</h1>
      <section className="py-8">
        <h4 className="pb-8 text-xl text-white">Your recently Played Tracks</h4>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:gap-6">
          {recentlyPlayed.map((item: any) => (
            <div
              key={item.track.id}
              className="group relative  flex cursor-pointer flex-col justify-center rounded-md bg-gray-900 py-4 px-4 transition-all hover:bg-gray-700"
              onClick={() => playSong(item.track)}
            >
              <img
                className="rounded-sm"
                src={item.track.album.images[0].url}
                alt=""
              />
              <div className="pt-4">
                <p className="truncate text-white">{item.track.name}</p>
                <p
                  onClick={() =>
                    router.push(`/artist/${item.track.artists[0].id}`)
                  }
                  className="truncate text-gray-400 hover:underline"
                >
                  {item.track.artists[0].name}
                </p>
              </div>
              <div className="absolute">
                <PlayIcon className="hidden h-16 w-16 translate-x-20 translate-y-10 text-spotify-green group-hover:block" />
              </div>
            </div>
          ))}
        </div>
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
