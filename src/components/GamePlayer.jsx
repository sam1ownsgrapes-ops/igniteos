import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Maximize2,
  Minimize2,
  RotateCw,
  Star,
  ExternalLink,
  Code2,
  Copy,
  Check,
  Gamepad2,
  Info
} from 'lucide-react';

export const GamePlayer = ({
  game,
  isFavorite,
  onToggleFavorite,
  onBack,
  onSelectGame,
  relatedGames
}) => {
  const containerRef = useRef(null);
  const iframeRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTheater, setIsTheater] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedIframe, setCopiedIframe] = useState(false);

  // Toggle true browser fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error('Fullscreen request failed:', err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => {
        console.error('Exit fullscreen failed:', err);
      });
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Reload iframe
  const reloadGame = () => {
    setIsLoading(true);
    if (iframeRef.current) {
      const currentSrc = iframeRef.current.src;
      iframeRef.current.src = '';
      setTimeout(() => {
        if (iframeRef.current) iframeRef.current.src = currentSrc;
      }, 100);
    }
  };

  // Open in stealth about:blank window
  const openStealthTab = () => {
    const newWindow = window.open('about:blank', '_blank');
    if (!newWindow) {
      alert('Popup blocked! Please allow popups to open game in a stealth window.');
      return;
    }
    newWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Google Docs</title>
          <link rel="icon" href="https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico" />
          <style>
            html, body { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #000; }
            iframe { width: 100%; height: 100%; border: none; }
          </style>
        </head>
        <body>
          ${game.iframe}
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  const copyIframeString = () => {
    navigator.clipboard.writeText(game.iframe);
    setCopiedIframe(true);
    setTimeout(() => setCopiedIframe(false), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-4 flex flex-col gap-4">
      {/* Top Navigation & Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 rounded-xl p-3 shadow-md">
        <div className="flex items-center gap-3">
          <button
            id="player-back-btn"
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Games</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-extrabold text-slate-100 truncate max-w-[200px] sm:max-w-xs">
                {game.title}
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                {game.category}
              </span>
            </div>
            {game.author && (
              <p className="text-[11px] text-slate-400">By {game.author}</p>
            )}
          </div>
        </div>

        {/* Player Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Favorite */}
          <button
            id="player-fav-btn"
            onClick={(e) => onToggleFavorite(game.id, e)}
            title={isFavorite ? 'Starred' : 'Star this game'}
            className={`p-2 rounded-lg border text-xs font-semibold transition-all ${
              isFavorite
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
          </button>

          {/* Reload */}
          <button
            id="player-reload-btn"
            onClick={reloadGame}
            title="Reload game iframe"
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          {/* Theater Mode */}
          <button
            id="player-theater-btn"
            onClick={() => setIsTheater(!isTheater)}
            title={isTheater ? 'Default Size' : 'Theater Mode (Wide)'}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold hidden md:flex items-center gap-1.5 transition-all ${
              isTheater
                ? 'bg-orange-600 text-white border-orange-500'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Theater</span>
          </button>

          {/* Stealth Tab / Blank Window */}
          <button
            id="player-stealth-tab-btn"
            onClick={openStealthTab}
            title="Open in an unblocked about:blank cloaked tab"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Stealth Tab</span>
          </button>

          {/* Fullscreen */}
          <button
            id="player-fullscreen-btn"
            onClick={toggleFullscreen}
            title="Enter Fullscreen"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold shadow-md shadow-orange-600/30 transition-all"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span>{isFullscreen ? 'Exit Full' : 'Fullscreen'}</span>
          </button>
        </div>
      </div>

      {/* Main Game Stage Container */}
      <div
        ref={containerRef}
        id="game-viewport-container"
        className={`relative w-full rounded-2xl bg-black border-2 border-slate-800 shadow-2xl overflow-hidden transition-all duration-300 flex items-center justify-center ${
          isFullscreen
            ? 'h-screen max-w-none rounded-none border-none'
            : isTheater
            ? 'h-[80vh] max-h-[850px]'
            : 'h-[560px] max-h-[75vh]'
        }`}
      >
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 z-20 bg-slate-950 flex flex-col items-center justify-center gap-3">
            <div className="w-10 h-10 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
            <p className="text-xs text-slate-400 font-medium tracking-wide">
              Loading {game.title} via JSON Iframe...
            </p>
          </div>
        )}

        {/* The Game Iframe */}
        <iframe
          ref={iframeRef}
          id="active-game-iframe"
          src={game.iframeUrl}
          title={game.title}
          onLoad={() => setIsLoading(false)}
          className="w-full h-full border-0 block"
          allowFullScreen
          allow="autoplay; fullscreen; gamepad; microphone; camera"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-pointer-lock allow-modals"
        />
      </div>

      {/* Game Information & Controls Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Controls & Instructions */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-4 h-4 text-orange-400" />
              <h3 className="text-sm font-bold text-slate-100">Controls & How to Play</h3>
            </div>
            {game.keys && game.keys.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {game.keys.map((k, idx) => (
                  <kbd
                    key={idx}
                    className="px-2 py-0.5 text-[11px] font-mono font-bold bg-slate-800 border border-slate-700 text-orange-300 rounded shadow-sm"
                  >
                    {k}
                  </kbd>
                ))}
              </div>
            )}
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-medium">
            {game.controls}
          </p>

          <div className="pt-3 border-t border-slate-800 flex items-start gap-2 text-xs text-slate-400">
            <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p>
              {game.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {game.tags && game.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-400 border border-slate-700/60"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Stored Iframe JSON Details */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between gap-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  JSON Iframe Record
                </h4>
              </div>
              <button
                id="copy-iframe-code-btn"
                onClick={copyIframeString}
                className="flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300 font-semibold"
              >
                {copiedIframe ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Iframe</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-2">
              This game is stored directly inside <code className="text-orange-300">games.json</code> as an HTML iframe:
            </p>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300 break-all select-all">
              {game.iframe}
            </div>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800/80 pt-2">
            <span>Game ID: <span className="text-slate-300 font-mono">{game.id}</span></span>
            <span className="text-emerald-400 font-medium">Unblocked • 0 AI</span>
          </div>
        </div>
      </div>

      {/* Related Games Strip */}
      {relatedGames && relatedGames.length > 0 && (
        <div className="mt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            More {game.category} Games You Might Like
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {relatedGames.slice(0, 6).map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectGame(rel)}
                className="bg-slate-900 border border-slate-800 hover:border-orange-500/50 rounded-lg p-2.5 cursor-pointer group transition-all"
              >
                <div className="text-center font-bold text-xs text-slate-200 group-hover:text-orange-400 truncate mb-1">
                  {rel.title}
                </div>
                <div className="text-[10px] text-slate-400 text-center">
                  {rel.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
