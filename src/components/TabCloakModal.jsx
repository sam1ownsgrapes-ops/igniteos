import React from 'react';
import { X, Shield, Check } from 'lucide-react';

export const CLOAK_PRESETS = [
  {
    name: 'Default',
    title: 'Ignite Unblocked Games',
    favicon: '/vite.svg'
  },
  {
    name: 'Google Classroom',
    title: 'Classes - Google Classroom',
    favicon: 'https://ssl.gstatic.com/classroom/favicon.png'
  },
  {
    name: 'Google Docs',
    title: 'Untitled document - Google Docs',
    favicon: 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico'
  },
  {
    name: 'Google Drive',
    title: 'My Drive - Google Drive',
    favicon: 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png'
  },
  {
    name: 'Canvas LMS',
    title: 'Dashboard',
    favicon: 'https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e10d657a73.ico'
  },
  {
    name: 'Wikipedia',
    title: 'Wikipedia, the free encyclopedia',
    favicon: 'https://en.wikipedia.org/static/favicon/wikipedia.ico'
  }
];

export const TabCloakModal = ({
  isOpen,
  onClose,
  activeCloak,
  onSelectCloak
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        id="tab-cloak-modal"
        className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm">Tab Cloaker</h3>
              <p className="text-[11px] text-slate-400">Disguise browser tab title & favicon</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 flex flex-col gap-2">
          {CLOAK_PRESETS.map((preset) => {
            const isSelected = activeCloak === preset.name;
            return (
              <button
                key={preset.name}
                id={`cloak-opt-${preset.name.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => {
                  onSelectCloak(preset);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-sky-500/15 border-sky-500/50 text-white'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={preset.favicon}
                    alt={preset.name}
                    className="w-5 h-5 object-contain"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div>
                    <div className="font-semibold text-xs text-slate-200">{preset.name}</div>
                    <div className="text-[10px] text-slate-400 truncate max-w-[240px]">
                      {preset.title}
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        <div className="px-5 py-3 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400">
          Tab cloaking changes your tab's title and icon so it looks like schoolwork.
        </div>
      </div>
    </div>
  );
};
