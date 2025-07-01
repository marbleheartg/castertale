import { SCALE } from "@/lib/constants"
import { Point } from "@/lib/store"
import clsx from "clsx"
import Image from "next/image"

const TG = ({ point }: { point: Point }) => {
  return (
    <div
      style={{
        left: point.x * SCALE,
        top: point.y * SCALE,
        width: SCALE,
        height: SCALE,
      }}
      className={clsx(`absolute transition-all duration-2000`, point.y === 0 ? "animate-bounce" : "")}
    >
      <Image src={"/images/global/telegram.svg"} alt="telegram" fill />
    </div>
  )
}

export default TG
