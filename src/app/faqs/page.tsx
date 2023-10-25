import { NextPage } from "next";
import Image from "next/image";

import QuestionDropdown from "@/components/faq/QuestionDropdown";

import logo from "../../../public/growLogo.png";

const Page: NextPage = () => {
  return (
    <main className="pt-[65px] bg-hero-pattern-500 md:bg-hero-pattern-800 lg:bg-hero-pattern-1080 flex flex-col items-center px-5 lg:px-8">
      <h1 className="text-[#012970] text-3xl font-bold py-5 md:py-10 center">
        Frequently Asked Questions
      </h1>
      <section className="text-white/90 px-4 pt-4 pb-6 rounded-lg border-2 border-black flex flex-col md:flex-row md:justify-center md:gap-8 items-center bg-slate-800/80 mb-4 w-full md:max-w-[600px]">
        <Image
          src={logo}
          alt="NextGen Logo"
          width={100}
          height={100}
          className=" py-5 lg:mr-10"
        />
        <div className="pl-3">
          <h2 className="text-2xl text-primary font-bold">Common Acronyms:</h2>
          <ul>
            <li>
              <div className="mr-2 inline-block  w-12 font-bold">NGR</div>
              NextGenROI
            </li>
            <li>
              <div className="mr-2 inline-block  w-12 font-bold">TCV</div>Total
              Contract Value{" "}
            </li>
            <li>
              <div className="mr-2 inline-block  w-12 font-bold">PTR</div>
              Price-Tax Ratio{" "}
            </li>
            <li>
              <div className="mr-2 inline-block  w-12 font-bold">VBT</div>
              Virtual Burn Technology{" "}
            </li>
            <li>
              <div className="mr-2 inline-block  w-12 font-bold">CR </div>
              Corporate Restructure{" "}
            </li>
            <li>
              <div className="mr-2 inline-block  w-12 font-bold">IC </div>
              Investment Cycle{" "}
            </li>
            <li>
              <div className="mr-2 inline-block  w-12 font-bold">LE </div>
              Liquidation Event{" "}
            </li>
            <li>
              <div className="mr-2 inline-block  w-12 font-bold">LQ </div>
              Liquidation Queue{" "}
            </li>
          </ul>
        </div>
      </section>
      <section className=" pb-5">
        <div className="flex flex-col w-full items-center rounded-2xl border-2 border-black overflow-hidden">
          <QuestionDropdown
            question={"What exactly is NGR?"}
            ans={
              "NGR is a first-of-its-kind investment strategy that allows investors to earn 5% every few weeks, every few days, or even every few hours.  APY is potentially more than 100%."
            }
          />
          <QuestionDropdown
            question={
              "Will there be a private sale? Presale? Owner allocation?"
            }
            ans={
              "No, no, and no.  NGR is 100% fair launched, and owners will have to invest like everyone else."
            }
          />
          <QuestionDropdown
            question={"How does it work?"}
            ans={
              "NGR utilizes an ever-appreciating asset (GROW) to create rapid price movements that accelerate earnings."
            }
          />
          <QuestionDropdown
            question={"Why is the max investment only $25?"}
            ans={
              "NGR is a proprietary system that maximizes price rise and minimizes TCV, all with the end goal of paying investors principal plus interest as quickly as possible.  In order to do that most effectively, the amount that can be invested into NGR in a single investment must be managed.  Keep in mind, the limit applies only to a single investment.  Each wallet can have unlimited investments, so there is no limit to the total amount that can be invested.  The limit only applies to how much can be deposited in one TX."
            }
          />
          <QuestionDropdown
            question={"Why is GROW token used as a part of NGR?"}
            ans={
              "GROW utilizes Internal Liquidity Pool technology via a Swapper contract, which does not require PancakeSwap. It rises in value whether it’s bought OR sold, and is over 100% collateralized by USDT at all times.  Further, while buys raise value in a linear fashion, selling raises the value exponentially.  If NGR is the car, GROW token is the engine."
            }
          />
          <QuestionDropdown
            question={
              "You've said that NGR is not a Ponzi.  How is it not a Ponzi?"
            }
            ans={
              "A Ponzi scam commits to paying out more than actually exists in total funds.  That is NOT the case here.  Each investment is fully collateralized by USDT.  If someone invests $20, they will either leave the system with $21 or quit early with $18.40 by exiting before their Liquidation Events (LEs)."
            }
          />
          <QuestionDropdown
            question={"Is NGR just a fancy miner"}
            ans={
              "NO!  There is no “communal pot”, no “miner algorithm”, and no relying on unrealistic expectations of a certain yield per day that promises to pay out more than actually exists in the TCV.  100% of miners and any token that guarantees a certain yield per day is a Ponzi scheme and unsustainable."
            }
          />
          <QuestionDropdown
            question={
              "Will you be using the TCV for trading to generate additional revenue?"
            }
            ans={
              "Absolutely NOT.  The TCV is locked forever and can't be tampered with."
            }
          />
          <QuestionDropdown
            question={
              "Why would you want to keep TCV low?  I thought a high TCV is a good thing?"
            }
            ans={
              "With TCV kept purposefully LOW, price impact remains purposefully HIGH.  This is why investors are liquidated after reaching profit targets."
            }
          />
          <QuestionDropdown
            question={
              "Is the ownership buy & burn a one-time thing?  How often will it be done?"
            }
            ans={
              " Ownership will have a corporate wallet that exists specifically to do nothing but buy & burns.  The contract will trigger these automatically.  NGR will also have additional third-party revenue streams that will contribute to the burns."
            }
          />
          <QuestionDropdown
            question={"Are there minimums and maximum amounts one can invest?"}
            ans={
              "Yes.  The minimum is $10 and the maximum will be $25.  Keep in mind that each wallet can have as many individual investments as desired.  There is no cap to the total dollars any one investor can deposit."
            }
          />
          <QuestionDropdown
            question={"How do I invest?"}
            ans={"Easy!  Simply make a deposit of USDT via our dApp."}
          />
          <QuestionDropdown
            question={"Can I buy GROW outside of NGR?"}
            ans={
              "No.  GROW only exists within NGR and it is not possible to purchase any other way."
            }
          />
          <QuestionDropdown
            question={"What is the Liquidation Price (LP)?"}
            ans={
              "The LP shows the price at which GROW must appreciate to trigger your own personal liquidation events."
            }
          />
          <QuestionDropdown
            question={"What is a Liquidation Event (LE)?"}
            ans={
              "A LE is when a profit target is met and the investment moves to the queue to be liquidated by a verified liquidator."
            }
          />
          <QuestionDropdown
            question={
              "When my LEs are triggered, do the actual TXs happen automatically?"
            }
            ans={" No.  Liquidations are executed by verified liquidators."}
          />
          <QuestionDropdown
            question={"Can anyone be a liquidator and claim the rewards?"}
            ans={
              "No.  As of launch, an investor must have invested a minimum of $50 total into NGR to qualify as a liquidator.  That threshold is likely to go up over time."
            }
          />
          <QuestionDropdown
            question={
              "How long will I have to wait to receive my investment plus profit back?"
            }
            ans={
              "Time frames can vary, but generally each investment can last anywhere from a few hours to a few weeks."
            }
          />
          <QuestionDropdown
            question={"Can the TCV ever be drained?"}
            ans={
              "No, it is not possible to drain the TCV.  Every investment in NGR is fully collateralized."
            }
          />
          <QuestionDropdown
            question={
              "I just invested $15 in NGR.  I want to add to my position.  Can I do that?"
            }
            ans={
              "You cannot add to an existing investment, but you CAN make as many NEW deposits as you would like.  The dApp will lay out each investment separately for you, showing the Liquidation Price for each."
            }
          />
          <QuestionDropdown
            question={
              "I would like to automatically reinvest after liquidation(s).  Is this possible?"
            }
            ans={
              "Yes. Simply check the box that requests automatic reinvestment."
            }
          />
          <QuestionDropdown
            question={
              " Is there a penalty for withdrawing before the LE events are triggered?"
            }
            ans={
              "The investor will lose the full tax amount of 8% if exiting before their LE."
            }
          />
          <QuestionDropdown
            question={"What are the taxes for?"}
            ans={
              " GROW has a 4% buy and 4% sell tax, for a total of 8%. 6% raises the price of GROW, 2% goes to the co-founders for development and marketing."
            }
          />
          <QuestionDropdown
            question={"What is the Lottery?"}
            ans={
              "The Lottery will be an add-on service that will be released shortly after NGR.  For a very small ticket price, investors will have a chance to win cash prizes.  You must be an NGR investor to participate in the lottery."
            }
          />
          <QuestionDropdown
            question={" Are there any other external revenue projects on tap?"}
            ans={
              "NGR is committed to scouring the globe looking for eco-friendly businesses who would like to partner with us.  The first project is already under way, and will be revealed shortly after launch."
            }
          />
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
