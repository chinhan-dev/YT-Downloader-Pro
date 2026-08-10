import React from 'react';
import { Download, ShieldCheck } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full pt-8 pb-4 px-4 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200/80">
      <div className="flex items-center gap-3.5">
        {/* App Avatar Logo Icon */}
        <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/30 shrink-0">
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-slate-900 text-emerald-400 flex items-center justify-center ring-2 ring-white">
            <Download className="w-3 h-3" />
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
            YT Downloader <span className="text-emerald-600">Pro</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Tải Video & Âm thanh YouTube nhanh chóng, miễn phí
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs text-slate-600 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Miễn phí 100%</span>
        </div>
      </div>
    </header>
  );
}
