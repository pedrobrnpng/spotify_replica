import { SearchIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Cardview } from '../components/CardView';
import Songs from '../components/songs';
import useSpotify from '../hooks/useSpotify';
import spotifyApi from '../lib/spotify';

function Search() {
  const [searchData, setSearchData] = useState([]);
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const spotifyApi = useSpotify();
  const router = useRouter();

  const search = (text) => {
    if (text != '') {
      spotifyApi
        .search(text, [
          'artist',
          'album',
          'track',
          // 'show',
          // 'episode',
          // 'playlist',
        ])
        .then((data) => {
          setArtists(data.body.artists.items);
          setAlbums(data.body.albums.items);
          setSongs(data.body.tracks.items);
          console.log(data.body.tracks.items);
        });
    }
  };

  return (
    <div className="h-screen overflow-y-scroll text-white scrollbar-hide">
      <div className="group relative p-4">
        <input
          className="absolute rounded-full bg-slate-700 py-3 pl-12 text-white transition-all focus:bg-white focus:text-black"
          onChange={(e) => search(e.target.value)}
          placeholder="Search"
        />
        <div className="absolute top-[1.9rem] left-9 ">
          <SearchIcon className="h-5 w-5 text-white group-hover:text-black" />
        </div>
      </div>
      {songs && (
        <div className="py-8">
          <div>Songs</div>
          <Songs songs={songs} />
          <Cardview data={albums} typeData="album" router={router} />
          {/* {songs.map((song) => (
            <div key={song.id}>{song.name}</div>
          ))} */}
        </div>
      )}
    </div>
  );
}

export default Search;
