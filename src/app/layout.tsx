import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";

import "../styles/globals.css";
import "boxicons/css/boxicons.min.css";
import { Nav } from "../components/layout/nav";
import { Footer } from "../components/layout/footer";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Lista de compras",
  description: "Lista de compras - online e interativa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} max-w-xl flex flex-col min-h-dvh `}
      >
        <Nav />
        <main className="flex-grow bg-theme-gray">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
