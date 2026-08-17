import React, { useState } from 'react';
import { Code2, Copy, Check, ExternalLink, Sparkles, Download, Layers, ShieldCheck } from 'lucide-react';

export default function SchemaGenerator() {
  const [copied, setCopied] = useState(false);
  const [schemaType, setSchemaType] = useState('Vehicle');

  const [formData, setFormData] = useState({
    name: '2026 Ford Mustang Mach-E Rally AWD',
    make: 'Ford',
    model: 'Mustang Mach-E',
    year: '2026',
    trim: 'Rally Edition',
    bodyType: 'SUV / Crossover',
    vin: '3FMTK4SX8RMA92184',
    price: '59995',
    currency: 'USD',
    mileage: '12',
    color: 'Cyber Orange Tri-Coat',
    fuelType: 'Electric',
    transmission: 'Single-Speed Automatic',
    driveTrain: 'All-Wheel Drive (AWD)',
    dealerName: 'Apex Motor Group Dealership',
    dealerPhone: '+1-800-555-AUTO',
    dealerAddress: '1240 Automotive Pkwy, Austin, TX 78701',
    image: 'https://shoaib4567.github.io/seo-for-automotive/hero.jpg',
    description: 'Brand new 2026 Ford Mustang Mach-E Rally AWD with dual electric motors, 480hp, rally-inspired suspension, and sports seats.',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateJsonLd = () => {
    if (schemaType === 'Vehicle') {
      return {
        '@context': 'https://schema.org',
        '@type': 'Vehicle',
        'name': formData.name,
        'description': formData.description,
        'image': formData.image,
        'brand': {
          '@type': 'Brand',
          'name': formData.make
        },
        'model': formData.model,
        'modelDate': formData.year,
        'vehicleIdentificationNumber': formData.vin,
        'color': formData.color,
        'fuelType': formData.fuelType,
        'vehicleTransmission': formData.transmission,
        'driveWheelConfiguration': formData.driveTrain,
        'mileageFromOdometer': {
          '@type': 'QuantitativeValue',
          'value': formData.mileage,
          'unitCode': 'SMI'
        },
        'offers': {
          '@type': 'Offer',
          'price': formData.price,
          'priceCurrency': formData.currency,
          'itemCondition': 'https://schema.org/NewCondition',
          'availability': 'https://schema.org/InStock',
          'seller': {
            '@type': 'AutoDealer',
            'name': formData.dealerName,
            'telephone': formData.dealerPhone,
            'address': formData.dealerAddress
          }
        }
      };
    } else if (schemaType === 'AutoDealer') {
      return {
        '@context': 'https://schema.org',
        '@type': 'AutoDealer',
        'name': formData.dealerName,
        'telephone': formData.dealerPhone,
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '1240 Automotive Pkwy',
          'addressLocality': 'Austin',
          'addressRegion': 'TX',
          'postalCode': '78701',
          'addressCountry': 'US'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': '30.2672',
          'longitude': '-97.7431'
        },
        'openingHoursSpecification': [
          {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            'opens': '08:30',
            'closes': '20:00'
          }
        ],
        'priceRange': '$$$'
      };
    } else {
      return {
        '@context': 'https://schema.org',
        '@type': 'AutoRepair',
        'name': `${formData.dealerName} - Authorized Service & Repair Center`,
        'telephone': formData.dealerPhone,
        'address': formData.dealerAddress,
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': 'Automotive Repair & Maintenance Services',
          'itemListElement': [
            { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'EV Battery & Diagnostic Inspection' } },
            { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Brake System Replacement & Calibration' } },
            { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Transmission Fluid Service & Tuning' } }
          ]
        }
      };
    }
  };

  const jsonString = JSON.stringify(generateJsonLd(), null, 2);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`<script type="application/ld+json">\n${jsonString}\n</script>`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadJson = () => {
    const element = document.createElement("a");
    const file = new Blob([jsonString], {type: 'application/json'});
    element.href = URL.createObjectURL(file);
    element.download = `vehicle-schema-${formData.vin || 'auto'}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-amber-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> AUTOMOTIVE STRUCTURED DATA ENGINE
            </div>
            <h2 className="text-2xl font-bold text-white">Vehicle & Dealership Schema JSON-LD Generator</h2>
            <p className="text-xs text-slate-400 mt-1">
              Generate Schema.org compliant structured data for Google Vehicle Listings, Rich Snippets, and Knowledge Graph.
            </p>
          </div>

          <div className="flex items-center space-x-1 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 self-start">
            {['Vehicle', 'AutoDealer', 'AutoRepair'].map((type) => (
              <button
                key={type}
                onClick={() => setSchemaType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  schemaType === type
                    ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Form Inputs (7 Cols) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Layers className="w-4 h-4 text-amber-400" /> Vehicle Detail & Inventory Attributes
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Vehicle Full Title</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">VIN (17 Digit Identifier)</label>
              <input
                type="text"
                name="vin"
                value={formData.vin}
                onChange={handleInputChange}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-amber-400 font-mono focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Make / Manufacturer</label>
              <input
                type="text"
                name="make"
                value={formData.make}
                onChange={handleInputChange}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Model & Trim</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Year</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Listing Price ($ USD)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-emerald-400 font-bold focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Fuel Type</label>
              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleInputChange}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Electric">Electric (EV)</option>
                <option value="Gasoline">Gasoline</option>
                <option value="Hybrid">Plug-in Hybrid (PHEV)</option>
                <option value="Diesel">Diesel</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Odometer Mileage</label>
              <input
                type="text"
                name="mileage"
                value={formData.mileage}
                onChange={handleInputChange}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Exterior Color</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Dealership Name</label>
              <input
                type="text"
                name="dealerName"
                value={formData.dealerName}
                onChange={handleInputChange}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-cyan-300 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Live Code Box (5 Cols) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Code2 className="w-4 h-4 text-amber-400" /> Output JSON-LD Code
              </h3>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Schema.org Valid
              </span>
            </div>

            <div className="relative bg-slate-950 rounded-xl p-4 border border-slate-800 overflow-x-auto max-h-[380px] font-mono text-xs text-amber-300/90 leading-relaxed shadow-inner">
              <pre>
                <code>{`<script type="application/ld+json">\n${jsonString}\n</script>`}</code>
              </pre>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
            <button
              onClick={copyToClipboard}
              className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all flex items-center justify-center gap-1.5 shadow-md"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied JSON-LD!' : 'Copy Script Code'}
            </button>
            <button
              onClick={downloadJson}
              className="py-2.5 px-4 rounded-xl bg-slate-800 text-slate-200 hover:text-white font-semibold text-xs border border-slate-700 hover:border-slate-600 transition-all flex items-center justify-center gap-1.5"
            >
              <Download className="w-4 h-4 text-cyan-400" /> Download .json
            </button>
            <a
              href="https://search.google.com/test/rich-results"
              target="_blank"
              rel="noreferrer"
              className="py-2.5 px-4 rounded-xl bg-slate-900 text-slate-300 hover:text-white font-semibold text-xs border border-slate-800 hover:border-amber-500/50 transition-all flex items-center justify-center gap-1.5"
            >
              <ExternalLink className="w-4 h-4 text-amber-400" /> Google Test
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}
