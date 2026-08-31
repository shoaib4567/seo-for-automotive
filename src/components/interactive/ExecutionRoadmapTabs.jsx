import React, { useState } from 'react';

const ROADMAP_PHASES = [
  {
    id: 'month1',
    period: 'Days 1 – 30',
    title: 'Phase 1: Deep Diagnostic & Entity Reconstruction',
    badge: 'Foundation',
    color: 'border-cyan-500 text-cyan-400',
    headline: 'Eliminating Crawl Waste & Establishing Knowledge Graph Authority',
    deliverables: [
      { name: 'Automotive XPath Crawl Audit', desc: 'Identify faceted crawl loops, orphan VDPs, and JS hydration bottlenecks across Screaming Frog & Search Console.' },
      { name: 'Entity & Google Business Profile Audit', desc: 'Reconcile NAP consistency across 60+ primary automotive directories and configure multi-department nesting (Sales vs Service vs Parts).' },
      { name: 'Core Web Vitals & Mobile Speed Overhaul', desc: 'Sub-2.0s Largest Contentful Paint (LCP) and 0 Cumulative Layout Shift (CLS) optimization for mobile car buyers.' },
      { name: 'Automotive Structured Data Deployment', desc: 'Inject rich Schema.org (AutoDealer, AutoRepair, Vehicle, Product, ItemList, AggregateRating) markup.' }
    ],
    kpiTarget: '100% Core VDP Indexation & Zero Critical 4xx/5xx Bottlenecks'
  },
  {
    id: 'month2',
    period: 'Days 31 – 60',
    title: 'Phase 2: Local Geo-Grid & Catalog Taxonomy Scaling',
    badge: 'Conquest',
    color: 'border-amber-500 text-amber-400',
    headline: 'Expanding Ranking Radius & Structuring High-Intent Landing Pages',
    deliverables: [
      { name: 'Geo-Grid Proximity Expansion (5-15 Mile Radius)', desc: 'Deploy hyper-local service area pages and geo-anchored citation signals targeting neighboring zip codes.' },
      { name: 'YMM Fitment & Category Restructuring', desc: 'Build parameterized vehicle compatibility taxonomy for parts and accessories to capture specific make/model buyers.' },
      { name: 'Automated Review Velocity Engine', desc: 'Implement automated SMS/email review capture SOPs boosting 5-star Google review volume by 35-50% monthly.' },
      { name: 'Model Comparison & Buyer Guide Launch', desc: 'Author authoritative vehicle model vs competitor guides with structured technical comparison tables.' }
    ],
    kpiTarget: '+45% Increase in Google Maps 3-Pack Impressions & Phone Calls'
  },
  {
    id: 'month3',
    period: 'Days 61 – 90',
    title: 'Phase 3: Answer Engine (AEO) & AI Search Domination',
    badge: 'AI Authority',
    color: 'border-purple-500 text-purple-400',
    headline: 'Securing Google AI Overview Citations, Perplexity & Featured Snippets',
    deliverables: [
      { name: 'AI Overview & LLM Citation Engineering', desc: 'Format content into structured semantic fact triples, comparison entities, and direct answer modules cited by AI.' },
      { name: 'Automotive E-E-A-T Author & Technician Signals', desc: 'Embed Master Technician and Certified Specialist credentials to satisfy Google Quality Rater guidelines.' },
      { name: 'High-Authority Automotive Backlink PR', desc: 'Secure editorial mentions and links from Tier-1 automotive publications, auto clubs, and enthusiast forums.' },
      { name: 'Conversion Rate Optimization (CRO) Telemetry', desc: 'A/B test click-to-call banners, schedule service widgets, and VDP test drive lead forms.' }
    ],
    kpiTarget: 'Rank in Top 3 for 50+ High-Intent Keywords + AI Overview Inclusions'
  },
  {
    id: 'month4plus',
    period: 'Days 91 – 180+',
    title: 'Phase 4: Compounding Market Share & Revenue Scaling',
    badge: 'Domination',
    color: 'border-emerald-500 text-emerald-400',
    headline: 'Sustainable Organic Pipeline & Dominating Regional Competitors',
    deliverables: [
      { name: 'Multi-Location / Franchise Network Expansion', desc: 'Replicate winning SEO architecture across regional dealer rooftops and service shop locations.' },
      { name: 'OEM Interchange & Long-Tail SKU Expansion', desc: 'Programmatically scale part number schema and cross-reference pages for 100k+ SKUs.' },
      { name: 'Continuous AEO/GEO Search Evolution Tracking', desc: 'Monitor generative AI engines (ChatGPT, Google Gemini, Apple Intelligence) and protect citation share.' },
      { name: 'Executive Revenue & ROI Reporting Dashboard', desc: 'Bi-weekly telemetry tracking real attributed car sales, repair RO dollars, and eCommerce gross revenue.' }
    ],
    kpiTarget: '250% - 450% Verified Growth in Organic Revenue & Lead Volume'
  }
];

