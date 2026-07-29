"use client";
import { Html } from "@react-three/drei";
import MusicSheet from "./MusicSheet";

export default function MusicStand() {
  return (
    <group position={[0.5, 0.95, -0.4]} rotation={[-0.25, 0.15, 0]}>
      {/* LEDGE - sits on the piano, holds the sheet */}
      <mesh position={[0, -0.05, 0.06]}>
        <boxGeometry args={[1.4, 0.05, 0.12]} />
        <meshStandardMaterial color="#2a1810" roughness={0.4} />
      </mesh>

      {/* SHEET MUSIC - real HTML embedded in 3D space */}
      <Html transform distanceFactor={1.4} position={[-0.2, 0.35, 0]} occlude>
        <div style={{ width: "280px", pointerEvents: "none" }}>
          <MusicSheet />
        </div>
      </Html>
    </group>
  );
}