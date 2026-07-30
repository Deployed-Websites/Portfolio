"use client";
import { useRef, useEffect } from "react";
import { renderLandscape } from "../lib/renderLandscape";
import { toWorld, CANVAS_SIZE } from "../lib/coords";

export default function LandscapeCanvas({ ball, path, running, stepCount, sensingFrame, onPlaceBall }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    renderLandscape(ctx, { ball, path, sensingFrame });
  }, [ball, path, sensingFrame]);

  const handleClick = (e) => {
    if (running) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const [wx, wy] = toWorld(px, py);
    onPlaceBall(wx, wy);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
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
  );
}