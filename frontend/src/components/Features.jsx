import React from 'react';
import { Zap, Music, Video, ShieldCheck } from 'lucide-react';

export default function Features() {
  const items = [
    {
      icon: Zap,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      borderColor: 'border-emerald-200',
      title: 'Tốc Độ Cực Nhanh',
      desc: 'Tải trực tiếp bằng engine yt-dlp tối ưu hóa không qua trung gian.'
    },
    {
      icon: Music,
      color: 'text-teal-600',
      bgColor: 'bg-teal-100',
      borderColor: 'border-teal-200',
      title: 'Âm Thanh MP3 320kbps',
      desc: 'Tách nhạc chuẩn chất lượng cao âm thanh sống động.'
    },
    {
      icon: Video,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      borderColor: 'border-emerald-200',
      title: 'Video 4K / Full HD',
      desc: 'Xuất file MP4 chất lượng cao đầy đủ âm thanh và hình ảnh.'
    },
    {
      icon: ShieldCheck,
      color: 'text-teal-600',
      bgColor: 'bg-teal-100',
      borderColor: 'border-teal-200',
      title: 'Bảo Mật & Miễn Phí',
      desc: 'Giao diện thân thiện, sạch sẽ, không chứa quảng cáo.'
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto mt-14 px-4 pb-16">
      <div className="text-center mb-8 space-y-1">
        <h3 className="text-lg font-bold text-slate-800">
          Tính Nổi Bật Của YT Downloader Pro
        </h3>
        <p className="text-xs text-slate-500">
          Giao diện thân thiện, đơn giản và dễ sử dụng nhất
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item, i) => (
          <div
            key={i}
            className={`p-4 rounded-2xl bg-white border ${item.borderColor} shadow-xs space-y-2.5 transition hover:shadow-md hover:translate-y-[-2px]`}
          >
            <div className={`w-9 h-9 rounded-xl ${item.bgColor} flex items-center justify-center`}>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <h4 className="font-bold text-sm text-slate-800">{item.title}</h4>
            <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
