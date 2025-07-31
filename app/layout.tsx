import { Inter } from "next/font/google"
import { ReactNode } from "react"
import "./globals.css"
import { MINIAPP, PROJECT_DESCRIPTION, PROJECT_TITLE } from "./lib/constants"
import ImagesPreload from "./lib/imagesPreload"

const inter = Inter({
  variable: "--inter",
  weight: "variable",
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://auth.farcaster.xyz" />
        <link rel="preload" href="8bitoperator-JVE.woff2" as="font" type="font/woff2" />
        <link rel="preload" href="/audio/bg.mp3" as="audio" type="audio/mpeg" />
        <link rel="preload" href="/audio/laugh.mp3" as="audio" type="audio/mpeg" />
        <link rel="preload" href="/audio/battle.mp3" as="audio" type="audio/mpeg" />
        <link rel="preload" href="/audio/outro.mp3" as="audio" type="audio/mpeg" />
        <meta name="fc:miniapp" content={JSON.stringify(MINIAPP)} />
        <title>{PROJECT_TITLE}</title>
        <meta name="description" content={PROJECT_DESCRIPTION} />
        <link rel="icon" type="image/svg+xml" href="/images/global/logo.svg" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
        <ImagesPreload />
      </body>
    </html>
  )
}
