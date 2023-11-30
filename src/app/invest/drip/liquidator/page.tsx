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
        <p className="text-secondary text-2xl font-bold uppercase pt-4">
          Liquidate Users Actions and Table
        </p>
      </section>
    </main>
  );
}
