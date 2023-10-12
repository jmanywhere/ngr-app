import { StatsCard } from "@/components/app/Cards";
import { NextPage } from "next";
import Link from "next/link";

const Page: NextPage = () => {
  return (
    <main className="pt-[65px] bg-hero-pattern-500 md:bg-hero-pattern-800 lg:bg-hero-pattern-1080 flex flex-col items-center">
      <h1 className="text-black text-4xl font-bold pt-5 md:pt-10 uppercase pb-4">
        Investment
      </h1>
      <div className="tabs tabs-boxed mb-5">
        <Link href="/app" className="tab bg-secondary text-white text-xl">
          Investor
        </Link>
        <Link href="/app/liquidators" className="tab text-white text-xl">
          Liquidator
        </Link>
      </div>
      <section className="flex flex-col px-5 w-full items-center lg:px-10 pb-5 gap-4">
        <StatsCard />
      </section>
    </main>
  );
};

export default Page;

export const metadata = {
  title: "Next Gen ROI Dapp",
  description: "Get your assured 6% return, no BS, no ponzinomics",
};
