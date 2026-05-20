import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thehertribe.com"),
  title: {
    default: "The Her Tribe — A women-led community for growth",
    template: "%s · The Her Tribe",
  },
  description:
    "The Her Tribe empowers women through financial literacy, career mentorship, workshops, and well-being — a supportive community where women design their own lives.",
  openGraph: {
    title: "The Her Tribe",
    description:
      "A women-led community for financial literacy, career mentorship, and well-being.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
