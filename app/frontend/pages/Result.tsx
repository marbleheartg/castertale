import { store } from "@/lib/store"
import sdk from "@farcaster/frame-sdk"
import clsx from "clsx"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Result() {
  const { health } = store()

  const [text, setText] = useState("")

  useEffect(() => {
    const text = []

    if (health === 10) text.push("made it through with full hp", "think you can match that?")
    else if (health > 5) text.push("escaped with just a scratch", "your turn!")
    else if (health > 1) text.push("barely survived the fight", "think you can do better?")
    else if (health > 0) text.push("finished with 1HP left on the clock", "dare you to try!")

    text.join("\n\n")

    setText(text as unknown as string)
  }, [])

  return (
    <main className={clsx("fixed top-55 bottom-0 inset-x-[6vh]", "text-center")}>
      <div className={clsx("outline-white outline-10", "aspect-[9/7]", "flex flex-col justify-around")}>
        <h1 className="text-5xl">YOU WIN</h1>
        <div className={clsx("flex flex-col gap-3")}>
          <div
            className={clsx("relative aspect-[128/41] w-32 mx-auto", "cursor-pointer")}
            onClick={() => sdk.actions.composeCast({ text, embeds: [`https://${process.env.NEXT_PUBLIC_HOST}`] })}
          >
            <Image src={"/images/global/share.svg"} fill unoptimized alt="share" />
          </div>

          <div
            className={clsx("relative aspect-[128/40] w-32 mx-auto", "cursor-pointer")}
            onClick={() =>
              sdk.actions.sendToken({
                token: "eip155:8453/erc20:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
                amount: "1000000",
                recipientFid: 1021214,
              })
            }
          >
            <Image src={"/images/global/donate.svg"} fill unoptimized alt="donate" />
          </div>
        </div>
      </div>

      <div
        className={clsx("absolute bottom-10 w-full", "flex justify-center", "cursor-pointer")}
        onClick={() => sdk.actions.close()}
      >
        Quit
      </div>
    </main>
  )
}
