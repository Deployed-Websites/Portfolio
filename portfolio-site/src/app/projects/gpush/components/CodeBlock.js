"use client";
import { useState } from "react";

export default function CodeBlock({ bashCode, cmdCode }) {
  const [tab, setTab] = useState("bash");

  const activeCode = tab === "bash" ? bashCode : cmdCode;

  return (
    <div className="border border-gray-800 rounded-lg overflow-hidden mt-4">
      <div className="flex border-b border-gray-800">
        <button
          onClick={() => setTab("bash")}
          className={`px-4 py-2 text-xs font-mono ${
            tab === "bash" ? "bg-gray-900 text-white" : "text-gray-500"
          }`}
        >
          Git Bash
        </button>
        <button
          onClick={() => setTab("cmd")}
          className={`px-4 py-2 text-xs font-mono ${
            tab === "cmd" ? "bg-gray-900 text-white" : "text-gray-500"
          }`}
        >
          Windows CMD
        </button>
      </div>

      <pre className="p-4 text-xs overflow-x-auto text-gray-300 font-mono leading-relaxed">
        <code>{activeCode}</code>
      </pre>
    </div>
  );
}