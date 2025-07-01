import { ClientContext, UserContext } from "@farcaster/frame-core/dist/context"
import { MiniAppHostCapability } from "@farcaster/frame-node"
import { create } from "zustand"

export type Point = { x: number; y: number }

type StoreData = {
  session?: string
  user?: UserContext
  client?: ClientContext
  capabilities?: MiniAppHostCapability[]
  heart: Point
  health: number
  bgSound: HTMLAudioElement

  updateStore: (newState: Partial<StoreData> | ((prev: StoreData) => Partial<StoreData>)) => void
}

export const store = create<StoreData>(set => ({
  heart: { x: 4, y: 6 },
  health: 10,
  bgSound: new Audio("/audio/bg.mp3"),
  updateStore: newState =>
    set(prev => (typeof newState === "function" ? { ...prev, ...newState(prev) } : { ...prev, ...newState })),
}))

export const updateStore = store.getState().updateStore
