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
      <MenuButton />
      <nav className="hidden text-sm lg:block px-3">
        <a href="#FAQ" className="text-black px-6">
          FAQs
        </a>
        {/* <a href="#Lottery" className="text-black px-6">
          Lotery
        </a>
        <a href="#TradingBot" className="text-black px-6">
          Trading Bot
        </a> */}
        <a href="#Socials" className="text-black px-6">
          Socials
        </a>
        <a href="#Audit" className="text-black px-6">
          Audit
        </a>
        <Link
          href="/app"
          className="text-black px-6 btn-primary btn py-3 text-sm font-medium capitalize"
        >
          Invest
        </Link>
      </nav>
    </header>
  );
};

export default Header;
