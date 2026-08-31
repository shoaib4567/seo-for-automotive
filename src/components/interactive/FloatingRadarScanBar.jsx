import React, { useState, useEffect } from 'react';

export default function FloatingRadarScanBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [domainInput, setDomainInput] = useState('');

  useEffect(() => {
    // Show after scrolling 400px down
    const handleScroll = () => {
      if (window.scrollY > 400 && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!domainInput.trim()) return;
    const cleanUrl = domainInput.trim().replace(/^https?:\/\//, '').replace(/\/$/, '');
    window.location.href = `/audit/?url=${encodeURIComponent(cleanUrl)}`;
  };

  if (isDismissed || !isVisible) return null;

  return (
    <aside
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-xl z-50 transition-all duration-300 animate-fade-in"
      aria-label="Instant Automotive SEO Radar Scan"
    >
      <div className="hud-panel p-4 rounded-2xl border shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row items-center gap-3 relative" style={{ borderColor: 'var(--color-gold-border)', background: 'rgba(15, 17, 23, 0.94)' }}>
        
        {/* Radar Icon with animated pulse */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-amber-500/40 bg-amber-500/10 text-amber-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="5" />
              <path d="M12 12l5 -5" />
            </svg>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          </div>

          <div className="flex-1 sm:hidden">
            <div className="text-xs font-bold text-white leading-tight">Instant Automotive AI Audit</div>
            <div className="text-[10px] text-slate-400">Free 60s VDP &amp; Maps scan</div>
          </div>
        </div>

        {/* Text for desktop */}
        <div className="hidden sm:block flex-1 pr-2">
          <div className="text-xs font-bold text-white leading-tight flex items-center gap-1.5">
            <span>Audit your automotive website</span>
            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-amber-400/20 text-amber-300 font-bold uppercase">Free Scan</span>
          </div>
          <div className="text-[11px] text-slate-400 leading-tight mt-0.5">
            Test VDP crawlability, Google AI citations &amp; Local Maps readiness in 60s.
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            value={domainInput}
            onChange={(e) => setDomainInput(e.target.value)}
            placeholder="dealership.com"
            className="w-full sm:w-44 px-3 py-2 rounded-xl text-xs bg-black/60 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
            required
          />
          <button
            type="submit"
            className="btn-gold px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 flex items-center gap-1 hover:scale-105 transition-all shadow-md"
          >
            <span>Scan</span>
            <span className="text-xs">→</span>
          </button>
        </form>

        {/* Close / Dismiss button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 border border-white/20 text-slate-300 hover:text-white flex items-center justify-center text-xs shadow-lg"
          title="Dismiss"
          aria-label="Dismiss scan bar"
        >
          ✕
        </button>

      </div>
    </aside>
  );
}
