"use client";
import { useState } from "react";
import LandscapeCanvas from "./components/LandscapeCanvas";
import DescentControls from "./components/DescentControls";
import MathPanel from "./components/MathPanel";
import { useDescentLoop } from "./hooks/useDescentLoop";

export default function GradientDescentPage() {
  const [ball, setBall] = useState(null);
  const [path, setPath] = useState([]);
  const [learningRate, setLearningRate] = useState(0.15);
  const [momentum, setMomentum] = useState(0);
  const [running, setRunning] = useState(false);
  const [stepCount, setStepCount] = useState(0);
  const [showMath, setShowMath] = useState(false);

  const { sensingFrame, gradientVec } = useDescentLoop({
    running, ball, learningRate, momentum,
    setBall, setPath, setStepCount, stepCount, setRunning,
  });

  const handlePlaceBall = (wx, wy) => {
    setBall({ x: wx, y: wy });
    setPath([[wx, wy]]);
    setStepCount(0);
  };

  const reset = () => {
    setRunning(false);
    setBall(null);
    setPath([]);
    setStepCount(0);
  };

  return (
    <main className="min-h-screen bg-background text-foreground px-8 py-16">
      <div className="max-w-4xl mx-auto">

        <div className="mb-10 flex items-start justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">
              Lab · Gradient Optimisation Strategies
            </div>
            <h1 className="text-3xl font-bold mb-3">Gradient Descent</h1>
            <p className="text-gray-400 max-w-2xl leading-relaxed">
              Click anywhere on the landscape below to drop a ball. Watch it check the
              slope around itself, find the steepest way down, and take a step — then
              repeat, following the terrain toward a valley.
            </p>
          </div>

          <button
            onClick={() => setShowMath((s) => !s)}
            className={`shrink-0 px-4 py-2 rounded-md text-sm border transition-colors ${
              showMath
                ? "bg-white text-black border-white"
                : "border-gray-700 text-gray-400 hover:text-white"
            }`}
          >
            {showMath ? "Hide the maths" : "Show the maths"}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <LandscapeCanvas
            ball={ball}
            path={path}
            running={running}
            stepCount={stepCount}
            sensingFrame={sensingFrame}
            onPlaceBall={handlePlaceBall}
          />

          <div className="flex-1 space-y-6">
            <DescentControls
              learningRate={learningRate}
              setLearningRate={setLearningRate}
              momentum={momentum}
              setMomentum={setMomentum}
              ball={ball}
              running={running}
              onRun={() => setRunning(true)}
              onPause={() => setRunning(false)}
              onReset={reset}
            />

            {showMath && (
              <MathPanel
                ball={ball}
                gradientVec={gradientVec}
                learningRate={learningRate}
              />
            )}
          </div>
        </div>

      </div>
    </main>
  );
}