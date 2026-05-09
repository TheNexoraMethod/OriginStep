import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const PUBLIC_ROUTES = new Set(['/login', '/signup'])

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If env vars are missing, treat as unauthenticated
  if (!supabaseUrl || !supabaseKey) {
    if (!PUBLIC_ROUTES.has(pathname)) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
  }

  let response = NextResponse.next({ request })

  try {
    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          )
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          )
        },
      },
    })

    const { data: { session } } = await supabase.auth.getSession()

    if (!session && !PUBLIC_ROUTES.has(pathname)) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    if (session && PUBLIC_ROUTES.has(pathname)) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  } catch {
    // On any auth error, allow public routes and redirect others to login
    if (!PUBLIC_ROUTES.has(pathname)) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
