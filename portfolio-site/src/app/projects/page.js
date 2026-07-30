import { projects } from "./data/projects";
import Card from "@/components/Card";

export default function Projects() {
  return (
    <main className="min-h-screen bg-background text-foreground px-8 py-16">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="mb-16">
          <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">
            Projects
          </div>
          <h1 className="text-4xl font-bold mb-4">Things I&apos;ve Built</h1>
          <p className="text-gray-400 max-w-xl leading-relaxed">
            Real tools and systems, built to solve actual problems I ran into —
            with the reasoning behind every decision, not just the finished code.
          </p>
        </div>

        {/* PROJECT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <Card
              key={p.slug}
              href={`/projects/${p.slug}`}
              title={p.title}
              teaser={p.teaser}
              isLive={p.status === "live"}
            />
          ))}
        </div>

      </div>
    </main>
  );
}