import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";

export function SiteFooter() {
  return (
    <footer className="border-base-300 bg-base-100 mt-12 border-t">
      <Container className="text-base-content/70 flex flex-col items-center justify-between gap-2 py-6 text-sm sm:flex-row">
        <p>
          {siteConfig.name} - {siteConfig.tagline}
        </p>
        <p>{siteConfig.disclaimer}</p>
      </Container>
    </footer>
  );
}
