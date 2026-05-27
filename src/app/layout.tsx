import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aurion Capital Group | Premier Global Alternative Asset Manager",
  description:
    "Aurion Capital Group is a premier global alternative asset manager with $24B+ in AUM. Specializing in real estate, infrastructure, credit, and multi-asset solutions.",
  keywords: [
    "alternative assets",
    "investment management",
    "real estate",
    "infrastructure",
    "private equity",
    "credit",
    "ESG investing",
  ],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Aurion Capital Group | Premier Global Alternative Asset Manager",
    description:
      "Creating long-term value through disciplined investing across real estate, infrastructure, credit, and multi-asset solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
