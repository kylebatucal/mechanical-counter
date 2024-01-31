import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";

const space = Space_Mono({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Mechanical Counter",
  description: "Skeuomorph of a mechanical counter implemented in React",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={space.className}>{children}</body>
    </html>
  );
}
