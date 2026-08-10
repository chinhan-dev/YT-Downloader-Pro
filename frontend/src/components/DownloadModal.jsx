import React, { useEffect, useState } from 'react';
import { getJobStatus, getFileDownloadUrl } from '../api/client';
import { Loader2, Download, CheckCircle2, AlertCircle, X, Sparkles, Zap, HardDrive } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DownloadModal({ jobId, targetLabel, onClose }) {
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!jobId) return;

    let interval = null;
    let hasTriggeredConfetti = false;

    const poll = async () => {
      try {
        const data = await getJobStatus(jobId);
        setJob(data);

        if (data.status === 'completed') {
          clearInterval(interval);
          if (!hasTriggeredConfetti) {
            hasTriggeredConfetti = true;
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 }
            });
            // Auto trigger download
            const link = document.createElement('a');
            link.href = getFileDownloadUrl(jobId);
            link.setAttribute('download', data.filename || 'download');
            document.body.appendChild(link);
            link.click();
            link.remove();
          }
        } else if (data.status === 'failed') {
          clearInterval(interval);
          setError(data.error || 'Lỗi không xác định khi tải xuống.');
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    };

    poll();
    interval = setInterval(poll, 1200);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [jobId]);

  if (!jobId) return null;

  const isCompleted = job?.status === 'completed';
  const isFailed = job?.status === 'failed' || error;
  const percent = job?.percent || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md p-6 bg-white border border-slate-200 rounded-2xl shadow-2xl space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600">
            {isCompleted ? (
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            ) : isFailed ? (
              <AlertCircle className="w-8 h-8 text-red-500" />
            ) : (
              <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            )}
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            {isCompleted
              ? 'Tải Xuống Thành Công!'
              : isFailed
              ? 'Xảy Ra Lỗi!'
              : 'Đang Tải Xuống & Xử Lý...'}
          </h3>
          <p className="text-xs text-slate-500">
            {targetLabel ? `Đang xử lý: ${targetLabel}` : 'Đang xử lý tệp của bạn'}
          </p>
        </div>

        {/* Progress Bar */}
        {!isFailed && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-slate-600 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>{job?.phase || 'Khởi tạo...'}</span>
              </span>
              <span className="font-mono text-emerald-600 font-bold">{percent}%</span>
            </div>

            <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden p-0.5 border border-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 shadow-sm"
                style={{ width: `${Math.min(100, Math.max(5, percent))}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 font-mono">
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-emerald-600" />
                <span>Tốc độ: {job?.speed || 'N/A'}</span>
              </span>
              <span className="flex items-center gap-1">
                <HardDrive className="w-3 h-3 text-teal-600" />
                <span>Còn lại: {job?.eta || 'N/A'}</span>
              </span>
            </div>
          </div>
        )}

        {/* Error */}
        {isFailed && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs leading-relaxed">
            {error || job?.error || 'Đã xảy ra lỗi khi lấy dữ liệu từ YouTube.'}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-center gap-3 pt-2">
          {isCompleted ? (
            <a
              href={getFileDownloadUrl(jobId)}
              download
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-sm text-white shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer transition"
            >
              <Download className="w-4 h-4" />
              <span>Tải Lại Tệp Về Máy</span>
            </a>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-semibold text-xs text-slate-700 transition cursor-pointer"
            >
              {isFailed ? 'Đóng & Thử Lại' : 'Ẩn Cửa Sổ Hàng Chờ'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
