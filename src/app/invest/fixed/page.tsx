import { StatsCard } from "@/components/app/Cards";
import { NextPage } from "next";

const Page: NextPage = () => {
  return (
    <main className="flex flex-col items-center">
      <h1 className="text-secondary text-4xl font-bold  uppercase pb-4 ">
        Fixed Rate
      </h1>

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
