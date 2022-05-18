import React from 'react';
import { useRecoilState } from 'recoil';
import { currentTrackIdState } from '../atoms/songAtom';
import RecentlyPlayed from '../components/RecentlyPlayed';
import RecommendedSongs from '../components/RecommendedSongs';
import TopArtists from '../components/TopArtists';
import useSpotify, { getSpotify } from '../hooks/useSpotify';

const Home = ({ topArtists, recommendedSongs, recentlyPlayed }) => {
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);

  const spotifyApi = useSpotify();

  const playSong = (song) => {
    spotifyApi
      .play({
        uris: [song.uri],
      })
      .then(() => setCurrentTrackId(song.id));
  };

  return (
    <div className="flex flex-col px-8 py-10">
      <TopArtists topArtists={topArtists} {...playSong} />
      <RecommendedSongs recommendedSongs={recommendedSongs} {...playSong} />
      <RecentlyPlayed recentlyPlayed={recentlyPlayed} {...playSong} />
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const spotifyApi = await getSpotify(ctx);

  let recentlyPlayed = await spotifyApi
    .getMyRecentlyPlayedTracks({ limit: 3 })
    .then((data) => {
      return data.body.items;
    });

  let topArtists = await spotifyApi
    .getMyTopArtists({ limit: 5 })
    .then((data) => {
      return data.body.items;
    })
    .catch((err) => console.error(err));

  const ids = [];
  let recommendedSongs;
  if (topArtists) {
    topArtists.forEach((artist) => {
      ids.push(artist.id);
    });

    recommendedSongs = await spotifyApi
      .getRecommendations({
        min_energy: 0.5,
        min_popularity: 50,
        seed_artists: ids,
        limit: 4,
      })
      .then((data) => {
        return data.body.tracks;
      })
      .catch((err) => console.error(err));
  }

  return { props: { recentlyPlayed, topArtists, recommendedSongs } };
};

export default Home;
