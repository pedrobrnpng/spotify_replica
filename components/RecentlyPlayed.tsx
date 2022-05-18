import { useRouter } from 'next/router';
import React from 'react';

function RecentlyPlayed({ recentlyPlayed }, playSong) {
  const router = useRouter();

  return (
    <div className="flex flex-row items-center space-x-4">
      <div className="group hover:cursor-pointer">
        <img
          className="mb-4 w-40 rounded-xl shadow-md transition-all group-hover:shadow-lg"
          src={recentlyPlayed[0]?.track.album.images[0].url}
        />
        <h6 className="w-20 truncate text-sm">
          {recentlyPlayed[0]?.track.name}
        </h6>
        <p className="w-20 truncate text-xs text-gray-500">
          {recentlyPlayed[0]?.track.album?.name}
        </p>
      </div>
      <div className="flex w-full flex-col">
        {recentlyPlayed.slice(1, 3).map((item, idx) => (
          <div
            className="my-2 flex rounded-lg bg-[#f4f4f5] p-4 transition-all hover:cursor-pointer hover:rounded-md hover:bg-pearl-dark"
            key={`${idx}-${item.track.id}`}
            onClick={() => playSong(item.track)}
          >
            <img
              className="h-12 rounded-full sm:h-16"
              src={item.track.album.images[0].url}
            />
            <div className="justify-start pl-4">
              <p className="w-20 truncate text-black">{item.track.name}</p>
              <p
                onClick={() =>
                  router.push(`/artist/${item.track.artists[0].id}`)
                }
                className="truncate text-gray-500 hover:underline"
              >
                {item.track.artists[0].name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentlyPlayed;
