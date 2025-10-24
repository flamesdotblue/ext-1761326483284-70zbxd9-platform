import Slider from "./Slider";

export default function LightingControls({ elevation, azimuth, onElevationChange, onAzimuthChange }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 flex items-end justify-center p-4">
      <div className="pointer-events-auto w-full max-w-3xl rounded-2xl border border-white/10 bg-zinc-900/70 p-4 shadow-2xl backdrop-blur-xl">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div>
            <div className="text-sm font-semibold text-zinc-100">Lighting</div>
            <div className="text-xs text-zinc-400">Time of Day and Sun Rotation</div>
          </div>
          <div className="rounded-md bg-zinc-800/60 px-2 py-1 text-[10px] text-zinc-300 ring-1 ring-white/10">
            Drag sliders to adjust shadows and color temperature
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Slider
            label="Time of Day"
            value={elevation}
            onChange={onElevationChange}
            min={0}
            max={1}
            step={0.001}
            format={(v) => `${Math.round(v * 100)}%`}
          />
          <Slider
            label="Sun Rotation"
            value={azimuth}
            onChange={onAzimuthChange}
            min={0}
            max={1}
            step={0.001}
            format={(v) => `${Math.round(v * 360)}°`}
          />
        </div>
      </div>
    </div>
  );
}
