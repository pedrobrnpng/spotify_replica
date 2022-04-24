import { ChevronDownIcon } from '@heroicons/react/solid';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';

function Profile() {
  const { data: session } = useSession();
  return (
    <header className="absolute top-5 right-8">
      <div
        onClick={() => {
          signOut();
        }}
        className=" flex cursor-pointer items-center space-x-3 rounded-full bg-black p-1 pr-2 opacity-90 hover:opacity-80"
      >
        <img
          className="h-10 w-10 rounded-full"
          src={session?.user.image}
          alt=""
        />
        <h2 className="text-white">{session?.user.name}</h2>
        <ChevronDownIcon className="h-5 w-5 text-white" />
      </div>
    </header>
  );
}

export default Profile;
