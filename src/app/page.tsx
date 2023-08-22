import type { NextPage } from "next";
import Image from "next/image";
import barsAndLogo from "../../public/images/Image.png";
import barsAndGuy from "../../public/images/Image_1.png";
import Logo from "../../public/images/Logo.png";

const Page: NextPage = () => {
  return (
    <main className="mt-[65px] flex flex-col items-center ">
      <section className="flex flex-col lg:flex-row items-center p-6 lg:p-28 bg-hero-pattern-500 md:bg-hero-pattern-800 lg:bg-hero-pattern-1080">
        <div className="mb-5 lg:order-2 lg:max-w-[500px]">
          <Image alt="logo" src={barsAndLogo} />
        </div>
        <div className="p-5 lg:order-1 lg:p-">
          <h2 className="text-[#012970] text-2xl md:text-4xl lg:text-5xl uppercase font-bold max-w-[300px] md:max-w-[650px] mb-3 lg:mb-6">
            THE FIRST EVER FULLY COLLATERALIZED ACCELERATED ROI PLATFORM
          </h2>
          <p className="text-[black] font-semibold text-sm md:text-base lg:text-lg lg:font-semibold mb-3 lg:mb-5">
            6% ROI (134% APY)
          </p>
          <p className="text-[black] font-semibold text-sm md:text-base lg:text-lg lg:font-semibold mb-3 lg:mb-5">
            Zero Ponzinomics
          </p>
          <p className="text-[black] font-semibold text-sm md:text-base lg:text-lg lg:font-semibold mb-3 lg:mb-5">
            Max Risk 6%
          </p>
          <p className="text-[black] font-semibold text-sm md:text-base lg:text-lg lg:font-semibold mb-3 md:mb-12 lg:mb-16">
            Available on Binance Smart Chain. Other chains coming soon!
          </p>
          <a
            href=""
            className="rounded bg-[#04BF55] text-[black] text-lg  px-6 py-2"
          >
            Invest
          </a>
        </div>
      </section>
      <section className="bg-[#1F2126] pt-20 pb-5 md:pb-14 lg:px-6 flex flex-col lg:flex-row lg:items-center w-full lg:justify-center">
        <div className="mb-12 lg:max-w-[500px]">
          <Image alt="graph" src={barsAndGuy} />
        </div>
        <div className="px-4 flex flex-col">
          <h2 className="text-2xl md:text-3xl font-bold text-white pb-5">
            What sets NEXTGENROI (NGR) apart?
          </h2>
          <ol className="list-decimal px-5 text-white">
            <li className="pb-2 text-sm md:text-base">
              Duration of each investment is brief (a few hours to a few weeks)
            </li>
            <li className="pb-2 text-sm md:text-base">
              6% guaranteed return (approximately 134% APY)
            </li>
            <li className="pb-2 text-sm md:text-base">
              Auto-reinvestment option to maximize APY
            </li>
            <li className="pb-2 text-sm md:text-base">Fully collateralized</li>
            <li className="pb-2 text-sm md:text-base">
              FIFO liquidation system
            </li>
            <li className="pb-2 text-sm md:text-base">Max risk just 6%</li>
            <li className="pb-2 text-sm md:text-base">
              Zero Ponzinomics - impossible to drain
            </li>
            <li className="pb-2 text-sm md:text-base">
              Benefits Small AND Large Investors, equally
            </li>
            <li className="pb-2 text-sm md:text-base">
              Innovative Corporate Restructure (CR) pricing strategy featuring
              HELIX token
            </li>
            <li className="pb-2 text-sm md:text-base">
              Virtual Burn Technology (VBT), featuring Sparks
            </li>
            <li className="pb-2 text-sm md:text-base">
              Price impact is always high because TCV is kept low
            </li>
            <li className="text-sm md:text-base mb-8">
              The same wallet can have multiple investments
            </li>
          </ol>
          <a
            href=""
            className="self-end bg-[#00bf62] text-[black] rounded px-6 py-2 text-lg"
          >
            Read More
          </a>
        </div>
      </section>
      <section className="flex flex-col items-center py-14 px-3">
        <Image src={Logo} alt="logo" className="pb-10" />
        <p className="text-center px-5 text-xs text-black font-medium lg:max-w-[1024px]">
          NGR provides investors repeated returns of 6%. Each investment can
          take a few weeks, a few days…or even a few hours. This equates to an
          APY conservatively of approximately 134%. NGR allows for
          auto-reinvestment of proceeds by simply checking a box in the dApp.
          Maximize APY by taking advantage of this feature. <br />
          <br /> NGR utilizes the fair and equitable FIFO (First In First Out)
          system for automatically liquidating investors. <br />
          <br /> Max risk is 6%. The only way to lose 6% is if an investor exits
          NGR early before the 6% profit Liquidation Event (LE) is automatically
          triggered. <br />
          <br /> NGR is safe and effective for both small and large investors
          alike. Each investor’s holdings are 100% collateralized by USDT, and
          are entirely their own. There is no relying on Ponzinomics, miner
          algorithms, gambling with the TCV, or other empty promises of a daily
          return that is completely unsustainable at best, and outright
          fraudulent at worst. <br />
          <br /> HELIX will increase in price/value after EVERY transaction, and
          exist in a never-ending loop between $1.00 and $1.20. Every time the
          price hits $1.20, the price resets back to $1.00. This event is called
          a Corporate Restructure (CR). <br />
          <br /> Our Virtual Burn Technology (VBT) utilizes virtual tokens
          (Sparks) which are burned at the beginning of every new cycle as new
          investments are made. These burns create dramatic jumps in price, thus
          accelerating the completion of each cycle. <br />
          <br /> Want to invest more than $1,000 if that is the maximum? No
          problem. Simply make multiple deposits from the same wallet.
        </p>
      </section>
    </main>
  );
};

export default Page;
