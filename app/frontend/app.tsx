import clientErrorHandling from "@/lib/clientErrorsReporting"
import { store, updateStore } from "@/lib/store"
import sdk from "@farcaster/frame-sdk"
import axios from "axios"
import { useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router"
import Header from "./components/Header"
import Battle from "./pages/Battle"
import Home from "./pages/Home"
import Result from "./pages/Result"

export default function App() {
  const { bgSound } = store()

  useEffect(() => {
    clientErrorHandling()
    ;(async function () {
      const { user, client } = await sdk.context

      const capabilities = await sdk.getCapabilities()

      updateStore({ user, client, capabilities })

      await sdk.actions.ready({ disableNativeGestures: true })

      try {
        const { token: session } = await sdk.quickAuth.getToken()
        updateStore({ session })
        axios.post("/api/login", {}, { headers: { Authorization: `Bearer ${session}` } })
      } catch (error) {}
    })()
  }, [])

  useEffect(() => {
    if (!bgSound) return

    bgSound.volume = 0.5

    function handleUserInteraction() {
      bgSound.play().catch(() => {})
      window.removeEventListener("click", handleUserInteraction)
      window.removeEventListener("touchstart", handleUserInteraction)
    }

    bgSound.play().catch(() => {
      window.addEventListener("click", handleUserInteraction)
      window.addEventListener("touchstart", handleUserInteraction)
    })

    return () => {
      window.removeEventListener("click", handleUserInteraction)
      window.removeEventListener("touchstart", handleUserInteraction)
      bgSound.pause()
    }
  }, [bgSound])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route path="/battle" element={<Battle />} />
        <Route
          path="/result"
          element={
            <>
              <Header />
              <Result />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
