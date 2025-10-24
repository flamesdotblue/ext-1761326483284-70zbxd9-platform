import { Color, DirectionalLightHelper, Group, MathUtils, Vector3 } from "three";
import { useEffect, useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import Model from "./Model";

export default function Experience({ elevation = 0.5, azimuth = 0.0 }) {
  const dirLight = useRef();
  const target = useRef(new Group());
  const { scene } = useThree();

  // Compute sun parameters based on sliders
  const { dirColor, ambColor, dirIntensity, ambIntensity, sunPos } = useMemo(() => {
    // Elevation mapped to 5°..85°
    const elevDeg = MathUtils.lerp(5, 85, MathUtils.clamp(elevation, 0, 1));
    const elev = MathUtils.degToRad(elevDeg);
    const az = MathUtils.degToRad(MathUtils.euclideanModulo(azimuth * 360, 360));

    // Spherical to Cartesian (radius 20)
    const r = 20;
    const y = r * Math.sin(elev);
    const x = r * Math.cos(elev) * Math.sin(az);
    const z = r * Math.cos(elev) * Math.cos(az);

    // Warm at low elevation -> cool/white at high
    const warm = new Color("#ffb36b"); // golden hour
    const white = new Color("#ffffff"); // noon
    const evening = new Color("#ff6b6b");

    const tWarm = Math.pow(1 - MathUtils.clamp(elevation, 0, 1), 1.2);
    const tNoon = MathUtils.clamp(elevation, 0, 1);

    const dirC = warm.clone().lerp(white, tNoon).lerp(evening, tWarm * 0.15);
    const ambC = new Color("#ffffff").lerp(new Color("#ffd9b3"), tWarm * 0.6);

    const dI = MathUtils.lerp(0.6, 2.2, tNoon);
    const aI = MathUtils.lerp(0.05, 0.4, tNoon);

    return {
      dirColor: dirC,
      ambColor: ambC,
      dirIntensity: dI,
      ambIntensity: aI,
      sunPos: new Vector3(x, y, z),
    };
  }, [elevation, azimuth]);

  useEffect(() => {
    if (!dirLight.current) return;
    dirLight.current.color = dirColor;
    dirLight.current.intensity = dirIntensity;
    dirLight.current.position.copy(sunPos);
    dirLight.current.target.position.set(0, 0, 0);
    dirLight.current.target.updateMatrixWorld();
  }, [dirColor, dirIntensity, sunPos]);

  useEffect(() => {
    scene.background = new Color("#0a0a0a");
  }, [scene]);

  return (
    <>
      {/* Ambient to lift shadows */}
      <ambientLight color={ambColor} intensity={ambIntensity} />

      {/* Shadow-catching ground */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.0001, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#0b0b0b" roughness={1} metalness={0} />
      </mesh>

      {/* Directional light as Sun */}
      <directionalLight
        ref={dirLight}
        castShadow
        position={sunPos.toArray()}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
        shadow-radius={2}
      >
        <orthographicCamera attach="shadow-camera" args={[-30, 30, 30, -30, 0.5, 100]} />
      </directionalLight>

      {/* Target (at origin) ensures light points to center */}
      <primitive object={target.current} />

      {/* Scene content (model placeholder + loader). Users can replace with GLB or PLY loader */}
      <Model />
    </>
  );
}
