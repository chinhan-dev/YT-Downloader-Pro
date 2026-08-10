# 🎵 YT Downloader Pro (React + Python)

Dự án tách biệt hoàn toàn chuyên dùng để phân tích và tải xuống Video / Âm thanh từ YouTube với giao diện hiện đại 2 cột.

## 🚀 Tính năng nổi bật
- **Giao diện 1 thanh dán link tiện lợi**: Hỗ trợ dán trực tiếp từ Clipboard, tự động nhận diện URL YouTube (Videos, Shorts, Music).
- **Phân tách 2 cột rõ ràng**:
  - **Cột 1 (Tải Âm Thanh)**: Các mức chất lượng MP3 (320kbps, 256kbps, 128kbps), M4A, Opus, WAV Lossless với nút tải riêng.
  - **Cột 2 (Tải Video)**: Đầy đủ độ phân giải từ 4K (2160p), 2K (1440p), 1080p60 Full HD, 720p HD, 480p đến 144p MP4 với nút tải riêng.
- **Tiến trình tải thời gian thực**: Hiển thị phần trăm %, tốc độ (MB/s), thời gian còn lại (ETA) và tự động bật popup lưu file về máy khi hoàn tất.
- **Thiết kế Ultra-Modern Dark Theme**: Sử dụng React + Vite + Tailwind CSS + Lucide Icons + Glassmorphism.
- **Backend Python FastAPI**: Tích hợp engine `yt-dlp` và `ffmpeg` tải mượt mà, xử lý đa luồng (Async threading).

---

## 🛠️ Hướng dẫn khởi động dự án

### Cách 1: Sử dụng script khởi động nhanh (Khuyên dùng)
Tại thư mục gốc dự án:
```bash
./start.sh
```
Script sẽ tự động bật đồng thời Backend (Port 8000) và Frontend (Port 5173).

---

### Cách 2: Khởi động thủ công từng phần

#### 1. Khởi động Python Backend:
```bash
cd backend
./venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
*API Backend sẽ chạy tại: `http://localhost:8000`*

#### 2. Khởi động React Frontend:
```bash
cd frontend
npm run dev
```
*Giao diện Web sẽ chạy tại: `http://localhost:5173`*

---

## 📂 Cấu trúc thư mục dự án

```
youtube-downloader-web/
├── backend/
│   ├── app/
│   │   ├── main.py                # FastAPI endpoints & CORS
│   │   ├── services/
│   │   │   ├── youtube_service.py # Lấy thông tin & chia danh sách 2 cột
│   │   │   └── downloader_service.py # Quản lý tiến trình tải bằng yt-dlp
│   ├── downloads/                 # Lưu trữ file tải xuống tạm thời
│   ├── requirements.txt           # Thư viện Python
│   └── venv/                      # Môi trường ảo Python
├── frontend/
│   ├── src/
│   │   ├── App.jsx                # Component chính
│   │   ├── components/
│   │   │   ├── Header.jsx         # Header & trạng thái kết nối
│   │   │   ├── UrlInputBar.jsx    # Thanh nhập link YT
│   │   │   ├── VideoOverviewCard.jsx # Xem trước thumbnail & thông tin
│   │   │   ├── AudioColumn.jsx    # Cột 1: Danh sách chất lượng âm thanh
│   │   │   ├── VideoColumn.jsx    # Cột 2: Danh sách chất lượng video
│   │   │   ├── DownloadModal.jsx  # Modal tiến trình tải thời gian thực
│   │   │   └── Features.jsx       # Giới thiệu tính năng
│   │   ├── api/
│   │   │   └── client.js          # Kết nối API Backend
│   │   └── index.css              # CSS & Tailwind styling
│   └── vite.config.js             # Cấu hình Vite & API Proxy
└── start.sh                       # Script chạy nhanh
```
