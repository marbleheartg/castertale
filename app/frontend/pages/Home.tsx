import { store, updateStore } from "@/lib/store"
import sdk from "@farcaster/frame-sdk"
import clsx from "clsx"
import Image from "next/image"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router"

export default function Home() {
  const { bgSound } = store()

  const navigate = useNavigate()

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    updateStore(prev => ({ ...prev, heart: { x: 4, y: 6 }, health: 10 }))
  }, [])

  return (
    <main className={clsx("fixed top-50 bottom-0 inset-x-1/12", "text-center")}>
      <div className="flex flex-col gap-3 pt-20">
        <div
          className="cursor-pointer"
          onClick={() => {
            if (store.getState().capabilities?.includes("haptics.notificationOccurred"))
              sdk.haptics.notificationOccurred("error")

            audioRef.current = new Audio("/audio/laugh.mp3")

            bgSound.pause()

            audioRef.current?.play().catch(() => {})

            setTimeout(() => {
              navigate("/battle")
            }, 8000)
          }}
        >
          Start Game
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            if (store.getState().capabilities?.includes("haptics.selectionChanged")) sdk.haptics.selectionChanged()
            sdk.actions.close()
          }}
        >
          Quit
        </div>
      </div>

      <div className="absolute bottom-10 w-full">
        <Image
          src={"/images/global/headphone.svg"}
          width={24}
          height={21}
          unoptimized
          alt="headphone"
          className="mx-auto"
        />
      </div>
    </main>
  )
}
