"use client";
import Link from "next/link";
import Web3HeaderBtn from "./W3HeaderBtn";
import { useState } from "react";
import classNames from "classnames";

const MenuButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <details
        className="dropdown dropdown-end block lg:hidden "
        onClick={() => setOpen((p) => !p)}
      >
        <summary
          className={classNames(
            " btn bg-white swap swap-rotate w-full h-full z-10 border-none text-black",
            open ? "swap-active" : ""
          )}
        >
          {/* hamburger icon */}
          <svg
            className="swap-off fill-current "
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>

          {/* close icon */}
          <svg
            className="swap-on fill-current  "
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </summary>
        <nav className="shadow menu dropdown-content bg-white w-[100vw] text-black text-center">
          <a href="#FAQ" className="p-4 text-lg">
            FAQ
          </a>
          <a href="#Lottery" className="p-4 text-lg">
            Lotery
          </a>
          <a href="#TradingBot" className="p-4 text-lg">
            Trading Bot
          </a>
          <a href="#Socials" className="p-4 text-lg">
            Socials
          </a>
          <a href="#Audit" className="p-4 text-lg">
            Audit
          </a>
          <a href="#Invest" className="p-4 font-medium bg-[#04BF55] text-lg">
            Invest
          </a>
          <Web3HeaderBtn />
        </nav>
      </details>
    </>
  );
};

export default MenuButton;
