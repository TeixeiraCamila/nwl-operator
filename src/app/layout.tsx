import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Navbar } from "@/components";
import { TRPCReactProvider } from "@/trpc/client";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "devroast",
  description: "paste your code. get roasted.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Navbar>
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="font-mono text-xl font-bold text-accent-green">
              {" > "}
            </span>
            <span className="font-mono text-lg font-medium text-text-primary">
              devroast
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/leaderboard"
              className="font-mono text-sm text-text-secondary hover:text-text-primary"
            >
              leaderboard
            </Link>
            <Link
              href="/examples"
              className="font-mono text-sm text-text-secondary hover:text-text-primary"
            >
              examples
            </Link>
          </div>
        </Navbar>
        <TRPCReactProvider>
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
