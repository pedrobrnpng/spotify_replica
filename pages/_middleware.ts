import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req: any) {

  //@ts-ignore
  const token = await getToken({req, secret: process.env.JWT_SECRET});

  const { pathname } = req.nextUrl;
  const url = req.nextUrl.clone();

  if(pathname.includes('/api/auth')){
    return NextResponse.next();
  }

  url.pathname = '/'

  if(token) {
    return NextResponse.rewrite(url);
  }

  url.pathname = '/login'

  if(!token && pathname.includes !== "/login"){
    return NextResponse.rewrite(url);
  }



}