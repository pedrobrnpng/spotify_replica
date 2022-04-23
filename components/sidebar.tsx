import {
  HomeIcon,
  LibraryIcon,
  SearchIcon,
  PlusCircleIcon,
  RssIcon,
  HeartIcon,
  UserIcon,
} from '@heroIcons/react/outline';
import { signOut, useSession } from 'next-auth/react';

function Sidebar() {
  const { data: session, status } = useSession();

  return (
    <div className="md:text-md flex h-screen flex-col overflow-y-scroll border-r border-gray-900 p-5 text-sm text-gray-500 scrollbar-hide">
      <div className="space-y-4">
        <button
          onClick={() => signOut()}
          className="flex items-center space-x-2 transition-all hover:text-white"
        >
          <UserIcon className="h-5 w-5" />
          <p>Log out</p>
        </button>
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

        {/** Playlists */}

        <p className="cursor-pointer transition-all hover:text-white">
          Playlist name...
        </p>
        <p className="cursor-pointer transition-all hover:text-white">
          Playlist name...
        </p>
        <p className="cursor-pointer transition-all hover:text-white">
          Playlist name...
        </p>
        <p className="cursor-pointer transition-all hover:text-white">
          Playlist name...
        </p>
        <p className="cursor-pointer transition-all hover:text-white">
          Playlist name...
        </p>
        <p className="cursor-pointer transition-all hover:text-white">
          Playlist name...
        </p>
        <p className="cursor-pointer transition-all hover:text-white">
          Playlist name...
        </p>
        <p className="cursor-pointer transition-all hover:text-white">
          Playlist name...
        </p>
        <p className="cursor-pointer transition-all hover:text-white">
          Playlist name...
        </p>
        <p className="cursor-pointer transition-all hover:text-white">
          Playlist name...
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
