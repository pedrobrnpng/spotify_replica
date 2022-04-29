import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
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
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:gap-6">
          {fetchData.length > 0 ? (
            fetchData.map((item) => (
              <div
                onClick={() => {
                  router.push(`/${typeData}/${item.id}`);
                }}
                className=" flex max-w-[20rem] cursor-pointer flex-col rounded-md bg-zinc-900 p-4 transition-all hover:bg-zinc-800"
              >
                <div className="relative after:block after:pb-[100%]">
                  {!item?.images[0]?.url ? (
                    <div className="absolute flex h-full w-full items-center justify-center object-cover">
                      <svg
                        width="80"
                        height="79"
                        viewBox="0 0 80 79"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Artist Icon</title>
                        <path
                          d="M53.043 50.486L46.68 46.83c-.636-.366-1.074-.99-1.2-1.716-.125-.725.077-1.462.555-2.02l5.178-6.072c3.287-3.84 5.097-8.743 5.097-13.803V21.24c0-5.85-2.447-11.497-6.716-15.5C45.266 1.686 39.596-.343 33.66.048c-11.12.718-19.83 10.326-19.83 21.87v1.3c0 5.063 1.81 9.964 5.096 13.802l5.18 6.074c.476.558.678 1.295.553 2.02-.127.723-.563 1.35-1.202 1.717l-12.697 7.3C4.124 57.9 0 64.982 0 72.61v5.92h2.97v-5.92c0-6.562 3.548-12.653 9.265-15.902l12.702-7.3c1.407-.81 2.372-2.19 2.65-3.788.276-1.598-.17-3.22-1.222-4.454l-5.18-6.077C18.356 31.787 16.8 27.57 16.8 23.216v-1.3c0-9.982 7.49-18.287 17.05-18.906 5.124-.326 9.99 1.41 13.712 4.9 3.727 3.493 5.778 8.227 5.778 13.332v1.977c0 4.352-1.557 8.57-4.385 11.872l-5.18 6.074c-1.05 1.234-1.496 2.858-1.22 4.456.278 1.597 1.242 2.977 2.647 3.785l4.51 2.59c1.048-.61 2.16-1.12 3.33-1.51zM66.84 37.133v22.71c-2.038-2.203-4.942-3.592-8.17-3.592-6.143 0-11.14 5-11.14 11.14 0 6.143 4.996 11.14 11.14 11.14 6.142 0 11.14-4.997 11.14-11.14V42.28l8.705 5.027L80 44.732l-13.16-7.6zM58.67 75.56c-4.504 0-8.17-3.664-8.17-8.17 0-4.504 3.664-8.168 8.17-8.168 4.504 0 8.168 3.664 8.168 8.17 0 4.504-3.664 8.168-8.17 8.168z"
                          fill="currentColor"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  ) : (
                    <img
                      className={`absolute h-full w-full object-cover ${
                        typeData === 'artist' ? 'rounded-full' : 'rounded-md'
                      }`}
                      src={item?.images[0]?.url}
                      alt={item.name}
                    />
                  )}
                </div>
                <div className="truncate pt-4 text-xl">{item.name}</div>
                {typeData === 'playlist' && (
                  <p className="text-slate-300">Playlist</p>
                )}
                {typeData === 'artist' && (
                  <p className="text-slate-300">Artist</p>
                )}
                {typeData === 'album' && item.artists && (
                  <p className="text-slate-300">{item?.artists[0]?.name}</p>
                )}
              </div>
            ))
          ) : (
            <div> no data </div>
          )}
        </div>
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
