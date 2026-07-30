# Portfolio Site — Handoff Document

## Overview
A personal hub site — portfolio, interactive ML "Lab," and a Projects section —
built with Next.js (App Router), Tailwind CSS, and plain JavaScript (no TypeScript).
No backend, no database. Content lives in data files and MDX-style structure for
future writing.

Stack: Next.js · Tailwind CSS · Three.js (via @react-three/fiber + drei) · Vercel (planned deploy)

---

## Site Structure

```
src/
  app/
    page.js                    → Home (renders PianoHome)
    layout.js                  → Root layout, includes Nav
    globals.css                → Tailwind v4 import + theme vars

    lab/
      page.js                  → Grid of concept cards
      data/concepts.js         → Concept card data
      gradient-descent/
        page.js
        lib/
          landscape.js          → loss(x,y) and gradient(x,y) math
          coords.js             → world <-> screen coordinate conversion
          candidateDirections.js→ visualization-only "sensing" sampler
          renderLandscape.js    → canvas drawing (terrain, path, sensing overlay)
        hooks/
          useDescentLoop.js     → animation/step loop, sensing-then-move logic
        components/
          LandscapeCanvas.js
          DescentControls.js
          MathPanel.js

    projects/
      page.js                   → Grid of project cards
      data/projects.js
      gpush/
        page.js                 → Accordion-based deep dive
        data/sections.js        → Section text + which diagram each uses
        data/code.js             → Full bash + cmd script strings
        components/
          Accordion.js           → Generic open/close list (supports "keep open")
          AccordionItem.js       → Single expandable row (presentational only)
          CodeBlock.js           → Tabbed bash/cmd code viewer
          diagrams/
            FileSystemTree.js     → Reusable folder-tree renderer
            PathTransform.js      → Step-through path formatting demo
            SafetyCheckDiagram.js → Match/mismatch repo comparison toggle
            TerminalSnippet.js    → Simulated y/n confirmation prompt
            FullPipeline.js       → Final recap + manual setup instructions

  components/
    Card.js                     → Shared card used by both /lab and /projects grids
    Nav.js                      → Top nav bar
    piano/
      pianoConfig.js             → All tunable numbers for the 3D piano scene
      PianoModel.js              → 3D piano geometry (body, lid, legs, keys)
      MusicStand.js               → 3D-positioned ledge + embedded HTML sheet
      MusicSheet.js               → The actual sheet content (name, bio)
      GrandPianoShape.js          → (superseded by full 3D model — may be unused now)
      Piano3D.js                  → Canvas/Scene wrapper, camera, lights, OrbitControls
    PianoHome.js                 → Composes Piano3D into the homepage
```

---

## Key Design Decisions

- **No CMS, no backend.** Content lives directly in the repo as data files (JS
  objects) — edit and redeploy, no database needed.
- **Config centralization.** All 3D piano scene numbers (positions, sizes, colors,
  camera, lighting) live in one file: `src/components/piano/pianoConfig.js`.
  Components read from it rather than hardcoding values inline.
- **Shared, generic components over duplication.** `Card.js`, `Accordion.js`, and
  `FileSystemTree.js` were all built once and reused across different sections
  rather than copy-pasted with small tweaks.
- **Data/rendering separation.** Section content (text, which diagram to show) is
  plain data (`sections.js`). The actual JSX/rendering choice lives in `page.js`'s
  `renderDiagram()` switch — content can be edited without touching layout code.
- **"Coming soon" pattern.** Both the piano's inactive keys and the Lab/Projects
  cards use the same idea: show the full set of planned items, dim the ones not
  built yet, and only make live ones clickable. Signals the site is built to grow.

---

## Homepage — 3D Piano Hero

- Built with `@react-three/fiber` + `@react-three/drei` (Three.js in React).
- Real 3D piano geometry (boxes/cylinders only, no heavy textures — kept fast).
- White keys mapped to nav links (Lab, Projects, Writing, About); black keys
  play sound only, no navigation.
- Music sheet (name + bio) is embedded **inside** the 3D scene using drei's
  `<Html transform>`, sitting on a ledge that's part of the same 3D group —
  so it moves/rotates with the piano rather than floating separately.
