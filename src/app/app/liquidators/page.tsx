import type { NextPage } from "next";
import LiquidationsTable from "./LiquidationsTable";
import Link from "next/link";

export default function LiquidatorsPage() {
  return (
    <main className="pt-[65px] bg-hero-pattern-500 md:bg-hero-pattern-800 lg:bg-hero-pattern-1080 flex flex-col items-center min-h-[calc(100vh-312px)]">
      <h1 className="text-black text-3xl font-bold pt-5 md:pt-10 pb-4 uppercase">
        Liquidations
      </h1>
      <div className="tabs tabs-boxed mb-5">
        <Link href="/app" className="tab text-white text-xl">
          Investor
        </Link>
        <Link
          href="/app/liquidators"
          className="tab text-white text-xl bg-secondary"
        >
          Liquidator
        </Link>
      </div>
      <LiquidationsTable />
    </main>
  );
}
