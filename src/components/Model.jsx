import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";

// Tries to load a GLB model from the "?model=" query parameter.
// If not provided or fails, shows a simple placeholder object that receives and casts shadows.
export default function Model() {
  const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const modelUrl = params.get("model");

  if (modelUrl) {
    return (
      <GLBModel url={modelUrl} />
    );
  }

  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#9fb3ff" roughness={0.5} metalness={0.05} />
      </mesh>
      <mesh castShadow receiveShadow position={[1.5, 0.25, -0.5]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#ffd39f" roughness={0.4} metalness={0.2} />
      </mesh>
    </group>
  );
}

function GLBModel({ url }) {
  const { scene } = useGLTF(url, true, true);

  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} />;
}

useGLTF.preload = () => {};
