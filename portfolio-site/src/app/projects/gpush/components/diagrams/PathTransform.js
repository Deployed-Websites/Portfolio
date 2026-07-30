"use client";
import { useState } from "react";

const stages = [
  {
    label: "Original path (Windows Copy Path)",
    value: "C:\\Users\\khait\\project\\src",
    explanation: "Windows gives you backslashes and a drive letter — neither works in Bash.",
    highlightIndexes: [],
  },
  {
    label: "Step 1 — backslashes to forward slashes",
    value: "C:/Users/khait/project/src",
    explanation: "Bash treats \\ as an escape character, not a path separator. sed 's|\\\\|/|g' swaps every backslash for a forward slash.",
    highlightIndexes: [1], // marks which segment changed, roughly
  },
  {
    label: "Step 2 — drive letter to Bash mount format",
    value: "/c/Users/khait/project/src",
    explanation: "Git Bash mounts Windows drives under /c/, /d/, etc. sed converts C:/ into /c/ (and lowercases the letter).",
    highlightIndexes: [0],
  },
];

export default function PathTransform() {
  const [stageIndex, setStageIndex] = useState(0);
  const stage = stages[stageIndex];

  return (
    <div className="border border-gray-800 rounded-lg p-5 mt-4 bg-black/30">
      <div className="text-xs uppercase tracking-wider text-gray-500 mb-3">
        {stage.label}
      </div>

      <div className="font-mono text-sm mb-3 flex flex-wrap gap-1">
        {stage.value.split("/").map((segment, i) => (
          <span key={i} className="flex items-center">
            {i > 0 && <span className="text-gray-600 mx-0.5">/</span>}
            <span
              className={
                stage.highlightIndexes.includes(i)
                  ? "bg-amber-400/20 text-amber-300 px-1 rounded"
                  : "text-gray-300"
              }
            >
              {segment}
            </span>
          </span>
        ))}
      </div>

      <p className="text-xs text-gray-500 mb-4">{stage.explanation}</p>

      <div className="flex gap-2">
        <button
          onClick={() => setStageIndex((i) => Math.max(0, i - 1))}
          disabled={stageIndex === 0}
          className="px-3 py-1.5 rounded-md border border-gray-700 text-xs disabled:opacity-30"
        >
          Back
        </button>
        <button
          onClick={() => setStageIndex((i) => Math.min(stages.length - 1, i + 1))}
          disabled={stageIndex === stages.length - 1}
          className="px-3 py-1.5 rounded-md border border-gray-700 text-xs disabled:opacity-30"
        >
          Next transformation
        </button>
      </div>
    </div>
  );
}