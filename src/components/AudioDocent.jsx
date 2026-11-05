import React, { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

export default function AudioDocent({ textToSpeak }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [rate, setRate] = useState(1);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  }, [textToSpeak]);

  const handleToggle = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsPlaying(!isPlaying);
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = rate;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  return (
    <div className="glass-card rounded-xl p-3.5 border border-heritage-border flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggle}
            className="w-9 h-9 rounded-full bg-heritage-terracotta text-white flex items-center justify-center shadow-lg shadow-heritage-terracotta/30 hover:scale-105 transition"
          >
            {isPlaying ? <Pause className="w-4 h-4"/> : <Play className="w-4 h-4 fill-current ml-0.5"/>}
          </button>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>AI Audio Docent</span>
              {isPlaying && (
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 h-full bg-heritage-terracotta animate-pulse" />
                  <span className="w-0.5 h-2/3 bg-heritage-gold animate-bounce" />
                  <span className="w-0.5 h-full bg-emerald-400 animate-pulse" />
                </div>
              )}
            </div>
            <p className="text-[10px] text-slate-400">Hyper-local historical narration</p>
          </div>
        </div>

        <button
          onClick={() => setRate(rate === 1 ? 1.2 : 1)}
          className="text-[11px] font-mono px-2 py-1 rounded bg-white/[0.05] border border-heritage-border text-slate-300 hover:text-white"
        >
          {rate}x
        </button>
      </div>

      {isPlaying && (
        <div className="p-2 rounded bg-black/30 border border-heritage-border/40 text-xs text-slate-300 italic animate-pulse">
          "{textToSpeak}"
        </div>
      )}
    </div>
  );
}

