import { CANVAS_HEIGHT, CANVAS_WIDTH, SCALE } from "@/lib/constants"
import { Point, store, updateStore } from "@/lib/store"
import clsx from "clsx"
import { useEffect, useRef, useState } from "react"

const Words = () => {
  const { heart } = store()

  const [word, setWord] = useState<Point>({
    x: CANVAS_WIDTH / SCALE - 1,
    y: 0,
  })

  const [index, setIndex] = useState(0)

  const sentences = useRef(["CENTRALIZED", "DAILY-BUGS", "CRYPTO-TALK", "TWITTER-LIKE", "US-BASED"])

  const dir = useRef("left")

  useEffect(() => {
    if (!index) return

    if (heart.x === word.x && heart.y >= word.y && heart.y <= word.y + sentences.current[index].length) {
      updateStore(prev => ({
        health: prev.health <= 0 ? prev.health : prev.health - 1,
      }))
    }
  }, [word, heart, index])

  useEffect(() => {
    const interval = setInterval(() => {
      if (dir.current === "left") {
        if (word.x <= 0) {
          setIndex(prev => (prev + 1 < sentences.current.length ? prev + 1 : 0))
          dir.current = "right"
        } else {
          setWord(prev => ({ x: prev.x - 1, y: 0 }))
        }
      } else {
        if (word.x >= CANVAS_WIDTH / SCALE - 1) {
          setIndex(prev => (prev + 1 < sentences.current.length ? prev + 1 : 0))
          dir.current = "left"
        } else {
          setWord(prev => ({
            x: prev.x + 1,
            y: Math.max(CANVAS_HEIGHT / SCALE - sentences.current[index].length, 0),
          }))
        }
      }
    }, 500)

    return () => clearInterval(interval)
  }, [word, index])

  return (
    <div
      style={{
        left: word.x * SCALE,
        top: word.y * SCALE,
        width: SCALE,
        height: SCALE,
      }}
      className={clsx(
        `absolute transition-all duration-500 text-white text-base leading-none flex flex-col text-center`,
      )}
    >
      {sentences.current[index].split("").map((c, i) => (
        <div
          key={i}
          style={{
            border: "1px solid rgba(255,255,255,0.2)",
          }}
          className={`w-[${SCALE / 2}] h-[${SCALE / 2}] font-(family-name:--tiny5)`}
        >
          {c}
        </div>
      ))}
    </div>
  )
}

export default Words
