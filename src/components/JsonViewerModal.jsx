import React, { useState } from 'react';
import { X, Copy, Check, Download, ExternalLink, FileCode2 } from 'lucide-react';

export const JsonViewerModal = ({
  isOpen,
  onClose,
  games
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const jsonString = JSON.stringify(games, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'games.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        id="json-viewer-modal"
        className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <FileCode2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-100 text-sm">games.json</h3>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-orange-500/20 text-orange-300 border border-orange-500/30">
                  {games.length} Games
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Each game entry is stored with its complete HTML iframe
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy JSON'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Unpkg Notice Banner */}
        <div className="bg-orange-950/40 border-b border-orange-900/40 px-5 py-2.5 flex items-center justify-between text-xs text-orange-200/90">
          <div className="flex items-center gap-2">
            <span className="font-bold text-orange-400">unpkg.com/ignite-main:</span>
            <span>Package entry configured in package.json to view files & index</span>
          </div>
          <a
            href="https://unpkg.com/browse/react@19.0.0/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-[11px] text-orange-400 hover:underline font-semibold"
          >
            <span>unpkg CDN Guide</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* JSON Code Viewer */}
        <div className="p-4 flex-1 overflow-auto bg-slate-950">
          <pre className="font-mono text-xs text-slate-300 leading-relaxed select-all">
            {jsonString}
          </pre>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-[11px] text-slate-400">
          <span>Format: <code className="text-orange-400 font-mono">[{`{"id": "...", "iframe": "<iframe ... />"}`}]</code></span>
          <span>Zero AI Features • 100% Client-Side Games Engine</span>
        </div>
      </div>
    </div>
  );
};
