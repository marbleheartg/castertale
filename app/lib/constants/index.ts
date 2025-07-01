const PROJECT_TITLE = "PROJECT_TITLE"

const PROJECT_DESCRIPTION = "PROJECT_DESCRIPTION"

const FRAME = {
  version: "next",
  imageUrl: `https://${process.env.NEXT_PUBLIC_HOST}/images/og/frame/ogCastImage.jpg`,
  aspectRatio: "3:2",
  button: {
    title: "TITLE",
    action: {
      type: "launch_frame",
      url: `https://${process.env.NEXT_PUBLIC_HOST}`,
      name: PROJECT_TITLE,
      splashImageUrl: `https://${process.env.NEXT_PUBLIC_HOST}/images/og/splash.png`,
      splashBackgroundColor: "#ffffff",
    },
  },
}

const CANVAS_WIDTH = 315
const CANVAS_HEIGHT = 245
const SCALE = 35

enum Battle {
  Birds,
  TGs,
  Words,
  X,
}

export { Battle, CANVAS_HEIGHT, CANVAS_WIDTH, FRAME, PROJECT_DESCRIPTION, PROJECT_TITLE, SCALE }
