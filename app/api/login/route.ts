import { NextRequest, NextResponse } from "next/server"
import { usersCollection } from "../../lib/db"

export async function POST(req: NextRequest) {
  try {
    const fid = req.headers.get("fid")
    if (!fid) throw new Error("NotAuthenticated")

    await usersCollection.updateOne(
      { fid },
      {
        $set: { lastLogged: new Date() },
        $setOnInsert: {
          fid,
          createdAt: new Date(),
        },
      },
      { upsert: true },
    )

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
