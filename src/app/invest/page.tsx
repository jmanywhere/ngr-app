import GrowStats, { FixedNGRStats } from "@/components/app/invest/GrowStats";
import DripStats from "@/components/drip/Stats";

if (!process.env.BITQUERY_API || !process.env.BITQUERY_BEARER_KEY)
  throw new Error("BITQUERY keys not set in environment variables");

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("X-API-KEY", process.env.BITQUERY_API);
myHeaders.append("Authorization", `Bearer ${process.env.BITQUERY_BEARER_KEY}`);

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
    redirect: "follow",
    next: { revalidate: 3600 },
  })
    .then((x) => {
      if (x.status !== 200) return null;
      return x;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
  if (!res) return "4065750000000000000000";
  const fullData = await res.json();
  const data = fullData.data.EVM.Events;
  const totalDeposits = data.reduce((acc: bigint, curr: any) => {
    const deposit = BigInt(curr.Arguments[2].Value.bigInteger);
    return acc + deposit;
  }, 0n) as bigint;
  return totalDeposits.toString();
}

export default async function InvestPage() {
  const depositData = await fetchRawGraphQl();
  console.log(depositData);
  return (
    <div className="flex flex-col items-center py-10 gap-10">
      <div>
        <h2 className="pb-4 text-center">
          <span className="text-secondary text-3xl font-bold  uppercase">
            Grow Info
          </span>
        </h2>
        <GrowStats />
      </div>
      <div>
        <h2 className="pb-4 text-center">
          <span className="text-secondary text-3xl font-bold  uppercase">
            Fixed
          </span>
        </h2>
        <FixedNGRStats liquidationDeposits={depositData} />
      </div>
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
