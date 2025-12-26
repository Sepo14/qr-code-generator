'use client';

import Image from "next/image";
import { use, useRef, useState } from "react";
import { QRCodeSVG , QRCodeCanvas } from "qrcode.react";

export default function Page({ params }: { params: Promise<{ qrcode: string }> }) {
  const { qrcode } = use(params);
  const data = decodeURIComponent(qrcode)
  const qrRef = useRef<HTMLDivElement | null>(null)
  const[clicked ,setCliked] = useState(false);
  const[clickedDownload ,setClikedDownload] = useState(false);
  

  const downloadQR = () => {
    if (!qrRef.current) return;
    const canvas = qrRef.current.querySelector("canvas") as HTMLCanvasElement | null;
    if (!canvas) return;

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "qr-code.png";
    link.click();
    setClikedDownload(true);
    setTimeout(() => setClikedDownload(false),2000)
  }
  
  const copyLink = async () => {
    await navigator.clipboard.writeText(data);
    setCliked(true);
    setTimeout(() => setCliked(false),2000)
  };

  return (
    <main className="h-full w-full flex flex-col justify-center items-center gap-20 px-4">
      <Image src={'/Logo.svg'} width={150} height={100} alt="QR image"></Image>
      <div ref={qrRef} className="bg-(--color1)/25 rounded-full p-8">
        <QRCodeCanvas className="bg-white p-5 rounded-3xl" value={data} size={256} />
      </div>
      <div className="flex max-w-full w-80 justify-evenly">
        <div className="bg-(--color2) relative flex justify-center rounded-xl hover:bg-(--color5) transition cursor-pointer">
          <button className="text-white p-4 pr-10 cursor-pointer" onClick={downloadQR}>Download</button>
          <Image className="absolute right-2 top-4" src={'/Load_circle_duotone.svg'} width={25} height={25} alt="QR image"></Image>
          <p className={`absolute top-15 text-green-400 transition-all ${clickedDownload?"opacity-100":"opacity-0"}`} >Download ✓</p>
        </div>
        <div className="bg-(--color2) relative flex justify-center rounded-xl hover:bg-(--color5) transition cursor-pointer">
          <button className={`text-white p-4 pr-10 cursor-pointer transition`} onClick={copyLink}>Share</button>
          <Image className="absolute right-2 top-4" src={'/link_alt.svg'} width={25} height={25} alt="QR image"></Image>
          <p className={`absolute top-15 text-green-400 transition-all ${clicked?"opacity-100":"opacity-0"}`} >Copied ✓</p>
        </div>
      </div>
    </main>
  )
}