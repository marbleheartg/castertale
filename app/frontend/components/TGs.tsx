import delay from "@/lib/api/utils/delay"
import { CANVAS_HEIGHT, CANVAS_WIDTH, SCALE } from "@/lib/constants"
import { Point, store, updateStore } from "@/lib/store"
import sdk from "@farcaster/frame-sdk"
import { useEffect, useState } from "react"
import TG from "./TG"

const TGs = ({ count }: { count: number }) => {
  const [points, setPoints] = useState<Point[]>([])

  function getRandomUnique(count: number) {
    return Array.from({ length: CANVAS_WIDTH / SCALE }, (_, i) => i)
      .sort(() => Math.random() - 0.5)
      .slice(0, count)
      .map(x => ({ x, y: 0 }))
  }

  async function tgAttack() {
    const randomPoints = getRandomUnique(count)
    setPoints(randomPoints)

    await delay(3000)

    setPoints(() =>
      randomPoints.map(p => ({
        x: p.x,
        y: CANVAS_HEIGHT / SCALE - 1,
      })),
    )

    const heart = store.getState().heart

    for (const point of randomPoints) {
      if (heart.x === point.x) {
        if (store.getState().capabilities?.includes("haptics.impactOccurred")) sdk.haptics.impactOccurred("rigid")
        updateStore(prev => ({
          health: prev.health <= 0 ? prev.health : prev.health - 1,
        }))
      }
    }

    if (store.getState().capabilities?.includes("haptics.impactOccurred")) sdk.haptics.impactOccurred("heavy")
  }

  useEffect(() => {
    tgAttack()

    const interval = setInterval(() => {
      tgAttack()
    }, 5600)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      {points.map((point, i) => (
        <TG key={`${point.x}-${point.y}`} point={point} />
      ))}
    </div>
  )
}

export default TGs
