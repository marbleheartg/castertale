import clsx from "clsx"
import Image from "next/image"
import { store } from "../../lib/store"

const Header = () => {
  const { user } = store()

  return (
    <header className={clsx("fixed top-10 inset-x-0")}>
      <div className={clsx("relative aspect-[308/85] w-85 mx-auto")}>
        <Image src={"/images/global/logo.svg"} fill unoptimized alt="logo" />
      </div>

      {/* <Image
        src={user?.pfpUrl || "/images/global/user.svg"}
        width={19}
        height={19}
        alt="pfp"
        className={clsx("absolute top-0 right-0", "rounded-full")}
      /> */}
    </header>
  )
}

export default Header
