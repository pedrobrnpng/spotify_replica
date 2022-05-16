import type { AppProps } from 'next/app';
import { getSession, SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import '../styles/globals.css';
import Sidebar from '../components/sidebar';
import { useRouter } from 'next/router';
import RightSideBar from '../components/RightSideBar';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();

  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        {router.pathname !== '/login' ? (
          <div className="bg-pearl">
            <main className="flex justify-between p-8">
              <Sidebar />
              <Component {...pageProps} />
              <RightSideBar />
            </main>
            <div className="sticky bottom-0"></div>
          </div>
        ) : (
          <Component {...pageProps} />
        )}
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
