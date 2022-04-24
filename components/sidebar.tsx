import {
  HomeIcon,
  LibraryIcon,
  SearchIcon,
  PlusCircleIcon,
  RssIcon,
  HeartIcon,
} from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';

function Sidebar() {
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  const spotifyApi = useSpotify();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data: any) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div className="md:text-md hidden h-screen flex-col overflow-y-scroll border-r border-gray-900 p-5 pb-36 text-xs text-gray-500 scrollbar-hide sm:max-w-[12rem] md:inline-flex lg:max-w-[15rem] lg:text-sm">
      <div className="space-y-4">
        <button className="flex items-center space-x-2 transition-all hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 transition-all hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 transition-all hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        <button className="flex items-center space-x-2 transition-all hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 transition-all hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Your Episodes</p>
        </button>
        <button className="flex items-center space-x-2 transition-all hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        {playlists.map((playlist: any) => (
          <p
            className="cursor-pointer transition-all hover:text-white"
            key={playlist.id}
            onClick={() => setPlaylistId(playlist.id)}
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
