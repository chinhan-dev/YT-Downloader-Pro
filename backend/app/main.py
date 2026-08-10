import os
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel
from typing import Optional, Dict, Any

from app.services.youtube_service import get_youtube_info
from app.services.downloader_service import start_download_job, get_job

app = FastAPI(
    title="YouTube Video & Audio Downloader API",
    version="1.0.0"
)

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class InfoRequest(BaseModel):
    url: str

class DownloadRequest(BaseModel):
    url: str
    download_type: str  # 'audio' or 'video'
    options: Dict[str, Any]

@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "YouTube Downloader API"}

@app.post("/api/yt/info")
def fetch_info(req: InfoRequest):
    if not req.url or not req.url.strip():
        raise HTTPException(status_code=400, detail="Vui lòng nhập đường dẫn YouTube hợp lệ.")
    
    url = req.url.strip()
    try:
        data = get_youtube_info(url)
        return {"success": True, "data": data}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/yt/download")
def create_download(req: DownloadRequest):
    if not req.url or not req.url.strip():
        raise HTTPException(status_code=400, detail="Vui lòng nhập đường dẫn URL.")
    if req.download_type not in ['audio', 'video']:
        raise HTTPException(status_code=400, detail="Loại tải về phải là 'audio' hoặc 'video'.")
        
    try:
        job_id = start_download_job(req.url.strip(), req.download_type, req.options)
        return {"success": True, "job_id": job_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/yt/status/{job_id}")
def check_status(job_id: str):
    job = get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Không tìm thấy thông tin công việc.")
    return {"success": True, "job": job}

@app.get("/api/yt/file/{job_id}")
def download_file(job_id: str):
    job = get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Không tìm thấy tệp.")
    if job.get('status') != 'completed' or not job.get('file_path'):
        raise HTTPException(status_code=400, detail="Tệp chưa hoàn thành quá trình xử lý.")
        
    file_path = job['file_path']
    filename = job.get('filename') or os.path.basename(file_path)
    
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Tệp không tồn tại trên máy chủ.")
        
    return FileResponse(
        path=file_path,
        filename=filename,
        media_type="application/octet-stream"
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
