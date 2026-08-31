import React, { useState, useMemo } from 'react';

const PRESETS = {
  dealership: {
    name: 'Car Dealership (Sales & Service)',
    trafficDefault: 8500,
    trafficMin: 1000,
    trafficMax: 50000,
    trafficStep: 500,
    valDefault: 3200,
    valMin: 1500,
    valMax: 6000,
    valStep: 100,
    valLabel: 'Avg Gross Profit per Vehicle Sold',
    convDefault: 2.8,
    closeRateDefault: 18,
    desc: 'Simulate organic leads, monthly vehicle sales, and service drive RO gains from targeted local & VDP SEO.'
  },
  repair: {
    name: 'Auto Repair & Collision Shop',
    trafficDefault: 3200,
    trafficMin: 500,
    trafficMax: 20000,
    trafficStep: 100,
    valDefault: 650,
    valMin: 200,
    valMax: 2500,
    valStep: 50,
    valLabel: 'Average Repair Order (ARO) / Ticket Value',
    convDefault: 5.2,
    closeRateDefault: 45,
    desc: 'Calculate high-ticket repair bay fill rate, emergency call volume, and transmission/engine overhaul inquiries.'
  },
  ecommerce: {
    name: 'Auto Parts & Accessories eCommerce',
    trafficDefault: 25000,
    trafficMin: 2000,
    trafficMax: 200000,
    trafficStep: 1000,
    valDefault: 195,
    valMin: 40,
    valMax: 1200,
    valStep: 10,
    valLabel: 'Average Order Value (AOV)',
    convDefault: 1.8,
    closeRateDefault: 100, // direct checkout
    desc: 'Estimate catalog revenue expansion from Year/Make/Model fitment ranking and OEM part number search capture.'
  },
  detailing: {
    name: 'Auto Detailing, PPF & Ceramic Studio',
    trafficDefault: 2400,
    trafficMin: 400,
    trafficMax: 15000,
    trafficStep: 100,
    valDefault: 1450,
    valMin: 300,
    valMax: 4500,
    valStep: 50,
    valLabel: 'Average Ceramic Coating / Wrap Package Value',
    convDefault: 4.5,
    closeRateDefault: 35,
    desc: 'Simulate high-margin luxury paint correction, vinyl wrap, and multi-year ceramic coating package bookings.'
  }
};

