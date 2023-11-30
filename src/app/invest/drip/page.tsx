import DripActions from "@/components/drip/Actions";
import { DripUserStats } from "@/components/drip/Stats";
import Image from "next/image";
import NGRDripLogo from "@/../public/ngrdrip.png";

export default function DripPage() {
  return (
    <main className="flex flex-col items-center">
      <h1 className="text-secondary text-3xl font-bold  uppercase pb-4 ">
        Your Drip
      </h1>
      <section className="flex flex-col px-1 sm:px-4 w-full items-center lg:px-10 pb-5 gap-4">
        <DripUserStats />
      </section>
      <section className="flex flex-col px-1 md:px-4 w-full items-center lg:px-10 pb-5 gap-4">
        <DripActions />
      </section>
      <Image src={NGRDripLogo} alt="NGR drip logo" />
    </main>
  );
}
