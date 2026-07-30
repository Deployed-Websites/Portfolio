// Each flow step is tagged with the section id it becomes visible at.
// The FlowDiagram component will show all steps up to and including
// the currently open section's position in this list.

export const flowSteps = [
  {
    id: "load-path",
    label: "Load saved path",
    detail: "Read ~/.gpush_path, or ask for one if it doesn't exist yet.",
    revealedAt: "persistent-path",
  },
  {
    id: "format-path",
    label: "Format the path",
    detail: "Convert backslashes and drive letters into a format Bash understands.",
    revealedAt: "path-formatting",
  },
  {
    id: "resolve-root",
    label: "Resolve to git root",
    detail: "Walk up from the given path to find the actual root of the repo.",
    revealedAt: "git-root-resolution",
  },
  {
    id: "safety-check",
    label: "Compare against current location",
    detail: "Hard stop if you're standing inside a different repo than the saved one.",
    revealedAt: "safety-check",
  },
  {
    id: "confirm",
    label: "Confirm the path",
    detail: "Shown back to you each run — say no to swap it inline.",
    revealedAt: "confirmation-flow",
  },
  {
    id: "commit-push",
    label: "Commit & push",
    detail: "cd into the target, ask for a commit message, then add, commit, push.",
    revealedAt: "final-flow",
  },
];