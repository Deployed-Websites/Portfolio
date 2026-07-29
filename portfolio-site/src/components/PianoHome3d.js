"use client";
import { useRouter } from "next/navigation";
import MusicSheet from "./piano/MusicSheet";
import Piano3D from "./piano/Piano3D";

export default function PianoHome() {
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

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <MusicSheet />
        <div style={{
          width: "420px",
          height: "16px",
          background: "linear-gradient(to bottom, #3a2a1a, #2a1a0a)",
          borderRadius: "3px",
          boxShadow: "0 6px 16px rgba(0,0,0,0.6)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }} />
      </div>

      <Piano3D onKeyClick={navigate} />

    </div>
  );
}