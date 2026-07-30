"use client";
import Accordion from "./components/Accordion";
import PathTransform from "./components/diagrams/PathTransform";
import FileSystemTree from "./components/diagrams/FileSystemTree";
import SafetyCheckDiagram from "./components/diagrams/SafetyCheckDiagram";
import TerminalSnippet from "./components/diagrams/TerminalSnippet";
import FullPipeline from "./components/diagrams/FullPipeline";
import CodeBlock from "./components/CodeBlock";
import { sections } from "./data/sections";
import { bashCode, cmdCode } from "./data/code";

const gitRootExampleNodes = [
  { id: "n1", label: "portfolio-site", depth: 0 },
  { id: "n2", label: "src", depth: 1 },
  { id: "n3", label: "app", depth: 2 },
  { id: "n4", label: "lab", depth: 3 },
  { id: "n5", label: "gradient-descent", depth: 4 },
];

function renderDiagram(diagramKey) {
  switch (diagramKey) {
    case "pathTransform":
      return <PathTransform />;
    case "fileSystemTree":
      return (
        <div className="border border-gray-800 rounded-lg p-5 mt-4 bg-black/30">
          <FileSystemTree nodes={gitRootExampleNodes} highlightId="n5" rootId="n1" />
        </div>
      );
    case "safetyCheck":
      return <SafetyCheckDiagram />;
    case "terminal":
      return <TerminalSnippet />;
    case "fullPipeline":
      return <FullPipeline />;
    default:
      return null;
  }
}

export default function GpushPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-8 py-16">
      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="mb-12">
          <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">
            Projects
          </div>
          <h1 className="text-3xl font-bold mb-3">gpush</h1>
          <p className="text-gray-400 leading-relaxed">
            A custom shell command that lets me commit and push to any of my repos
            from anywhere in the file system — with a built-in safety check so I
            never accidentally push the wrong files into the wrong project.
          </p>
        </div>

        {/* ACCORDION */}
        <Accordion
          items={sections}
          renderContent={(item) => (
            <div>
              <p>{item.body}</p>
              {renderDiagram(item.diagram)}
              {item.id === "final-flow" && (
                <CodeBlock bashCode={bashCode} cmdCode={cmdCode} />
              )}
            </div>
          )}
        />

      </div>
    </main>
  );
}