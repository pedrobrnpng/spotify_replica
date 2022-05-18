import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import Player from './Player';
import { HomeIcon, LibraryIcon, SearchIcon } from '@heroicons/react/outline';

function RightSideBar() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="fixed right-0 hidden h-screen justify-between px-6 py-8 lg:flex lg:flex-col">
      <div
        onClick={() => {
          signOut();
        }}
        className="flex cursor-pointer flex-col items-center justify-center"
      >
        <img
          className="h-14 w-14 rounded-full"
          src={session?.user.image}
          alt=""
        />
        <h2 className="ml-0 text-xl text-black">{session?.user.name}</h2>
      </div>
      <div className="flex flex-col justify-center  space-y-4">
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
      <Player />
    </div>
  );
}

export default RightSideBar;
