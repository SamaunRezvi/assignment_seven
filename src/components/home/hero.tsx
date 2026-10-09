import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";

export function Hero() {
  return (
    <section className="from-primary/10 via-base-100 to-secondary/10 bg-linear-to-br">
      <Container className="grid items-center gap-8 py-10 md:grid-cols-2 md:py-16">
        <div className="space-y-4 text-center md:text-left">
          <p className="bg-primary/10 text-primary inline-block rounded-full px-4 py-1 text-sm font-semibold">
            {siteConfig.name} — {siteConfig.tagline}
          </p>
          <h1 className="text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="text-base-content/70 text-base sm:text-lg">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়,
            সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <div>
            <a href={`#${siteConfig.allProductsAnchor}`} className="btn btn-primary btn-md sm:btn-lg">
              সব পণ্য দেখুন
            </a>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src="/bazar-hero.png"
            alt="তাজা বাজারের ঝুড়ি"
            width={315}
            height={263}
            priority
            className="h-auto w-64 sm:w-80 md:w-full md:max-w-md"
          />
        </div>
      </Container>
    </section>
  );
}
