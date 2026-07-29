"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useState } from "react";
import PianoModel from "./PianoModel";
import MusicStand from "./MusicStand";
import { pianoConfig } from "./pianoConfig";

export default function Piano3D({ onKeyClick }) {
  const [hovering, setHovering] = useState(false);
  const { camera, controls, lights } = pianoConfig;

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      position: "relative",
      background: "radial-gradient(ellipse at center 40%, rgba(80,50,30,0.15) 0%, transparent 65%)",
    }}>
      <Canvas
        camera={{ position: camera.position, fov: camera.fov }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        style={{ pointerEvents: "auto" }}
      >
        <ambientLight intensity={lights.ambientIntensity} />
        <directionalLight position={lights.directional1.position} intensity={lights.directional1.intensity} />
        <directionalLight position={lights.directional2.position} intensity={lights.directional2.intensity} />
        <pointLight position={lights.point.position} intensity={lights.point.intensity} color={lights.point.color} />

        <Suspense fallback={null}>
          <PianoModel onKeyClick={onKeyClick} onHoverChange={setHovering} />
          <MusicStand />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={hovering}
          enableRotate={hovering}
          zoomSpeed={controls.zoomSpeed}
          minDistance={controls.minDistance}
          maxDistance={controls.maxDistance}
          minPolarAngle={controls.minPolarAngle}
          maxPolarAngle={controls.maxPolarAngle}
        />
      </Canvas>
    </div>
  );
}