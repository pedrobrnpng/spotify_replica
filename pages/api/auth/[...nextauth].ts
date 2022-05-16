import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import SpotifyProvider  from "next-auth/providers/spotify"
import spotifyApi, {LOGIN_URL} from '../../../lib/spotify'

async function refreshAccessToken(token: any) {
  try {

    spotifyApi.setAccessToken(token.access_token)
    spotifyApi.setRefreshToken(token.refresh_token)

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken()

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000, // = 1 hour as 3600 returns from spotify
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    }

  } catch(e){
    console.error(e);
    return {
      ...token,
      error: 'RefreshAccessTokenError'
    }
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    })
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  // pages:{
  //   signIn: '/login'
  // },
  callbacks: {
    async jwt({token, account, user}: any) {
      // initial sign in
      if( account && user ){
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000
      }
    }

    if( Date.now() < token.accessTokenExpires){
      return token;
    }        
  
    //Access token has expired, refresh it
    return await refreshAccessToken(token);
  },
  async session({ session, token }: any){

    session.user.accessToken = token.accessToken;
    session.user.refreshToken = token.refreshToken;
    session.user.username = token.username;

    return session;
  }
}})