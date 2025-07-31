import { BattleType, CANVAS_HEIGHT, CANVAS_WIDTH, SCALE } from "@/lib/constants"
import { store, updateStore } from "@/lib/store"
import sdk from "@farcaster/frame-sdk"
import clsx from "clsx"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"
import Bird from "../components/Bird"
import TGs from "../components/TGs"
import Words from "../components/Words"
import X from "../components/X"

function moveUp() {
  updateStore(prev => ({
    heart: { x: prev.heart.x, y: Math.max(0, prev.heart.y - 1) },
  }))
}

function moveDown() {
  updateStore(prev => ({
    heart: {
      x: prev.heart.x,
      y: Math.min(CANVAS_HEIGHT / SCALE - 1, prev.heart.y + 1),
    },
  }))
}

function moveLeft() {
  updateStore(prev => ({
    heart: { x: Math.max(0, prev.heart.x - 1), y: prev.heart.y },
  }))
}

function moveRight() {
  updateStore(prev => ({
    heart: {
      x: Math.min(CANVAS_WIDTH / SCALE - 1, prev.heart.x + 1),
      y: prev.heart.y,
    },
  }))
}

function handleTap(e: React.TouchEvent | React.MouseEvent) {
  e.preventDefault()

  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()

  let clientX: number
  let clientY: number

  if ("touches" in e && e.touches.length > 0) {
    clientX = e.touches[0].clientX
    clientY = e.touches[0].clientY
  } else if ("clientX" in e) {
    clientX = (e as React.MouseEvent).clientX
    clientY = (e as React.MouseEvent).clientY
  } else {
    return
  }

  const heart = store.getState().heart

  const heartX = heart.x * SCALE + SCALE / 2
  const heartY = heart.y * SCALE + SCALE / 2

  const tapX = clientX - rect.left
  const tapY = clientY - rect.top

  const dx = tapX - heartX
  const dy = tapY - heartY

  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 0) moveRight()
    else moveLeft()
  } else {
    if (dy > 0) moveDown()
    else moveUp()
  }
}

const Battle = () => {
  const { heart, health } = store()

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)

  const [time, setTime] = useState(60)

  const [win, setWin] = useState(false)

  const [battle, setBattle] = useState<BattleType | null>(BattleType.Birds)

  const navigate = useNavigate()

  useEffect(() => {
    if (health <= 0) sdk.actions.close()
  }, [health])

  useEffect(() => {
    const timers = [
      setTimeout(() => {
        setBattle(BattleType.TGs)
      }, 32000),

      setTimeout(() => {
        setBattle(BattleType.Words)
      }, 48500),

      setTimeout(() => {
        setBattle(BattleType.X)
      }, 65000),

      setTimeout(() => {
        setWin(true)
        setBattle(null)
      }, 90000),

      setTimeout(() => {
        navigate("/result")
      }, 94000),
    ]

    return () => {
      timers.forEach(val => {
        clearTimeout(val)
      })
    }
  }, [])

  useEffect(() => {
    audioRef.current = new Audio("/audio/battle.mp3")
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

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => {
        if (prevTime <= 0) {
          clearInterval(interval)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      updateStore(prev => {
        switch (e.key) {
          case "ArrowUp":
            return {
              heart: {
                x: prev.heart.x,
                y: Math.max(0, prev.heart.y - 1),
              },
            }
          case "ArrowDown":
            return {
              heart: {
                x: prev.heart.x,
                y: Math.min(CANVAS_HEIGHT / SCALE - 1, prev.heart.y + 1),
              },
            }
          case "ArrowLeft":
            return {
              heart: {
                x: Math.max(0, prev.heart.x - 1),
                y: prev.heart.y,
              },
            }
          case "ArrowRight":
            return {
              heart: {
                x: Math.min(CANVAS_WIDTH / SCALE - 1, prev.heart.x + 1),
                y: prev.heart.y,
              },
            }
          default:
            return { heart: prev.heart }
        }
      })
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  return (
    <div>
      <div className="fixed top-4 inset-x-0 text-center">move to survive</div>

      <div className={clsx("fixed top-15 inset-x-0", "flex justify-center", "z-10")}>
        <div className="relative aspect-square h-38">
          {win ? (
            <Image src="/images/global/defeated-flowey.svg" alt="defeated-flowey" fill />
          ) : (
            <Image src="/images/global/flowey.gif" unoptimized alt="flowey" fill />
          )}
        </div>
      </div>

      <div className={clsx("fixed top-65 inset-x-0", "flex justify-center", "z-20")}>
        <div style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }} className={clsx(`relative`)}>
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className={clsx("outline-white outline-10", "bg-black")}
            onTouchStart={e => handleTap(e)}
            onClick={e => {
              if (navigator.userAgent === "warpcast") return
              handleTap(e)
            }}
          />

          <div
            style={{
              left: heart.x * SCALE,
              top: heart.y * SCALE,
              width: SCALE,
              height: SCALE,
            }}
            className={clsx(`absolute transition-all duration-500`)}
          >
            <Image src={"/images/global/farcaster.svg"} alt="farcaster" fill />
          </div>

          {(() => {
            switch (battle) {
              case BattleType.Birds:
                return Array.from({ length: 5 }).map((_, i) => <Bird key={i} />)
              case BattleType.TGs:
                return <TGs count={6} />
              case BattleType.Words:
                return <Words />
              case BattleType.X:
                return <X />
              default:
                return <></>
            }
          })()}

          {health <= 0 && (
            <div className={clsx(`absolute inset-0 text-white text-4xl`, "flex justify-center items-center")}>
              <div className="pl-2 pr-1 pb-0.5 bg-red-800">GAME OVER</div>
            </div>
          )}
        </div>
      </div>

      <div className={clsx("fixed bottom-16 inset-x-0", "flex justify-center gap-5 text-white text-3xl", "z-30")}>
        <div>{time || "LOL"}/60s</div>
        <div>HP</div>
        <div className={clsx("w-10 h-10 bg-[#715AB9]")}></div>
        <div className={clsx("text-4xl")}>{health}/10</div>
      </div>
    </div>
  )
}

export default Battle
