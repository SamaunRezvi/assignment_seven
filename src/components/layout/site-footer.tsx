import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";

export function SiteFooter() {
  return (
    <footer className="border-base-300 bg-base-100 mt-16 border-t">
      <Container className="text-base-content/70 flex flex-col gap-2 py-6 text-sm md:flex-row md:items-center md:justify-between">
        <p className="font-medium">
          {siteConfig.name} — {siteConfig.tagline}
        </p>
        <p className="md:text-right">{siteConfig.disclaimer}</p>
      </Container>
    </footer>
  );
}
