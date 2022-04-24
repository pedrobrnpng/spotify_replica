import type { AppProps } from 'next/app';
import { getSession, SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import '../styles/globals.css';
import Sidebar from '../components/sidebar';
import Player from '../components/Player';
import Profile from '../components/Profile';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <div className="bg-black">
          <main className="flex">
            <Sidebar />
            <Profile />
            <Component {...pageProps} />
          </main>
          <div className="sticky bottom-0">
            <Player />
          </div>
        </div>
      </RecoilRoot>
    </SessionProvider>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: { session },
  };
}

export default MyApp;
