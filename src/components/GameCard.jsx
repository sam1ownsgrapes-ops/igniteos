import React from 'react';
import { Play, Star, Sparkles } from 'lucide-react';

const THUMB_GRADIENTS = {
  slope: 'from-cyan-600 via-blue-700 to-indigo-900',
  '2048': 'from-amber-500 via-orange-600 to-red-700',
  snake: 'from-emerald-600 via-teal-700 to-slate-900',
  tetris: 'from-indigo-600 via-purple-700 to-pink-900',
  flappy: 'from-sky-500 via-amber-500 to-emerald-700',
  dino: 'from-slate-600 via-zinc-700 to-slate-900',
  breakout: 'from-pink-600 via-rose-700 to-amber-700',
  space: 'from-purple-600 via-violet-800 to-slate-950',
  pong: 'from-sky-600 via-blue-800 to-slate-950',
  mines: 'from-slate-700 via-slate-800 to-zinc-900',
  'retro-bowl': 'from-amber-700 via-yellow-800 to-stone-900',
  cookie: 'from-amber-600 via-yellow-700 to-orange-900',
  tunnel: 'from-fuchsia-600 via-rose-700 to-violet-950',
  moto: 'from-orange-600 via-red-700 to-zinc-950',
  paper: 'from-emerald-500 via-cyan-600 to-blue-800',
};

const GAME_SYMBOLS = {
  slope: '⚡',
  '2048': '2048',
  snake: '🐍',
  tetris: '🧱',
  flappy: '🐥',
  dino: '🦖',
  breakout: '🏓',
  space: '👾',
  pong: '⚪',
  mines: '💣',
  'retro-bowl': '🏈',
  cookie: '🍪',
  tunnel: '🌀',
  moto: '🏍️',
  paper: '🗺️',
};

export const GameCard = ({
  game,
  isFavorite,
  onToggleFavorite,
  onSelectGame,
}) => {
  const gradient = THUMB_GRADIENTS[game.thumbnail] || 'from-orange-600 via-slate-800 to-slate-950';
  const symbol = GAME_SYMBOLS[game.thumbnail] || '🎮';

  return (
    <div
      id={`game-card-${game.id}`}
      onClick={() => onSelectGame(game)}
      className="group relative bg-slate-900/90 rounded-xl border border-slate-800 hover:border-orange-500/50 transition-all duration-200 overflow-hidden cursor-pointer flex flex-col hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1 select-none"
    >
      {/* Card Thumbnail Area */}
      <div className={`relative w-full h-36 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:16px_16px] opacity-40"></div>

        <span className="text-5xl drop-shadow-md group-hover:scale-110 transition-transform duration-200">
          {symbol}
        </span>

        {game.badge && (
          <span className="absolute top-2.5 left-2.5 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-slate-950/70 backdrop-blur-md text-orange-300 border border-orange-500/30 tracking-wider shadow-sm flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-orange-400" />
            {game.badge}
          </span>
        )}

        <button
          id={`fav-btn-${game.id}`}
          onClick={(e) => onToggleFavorite(game.id, e)}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-lg bg-slate-950/60 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-slate-950 hover:scale-110 transition-all"
        >
          <Star
            className={`w-3.5 h-3.5 transition-colors ${
              isFavorite ? 'fill-amber-400 text-amber-400' : 'text-slate-300 hover:text-white'
            }`}
          />
        </button>

        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
          <div className="w-12 h-12 rounded-full bg-orange-500 text-slate-950 flex items-center justify-center shadow-lg shadow-orange-500/40 group-hover:scale-105 transition-transform">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-3.5 flex flex-col flex-1 justify-between gap-2">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <h3 className="font-bold text-sm text-slate-100 group-hover:text-orange-400 transition-colors truncate">
              {game.title}
            </h3>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 shrink-0">
              {game.category}
            </span>
          </div>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {game.description}
          </p>
        </div>

        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <span className="truncate">{game.author || 'Ignite Game'}</span>
          <span className="text-orange-400 font-semibold group-hover:underline flex items-center gap-1">
            Play Game →
          </span>
        </div>
      </div>
    </div>
  );
};
