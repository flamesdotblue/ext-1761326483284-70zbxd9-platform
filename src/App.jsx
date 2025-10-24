import { useState, useMemo } from "react";
import SceneCanvas from "./components/SceneCanvas";
import Experience from "./components/Experience";
import LightingControls from "./components/ui/LightingControls";

export default function App() {
  const [elevation, setElevation] = useState(0.6); // 0..1
  const [azimuth, setAzimuth] = useState(0.15); // 0..1

  const controlValues = useMemo(
    () => ({ elevation, azimuth }),
    [elevation, azimuth]
  );

  return (
    <div className="h-dvh w-dvw overflow-hidden bg-zinc-950 text-zinc-50 antialiased">
      <SceneCanvas>
        <Experience elevation={elevation} azimuth={azimuth} />
      </SceneCanvas>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between p-4">
        <div className="pointer-events-auto rounded-lg bg-zinc-900/70 px-3 py-2 shadow-lg backdrop-blur-md ring-1 ring-white/10">
          <h1 className="text-sm font-semibold tracking-wide text-zinc-200">Image-to-World Viewer</h1>
          <p className="text-xs text-zinc-400">Dynamic Sun & Shadow Controls</p>
        </div>
        <div className="pointer-events-auto hidden md:block rounded-lg bg-zinc-900/70 px-3 py-2 shadow-lg backdrop-blur-md ring-1 ring-white/10">
          <div className="text-xs text-zinc-400">Elevation: {(controlValues.elevation * 100).toFixed(0)}% · Azimuth: {(controlValues.azimuth * 360).toFixed(0)}°</div>
        </div>
      </div>

      <LightingControls
        elevation={elevation}
        azimuth={azimuth}
        onElevationChange={setElevation}
        onAzimuthChange={setAzimuth}
      />
    </div>
  );
}
