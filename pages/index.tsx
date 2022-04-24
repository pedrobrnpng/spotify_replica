import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Center from '../components/center';
import Player from '../components/Player';
import Sidebar from '../components/sidebar';

const Home: NextPage = () => {
  return (
    <div className="h-screen overflow-hidden bg-black">
      <Head>
        <title>Spotify 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex">
        <Sidebar />
        <Center />
      </main>
      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: { session },
  };
}

export default Home;
