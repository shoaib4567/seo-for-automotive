import React, { useState } from 'react';
import { DollarSign, TrendingUp, Car, Sparkles, Calculator, CheckCircle2 } from 'lucide-react';

export default function RoiCalculator() {
  const [traffic, setTraffic] = useState(35000);
  const [conversionRate, setConversionRate] = useState(3.5);
  const [closeRate, setCloseRate] = useState(25);
  const [profitPerCar, setProfitPerCar] = useState(2800);
  const [monthlySeoBudget, setMonthlySeoBudget] = useState(4500);

  // Math calculations
  const monthlyLeads = Math.round(traffic * (conversionRate / 100));
  const monthlySales = Math.round(monthlyLeads * (closeRate / 100));
  const monthlyGrossProfit = monthlySales * profitPerCar;
  const annualGrossProfit = monthlyGrossProfit * 12;
  const netMonthlyProfit = monthlyGrossProfit - monthlySeoBudget;
  const roiPercentage = Math.round((netMonthlyProfit / monthlySeoBudget) * 100);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-emerald-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> DEALERSHIP FINANCIAL MODELING ENGINE
            </div>
            <h2 className="text-2xl font-bold text-white">Dealership SEO Revenue & ROI Calculator</h2>
            <p className="text-xs text-slate-400 mt-1">
              Project incremental car sales revenue and ROI generated from organic search traffic growth.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sliders & Controls (7 Cols) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Calculator className="w-4 h-4 text-emerald-400" /> Interactive Dealership Metrics Sliders
          </h3>

          {/* Slider 1: Traffic */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-300">Monthly Organic Visitors</label>
              <span className="font-mono font-bold text-amber-400 text-sm">{traffic.toLocaleString()} visitors/mo</span>
            </div>
            <input
              type="range"
              min="5000"
              max="100000"
              step="1000"
              value={traffic}
              onChange={(e) => setTraffic(Number(e.target.value))}
              className="w-full accent-amber-500 bg-slate-900 rounded-lg cursor-pointer"
            />
          </div>

          {/* Slider 2: VDP Conversion Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-300">VDP Organic Lead Conversion Rate (%)</label>
              <span className="font-mono font-bold text-cyan-400 text-sm">{conversionRate}%</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="8.0"
              step="0.1"
              value={conversionRate}
              onChange={(e) => setConversionRate(Number(e.target.value))}
              className="w-full accent-cyan-500 bg-slate-900 rounded-lg cursor-pointer"
            />
          </div>

          {/* Slider 3: Showroom Sales Close Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-300">Showroom Lead Closing Rate (%)</label>
              <span className="font-mono font-bold text-indigo-400 text-sm">{closeRate}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              step="1"
              value={closeRate}
              onChange={(e) => setCloseRate(Number(e.target.value))}
              className="w-full accent-indigo-500 bg-slate-900 rounded-lg cursor-pointer"
            />
          </div>

          {/* Slider 4: Profit Per Car */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-300">Average Profit per Vehicle Sold ($)</label>
              <span className="font-mono font-bold text-emerald-400 text-sm">${profitPerCar.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="6000"
              step="100"
              value={profitPerCar}
              onChange={(e) => setProfitPerCar(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-900 rounded-lg cursor-pointer"
            />
          </div>

          {/* Slider 5: SEO Monthly Budget */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-300">Monthly SEO Investment Budget ($)</label>
              <span className="font-mono font-bold text-slate-300 text-sm">${monthlySeoBudget.toLocaleString()}/mo</span>
            </div>
            <input
              type="range"
              min="1000"
              max="15000"
              step="500"
              value={monthlySeoBudget}
              onChange={(e) => setMonthlySeoBudget(Number(e.target.value))}
              className="w-full accent-slate-400 bg-slate-900 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Results Summary Box (5 Cols) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-6">
          <div>
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3 mb-4">
              Projected Dealership Revenue Output
            </h3>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-xs text-slate-400 font-semibold uppercase">Monthly Car Sales Generated</span>
                <div className="text-3xl font-black text-amber-400 font-mono mt-1">{monthlySales} Vehicles</div>
                <p className="text-[11px] text-slate-400 mt-1">From {monthlyLeads.toLocaleString()} organic VDP leads</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-xs text-slate-400 font-semibold uppercase">Monthly Organic Gross Profit</span>
                <div className="text-3xl font-black text-emerald-400 font-mono mt-1">${monthlyGrossProfit.toLocaleString()}</div>
                <p className="text-[11px] text-emerald-400 mt-1 font-semibold">Net Profit: ${netMonthlyProfit.toLocaleString()}/mo</p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <span className="text-xs text-emerald-400 font-semibold uppercase">Annual Gross Revenue Lift</span>
                <div className="text-4xl font-black text-white font-mono mt-1">${annualGrossProfit.toLocaleString()}</div>
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {roiPercentage}% Projected SEO ROI
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
