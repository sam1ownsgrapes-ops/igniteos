import React, { useState } from 'react';
import { X, Plus, AlertCircle } from 'lucide-react';

export const AddGameModal = ({
  isOpen,
  onClose,
  onAddGame
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Arcade');
  const [iframeInput, setIframeInput] = useState('');
  const [description, setDescription] = useState('');
  const [controls, setControls] = useState('Keyboard and Mouse');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Please enter a game title');
      return;
    }

    if (!iframeInput.trim()) {
      setError('Please provide an iframe code or URL');
      return;
    }

    let rawIframe = iframeInput.trim();
    let extractedUrl = '';

    // Check if user pasted an <iframe> tag or just a URL
    if (rawIframe.startsWith('<iframe') || rawIframe.includes('<iframe')) {
      const srcMatch = rawIframe.match(/src=["']([^"']+)["']/);
      if (srcMatch && srcMatch[1]) {
        extractedUrl = srcMatch[1];
      } else {
        setError('Invalid iframe tag: missing src attribute');
        return;
      }
    } else if (rawIframe.startsWith('http://') || rawIframe.startsWith('https://') || rawIframe.startsWith('/')) {
      extractedUrl = rawIframe;
      rawIframe = `<iframe src="${extractedUrl}" width="100%" height="100%" frameborder="0" allowfullscreen="true" allow="autoplay; fullscreen; gamepad"></iframe>`;
    } else {
      setError('Please enter a valid URL (starting with https://) or an <iframe> tag');
      return;
    }

    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `custom-${Date.now()}`;

    const newGame = {
      id: `${id}-${Date.now().toString().slice(-4)}`,
      title: title.trim(),
      category,
      description: description.trim() || 'Custom user-added unblocked game.',
      iframe: rawIframe,
      iframeUrl: extractedUrl,
      thumbnail: 'slope',
      controls: controls.trim() || 'Keyboard and Mouse',
      keys: ['Mouse', 'WASD'],
      badge: 'Custom',
      author: 'User Created',
      tags: ['custom', category.toLowerCase()],
      isCustom: true
    };

    onAddGame(newGame);
    onClose();
    setTitle('');
    setIframeInput('');
    setDescription('');
    setControls('Keyboard and Mouse');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        id="add-game-modal"
        className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm">Add Custom Game</h3>
              <p className="text-[11px] text-slate-400">Store a new game as an iframe in JSON</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-3.5 text-xs text-slate-300">
          {error && (
            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-3 rounded-xl flex items-center gap-2 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block font-semibold text-slate-200 mb-1">Game Title *</label>
            <input
              id="custom-game-title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Awesome Moto Racer"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-200 mb-1">Category</label>
              <select
                id="custom-game-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-orange-500"
              >
                <option value="Action">Action</option>
                <option value="Arcade">Arcade</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Sports">Sports</option>
                <option value="Retro">Retro</option>
                <option value="Racing">Racing</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-200 mb-1">Controls Guide</label>
              <input
                id="custom-game-controls"
                type="text"
                value={controls}
                onChange={(e) => setControls(e.target.value)}
                placeholder="e.g. WASD to move, Space to shoot"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-200 mb-1">
              Game Iframe Code or URL *
            </label>
            <textarea
              id="custom-game-iframe"
              required
              rows={3}
              value={iframeInput}
              onChange={(e) => setIframeInput(e.target.value)}
              placeholder='<iframe src="https://..." width="100%" height="100%"></iframe> or https://...'
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 font-mono text-[11px] focus:outline-none focus:border-orange-500 resize-none"
            />
            <p className="text-[10px] text-slate-500 mt-1">
              Paste an HTML iframe tag or a direct game link. It will be stored in JSON.
            </p>
          </div>

          <div>
            <label className="block font-semibold text-slate-200 mb-1">Description</label>
            <input
              id="custom-game-description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short summary of the game"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="custom-game-submit-btn"
              className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold transition-all shadow-md shadow-orange-600/30"
            >
              Add to Games List
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
