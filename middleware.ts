import { NextResponse } from "next/server";
import { auth} from "./auth";
import { authRoutes, publicRoutes } from "./routes";

export default auth((req)=>{
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;

    const isPublic = publicRoutes.includes(nextUrl.pathname);
    const isAuth = authRoutes.includes(nextUrl.pathname);

    if(isPublic){
        return NextResponse.next();
    }

    if(isAuth){
        if(isLoggedIn){
            return NextResponse.redirect(new URL('/members', nextUrl));
        }
        return NextResponse.next();
    }

    if(!isPublic && !isLoggedIn){
        return NextResponse.redirect(new URL('/auth/login',nextUrl));
    }

    return NextResponse.next();
})

export const config = {
    matcher : ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)']
}