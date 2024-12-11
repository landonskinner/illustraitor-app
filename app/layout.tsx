import type { Metadata } from "next";
import "./globals.css";
import AnimatedBackground from "./components/animated-background";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "illustrAItor",
  description: "A fun, simple drawing app powered by AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`relative bg-ai-purple/20 ${nunito.className} antialiased`}
      >
        <AnimatedBackground />
        {children}
      </body>
    </html>
  );
}
