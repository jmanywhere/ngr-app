import type { NextPage } from "next";
import LiquidationsTable from "./LiquidationsTable";
import Link from "next/link";

export default function LiquidatorsPage() {
  return (
    <main className="flex flex-col items-center">
      <h2 className="text-secondary text-3xl font-bold pb-4 uppercase whitespace-pre-wrap text-center">
        Fixed Rate
      </h2>
      <div className="tabs tabs-boxed mb-5">
        <Link href="/invest/fixed" className="tab text-white text-xl">
          Investor
        </Link>
        <Link
          href="/invest/fixed/liquidators"
          className="tab text-white text-xl bg-secondary"
        >
          Liquidator
        </Link>
      </div>
      <LiquidationsTable />
    </main>
  );
}
