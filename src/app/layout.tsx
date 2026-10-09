import type { Metadata, Viewport } from "next";
import { Hind_Siliguri } from "next/font/google";
import { Suspense } from "react";
import { siteConfig } from "@/config/site";
import { AppToaster } from "@/components/layout/app-toaster";
import { PriceTicker, TickerSkeleton } from "@/components/layout/price-ticker";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

const bengaliFont = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-bengali",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | আজকের বাজারের দাম এক নজরে`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজারদর, গড়, সর্বনিম্ন ও সর্বোচ্চ দাম এবং দামের পরিবর্তন এক জায়গায়।",
  applicationName: siteConfig.nameEn,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2f8f5b",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" data-theme="bazardor" className={bengaliFont.variable}>
      <body className="font-sans antialiased">
        <SiteHeader />
        <Suspense fallback={<TickerSkeleton />}>
          <PriceTicker />
        </Suspense>
        <main>{children}</main>
        <SiteFooter />
        <AppToaster />
      </body>
    </html>
  );
}
