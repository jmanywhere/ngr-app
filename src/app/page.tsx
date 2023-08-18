import type { NextPage } from "next";
import Image from "next/image";
import Background from "../../public/images/Background.png";

const Page: NextPage = () => {
  return (
    <main>
      <Image alt="Background" src={Background} className="z-[-10] absolute" />
      Main Page
    </main>
  );
};

export default Page;
