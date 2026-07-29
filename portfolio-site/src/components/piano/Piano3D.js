"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import PianoModel from "./PianoModel";

export default function Piano3D({ onKeyClick }) {
  return (
    <div style={{ width: "100%", height: "600px", position: "relative" }}>
      <Canvas
        camera={{ position: [0, 4, 7], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow={false} />
        <directionalLight position={[-5, 4, -5]} intensity={0.3} />

        <Suspense fallback={null}>
          <PianoModel onKeyClick={onKeyClick} />
        </Suspense>

        <OrbitControls
          enablePan={false}
          minDistance={5}
          maxDistance={12}
          maxPolarAngle={Math.PI / 2.1}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}