import { ReactNode } from "react";
import Link from "next/link";

export default function InvestLayout(props: { children: ReactNode }) {
  return (
    <div className="bg-hero-pattern-500 md:bg-hero-pattern-800 lg:bg-hero-pattern-1080 pt-[75px] min-h-[calc(100vh-439px)] md:min-h-[calc(100vh-303px)]">
      <div className="flex flex-col items-center py-4">
        <h1 className="text-2xl md:text-4xl font-bold uppercase text-center">
          Next Gen Investments
        </h1>
        <div className="tabs tabs-boxed mb-2">
          <Link
            href="/invest/fixed"
            className="tab hover:bg-secondary text-white text-md sm:text-xl w-[120px] sm:w-[180px]"
          >
            Fixed Rate
          </Link>
          <Link
            href="/invest/drip"
            className="tab text-white text-md sm:text-xl hover:bg-primary w-[120px] sm:w-[180px]"
          >
            Drip
          </Link>
        </div>
        {props.children}
      </div>
    </div>
  );
}
