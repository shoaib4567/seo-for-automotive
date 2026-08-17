import React, { useState } from 'react';
import { Search, CheckCircle2, AlertTriangle, XCircle, ArrowRight, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';

export default function VdpAuditor() {
  const [vdpUrl, setVdpUrl] = useState('https://apexmotors.com/inventory/2026-ford-mustang-mach-e-rally-vin3fmtk4sx8');
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(true);

  const handleScan = (e) => {
    e.preventDefault();
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
    }, 1200);
  };

  const auditChecks = [
    {
      category: 'Meta Title & Description',
      status: 'pass',
      score: '100/100',
      title: 'Optimal H1 & Meta Title Format',
      description: 'Contains Year, Make, Model, Trim, Price ($59,995), VIN, and Location Keyword (Austin, TX).'
    },
    {
      category: 'Vehicle Schema JSON-LD',
      status: 'pass',
      score: '98/100',
      title: 'Schema.org/Vehicle Detected',
      description: 'Includes offer price, seller AutoDealer schema, odometer value, and image array.'
    },
    {
      category: 'Image ALT Attribute Audit',
      status: 'warning',
      score: '75/100',
      title: '3 of 12 Vehicle Photos Missing ALT Tags',
      description: 'Car gallery photos 9, 10, and 11 use default filenames like IMG_9021.jpg instead of descriptive alt text.'
    },
    {
      category: 'Canonical & VIN URL Structure',
      status: 'pass',
      score: '100/100',
      title: 'SEO Friendly Clean URL',
      description: 'URL includes targeted keywords and 17-digit VIN without duplicate parameter strings.'
    },
    {
      category: 'Mobile Speed & Core Web Vitals',
      status: 'pass',
      score: '94/100',
      title: 'LCP (Largest Contentful Paint) 1.2s',
      description: 'WebP images preloaded efficiently with lazy loading enabled for secondary vehicle photos.'
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header & URL Input Form */}
      <div className="glass-panel p-6 rounded-2xl border border-amber-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> VDP INVENTORY AUDIT ENGINE
            </div>
            <h2 className="text-2xl font-bold text-white">Vehicle Detail Page (VDP) SEO Scanner</h2>
            <p className="text-xs text-slate-400 mt-1">
              Audit single vehicle inventory landing pages for search rank factors, meta tags, and conversion readiness.
            </p>
          </div>
        </div>

        <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="url"
              required
              value={vdpUrl}
              onChange={(e) => setVdpUrl(e.target.value)}
              placeholder="https://yourdealership.com/inventory/vehicle-name-vin"
              className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-amber-500"
            />
          </div>
          <button
            type="submit"
            disabled={scanning}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-sm rounded-xl hover:from-amber-400 hover:to-orange-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
          >
            {scanning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            {scanning ? 'Scanning VDP...' : 'Run VDP Audit'}
          </button>
        </form>
      </div>

      {/* Audit Score Summary Cards */}
      {scanned && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="glass-card p-5 rounded-2xl border border-emerald-500/30 text-center">
              <span className="text-xs text-slate-400 font-semibold uppercase">Overall VDP Score</span>
              <div className="text-4xl font-black text-emerald-400 font-mono mt-2">93 / 100</div>
              <p className="text-xs text-emerald-300 mt-1 font-medium">Grade A - Search Ready</p>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-amber-500/30 text-center">
              <span className="text-xs text-slate-400 font-semibold uppercase">Passed Factor Checks</span>
              <div className="text-4xl font-black text-white font-mono mt-2">4 / 5</div>
              <p className="text-xs text-amber-400 mt-1 font-medium">1 Minor Warning Found</p>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-cyan-500/30 text-center">
              <span className="text-xs text-slate-400 font-semibold uppercase">Estimated Lead Lift</span>
              <div className="text-4xl font-black text-cyan-400 font-mono mt-2">+28.4%</div>
              <p className="text-xs text-cyan-300 mt-1 font-medium">Higher Showroom Submissions</p>
            </div>
          </div>

          {/* Audit Breakdown List */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white mb-4">Detailed VDP Technical Audit Breakdown</h3>

            <div className="space-y-3">
              {auditChecks.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start space-x-4">
                  {item.status === 'pass' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">{item.category}</span>
                      <span className="text-xs font-mono font-bold text-slate-300">{item.score}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white mt-0.5">{item.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
