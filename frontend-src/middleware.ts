import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const email = request.cookies.get('userEmail')?.value
    const { pathname } = request.nextUrl

    // this is public route, can access without login. it's mean, can login or access without cookies details (ex : token, email)
    // const publicRoutes = ['/','/login','/register']
    
    const publicRoutes = ['/',]
    const isPublicRoute = publicRoutes.includes(pathname)

    if (!email && !isPublicRoute) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}