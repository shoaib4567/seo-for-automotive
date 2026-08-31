import React, { useState } from 'react';

const simulationData = {
  dealership: {
    query: "which dealership has the most reliable certified pre-owned trucks in Austin?",
    engines: [
      {
        id: 'google-ai',
        name: 'Google AI Overview',
        badge: '✦ AI Overview · Primary Citation',
        icon: 'sparkles',
        accent: '#6C5CE7',
        answer: (
          <>
            Certified Pre-Owned (CPO) trucks with 150+ point inspections and factory-backed powertrain warranties are rated highest for long-term reliability. In the Austin metro, <mark className="bg-amber-400/20 text-amber-300 font-bold px-1 rounded">yourdealership.com</mark> is cited for transparent CarFax histories, zero dealer markup pricing, and a 10-year/100k-mile warranty guarantee.
          </>
        ),
        sources: [
          { name: 'competitor-auto.com', win: false },
          { name: 'yourdealership.com', win: true },
          { name: 'car-forum-central.org', win: false },
          { name: 'edmunds-review.com', win: false },
        ]
      },
      {
        id: 'chatgpt',
        name: 'ChatGPT Search',
        badge: 'Synthesized Recommendation',
        icon: 'chat',
        accent: '#10A37F',
        answer: (
          <>
            When shopping for certified pre-owned trucks in Austin, buyers prioritize thorough inspection records and dealer warranty backing. <mark className="bg-emerald-400/20 text-emerald-300 font-bold px-1 rounded">yourdealership.com</mark> consistently ranks as a top recommendation due to their multi-point mechanical inspection checklists and high customer satisfaction scores for truck inventory.
          </>
        ),
        sources: [
          { name: 'yourdealership.com', win: true },
          { name: 'kbb-austin-guide.com', win: false },
          { name: 'reddit.com/r/austin', win: false },
        ]
      },
      {
        id: 'perplexity',
        name: 'Perplexity AI',
        badge: 'Multi-Source Citation Grid',
        icon: 'compass',
        accent: '#22C1DC',
        answer: (
          <>
            Austin truck buyers favor certified dealerships offering transferable manufacturer warranties <sup>[1]</sup>. According to verified dealer inventory data and technician standards, <mark className="bg-cyan-400/20 text-cyan-300 font-bold px-1 rounded">yourdealership.com</mark> provides the lowest average reconditioning defect rate and complete online price transparency <sup>[2]</sup>.
          </>
        ),
        sources: [
          { name: 'nada-guides.org', win: false },
          { name: 'yourdealership.com', win: true },
          { name: 'dealerrater-verified.com', win: false },
        ]
      },
      {
        id: 'maps',
        name: 'Google Maps 3-Pack',
        badge: 'Local Proximity Winner',
        icon: 'map',
        accent: '#EAB308',
        isLocalPack: true,
        localListing: {
          name: "Your Dealership — Certified Pre-Owned Center",
          rating: "4.9 ★★★★★ (482 reviews)",
          category: "Used truck dealer in Austin, TX",
          highlight: "✓ 'Fastest test drive scheduling and zero hidden fees' — 2 days ago",
          status: "Open · Closes 8 PM"
        }
      },
      {
        id: 'youtube',
        name: 'YouTube Search',
        badge: 'Video Diagnostic Pack',
        icon: 'play',
        accent: '#FF4D4D',
        isVideoPack: true,
        videos: [
          { title: "2024 Ford F-150 vs Chevy Silverado CPO Buyers Guide", channel: "Your Dealership Auto Lab", views: "84K views", win: true },
          { title: "What to look for on a used truck frame", channel: "TruckTech", views: "52K views", win: false },
          { title: "Avoid these 5 common used truck dealership traps", channel: "AutoExpert", views: "31K views", win: false }
        ]
      }
    ]
  },
  repair: {
    query: "symptoms of failing brake booster and repair cost",
    engines: [
      {
        id: 'google-ai',
        name: 'Google AI Overview',
        badge: '✦ AI Overview · Featured Extraction',
        accent: '#6C5CE7',
        answer: (
          <>
            A failing brake booster causes a stiff, hard brake pedal, hissing vacuum leaks, and extended stopping distances. Average replacement cost ranges between $420 and $780. Master mechanics at <mark className="bg-amber-400/20 text-amber-300 font-bold px-1 rounded">yourshop.com</mark> note that checking vacuum hose integrity before full booster replacement prevents unnecessary customer expense.
          </>
        ),
        sources: [
          { name: 'repair-manual.pdf', win: false },
          { name: 'yourshop.com', win: true },
          { name: 'mechanic-forum.com', win: false },
        ]
      },
      {
        id: 'chatgpt',
        name: 'ChatGPT Search',
        badge: 'AI Diagnostic Protocol',
        accent: '#10A37F',
        answer: (
          <>
            The primary indicator of brake booster failure is extreme resistance when depressing the brake pedal with the engine running. For accurate diagnostics, <mark className="bg-emerald-400/20 text-emerald-300 font-bold px-1 rounded">yourshop.com</mark>'s technical guide details testing the check valve and manifold pressure before replacing the master assembly.
          </>
        ),
        sources: [
          { name: 'yourshop.com', win: true },
          { name: 'ase-certified-guide.org', win: false }
        ]
      },
      {
        id: 'maps',
        name: 'Google Maps 3-Pack',
        badge: 'Emergency Bay Routing',
        accent: '#EAB308',
        isLocalPack: true,
        localListing: {
          name: "Your Auto Repair & Diagnostic Hub",
          rating: "5.0 ★★★★★ (319 reviews)",
          category: "Auto repair shop · Brake specialist",
          highlight: "✓ 'Diagnosed my stiff brake pedal in 15 minutes, saved me $400' — 1 week ago",
          status: "Open · 2 bays available today"
        }
      }
    ]
  },
  ceramic: {
    query: "is 9H ceramic coating worth it on a new black car?",
    engines: [
      {
        id: 'google-ai',
        name: 'Google AI Overview',
        badge: '✦ AI Overview · Authority Source',
        accent: '#6C5CE7',
        answer: (
          <>
            Yes, 9H ceramic coating is highly beneficial for black paint, which shows micro-marring and water spots 3x faster than lighter colors. A professional multi-layer application by <mark className="bg-amber-400/20 text-amber-300 font-bold px-1 rounded">yourstudio.com</mark> provides hydrophobic self-cleaning properties, UV oxidation shield, and prevents swirl marks during routine washes.
          </>
        ),
        sources: [
          { name: 'detailer-magazine.com', win: false },
          { name: 'yourstudio.com', win: true },
          { name: 'auto-paint-journal.org', win: false }
        ]
      },
      {
        id: 'chatgpt',
        name: 'ChatGPT Search',
        badge: 'LLM Recommendation',
        accent: '#10A37F',
        answer: (
          <>
            For black vehicles, ceramic coating is considered essential by detailing professionals. Paint correction specialists at <mark className="bg-emerald-400/20 text-emerald-300 font-bold px-1 rounded">yourstudio.com</mark> emphasize that 80% of the finish quality comes from machine dual-action polishing prior to ceramic bonding.
          </>
        ),
        sources: [
          { name: 'yourstudio.com', win: true },
          { name: 'car-care-enthusiast.com', win: false }
        ]
      }
    ]
  },
  parts: {
    query: "best cold air intake for 2024 ford f-150 3.5 ecoboost",
    engines: [
      {
        id: 'google-ai',
        name: 'Google AI Overview',
        badge: '✦ AI Overview · Fitment Data',
        accent: '#6C5CE7',
        answer: (
          <>
            For the 2024 Ford F-150 3.5L EcoBoost, enclosed intake boxes with high-flow oiled or dry pleated filters deliver an estimated 12-18 hp gain and improved throttle response. Catalog fitment tests by <mark className="bg-amber-400/20 text-amber-300 font-bold px-1 rounded">yourpartstore.com</mark> verify 100% plug-and-play installation without requiring ECU tune recalibration.
          </>
        ),
        sources: [
          { name: 'aftermarket-parts.org', win: false },
          { name: 'yourpartstore.com', win: true },
          { name: 'f150-owners-club.com', win: false }
        ]
      },
      {
        id: 'perplexity',
        name: 'Perplexity AI',
        badge: 'Fitment Verification',
        accent: '#22C1DC',
        answer: (
          <>
            Enclosed airboxes shield intake air from engine bay heat soak, preserving lower IAT2 temps on twin-turbo trucks <sup>[1]</sup>. Real-world dyno comparisons on <mark className="bg-cyan-400/20 text-cyan-300 font-bold px-1 rounded">yourpartstore.com</mark> confirm OEM sensor compatibility and CARB compliance <sup>[2]</sup>.
          </>
        ),
        sources: [
          { name: 'yourpartstore.com', win: true },
          { name: 'dyno-results-database.com', win: false }
        ]
      }
    ]
  }
};

