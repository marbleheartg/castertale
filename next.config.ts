import type { NextConfig } from "next"

const { NEXT_PUBLIC_HOST } = process.env
if (!NEXT_PUBLIC_HOST) throw new Error("NextConfigCredentialsNotConfigured")

const nextConfig: NextConfig = {
  allowedDevOrigins: [NEXT_PUBLIC_HOST],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imagedelivery.net",
      },
    ],
  },

  rewrites: async () => {
    return [
      {
        source: "/((?!api/|_next/).*)",
        destination: "/shell",
      },
    ]
  },
}

export default nextConfig
