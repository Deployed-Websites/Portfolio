"use client";
import { whiteKeys, blackKeys, blackKeyPositions } from "./data/keys";
import { playNote } from "./utils/playNote";
import { Html } from "@react-three/drei";


export default function PianoModel({ onKeyClick }) {
  const whiteKeyWidth = 0.42;
  const totalWidth = whiteKeys.length * whiteKeyWidth;
  const startX = -totalWidth / 2;

  const handleKeyClick = (key) => {
    playNote(key.freq);
    if (key.href) onKeyClick(key.href);
  };

  return (
    <group>
      {/* PIANO BODY */}
      <mesh position={[0.5, 0.35, -1.2]} rotation={[0, 0.15, 0]}>
        <boxGeometry args={[totalWidth + 1.5, 0.7, 2.6]} />
        <meshStandardMaterial color="#5a3420" roughness={0.25} metalness={0.2} />
      </mesh>

      {/* LID */}
      <mesh position={[0.5, 0.85, -1.7]} rotation={[-0.35, 0.15, 0]}>
        <boxGeometry args={[totalWidth + 1.3, 0.06, 2.2]} />
        <meshStandardMaterial color="#6b4028" roughness={0.15} metalness={0.25} />
      </mesh>

      {/* LEGS */}
      {[-totalWidth / 2 + 0.3, totalWidth / 2 - 0.3, -0.2].map((x, i) => (
        <mesh key={i} position={[x, -0.35, i === 2 ? -2.2 : -0.3]}>
          <cylinderGeometry args={[0.06, 0.08, 0.7, 8]} />
          <meshStandardMaterial color="#3d2317" roughness={0.3} metalness={0.15} />
        </mesh>
      ))}

      {/* KEYBED */}
      <mesh position={[0.5, 0.05, 0.2]}>
        <boxGeometry args={[totalWidth + 0.3, 0.1, 1.2]} />
        <meshStandardMaterial color="#2a1810" roughness={0.4} />
      </mesh>

      {/* WHITE KEYS */}
      {whiteKeys.map((key, i) => {
        const x = startX + i * whiteKeyWidth + whiteKeyWidth / 2;
        const isActive = !!key.href;
        return (
          <group key={key.note}>
            <mesh
              position={[x, 0.11, 0.6]}
              onClick={(e) => { e.stopPropagation(); handleKeyClick(key); }}
              onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = "pointer"; }}
              onPointerOut={() => { document.body.style.cursor = "default"; }}
            >
              <boxGeometry args={[whiteKeyWidth - 0.02, 0.08, 1.15]} />
              <meshStandardMaterial color={isActive ? "#fdfaf4" : "#e5ded0"} roughness={0.3} />
            </mesh>

            {isActive && (
              <Html position={[x, 0.16, 1.05]} center distanceFactor={8}>
                <div style={{
                  fontSize: "9px",
                  color: "#555",
                  fontFamily: "serif",
                  letterSpacing: "0.03em",
                  pointerEvents: "none",
                  whiteSpace: "nowrap",
                }}>
                  {key.label}
                </div>
              </Html>
            )}
          </group>
        );
      })}

      {/* BLACK KEYS */}
      {blackKeys.map((key) => {
        const pos = blackKeyPositions[key.note];
        const x = startX + pos * whiteKeyWidth;
        return (
          <mesh
            key={key.note}
            position={[x, 0.16, 0.25]}
            onClick={(e) => { e.stopPropagation(); playNote(key.freq); }}
            onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = "pointer"; }}
            onPointerOut={() => { document.body.style.cursor = "default"; }}
          >
            <boxGeometry args={[whiteKeyWidth * 0.55, 0.1, 0.65]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
          </mesh>
        );
      })}
    </group>
  );
}