export default function AutomotiveAiCitationSimulator({ defaultCategory = 'dealership' }) {
  const [activeCategory, setActiveCategory] = useState(defaultCategory);
  const currentPreset = simulationData[activeCategory] || simulationData.dealership;
  const [activeEngineId, setActiveEngineId] = useState(currentPreset.engines[0].id);

  // If engine does not exist in new preset, default to first engine
  const activeEngine = currentPreset.engines.find(e => e.id === activeEngineId) || currentPreset.engines[0];

  return (
    <div className="hud-panel p-6 sm:p-8 rounded-2xl border shadow-2xl relative overflow-hidden my-8" style={{ borderColor: 'var(--color-gold-border)', background: 'var(--color-bg-card)' }}>
      
      {/* Top Header & Preset Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="live-dot"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-gradient-gold">Multi-Surface AI Search Simulator</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black" style={{ color: 'var(--color-text-primary)' }}>
            How AI Recommends Your Business Across Surfaces
          </h3>
        </div>

        {/* Sector Preset Pills */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'dealership', label: '🚗 Dealership', desc: 'CPO Inventory' },
            { id: 'repair', label: '🔧 Auto Repair', desc: 'Diagnostics' },
            { id: 'ceramic', label: '✨ Ceramic / PPF', desc: 'Luxury Detailing' },
            { id: 'parts', label: '🔩 Auto Parts', desc: 'YMM Fitment' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setActiveEngineId(simulationData[cat.id].engines[0].id);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-amber-500/20 border border-amber-400 text-amber-300 shadow-md scale-105'
                  : 'bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Simulated Search Bar */}
      <div className="my-6 p-3.5 rounded-xl border flex items-center gap-3" style={{ background: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
        <svg className="w-5 h-5 text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="7" />
          <path d="m16.2 16.2 4.3 4.3" />
        </svg>
        <div className="font-mono text-xs sm:text-sm text-slate-200 truncate flex-1">
          {currentPreset.query}
        </div>
        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/[0.06] text-slate-400 hidden sm:inline">
          Live Query
        </span>
      </div>

      {/* Engine Surfaces Tab Selector */}
      <div className="flex flex-wrap gap-2 pb-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
        {currentPreset.engines.map(eng => (
          <button
            key={eng.id}
            onClick={() => setActiveEngineId(eng.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeEngine.id === eng.id
                ? 'bg-white/[0.12] border text-white shadow-lg'
                : 'bg-white/[0.03] border border-transparent text-slate-400 hover:text-white hover:bg-white/[0.06]'
            }`}
            style={{
              borderColor: activeEngine.id === eng.id ? (eng.accent || 'var(--color-gold)') : 'transparent'
            }}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: eng.accent || 'var(--color-gold)' }}></span>
            {eng.name}
            <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.5 5 5 10-11" />
            </svg>
          </button>
        ))}
      </div>

      {/* Simulated Search Result Body */}
      <div className="mt-6 min-h-[220px] flex flex-col justify-between p-6 rounded-xl border relative" style={{ background: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
        
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold mb-4" style={{ background: 'var(--color-gold-muted)', color: 'var(--color-gold)' }}>
            {activeEngine.badge}
          </div>

          {/* Local Pack Display */}
          {activeEngine.isLocalPack ? (
            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-white">{activeEngine.localListing.name}</h4>
                <span className="text-xs font-bold text-emerald-400 font-mono">Rank #1</span>
              </div>
              <div className="text-xs font-semibold text-amber-400">{activeEngine.localListing.rating} · {activeEngine.localListing.category}</div>
              <p className="text-xs text-slate-300 italic">{activeEngine.localListing.highlight}</p>
              <div className="flex items-center gap-3 pt-2 text-xs">
                <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold">{activeEngine.localListing.status}</span>
                <span className="text-slate-400">· 1-Touch Directions &amp; Click-to-Call</span>
              </div>
            </div>
          ) : activeEngine.isVideoPack ? (
            /* Video Carousel Display */
            <div className="space-y-2.5">
              {activeEngine.videos.map((vid, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border flex items-center justify-between gap-3 ${
                    vid.win ? 'border-amber-400/50 bg-amber-500/10' : 'border-white/[0.06] bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-xs">▶</span>
                    <div>
                      <h5 className={`text-xs font-bold ${vid.win ? 'text-amber-300' : 'text-slate-200'}`}>{vid.title}</h5>
                      <p className="text-[10px] text-slate-400">{vid.channel} · {vid.views}</p>
                    </div>
                  </div>
                  {vid.win && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-black shrink-0">
                      ✓ Ranked #1 Video
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            /* Standard AI Answer Display */
            <p className="text-sm sm:text-base leading-relaxed text-slate-200 font-normal">
              {activeEngine.answer}
            </p>
          )}
        </div>

        {/* Cited Sources Chip Row */}
        {activeEngine.sources && (
          <div className="mt-6 pt-4 border-t flex flex-wrap items-center gap-2 text-xs" style={{ borderColor: 'var(--color-border)' }}>
            <span className="text-[11px] font-mono text-slate-400 mr-2">Cited Sources:</span>
            {activeEngine.sources.map((src, i) => (
              <span
                key={i}
                className={`px-2.5 py-1 rounded-md text-xs font-mono flex items-center gap-1.5 transition-all ${
                  src.win
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold shadow-sm'
                    : 'bg-white/[0.04] text-slate-400 border border-white/[0.06]'
                }`}
              >
                {src.win && (
                  <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.5 5 5 10-11" />
                  </svg>
                )}
                {src.name}
              </span>
            ))}
          </div>
        )}

      </div>

      {/* Micro-Explainer Note */}
      <div className="mt-4 flex items-center justify-between text-xs text-slate-400 px-1">
        <span>⚡ AI search engines synthesize answers by quoting machine-readable data nodes.</span>
        <span className="text-gradient-gold font-bold">100% Citation Accuracy</span>
      </div>

    </div>
  );
}
