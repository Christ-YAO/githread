// app/layout.
import { Header } from "@/components/layout/Header";
import { SiteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PropsWithChildren } from "react";
import { Providers } from "./Providers";
import "./globals.css";
import "./index.css";
import { TailwindIndicator } from "@/components/ui/utils/TailwindIndicator";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/components/layout/Footer";

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: SiteConfig.title,
  description: SiteConfig.description,
};

type LayoutProps = {
  children: React.ReactNode;
  modal?: React.ReactNode;
};

export default function RootLayout({ children, modal }: LayoutProps) {
  return (
    <>
      <html lang="en" className="h-full" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "h-full bg-background font-sans antialiased text-primary",
            fontSans.variable
          )}
        >
          <Providers>
            <div className="relative flex min-h-screen flex-col bg-accent/50 dark:bg-inherit">
              <Header />
              <div className="flex-1 max-w-xl m-auto w-full pt-16 pb-12 md:pb-4">
                {children}
                <Toaster />
              </div>
              <Footer />
            </div>
            {modal}
            <TailwindIndicator />
          </Providers>
        </body>
      </html>
    </>
  );
}
