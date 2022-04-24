import React, { useState } from 'react';
import useSpotify from '../hooks/useSpotify';
import spotifyApi from '../lib/spotify';

function Search() {
  const [searchData, setSearchData] = useState();
  const spotifyApi = useSpotify();
  const search = (text) => {
    spotifyApi.search(text, ['artist', 'album', 'track']).then((data) => {
      console.log(data.body);
    });
  };

  return (
    <div className="h-screen">
      <input
        onChange={(e) => search(e.target.value)}
        placeholder="Search"
      ></input>
    </div>
  );
}

export default Search;
