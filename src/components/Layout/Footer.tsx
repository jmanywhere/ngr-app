import Image from "next/image";
import logo from "../../../public/images/Logo_1.png";

const Footer = () => {
  return (
    <footer className="bg-[#16171c] px-5 pt-6 lg:pt-12 flex flex-col items-center">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:max-w-[500px] items-center pb-6 w-[100vw]">
        <Image
          src={logo}
          alt="NextGen Logo"
          className="w-[141px] h-[150] py-5 lg:mr-10"
        />
        <div className="flex flex-col md:flex-row md:max-w-[250px] md:w-full md:justify-between">
          <div className="flex flex-col items-center text-white pb-4">
            <h3 className="font-bold pb-3">GO TO</h3>
            <nav className="flex flex-col items-center text-white">
              <a href="#FAQ" className="text-sm py-2">
                FAQ
              </a>
              <a href="#Lottery" className="text-sm py-2">
                Lotery
              </a>
              <a href="#TradingBot" className="text-sm py-2">
                Trading Bot
              </a>
              <a href="#Audit" className="text-sm py-2">
                Audit
              </a>
            </nav>
          </div>
          <div className="flex flex-col items-center text-white">
            <h3 className="font-bold pb-3">Socials</h3>
            <nav className="flex flex-col items-center text-white">
              <a href="#Twiter" className="text-sm py-2">
                Twiter
              </a>
              <a href="#Discord" className="text-sm py-2">
                Discord
              </a>
              <a
                href="https://t.me/nextgenroi"
                rel="noopenner"
                className="text-sm py-2"
              >
                Telegram
              </a>
            </nav>
          </div>
        </div>
      </div>
      <div
        className="border-t-2 border-white text-white text-xs text-center py-3 pb-5 max-w-[1440px] w-full"
        id="Socials"
      >
        Copyright © 2022 NextGenROI, all rights reserved
      </div>
    </footer>
  );
};

export default Footer;
