export const sections = [
  {
    id: "problem",
    title: "The problem",
    body: `Working across multiple git repos at once — a Next.js frontend, a Django backend, custom Python packages — meant constantly cd-ing to the right folder just to commit and push. No matter how deep in a project you were, you had to physically navigate back to a specific place first. The goal: type one command from anywhere and have it figure out the rest.`,
    diagram: null,
  },
  {
    id: "persistent-path",
    title: "Persistent saved path",
    body: `The very first version only worked if you were already sitting in the right repo. The fix was to save a target path to a file (~/.gpush_path) that persists between terminal sessions — unlike a shell variable, which resets every time you close the terminal. Once saved, every future run just loads it automatically.`,
    diagram: null,
  },
  {
    id: "path-formatting",
    title: "Path auto-formatting",
    body: `Windows gives you backslash paths when you right-click Copy Path. Bash needs forward slashes and a different drive format. Click through the transformation below to see exactly what changes at each step, and why.`,
    diagram: "pathTransform",
  },
  {
    id: "git-root-resolution",
    title: "Git root auto-resolution",
    body: `You shouldn't have to paste the exact root folder of a repo — pasting any path inside it, even a deeply nested subfolder, should just work. git rev-parse --show-toplevel walks up the folder tree until it finds the actual root of the repo, regardless of how many folders deep you are.`,
    diagram: "fileSystemTree",
  },
  {
    id: "safety-check",
    title: "The safety check",
    body: `This is the most important part. Before committing anything, the script compares the git root of the saved target against the git root of wherever the terminal currently is. If they don't match, it hard-stops — no automatic fix, no quiet recovery. Toggle between the two cases below to see what triggers the block.`,
    diagram: "safetyCheck",
  },
  {
    id: "confirmation-flow",
    title: "Confirmation flow",
    body: `Every time a path is used, it's shown back to you with a yes/no confirmation. Saying no doesn't cancel the whole thing — it lets you type a new path inline and carries on with the push in the same run.`,
    diagram: "terminal",
  },
  {
    id: "final-flow",
    title: "Putting it all together",
    body: `Full run order: load or ask for a path → resolve it to its real git root → confirm it → compare it against your current location's git root → hard-stop if they differ → cd into the target → ask for a commit message → add, commit, push.`,
    diagram: "fullPipeline",
  },
];