import Image from "next/image";
import logo from "../../../public/images/Logo.png";
import Link from "next/link";
import Web3HeaderBtn from "./W3HeaderBtn";
import MenuButton from "./MenuButton";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-white w-full fixed top-0 z-50 pl-6 pr-0 lg:pr-6 py-2 border-b-[1px] border-black">
      <Link href="/">
        <Image src={logo} alt="NextGen Logo" className="w-[150px] h-[50]" />
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
          Lotery
        </a>
        <a href="#TradingBot" className="btn btn-link no-underline font-light capitalize text-black px-3">
          Trading Bot
        </a> */}
          <a
            href="#Socials"
            className="btn btn-link no-underline font-light capitalize text-black px-3"
          >
            Socials
          </a>
          <a
            href="#Audit"
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
          <Web3HeaderBtn />
        </div>
        <MenuButton />
      </div>
    </header>
  );
};

export default Header;
