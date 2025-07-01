import verifySession from "@/lib/api/utils/verifySession"
import { NextRequest, NextResponse } from "next/server"

const { NEXT_PUBLIC_HOST } = process.env
if (!NEXT_PUBLIC_HOST) throw new Error("NextConfigCredentialsNotConfigured")

export const config = {
  matcher: ["/api/:path*", "/ogpath"],
}

export async function middleware(request: NextRequest) {
  if (request.headers.get("x-middleware-subrequest"))
    return NextResponse.json({ error: "Forbidden header detected" }, { status: 403 })

  const { pathname } = request.nextUrl

  if (pathname.startsWith("/api")) {
    if (request.method === "GET") return NextResponse.next()

    const protectedRoutes = ["/api/login"]

    if (!protectedRoutes.includes(pathname)) return NextResponse.next()

    const authHeader = request.headers.get("authorization")

    if (!authHeader?.startsWith("Bearer "))
      return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 })

    const session = authHeader.split(" ")[1]

    const fid = await verifySession(session)

    const requestHeaders = new Headers(request.headers)
    requestHeaders.set("fid", fid.toString())

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }

  return NextResponse.next()
}
