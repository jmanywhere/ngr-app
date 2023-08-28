import { NextPage } from "next";
import Image from "next/image";

import QuestionDropdown from "@/components/faq/QuestionDropdown";

import logo from "../../../public/images/Logo_1.png";

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
              "NGR is a first-of-its-kind fully collateralized investment strategy that allows investors to earn 6% every few weeks, every few days, or even every few hours.  Estimated yearly APY is 134%."
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
              "In the most basic terms, NGR utilizes an ever-appreciating asset (HELIX) combined with the use of Virtual Burn Technology (VBT) and Corporate Restructures (CRs) to create rapid price movements that accelerate earnings.  In fact, the value of HELIX will increase up to 30x faster than if it were a token that existed outside of NGR."
            }
          />
          <QuestionDropdown
            question={
              "Will you be using the TCV for trading to generate additional revenue?"
            }
            ans={
              "Absolutely NOT.  While we will have a Trading Bot to generate external revenue, the funding for the bot comes from outside sources. The TCV is locked forever and can't be tampered with."
            }
          />
          <QuestionDropdown
            question={
              "Why would you want to keep TCV low?  I thought a high TCV is a good thing?"
            }
            ans={
              "NGR functions by use of its own token, HELIX.  The lower the TCV, the higher the price impact on every TX.  What the investor SHOULD focus on is the total amount of payouts, which will be seen on the dApp."
            }
          />
          <QuestionDropdown
            question={"Are there minimums and maximum amounts one can invest?"}
            ans={
              "Yes.  The minimum is $5 and the maximum is $1,000. Keep in mind each wallet can have multiple investments running simultaneously."
            }
          />
          <QuestionDropdown
            question={"What does FIFO mean?"}
            ans={
              "FIFO stands for First In First Out.  Investors are liquidated in investment order at the 6% profit target based on FIFO."
            }
          />
          <QuestionDropdown
            question={"What is the Liquidation Queue (LQ)?"}
            ans={
              "The LQ shows your place in LE order.  If the number there is 15, that means that 14 investors must be liquidated from the system before it’s your turn."
            }
          />
          <QuestionDropdown
            question={"What does the Investment Cycle (IC) number mean?"}
            ans={
              "The price of HELIX cycles between $1.00 and $1.20 and then back to $1.00.  This cycle repeats indefinitely.  The IC number indicates which cycle we are currently in."
            }
          />
          <QuestionDropdown
            question={
              "How long will I have to wait to receive my investment plus profit back?"
            }
            ans={
              "The time frame can vary.  The duration of each investment can last a few weeks, a few days, or even a few hours."
            }
          />
          <QuestionDropdown
            question={"What is Virtual Burn Technology?"}
            ans={
              "Each investment is allocated extra virtual tokens, or Sparks.  These Sparks have no bearing on the final investment outcome, as the return is always 6%, but these virtual tokens get burned at the beginning of every CR as new investments come in.  The extra burn creates SUBSTANTIAL price impact, which in turn triggers LEs."
            }
          />
          <QuestionDropdown
            question={
              "Why are the virtual tokens (Sparks) burned only after each CR?  Why not burn them all the time?"
            }
            ans={
              "Burning Sparks after each CR as new investments come in is what accelerates LEs for that cycle.  The additional burning of Sparks during liquidations is not needed, as the liquidations cause an exponential rise in the value of HELIX"
            }
          />
          <QuestionDropdown
            question={
              "Why is my final position liquidated after a 6% profit?  Why not 8%?  Or 10%?"
            }
            ans={
              "We did the math.  Capping the returns at 6% does three things.  One, it gets investors in and out of NGR the most quickly.  Two, it yields the shortest time in between CRs.  Three, it provides the highest APY as compared to 8% or 10%."
            }
          />
          <QuestionDropdown
            question={
              "Is there a penalty for withdrawing before the 6% LE event is triggered?"
            }
            ans={
              "If an investor withdraws before his official LE event, he will lose 6%."
            }
          />
          <QuestionDropdown
            question={"What are the taxes for?"}
            ans={
              "HELIX has a 3% buy and 3% sell tax, for a total of 6%. 4.8% raises the price of HELIX, 1.2% goes to the co-founders for development and marketing."
            }
          />
          <QuestionDropdown
            question={"What is the Lottery?"}
            ans={
              "The Lottery will be an add-on service where investors can purchase tickets at a very small price for a chance to win cash prizes. The final details for the Lottery will be released prior to its deployment."
            }
          />
          <QuestionDropdown
            question={"Why is the HELIX token used as a part of NGR?"}
            ans={
              "HELIX utilizes internal Liquidity Pool technology via a Swapper contract, which does not require PancakeSwap.  It rises in value whether it’s bought OR sold, and is over 100% collateralized by USDT at all times.  Further, while buys raise value in a linear fashion, selling raises the value exponentially.  If NGR is the car, HELIX token is the engine."
            }
          />
          <QuestionDropdown
            question={
              "You've said that NGR is not a Ponzi.  How is it not a Ponzi?"
            }
            ans={
              "A Ponzi scam by definition allows one investor to profit at the expense of another investor.  A Ponzi scam also commits to paying out more than actually exists in total funds.  That is NOT the case here.  Every single investor’s tokens are fully collateralized by USDT and 100% their own.  If someone invests $500 ($470 after taxes), they will either leave the system with $530 or exit with $470 if they decide to quit and sell before their Liquidation Event (LE)."
            }
          />
          <QuestionDropdown
            question={"Is NGR just a fancy miner?"}
            ans={
              "NO!  There is no “communal pot”, no “miner algorithm”, and no relying on unrealistic expectations of a certain yield per day that promises to pay out more than actually exists in the TCV.  100% of miners, or any token that guarantees a DAILY % return in any form, are Ponzi schemes and unsustainable.  At NGR, every single investor’s funds are entirely collateralized."
            }
          />
          <QuestionDropdown
            question={"How do I invest?"}
            ans={"Easy!  Simply make a deposit via our dApp."}
          />
          <QuestionDropdown
            question={"Can I buy HELIX outside of NGR?"}
            ans={
              "No.  HELIX only exists within NGR and it is not possible to purchase any other way."
            }
          />
          <QuestionDropdown
            question={
              "When my LE is triggered, does the actual TX happen automatically?"
            }
            ans={"Yes.  The contract will exit your position for you."}
          />
          <QuestionDropdown
            question={"What is the max risk when investing in NGR?"}
            ans={
              " The max risk is 6% (3% buy tax and 3% sell tax).  The only way to lose 6% is if you sell HELIX before your LE is triggered."
            }
          />
          <QuestionDropdown
            question={"What is a “Corporate Restructure” (CR)?"}
            ans={
              "HELIX will rise every TX from the price of $1.00 to $1.20.  As soon as the price hits $1.20, the CR goes into effect, and the price begins anew at $1.00.  This cycle repeats itself forever."
            }
          />
          <QuestionDropdown
            question={
              "Why do CRs at all?  Why not just let the price go up to infinity?"
            }
            ans={
              "The simple answer is price impact.  Transactions have a greater impact the lower the price is.  Therefore, we’ve capped the price rise to 20% before the CR brings it back down to $1.00."
            }
          />
          <QuestionDropdown
            question={"Do I lose any holdings as a result of the CRs?"}
            ans={"No!  Your holdings are unaffected by CRs."}
          />
          <QuestionDropdown
            question={"Can the TCV ever be drained?"}
            ans={
              "No, It is not possible to drain the TCV.  We’ve conducted hundreds of thousands of simulations where every possible scenario is accounted for, and each time the TCV remains robust."
            }
          />
          <QuestionDropdown
            question={
              "I just invested $500 in NGR.  I've decided that I want to add to my position.  Can I do that?"
            }
            ans={
              "While you can’t add to an existing investment, you CAN make as many NEW deposits as you would like.  The dApp will lay out each investment separately for you, showing the LQ for each."
            }
          />
          <QuestionDropdown
            question={
              "I would like to automatically reinvest after liquidation(s). Is this possible?"
            }
            ans={
              "No, unfortunately it is cost prohibitive for us to autoomatically reinvest proceeds. Each investor will have to do this manually, so check yoour investments often! the dApp will show each investemnt's liquidated proceeds so that the investor can maximize compounded earnings."
            }
          />
          <QuestionDropdown
            question={
              "So does that mean that the actual price I purchased at has nothing to do with my total holdings?"
            }
            ans={
              "In a very real sense, that is correct.  The only number that matters to the investor is the amount invested.  It is of that number that the 6% return is calculated.  If you invested $500, you will exit the final LE with $530."
            }
          />
          <QuestionDropdown
            question={
              "What significance does the price of HELIX have within the cycle?"
            }
            ans={
              "The actual price and IC at entry will determine your place in the LQ."
            }
          />
          <QuestionDropdown
            question={
              "What if I sell all my holdings when the price almost hits $1.20?"
            }
            ans={
              "You will lose 6% of your deposit. Exiting NGR at ANY time before your predetermined LE means you’ve quit early.  The investment only ends after your LE."
            }
          />
          <QuestionDropdown
            question={"What kind of Trading Bot will you use?"}
            ans={
              "First, let’s be very clear.  The Trading Bot will NEVER use funds in the TCV to trade with.  Those are locked forever.  All funding for the bot will come from a combination of Lottery proceeds and owner fees.  Details will follow as the bot gets closer to release"
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
