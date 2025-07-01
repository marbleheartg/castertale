import { SCALE } from "@/lib/constants"
import { Point, store, updateStore } from "@/lib/store"
import sdk from "@farcaster/frame-sdk"
import clsx from "clsx"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const X = () => {
  const { heart } = store()

  const [x, setX] = useState<Point>({ x: 4, y: 3 })
  const [xScale, setXScale] = useState(1)

  useEffect(() => {
    ;(async function main() {
      if (
        (heart.x === x.x && heart.y === x.y) ||
        (heart.x === x.x + 1 && heart.y === x.y + 1) ||
        (heart.x === x.x && heart.y === x.y + 1) ||
        (heart.x === x.x + 1 && heart.y === x.y)
      ) {
        updateStore(prev => ({
          health: prev.health <= 0 ? prev.health : prev.health - 1,
        }))

        if (store.getState().capabilities?.includes("haptics.impactOccurred")) sdk.haptics.impactOccurred("rigid")
      }
    })()
  }, [x, heart])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setXScale(2)
    }, 2000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  const heartPoint = useRef({ x: 4, y: 3 })

  useEffect(() => {
    heartPoint.current = heart
  }, [heart])

  useEffect(() => {
    let interval: any

    interval = setInterval(() => {
      setX(prev => {
        let newX = prev.x
        let newY = prev.y

        if (prev.x + 1 < heartPoint.current.x) newX++
        else if (prev.x > heartPoint.current.x) newX--

        if (prev.y + 1 < heartPoint.current.y) newY++
        else if (prev.y > heartPoint.current.y) newY--

        return { x: newX, y: newY }
      })
    }, 500)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div
      style={{
        left: x.x * SCALE,
        top: x.y * SCALE,
        width: SCALE * xScale,
        height: SCALE * xScale,
      }}
      className={clsx(`absolute transition-all duration-500`)}
    >
      <Image src={"/images/global/x.svg"} alt="x" fill />
    </div>
  )
}

export default X
