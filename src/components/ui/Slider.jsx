import { useCallback } from "react";

export default function Slider({ value = 0, min = 0, max = 1, step = 0.001, onChange, className = "", label, format }) {
  const handle = useCallback(
    (e) => {
      const v = parseFloat(e.target.value);
      onChange?.(isNaN(v) ? 0 : v);
    },
    [onChange]
  );

  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className={`w-full ${className}`}>
      {label ? (
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-zinc-300">{label}</span>
          <span className="text-[10px] tabular-nums text-zinc-400">{format ? format(value) : value.toFixed(2)}</span>
        </div>
      ) : null}
      <div className="relative h-6 select-none">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 rounded-full bg-zinc-700/50" style={{ height: 4 }} />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-zinc-300" style={{ height: 4, width: `${pct}%` }} />
        <input
          aria-label={label}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handle}
          className="absolute inset-0 appearance-none bg-transparent outline-none"
        />
        <div
          className="pointer-events-none absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white shadow"
          style={{ left: `calc(${pct}% - 6px)` }}
        />
      </div>
    </div>
  );
}
