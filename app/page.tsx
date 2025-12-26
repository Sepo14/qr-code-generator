
import Image from "next/image";
import { redirect } from 'next/navigation';

async function handleSubmit(formData: FormData) {
  'use server';
  const qrdata = formData.get('qrcode') as string;
  if (qrdata.trim()) {
    redirect(`/qr/${encodeURIComponent(qrdata)}`);
  }
}

export default function Home() {
  return (
    <main className="h-full w-full flex flex-col justify-center items-center gap-10 px-4">
      <Image src={'/Logo.svg'} width={200} height={100} alt="QR image"></Image>
      <div
        className="bg-(--color3) p-2 rounded-3xl max-w-full w-200  flex justify-between 
      border-2 border-(--color3)  
      hover:border-(--color2) hover:border-2 focus-within:border-(--color2) focus-within:border-2
      transition duration-300">
        <form className="flex w-full" action={handleSubmit}>
          <input className="text-white placeholder:text-white pl-5 min-w-0 w-full outline-none" type="text" name="qrcode" id="qrcode" placeholder="Enter an url" />
          <button className="text-white text-nowrap bg-(--color2) p-5 rounded-2xl hover:bg-(--color5) transition" type="submit">QR code</button>
        </form>
      </div>
    </main>
  );
}
