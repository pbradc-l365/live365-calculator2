import React, { useState } from 'react';
import { CheckboxControls } from './components/CheckboxControls';
import { ComparisonGraph } from './components/ComparisonGraph';
import {
  LIVE365_PRICE,
  RADIO_CO_BASE_STARTING_PRICE,
  EXPENSE_OPTIONS,
} from './data/calculatorData';

export default function App() {
  // Default selected expenses: users can toggle any of them, including Base Audio Hosting
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'base-hosting',
    'music-licensing',
    'royalty-reporting',
  ]);

  // Toggle single expense
  const handleToggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Select all
  const handleSelectAll = () => {
    setSelectedIds(EXPENSE_OPTIONS.map((opt) => opt.id));
  };

  // Deselect all
  const handleDeselectAll = () => {
    setSelectedIds([]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Main Content Area */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
        
        {/* Intro Title */}
        <section className="text-center max-w-2xl mx-auto space-y-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            The True Cost of Streaming: <br />
            <span className="text-[#F05023]">Live365</span> vs. Radio.co
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Check or uncheck broadcaster expenses below to see how standalone costs stack up against Live365&apos;s all-inclusive $65/mo flat rate.
          </p>
        </section>

        {/* 2-Column Calculator: Checkboxes on the Left, 2-Bar Graph on the Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Checkboxes */}
          <div className="lg:col-span-5 flex">
            <CheckboxControls
              options={EXPENSE_OPTIONS}
              selectedIds={selectedIds}
              onToggle={handleToggle}
              onSelectAll={handleSelectAll}
              onDeselectAll={handleDeselectAll}
            />
          </div>

          {/* Right Column: 2-Bar Graph */}
          <div className="lg:col-span-7 flex">
            <ComparisonGraph
              live365Price={LIVE365_PRICE}
              radioCoBasePrice={RADIO_CO_BASE_STARTING_PRICE}
              options={EXPENSE_OPTIONS}
              selectedIds={selectedIds}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
