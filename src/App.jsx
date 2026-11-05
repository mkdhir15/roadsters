import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TrailMap from './components/TrailMap';
import StoryConsole from './components/StoryConsole';
import AudioDocent from './components/AudioDocent';
import { trailsData } from './data/trailData';

export default function App() {
  const [selectedCity, setSelectedCity] = useState('jaipur');
  const [language, setLanguage] = useState('en');
  const [activeStopId, setActiveStopId] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const cityData = trailsData[selectedCity];
  const activeStop = cityData.stops.find((s) => s.id === activeStopId) || cityData.stops[0];

  useEffect(() => {
    setActiveStopId(1);
    setProgress(0);
    setIsSimulating(false);
  }, [selectedCity]);

  useEffect(() => {
    let interval = null;
    if (isSimulating) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const next = (prev + 1) % cityData.stops.length;
          setActiveStopId(cityData.stops[next].id);
          return next;
        });
      }, 4500);
    }
    return () => clearInterval(interval);
  }, [isSimulating, cityData.stops]);

  return (
    <div className="min-h-screen bg-heritage-bg text-slate-100 flex flex-col font-sans selection:bg-heritage-terracotta selection:text-white">
      <Navbar
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        language={language}
        setLanguage={setLanguage}
        isSimulating={isSimulating}
        setIsSimulating={setIsSimulating}
      />

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 max-w-7xl mx-auto w-full">
        <div className="lg:col-span-7 flex flex-col gap-4">
          <TrailMap
            cityData={cityData}
            activeStopId={activeStopId}
            setActiveStopId={(id) => {
              setActiveStopId(id);
              const idx = cityData.stops.findIndex((s) => s.id === id);
              if (idx !== -1) setProgress(idx);
            }}
            progress={progress}
            setProgress={setProgress}
          />
        </div>

        <div className="lg:col-span-5 flex flex-col gap-4">
          <StoryConsole
            stop={activeStop}
            language={language}
          />
          <AudioDocent
            textToSpeak={activeStop.story}
          />
        </div>
      </main>
    </div>
  );
}
