import Link from "next/link";

const concepts = [
  {
    slug: "gradient-descent",
    title: "Gradient Descent",
    teaser: "Why does the ball always find the valley? (Sometimes it doesn't.)",
    status: "live",
  },
  {
    slug: "stochastic-descent",
    title: "Stochastic Gradient Descent",
    teaser: "What happens when you only look at part of the map each step.",
    status: "coming soon",
  },
  {
    slug: "simulated-annealing",
    title: "Simulated Annealing",
    teaser: "Sometimes you have to move uphill to find the real valley.",
    status: "coming soon",
  },
  {
    slug: "hill-climbing",
    title: "Hill Climbing",
    teaser: "The greedy approach — and where it breaks.",
    status: "coming soon",
  },
];

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
          {concepts.map((concept) => {
            const isLive = concept.status === "live";
            const CardContent = (
              <div
                className={`border rounded-lg p-6 h-full transition-colors ${
                  isLive
                    ? "border-gray-700 hover:border-white cursor-pointer"
                    : "border-gray-900 opacity-50 cursor-default"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold">{concept.title}</h2>
                  {!isLive && (
                    <span className="text-[10px] uppercase tracking-wider text-gray-600 border border-gray-800 rounded-full px-2 py-0.5">
                      Soon
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{concept.teaser}</p>
              </div>
            );

            return isLive ? (
              <Link key={concept.slug} href={`/lab/${concept.slug}`}>
                {CardContent}
              </Link>
            ) : (
              <div key={concept.slug}>{CardContent}</div>
            );
          })}
        </div>

      </div>
    </main>
  );
}