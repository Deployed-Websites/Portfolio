"use client";
import { playNote } from "./utils/playNote";

export default function PianoKey({ keyData, totalWhite, onClick }) {
  const isActive = !!keyData.href;

  const handleClick = () => {
    playNote(keyData.freq);
    if (keyData.href) onClick(keyData.href);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        position: "relative",
        zIndex: 1,
        width: `${100 / totalWhite}%`,
        height: "100%",
        background: "linear-gradient(to bottom, #f5f0e8, #e8e0d0)",
        border: "1px solid #888",
        borderTop: "2px solid #aaa",
        borderRadius: "0 0 6px 6px",
        boxShadow: "inset -1px 0 0 rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        paddingBottom: "12px",
        transition: "background 0.1s",
        opacity: isActive ? 1 : 0.75,
        cursor: "pointer",
        userSelect: "none",
        flexShrink: 0,
      }}
      onMouseDown={e => e.currentTarget.style.background = "linear-gradient(to bottom, #e0d8c8, #d5cdc0)"}
      onMouseUp={e => e.currentTarget.style.background = "linear-gradient(to bottom, #f5f0e8, #e8e0d0)"}
      onMouseLeave={e => e.currentTarget.style.background = "linear-gradient(to bottom, #f5f0e8, #e8e0d0)"}
    >
      {isActive && (
        <span style={{ fontSize: "10px", color: "#555", fontFamily: "serif", letterSpacing: "0.05em" }}>
          {keyData.label}
        </span>
      )}
    </div>
  );
}