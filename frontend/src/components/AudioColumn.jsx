import React from 'react';
import { Headphones, Download, Music } from 'lucide-react';
import { triggerAdsterraAd } from '../config/ads';

export default function AudioColumn({ qualities, onDownload }) {
  if (!qualities || qualities.length === 0) return null;

  const handleDownloadClick = (item) => {
    triggerAdsterraAd('download');
    onDownload('audio', {
      format_type: item.format_type,
      bitrate: item.bitrate,
      ext: item.ext,
      label: item.label
    });
  };

  return (
    <div className="glass-panel-light rounded-2xl p-5 sm:p-6 border border-emerald-200/80 shadow-md flex flex-col h-full bg-white">
      {/* Column Header */}
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-md shadow-emerald-600/20 shrink-0">
          <Headphones className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            Cột 1: Tải Âm Thanh
            <span className="px-2 py-0.5 rounded-md bg-emerald-100 border border-emerald-200 text-emerald-700 text-[10px] font-mono font-bold">
              AUDIO MP3/WAV
            </span>
          </h3>
          <p className="text-xs text-slate-500">
            Tách âm thanh MP3 & định dạng gốc
          </p>
        </div>
      </div>

      {/* Options List */}
      <div className="space-y-3 flex-1">
        {qualities.map((item) => (
          <div
            key={item.id}
            className="group relative p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/40 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <Music className="w-4 h-4 text-emerald-600 shrink-0" />
                {/* Prominent format title & badge */}
                <span className="font-extrabold text-base text-slate-900 bg-emerald-100/70 border border-emerald-200/80 px-2.5 py-0.5 rounded-md tracking-tight">
                  {item.label}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-200/80 text-slate-700 text-[11px] font-semibold">
                  {item.badge}
                </span>
              </div>
              <p className="text-xs text-slate-500 pl-6">
                {item.desc}
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleDownloadClick(item)}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 font-bold text-xs text-white shadow-xs flex items-center justify-center gap-1.5 shrink-0 transition active:scale-95 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải Âm Thanh</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
