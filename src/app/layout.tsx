import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/lib/smooth_scroll";
import Header from "@/components/navbar/header";
import Footer from "@/components/footer";

const serif_display = DM_Serif_Display({
  variable: "--font-dm-serif-display",
  subsets: ["latin"],
  weight: ["400"]
});

const dm_sans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "North Zone Chapter of Urological Society of India",
  description: "The North Zone Section of the Urological Society of India is the most vibrant and happening section of the society for Indian Urologist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${serif_display.variable} ${dm_sans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <Footer />
      </body>
    </html>
  );
}
