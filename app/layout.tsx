import type { Metadata } from "next";
import localFont from "next/font/local";
import "./styles/workshop.css";
import "./styles/portfolio.css";
import "./styles/content.css";
import "./styles/navigation.css";
import "./styles/catalog.css";
import "./styles/buttons.css";
import "./styles/interaction.css";
import "./styles/mobile-navigation.css";
import "./styles/loading-titles.css";
import SiteLoader from "./components/SiteLoader";

const nameFont = localFont({
  src: "../public/fonts/teko-variable.ttf",
  variable: "--font-name",
  weight: "300 700",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://onnesok.github.io"),
  title: {
    default: "Ratul Hasan — Researcher, Engineer & Inventor",
    template: "%s — Ratul Hasan",
  },
  description:
    "Ratul Hasan, Research Assistant at BRAC University CSE. Explore research, robotics, hardware, software, games, and the curiosity behind them.",
  openGraph: {
    title: "Ratul Hasan — Researcher, Engineer & Inventor",
    description:
      "Research, robotics, useful software, and worlds to play in. Explore the workshop.",
    images: [{ url: "/design/workshop.webp", width: 2000, height: 675 }],
  },
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#101111",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nameFont.variable}>
        <SiteLoader />
        {children}
      </body>
    </html>
  );
}
