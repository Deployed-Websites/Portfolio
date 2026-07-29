"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useState, useRef } from "react";
import PianoModel from "./PianoModel";
import MusicStand from "./MusicStand";

export default function Piano3D({ onKeyClick }) {
  const [hovering, setHovering] = useState(false);

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      position: "relative",
      background: "radial-gradient(ellipse at center 40%, rgba(80,50,30,0.15) 0%, transparent 65%)",
    }}>
      <Canvas
        camera={{ position: [0, 3, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        style={{ pointerEvents: "auto" }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 8, 5]} intensity={1.4} />
        <directionalLight position={[-5, 4, -5]} intensity={0.5} />
        <pointLight position={[0, 3, 4]} intensity={0.6} color="#fff5e0" />

        <Suspense fallback={null}>
          <PianoModel onKeyClick={onKeyClick} onHoverChange={setHovering} />
          <MusicStand />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={hovering}
          enableRotate={hovering}
          zoomSpeed={0.8}
          minDistance={3}
          maxDistance={12}
          minPolarAngle={0.3}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </div>
  );
}