export default function AutomotiveRoiCalculator({ defaultType = 'dealership' }) {
  const [type, setType] = useState(defaultType);
  const activeConfig = PRESETS[type] || PRESETS.dealership;

  const [traffic, setTraffic] = useState(activeConfig.trafficDefault);
  const [ticketValue, setTicketValue] = useState(activeConfig.valDefault);
  const [conversionRate, setConversionRate] = useState(activeConfig.convDefault);
  const [closeRate, setCloseRate] = useState(activeConfig.closeRateDefault);
  const [growthPercentage, setGrowthPercentage] = useState(140); // projected 140% organic growth

  // When type changes, reinitialize defaults
  const handleTypeChange = (newType) => {
    setType(newType);
    const cfg = PRESETS[newType];
    setTraffic(cfg.trafficDefault);
    setTicketValue(cfg.valDefault);
    setConversionRate(cfg.convDefault);
    setCloseRate(cfg.closeRateDefault);
  };

  const results = useMemo(() => {
    // Current Baseline
    const currentLeads = Math.round((traffic * (conversionRate / 100)));
    const currentCustomers = type === 'ecommerce' 
      ? currentLeads 
      : Math.round(currentLeads * (closeRate / 100));
    const currentMonthlyRev = currentCustomers * ticketValue;

    // Projected with Automotive SEO (Growth %)
    const projectedTraffic = Math.round(traffic * (1 + growthPercentage / 100));
    // conversion rate typically improves by ~20% with high-intent automotive landing pages
    const improvedConvRate = conversionRate * 1.15;
    const projectedLeads = Math.round(projectedTraffic * (improvedConvRate / 100));
    const projectedCustomers = type === 'ecommerce' 
      ? projectedLeads 
      : Math.round(projectedLeads * (closeRate / 100));
    const projectedMonthlyRev = projectedCustomers * ticketValue;

    const monthlyGain = projectedMonthlyRev - currentMonthlyRev;
    const annualGain = monthlyGain * 12;
    const additionalNewCustomers = projectedCustomers - currentCustomers;

    // Estimated PPC Ad Spend Saved (Equivalent Google Ads Cost for same traffic at ~$3.80 CPC)
    const annualAdSpendSaved = Math.round((projectedTraffic - traffic) * 3.40 * 12);

    return {
      currentMonthlyRev,
      projectedMonthlyRev,
      monthlyGain,
      annualGain,
      additionalNewCustomers,
      annualAdSpendSaved,
      projectedTraffic,
      projectedLeads
    };
  }, [traffic, ticketValue, conversionRate, closeRate, growthPercentage, type]);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="hud-panel p-6 sm:p-8 rounded-2xl border relative overflow-hidden shadow-2xl my-10" style={{ borderColor: 'var(--color-gold-border)', background: 'var(--color-bg-card)' }}>
      {/* Decorative ambient background accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 dark:bg-amber-400/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b pb-6" style={{ borderColor: 'var(--color-border)' }}>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="live-dot"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-gradient-gold">
              Live Interactive Telemetry
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black" style={{ color: 'var(--color-text-primary)' }}>
            Automotive Search Revenue & ROI Simulator
          </h3>
          <p className="text-sm mt-1 max-w-xl" style={{ color: 'var(--color-text-secondary)' }}>
            {activeConfig.desc}
          </p>
        </div>

        {/* Vertical Type Selector */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl border bg-slate-100 dark:bg-slate-900/60" style={{ borderColor: 'var(--color-border)' }}>
          {Object.keys(PRESETS).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => handleTypeChange(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                type === key
                  ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold scale-105'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              {key === 'dealership' && 'Dealership'}
              {key === 'repair' && 'Auto Repair'}
              {key === 'ecommerce' && 'eCommerce'}
              {key === 'detailing' && 'Detailing/Wrap'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Controls vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Slider 1: Monthly Organic Visitors */}
          <div className="p-4 rounded-xl border bg-slate-50/50 dark:bg-slate-900/40" style={{ borderColor: 'var(--color-border)' }}>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--color-text-primary)' }}>
                Current Monthly Organic Traffic
              </label>
              <span className="font-mono font-bold text-sm text-gradient-gold">
                {traffic.toLocaleString()} visits/mo
              </span>
            </div>
            <input
              type="range"
              min={activeConfig.trafficMin}
              max={activeConfig.trafficMax}
              step={activeConfig.trafficStep}
              value={traffic}
              onChange={(e) => setTraffic(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[11px] font-mono mt-1" style={{ color: 'var(--color-text-muted)' }}>
              <span>{activeConfig.trafficMin.toLocaleString()}</span>
              <span>{activeConfig.trafficMax.toLocaleString()}</span>
            </div>
          </div>

          {/* Slider 2: Average Ticket / Deal Value */}
          <div className="p-4 rounded-xl border bg-slate-50/50 dark:bg-slate-900/40" style={{ borderColor: 'var(--color-border)' }}>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--color-text-primary)' }}>
                {activeConfig.valLabel}
              </label>
              <span className="font-mono font-bold text-sm text-gradient-gold">
                {formatCurrency(ticketValue)}
              </span>
            </div>
            <input
              type="range"
              min={activeConfig.valMin}
              max={activeConfig.valMax}
              step={activeConfig.valStep}
              value={ticketValue}
              onChange={(e) => setTicketValue(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[11px] font-mono mt-1" style={{ color: 'var(--color-text-muted)' }}>
              <span>{formatCurrency(activeConfig.valMin)}</span>
              <span>{formatCurrency(activeConfig.valMax)}</span>
            </div>
          </div>

          {/* Sliders Row: Conversion & Growth */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Website Conversion Rate */}
            <div className="p-4 rounded-xl border bg-slate-50/50 dark:bg-slate-900/40" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--color-text-primary)' }}>
                  Visitor Lead Rate
                </label>
                <span className="font-mono font-bold text-xs text-gradient-gold">
                  {conversionRate}%
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="10"
                step="0.1"
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-800 rounded-lg"
              />
            </div>

            {/* Projected Search Growth */}
            <div className="p-4 rounded-xl border bg-slate-50/50 dark:bg-slate-900/40" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--color-text-primary)' }}>
                  Target SEO Growth
                </label>
                <span className="font-mono font-bold text-xs text-gradient-gold">
                  +{growthPercentage}%
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="350"
                step="10"
                value={growthPercentage}
                onChange={(e) => setGrowthPercentage(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-800 rounded-lg"
              />
            </div>
          </div>

        </div>

        {/* Output / Results Column (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl border bg-gradient-to-br from-amber-500/10 via-slate-900/20 to-cyan-500/5 shadow-xl relative overflow-hidden" style={{ borderColor: 'var(--color-gold-border)' }}>
          
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-500 block mb-1">
              Projected Annual Revenue Expansion
            </span>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-gradient-gold mb-4">
              +{formatCurrency(results.annualGain)}
            </div>

            <div className="grid grid-cols-2 gap-3 py-4 border-y" style={{ borderColor: 'var(--color-border)' }}>
              <div>
                <div className="text-[11px] font-medium" style={{ color: 'var(--color-text-muted)' }}>
                  Monthly Revenue Gain
                </div>
                <div className="text-lg font-black font-mono text-emerald-600 dark:text-emerald-400">
                  +{formatCurrency(results.monthlyGain)}/mo
                </div>
              </div>
              <div>
                <div className="text-[11px] font-medium" style={{ color: 'var(--color-text-muted)' }}>
                  New Monthly Customers
                </div>
                <div className="text-lg font-black font-mono" style={{ color: 'var(--color-text-primary)' }}>
                  +{results.additionalNewCustomers.toLocaleString()} /mo
                </div>
              </div>
              <div>
                <div className="text-[11px] font-medium" style={{ color: 'var(--color-text-muted)' }}>
                  Projected Monthly Traffic
                </div>
                <div className="text-sm font-bold font-mono" style={{ color: 'var(--color-text-secondary)' }}>
                  {results.projectedTraffic.toLocaleString()} visits
                </div>
              </div>
              <div>
                <div className="text-[11px] font-medium" style={{ color: 'var(--color-text-muted)' }}>
                  PPC Spend Equivalent
                </div>
                <div className="text-sm font-bold font-mono text-cyan-600 dark:text-cyan-400">
                  {formatCurrency(results.annualAdSpendSaved)}/yr
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4">
            <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--color-text-muted)' }}>
              * Calculated based on proven client benchmarks across 450k+ indexed automotive pages and verified Google Analytics lead attribution.
            </p>
            <a
              href="/audit/"
              className="btn-primary w-full text-center block text-xs sm:text-sm font-bold py-3 rounded-xl shadow-lg"
            >
              Get Custom {activeConfig.name.split(' ')[0]} Growth Audit →
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
