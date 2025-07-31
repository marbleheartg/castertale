import { store } from "@/lib/store"
import sdk from "@farcaster/frame-sdk"
import clsx from "clsx"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"

export default function Home() {
  const navigate = useNavigate()

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)

  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    audioRef.current = new Audio("/audio/bg.mp3")
    audioCtxRef.current = new AudioContext()
    const source = audioCtxRef.current.createMediaElementSource(audioRef.current)
    gainNodeRef.current = audioCtxRef.current.createGain()
    gainNodeRef.current.gain.value = 0.05
    source.connect(gainNodeRef.current).connect(audioCtxRef.current.destination)

    const playAudio = () => {
      audioCtxRef.current?.resume().then(() => {
        audioRef.current?.play().catch(() => {})
      })
      window.removeEventListener("click", playAudio)
      window.removeEventListener("touchstart", playAudio)
    }

    audioRef.current.play().catch(() => {
      window.addEventListener("click", playAudio)
      window.addEventListener("touchstart", playAudio)
    })

    return () => {
      window.removeEventListener("click", playAudio)
      window.removeEventListener("touchstart", playAudio)
      audioRef.current?.pause()
      audioCtxRef.current?.close()
    }
  }, [])

  return (
    <main className={clsx("fixed top-50 bottom-0 inset-x-1/12", "text-center")}>
      <div className="flex flex-col gap-3 pt-20">
        <div
          className={clsx("cursor-pointer")}
          onClick={() => {
            if (store.getState().capabilities?.includes("haptics.notificationOccurred"))
              sdk.haptics.notificationOccurred("error")

            setClicked(true)

            audioRef.current?.pause()

            const laughAudio = new Audio("/audio/laugh.mp3")

            if (audioCtxRef.current) {
              const laughSource = audioCtxRef.current.createMediaElementSource(laughAudio)
              const laughGain = audioCtxRef.current.createGain()
              laughGain.gain.value = 0.05

              laughSource.connect(laughGain).connect(audioCtxRef.current.destination)
            }

            laughAudio.play().catch(() => {})

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

      <div className={clsx("absolute bottom-10 w-full", clicked && "animate-bounce")}>
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
