import React, { useState, useCallback } from 'react';

const PAGESPEED_API = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

function getGrade(score) {
  if (score >= 90) return { grade: 'A', cls: 'grade-a' };
  if (score >= 75) return { grade: 'B', cls: 'grade-b' };
  if (score >= 60) return { grade: 'C', cls: 'grade-c' };
  if (score >= 40) return { grade: 'D', cls: 'grade-d' };
  return { grade: 'F', cls: 'grade-f' };
}

function StatusIcon({ status }) {
  if (status === 'pass') return <span style={{ color: '#16a34a', fontWeight: 700 }}>✓</span>;
  if (status === 'warn') return <span style={{ color: '#ca8a04', fontWeight: 700 }}>⚠</span>;
  return <span style={{ color: '#dc2626', fontWeight: 700 }}>✗</span>;
}

function AuditModule({ title, items, score }) {
  const { grade, cls } = getGrade(score);
  return (
    <div className="glass-card" style={{ borderRadius: '0.75rem', padding: '1.25rem', marginBottom: '0.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{title}</h3>
        <span className={`audit-grade ${cls}`} style={{ width: '2.5rem', height: '2.5rem', fontSize: '0.875rem', borderWidth: '2px' }}>
          {grade}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
            <StatusIcon status={item.status} />
            <div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--color-text-primary)' }}>{item.label}</div>
              {item.detail && <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.125rem' }}>{item.detail}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AuditTool() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);
  const [progress, setProgress] = useState('');

  const runAudit = useCallback(async () => {
    let inputUrl = url.trim();
    if (!inputUrl) return;
    if (!inputUrl.startsWith('http')) inputUrl = 'https://' + inputUrl;

    try { new URL(inputUrl); } catch { setError('Please enter a valid URL'); return; }

    setLoading(true);
    setError('');
    setResults(null);

    try {
      // Step 1: PageSpeed Insights
      setProgress('Analyzing page speed & Core Web Vitals...');
      const psiUrl = `${PAGESPEED_API}?url=${encodeURIComponent(inputUrl)}&strategy=mobile&category=PERFORMANCE&category=SEO&category=ACCESSIBILITY&category=BEST_PRACTICES`;
      const psiResp = await fetch(psiUrl);

      if (!psiResp.ok) throw new Error('Could not analyze the URL. Make sure it\'s publicly accessible.');

      const psiData = await psiResp.json();
      const lh = psiData.lighthouseResult;
      const cats = lh.categories;

      const perfScore = Math.round((cats.performance?.score || 0) * 100);
      const seoScore = Math.round((cats.seo?.score || 0) * 100);
      const a11yScore = Math.round((cats.accessibility?.score || 0) * 100);
      const bpScore = Math.round((cats['best-practices']?.score || 0) * 100);

      // Extract audits
      const audits = lh.audits || {};

      // Step 2: Technical SEO checks
      setProgress('Evaluating technical SEO...');
      const technicalItems = [
        { label: 'HTTPS Secure', status: inputUrl.startsWith('https') ? 'pass' : 'fail', detail: inputUrl.startsWith('https') ? 'Site uses HTTPS encryption' : 'CRITICAL: Site does not use HTTPS' },
        { label: 'Mobile-Friendly', status: audits['viewport']?.score === 1 ? 'pass' : 'fail', detail: audits['viewport']?.score === 1 ? 'Viewport meta tag is properly configured' : 'Missing or misconfigured viewport meta tag' },
        { label: `Performance Score: ${perfScore}/100`, status: perfScore >= 75 ? 'pass' : perfScore >= 50 ? 'warn' : 'fail', detail: `Core Web Vitals performance ${perfScore >= 75 ? 'meets' : 'needs improvement for'} Google standards` },
        { label: 'Document Title', status: audits['document-title']?.score === 1 ? 'pass' : 'fail', detail: audits['document-title']?.score === 1 ? 'Page has a proper title tag' : 'Missing or improper title tag' },
        { label: 'Meta Description', status: audits['meta-description']?.score === 1 ? 'pass' : 'warn', detail: audits['meta-description']?.score === 1 ? 'Meta description is present' : 'Missing meta description — impacts click-through rates' },
        { label: 'Heading Structure', status: audits['heading-order']?.score === 1 ? 'pass' : 'warn', detail: audits['heading-order']?.score === 1 ? 'Headings follow a logical order' : 'Heading hierarchy could be improved' },
        { label: 'Image Alt Text', status: audits['image-alt']?.score === 1 ? 'pass' : 'warn', detail: audits['image-alt']?.score === 1 ? 'All images have alt attributes' : 'Some images are missing alt text' },
        { label: 'Crawlable Links', status: audits['crawlable-anchors']?.score === 1 ? 'pass' : 'warn', detail: audits['crawlable-anchors']?.score === 1 ? 'All links are crawlable by search engines' : 'Some links may not be crawlable' },
      ];

      // Step 3: SEO Analysis
      setProgress('Analyzing SEO signals...');
      const seoItems = [
        { label: `Google SEO Score: ${seoScore}/100`, status: seoScore >= 90 ? 'pass' : seoScore >= 70 ? 'warn' : 'fail', detail: `Lighthouse SEO audit score` },
        { label: 'Canonical URL', status: audits['canonical']?.score === 1 ? 'pass' : 'warn', detail: audits['canonical']?.score === 1 ? 'Canonical tag is properly set' : 'Canonical tag may be missing or misconfigured' },
        { label: 'Robots.txt', status: audits['robots-txt']?.score === 1 ? 'pass' : 'warn', detail: audits['robots-txt']?.score === 1 ? 'robots.txt is valid' : 'robots.txt issues detected' },
        { label: 'Structured Data', status: audits['structured-data']?.score === 1 || audits['structured-data']?.score === null ? 'warn' : 'fail', detail: 'Check for automotive-specific schema (Vehicle, AutoDealer, AutoRepair, LocalBusiness)' },
        { label: 'Hreflang', status: 'warn', detail: 'Consider hreflang tags if serving multiple regions' },
      ];

      // Step 4: AEO/GEO Readiness
      setProgress('Evaluating AI search readiness...');
      const aeoItems = [
        { label: 'Content Structure', status: seoScore >= 85 ? 'pass' : 'warn', detail: 'Well-structured content with proper headings helps AI extract answers' },
        { label: 'FAQ Schema Potential', status: 'warn', detail: 'Add FAQPage schema to increase chances of appearing in People Also Ask and AI Overviews' },
        { label: 'Answer-Formatted Content', status: 'warn', detail: 'Structure key content as direct answers to common automotive questions' },
        { label: 'Entity Clarity', status: 'warn', detail: 'Ensure your business entities (services, locations, specialties) are clearly defined for AI understanding' },
        { label: 'Topical Authority Signals', status: 'warn', detail: 'Build comprehensive content clusters around your core automotive topics' },
      ];

      // Step 5: CRO Quick Scan
      setProgress('Scanning conversion elements...');
      const croItems = [
        { label: `Accessibility Score: ${a11yScore}/100`, status: a11yScore >= 80 ? 'pass' : a11yScore >= 60 ? 'warn' : 'fail', detail: 'Good accessibility improves conversion rates' },
        { label: `Best Practices: ${bpScore}/100`, status: bpScore >= 80 ? 'pass' : bpScore >= 60 ? 'warn' : 'fail', detail: 'Web best practices compliance' },
        { label: 'Page Load Speed', status: perfScore >= 70 ? 'pass' : 'warn', detail: `Fast-loading pages convert better — current performance: ${perfScore}/100` },
        { label: 'Mobile Usability', status: audits['viewport']?.score === 1 ? 'pass' : 'fail', detail: '60%+ of automotive searches happen on mobile devices' },
      ];

      // Calculate overall score
      const technicalScore = Math.round(technicalItems.reduce((acc, i) => acc + (i.status === 'pass' ? 100 : i.status === 'warn' ? 60 : 20), 0) / technicalItems.length);
      const seoModScore = Math.round(seoItems.reduce((acc, i) => acc + (i.status === 'pass' ? 100 : i.status === 'warn' ? 60 : 20), 0) / seoItems.length);
      const aeoScore = Math.round(aeoItems.reduce((acc, i) => acc + (i.status === 'pass' ? 100 : i.status === 'warn' ? 60 : 20), 0) / aeoItems.length);
      const croScore = Math.round(croItems.reduce((acc, i) => acc + (i.status === 'pass' ? 100 : i.status === 'warn' ? 60 : 20), 0) / croItems.length);
      const overallScore = Math.round((technicalScore + seoModScore + aeoScore + croScore) / 4);

      setResults({
        url: inputUrl,
        overallScore,
        modules: [
          { title: '🔧 Technical SEO', items: technicalItems, score: technicalScore },
          { title: '🔍 SEO Analysis', items: seoItems, score: seoModScore },
          { title: '🤖 AEO & GEO Readiness', items: aeoItems, score: aeoScore },
          { title: '📈 CRO & User Experience', items: croItems, score: croScore },
        ],
        rawScores: { perfScore, seoScore, a11yScore, bpScore },
      });
    } catch (err) {
      setError(err.message || 'An error occurred during the audit. Please try again.');
    } finally {
      setLoading(false);
      setProgress('');
    }
  }, [url]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') runAudit();
  };

  return (
    <div>
      {/* Input Section */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="https://yourdealership.com"
          className="form-input"
          style={{ flex: 1, minWidth: '250px' }}
          disabled={loading}
        />
        <button
          onClick={runAudit}
          disabled={loading || !url.trim()}
          className="btn-gold"
          style={{ opacity: loading || !url.trim() ? 0.6 : 1, cursor: loading ? 'wait' : 'pointer' }}
        >
          {loading ? 'Analyzing...' : 'Run Free Audit'}
          {!loading && (
            <svg style={{ width: '1rem', height: '1rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.746 3.746 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
          )}
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="glass-panel" style={{ borderRadius: '0.75rem', padding: '2rem', textAlign: 'center' }}>
          <div className="animate-pulse-subtle" style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🔍</div>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>{progress}</p>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', marginTop: '0.5rem' }}>This may take 15-30 seconds...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div style={{ padding: '1rem', borderRadius: '0.75rem', background: 'rgba(220, 38, 38, 0.08)', border: '1px solid rgba(220, 38, 38, 0.2)', color: '#dc2626', fontSize: '0.875rem', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      {/* Results */}
      {results && (
        <div>
          {/* Overall Score */}
          <div className="glass-panel" style={{ borderRadius: '0.75rem', padding: '2rem', textAlign: 'center', marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Overall Score</p>
            <div className={`audit-grade ${getGrade(results.overallScore).cls}`} style={{ margin: '0 auto 1rem' }}>
              {getGrade(results.overallScore).grade}
            </div>
            <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>{results.overallScore}/100</p>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
              Audit for <strong style={{ color: 'var(--color-gold)' }}>{results.url}</strong>
            </p>
          </div>

          {/* Lighthouse Scores */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div className="metric-card">
              <div className="metric-value" style={{ fontSize: '1.25rem' }}>{results.rawScores.perfScore}</div>
              <div className="metric-label">Performance</div>
            </div>
            <div className="metric-card">
              <div className="metric-value" style={{ fontSize: '1.25rem' }}>{results.rawScores.seoScore}</div>
              <div className="metric-label">SEO</div>
            </div>
            <div className="metric-card">
              <div className="metric-value" style={{ fontSize: '1.25rem' }}>{results.rawScores.a11yScore}</div>
              <div className="metric-label">Accessibility</div>
            </div>
            <div className="metric-card">
              <div className="metric-value" style={{ fontSize: '1.25rem' }}>{results.rawScores.bpScore}</div>
              <div className="metric-label">Best Practices</div>
            </div>
          </div>

          {/* Modules */}
          {results.modules.map((mod, i) => (
            <AuditModule key={i} title={mod.title} items={mod.items} score={mod.score} />
          ))}

          {/* CTA */}
          <div className="glass-panel" style={{ borderRadius: '0.75rem', padding: '2rem', textAlign: 'center', marginTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
              Want a deeper analysis?
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1rem', maxWidth: '28rem', margin: '0 auto 1rem' }}>
              This instant audit covers the basics. Our full expert automotive SEO audit goes deeper — analyzing your entire site architecture, content strategy, competitive landscape, and AI-search readiness.
            </p>
            <a href="/contact/" className="btn-primary">
              Request Full Expert Audit
              <svg style={{ width: '1rem', height: '1rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
