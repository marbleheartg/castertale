import clsx from "clsx"
import Image from "next/image"
import { store } from "../../lib/store"

const Header = () => {
  const { user } = store()

  return (
    <header className={clsx("fixed top-25 inset-x-0")}>
      <div className={clsx("relative aspect-[301/28] w-75 mx-auto")}>
        <Image src={"/images/global/logo.svg"} fill unoptimized alt="logo" />
      </div>
    </header>
  )
}

export default Header
