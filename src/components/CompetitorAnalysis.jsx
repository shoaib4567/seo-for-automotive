import React from 'react';
import { ShieldCheck, TrendingUp, Users, ArrowUpRight, Sparkles, Award } from 'lucide-react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function CompetitorAnalysis() {
  const radarData = {
    labels: [
      'Local Map Pack 3-Pack',
      'Vehicle Schema JSON-LD',
      'VDP Mobile Page Speed',
      'Organic Backlink Authority',
      'Customer Review Score',
      'EV/Hybrid Intent Visibility'
    ],
    datasets: [
      {
        label: 'Apex Automotive (Your Dealership)',
        data: [95, 98, 92, 85, 96, 94],
        backgroundColor: 'rgba(245, 158, 11, 0.25)',
        borderColor: '#f59e0b',
        borderWidth: 2,
        pointBackgroundColor: '#f59e0b',
      },
      {
        label: 'Rival Motors South',
        data: [75, 60, 80, 90, 82, 70],
        backgroundColor: 'rgba(6, 182, 212, 0.2)',
        borderColor: '#06b6d4',
        borderWidth: 2,
        pointBackgroundColor: '#06b6d4',
      },
      {
        label: 'Capitol Metro Ford',
        data: [65, 45, 70, 75, 78, 60],
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        borderColor: '#6366f1',
        borderWidth: 2,
        pointBackgroundColor: '#6366f1',
      }
    ]
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
        grid: { color: 'rgba(255, 255, 255, 0.08)' },
        pointLabels: { color: '#94a3b8', font: { family: 'Inter', size: 11 } },
        ticks: { color: '#64748b', backdropColor: 'transparent' }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#94a3b8', font: { family: 'Inter', size: 12 } }
      }
    }
  };

  const competitors = [
    { name: 'Apex Automotive (You)', share: '38.4%', keywords: '1,420', links: '890 domains', score: 96, status: 'Market Leader' },
    { name: 'Rival Motors South', share: '24.1%', keywords: '920', links: '1,120 domains', score: 82, status: 'Strong Backlinks' },
    { name: 'Capitol Metro Ford', share: '18.6%', keywords: '680', links: '540 domains', score: 71, status: 'Lagging Schema' },
    { name: 'Valley Auto Superstore', share: '12.2%', keywords: '410', links: '310 domains', score: 64, status: 'Low Speed' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-indigo-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> BENCHMARK RADAR ENGINE
            </div>
            <h2 className="text-2xl font-bold text-white">Competitor Dealership Share of Voice</h2>
            <p className="text-xs text-slate-400 mt-1">
              Compare your dealership against local market competitors across 6 key SEO pillars.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Radar Chart (7 Cols) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Award className="w-4 h-4 text-amber-400" /> Multi-Pillar SEO Competitive Radar
          </h3>
          <div className="h-80">
            <Radar data={radarData} options={radarOptions} />
          </div>
        </div>

        {/* Competitors List Table (5 Cols) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Users className="w-4 h-4 text-cyan-400" /> Local Market Share Ranking
          </h3>

          <div className="space-y-3">
            {competitors.map((comp, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border flex items-center justify-between ${
                  idx === 0
                    ? 'bg-amber-500/10 border-amber-500/30'
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    {comp.name}
                    {idx === 0 && <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded">YOU</span>}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">{comp.keywords} Tracked Keywords • {comp.links}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black font-mono text-amber-400">{comp.share}</div>
                  <span className="text-[10px] text-slate-400">{comp.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
