import Image from "next/image";
import logo from "../../../public/images/Logo.png";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex">
      <Image src={logo} alt="NextGen Logo" />
      <nav>
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
