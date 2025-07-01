import axios from "axios"
import { randomUUID } from "crypto"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { usersCollection } from "../../lib/db"

export async function POST(req: NextRequest) {
  const { SECRET, NEXT_PUBLIC_HOST } = process.env
  if (!(SECRET && NEXT_PUBLIC_HOST)) throw new Error("NotifyCredentialsNotConfigured")

  try {
    const { secret, title, body } = z
      .object({
        secret: z.string(),
        title: z.string(),
        body: z.string(),
      })
      .parse(await req.json())

    if (secret !== SECRET) throw new Error("NotifyAccessDenied")

    const notificationTokens = (
      await usersCollection.find({ notificationToken: { $exists: true } }, { projection: { notificationToken: 1, _id: 0 } }).toArray()
    ).map(val => val.notificationToken)

    if (!notificationTokens) throw new Error("NoNotificationTokens")

    for (let i = 0; i < notificationTokens?.length; i += 100) {
      const {
        data: { successfulTokens, invalidTokens, rateLimitedTokens },
      } = await axios.post("https://api.farcaster.xyz/v1/frame-notifications", {
        notificationId: randomUUID(),
        title,
        body,
        targetUrl: `https://${NEXT_PUBLIC_HOST}`,
        tokens: notificationTokens?.slice(i, i + 100),
      })

      if (successfulTokens?.length) console.log(successfulTokens)

      if (rateLimitedTokens?.length) console.log("rateLimitedTokens", rateLimitedTokens)

      if (invalidTokens?.length) {
        console.log("invalidTokens", invalidTokens)
        await usersCollection.updateMany({ notificationToken: { $in: invalidTokens } }, { $unset: { notificationToken: "" } })
      }

      await new Promise(res => setTimeout(res, 1000))
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

// curl -X POST https://monad-flowers.xyz/api/notify \
//   -H "Content-Type: application/json" \
//   -d @payload.json
