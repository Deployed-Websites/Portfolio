export const sections = [
  {
    id: "problem",
    title: "The problem",
    body: `Working across multiple git repos at once — a Next.js frontend, a Django backend, custom Python packages — meant constantly cd-ing to the right folder just to commit and push. No matter how deep in a project you were, you had to physically navigate back to a specific place first. The goal: type one command from anywhere and have it figure out the rest.`,
  },
  {
    id: "persistent-path",
    title: "Persistent saved path",
    body: `The very first version only worked if you were already sitting in the right repo. The fix was to save a target path to a file (~/.gpush_path) that persists between terminal sessions — unlike a shell variable, which resets every time you close the terminal. Once saved, every future run just loads it automatically.`,
  },
  {
    id: "path-formatting",
    title: "Path auto-formatting",
    body: `Windows gives you backslash paths when you right-click Copy Path. Bash needs forward slashes. A small formatting step converts \\ to /, and converts a drive letter like C:/ into Bash's /c/ format. Getting this right took a few tries — the natural way of doing it in Bash (using echo) quietly ate the backslashes before they could be converted.`,
  },
  {
    id: "git-root-resolution",
    title: "Git root auto-resolution",
    body: `You shouldn't have to paste the exact root folder of a repo — pasting any path inside it, even a deeply nested subfolder, should just work. git rev-parse --show-toplevel walks up the folder tree until it finds the actual root of the repo, regardless of how many folders deep you are or what kind of project it is.`,
  },
  {
    id: "safety-check",
    title: "The safety check",
    body: `This is the most important part. Before committing anything, the script compares the git root of your saved target path against the git root of wherever your terminal currently is. If they don't match, it hard-stops — no automatic fix, no quiet recovery. You have to consciously move to the right repo or explicitly pass a new path. Committing the wrong files into the wrong repo can be genuinely bad (wrong files in wrong repo, accidental exposure of secrets, painful git history to unpick) — so this is the one place where friction is intentional.`,
  },
  {
    id: "confirmation-flow",
    title: "Confirmation flow",
    body: `Every time a path is used, it's shown back to you with a yes/no confirmation. Saying no doesn't cancel the whole thing — it just lets you type a new path inline and carries on with the push in the same run. Only the repo-safety check above skips this soft recovery, on purpose.`,
  },
  {
    id: "final-flow",
    title: "Putting it all together",
    body: `Full run order: load or ask for a path → resolve it to its real git root → confirm it → compare it against your current location's git root → hard-stop if they differ → cd into the target → ask for a commit message → add, commit, push. Below is the complete flow, plus how to actually set this up on a new machine.`,
  },
];