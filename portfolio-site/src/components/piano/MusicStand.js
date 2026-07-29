"use client";
import { Html } from "@react-three/drei";
import MusicSheet from "./MusicSheet";
import { pianoConfig } from "./pianoConfig";

export default function MusicStand() {
  const { stand } = pianoConfig;

  return (
    <group position={stand.position} rotation={stand.rotation}>
      {/* LEDGE - sits on the piano, holds the sheet */}
      <mesh position={stand.ledgePosition}>
        <boxGeometry args={stand.ledgeSize} />
        <meshStandardMaterial color={stand.ledgeColor} roughness={0.4} />
      </mesh>

      {/* SHEET MUSIC - real HTML embedded in 3D space */}
      <Html transform distanceFactor={stand.sheetDistanceFactor} position={stand.sheetPosition} occlude>
        <div style={{ width: `${stand.sheetWidth}px`, pointerEvents: "none" }}>
          <MusicSheet />
        </div>
      </Html>
    </group>
  );
}