- Clicking any key plays a real tone via the Web Audio API
  (`src/components/piano/utils/playNote.js`).
- Navigation uses Next.js's client-side router (`useRouter().push`) instead of
  a full page reload, specifically so a key's note can keep ringing through
  the page transition.
- OrbitControls: rotate + zoom only activate when hovering the piano mesh
  itself (via a hover callback bubbled up from `PianoModel`), so scroll
  behaves normally everywhere else on the page.

---

## Lab — Gradient Descent Demo

Concept: click to drop a ball on a bumpy loss landscape; it "rolls downhill"
using real numerically-approximated gradient descent (finite differences,
not symbolic calculus — see `lib/landscape.js`).

Two teaching layers:
1. **"Sensing" visualization** (first ~3 steps only): samples 12 points in a
   ring around the ball (`lib/candidateDirections.js`), draws faint arrows to
   each, highlights the steepest one in amber, then commits the real gradient
   step. After the sensing-step limit, it skips straight to fast dot-hopping.
2. **"Show the maths" toggle**: reveals `MathPanel.js`, showing the live
   position, real gradient vector, and the actual update equation
   (`x_new = x − α·∂L/∂x`) with real numbers substituted in each step.

Sliders: learning rate (overshoot vs crawl) and momentum (escaping shallow
local minima). Landscape has one deep global minimum plus two shallower
"trap" minima to demonstrate getting stuck vs escaping.

Still to build (per `lab/data/concepts.js`, currently "coming soon"):
Stochastic Gradient Descent, Simulated Annealing, Hill Climbing.

---

## Projects — gpush Deep Dive

A real dev tool (custom shell command for staging/committing/pushing to any
git repo from anywhere in the filesystem, with a hard safety check against
committing into the wrong repo). Full original technical writeup was supplied
separately (`gpush_handoff.txt`) and is being adapted into this page's content
— `data/sections.js` currently holds a first-pass paraphrase for the user to
rewrite in their own voice.

Page structure: one scrolling page, accordion sections (default: opening a
new one closes the previous; a "Keep open" checkbox allows stacking multiple).
Each section pairs its explanation with a small custom interactive diagram:

- Path formatting → step-through before/after with highlighted changed segment
- Git root resolution → folder-tree with "you are here" vs resolved root
- Safety check → toggleable match/mismatch scenario, two trees side by side
- Confirmation flow → simulated terminal, toggle between y/n branches
- Final section → full pipeline recap + real setup instructions + tabbed
  bash/cmd code viewer

---

## Known Loose Ends / Things to Revisit

- `GrandPianoShape.js` (the earlier faint-SVG/rotatable-div version of the
  piano) may now be dead code, superseded by the full Three.js `PianoModel`.
  Worth deleting if confirmed unused.
- The old flat-HTML `PianoKey.js` / `BlackKey.js` (pre-3D versions) were also
  flagged as likely unused dead files sitting in `components/piano/` —
  confirm and delete if so.
- Copy/text throughout (`MusicSheet.js` bio, `sections.js` gpush explanations,
  Lab teaser copy) was written as a first-pass skeleton — intended to be
  rewritten in the user's own voice before considering any page "done."
- `CodeBlock.js` has no syntax highlighting yet — plain monospace text only.
  Could upgrade later with a library like `shiki` or `prism` if desired.
- Recurring gotcha hit multiple times during the session: pasted code
  occasionally introduced invisible/zero-width characters around JSX tags
  (e.g. corrupted `<span>` tags), causing silent breakage. Worth being aware
  of if similar unexplained bugs show up again — retyping the affected tag
  by hand fixed it each time.

---

## Environment Notes

- Windows machine, Git Bash + VS Code.
- Hit and resolved: a stray `node_modules`/`package-lock.json` sitting
  directly in the Windows user folder (outside any project) was confusing
  Next.js's workspace-root detection and likely contributing to a hydration
  failure where click handlers silently didn't attach. Fixed by deleting
  those stray files/folders and doing a clean `rm -rf .next node_modules &&
  npm install`.
- `next.config.mjs` includes `allowedDevOrigins` for local network testing
  across devices.
