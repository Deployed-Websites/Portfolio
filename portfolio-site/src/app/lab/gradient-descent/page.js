"use client";
import { useState } from "react";
import LandscapeCanvas from "./components/LandscapeCanvas";
import DescentControls from "./components/DescentControls";
import { useDescentLoop } from "./hooks/useDescentLoop";

export default function GradientDescentPage() {
  const [ball, setBall] = useState(null);
  const [path, setPath] = useState([]);
  const [learningRate, setLearningRate] = useState(0.15);
  const [momentum, setMomentum] = useState(0);
  const [running, setRunning] = useState(false);
  const [stepCount, setStepCount] = useState(0);

  useDescentLoop({
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

        <div className="mb-10">
          <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">
            Lab · Gradient Optimisation Strategies
          </div>
          <h1 className="text-3xl font-bold mb-3">Gradient Descent</h1>
          <p className="text-gray-400 max-w-2xl leading-relaxed">
            Click anywhere on the landscape below to drop a ball. It will roll downhill,
            following the steepest local slope at every step — the core idea behind how
            most machine learning models learn. Watch what happens when it lands somewhere
            with more than one valley.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <LandscapeCanvas
            ball={ball}
            path={path}
            running={running}
            stepCount={stepCount}
            onPlaceBall={handlePlaceBall}
          />
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
        </div>

      </div>
    </main>
  );
}