import React, { useState } from 'react';
import { Link2, Clipboard, Search, Loader2, X, Sparkles } from 'lucide-react';
import { triggerAdsterraAd } from '../config/ads';

export default function UrlInputBar({ onFetch, loading, error }) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!url.trim()) return;
    triggerAdsterraAd('search');
    onFetch(url.trim());
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && text.includes('youtu')) {
        setUrl(text.trim());
        triggerAdsterraAd('search');
        onFetch(text.trim());
      } else if (text) {
        setUrl(text.trim());
      }
    } catch (err) {
      console.error("Paste failed:", err);
    }
  };

  const handleClear = () => {
    setUrl('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 px-4">
      <form onSubmit={handleSubmit} className="relative group">
        {/* Soft shadow glow effect */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-green-500 opacity-20 group-hover:opacity-40 blur-lg transition duration-500"></div>

        <div className="relative flex flex-col sm:flex-row items-center gap-2 p-2 bg-white border border-slate-200 rounded-2xl shadow-lg">
          <div className="flex items-center gap-3 px-4 py-2 w-full">
            <Link2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Dán đường dẫn YouTube tại đây (ví dụ: https://www.youtube.com/watch?v=...)"
              className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-sm sm:text-base focus:outline-none"
              disabled={loading}
            />

            {url && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition"
                title="Xóa đường dẫn"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={handlePaste}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 font-semibold transition border border-slate-200 shrink-0 cursor-pointer"
              title="Dán từ Clipboard"
            >
              <Clipboard className="w-3.5 h-3.5 text-emerald-600" />
              <span>Dán</span>
            </button>
          </div>

          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 disabled:opacity-50 font-bold text-sm text-white shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2 shrink-0 transition-all duration-200 active:scale-95 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Đang tìm...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Tìm kiếm</span>
              </>
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm text-center flex items-center justify-center gap-2 animate-fadeIn">
          <span>⚠️ {error}</span>
        </div>
      )}

      {/* Quick notice */}
      <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-500">
        <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
        <span>Tự động phân tích Video, Shorts, Music & Playlists</span>
      </div>
    </div>
  );
}
