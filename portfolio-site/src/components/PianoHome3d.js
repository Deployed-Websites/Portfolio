"use client";
import { useRouter } from "next/navigation";
import Piano3D from "./piano/Piano3D";

export default function PianoHome() {
  const router = useRouter();
  const navigate = (href) => router.push(href);

  return (
    <div style={{ background: "#0a0a0a" }}>
      <Piano3D onKeyClick={navigate} />
    </div>
  );
}