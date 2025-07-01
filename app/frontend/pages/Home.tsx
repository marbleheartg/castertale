import clsx from "clsx"
import { useEffect } from "react"
import { updateStore } from "../../lib/store"

export default function Home() {
  useEffect(() => {
    updateStore({})
  }, [])

  return <main className={clsx("")}>Home page</main>
}
