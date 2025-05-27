import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import authConfig from "./auth.config"
import NextAuth from 'next-auth';
export const { auth: middleware } = NextAuth(authConfig)

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};


export default auth((req) => {
  const { nextUrl, method } = req;
  const user = req.auth?.user;
  if (!user) return NextResponse.next();
  return NextResponse.next();
});