import React, { useState } from 'react';

const SCHEMAS = {
  vdp: {
    name: 'Vehicle VDP (Dealership Inventory)',
    type: 'Vehicle',
    desc: 'Enables rich Google Vehicle Search cards with pricing, mileage, VIN, and specs.',
    code: `{
  "@context": "https://schema.org",
  "@type": "Car",
  "name": "2024 Ford F-150 Lariat 4WD SuperCrew 5.5' Box",
  "image": [
    "https://exampledealer.com/inventory/f150-lariat-front.jpg",
    "https://exampledealer.com/inventory/f150-lariat-interior.jpg"
  ],
  "description": "Certified Pre-Owned 2024 Ford F-150 Lariat in Carbonized Gray Metallic with 5.0L V8 and 4WD.",
  "brand": {
    "@type": "Brand",
    "name": "Ford"
  },
  "model": "F-150 Lariat",
  "vehicleModelDate": "2024",
  "vehicleIdentificationNumber": "1FTFW1E58PKD12345",
  "mileageFromOdometer": {
    "@type": "QuantitativeValue",
    "value": 14200,
    "unitCode": "SMI"
  },
  "fuelType": "Gasoline",
  "vehicleTransmission": "10-Speed Automatic",
  "driveWheelConfiguration": "FourWheelDriveConfiguration",
  "offers": {
    "@type": "Offer",
    "price": "54890",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "2026-12-31",
    "seller": {
      "@type": "AutoDealer",
      "name": "Apex Ford of Austin",
      "telephone": "+1-512-555-0199"
    }
  }
}`
  },
  dealer: {
    name: 'Multi-Department AutoDealer',
    type: 'AutoDealer',
    desc: 'Establishes parent dealership entity with nested Sales, Service, and Parts departments.',
    code: `{
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  "name": "Apex Ford of Austin",
  "url": "https://apexfordaustin.com",
  "logo": "https://apexfordaustin.com/logo.svg",
  "telephone": "+1-512-555-0100",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "10400 Research Blvd",
    "addressLocality": "Austin",
    "addressRegion": "TX",
    "postalCode": "78759",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 30.3985,
    "longitude": -97.7492
  },
  "department": [
    {
      "@type": "AutoRepair",
      "name": "Apex Ford Certified Service & Quick Lube",
      "telephone": "+1-512-555-0150",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "07:00",
        "closes": "18:00"
      }
    },
    {
      "@type": "AutoPartsStore",
      "name": "Apex Ford OEM Parts & Accessories",
      "telephone": "+1-512-555-0180"
    }
  ]
}`
  },
  repair: {
    name: 'Auto Repair & Mechanic Shop',
    type: 'AutoRepair',
    desc: 'Powers Local Maps 3-Pack authority, accepted payment methods, and review rich snippets.',
    code: `{
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "name": "Precision German Auto Care",
  "image": "https://precisiongerman.com/shop-exterior.jpg",
  "telephone": "+1-415-555-0144",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "742 Industrial Pkwy",
    "addressLocality": "San Jose",
    "addressRegion": "CA",
    "postalCode": "95112"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "342",
    "bestRating": "5"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Diagnostic & Repair Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "BMW & Mercedes Brake Service" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Transmission Fluid Exchange" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Check Engine Diagnostic Telemetry" } }
    ]
  }
}`
  },
  parts: {
    name: 'Auto Parts Fitment & eCommerce',
    type: 'Product / Fitment',
    desc: 'Structured part number, OEM interchange, and vehicle fitment compatibility schema.',
    code: `{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "High-Flow Cold Air Intake System for 2021-2024 Ford F-150 3.5L EcoBoost",
  "image": "https://autopartsexample.com/parts/cai-f150.jpg",
  "sku": "IN-F150-35-24",
  "mpn": "75-5140",
  "brand": {
    "@type": "Brand",
    "name": "ApexFlow Performance"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://autopartsexample.com/parts/f150-cold-air-intake",
    "price": "349.99",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition"
  },
  "additionalProperty": [
    { "@type": "PropertyValue", "name": "Fitment Vehicle Make", "value": "Ford" },
    { "@type": "PropertyValue", "name": "Fitment Vehicle Model", "value": "F-150" },
    { "@type": "PropertyValue", "name": "Fitment Years", "value": "2021, 2022, 2023, 2024" },
    { "@type": "PropertyValue", "name": "Engine Fitment", "value": "2.7L, 3.5L EcoBoost V6" },
    { "@type": "PropertyValue", "name": "CARB Compliant", "value": "EO #D-590-24" }
  ]
}`
  }
};

export default function InteractiveSchemaSnippet() {
  const [activeKey, setActiveKey] = useState('vdp');
  const [copied, setCopied] = useState(false);

  const activeSchema = SCHEMAS[activeKey];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSchema.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="hud-panel p-6 sm:p-8 rounded-2xl border relative overflow-hidden shadow-2xl my-10" style={{ borderColor: 'var(--color-gold-border)', background: 'var(--color-bg-card)' }}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b pb-5" style={{ borderColor: 'var(--color-border)' }}>
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="live-dot"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-gradient-gold">
              Entity Schema Inspector
            </span>
          </div>
          <h3 className="text-2xl font-black" style={{ color: 'var(--color-text-primary)' }}>
            Google-Compliant Automotive Structured Data Engine
          </h3>
          <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
            {activeSchema.desc}
          </p>
        </div>

        {/* Action button */}
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 self-start sm:self-auto"
        >
          <span>{copied ? '✓ COPIED JSON-LD' : '📋 COPY SCHEMA SNIPPET'}</span>
        </button>
      </div>

      {/* Schema selector pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.keys(SCHEMAS).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveKey(key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeKey === key
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-400'
            }`}
          >
            {SCHEMAS[key].name}
          </button>
        ))}
      </div>

      {/* Code Viewer */}
      <div className="relative rounded-xl border bg-slate-950 p-4 font-mono text-xs overflow-x-auto text-slate-200 shadow-inner border-slate-800">
        <div className="flex justify-between items-center text-[10px] text-slate-500 pb-2 mb-2 border-b border-slate-800">
          <span>FORMAT: application/ld+json</span>
          <span>SCHEMA VALIDATOR: PASSED ✓</span>
        </div>
        <pre className="text-[11px] sm:text-xs leading-relaxed text-amber-200/90 whitespace-pre">
          {activeSchema.code}
        </pre>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
        <span>* Directly testable in Google Rich Results Test and Schema.org Validator.</span>
        <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:underline">
          Open Google Rich Results Test ↗
        </a>
      </div>

    </div>
  );
}
