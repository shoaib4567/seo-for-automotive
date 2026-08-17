import React from 'react';
import { Car, Code2, MapPin, Search, DollarSign, BarChart3, Github, Sparkles } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: BarChart3 },
    { id: 'schema', label: 'Vehicle Schema', icon: Code2 },
    { id: 'local', label: 'Local GBP & Maps', icon: MapPin },
    { id: 'vdp', label: 'VDP Auditor', icon: Search },
    { id: 'roi', label: 'Dealer ROI Calc', icon: DollarSign },
    { id: 'competitor', label: 'Competitors', icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-amber-500/20 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-cyan-500 p-0.5 shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Car className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold tracking-tight text-white font-mono">
                  SEO <span className="text-gradient-amber">FOR AUTOMOTIVE</span>
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> ASTRO ENGINE
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Dealership & Auto Enterprise SEO Intelligence Platform</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/40 shadow-sm shadow-amber-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            <a
              href="https://github.com/shoaib4567/seo-for-automotive"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-2 px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-700 rounded-lg hover:border-amber-500/50 hover:text-white transition-all shadow-sm"
            >
              <Github className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">GitHub Repo</span>
            </a>
          </div>

        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden flex overflow-x-auto px-4 py-2 space-x-2 bg-slate-900/90 border-t border-slate-800 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
                isActive
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-slate-400 bg-slate-800/40'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
