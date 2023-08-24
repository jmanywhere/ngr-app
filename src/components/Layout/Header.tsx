import Image from "next/image";
import logo from "../../../public/images/Logo.png";
import Link from "next/link";
import Web3HeaderBtn from "./W3HeaderBtn";
import MenuButton from "./MenuButton";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-white w-full fixed top-0 z-50 px-6 py-2">
      <Link href="/">
        <Image src={logo} alt="NextGen Logo" className="w-[150px] h-[50]" />
      </Link>
      <MenuButton />
      <nav className="hidden lg:block px-3">
        <a href="#FAQ" className="text-black px-6 text-lg font-medium">
          FAQs
        </a>
        {/* <a href="#Lottery" className="text-black px-6 text-lg font-medium">
          Lotery
        </a>
        <a href="#TradingBot" className="text-black px-6 text-lg font-medium">
          Trading Bot
        </a> */}
        <a href="#Socials" className="text-black px-6 text-lg font-medium">
          Socials
        </a>
        <a href="#Audit" className="text-black px-6 text-lg font-medium">
          Audit
        </a>
        <Link
          href="/app"
          className="text-black px-6 rounded bg-[#04BF55] py-3 text-lg font-medium"
        >
          Invest
        </Link>
      </nav>
    </header>
  );
};

export default Header;
