import React from 'react';

function TopArtists({ topArtists }) {
  return (
    <div className="space-y-4 pb-6">
      <h4 className="text-lg font-semibold">Your Top Artists</h4>
      <div className="flex space-x-4 overflow-x-scroll scrollbar-hide">
        {topArtists.map((artist, idx) => (
          <div
            key={`${idx - artist.name}`}
            className="flex max-w-[10rem] flex-col items-center space-y-2 text-center"
          >
            <img
              className="rounded-full shadow-lg"
              src={artist.images[0].url}
              alt={artist.name}
            />
            <p className="w-14 truncate sm:w-20 lg:w-28">{artist.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopArtists;
