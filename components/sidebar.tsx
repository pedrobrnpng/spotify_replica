import {
  HomeIcon,
  LibraryIcon,
  SearchIcon,
  PlusCircleIcon,
  RssIcon,
  HeartIcon,
} from '@heroicons/react/outline';
import ChevronDownIcon from '@heroicons/react/solid/ChevronDownIcon';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';
import Profile from './Profile';

function Sidebar() {
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  const router = useRouter();

  const spotifyApi = useSpotify();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data: any) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  const changePlaylist = (id) => {
    setPlaylistId(id);
    router.push(`/playlist/${id}`);
  };

  return (
    <div className="md:text-md hidden h-screen w-[12rem] max-w-[36rem] flex-col overflow-y-scroll pb-36 text-xs text-gray-500 scrollbar-hide md:inline-flex lg:w-[12rem] lg:max-w-[44rem] lg:text-sm">
      <div
        onClick={() => {
          signOut();
        }}
        className="mt-10 flex cursor-pointer flex-col items-center justify-center"
      >
        <img
          className="h-14 w-14 rounded-full"
          src={session?.user.image}
          alt=""
        />
        <h2 className="ml-0 text-xl text-black">{session?.user.name}</h2>
      </div>
      <div className="flex h-screen flex-col justify-center  space-y-4">
        <button
          onClick={() => router.push('/')}
          className="flex items-center space-x-2 transition-all hover:text-white"
        >
          <HomeIcon className="mr-4 h-5 w-5" />
          <p className="font-semibold">Home</p>
        </button>
        <button
          onClick={() => router.push('/search')}
          className="flex items-center space-x-2 transition-all hover:text-white"
        >
          <SearchIcon className="mr-4 h-5 w-5" />
          <p className="font-semibold">Search</p>
        </button>
        <button
          onClick={() => router.push('/library')}
          className="flex items-center space-x-2 transition-all hover:text-white"
        >
          <LibraryIcon className="mr-4 h-5 w-5" />
          <p className="font-semibold">Your Library</p>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
