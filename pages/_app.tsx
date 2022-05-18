import { getSession, SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { RecoilRoot } from 'recoil';
import RightSideBar from '../components/RightSideBar';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();

  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        {router.pathname !== '/login' ? (
          <div className="bg-pearl">
            <main className="flex justify-between overflow-hidden overflow-y-scroll">
              <div className="bg-pearl lg:pr-[21rem]">
                <Component {...pageProps} />
              </div>
              <RightSideBar />
            </main>
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
