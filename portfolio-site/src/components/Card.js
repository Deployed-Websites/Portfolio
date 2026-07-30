import Link from "next/link";

export default function Card({ href, title, teaser, isLive }) {
  const cardContent = (
    <div
      className={`border rounded-lg p-6 h-full transition-colors ${
        isLive
          ? "border-gray-700 hover:border-white cursor-pointer"
          : "border-gray-900 opacity-50 cursor-default"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        {!isLive && (
          <span className="text-[10px] uppercase tracking-wider text-gray-600 border border-gray-800 rounded-full px-2 py-0.5">
            Soon
          </span>
        )}
      </div>
      <p className="text-sm text-gray-400 leading-relaxed">{teaser}</p>
    </div>
  );

  return isLive ? <Link href={href}>{cardContent}</Link> : <div>{cardContent}</div>;
}