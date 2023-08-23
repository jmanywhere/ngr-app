import { NextPage } from "next";

const Page: NextPage = () => {
  const TCV = 0; //fines ilustrativos
  const LiquidationSequence = 0; //fines ilustrativos
  const Liquidations = 0; //fines ilustrativos
  const Condition1 = true; //fines ilustrativos
  const Condition2 = true; //fines ilustrativos
  const Condition3 = true; //fines ilustrativos
  const Positions = 0; //fines ilustrativos
  const Position = 0; //fines ilustrativos
  const depositAmount = 0; //fines ilustrativos
  const liquidationAmount = 0; //fines ilustrativos
  const untilAmount = 0; //fines ilustrativos

  return (
    <main className="pt-[65px] bg-hero-pattern-500 md:bg-hero-pattern-800 lg:bg-hero-pattern-1080 flex flex-col items-center">
      <h1 className="text-black text-3xl font-bold py-5 uppercase">
        Investment
      </h1>
      <section className="flex flex-col px-5 w-full">
        <div className="text-black px-4 rounded-lg border-4 border-black flex flex-col items-center bg-black bg-opacity-40">
          <h2 className="font-bold text-2xl py-4">Stats</h2>
          <div className="w-full px-6 pb-4">
            <div className="flex justify-between">
              <p>TCV</p>
              <p>{TCV}</p>
            </div>
            <div className="flex justify-between">
              <p>Liquidation Sequence</p>
              <p>{LiquidationSequence}</p>
            </div>
            <div className="flex justify-between">
              <p>Liquidations</p>
              <p>{Liquidations}</p>
            </div>
          </div>
          <div className="w-full px-6 pb-4 border-b-4 border-black mb-4">
            <div className="flex justify-between">
              <p>Condition 1</p>
              <p>{String(Condition1)}</p>
            </div>
            <div className="flex justify-between">
              <p>Condition 2</p>
              <p>{String(Condition2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Condition 3</p>
              <p>{String(Condition3)}</p>
            </div>
          </div>
          <div>
            <h3>Your Stats</h3>
            <div className="flex justify-between">
              <p>Positions:</p>
              <p>{Positions}</p>
            </div>
            <div className="flex">
              <button className="px-5"> {"<"} </button>
              <p className="px-3">Position</p>
              <p className="px-3">{Position}</p>
              <button className="px-5"> {">"} </button>
            </div>
          </div>
          <div className="border-black border-2 rounded-lg">
            <div className="flex">
              <p>Deposit Amount:</p>
              <p>{depositAmount}</p>
            </div>
            <div className="flex">
              <p>Liquidation Amount:</p>
              <p>{liquidationAmount}</p>
            </div>
            <div className="flex">
              <p>Until Amount:</p>
              <p>{untilAmount}</p>
            </div>
          </div>
        </div>
        <div className="text-black">
          <h2>Actions</h2>
        </div>
      </section>
    </main>
  );
};

export default Page;

export const metadata = {
  title: "Next Gen ROI Dapp",
  description: "Get your assured 6% return, no BS, no ponzinomics",
};
