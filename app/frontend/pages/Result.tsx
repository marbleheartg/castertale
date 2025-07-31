import { store } from "@/lib/store"
import sdk from "@farcaster/frame-sdk"
import clsx from "clsx"
import Image from "next/image"
import { useEffect, useState } from "react"
import { parseAbi, parseEther } from "viem"
import { base } from "viem/chains"
import { useConnect, useSwitchChain, useWriteContract } from "wagmi"

export default function Result() {
  const { health } = store()

  const [text, setText] = useState("")
  const [msg, setMsg] = useState("")

  const { connect, connectors } = useConnect()
  const { status, writeContract } = useWriteContract()
  const { switchChain } = useSwitchChain()

  useEffect(() => {
    if (health === 10) setText(`made it through with full hp 🤯\n\nthink you can match that?`)
    else if (health > 5) setText(`escaped with ${health}HP 😏\n\nyour turn!`)
    else if (health > 1) setText(`barely survived the fight with ${health}HP 😤\n\nthink you can do better?`)
    else if (health >= 0) setText(`finished with 1HP left 😮‍💨\n\ndare you to try!`)
  }, [])

  useEffect(() => {
    switch (status) {
      case "idle":
        setMsg(`🔥 with ${health} HP 🔥`)
        break
      case "pending":
        setMsg(`processing...`)
        break
      case "success":
        setMsg(`🔥 successful mint! 🔥`)
        break
      case "error":
        setMsg(`it's quite little 🥹`)
        break
      default:
        setMsg(`🔥 with ${health} HP 🔥`)
        break
    }
  }, [status, health])

  return (
    <main className={clsx("fixed top-55 bottom-0 inset-x-[6vh]", "text-center")}>
      <div className={clsx("outline-white outline-10", "aspect-[9/7]", "flex flex-col justify-around")}>
        <h1 className="text-5xl">YOU WIN</h1>

        <div>{msg}</div>

        <div className={clsx("flex flex-col gap-3")}>
          <div
            className={clsx("relative aspect-[128/41] w-32 mx-auto", "cursor-pointer")}
            onClick={() => sdk.actions.composeCast({ text, embeds: [`https://${process.env.NEXT_PUBLIC_HOST}`] })}
          >
            <Image src={"/images/global/share.svg"} fill unoptimized alt="share" />
          </div>

          <div
            className={clsx("relative aspect-[128/40] w-32 mx-auto", "cursor-pointer")}
            onClick={() => {
              try {
                connect({ connector: connectors[0] })
              } catch (error) {}

              try {
                switchChain({ chainId: base.id })
              } catch (error) {}

              writeContract({
                address: "0xB030f18a4f6a307DEd48088ae25d1c96Cb1471B8",
                abi: parseAbi(["function mint() payable"]),
                functionName: "mint",
                args: [],
                chain: base,
                value: parseEther("0.00009"),
              })
            }}
          >
            <Image src={"/images/global/mint.svg"} fill unoptimized alt="mint" />
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
