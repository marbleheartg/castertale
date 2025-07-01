import { MongoClient } from "mongodb"

const { MONGODB_URI } = process.env
if (!MONGODB_URI) throw new Error("MongoDBNotConfigured")

export const client = new MongoClient(MONGODB_URI)
await client.connect()

export const db = client.db("main")

export const usersCollection = db.collection<{
  fid: string | number
  lastLogged: Date
  notificationToken?: string
  createdAt: Date
}>("users")
