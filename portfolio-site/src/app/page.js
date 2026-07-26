export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground px-8 py-12">
      
      {/* HERO - your name, title, short intro */}
      <section className="mb-24">
        <h1 className="text-6xl font-bold mb-4">Armaan Khaitan</h1>
        <p className="text-xl text-gray-400">I&apos;m a third year undergraduate university student studying B.Sc Artificial Intelligence and Computer Science at the University of Birmingham. I have a lot of interest in machine learning, deep learning and robotics and would like to apply what I&apos;ve learnt in university especially the AI specific modules as well as all the things I&apos;ve learnt myself in my free time to real projects.</p>
      </section>

      {/* HUB LINKS - the main zones of your site */}
      <section className="mb-24">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <a href="/lab" className="border border-gray-700 rounded-lg p-6 hover:border-white transition-colors">
            <h2 className="text-lg font-semibold mb-2">Lab</h2>
            <p className="text-sm text-gray-400">Interactive concepts & demos</p>
          </a>
          <a href="/projects" className="border border-gray-700 rounded-lg p-6 hover:border-white transition-colors">
            <h2 className="text-lg font-semibold mb-2">Projects</h2>
            <p className="text-sm text-gray-400">Things I&apos;ve built</p>
          </a>
          <a href="/writing" className="border border-gray-700 rounded-lg p-6 hover:border-white transition-colors">
            <h2 className="text-lg font-semibold mb-2">Writing</h2>
            <p className="text-sm text-gray-400">Articles & learn log</p>
          </a>
          <a href="/about" className="border border-gray-700 rounded-lg p-6 hover:border-white transition-colors">
            <h2 className="text-lg font-semibold mb-2">About</h2>
            <p className="text-sm text-gray-400">Who I am & my stack</p>
          </a>
        </div>
      </section>

    </main>
  );
}