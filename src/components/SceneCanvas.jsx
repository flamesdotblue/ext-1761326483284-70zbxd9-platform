import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";

export default function SceneCanvas({ children }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [6, 3, 6], fov: 50, near: 0.1, far: 200 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      className="bg-zinc-950"
    >
      <Suspense fallback={null}>{children}</Suspense>
      <OrbitControls enableDamping dampingFactor={0.1} maxPolarAngle={Math.PI * 0.49} />
    </Canvas>
  );
}
