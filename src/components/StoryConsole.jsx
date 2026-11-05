import React, { useState } from 'react';
import { BookOpen, Store, MessageSquareQuote, Sparkles, Navigation2 } from 'lucide-react';

export default function StoryConsole({ stop, language }) {
  const [activeTab, setActiveTab] = useState('folklore');

  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col gap-5 border border-heritage-border h-full">
      <div className="border-b border-heritage-border/60 pb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-heritage-terracotta/20 text-heritage-terracotta border border-heritage-terracotta/40 font-semibold uppercase">
            Stop {stop.id} of 4 • {stop.category}
          </span>
          <span className="text-xs text-slate-400">{stop.distanceFromStart} on Trail</span>
        </div>
        <h2 className="text-xl font-bold text-white font-serif">
          {language === 'hi' ? stop.hindiName : stop.name}
        </h2>
        <p className="text-xs text-heritage-gold font-medium mt-0.5">
          {language === 'hi' ? stop.name : stop.hindiName}
        </p>
      </div>

      <div className="flex gap-2 border-b border-heritage-border/40 pb-3">
        <button
          onClick={() => setActiveTab('folklore')}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition ${
            activeTab === 'folklore'
              ? 'bg-heritage-terracotta text-white font-medium shadow-md'
              : 'text-slate-400 hover:text-white glass-card'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5"/>
          <span>Story & Myth</span>
        </button>

        <button
          onClick={() => setActiveTab('artisan')}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition ${
            activeTab === 'artisan'
              ? 'bg-heritage-terracotta text-white font-medium shadow-md'
              : 'text-slate-400 hover:text-white glass-card'
          }`}
        >
          <Store className="w-3.5 h-3.5 text-heritage-gold"/>
          <span>Artisan Radar</span>
        </button>

        <button
          onClick={() => setActiveTab('dialect')}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition ${
            activeTab === 'dialect'
              ? 'bg-heritage-terracotta text-white font-medium shadow-md'
              : 'text-slate-400 hover:text-white glass-card'
          }`}
        >
          <MessageSquareQuote className="w-3.5 h-3.5 text-emerald-400"/>
          <span>Local Dialect</span>
        </button>
      </div>

      <div className="flex-1">
        {activeTab === 'folklore' && (
          <div className="flex flex-col gap-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-heritage-border/40">
              <span className="text-xs text-heritage-gold font-semibold uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                <Sparkles className="w-3.5 h-3.5"/> The Living Tale
              </span>
              <p className="text-sm text-slate-200 leading-relaxed">{stop.story}</p>
            </div>

            <div className="p-4 rounded-xl bg-heritage-terracotta/10 border border-heritage-terracotta/30">
              <span className="text-xs text-heritage-terracotta font-semibold uppercase tracking-wider block mb-1">
                Lesser-Known Architecture Secret
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">{stop.hiddenSecret}</p>
            </div>
          </div>
        )}

        {activeTab === 'artisan' && (
          <div className="flex flex-col gap-3">
            <div className="p-4 rounded-xl glass-card border border-heritage-gold/30">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{stop.artisan.name}</h4>
                  <p className="text-xs text-heritage-gold">{stop.artisan.craft}</p>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  {stop.artisan.distance}
                </span>
              </div>

              <div className="mt-3 pt-3 border-t border-heritage-border/40 flex items-center justify-between text-xs">
                <span className="text-slate-400">Fair Price Benchmark:</span>
                <span className="text-white font-bold">{stop.artisan.priceRange}</span>
              </div>

              <div className="mt-3 p-2.5 rounded-lg bg-white/[0.03] border border-heritage-border/40 text-xs text-slate-300">
                <strong className="text-heritage-gold">Bargaining & Authenticity Tip: </strong>
                {stop.artisan.authenticTip}
              </div>

              <button className="w-full mt-3 flex items-center justify-center gap-2 py-2 rounded-lg bg-heritage-terracotta/20 hover:bg-heritage-terracotta text-heritage-terracotta hover:text-white border border-heritage-terracotta/40 transition text-xs font-semibold">
                <Navigation2 className="w-3.5 h-3.5"/>
                Navigate to Artisan Workshop
              </button>
            </div>
          </div>
        )}

        {activeTab === 'dialect' && (
          <div className="flex flex-col gap-3">
            <div className="p-4 rounded-xl glass-card border border-emerald-500/30">
              <span className="text-xs text-emerald-400 uppercase font-semibold">Native Courtesy Phrase</span>
              <h3 className="text-lg font-bold text-white mt-1">{stop.dialect.phrase}</h3>
              <p className="text-xs text-heritage-gold font-mono mt-0.5">Phonetic: "{stop.dialect.phonetic}"</p>
              <p className="text-xs text-slate-300 mt-2.5">{stop.dialect.meaning}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

