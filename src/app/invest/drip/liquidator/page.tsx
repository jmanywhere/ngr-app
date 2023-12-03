import DripLiquidatorTable from "@/components/drip/liquidate/DripLiquidatorTable";
import ValidatorBanner from "@/components/drip/liquidate/ValidatorBanner";
import { getAddress } from "viem";

async function getParticipants() {
  const res = await fetch(
    `https://api.dune.com/api/v1/query/3249113/results?api_key=${process.env.DUNE_API_KEY}`,
    { next: { revalidate: 3600 } }
  );
  const data = await res.json();
  const participants = data.result.rows.map((row: any) => {
    return getAddress(`0x${(row.topic1 as string).substring(26)}`);
  });
  return participants;
}

export default async function DripLiquidatorPage() {
  const participants = await getParticipants();
  return (
    <main className="flex flex-col items-center">
      <h1 className="text-secondary text-3xl font-bold  uppercase pt-4">
        Drip Liquidators
      </h1>
      <section className="flex flex-col px-1 sm:px-4 w-full items-center lg:px-10 pb-5 gap-4">
        <ValidatorBanner />
      </section>
      <section className="flex flex-col px-1 sm:px-4 w-full items-center lg:px-10 pb-5 gap-4">
        <DripLiquidatorTable users={participants} />
      </section>
    </main>
  );
}
