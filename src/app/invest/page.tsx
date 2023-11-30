import DripStats from "@/components/drip/Stats";

export default function InvestPage() {
  return (
    <div className="flex flex-col items-center py-10 gap-10">
      <div>
        <h2 className="pb-4 text-center">
          <span className="text-secondary text-3xl font-bold  uppercase">
            Drip
          </span>
        </h2>
        <DripStats />
      </div>
    </div>
  );
}
