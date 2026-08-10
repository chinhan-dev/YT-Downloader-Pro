import os
import re
import uuid
import threading
import sys
import yt_dlp
from typing import Dict, Any, Optional

DOWNLOADS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../downloads'))
os.makedirs(DOWNLOADS_DIR, exist_ok=True)

JOBS: Dict[str, Dict[str, Any]] = {}

def get_job(job_id: str) -> Optional[Dict[str, Any]]:
    return JOBS.get(job_id)

def download_progress_hook(d: Dict[str, Any], job_id: str):
    if job_id not in JOBS:
        return
        
    status = d.get('status')
    if status == 'downloading':
        downloaded = d.get('downloaded_bytes', 0)
        total = d.get('total_bytes') or d.get('total_bytes_estimate', 0)
        
        percent = 0.0
        if total > 0:
            percent = round((downloaded / total) * 100, 1)
        elif '_percent_str' in d:
            try:
                percent = float(re.sub(r'[^\d.]', '', d['_percent_str']))
            except Exception:
                percent = JOBS[job_id].get('percent', 0.0)
                
        speed = d.get('_speed_str', 'N/A')
        eta = d.get('_eta_str', 'N/A')
        
        JOBS[job_id].update({
            'status': 'downloading',
            'percent': percent,
            'speed': speed,
            'eta': eta,
            'phase': 'Đang tải xuống dữ liệu...'
        })
    elif status == 'finished':
        JOBS[job_id].update({
            'status': 'processing',
            'percent': 95.0,
            'phase': 'Đang hoàn thiện tập tin (trộn audio/video hoặc chuyển đổi định dạng)...'
        })

def run_audio_download(job_id: str, url: str, format_type: str, bitrate: str, ext: str):
    JOBS[job_id] = {
        'id': job_id,
        'type': 'audio',
        'status': 'starting',
        'percent': 0.0,
        'speed': '0 MB/s',
        'eta': '--',
        'phase': 'Khởi tạo tác vụ tải âm thanh...',
        'file_path': None,
        'filename': None,
        'error': None
    }
    
    try:
        out_template = os.path.join(DOWNLOADS_DIR, f"%(title)s_{job_id[:8]}.%(ext)s")
        
        ydl_opts = {
            'outtmpl': out_template,
            'quiet': True,
            'no_warnings': True,
            'nocheckcertificate': True,
            'extractor_args': {
                'youtube': {
                    'player_client': ['ios', 'android', 'mweb', 'web_creator', 'web'],
                }
            },
            'http_headers': {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
                'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7',
            },
            'progress_hooks': [lambda d: download_progress_hook(d, job_id)],
        }
        
        if format_type in ['mp3', 'wav']:
            ydl_opts.update({
                'format': 'bestaudio/best',
                'postprocessors': [{
                    'key': 'FFmpegExtractAudio',
                    'preferredcodec': format_type,
                    'preferredquality': '320' if bitrate == '320k' else ('256' if bitrate == '256k' else '128'),
                }],
            })
        elif format_type == 'm4a':
            ydl_opts.update({
                'format': 'bestaudio[ext=m4a]/bestaudio/best',
                'postprocessors': [{
                    'key': 'FFmpegExtractAudio',
                    'preferredcodec': 'm4a',
                }],
            })
        elif format_type == 'opus':
            ydl_opts.update({
                'format': 'bestaudio[ext=webm]/bestaudio/best',
            })
        else:
            ydl_opts.update({
                'format': 'bestaudio/best',
                'postprocessors': [{
                    'key': 'FFmpegExtractAudio',
                    'preferredcodec': 'mp3',
                    'preferredquality': '320',
                }],
            })
            
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            
        expected_ext = ext if ext else 'mp3'
        files = [f for f in os.listdir(DOWNLOADS_DIR) if job_id[:8] in f]
        
        if files:
            target_filename = files[0]
            target_path = os.path.join(DOWNLOADS_DIR, target_filename)
            JOBS[job_id].update({
                'status': 'completed',
                'percent': 100.0,
                'phase': 'Hoàn tất tải xuống!',
                'filename': target_filename,
                'file_path': target_path
            })
        else:
            raise Exception("Không tìm thấy tệp sau khi tải xuống.")
            
    except Exception as e:
        JOBS[job_id].update({
            'status': 'failed',
            'error': str(e),
            'phase': 'Xảy ra lỗi khi tải xuống.'
        })

def run_video_download(job_id: str, url: str, format_selector: str, ext: str = 'mp4'):
    JOBS[job_id] = {
        'id': job_id,
        'type': 'video',
        'status': 'starting',
        'percent': 0.0,
        'speed': '0 MB/s',
        'eta': '--',
        'phase': 'Khởi tạo tác vụ tải video...',
        'file_path': None,
        'filename': None,
        'error': None
    }
    
    try:
        out_template = os.path.join(DOWNLOADS_DIR, f"%(title)s_{job_id[:8]}.%(ext)s")
        
        ydl_opts = {
            'format': format_selector or 'bestvideo+bestaudio/best',
            'merge_output_format': ext or 'mp4',
            'outtmpl': out_template,
            'quiet': True,
            'no_warnings': True,
            'nocheckcertificate': True,
            'extractor_args': {
                'youtube': {
                    'player_client': ['ios', 'android', 'mweb', 'web_creator', 'web'],
                }
            },
            'http_headers': {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
                'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7',
            },
            'progress_hooks': [lambda d: download_progress_hook(d, job_id)],
        }
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            
        files = [f for f in os.listdir(DOWNLOADS_DIR) if job_id[:8] in f]
        if files:
            target_filename = files[0]
            target_path = os.path.join(DOWNLOADS_DIR, target_filename)
            JOBS[job_id].update({
                'status': 'completed',
                'percent': 100.0,
                'phase': 'Hoàn tất tải xuống!',
                'filename': target_filename,
                'file_path': target_path
            })
        else:
            raise Exception("Không tìm thấy tệp video sau khi xử lý.")
            
    except Exception as e:
        JOBS[job_id].update({
            'status': 'failed',
            'error': str(e),
            'phase': 'Xảy ra lỗi khi tải video.'
        })

def start_download_job(url: str, download_type: str, options: Dict[str, Any]) -> str:
    job_id = str(uuid.uuid4())
    
    if download_type == 'audio':
        format_type = options.get('format_type', 'mp3')
        bitrate = options.get('bitrate', '320k')
        ext = options.get('ext', 'mp3')
        thread = threading.Thread(
            target=run_audio_download,
            args=(job_id, url, format_type, bitrate, ext),
            daemon=True
        )
        thread.start()
    else:
        format_selector = options.get('format_selector', 'bestvideo+bestaudio/best')
        ext = options.get('ext', 'mp4')
        thread = threading.Thread(
            target=run_video_download,
            args=(job_id, url, format_selector, ext),
            daemon=True
        )
        thread.start()
        
    return job_id
