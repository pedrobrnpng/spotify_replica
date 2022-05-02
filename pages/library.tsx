import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Cardview } from '../components/CardView';
import useSpotify from '../hooks/useSpotify';

/**
 * need to add infinite scroll
 * @returns
 */

function Library() {
  const spotifyApi = useSpotify();
  const [fetchData, setData] = useState([]);
  const [typeData, setTypeData] = useState('playlist');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [offset, setOffset] = useState(0);

  const changeData = async (e) => {
    setTypeData(e.target.id);
    setData([]);
    setOffset(0);
  };

  const getData = async () => {
    setLoading(true);

    if (typeData === 'playlist') {
      await spotifyApi
        .getUserPlaylists({ limit: 10, offset })
        .then((data) => {
          setData((old) => [...old, ...data.body.items]);
        })
        .catch((err) => {
          console.log('something went wrong', err);
        });
    }
    if (typeData === 'artist') {
      await spotifyApi
        .getFollowedArtists({ limit: 50 })
        .then((data) => {
          setData(data.body.artists.items);
        })
        .catch((err) => {
          console.log('something went wrong', err);
        });
    }
    if (typeData === 'album') {
      await spotifyApi
        .getMySavedAlbums({ limit: 10, offset })
        .then((data) => {
          setData((old) => [...old, ...data.body.items.map((e) => e.album)]);
        })
        .catch((err) => {
          console.log('something went wrong', err);
        });
    }
    setOffset(offset + 10);

    setLoading(false);
  };

  const handleScroll = async (e) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop >=
      e.target.documentElement.scrollHeight
    ) {
      await getData();
    }
  };

  const loadMore = async () => {
    await getData();
  };

  useEffect(() => {
    getData();
  }, [typeData]);

  useEffect(() => {
    setData([]);
    getData();
    // document.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="h-screen overflow-y-scroll px-12 text-white scrollbar-hide">
        <header className="space-x-4 py-6 px-2">
          <button
            id="playlist"
            onClick={(e) => {
              changeData(e);
            }}
            className={`libraryButton  ${
              typeData === 'playlist' && 'bg-zinc-800'
            }`}
          >
            Playlists
          </button>
          <button
            id="artist"
            onClick={(e) => {
              changeData(e);
            }}
            className={`libraryButton ${
              typeData === 'artist' && 'bg-zinc-800'
            }`}
          >
            Artists
          </button>
          <button
            id="album"
            onClick={(e) => {
              changeData(e);
            }}
            className={`libraryButton ${typeData === 'album' && 'bg-zinc-800'}`}
          >
            Albums
          </button>
        </header>
        <h2 className="py-2 text-lg font-semibold capitalize">{typeData}s</h2>
        <Cardview typeData={typeData} data={fetchData} router={router} />
        <div className="flex justify-center py-4">
          {!loading ? (
            <button onClick={() => loadMore()}>Load More</button>
          ) : (
            <p> Loading ... </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Library;
