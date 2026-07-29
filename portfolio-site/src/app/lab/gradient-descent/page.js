"use client";
import { useRef, useEffect, useState, useCallback } from "react";

// A bumpy loss landscape: a global minimum plus a couple of local minima "traps"
function loss(x, y) {
  const global = -3 * Math.exp(-((x - 3) ** 2 + (y - 3) ** 2) / 2);
  const trap1 = -2.2 * Math.exp(-((x + 2) ** 2 + (y - 1.5) ** 2) / 1.5);
  const trap2 = -1.8 * Math.exp(-((x - 1) ** 2 + (y + 2.5) ** 2) / 1.2);
  const bowl = 0.03 * (x * x + y * y);
  return global + trap1 + trap2 + bowl;
}

function gradient(x, y, h = 0.001) {
  const dx = (loss(x + h, y) - loss(x - h, y)) / (2 * h);
  const dy = (loss(x, y + h) - loss(x, y - h)) / (2 * h);
  return [dx, dy];
}

const WORLD_MIN = -6;
const WORLD_MAX = 6;

export default function GradientDescentPage() {
  const canvasRef = useRef(null);
  const [ball, setBall] = useState(null); // {x, y} in world coords
  const [path, setPath] = useState([]);
  const [learningRate, setLearningRate] = useState(0.15);
  const [momentum, setMomentum] = useState(0);
  const velocity = useRef([0, 0]);
  const [running, setRunning] = useState(false);
  const [stepCount, setStepCount] = useState(0);
  const animRef = useRef(null);

  const canvasSize = 560;

  const toScreen = (x, y) => [
    ((x - WORLD_MIN) / (WORLD_MAX - WORLD_MIN)) * canvasSize,
    canvasSize - ((y - WORLD_MIN) / (WORLD_MAX - WORLD_MIN)) * canvasSize,
  ];

  const toWorld = (px, py) => [
    (px / canvasSize) * (WORLD_MAX - WORLD_MIN) + WORLD_MIN,
    ((canvasSize - py) / canvasSize) * (WORLD_MAX - WORLD_MIN) + WORLD_MIN,
  ];

  // Draw the contour map + ball + path
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Render loss landscape as a heatmap
    const resolution = 90;
    const cellSize = canvasSize / resolution;
    let minVal = Infinity, maxVal = -Infinity;
    const grid = [];
    for (let i = 0; i < resolution; i++) {
      const row = [];
      for (let j = 0; j < resolution; j++) {
        const [wx, wy] = toWorld(i * cellSize, j * cellSize);
        const v = loss(wx, wy);
        row.push(v);
        if (v < minVal) minVal = v;
        if (v > maxVal) maxVal = v;
      }
      grid.push(row);
    }

    for (let i = 0; i < resolution; i++) {
      for (let j = 0; j < resolution; j++) {
        const v = grid[i][j];
        const t = (v - minVal) / (maxVal - minVal); // 0 = lowest (dark valley), 1 = highest
        // Deep valleys -> warm gold, peaks -> dark
        const r = Math.round(20 + t * 30);
        const g = Math.round(15 + t * 20);
        const b = Math.round(10 + t * 15);
        const brightness = (1 - t) * 235 + 20;
        ctx.fillStyle = `rgb(${Math.round(brightness)}, ${Math.round(brightness * 0.82)}, ${Math.round(brightness * 0.55)})`;
        ctx.fillRect(i * cellSize, j * cellSize, cellSize + 1, cellSize + 1);
      }
    }

    // Draw path
    if (path.length > 1) {
      ctx.strokeStyle = "rgba(30, 30, 30, 0.7)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      path.forEach(([x, y], idx) => {
        const [sx, sy] = toScreen(x, y);
        if (idx === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      });
      ctx.stroke();
    }

    // Draw ball
    if (ball) {
      const [sx, sy] = toScreen(ball.x, ball.y);
      ctx.beginPath();
      ctx.arc(sx, sy, 8, 0, Math.PI * 2);
      ctx.fillStyle = "#1a1a1a";
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }, [ball, path]);

  useEffect(() => { draw(); }, [draw]);

  // Handle click to place ball
  const handleClick = (e) => {
    if (running) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const [wx, wy] = toWorld(px, py);
    velocity.current = [0, 0];
    setBall({ x: wx, y: wy });
    setPath([[wx, wy]]);
    setStepCount(0);
  };

  // Descent animation loop
  useEffect(() => {
    if (!running || !ball) return;

    let localBall = { ...ball };

    const step = () => {
      const [gx, gy] = gradient(localBall.x, localBall.y);

      velocity.current[0] = momentum * velocity.current[0] - learningRate * gx;
      velocity.current[1] = momentum * velocity.current[1] - learningRate * gy;

      localBall = {
        x: localBall.x + velocity.current[0],
        y: localBall.y + velocity.current[1],
      };

      setBall(localBall);
      setPath((p) => [...p, [localBall.x, localBall.y]]);
      setStepCount((c) => c + 1);

      const gradMag = Math.sqrt(gx * gx + gy * gy);
      if (gradMag > 0.01 && stepCount < 400) {
        animRef.current = requestAnimationFrame(step);
      } else {
        setRunning(false);
      }
    };

    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  const reset = () => {
    setRunning(false);
    setBall(null);
    setPath([]);
    setStepCount(0);
    velocity.current = [0, 0];
  };

  return (
    <main className="min-h-screen bg-background text-foreground px-8 py-16">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
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

        {/* CANVAS + CONTROLS */}
        <div className="flex flex-col md:flex-row gap-8">

          <div>
            <canvas
              ref={canvasRef}
              width={canvasSize}
              height={canvasSize}
              onClick={handleClick}
              style={{
                borderRadius: "8px",
                cursor: running ? "default" : "crosshair",
                border: "1px solid #333",
              }}
            />
            <p className="text-xs text-gray-500 mt-2">
              {ball ? `Step ${stepCount}` : "Click to drop the ball"}
            </p>
          </div>

          <div className="flex-1 space-y-6">

            <div>
              <label className="text-sm text-gray-400 block mb-2">
                Learning Rate: {learningRate.toFixed(2)}
              </label>
              <input
                type="range"
                min="0.01"
                max="0.5"
                step="0.01"
                value={learningRate}
                onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-gray-600 mt-1">
                Too high and the ball overshoots wildly. Too low and it barely moves.
              </p>
            </div>

            <div>
              <label className="text-sm text-gray-400 block mb-2">
                Momentum: {momentum.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="0.95"
                step="0.05"
                value={momentum}
                onChange={(e) => setMomentum(parseFloat(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-gray-600 mt-1">
                Carries speed from previous steps — sometimes enough to roll straight
                through a shallow valley and escape it.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setRunning(true)}
                disabled={!ball || running}
                className="px-4 py-2 rounded-md bg-white text-black text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Run
              </button>
              <button
                onClick={() => setRunning(false)}
                disabled={!running}
                className="px-4 py-2 rounded-md border border-gray-700 text-sm disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Pause
              </button>
              <button
                onClick={reset}
                className="px-4 py-2 rounded-md border border-gray-700 text-sm"
              >
                Reset
              </button>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}