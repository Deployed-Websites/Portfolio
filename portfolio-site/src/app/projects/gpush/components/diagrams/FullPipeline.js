import FileSystemTree from "./FileSystemTree";
import PathTransform from "./PathTransform";
import SafetyCheckDiagram from "./SafetyCheckDiagram";
import TerminalSnippet from "./TerminalSnippet";

const setupSteps = [
  {
    title: "Git Bash",
    steps: [
      "Open ~/.bash_profile in an editor (nano ~/.bash_profile works fine)",
      "Paste the gpush() function in",
      "Make sure it also has: source ~/.bashrc — so future edits to .bashrc get picked up too",
      "Save, then run: source ~/.bash_profile to reload it into the current terminal",
      "If an old saved path exists from another machine, clear it: rm ~/.gpush_path",
    ],
  },
  {
    title: "Windows CMD",
    steps: [
      "Create a folder for personal scripts, e.g. C:\\Users\\you\\scripts",
      "Copy gpush.bat into that folder",
      "Add the folder to your system PATH via Environment Variables",
      "Open a fresh Command Prompt (existing ones won't see the PATH update)",
      "Type gpush to test it",
    ],
  },
];

export default function FullPipeline() {
  return (
    <div className="space-y-8 mt-4">

      {/* FULL PIPELINE RECAP */}
      <div className="border border-gray-800 rounded-lg p-5 bg-black/30">
        <div className="text-xs uppercase tracking-wider text-gray-500 mb-4">
          The complete flow, end to end
        </div>
        <ol className="space-y-2 text-sm text-gray-300 list-decimal list-inside">
          <li>Load the saved path, or ask for one if it&apos;s the first run</li>
          <li>Convert Windows-style backslashes and drive letters into a Bash-friendly format</li>
          <li>Walk up the folder tree to resolve the actual git root, however deep the path was</li>
          <li>Compare that root against the git root of wherever the terminal currently is</li>
          <li>Hard stop if they don&apos;t match — no automatic recovery, on purpose</li>
          <li>Confirm the path (or swap it inline if it&apos;s wrong)</li>
          <li>cd into the target, ask for a commit message, then add, commit, and push</li>
        </ol>
      </div>

      {/* HOW IT WAS ACTUALLY SET UP */}
      <div className="border border-gray-800 rounded-lg p-5 bg-black/30">
        <div className="text-xs uppercase tracking-wider text-gray-500 mb-4">
          How I set this up
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {setupSteps.map((group) => (
            <div key={group.title}>
              <div className="text-sm font-medium mb-2">{group.title}</div>
              <ol className="space-y-1.5 text-xs text-gray-400 list-decimal list-inside">
                {group.steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}