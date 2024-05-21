import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "@/providers/theme-provider";
import { AI } from "./actions";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "Sioux",
  description: "lightning ⚡",
  metadataBase: new URL("https://sioux.vercel.app/"),
  icons: {
    icon: [
      {
        url: "/logo.png",
        href: "/logo.png",
      },
    ],
  },
  openGraph: {
    images: "/opengraph-image.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} selection:bg-primary selection:text-black`}
      >
        <AI>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
            <Analytics />
          </ThemeProvider>
        </AI>
      </body>
    </html>
  );
}
