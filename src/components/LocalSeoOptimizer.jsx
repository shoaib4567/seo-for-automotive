import React, { useState } from 'react';
import { MapPin, CheckCircle, AlertCircle, Search, Star, Building2, Phone, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';

export default function LocalSeoOptimizer() {
  const [radius, setRadius] = useState('10');
  const [selectedGeo, setSelectedGeo] = useState('Austin, TX (Downtown)');

  const mapPackResults = [
    { rank: 1, name: 'Apex Automotive Group', status: 'Dominant #1', reviews: '4.9 ★ (1,420 reviews)', nap: 'Matched 100%', gbpScore: 98 },
    { rank: 2, name: 'Metro South Auto Center', status: 'Competitor', reviews: '4.6 ★ (890 reviews)', nap: 'Matched 92%', gbpScore: 84 },
    { rank: 3, name: 'Capitol Hill Motors', status: 'Competitor', reviews: '4.4 ★ (610 reviews)', nap: 'Matched 88%', gbpScore: 79 },
  ];

  const gbpChecklist = [
    { title: 'Vehicle Inventory Catalog Sync', status: 'Verified', detail: 'Google Business Profile Car Stock active' },
    { title: 'Primary Category Optimization', status: 'Verified', detail: 'Set to "Auto Dealer" & "Car Repair Facility"' },
    { title: 'Multi-Location NAP Consistency', status: 'Verified', detail: 'Identical Name, Address, Phone across 40 directories' },
    { title: 'Review Auto-Responder Workflow', status: 'Active', detail: 'AI review response within 2 hours active' },
    { title: 'Geo-Tagged Showroom Photos', status: 'Action Needed', detail: 'Upload 15 new high-res photos for current month' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> GOOGLE MAPS 3-PACK RADAR
            </div>
            <h2 className="text-2xl font-bold text-white">Dealership Local SEO & GBP Dominance</h2>
            <p className="text-xs text-slate-400 mt-1">
              Simulate Google Maps local pack visibility across zip codes and audit Google Business Profile signals.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <select
              value={selectedGeo}
              onChange={(e) => setSelectedGeo(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500 font-mono"
            >
              <option value="Austin, TX (Downtown)">Location: Austin, TX (Downtown)</option>
              <option value="Round Rock, TX">Location: Round Rock, TX</option>
              <option value="Cedar Park, TX">Location: Cedar Park, TX</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid: Map Pack Simulator + GBP Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Map Pack Grid Simulator (7 Cols) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" /> Geo-Radius Rank Heatmap
            </h3>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20">
              Radius: {radius} Miles
            </span>
          </div>

          {/* Interactive Geo Heatmap Grid Visual */}
          <div className="grid grid-cols-5 gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800 text-center font-mono">
            {[1,1,1, 1,2,  1,1,1, 1,1,  1,1,1, 2,3,  1,1,2, 3,4,  2,2,3, 4,5].map((pos, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border text-xs font-bold transition-all transform hover:scale-105 cursor-pointer ${
                  pos === 1
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 shadow-md shadow-emerald-500/10'
                    : pos === 2
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                    : 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
                }`}
              >
                <div>#{pos}</div>
                <div className="text-[9px] text-slate-400 font-normal mt-0.5">Zip {78701 + idx}</div>
              </div>
            ))}
          </div>

          {/* Local Map Pack Standings Table */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Map Pack Top 3 Rankings</h4>
            {mapPackResults.map((item) => (
              <div
                key={item.rank}
                className={`p-4 rounded-xl border flex items-center justify-between ${
                  item.rank === 1
                    ? 'bg-amber-500/10 border-amber-500/30'
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold font-mono text-sm ${
                    item.rank === 1 ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                  }`}>
                    #{item.rank}
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">{item.name}</h5>
                    <p className="text-xs text-amber-400 flex items-center gap-1">{item.reviews}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-semibold text-cyan-400">{item.nap}</span>
                  <p className="text-[10px] text-slate-400">Score: {item.gbpScore}/100</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GBP Optimization Checklist (5 Cols) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Building2 className="w-4 h-4 text-amber-400" /> Google Business Profile Audit
          </h3>

          <div className="space-y-3">
            {gbpChecklist.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start space-x-3">
                {item.status === 'Verified' || item.status === 'Active' ? (
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">{item.title}</h4>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                      item.status === 'Verified' || item.status === 'Active'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
