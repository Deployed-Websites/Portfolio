"use client";
import MusicSheet from "./piano/MusicSheet";
import PianoKey from "./piano/PianoKey";
import BlackKey from "./piano/BlackKey";
import { whiteKeys, blackKeys, blackKeyPositions } from "./piano/data/keys";
import { useRouter } from "next/navigation";


export default function PianoHome() {
  const whiteWidth = 100 / whiteKeys.length;
  const router = useRouter();
  const navigate = (href) => router.push(href);
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      fontFamily: "serif",
    }}>

      {/* FAINT PIANO BODY */}
      <div style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "900px",
        height: "600px",
        background: "radial-gradient(ellipse at center, rgba(40,30,20,0.3) 0%, transparent 70%)",
        borderRadius: "40% 40% 10% 10%",
        border: "1px solid rgba(255,255,255,0.03)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* STAND + SHEET */}
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "700px" }}>
        <MusicSheet />

        {/* LEDGE */}
        <div style={{
          height: "18px",
          background: "linear-gradient(to bottom, #3a2a1a, #2a1a0a)",
          borderRadius: "0 0 4px 4px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.6)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }} />
      </div>

      {/* PIANO KEYS */}
      <div style={{
        position: "relative",
        zIndex: 1,
        width: "100%",
        maxWidth: "700px",
        height: "180px",
        background: "linear-gradient(to bottom, #1a1a1a, #111)",
        borderRadius: "0 0 12px 12px",
        padding: "12px 16px 0",
        boxShadow: "0 8px 32px rgba(0,0,0,0.8)",
        border: "1px solid rgba(255,255,255,0.05)",
        borderTop: "none",
      }}>
        <div style={{ display: "flex", height: "100%", position: "relative" }}>
          {whiteKeys.map((key) => (
            <PianoKey key={key.note} keyData={key} totalWhite={whiteKeys.length} onClick={navigate} />
          ))}
          {blackKeys.map((key) => {
            const pos = blackKeyPositions[key.note];
            const left = pos * whiteWidth - (whiteWidth * 0.3);
            return <BlackKey key={key.note} keyData={key} left={left} whiteWidth={whiteWidth} />;
          })}
        </div>
      </div>

    </div>
  );
}