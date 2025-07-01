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

export { FRAME, PROJECT_DESCRIPTION, PROJECT_TITLE }
