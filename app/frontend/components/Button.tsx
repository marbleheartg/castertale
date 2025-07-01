import { store } from "@/lib/store"
import sdk from "@farcaster/frame-sdk"
import clsx from "clsx"
import { MouseEventHandler } from "react"
import { useNavigate } from "react-router"

const Button = ({
  to,
  onClick,
  text,
  disabled,
  className,
}: {
  to?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  text?: string
  disabled?: boolean
  className?: string
}) => {
  const navigate = useNavigate()

  return (
    <button
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        if (store.getState().capabilities?.includes("haptics.impactOccurred")) sdk.haptics.impactOccurred("medium")

        if (onClick) onClick(e)
        if (to) navigate(to)
      }}
      disabled={disabled}
      className={clsx(
        "fixed bottom-8 left-13 right-13",
        "min-[369px]:bottom-10",
        "pt-2 pb-2.5",
        "text-white font-bold text-base",
        "min-[390px]:text-lg",
        "rounded-2xl",
        disabled ? "bg-[var(--inactive-accent)]" : "bg-[var(--accent)]",
        className,
      )}
    >
      {text}
    </button>
  )
}

export default Button
