import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import UrlInputBar from './components/UrlInputBar';
import VideoOverviewCard from './components/VideoOverviewCard';
import AudioColumn from './components/AudioColumn';
import VideoColumn from './components/VideoColumn';
import DownloadModal from './components/DownloadModal';
import AdsterraNativeBanner from './components/AdsterraNativeBanner';
import AdsterraSidebarBanner from './components/AdsterraSidebarBanner';
import { fetchVideoInfo, startDownload } from './api/client';
import { injectAdsterraScripts } from './config/ads';
import { Download } from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const [currentUrl, setCurrentUrl] = useState('');

  const [activeJobId, setActiveJobId] = useState(null);
  const [activeTargetLabel, setActiveTargetLabel] = useState('');

  // Inject Popunder Adsterra Scripts on initial page load
  useEffect(() => {
    injectAdsterraScripts();
  }, []);

  // Fetch YouTube Info
  const handleFetchInfo = async (url) => {
    setLoading(true);
    setError(null);
    setInfo(null);
    setCurrentUrl(url);

    try {
      const data = await fetchVideoInfo(url);
      setInfo(data);
      injectAdsterraScripts();
    } catch (err) {
      setError(err.message || 'Không thể tìm thấy video. Vui lòng kiểm tra lại đường dẫn URL.');
    } finally {
      setLoading(false);
    }
  };

  // Trigger Download
  const handleDownload = async (downloadType, options) => {
    if (!currentUrl) return;
    setActiveTargetLabel(options.label || downloadType);

    try {
      const jobId = await startDownload(currentUrl, downloadType, options);
      setActiveJobId(jobId);
    } catch (err) {
      alert(`Lỗi: ${err.message}`);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-50 text-slate-900 overflow-x-hidden selection:bg-emerald-500 selection:text-white">
      {/* Background ambient lighting */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-glow-green pointer-events-none"></div>
      <div className="fixed top-1/4 right-0 w-96 h-96 bg-glow-teal pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-glow-lime pointer-events-none"></div>

      {/* Main Content Container */}
      <div className="relative z-10 flex-1 flex flex-col">
        <Header />

        <main className="flex-1 w-full max-w-6xl mx-auto px-4 pb-12">
          <UrlInputBar
            onFetch={handleFetchInfo}
            loading={loading}
            error={error}
          />

          {/* Ad Code 3: Native Banner Container (ALWAYS VISIBLE ON PAGE) */}
          <AdsterraNativeBanner />

          {info && <VideoOverviewCard info={info} />}

          {/* 2 COLUMNS LAYOUT + SIDEBAR AD CODE 4 */}
          {info ? (
            <div className="mt-8 flex flex-col xl:flex-row gap-6 items-start justify-center animate-fadeIn">
              {/* 2 Main Download Columns */}
              <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                <AudioColumn
                  qualities={info.audio_qualities}
                  onDownload={handleDownload}
                />
                <VideoColumn
                  qualities={info.video_qualities}
                  onDownload={handleDownload}
                />
              </div>

              {/* Ad Code 4: 160x300 Iframe Banner (Sticky Sidebar on Desktop) */}
              <div className="w-full xl:w-auto shrink-0 flex flex-col items-center justify-start xl:sticky xl:top-6">
                <AdsterraSidebarBanner />
              </div>
            </div>
          ) : (
            /* INITIAL PAGE LOAD (BEFORE USER SEARCHES) */
            <div className="mt-6 flex flex-col items-center justify-center gap-6">
              {!loading && (
                <div className="w-full text-center text-slate-500 py-10 px-4 glass-panel-light rounded-3xl border border-slate-200 max-w-3xl mx-auto">
                  <div className="relative w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center shadow-xs">
                    <svg className="w-8 h-8 text-emerald-600 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs ring-2 ring-white">
                      <Download className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-slate-800">
                    Dán đường dẫn YouTube phía trên và nhấn "Tìm kiếm"
                  </h3>
                </div>
              )}

              {/* Ad Code 4: 160x300 Banner ON HOMEPAGE */}
              <AdsterraSidebarBanner />
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="w-full py-6 border-t border-slate-200 text-center text-xs text-slate-500">
          <p>© 2026 YT Downloader Pro</p>
        </footer>
      </div>

      {/* Download Progress Modal */}
      {activeJobId && (
        <DownloadModal
          jobId={activeJobId}
          targetLabel={activeTargetLabel}
          onClose={() => setActiveJobId(null)}
        />
      )}
    </div>
  );
}
