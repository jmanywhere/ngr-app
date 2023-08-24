import { Providers } from "./providers";
import "../styles/globals.css";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { Arimo } from "next/font/google";
import classNames from "classnames";
const arimo = Arimo({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-arimo",
  display: "swap",
});

export const metadata = {
  title: "Next Gen ROI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${arimo.variable} bg-white font-arimo`}>
        <Header />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
