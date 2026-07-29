"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import PianoModel from "./PianoModel";

export default function Piano3D({ onKeyClick }) {
  return (
    <div style={{
      width: "100%",
      height: "600px",
      position: "relative",
      background: "radial-gradient(ellipse at center 40%, rgba(80,50,30,0.15) 0%, transparent 65%)",
    }}>
      <Canvas
        camera={{ position: [0, 4, 7], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 8, 5]} intensity={1.4} />
        <directionalLight position={[-5, 4, -5]} intensity={0.5} />
        <pointLight position={[0, 3, 4]} intensity={0.6} color="#fff5e0" />

        <Suspense fallback={null}>
          <PianoModel onKeyClick={onKeyClick} />
        </Suspense>

        <OrbitControls
          enablePan={false}
          minDistance={5}
          maxDistance={12}
          maxPolarAngle={Math.PI / 2.1}
        />
      </Canvas>
    </div>
  );
}