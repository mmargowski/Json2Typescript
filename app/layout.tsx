import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "JSON to TypeScript Interfaces Converter | Online Tool",
  description:
    "Free online tool to instantly convert JSON to TypeScript interfaces. Generate clean, accurate TypeScript interfaces from any JSON object. No sign-up required.",
  keywords: [
    "JSON to TypeScript",
    "TypeScript interfaces",
    "JSON converter",
    "TypeScript generator",
    "online converter",
    "JSON to TS",
    "convert JSON to interface",
    "TypeScript tool",
  ],
  authors: [{ name: "Marius Margowski", url: "https://mariusmargowski.com" }],
  creator: "Marius Margowski",
  publisher: "Marius Margowski",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "JSON to TypeScript Interfaces Converter",
    description:
      "Free online tool to convert JSON to TypeScript interfaces instantly",
    siteName: "JSON to TypeScript Converter",
  },
  category: "Developer Tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
