import React, { useState } from 'react';

const KEYWORD_PRESETS = [
  { label: 'Auto Repair & Mechanic', query: 'engine diagnostics & brake repair near me', category: 'repair' },
  { label: 'Car Dealership', query: 'used suvs and trucks for sale near me', category: 'dealership' },
  { label: 'Auto Body & Collision', query: 'auto body paint & collision repair shop', category: 'collision' },
  { label: 'Ceramic & Detailing', query: 'paint correction & ceramic coating studio', category: 'detailing' }
];

export default function GeoGridSimulator() {
  const [activeKeywordIdx, setActiveKeywordIdx] = useState(0);
  const [isOptimized, setIsOptimized] = useState(true);
  const [radius, setRadius] = useState(7); // 3, 7, 15 miles
  const [selectedNode, setSelectedNode] = useState({ row: 2, col: 2, rank: 1, latOffset: 0, lngOffset: 0 });

  const activeKeyword = KEYWORD_PRESETS[activeKeywordIdx];

  // Generate a 5x5 grid (25 nodes) with realistic rank algorithms
  const gridNodes = [];
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      // Distance from center (r=2, c=2)
      const dist = Math.sqrt(Math.pow(r - 2, 2) + Math.pow(c - 2, 2));
      let rank = 1;
      
      if (!isOptimized) {
        // Unoptimized: only center is 1-3, edges drop fast to 8, 14, 20+
        if (dist === 0) rank = 2;
        else if (dist <= 1.2) rank = Math.min(20, Math.round(3 + dist * 3.5));
        else rank = Math.min(20, Math.round(7 + dist * 5.2));
      } else {
        // Optimized: dominant #1-2 across entire grid, occasional #3 on furthest periphery
        if (dist === 0) rank = 1;
        else if (dist <= 1.5) rank = 1;
        else if (dist <= 2.2) rank = 1;
        else rank = dist > 2.5 ? 2 : 1;
      }

      gridNodes.push({
        row: r,
        col: c,
        dist,
        rank,
        distanceMiles: ((dist / 2.82) * radius).toFixed(1)
      });
    }
  }

  const getRankColor = (rank) => {
    if (rank === 1) return { bg: 'bg-emerald-500 text-slate-950 shadow-emerald-500/40', border: 'border-emerald-400' };
    if (rank <= 3) return { bg: 'bg-emerald-400 text-slate-950 shadow-emerald-400/30', border: 'border-emerald-300' };
    if (rank <= 5) return { bg: 'bg-amber-400 text-slate-950 shadow-amber-400/30', border: 'border-amber-300' };
    if (rank <= 10) return { bg: 'bg-orange-500 text-white shadow-orange-500/30', border: 'border-orange-400' };
    return { bg: 'bg-red-600 text-white shadow-red-600/30', border: 'border-red-500' };
  };

  const avgRank = (gridNodes.reduce((acc, n) => acc + n.rank, 0) / gridNodes.length).toFixed(1);
  const top3Share = Math.round((gridNodes.filter(n => n.rank <= 3).length / gridNodes.length) * 100);

  return (
    <div className="hud-panel p-6 sm:p-8 rounded-2xl border relative overflow-hidden shadow-2xl my-10" style={{ borderColor: 'var(--color-gold-border)', background: 'var(--color-bg-card)' }}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b pb-5" style={{ borderColor: 'var(--color-border)' }}>
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="live-dot"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-gradient-gold">
              Local Proximity Engine
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black" style={{ color: 'var(--color-text-primary)' }}>
            Google Maps 3-Pack Geo-Grid Simulator
          </h3>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
            Experience how our geo-targeted entity citations and GBP authority expand your #1 ranking radius from 0.5 miles to 15+ miles.
          </p>
        </div>

        {/* Toggle Optimized / Unoptimized */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900/80 p-1.5 rounded-xl border" style={{ borderColor: 'var(--color-border)' }}>
          <button
            type="button"
            onClick={() => setIsOptimized(false)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              !isOptimized ? 'bg-red-500 text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Before Optimization
          </button>
          <button
            type="button"
            onClick={() => setIsOptimized(true)}
            className={`px-3 py-1.5 text-xs font-extrabold rounded-lg transition-all ${
              isOptimized ? 'bg-emerald-500 text-slate-950 shadow-md scale-105' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            ✨ After Automotive SEO
          </button>
        </div>
      </div>

      {/* Query Selector Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {KEYWORD_PRESETS.map((kw, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveKeywordIdx(i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
              activeKeywordIdx === i
                ? 'bg-amber-500/20 text-amber-500 border-amber-500 font-bold'
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-400'
            }`}
          >
            Target: "{kw.query}"
          </button>
        ))}
      </div>

      {/* Main Interactive Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Visual Geo-Grid Map Canvas (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative w-full max-w-md aspect-square rounded-2xl border p-4 bg-slate-900/90 shadow-inner flex flex-col justify-between overflow-hidden" style={{ borderColor: 'var(--color-border)' }}>
            
            {/* Map Grid Background Texture */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            {/* Radar / Radius concentric circles */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[85%] h-[85%] rounded-full border border-cyan-500/20"></div>
              <div className="w-[55%] h-[55%] rounded-full border border-cyan-500/30"></div>
              <div className="w-[25%] h-[25%] rounded-full border border-cyan-500/40"></div>
            </div>

            {/* Top Grid Status Overlay */}
            <div className="relative z-10 flex justify-between items-center text-[10px] font-mono text-cyan-400 bg-slate-950/80 px-3 py-1 rounded-md border border-cyan-900/50">
              <span>SCAN RADIUS: {radius} MILES</span>
              <span>GEO POINTS: 25 NODES</span>
              <span>GRID TYPE: 5x5 GPS</span>
            </div>

            {/* 5x5 Geo Nodes */}
            <div className="relative z-10 grid grid-cols-5 gap-2 sm:gap-3 my-auto">
              {gridNodes.map((node, idx) => {
                const style = getRankColor(node.rank);
                const isCenter = node.row === 2 && node.col === 2;
                const isSelected = selectedNode.row === node.row && selectedNode.col === node.col;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedNode(node)}
                    className={`aspect-square rounded-full flex items-center justify-center font-mono font-black text-xs sm:text-sm transition-all duration-300 shadow-md relative group border ${style.bg} ${style.border} ${
                      isSelected ? 'ring-4 ring-amber-400 scale-125 z-20' : 'hover:scale-110'
                    }`}
                  >
                    {node.rank}
                    {isCenter && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border border-slate-950 animate-ping"></span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom Radius Selector */}
            <div className="relative z-10 flex justify-between items-center bg-slate-950/80 p-1.5 rounded-lg border border-slate-800 text-xs">
              <span className="text-[11px] text-slate-400 font-medium ml-2">Radius Conquest:</span>
              <div className="flex gap-1">
                {[3, 7, 15].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRadius(r)}
                    className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold transition-all ${
                      radius === r ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {r} mi
                  </button>
                ))}
              </div>
            </div>

          </div>
          
          <div className="flex items-center gap-4 mt-3 text-[11px] font-mono text-slate-500">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> #1-3 (Maps 3-Pack Winner)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span> #4-5 (First Page)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block"></span> #10+ (Invisible)</span>
          </div>
        </div>

        {/* Telemetry & Analysis Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="p-5 rounded-xl border bg-slate-50/50 dark:bg-slate-900/40" style={{ borderColor: 'var(--color-border)' }}>
            <span className="text-xs font-mono font-bold uppercase text-gradient-gold block mb-1">
              Local Visibility Share
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black font-mono" style={{ color: isOptimized ? '#10b981' : '#ef4444' }}>
                {top3Share}%
              </span>
              <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                in Google Maps 3-Pack (Top 3)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
              <div>
                <div className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>Average Grid Rank</div>
                <div className="text-xl font-bold font-mono" style={{ color: 'var(--color-text-primary)' }}>
                  #{avgRank}
                </div>
              </div>
              <div>
                <div className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>Call Multiplier</div>
                <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                  {isOptimized ? '4.8x Phone Calls' : '1.0x (Baseline)'}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border bg-amber-500/5 dark:bg-amber-400/5" style={{ borderColor: 'var(--color-gold-border)' }}>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-2 flex items-center gap-1.5">
              <span>📍 Selected Node Telemetry</span>
            </h4>
            <div className="text-xs space-y-1.5" style={{ color: 'var(--color-text-secondary)' }}>
              <div className="flex justify-between">
                <span>Distance from Location:</span>
                <span className="font-mono font-bold">{selectedNode.distanceMiles} miles</span>
              </div>
              <div className="flex justify-between">
                <span>Rank for Query:</span>
                <span className="font-mono font-bold" style={{ color: selectedNode.rank <= 3 ? '#10b981' : '#ef4444' }}>
                  Position #{selectedNode.rank} {selectedNode.rank <= 3 ? '✓ (Top 3 Pack)' : '✗ (Lost Lead)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Monthly Search Clicks:</span>
                <span className="font-mono font-bold text-gradient-gold">
                  {selectedNode.rank === 1 ? '140+ direct calls' : selectedNode.rank <= 3 ? '65+ inquiries' : '< 5 clicks'}
                </span>
              </div>
            </div>
          </div>

          <a
            href="/services/automotive-local-seo/"
            className="btn-primary w-full text-center block text-xs sm:text-sm font-bold py-3 rounded-xl shadow-lg"
          >
            Explore Local Maps 3-Pack Strategy →
          </a>

        </div>

      </div>
    </div>
  );
}
