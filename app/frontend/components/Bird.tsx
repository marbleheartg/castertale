import { CANVAS_HEIGHT, CANVAS_WIDTH, SCALE } from "@/lib/constants"
import { Point, store, updateStore } from "@/lib/store"
import sdk from "@farcaster/frame-sdk"
import clsx from "clsx"
import Image from "next/image"
import { useEffect, useState } from "react"

const Bird = () => {
  const { heart } = store()

  const [bird, setBird] = useState<Point>({ x: 4, y: 3 })

  const [birdDirectionLeft, setBirdDirectionLeft] = useState<boolean>(false)

  useEffect(() => {
    if (heart.x === bird.x && heart.y === bird.y) {
      updateStore(prev => ({
        health: prev.health <= 0 ? prev.health : prev.health - 1,
      }))

      if (store.getState().capabilities?.includes("haptics.impactOccurred")) sdk.haptics.impactOccurred("rigid")
    }
  }, [bird, heart])

  useEffect(() => {
    const interval = setInterval(() => {
      setBird(prev => {
        const dx = Math.floor(Math.random() * 3) - 1

        if (dx !== 0) setBirdDirectionLeft(dx === -1 ? true : false)

        const dy = Math.floor(Math.random() * 3) - 1

        const newX = Math.min(Math.max(prev.x + dx, 0), CANVAS_WIDTH / SCALE - 1)
        const newY = Math.min(Math.max(prev.y + dy, 0), CANVAS_HEIGHT / SCALE - 1)

        return { x: newX, y: newY }
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      style={{
        left: bird.x * SCALE,
        top: bird.y * SCALE,
        width: SCALE,
        height: SCALE,
      }}
      className={clsx(`absolute transition-all duration-500`)}
    >
      <Image
        src={"/images/global/twitter.gif"}
        unoptimized
        className={clsx(birdDirectionLeft && "scale-x-[-1]")}
        alt="bird"
        fill
      />
    </div>
  )
}

export default Bird
