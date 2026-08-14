import React from 'react';
import { ExpenseOption } from '../types';
import { Check, CheckSquare, Square } from 'lucide-react';

interface CheckboxControlsProps {
  options: ExpenseOption[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
}

export const CheckboxControls: React.FC<CheckboxControlsProps> = ({
  options,
  selectedIds,
  onToggle,
  onSelectAll,
  onDeselectAll,
}) => {
  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              Broadcaster Expenses
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Select the expenses broadcasters must pay to run a station:
            </p>
          </div>
        </div>

        {/* Quick action buttons */}
        <div className="flex items-center gap-2 my-4">
          <button
            type="button"
            id="select-all-btn"
            onClick={onSelectAll}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <CheckSquare className="w-3.5 h-3.5 text-[#F05023]" />
            <span>Select All</span>
          </button>
          <button
            type="button"
            id="deselect-all-btn"
            onClick={onDeselectAll}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <Square className="w-3.5 h-3.5 text-slate-400" />
            <span>Deselect All</span>
          </button>
        </div>

        {/* Selectable Checkboxes List */}
        <div className="space-y-3">
          {options.map((option) => {
            const isChecked = selectedIds.includes(option.id);

            return (
              <div
                key={option.id}
                id={`expense-card-${option.id}`}
                onClick={() => onToggle(option.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer select-none ${
                  isChecked
                    ? 'bg-slate-950/80 border-slate-700 shadow-md ring-1 ring-slate-600/50'
                    : 'bg-slate-950/30 border-slate-800/80 hover:border-slate-700 opacity-75 hover:opacity-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Custom Checkbox */}
                  <div
                    className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center transition-colors shrink-0 border ${
                      isChecked
                        ? 'bg-[#F05023] border-[#F05023] text-white'
                        : 'border-slate-600 bg-slate-900 text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>

                  {/* Expense Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: option.color }}
                        />
                        <span className="font-bold text-sm text-white">
                          {option.name}
                        </span>
                      </div>
                      <span className="font-mono font-bold text-sm text-white shrink-0">
                        ${option.cost.toFixed(2)}
                        <span className="text-[11px] font-normal text-slate-400">/mo</span>
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {option.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
