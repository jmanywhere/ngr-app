import DripLiquidatorTable from "@/components/drip/liquidate/DripLiquidatorTable";
import ValidatorBanner from "@/components/drip/liquidate/ValidatorBanner";

export default function DripLiquidatorPage() {
  return (
    <main className="flex flex-col items-center">
      <h1 className="text-secondary text-3xl font-bold  uppercase pt-4">
        Drip Liquidators
      </h1>
      <section className="flex flex-col px-1 sm:px-4 w-full items-center lg:px-10 pb-5 gap-4">
        <ValidatorBanner />
      </section>
      <section className="flex flex-col px-1 sm:px-4 w-full items-center lg:px-10 pb-5 gap-4">
        <DripLiquidatorTable />
      </section>
    </main>
  );
}
