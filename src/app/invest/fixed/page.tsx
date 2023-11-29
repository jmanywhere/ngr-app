import { StatsCard } from "@/components/app/Cards";
import { fi } from "date-fns/locale";
import { NextPage } from "next";
import Link from "next/link";
import { formatEther } from "viem";

if (!process.env.BITQUERY_API)
  throw new Error("BITQUERY_API not set in environment variables");

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("X-API-KEY", process.env.BITQUERY_API);

const raw = JSON.stringify({
  query:
    'query MyQuery {\n  EVM(network: bsc, dataset: combined) {\n    Events(\n      where: {Log: {SmartContract: {is: "0xCFaFe72b956b19D044722395B2564f8997941Af3"}, Signature: {Name: {is: "Deposit"}}}, Call: {Signature: {Name: {is: "liquidatePositions"}}}}\n    ) {\n      Arguments {\n        Name\n        Index\n        Value {\n          ... on EVM_ABI_BigInt_Value_Arg {\n            bigInteger\n          }\n        }\n      }\n    }\n  }\n}\n',
  variables: "{}",
});

async function fetchRawGraphQl() {
  const res = await fetch("https://streaming.bitquery.io/graphql", {
    method: "POST",
    headers: myHeaders,
    body: raw,
    next: { revalidate: 3600 },
  });

  const fullData = await res.json();
  const data = fullData.data.EVM.Events;
  const totalDeposits = data.reduce((acc: bigint, curr: any) => {
    const deposit = BigInt(curr.Arguments[2].Value.bigInteger);
    return acc + deposit;
  }, 0n) as bigint;
  return totalDeposits.toString();
}

const Page: NextPage = async () => {
  const depositData = await fetchRawGraphQl();
  return (
    <main className="flex flex-col items-center">
      <h1 className="text-secondary text-4xl font-bold  uppercase pb-4 ">
        Fixed Rate
      </h1>

      <section className="flex flex-col px-5 w-full items-center lg:px-10 pb-5 gap-4">
        <StatsCard liquidationDeposits={depositData} />
      </section>
    </main>
  );
};

export default Page;

export const metadata = {
  title: "Next Gen ROI Dapp",
  description: "Get your assured 6% return, no BS, no ponzinomics",
};
