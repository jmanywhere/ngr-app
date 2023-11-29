import DripActions from "@/components/drip/Actions";
import DripStats, { DripUserStats } from "@/components/drip/Stats";

export default function DripPage() {
  return (
    <main className="flex flex-col items-center">
      <h1 className="text-secondary text-4xl font-bold  uppercase pb-4 ">
        Drip
      </h1>

      <section className="flex flex-col px-5 w-full items-center lg:px-10 pb-5 gap-4">
        <DripStats />
      </section>
      <section className="flex flex-col px-1 sm:px-4 w-full items-center lg:px-10 pb-5 gap-4">
        <DripUserStats />
      </section>
      <section className="flex flex-col px-1 md:px-4 w-full items-center lg:px-10 pb-5 gap-4">
        <DripActions />
      </section>
    </main>
  );
}
