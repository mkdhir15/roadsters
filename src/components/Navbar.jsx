import React from 'react';
import { Compass, Play, Pause, Globe } from 'lucide-react';

export default function Navbar({
  selectedCity,
  setSelectedCity,
  language,
  setLanguage,
  isSimulating,
  setIsSimulating
}) {
  return (
    <header className="glass-card sticky top-0 z-50 px-6 py-3.5 flex items-center justify-between border-b border-heritage-border">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-heritage-terracotta/20 border border-heritage-terracotta flex items-center justify-center text-heritage-terracotta shadow-lg shadow-heritage-terracotta/20">
          <Compass className="w-6 h-6 animate-spin-slow"/>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-white font-serif">Gali Gatha</h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-heritage-terracotta/20 text-heritage-terracotta border border-heritage-terracotta/40 font-medium">
              गली गाथा
            </span>
          </div>
          <p className="text-xs text-slate-400">AI Cultural Trail & Local Artisan Radar</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="bg-heritage-canvas text-slate-200 text-sm px-3.5 py-1.5 rounded-lg border border-heritage-border focus:outline-none focus:border-heritage-terracotta transition"
        >
          <option value="jaipur">📍 Jaipur (Pink City)</option>
          <option value="varanasi">📍 Varanasi (Ghats & Weavers)</option>
        </select>

        <button
          onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg glass-card text-slate-300 hover:text-white border border-heritage-border transition"
        >
          <Globe className="w-3.5 h-3.5 text-heritage-gold"/>
          <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
        </button>

        <button
          onClick={() => setIsSimulating(!isSimulating)}
          className={`flex items-center gap-2 text-xs font-medium px-3.5 py-1.5 rounded-lg border transition ${
            isSimulating
              ? 'bg-heritage-terracotta text-white border-heritage-terracotta shadow-lg shadow-heritage-terracotta/30'
              : 'glass-card text-slate-200 border-heritage-border hover:border-heritage-terracotta/60'
          }`}
        >
          {isSimulating ? <Pause className="w-3.5 h-3.5"/> : <Play className="w-3.5 h-3.5 fill-current"/>}
          <span>{isSimulating ? 'Simulating Walk' : 'Simulate Walk'}</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>AI Docent Live</span>
        </div>
      </div>
    </header>
  );
}

