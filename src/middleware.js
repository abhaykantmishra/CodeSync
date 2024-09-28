import { NextResponse } from 'next/server'
import authService from './appwrite/auth_service';
import jwt from "jsonwebtoken"
import { jwtVerify } from 'jose';

export async function middleware(request) {
    console.log("hi from middleware!!");
    const accessToken = request.cookies.get('accessToken')
    // console.log(accessToken.value) ;
    if(accessToken === null || accessToken === undefined || accessToken === "undefined" || accessToken === ""){
      return NextResponse.redirect(new URL('/login', request.url));
    }
    try {
      const secret = new TextEncoder().encode(process.env.TOKEN_SECRET)
      const { payload } = await jwtVerify(accessToken?.value, secret);
      // console.log(payload);
      NextResponse.next();
    } catch (error) {
      console.log(error)
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
}
  // See "Matching Paths" below to learn more
export const config = {
    matcher: ['/home' , '/discuss' , "/roadmap" , "/roadmap/(.*)" , "/profile/(.*)" ]
}

