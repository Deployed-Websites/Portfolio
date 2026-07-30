"use client";
import { useState } from "react";

const branches = {
  yes: [
    { text: "Using saved path: /c/Users/khait/portfolio-site", type: "output" },
    { text: "Continue? (y/n): y", type: "input" },
    { text: "→ proceeds straight to commit", type: "result" },
  ],
  no: [
    { text: "Using saved path: /c/Users/khait/portfolio-site", type: "output" },
    { text: "Continue? (y/n): n", type: "input" },
    { text: "Enter new path: /c/Users/khait/other-project", type: "input" },
    { text: "→ saves the new path, then proceeds to commit in the same run", type: "result" },
  ],
};

export default function TerminalSnippet() {
  const [branch, setBranch] = useState("no");
  const lines = branches[branch];

  return (
    <div className="border border-gray-800 rounded-lg p-5 mt-4 bg-black/30">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setBranch("yes")}
          className={`px-3 py-1.5 rounded-md text-xs border ${
            branch === "yes" ? "bg-white text-black border-white" : "border-gray-700 text-gray-400"
          }`}
        >
          If you say yes
        </button>
        <button
          onClick={() => setBranch("no")}
          className={`px-3 py-1.5 rounded-md text-xs border ${
            branch === "no" ? "bg-white text-black border-white" : "border-gray-700 text-gray-400"
          }`}
        >
          If you say no
        </button>
      </div>

      <div className="bg-black rounded-md p-4 font-mono text-xs space-y-1.5">
        {lines.map((line, i) => (
          <div
            key={i}
            className={
              line.type === "result"
                ? "text-amber-300 mt-2"
                : line.type === "input"
                ? "text-green-400"
                : "text-gray-400"
            }
          >
            {line.text}
          </div>
        ))}
      </div>
    </div>
  );
}