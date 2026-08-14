import React from 'react';
import { ExpenseOption } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';

interface ComparisonGraphProps {
  live365Price: number;
  radioCoBasePrice: number;
  options: ExpenseOption[];
  selectedIds: string[];
}

export const ComparisonGraph: React.FC<ComparisonGraphProps> = ({
  live365Price,
  radioCoBasePrice,
  options,
  selectedIds,
}) => {
  // Active selected options
  const activeOptions = options.filter((opt) => selectedIds.includes(opt.id));
  
  // Calculate total Radio.co cost (Base $59 + checked add-on expenses)
  // If base-hosting is in options, we calculate the sum of checked options + radioCoBasePrice
  const additionalCost = activeOptions.reduce((sum, opt) => sum + opt.cost, 0);
  const radioCoTotal = radioCoBasePrice + additionalCost;

  const monthlySavings = Math.max(0, radioCoTotal - live365Price);
  const annualSavings = monthlySavings * 12;

  // Max value for scale calculation
  const maxScale = Math.max(500, radioCoTotal * 1.15, live365Price * 1.5);
  const maxHeightPx = 360;

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100 flex flex-col justify-between">
      {/* Graph Header with Savings Badge */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white">
              Monthly Cost Comparison
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Live365 flat rate vs. Radio.co stacked expenses
            </p>
          </div>

          {/* Dynamic Savings Display */}
          {monthlySavings > 0 && (
            <motion.div
              key={monthlySavings}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold tracking-wider block leading-none text-emerald-400/80">
                  Live365 Savings
                </span>
                <span className="font-mono font-black text-sm text-emerald-300">
                  Save ${monthlySavings.toFixed(2)}/mo
                </span>
              </div>
            </motion.div>
          )}
        </div>

        {/* 2-Bar Comparison Chart Area */}
        <div className="relative pt-8 pb-4 flex items-end justify-center gap-8 sm:gap-16 min-h-[420px]">
          
          {/* Subtle Grid line behind bars */}
          <div className="absolute inset-x-0 bottom-12 border-b border-slate-800 pointer-events-none" />

          {/* Bar 1: Live365 (All-Inclusive $65/mo) */}
          <div className="w-36 sm:w-44 flex flex-col items-center">
            {/* Price badge above bar */}
            <div className="mb-2 text-center">
              <span className="inline-block px-3 py-1 rounded-xl bg-[#F05023] text-white font-mono font-black text-base shadow-lg shadow-[#F05023]/30">
                ${live365Price.toFixed(2)}
                <span className="text-[11px] font-normal text-orange-200">/mo</span>
              </span>
              <div className="text-[11px] font-bold text-[#F05023] mt-1 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>All-Inclusive</span>
              </div>
            </div>

            {/* Solid Bar */}
            <div
              className="w-full rounded-t-xl bg-[#F05023] shadow-lg shadow-[#F05023]/20 flex flex-col justify-between p-3 text-white transition-all duration-300 relative overflow-hidden"
              style={{
                height: `${Math.max(120, (live365Price / maxScale) * maxHeightPx)}px`,
              }}
            >
              <div className="text-center font-bold text-xs uppercase tracking-wider text-orange-100">
                Live365
              </div>
              <div className="text-[10px] text-center font-medium bg-black/20 rounded py-1 px-1">
                Hosting + Licensing + Reporting Included
              </div>
            </div>

            {/* Label below bar */}
            <div className="mt-3 text-center">
              <span className="font-bold text-sm text-white block">Live365</span>
              <span className="text-[11px] text-slate-400 block">Flat Rate Plan</span>
            </div>
          </div>

          {/* Bar 2: Radio.co (Interactive Stacked Bar starting at $59/mo + selectable options) */}
          <div className="w-36 sm:w-44 flex flex-col items-center">
            {/* Price badge above bar */}
            <div className="mb-2 text-center">
              <motion.span
                key={radioCoTotal}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="inline-block px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono font-black text-base shadow-md"
              >
                ${radioCoTotal.toFixed(2)}
                <span className="text-[11px] font-normal text-slate-400">/mo</span>
              </motion.span>
              <div className="text-[11px] font-bold text-rose-400 mt-1 flex items-center justify-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Total Stacked Cost</span>
              </div>
            </div>

            {/* Stacked Bar Container */}
            <div
              className="w-full rounded-t-xl bg-slate-950 border border-slate-800 flex flex-col-reverse shadow-xl transition-all duration-300 relative overflow-hidden"
              style={{
                height: `${Math.max(120, (radioCoTotal / maxScale) * maxHeightPx)}px`,
              }}
            >
              {/* 1. Base Starting Radio.co Tier ($59/mo) */}
              <div
                className="w-full bg-slate-800 text-white flex flex-col justify-center px-2 py-1 border-b border-slate-700 text-center shrink-0 transition-all"
                style={{
                  height: `${(radioCoBasePrice / maxScale) * maxHeightPx}px`,
                }}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                  Radio.co Base
                </span>
                <span className="font-mono font-bold text-xs text-white">
                  ${radioCoBasePrice.toFixed(2)}
                </span>
              </div>

              {/* 2. Selectable Animated Colored Segments */}
              <AnimatePresence>
                {activeOptions.map((opt) => {
                  const segmentHeightPx = (opt.cost / maxScale) * maxHeightPx;

                  return (
                    <motion.div
                      key={opt.id}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: segmentHeightPx, opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="w-full text-white flex flex-col justify-center px-2 py-1 border-b border-black/20 text-center overflow-hidden shrink-0"
                      style={{
                        backgroundColor: opt.color,
                      }}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider truncate text-white/90 drop-shadow-sm">
                        {opt.name}
                      </span>
                      <span className="font-mono font-black text-xs text-white drop-shadow-sm">
                        +${opt.cost.toFixed(2)}
                      </span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Label below bar */}
            <div className="mt-3 text-center">
              <span className="font-bold text-sm text-white block">Radio.co Stack</span>
              <span className="text-[11px] text-slate-400 block">
                {activeOptions.length} baseline required expense{activeOptions.length === 1 ? '' : 's'} included
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
