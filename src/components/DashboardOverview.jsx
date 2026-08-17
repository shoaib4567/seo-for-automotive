import React from 'react';
import { 
  TrendingUp, MapPin, CheckCircle2, ArrowUpRight, 
  Search, Zap, Layers, Car, Check
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function DashboardOverview({ setActiveTab }) {
  const trafficData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        fill: true,
        label: 'Organic Dealership Traffic (Monthly)',
        data: [12400, 14200, 15800, 19400, 22100, 26800, 31500, 38200],
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.15)',
        tension: 0.4,
        pointBackgroundColor: '#f59e0b',
        pointBorderColor: '#ffffff',
        pointHoverRadius: 6,
      },
      {
        fill: true,
        label: 'VDP Organic Leads',
        data: [420, 510, 590, 780, 920, 1150, 1420, 1840],
        borderColor: '#06b6d4',
        backgroundColor: 'rgba(6, 182, 212, 0.15)',
        tension: 0.4,
        pointBackgroundColor: '#06b6d4',
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#94a3b8', font: { family: 'Inter', size: 12 } }
      },
      tooltip: {
        backgroundColor: '#0f172a',
        titleColor: '#f59e0b',
        borderColor: 'rgba(245, 158, 11, 0.3)',
        borderWidth: 1,
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#64748b' }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#64748b' }
      }
    }
  };

  const rankingDistribution = {
    labels: ['Pos 1-3 (Map Pack)', 'Pos 4-10 (Page 1)', 'Pos 11-20 (Page 2)', 'Pos 21-50'],
    datasets: [
      {
        label: 'Tracked Keywords',
        data: [142, 218, 94, 45],
        backgroundColor: [
          'rgba(245, 158, 11, 0.8)',
          'rgba(6, 182, 212, 0.7)',
          'rgba(99, 102, 241, 0.6)',
          'rgba(148, 163, 184, 0.4)'
        ],
        borderRadius: 8,
      }
    ]
  };

  const keywords = [
    { term: 'used f-150 for sale near me', pos: 1, vol: '18,100', intent: 'Transactional', status: 'Up 2' },
    { term: 'best car dealership Austin TX', pos: 1, vol: '9,400', intent: 'Local Business', status: 'Steady' },
    { term: 'electric vehicle repair shop', pos: 2, vol: '6,200', intent: 'Service Intent', status: 'Up 4' },
    { term: '2026 mustang mach-e specs', pos: 3, vol: '12,500', intent: 'Informational', status: 'Up 1' },
    { term: 'auto transmission replacement cost', pos: 2, vol: '14,300', intent: 'High Value Service', status: 'Up 3' },
    { term: '0% APR car financing deals', pos: 4, vol: '22,000', intent: 'Commercial', status: 'Down 1' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 glass-panel shadow-2xl">
        <div className="absolute inset-0 z-0">
          <img 
            src="/seo-for-automotive/hero.jpg" 
            alt="Automotive SEO Platform" 
            className="w-full h-full object-cover opacity-25 filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent"></div>
        </div>

        <div className="relative z-10 p-6 md:p-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-4">
            <Zap className="w-3.5 h-3.5" /> AUTOMOTIVE SEARCH DOMINANCE PLATFORM
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Accelerate Dealership Organic Traffic & <span className="text-gradient-amber">VDP Leads</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm md:text-base leading-relaxed">
            Built specifically for automotive dealerships, repair networks, and OEM car brands. Optimize Vehicle Schema JSON-LD, dominate Local Google Maps 3-Pack, and convert search queries into showroom test drives.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button 
              onClick={() => setActiveTab('schema')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-bold text-sm hover:from-amber-400 hover:to-orange-500 shadow-lg shadow-amber-500/25 transition-all flex items-center gap-2"
            >
              Generate Vehicle Schema <ArrowUpRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setActiveTab('roi')}
              className="px-5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-200 text-sm font-semibold hover:border-amber-500/50 hover:bg-slate-800 transition-all flex items-center gap-2"
            >
              Calculate Dealer ROI
            </button>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card p-5 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Monthly Organic Visitors</span>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-white font-mono">38,200</div>
            <div className="mt-1 flex items-center text-xs text-emerald-400 font-semibold gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +34.2% vs last month
            </div>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Local Map Pack #1-3</span>
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <MapPin className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-white font-mono">142 Keywords</div>
            <div className="mt-1 flex items-center text-xs text-cyan-400 font-semibold gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 89% Geo-Radius Dominance
            </div>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Vehicle Schema Coverage</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-white font-mono">98.4%</div>
            <div className="mt-1 flex items-center text-xs text-emerald-400 font-semibold gap-1">
              <Check className="w-3.5 h-3.5" /> 482 / 490 VDPs Validated
            </div>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">VDP SEO Health Index</span>
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Car className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-white font-mono">94 / 100</div>
            <div className="mt-1 flex items-center text-xs text-indigo-400 font-semibold gap-1">
              <Zap className="w-3.5 h-3.5" /> High Conversion Ready
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-400" /> Organic Traffic & Lead Growth
              </h3>
              <p className="text-xs text-slate-400">Monthly breakdown of vehicle detail page visits and form leads</p>
            </div>
            <span className="text-xs font-mono px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-lg">Live Telemetry</span>
          </div>
          <div className="h-72">
            <Line data={trafficData} options={chartOptions} />
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-1">
              <Layers className="w-5 h-5 text-cyan-400" /> SERP Visibility Breakdown
            </h3>
            <p className="text-xs text-slate-400 mb-6">Rank positions across high-intent auto search queries</p>
            <div className="h-60">
              <Bar data={rankingDistribution} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Keywords SERP Tracker Table */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Search className="w-5 h-5 text-amber-400" /> High-Intent Automotive SERP Tracker
            </h3>
            <p className="text-xs text-slate-400">Top revenue-generating automotive search phrases tracked daily</p>
          </div>
          <button 
            onClick={() => setActiveTab('local')}
            className="px-4 py-2 text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded-lg hover:bg-amber-500/20 transition-all self-start sm:self-auto"
          >
            Manage Local Map Pack Keywords &rarr;
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="text-xs uppercase bg-slate-900/80 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Keyword Query</th>
                <th className="px-4 py-3 text-center">Google Pos</th>
                <th className="px-4 py-3">Search Vol</th>
                <th className="px-4 py-3">Intent Type</th>
                <th className="px-4 py-3 text-right">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {keywords.map((kw, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                  <td className="px-4 py-3.5 font-medium text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    {kw.term}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold ${
                      kw.pos <= 3 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-800 text-slate-300'
                    }`}>
                      #{kw.pos}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-slate-400">{kw.vol}/mo</td>
                  <td className="px-4 py-3.5">
                    <span className="px-2.5 py-1 text-[11px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 rounded-full">
                      {kw.intent}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono text-xs font-bold text-emerald-400">
                    {kw.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
