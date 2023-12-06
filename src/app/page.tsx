import type { NextPage } from "next";
import Image from "next/image";
import barsAndLogo from "../../public/images/heroimg.png";
import barsAndGuy from "../../public/images/Image_1.png";
import Link from "next/link";

const Page: NextPage = () => {
  return (
    <main className="mt-[65px] flex flex-col items-center ">
      <section className="flex flex-col lg:flex-row items-center justify-center p-6 lg:p-28 bg-hero-pattern-500 md:bg-hero-pattern-800 lg:bg-hero-pattern-1080 bg-cover w-full">
        <div className="flex flex-col items-center">
          <h2 className="text-[#012970] text-2xl md:text-4xl lg:text-5xl uppercase font-bold max-w-[300px] md:max-w-[650px] mb-3 lg:mb-6 text-center">
            The World&apos;s First Fully Collateralized ROI Platform
          </h2>
          <div className="flex flex-row items-center justify-center gap-6 w-full font-bold">
            <div className="flex flex-col items-center">
              <div className="text-sm md:text-lg whitespace-pre-wrap">
                <p>5% Fixed ROI</p>
                <p>Min Deposit:{"\n"}$10</p>
                <p>Max Deposit:{"\n"}$25</p>
              </div>
              <Link href="/invest/fixed" className="btn btn-primary">
                Invest Fixed
              </Link>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-sm md:text-lg whitespace-pre-wrap">
                <p>0.5% Daily Drip</p>
                <p>Min Deposit:{"\n"}$100</p>
                <p>Max Deposit:{"\n"}None</p>
              </div>
              <Link href="/invest/drip" className="btn btn-secondary">
                Invest Drip
              </Link>
            </div>
          </div>
        </div>
        <div className="mb-5 lg:order-2 lg:max-w-[500px]">
          <Image alt="logo" src={barsAndLogo} />
        </div>
      </section>
      <section className="bg-[#16171c] pt-20 pb-5 md:pb-14 lg:px-6 flex flex-col lg:flex-row lg:items-center w-full lg:justify-center">
        <div className="mb-12 lg:max-w-[500px]">
          <Image alt="graph" src={barsAndGuy} />
        </div>
        <div className="px-4 flex flex-col">
          <h2 className="text-2xl md:text-3xl font-bold text-white pb-5">
            What sets NEXTGENROI (NGR) apart?
          </h2>
          <ol className="list-decimal px-5 text-white">
            <li className="pb-2 text-sm md:text-base">
              Choose from a fixed final return or a daily drip, or do both
            </li>
            <li className="pb-2 text-sm md:text-base">Fully collateralized</li>
            <li className="pb-2 text-sm md:text-base">Zero Ponzinomics</li>
            <li className="pb-2 text-sm md:text-base">
              Serves Small and large investors equally
            </li>
            <li className="pb-2 text-sm md:text-base">
              Multiple investments from the same wallet
            </li>
            <li className="pb-2 text-sm md:text-base">
              GROW token price RISES after EVERY TX
            </li>
            <li className="pb-2 text-sm md:text-base">
              {" "}
              Earn <strong>extra money</strong> by liquidating eligible
              investments
            </li>
          </ol>
          <Link
            href="/faqs"
            className="self-end btn btn-primary capitalize text-[black] rounded px-6 py-2"
          >
            Read More
          </Link>
        </div>
      </section>
      {/* <section className="flex flex-col items-center py-14 px-3">
        <Image src={Logo} alt="logo" className="pb-10" height={300} />
        <p className="text-center px-5 text-xs text-black font-medium lg:max-w-[1024px]">
          NGR provides investors repeated returns of 5%. Each investment can
          take a few weeks, a few days…or even a few hours. This equates to a
          potential APY of over 100%.
          <br />
          NGR allows for auto-reinvestment of proceeds by simply checking a box
          in the dApp. Maximize APY by taking advantage of this feature.
          <br />
          <br />
          Max risk is 8%. The only way to lose 8% is to exit early before the
          profit Liquidation Events (LE) are triggered.
          <br />
          <br />
          NGR is safe and effective for both small and large investors alike.
          Each investor&apos;s holdings are 100% collateralized by USDT, and are
          entirely their own. There is no relying on Ponzinomics, miner
          algorithms, or gambling with the TCV.
          <br />
          <br />
          GROW will increase in price after EVERY transaction. The maximum
          single investment in NGR is $25, the minimum is $10.
          <br />
          <br />
          Each wallet can have unlimited individual investments.
          <br />
          <br />
          NGR allows verified liquidators to liquidate pending profits in the
          queue and receive a financial bonus for doing so.
          <br />
          <br />
          NGR ownership is committed to investor success. NGR&apos;s corporate
          wallet will do frequent buy &amp; burns to push the price higher and
          higher. The more invested, the more burned.
        </p>
      </section> */}
    </main>
  );
};

export default Page;
