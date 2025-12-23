import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Chatbot from "@/components/Chatbot";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Visionary Eye Clinic - 25 Years of Excellence",
  description: "Professional eye care services with a modern touch. Trusted by thousands for over 25 years.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="min-h-screen dark:bg-gray-900 dark:text-gray-100">{children}</main>
          <WhatsAppButton />
          <Chatbot />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
