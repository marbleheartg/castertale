import { Inter } from "next/font/google"
import { ReactNode } from "react"
import "./globals.css"
import { FRAME, PROJECT_DESCRIPTION, PROJECT_TITLE } from "./lib/constants"
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
        <meta name="fc:frame" content={JSON.stringify(FRAME)} />
        <title>{PROJECT_TITLE}</title>
        <meta name="description" content={PROJECT_DESCRIPTION} />
        <link rel="icon" type="image/svg+xml" href="/images/global/logo.svg" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ImagesPreload />
        {children}
      </body>
    </html>
  )
}
