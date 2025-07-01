import { ClientContext, UserContext } from "@farcaster/frame-core/dist/context"
import { MiniAppHostCapability } from "@farcaster/frame-node"
import { create } from "zustand"

type StoreData = {
  session?: string
  user?: UserContext
  client?: ClientContext
  capabilities?: MiniAppHostCapability[]

  updateStore: (newState: Partial<StoreData> | ((prev: StoreData) => Partial<StoreData>)) => void
}

export const store = create<StoreData>(set => ({
  updateStore: newState => set(prev => (typeof newState === "function" ? { ...prev, ...newState(prev) } : { ...prev, ...newState })),
}))

export const updateStore = store.getState().updateStore
