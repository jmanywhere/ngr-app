import { Providers } from "./providers";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { Arimo } from "next/font/google";
import "@/styles/globals.css";
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
        <Providers>
          <Header />
          {children}
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
