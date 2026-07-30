"use client";
import { useState } from "react";
import FileSystemTree from "./FileSystemTree";

const scenarios = {
  match: {
    label: "Matching repos",
    current: [
      { id: "c1", label: "portfolio-site", depth: 0 },
      { id: "c2", label: "src", depth: 1 },
      { id: "c3", label: "app", depth: 2 },
      { id: "c4", label: "lab", depth: 3 },
    ],
    saved: [
      { id: "s1", label: "portfolio-site", depth: 0 },
      { id: "s2", label: "src", depth: 1 },
    ],
    currentHighlight: "c4",
    currentRoot: "c1",
    savedRoot: "s1",
    result: "match",
  },
  mismatch: {
    label: "Different repos",
    current: [
      { id: "c1", label: "django-backend", depth: 0 },
      { id: "c2", label: "api", depth: 1 },
      { id: "c3", label: "views.py", depth: 2 },
    ],
    saved: [
      { id: "s1", label: "portfolio-site", depth: 0 },
      { id: "s2", label: "src", depth: 1 },
    ],
    currentHighlight: "c3",
    currentRoot: "c1",
    savedRoot: "s1",
    result: "mismatch",
  },
};

export default function SafetyCheckDiagram() {
  const [scenarioKey, setScenarioKey] = useState("mismatch");
  const scenario = scenarios[scenarioKey];

  return (
    <div className="border border-gray-800 rounded-lg p-5 mt-4 bg-black/30">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setScenarioKey("match")}
          className={`px-3 py-1.5 rounded-md text-xs border ${
            scenarioKey === "match" ? "bg-white text-black border-white" : "border-gray-700 text-gray-400"
          }`}
        >
          Show matching case
        </button>
        <button
          onClick={() => setScenarioKey("mismatch")}
          className={`px-3 py-1.5 rounded-md text-xs border ${
            scenarioKey === "mismatch" ? "bg-white text-black border-white" : "border-gray-700 text-gray-400"
          }`}
        >
          Show mismatch case
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Where you are</div>
          <FileSystemTree
            nodes={scenario.current}
            highlightId={scenario.currentHighlight}
            rootId={scenario.currentRoot}
          />
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Saved target</div>
          <FileSystemTree
            nodes={scenario.saved}
            rootId={scenario.savedRoot}
          />
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-800 flex items-center gap-2">
        {scenario.result === "match" ? (
          <>
            <span className="text-green-400 text-lg">✓</span>
            <span className="text-sm text-gray-300">Roots match — proceeds to commit.</span>
          </>
        ) : (
          <>
            <span className="text-red-400 text-lg">✕</span>
            <span className="text-sm text-gray-300">Roots differ — hard stop, no automatic recovery.</span>
          </>
        )}
      </div>
    </div>
  );
}