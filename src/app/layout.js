import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DesktopOnlyWrapper from "./DesktopOnlyWrapper";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Doraemon Dice Dimension",
  description: "Doraemon Dice Dimension is a wildly unpredictable reimagining of the classic board game Snakes and Ladders. Inspired by the beloved anime Doraemon , this game introduces time-warping gadgets, dual-dice chaos, and strategic unpredictability into a nostalgic childhood favorite.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full h-full`}
      >
        <main className="w-full h-full">
          <DesktopOnlyWrapper>
            {children}
          </DesktopOnlyWrapper>
        </main>
      </body>
    </html>
  );
}
