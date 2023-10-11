import type { NextPage } from "next";
import LiquidationsTable from "./LiquidationsTable";

export default function LiquidatorsPage() {
  return (
    <main className="pt-[65px] bg-hero-pattern-500 md:bg-hero-pattern-800 lg:bg-hero-pattern-1080 flex flex-col items-center min-h-[calc(100vh-312px)]">
      <h1 className="text-black text-3xl font-bold py-5 md:py-10 uppercase">
        Liquidations Page
      </h1>
      <LiquidationsTable />
    </main>
  );
}
