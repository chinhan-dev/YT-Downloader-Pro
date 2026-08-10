import React from 'react';
import { Film, Download, Video } from 'lucide-react';

export default function VideoColumn({ qualities, onDownload }) {
  if (!qualities || qualities.length === 0) return null;

  return (
    <div className="glass-panel-light rounded-2xl p-5 sm:p-6 border border-emerald-200/80 shadow-md flex flex-col h-full bg-white">
      {/* Column Header */}
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center shadow-md shadow-teal-600/20 shrink-0">
          <Film className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            Cột 2: Tải Video
            <span className="px-2 py-0.5 rounded-md bg-teal-100 border border-teal-200 text-teal-700 text-[10px] font-mono font-bold">
              VIDEO MP4
            </span>
          </h3>
          <p className="text-xs text-slate-500">
            Tải video có sẵn tiếng (Trộn Audio + Video MP4 tự động)
          </p>
        </div>
      </div>

      {/* Options List */}
      <div className="space-y-3 flex-1">
        {qualities.map((item) => (
          <div
            key={item.id}
            className="group relative p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-teal-400 hover:bg-teal-50/40 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <Video className="w-4 h-4 text-teal-600 shrink-0" />
                {/* Prominent resolution & badge */}
                <span className="font-extrabold text-base text-slate-900 bg-teal-100/70 border border-teal-200/80 px-2.5 py-0.5 rounded-md tracking-tight">
                  {item.label}
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-extrabold uppercase">
                  {item.badge}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500 pl-6">
                <span>Định dạng: <strong className="text-slate-800 font-bold uppercase">{item.ext}</strong></span>
                <span>•</span>
                <span>Dung lượng: <strong className="text-slate-800 font-bold">{item.size_str}</strong></span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onDownload('video', {
                format_selector: item.format_selector,
                ext: item.ext,
                label: item.label
              })}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 active:bg-teal-700 font-bold text-xs text-white shadow-xs flex items-center justify-center gap-1.5 shrink-0 transition active:scale-95 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải Video</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