export default function ExecutionRoadmapTabs() {
  const [activeTab, setActiveTab] = useState('month1');
  const activePhase = ROADMAP_PHASES.find(p => p.id === activeTab) || ROADMAP_PHASES[0];

  return (
    <div className="hud-panel p-6 sm:p-8 rounded-2xl border relative overflow-hidden shadow-2xl my-10" style={{ borderColor: 'var(--color-gold-border)', background: 'var(--color-bg-card)' }}>
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="live-dot"></span>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-gradient-gold">
            Proven Automotive Sprint Framework
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black" style={{ color: 'var(--color-text-primary)' }}>
          The 30-60-90-180 Day Automotive Search Blueprint
        </h3>
        <p className="text-sm mt-1 max-w-2xl" style={{ color: 'var(--color-text-secondary)' }}>
          A predictable, battle-tested roadmap designed specifically for automotive dealerships, repair shops, parts catalogs, and visual studios.
        </p>
      </div>

      {/* Tabs Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8 p-1.5 rounded-xl border bg-slate-100 dark:bg-slate-900/70" style={{ borderColor: 'var(--color-border)' }}>
        {ROADMAP_PHASES.map((phase) => (
          <button
            key={phase.id}
            type="button"
            onClick={() => setActiveTab(phase.id)}
            className={`p-3 rounded-lg text-left transition-all ${
              activeTab === phase.id
                ? 'bg-white dark:bg-slate-800 shadow-md border-l-4 border-amber-500 scale-[1.02]'
                : 'hover:bg-slate-200/50 dark:hover:bg-slate-800/50 opacity-75'
            }`}
          >
            <div className="text-[10px] font-mono font-bold uppercase text-amber-500">{phase.period}</div>
            <div className="text-xs font-bold truncate mt-0.5" style={{ color: 'var(--color-text-primary)' }}>
              {phase.badge}
            </div>
          </button>
        ))}
      </div>

      {/* Active Phase Content Card */}
      <div className="p-6 rounded-xl border bg-slate-50/50 dark:bg-slate-900/40 relative" style={{ borderColor: 'var(--color-border)' }}>
        
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <div>
            <span className="text-xs font-mono font-bold text-gradient-gold block mb-1">
              {activePhase.period} • {activePhase.badge}
            </span>
            <h4 className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
              {activePhase.title}
            </h4>
          </div>
          <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400">
            {activePhase.headline}
          </span>
        </div>

        {/* Deliverables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {activePhase.deliverables.map((item, idx) => (
            <div key={idx} className="p-4 rounded-lg border bg-white dark:bg-slate-950/60 flex items-start gap-3" style={{ borderColor: 'var(--color-border)' }}>
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <h5 className="text-xs font-bold" style={{ color: 'var(--color-text-primary)' }}>
                  {item.name}
                </h5>
                <p className="text-[11px] leading-relaxed mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Milestone Footer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-lg border bg-amber-500/5 dark:bg-amber-400/5 text-xs" style={{ borderColor: 'var(--color-gold-border)' }}>
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-500 uppercase tracking-wider text-[10px] font-mono">
              Key Milestone Target:
            </span>
            <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              {activePhase.kpiTarget}
            </span>
          </div>
          <a href="/contact/" className="text-amber-500 font-bold hover:underline whitespace-nowrap">
            Schedule Sprint Briefing →
          </a>
        </div>

      </div>

    </div>
  );
}
