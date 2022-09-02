import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { COMING_SOON, MAINTENANCE } from '../config'

function shouldExclude(request: NextRequest) {
    const path = request.nextUrl.pathname;

    return (
        path.startsWith('/api') || //  exclude all API routes
        path.startsWith('/static') || // exclude static files
        path.startsWith('/_next') || // exclude next files
        path.includes('.') // exclude all files in the public folder
    );
}

export function middleware(request: NextRequest) {
    if (!shouldExclude(request)) {
        if (COMING_SOON) {
            console.log('comingSoon', COMING_SOON)
            return NextResponse.rewrite(
                new URL('/status/coming-soon', request.url),
            )
        }

        if (MAINTENANCE) {
            return NextResponse.rewrite(
                new URL('/status/maintenance', request.url),
            )
        }
    }
}
