import React from 'react';
import { Footprints, Clock, Users, Navigation } from 'lucide-react';

export default function TrailMap({ cityData, activeStopId, setActiveStopId, progress, setProgress }) {
  const stops = cityData.stops;
  const activeStop = stops.find((s) => s.id === activeStopId) || stops[0];

  const pathD = `M ${stops[0].coords.x} ${stops[0].coords.y} Q 200 80, ${stops[1].coords.x} ${stops[1].coords.y} T ${stops[2].coords.x} ${stops[2].coords.y} T ${stops[3].coords.x} ${stops[3].coords.y}`;

  return (
    <div className="glass-card rounded-2xl p-5 flex flex-col gap-5 border border-heritage-border">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-xs uppercase tracking-wider text-heritage-terracotta font-semibold">Active Route</span>
          <h2 className="text-lg font-bold text-white font-serif">{cityData.tagline}</h2>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-md glass-card text-slate-300">
            <Footprints className="w-3.5 h-3.5 text-heritage-terracotta"/>
            {cityData.totalDistance}
          </span>
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-md glass-card text-slate-300">
            <Clock className="w-3.5 h-3.5 text-heritage-gold"/>
            {cityData.estTime}
          </span>
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <Users className="w-3.5 h-3.5"/>
            Crowd: Low
          </span>
        </div>
      </div>

      <div className="relative w-full h-[280px] bg-heritage-canvas/80 rounded-xl overflow-hidden border border-heritage-border/60 flex items-center justify-center">
        <svg viewBox="0 0 800 450" className="w-full h-full">
          <defs>
            <linearGradient id="trailGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E05A47" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <path d={pathD} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" strokeLinecap="round" />
          <path d={pathD} fill="none" stroke="url(#trailGrad)" strokeWidth="4" strokeLinecap="round" strokeDasharray="8 6" className="animate-pulse" />

          {stops.map((stop, idx) => {
            const isActive = stop.id === activeStopId;
            return (
              <g
                key={stop.id}
                onClick={() => {
                  setActiveStopId(stop.id);
                  setProgress(idx);
                }}
                className="cursor-pointer transition-transform hover:scale-110"
              >
                {isActive && (
                  <circle
                    cx={stop.coords.x}
                    cy={stop.coords.y}
                    r="28"
                    fill="none"
                    stroke="#E05A47"
                    strokeWidth="2"
                    className="animate-ping opacity-50"
                  />
                )}
                <circle
                  cx={stop.coords.x}
                  cy={stop.coords.y}
                  r={isActive ? "18" : "12"}
                  fill={isActive ? "#E05A47" : "#1A2238"}
                  stroke={isActive ? "#FFFFFF" : "#F59E0B"}
                  strokeWidth={isActive ? "3" : "2"}
                  filter={isActive ? "url(#glow)" : undefined}
                />
                <text
                  x={stop.coords.x}
                  y={stop.coords.y + 4}
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize={isActive ? "12" : "10"}
                  fontWeight="bold"
                >
                  {idx + 1}
                </text>
                <text
                  x={stop.coords.x}
                  y={stop.coords.y + 36}
                  textAnchor="middle"
                  fill={isActive ? "#FFFFFF" : "#94A3B8"}
                  fontSize="11"
                  fontWeight={isActive ? "600" : "400"}
                  className="select-none"
                >
                  {stop.name.split(" ")[0]}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="absolute bottom-3 left-3 glass-card px-3 py-1.5 rounded-lg text-xs text-slate-300 flex items-center gap-2">
          <Navigation className="w-3.5 h-3.5 text-heritage-terracotta"/>
          <span>Active: <strong className="text-white">{activeStop.name}</strong> ({activeStop.distanceFromStart})</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-xs text-slate-400">
          <span>Walk Progress: <strong className="text-slate-200">{Math.round((progress / 3) * 100)}% Explored</strong></span>
          <span>{activeStop.distanceFromStart} / {cityData.totalDistance}</span>
        </div>
        <input
          type="range"
          min="0"
          max="3"
          step="1"
          value={progress}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            setProgress(val);
            setActiveStopId(stops[val].id);
          }}
          className="w-full accent-heritage-terracotta cursor-pointer"
        />
      </div>
    </div>
  );
}

