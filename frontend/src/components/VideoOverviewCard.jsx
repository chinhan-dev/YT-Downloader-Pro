import React from 'react';
import { Play, Clock, Eye, User, CheckCircle2 } from 'lucide-react';

export default function VideoOverviewCard({ info }) {
  if (!info) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 px-4 animate-fadeIn">
      <div className="glass-panel-light rounded-2xl p-4 sm:p-5 border border-emerald-200/80 shadow-md flex flex-col md:flex-row items-center gap-6">
        {/* Thumbnail preview */}
        <div className="relative group rounded-xl overflow-hidden shadow-md w-full md:w-64 shrink-0 bg-slate-900 aspect-video">
          <img
            src={info.thumbnail}
            alt="YouTube Thumbnail"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
          
          <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-slate-900/80 backdrop-blur-md text-[11px] font-mono font-bold text-white flex items-center gap-1">
            <Clock className="w-3 h-3 text-emerald-400" />
            <span>{info.duration}</span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-slate-900/30 backdrop-blur-xs">
            <div className="w-11 h-11 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-lg">
              <Play className="w-5 h-5 ml-0.5 fill-current" />
            </div>
          </div>
        </div>

        {/* Info metadata (without title as requested) */}
        <div className="flex-1 text-center md:text-left space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Đã tìm thấy thông tin - Chọn định dạng tải bên dưới</span>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-slate-600 pt-1">
            <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              <User className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-semibold text-slate-800">{info.uploader}</span>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              <Eye className="w-3.5 h-3.5 text-teal-600" />
              <span className="font-medium text-slate-700">{info.view_count} lượt xem</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
