import React from 'react';
import { Flame, Search, Shuffle, Plus, Code2, ShieldAlert, Star } from 'lucide-react';

export const Header = ({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  favoritesCount,
  onRandomGame,
  onOpenAddModal,
  onOpenJsonModal,
  onOpenCloakModal,
  onHomeClick
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          id="brand-logo"
          onClick={onHomeClick}
          className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-orange-500 to-rose-500 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-200">
            <Flame className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-200">
                IGNITE
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30 tracking-widest uppercase">
                Unblocked
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium -mt-0.5 hidden sm:block">
              HTML5 Iframe Games Hub
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-2 relative">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              id="game-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search games, categories, tags..."
              className="w-full bg-slate-900 border border-slate-700/80 rounded-full pl-10 pr-10 py-2 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200 px-1"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Favorites filter button */}
          <button
            id="filter-favorites-btn"
            onClick={() => setActiveCategory(activeCategory === 'Favorites' ? 'All' : 'Favorites')}
            title="View starred favorite games"
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all border ${
              activeCategory === 'Favorites'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-slate-100'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${activeCategory === 'Favorites' ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
            <span className="hidden md:inline">Favorites</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-800 text-slate-300">
              {favoritesCount}
            </span>
          </button>

          {/* Random Game */}
          <button
            id="btn-random-game"
            onClick={onRandomGame}
            title="Play a random game"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-slate-100 border border-slate-800 hover:border-slate-700 transition-all"
          >
            <Shuffle className="w-3.5 h-3.5 text-orange-400" />
            <span className="hidden lg:inline">Random</span>
          </button>

          {/* Add Game */}
          <button
            id="btn-add-custom-game"
            onClick={onOpenAddModal}
            title="Add a custom game via iframe"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-slate-100 border border-slate-800 hover:border-slate-700 transition-all"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Add Game</span>
          </button>

          {/* Tab Cloak */}
          <button
            id="btn-tab-cloak"
            onClick={onOpenCloakModal}
            title="Disguise tab as Google Docs / Classroom"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-slate-100 border border-slate-800 hover:border-slate-700 transition-all"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden xl:inline">Tab Cloak</span>
          </button>

          {/* games.json viewer */}
          <button
            id="btn-view-json"
            onClick={onOpenJsonModal}
            title="Inspect games.json and iframe storage"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-orange-600/20 hover:bg-orange-600/30 text-orange-300 border border-orange-500/30 transition-all"
          >
            <Code2 className="w-3.5 h-3.5 text-orange-400" />
            <span className="hidden md:inline">JSON</span>
          </button>
        </div>
      </div>
    </header>
  );
};
