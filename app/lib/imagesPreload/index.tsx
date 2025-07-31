import Image from "next/image"

const ImagesPreload = async () => {
  return (
    <div>
      <div className="relative hidden w-0 h-0">
        <Image src={"/images/global/defeated-flowey.svg"} alt="defeated-flowey" priority fill />
        <Image src={"/images/global/donate.svg"} alt="donate" priority fill />
        <Image src={"/images/global/farcaster.svg"} alt="farcaster" priority fill />
        <Image src={"/images/global/headphone.svg"} alt="headphone" priority fill />
        <Image src={"/images/global/logo.svg"} alt="logo" priority fill />
        <Image src={"/images/global/share.svg"} alt="share" priority fill />
        <Image src={"/images/global/telegram.svg"} alt="telegram" priority fill />
        <Image src={"/images/global/x.svg"} alt="x" priority fill />

        <Image src={"/images/global/twitter.gif"} alt="twitter" unoptimized priority fill />
        <Image src={"/images/global/flowey.gif"} alt="flowey" unoptimized priority fill />
      </div>
    </div>
  )
}

export default ImagesPreload
