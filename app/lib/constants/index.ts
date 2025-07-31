const PROJECT_TITLE = "CASTERTALE"

const PROJECT_DESCRIPTION = "unveil the mystery..."

const MINIAPP = {
  version: "next",
  imageUrl: `https://${process.env.NEXT_PUBLIC_HOST}/images/og/cast/image.jpg`,
  aspectRatio: "3:2",
  button: {
    title: "battle",
    action: {
      type: "launch_frame",
      url: `https://${process.env.NEXT_PUBLIC_HOST}`,
      name: PROJECT_TITLE,
      splashImageUrl: `https://${process.env.NEXT_PUBLIC_HOST}/images/og/splash.png`,
      splashBackgroundColor: "#000000",
    },
  },
}

const CANVAS_WIDTH = 315
const CANVAS_HEIGHT = 245
const SCALE = 35

enum BattleType {
  Birds,
  TGs,
  Words,
  X,
}

export { BattleType, CANVAS_HEIGHT, CANVAS_WIDTH, MINIAPP, PROJECT_DESCRIPTION, PROJECT_TITLE, SCALE }
