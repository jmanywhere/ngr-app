import { Providers } from "./providers";
import "../styles/globals.css";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

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
      <body>
        <Header />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
