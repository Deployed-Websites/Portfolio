import { concepts } from "./data/concepts";
import Card from "@/components/Card";

export default function Lab() {
  return (
    <main className="min-h-screen bg-background text-foreground px-8 py-16">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="mb-16">
          <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">
            Lab · Series I
          </div>
          <h1 className="text-4xl font-bold mb-4">Gradient Optimisation Strategies</h1>
          <p className="text-gray-400 max-w-xl leading-relaxed">
            How do you find the bottom of a landscape you can&apos;t see all at once?
            A hands-on look at how machines search for the best answer, one step at a time.
          </p>
        </div>

        {/* CONCEPT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {concepts.map((c) => (
            <Card
              key={c.slug}
              href={`/lab/${c.slug}`}
              title={c.title}
              teaser={c.teaser}
              isLive={c.status === "live"}
            />
          ))}
        </div>

      </div>
    </main>
  );
}