import React, { useState } from 'react';
import Navbar from './Navbar';
import DashboardOverview from './DashboardOverview';
import SchemaGenerator from './SchemaGenerator';
import LocalSeoOptimizer from './LocalSeoOptimizer';
import VdpAuditor from './VdpAuditor';
import RoiCalculator from './RoiCalculator';
import CompetitorAnalysis from './CompetitorAnalysis';

export default function AppShell() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <DashboardOverview setActiveTab={setActiveTab} />}
        {activeTab === 'schema' && <SchemaGenerator />}
        {activeTab === 'local' && <LocalSeoOptimizer />}
        {activeTab === 'vdp' && <VdpAuditor />}
        {activeTab === 'roi' && <RoiCalculator />}
        {activeTab === 'competitor' && <CompetitorAnalysis />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 SEO for Automotive • Dealership & Auto Enterprise Intelligence Engine</p>
          <div className="flex items-center space-x-4">
            <a href="https://github.com/shoaib4567/seo-for-automotive" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors">
              GitHub Repository
            </a>
            <span>•</span>
            <a href="https://schema.org/Vehicle" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors">
              Schema.org Vehicle Docs
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
