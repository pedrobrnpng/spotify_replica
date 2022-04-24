import { getProviders, signIn } from 'next-auth/react';

function Login({ providers }: any) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black">
      <img
        className="mb-5 w-52"
        src="https://links.papareact.com/9xl"
        alt="logo"
      />
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          <button
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
            className="rounded-full bg-spotify-green p-5 text-white"
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return { props: { providers } };
}

export default Login;
