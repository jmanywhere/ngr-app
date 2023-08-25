import { ActionsCard, StatsCard } from "@/components/app/Cards";
import { NextPage } from "next";

const Page: NextPage = () => {
  return (
    <main className="pt-[65px] bg-hero-pattern-500 md:bg-hero-pattern-800 lg:bg-hero-pattern-1080 flex flex-col items-center">
      <h1 className="text-black text-3xl font-bold py-5 md:py-10 uppercase">
        Investment
      </h1>
      <section className="flex flex-col px-5 w-full items-center lg:px-10 pb-5 gap-4">
        <StatsCard />
        <ActionsCard />
      </section>
    </main>
  );
};

export default Page;

export const metadata = {
  title: "Next Gen ROI Dapp",
  description: "Get your assured 6% return, no BS, no ponzinomics",
};
