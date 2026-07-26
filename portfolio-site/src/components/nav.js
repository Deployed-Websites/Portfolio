import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex items-center justify-between px-8 py-6 border-b border-gray-800">
      
      {/* YOUR NAME / LOGO - links back home */}
      <Link href="/" className="font-bold text-lg hover:text-gray-400 transition-colors">
        {/* Your name or logo here */}
        Armaan Khaitan
      </Link>

      {/* NAV LINKS */}
      <div className="flex gap-8 text-sm text-gray-400">
        <Link href="/lab" className="hover:text-white transition-colors">Lab</Link>
        <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
        <Link href="/writing" className="hover:text-white transition-colors">Writing</Link>
        <Link href="/about" className="hover:text-white transition-colors">About</Link>
      </div>

    </nav>
  );
}