import { Container } from "@/components/ui/container";

interface LegalSection {
  heading: string;
  body: string[];
}

interface LegalPageProps {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

export function LegalPage({ title, updated, intro, sections }: LegalPageProps) {
  return (
    <Container className="max-w-3xl py-10">
      <article className="card border-base-300 bg-base-100 border">
        <div className="card-body gap-6 p-6 sm:p-10">
          <header className="space-y-2">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-base-content/60 text-sm">Last updated: {updated}</p>
            <p className="text-base-content/80">{intro}</p>
          </header>

          {sections.map((section) => (
            <section key={section.heading} className="space-y-2">
              <h2 className="text-xl font-semibold">{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="text-base-content/80">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </Container>
  );
}
