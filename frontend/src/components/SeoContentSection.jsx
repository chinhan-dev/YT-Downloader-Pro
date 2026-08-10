import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Zap, ShieldCheck, Smartphone, Music, Video, CheckCircle2 } from 'lucide-react';

export default function SeoContentSection() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "Trang web YT Downloader Pro có hoàn toàn miễn phí không?",
      a: "Có! YT Downloader Pro là dịch vụ trực tuyến hoàn toàn miễn phí 100%. Bạn có thể tải không giới hạn số lượng video YouTube và tập tin âm thanh MP3 mà không phải trả bất kỳ chi phí nào."
    },
    {
      q: "Làm thế nào để chuyển đổi nhạc YouTube sang MP3 chất lượng cao 320kbps?",
      a: "Bạn chỉ cần sao chép đường dẫn (URL) video nhạc YouTube, dán vào ô tìm kiếm trên YT Downloader Pro rồi nhấn 'Tìm kiếm'. Ở Cột 1 (Tải Âm Thanh), chọn mức chất lượng 'MP3 320 KB/s' và nhấn nút 'Tải Âm Thanh'."
    },
    {
      q: "YT Downloader Pro có hỗ trợ tải video YouTube 1080p, 2K và 4K không?",
      a: "Có. Hệ thống tự động phân tích tất cả độ phân giải khả dụng của video YouTube ban đầu (từ 360p, 480p, 720p HD, 1080p Full HD đến 1440p 2K và 2160p 4K Ultra HD) với âm thanh đầy đủ."
    },
    {
      q: "Tôi có thể tải video YouTube trên iPhone / iPad (iOS) hoặc Android không?",
      a: "Có! YT Downloader Pro hoạt động hoàn hảo trên tất cả các trình duyệt di động như Safari (iOS/iPhone/iPad), Chrome (Android), Firefox, Edge, Opera mà không cần cài thêm bất kỳ ứng dụng nào."
    },
    {
      q: "Tệp MP3 hoặc MP4 sau khi tải về sẽ được lưu ở đâu?",
      a: "Tệp sẽ được lưu tự động vào thư mục 'Downloads' (Tải về) mặc định trên máy tính hoặc ứng dụng 'Files' (Tệp) / thư viện phương tiện trên điện thoại của bạn."
    }
  ];

  return (
    <div className="mt-16 border-t border-slate-200/80 pt-12 space-y-16 max-w-5xl mx-auto text-slate-700">
      
      {/* SECTION 1: Step-by-step How to Download */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <span className="px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold uppercase tracking-wider">
            Hướng Dẫn Nhanh 2026
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Cách Tải Video & Nhạc MP3 Từ YouTube Về Máy Nhanh Nhất
          </h2>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto">
            Chỉ với 3 bước đơn giản, bạn có thể lưu bất kỳ video hoặc bài hát YouTube yêu thích nào về thiết bị cá nhân trong vài giây.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="glass-panel-light p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3 relative overflow-hidden bg-white">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-extrabold text-lg flex items-center justify-center border border-emerald-200">
              1
            </div>
            <h3 className="font-bold text-base text-slate-900">Sao Chép Link YouTube</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Mở ứng dụng hoặc trang web YouTube, tìm video hoặc bài hát bạn muốn tải và sao chép đường dẫn (URL).
            </p>
          </div>

          <div className="glass-panel-light p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3 relative overflow-hidden bg-white">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-extrabold text-lg flex items-center justify-center border border-emerald-200">
              2
            </div>
            <h3 className="font-bold text-base text-slate-900">Dán Vào YT Downloader Pro</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Dán đường dẫn vừa sao chép vào ô tìm kiếm ở trên và nhấn nút <span className="font-bold text-emerald-700">"Tìm kiếm"</span> để phân tích.
            </p>
          </div>

          <div className="glass-panel-light p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3 relative overflow-hidden bg-white">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-extrabold text-lg flex items-center justify-center border border-emerald-200">
              3
            </div>
            <h3 className="font-bold text-base text-slate-900">Chọn Định Dạng & Tải Về</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Lựa chọn chất lượng nhạc MP3 (128k - 320k) hoặc độ phân giải Video MP4 (720p - 4K) rồi bấm <span className="font-bold text-emerald-700">"Tải Về"</span>.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: Outstanding Features Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Ưu Điểm Vượt Trội Của YT Downloader Pro
          </h2>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto">
            Trải nghiệm dịch vụ tải video và nhạc YouTube hiện đại, an toàn và tối ưu hàng đầu hiện nay.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">Tốc Độ Siêu Nhanh</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Máy chủ đám mây băng thông cao giúp xử lý và tải xuống tệp phương tiện chỉ trong vài giây.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Music className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">Nhạc MP3 320kbps</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Chuyển đổi âm thanh YouTube nguyên bản với chất lượng cao nhất cho tai nghe & loa cao cấp.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Video className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">Hỗ Trợ Video 4K HD</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Hỗ trợ tải video MP4 đầy đủ các định dạng độ phân giải từ SD, HD 720p, Full HD 1080p đến 4K.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">Mọi Thiết Bị & HĐH</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Hoạt động mượt mà trên iPhone, iPad, Android, Windows, macOS, Linux mà không cần cài phần mềm.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: FAQ Accordion */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-2">
            <HelpCircle className="w-6 h-6 text-emerald-600" />
            <span>Câu Hỏi Thường Gặp (FAQ)</span>
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            Giải đáp mọi thắc mắc phổ biến của người dùng về dịch vụ tải nhạc & video YouTube.
          </p>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full p-4 sm:p-5 text-left font-bold text-sm text-slate-800 flex items-center justify-between gap-4 hover:bg-slate-50 cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-emerald-600 shrink-0 transition-transform duration-200 ${
                    openFaqIndex === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaqIndex === idx && (
                <div className="px-4 sm:px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: Keyword Cloud for SEO Ranking */}
      <section className="bg-slate-100/70 rounded-2xl p-6 border border-slate-200/80 space-y-3 text-center">
        <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
          Từ Khóa Tìm Kiếm Phổ Biến
        </h3>
        <div className="flex flex-wrap justify-center gap-2 text-[11px] font-medium text-slate-600">
          <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">tải video youtube</span>
          <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">tải nhạc mp3 youtube</span>
          <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">chuyển youtube sang mp3</span>
          <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">tải video youtube 4k</span>
          <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">tải nhạc youtube về iphone</span>
          <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">youtube to mp3 320kbps</span>
          <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">tai nhac mp3 youtube mien phi</span>
          <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">y2mate alternative</span>
          <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">ytsave alternative</span>
        </div>
      </section>

    </div>
  );
}
