import React from 'react';
import { Gamepad2, Flame, Puzzle, Trophy, Compass, Sparkles, Car } from 'lucide-react';

const CATEGORIES = [
  { id: 'All', label: 'All Games', icon: <Compass className="w-3.5 h-3.5" /> },
  { id: 'Action', label: 'Action', icon: <Flame className="w-3.5 h-3.5 text-orange-400" /> },
  { id: 'Arcade', label: 'Arcade', icon: <Gamepad2 className="w-3.5 h-3.5 text-emerald-400" /> },
  { id: 'Puzzle', label: 'Puzzle', icon: <Puzzle className="w-3.5 h-3.5 text-cyan-400" /> },
  { id: 'Sports', label: 'Sports', icon: <Trophy className="w-3.5 h-3.5 text-amber-400" /> },
  { id: 'Retro', label: 'Retro', icon: <Sparkles className="w-3.5 h-3.5 text-purple-400" /> },
  { id: 'Racing', label: 'Racing', icon: <Car className="w-3.5 h-3.5 text-rose-400" /> },
];

export const CategoryNav = ({
  activeCategory,
  onSelectCategory,
  categoryCounts
}) => {
  return (
    <nav className="w-full py-3 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 bg-slate-900/40">
      <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = cat.id === 'All' ? categoryCounts['All'] || 0 : categoryCounts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              id={`cat-btn-${cat.id.toLowerCase()}`}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 border ${
                isActive
                  ? 'bg-orange-500 text-slate-950 font-bold border-orange-400 shadow-md shadow-orange-500/20 scale-[1.02]'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-medium ${
                  isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
