import React from 'react';

function RecommendedSongs({ recommendedSongs }) {
  return (
    <div className="space-y-4 pb-6">
      <h4 className="text-lg font-semibold">Recommended Songs</h4>
      <div className="flex space-x-4 overflow-x-scroll scrollbar-hide">
        {recommendedSongs.map((song, idx) => (
          <div
            key={`${song.name}-${song.album.name}-${idx}`}
            className="space-y-2"
          >
            <img
              className="shadow-md"
              src={song.album.images[0].url}
              alt={`${song.name}-${song.album.name}`}
            />
            <div>
              <p className="w-24 truncate">{song.name}</p>
              <p className="w-24 truncate text-gray-700">
                {song.artists[0].name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendedSongs;
