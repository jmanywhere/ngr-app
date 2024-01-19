import MinerInfo from "@/components/miner/MinerInfo";

export default function MinerPage() {
  return (
    <main className="flex flex-col items-center">
      <h1 className="text-secondary text-4xl font-bold  uppercase pb-4 ">
        Miner
      </h1>
      <section className="flex flex-col px-5 w-full items-center lg:px-10 pb-5 gap-4">
        <MinerInfo />
      </section>
    </main>
  );
}
export const metadata = {
  title: "NGR - Miner",
  description: "High risk, ponzi, the least safe investment.",
};
