"use client";
import { playNote } from "./utils/playNote";

export default function BlackKey({ keyData, left, whiteWidth }) {
  return (
    <div
      onClick={() => playNote(keyData.freq)}
      style={{
        position: "absolute",
        left: `calc(${left}% + 1px)`,
        top: 0,
        width: `${whiteWidth * 0.6}%`,
        height: "60%",
        background: "linear-gradient(to bottom, #1a1a1a, #000)",
        borderRadius: "0 0 4px 4px",
        zIndex: 2,
        cursor: "pointer",
        boxShadow: "2px 4px 8px rgba(0,0,0,0.8)",
        border: "1px solid rgba(255,255,255,0.05)",
        borderTop: "none",
      }}
      onMouseDown={e => e.currentTarget.style.background = "linear-gradient(to bottom, #333, #111)"}
      onMouseUp={e => e.currentTarget.style.background = "linear-gradient(to bottom, #1a1a1a, #000)"}
      onMouseLeave={e => e.currentTarget.style.background = "linear-gradient(to bottom, #1a1a1a, #000)"}
    />
  );
}