import type { Metadata } from "next";
import "./globals.css";

import Preloader from "./components/Preloader";

export const metadata: Metadata = {
  title: "Onnesok | Portfolio",
  description: "Portfolio of a passionate developer and robotics enthusiast.",
  icons: {
    icon: "/favicon.png",
    apple: "/icons/Icon-192.png",
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
