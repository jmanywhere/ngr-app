import Image from "next/image";
import logo from "../../../public/images/Logo.png";
import Link from "next/link";
import Web3HeaderBtn from "./W3HeaderBtn";
import MenuButton from "./MenuButton";

const Header = () => {
  return (
    <header className="flex align-middle justify-between bg-white w-full fixed top-0 z-50">
      <Image src={logo} alt="NextGen Logo" className="w-[150px] h-[50]" />
      <MenuButton />
      <nav className="hidden md:block">
        <Link href="/">Home</Link>
        <a href="#FAQ">FAQ</a>
        <a href="#Lottery">Lotery</a>
        <a href="#TradingBot">Trading Bot</a>
        <a href="#Socials">Socials</a>
        <a href="#Audit">Audit</a>
        <a href="#Invest">Invest</a>
      </nav>
    </header>
  );
};

export default Header;
