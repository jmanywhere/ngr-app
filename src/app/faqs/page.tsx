import { NextPage } from "next";

import QuestionDropdown from "@/components/faq/QuestionDropdown";
import { fixedQ, dripF, minerF } from "@/data/faqs";
import Link from "next/link";

const Page: NextPage = () => {
  return (
    <main className="pt-[65px] bg-hero-pattern-500 md:bg-hero-pattern-800 lg:bg-hero-pattern-1080 flex flex-col items-center px-5 lg:px-8">
      <h1 className="text-[#012970] text-3xl font-bold py-5 md:py-10 text-center whitespace-pre-wrap">
        Frequently Asked Questions
      </h1>
      <div className="flex flex-row items-center justify-evenly pb-2">
        <Link
          href="/faqs#fixed"
          className="btn text-secondary btn-link text-xl px-4 min-w-[100px]"
        >
          Fixed Rate
        </Link>
        <Link
          href="/faqs#drip"
          className="btn text-secondary btn-link text-xl px-4 min-w-[100px]"
        >
          Drip
        </Link>
      </div>
      <section className=" pb-5">
        <div className="flex flex-col w-full items-center rounded-2xl border-2 border-black overflow-hidden">
          <h2
            className="text-2xl text-secondary font-bold py-5 bg-gray-300 w-full text-center"
            id="fixed"
          >
            Fixed Rate Investments
          </h2>
          {fixedQ.map((q, i) => (
            <QuestionDropdown key={`fixed-${i}`} question={q[0]} ans={q[1]} />
          ))}
        </div>
      </section>
      <section className=" pb-5">
        <div className="flex flex-col w-full items-center rounded-2xl border-2 border-black overflow-hidden">
          <h2
            className="text-2xl text-secondary font-bold py-5 bg-gray-300 w-full text-center"
            id="drip"
          >
            Drip Investments
          </h2>
          {dripF.map((q, i) => (
            <QuestionDropdown key={`drip-${i}`} question={q[0]} ans={q[1]} />
          ))}
        </div>
      </section>
      <section className=" pb-5">
        <div className="flex flex-col w-full items-center rounded-2xl border-2 border-black overflow-hidden">
          <h2
            className="text-2xl text-secondary font-bold py-5 bg-gray-300 w-full text-center"
            id="miner"
          >
            Miner
          </h2>
          {minerF.map((q, i) => (
            <QuestionDropdown key={`drip-${i}`} question={q[0]} ans={q[1]} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Page;

export const metadata = {
  title: "NGR - FAQ",
  description: "All your answers for all our systems",
};
