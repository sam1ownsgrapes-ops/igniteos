import React, { useState, useEffect, useMemo } from 'react';
import { INITIAL_GAMES } from './data/games.js';
import { Header } from './components/Header.jsx';
import { CategoryNav } from './components/CategoryNav.jsx';
import { GameCard } from './components/GameCard.jsx';
import { GamePlayer } from './components/GamePlayer.jsx';
import { AddGameModal } from './components/AddGameModal.jsx';
import { JsonViewerModal } from './components/JsonViewerModal.jsx';
import { TabCloakModal } from './components/TabCloakModal.jsx';
import { Flame, Sparkles, Frown, Package, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Load games from localStorage or default dataset
  const [games, setGames] = useState(() => {
    try {
      const savedCustom = localStorage.getItem('ignite_custom_games');
      if (savedCustom) {
        const parsed = JSON.parse(savedCustom);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return [...INITIAL_GAMES, ...parsed];
        }
      }
    } catch (e) {
      console.error('Error loading custom games:', e);
    }
    return INITIAL_GAMES;
  });

  // Favorite games
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('ignite_favorites');
      return saved ? JSON.parse(saved) : ['slope', '2048', 'tetris', 'snake'];
    } catch (e) {
      return ['slope', '2048', 'tetris', 'snake'];
    }
  });

  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeCloak, setActiveCloak] = useState('Default');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [isCloakModalOpen, setIsCloakModalOpen] = useState(false);

  // Sync favorites with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ignite_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error('Error saving favorites:', e);
    }
  }, [favorites]);

  // Apply tab cloaking
  const applyTabCloak = (option) => {
    setActiveCloak(option.name);
    document.title = option.title;

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = option.favicon;
  };

  // Toggle favorite
  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Add custom game
  const handleAddGame = (newGame) => {
    setGames((prev) => {
      const updated = [newGame, ...prev];
      const customOnly = updated.filter((g) => g.isCustom);
      try {
        localStorage.setItem('ignite_custom_games', JSON.stringify(customOnly));
      } catch (e) {}
      return updated;
    });
    setSelectedGame(newGame);
  };

  // Pick random game
  const handleRandomGame = () => {
    if (games.length === 0) return;
    const rand = games[Math.floor(Math.random() * games.length)];
    setSelectedGame(rand);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { All: games.length };
    games.forEach((g) => {
      counts[g.category] = (counts[g.category] || 0) + 1;
    });
    return counts;
  }, [games]);

  // Filtered games
  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      // Category filter
      if (activeCategory === 'Favorites') {
        if (!favorites.includes(game.id)) return false;
      } else if (activeCategory !== 'All' && game.category !== activeCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = game.title.toLowerCase().includes(q);
        const matchesDesc = game.description.toLowerCase().includes(q);
        const matchesCat = game.category.toLowerCase().includes(q);
        const matchesTags = game.tags && game.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesCat && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [games, activeCategory, searchQuery, favorites]);

  // Related games for current player
  const relatedGames = useMemo(() => {
    if (!selectedGame) return [];
    return games.filter(
      (g) => g.id !== selectedGame.id && (g.category === selectedGame.category || favorites.includes(g.id))
    );
  }, [games, selectedGame, favorites]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-slate-950">
      {/* Top Navigation Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        favoritesCount={favorites.length}
        onRandomGame={handleRandomGame}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenJsonModal={() => setIsJsonModalOpen(true)}
        onOpenCloakModal={() => setIsCloakModalOpen(true)}
        onHomeClick={() => {
          setSelectedGame(null);
          setActiveCategory('All');
          setSearchQuery('');
        }}
      />

      {/* Main Content Area */}
      {selectedGame ? (
        // Game Playing View
        <main className="flex-1 py-2">
          <GamePlayer
            game={selectedGame}
            isFavorite={favorites.includes(selectedGame.id)}
            onToggleFavorite={toggleFavorite}
            onBack={() => setSelectedGame(null)}
            onSelectGame={(g) => setSelectedGame(g)}
            relatedGames={relatedGames}
          />
        </main>
      ) : (
        // Catalog View
        <div className="flex-1 flex flex-col">
          {/* Category Navigation Pills */}
          <CategoryNav
            activeCategory={activeCategory}
            onSelectCategory={(cat) => {
              setActiveCategory(cat);
              setSearchQuery('');
            }}
            categoryCounts={categoryCounts}
          />

          {/* Subheader Hero / Status Banner */}
          <section className="bg-gradient-to-b from-slate-900/60 to-transparent border-b border-slate-800/40 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/20">
                    <Flame className="w-3 h-3" />
                    Unblocked Arcade Portal
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <ShieldCheck className="w-3 h-3" />
                    No AI Features
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20 hidden sm:inline-flex">
                    <Package className="w-3 h-3" />
                    unpkg.com/ignite-main
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
                  Play Unblocked Games Instantly
                </h1>
                <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                  Every game is stored directly as an HTML <code className="text-orange-300 font-mono">iframe</code> in <code className="text-orange-300 font-mono">games.json</code>. Fast loading, offline capable, zero trackers, and customizable.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  id="browse-json-storage-btn"
                  onClick={() => setIsJsonModalOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold transition-all shadow-sm"
                >
                  <span>Inspect games.json</span>
                </button>
                <button
                  id="random-quick-play-btn"
                  onClick={handleRandomGame}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-extrabold transition-all shadow-md shadow-orange-600/30"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Surprise Me</span>
                </button>
              </div>
            </div>
          </section>

          {/* Games Grid Container */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
            {/* Filter Status Bar */}
            <div className="flex items-center justify-between mb-4 text-xs text-slate-400">
              <div>
                Showing <b className="text-slate-100">{filteredGames.length}</b> {filteredGames.length === 1 ? 'game' : 'games'}
                {activeCategory !== 'All' && (
                  <span> in <b className="text-orange-400">{activeCategory}</b></span>
                )}
                {searchQuery && (
                  <span> matching "<b className="text-slate-200">{searchQuery}</b>"</span>
                )}
              </div>

              {(activeCategory !== 'All' || searchQuery) && (
                <button
                  onClick={() => {
                    setActiveCategory('All');
                    setSearchQuery('');
                  }}
                  className="text-orange-400 hover:underline font-semibold"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Games Grid */}
            {filteredGames.length > 0 ? (
              <div
                id="games-grid"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
              >
                {filteredGames.map((game) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    isFavorite={favorites.includes(game.id)}
                    onToggleFavorite={toggleFavorite}
                    onSelectGame={(g) => setSelectedGame(g)}
                  />
                ))}
              </div>
            ) : (
              // Empty State
              <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/30">
                <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mb-3">
                  <Frown className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-200 mb-1">No Games Found</h3>
                <p className="text-xs text-slate-400 max-w-sm mb-4">
                  We couldn't find any games matching your current search or category filter.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setActiveCategory('All');
                      setSearchQuery('');
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs transition-colors"
                  >
                    Reset Filters
                  </button>
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
                  >
                    Add a Custom Game
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="font-bold text-slate-300">Ignite Unblocked Games</span>
            <span>•</span>
            <span>All games rendered via JSON iframe storage</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span className="text-slate-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              Package: <code className="text-slate-300">ignite-main</code>
            </span>
            <button
              onClick={() => setIsJsonModalOpen(true)}
              className="hover:text-orange-400 transition-colors"
            >
              View games.json
            </button>
            <button
              onClick={() => setIsCloakModalOpen(true)}
              className="hover:text-orange-400 transition-colors"
            >
              Tab Cloaker ({activeCloak})
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AddGameModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddGame={handleAddGame}
      />

      <JsonViewerModal
        isOpen={isJsonModalOpen}
        onClose={() => setIsJsonModalOpen(false)}
        games={games}
      />

      <TabCloakModal
        isOpen={isCloakModalOpen}
        onClose={() => setIsCloakModalOpen(false)}
        activeCloak={activeCloak}
        onSelectCloak={applyTabCloak}
      />
    </div>
  );
}
