const API_BASE = import.meta.env.VITE_API_BASE || (
  typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? '/api'
    : 'https://yt-downloader-pro-d13b.onrender.com/api'
);

export async function fetchVideoInfo(url) {
  const res = await fetch(`${API_BASE}/yt/info`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  });
  
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail || 'Không thể lấy thông tin video YouTube.');
  }
  return data.data;
}

export async function startDownload(url, downloadType, options) {
  const res = await fetch(`${API_BASE}/yt/download`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url,
      download_type: downloadType,
      options
    })
  });
  
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail || 'Không thể khởi tạo tiến trình tải.');
  }
  return data.job_id;
}

export async function getJobStatus(jobId) {
  const res = await fetch(`${API_BASE}/yt/status/${jobId}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail || 'Lỗi khi tra cứu trạng thái.');
  }
  return data.job;
}

export function getFileDownloadUrl(jobId) {
  return `${API_BASE}/yt/file/${jobId}`;
}
