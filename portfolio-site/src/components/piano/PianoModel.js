"use client";
import { whiteKeys, blackKeys, blackKeyPositions } from "./data/keys";
import { playNote } from "./utils/playNote";
import { Html } from "@react-three/drei";
import { pianoConfig } from "./pianoConfig";

export default function PianoModel({ onKeyClick, onHoverChange }) {
  const { keys: k, body, lid, legs, keybed } = pianoConfig;

  const totalWidth = whiteKeys.length * k.whiteKeyWidth;
  const startX = -totalWidth / 2;

  const handleKeyClick = (key) => {
    playNote(key.freq);
    if (key.href) onKeyClick(key.href);
  };

  const handlePointerOver = (e) => {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
    onHoverChange(true);
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "default";
    onHoverChange(false);
  };

  return (
    <group onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
      {/* PIANO BODY */}
      <mesh position={body.position} rotation={body.rotation}>
        <boxGeometry args={[totalWidth + body.heightExtra, body.thickness, body.depth]} />
        <meshStandardMaterial color={body.color} roughness={0.25} metalness={0.2} />
      </mesh>

      {/* LID */}
      <mesh position={lid.position} rotation={lid.rotation}>
        <boxGeometry args={[totalWidth + lid.widthExtra, lid.thickness, lid.depth]} />
        <meshStandardMaterial color={lid.color} roughness={0.15} metalness={0.25} />
      </mesh>

      {/* LEGS */}
      {[-totalWidth / 2 + 0.3, totalWidth / 2 - 0.3, -0.2].map((x, i) => (
        <mesh key={i} position={[x, legs.positionY, i === 2 ? legs.zBackLeg : legs.zFrontLegs]}>
          <cylinderGeometry args={[legs.radiusTop, legs.radiusBottom, legs.height, 8]} />
          <meshStandardMaterial color={legs.color} roughness={0.3} metalness={0.15} />
        </mesh>
      ))}

      {/* KEYBED */}
      <mesh position={keybed.position}>
        <boxGeometry args={[totalWidth + keybed.widthExtra, keybed.thickness, keybed.depth]} />
        <meshStandardMaterial color={keybed.color} roughness={0.4} />
      </mesh>

      {/* WHITE KEYS */}
      {whiteKeys.map((key, i) => {
        const x = startX + i * k.whiteKeyWidth + k.whiteKeyWidth / 2;
        const isActive = !!key.href;
        return (
          <group key={key.note}>
            <mesh
              position={[x, k.whiteKeyPosY, k.whiteKeyPosZ]}
              onClick={(e) => { e.stopPropagation(); handleKeyClick(key); }}
            >
              <boxGeometry args={[k.whiteKeyWidth - k.whiteKeyGap, k.whiteKeyHeight, k.whiteKeyDepth]} />
              <meshStandardMaterial
                color={isActive ? k.whiteKeyColorActive : k.whiteKeyColorInactive}
                roughness={0.3}
              />
            </mesh>

            {isActive && (
              <Html position={[x, k.labelPosY, k.labelPosZ]} center distanceFactor={k.labelDistanceFactor}>
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
        const x = startX + pos * k.whiteKeyWidth;
        return (
          <mesh
            key={key.note}
            position={[x, k.blackKeyPosY, k.blackKeyPosZ]}
            onClick={(e) => { e.stopPropagation(); playNote(key.freq); }}
          >
            <boxGeometry args={[k.whiteKeyWidth * k.blackKeyWidthRatio, k.blackKeyHeight, k.blackKeyDepth]} />
            <meshStandardMaterial color={k.blackKeyColor} roughness={0.3} />
          </mesh>
        );
      })}
    </group>
  );
}