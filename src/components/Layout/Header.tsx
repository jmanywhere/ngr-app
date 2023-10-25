import Image from "next/image";
import logo from "../../../public/Logo.png";
import Link from "next/link";
import MenuButton from "./MenuButton";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-white w-full fixed top-0 z-50 pr-0 lg:pr-6 border-b-[1px] border-black flex-row ">
      <Link href="/" className="max-h-[75px] overflow-hidden">
        <Image
          src={logo}
          alt="NextGen Logo"
          className="w-[200px] -translate-y-[calc((125px-75px)/8)] transform"
        />
      </Link>
      <div className="flex flex-row items-center">
        <nav className="hidden text-sm lg:flex px-3 flex-row items-center gap-3">
          <Link
            href="/faqs"
            className="btn btn-link no-underline font-light capitalize text-black px-3"
          >
            FAQs
          </Link>
          {/* <a href="#Lottery" className="btn btn-link no-underline font-light capitalize text-black px-3">
          Lottery
        </a>
        <a href="#TradingBot" className="btn btn-link no-underline font-light capitalize text-black px-3">
          Trading Bot
        </a> */}
          <Link
            href="/#Socials"
            className="btn btn-link no-underline font-light capitalize text-black px-3"
          >
            Socials
          </Link>
          <a
            href="/#Audit"
            className="btn btn-link no-underline font-light capitalize text-black px-3"
          >
            Audit
          </a>
          <Link
            href="/app"
            className="text-black px-6 btn-primary btn text-sm font-medium capitalize"
          >
            Invest
          </Link>
        </nav>
        <div className="hidden md:block">
          <w3m-button balance="hide" />
        </div>
        <MenuButton />
      </div>
    </header>
  );
};

export default Header;
