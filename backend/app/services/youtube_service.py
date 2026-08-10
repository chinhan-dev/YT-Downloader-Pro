import os
import re
import math
import yt_dlp
from typing import Dict, Any, List

def format_duration(seconds: float) -> str:
    if not seconds:
        return "00:00"
    seconds = int(seconds)
    hours = seconds // 3600
    minutes = (seconds % 3600) // 60
    secs = seconds % 60
    if hours > 0:
        return f"{hours:02d}:{minutes:02d}:{secs:02d}"
    return f"{minutes:02d}:{secs:02d}"

def format_size(bytes_val: float) -> str:
    if not bytes_val or bytes_val <= 0:
        return "Tự động tính"
    units = ["B", "KB", "MB", "GB"]
    i = 0
    while bytes_val >= 1024 and i < len(units) - 1:
        bytes_val /= 1024.0
        i += 1
    return f"{bytes_val:.1f} {units[i]}"

def get_youtube_info(url: str) -> Dict[str, Any]:
    cookie_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../cookies.txt'))
    
    base_opts = {
        'quiet': True,
        'no_warnings': True,
        'skip_download': True,
        'nocheckcertificate': True,
        'http_headers': {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
            'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7',
        }
    }
    
    if os.path.exists(cookie_path):
        base_opts['cookiefile'] = cookie_path
    elif os.environ.get('YOUTUBE_COOKIES'):
        try:
            with open(cookie_path, 'w', encoding='utf-8') as f:
                f.write(os.environ.get('YOUTUBE_COOKIES'))
            base_opts['cookiefile'] = cookie_path
        except Exception:
            pass
    
    info = None
    last_error = None
    
    client_configs = [
        ['tv', 'mweb'],
        ['android_vr'],
        ['ios', 'android'],
        ['web_creator', 'mweb'],
        ['web']
    ]
    
    for clients in client_configs:
        try:
            ydl_opts = base_opts.copy()
            ydl_opts['extractor_args'] = {
                'youtube': {
                    'player_client': clients,
                }
            }
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=False)
                if info and info.get('title'):
                    break
        except Exception as e:
            last_error = e
            continue
            
    if not info:
        raise Exception(f"Không thể lấy thông tin video: {str(last_error)}")
        
    # Extract metadata
    title = info.get('title', 'Video YouTube')
    thumbnail = info.get('thumbnail') or (info.get('thumbnails')[-1]['url'] if info.get('thumbnails') else '')
    duration_sec = info.get('duration', 0)
    duration_str = format_duration(duration_sec)
    uploader = info.get('uploader') or info.get('channel') or 'N/A'
    view_count = info.get('view_count', 0)
    
    raw_formats = info.get('formats', [])
    
    # Process Video Formats (Group by resolution)
    video_qualities = []
    seen_heights = set()
    
    desired_heights = [2160, 1440, 1080, 720, 480, 360, 240, 144]
    
    available_streams_by_height = {}
    for f in raw_formats:
        vcodec = f.get('vcodec', 'none')
        height = f.get('height')
        if vcodec != 'none' and height and height > 0:
            fps = f.get('fps', 30) or 30
            filesize = f.get('filesize') or f.get('filesize_approx') or 0
            
            if height not in available_streams_by_height or (fps > available_streams_by_height[height].get('fps', 0)):
                available_streams_by_height[height] = {
                    'height': height,
                    'fps': fps,
                    'filesize': filesize,
                    'format_id': f.get('format_id'),
                    'ext': f.get('ext', 'mp4')
                }
                
    for h in desired_heights:
        if h in available_streams_by_height:
            item = available_streams_by_height[h]
            fps_str = f"{int(item['fps'])}fps" if item['fps'] > 30 else ""
            if h >= 2160:
                badge = "4K Ultra HD"
            elif h >= 1440:
                badge = "2K Quad HD"
            elif h >= 1080:
                badge = "Full HD"
            elif h >= 720:
                badge = "HD"
            else:
                badge = "SD"
                
            label = f"{h}p {fps_str}".strip()
            format_selector = f"bestvideo[height<={h}]+bestaudio/best[height<={h}]/best"
            
            video_qualities.append({
                'id': f"vid_{h}p",
                'height': h,
                'label': label,
                'badge': badge,
                'fps': item['fps'],
                'format_selector': format_selector,
                'ext': 'mp4',
                'size_str': format_size(item['filesize'])
            })
            seen_heights.add(h)

    if not video_qualities:
        video_qualities.append({
            'id': 'vid_best',
            'height': 1080,
            'label': '1080p Full HD',
            'badge': 'Full HD',
            'fps': 30,
            'format_selector': 'bestvideo+bestaudio/best',
            'ext': 'mp4',
            'size_str': 'Tự động tính'
        })
        
    # Process Audio Formats
    audio_qualities = [
        {
            'id': 'aud_320k',
            'label': 'MP3 320 KB/s',
            'badge': 'Chất lượng cao nhất',
            'bitrate': '320k',
            'format_type': 'mp3',
            'ext': 'mp3',
            'desc': 'Âm thanh sắc nét nhất cho tai nghe & loa cao cấp'
        },
        {
            'id': 'aud_256k',
            'label': 'MP3 256 KB/s',
            'badge': 'Chất lượng tốt',
            'bitrate': '256k',
            'format_type': 'mp3',
            'ext': 'mp3',
            'desc': 'Cân bằng tốt giữa dung lượng và chất lượng'
        },
        {
            'id': 'aud_128k',
            'label': 'MP3 128 KB/s',
            'badge': 'Tiêu chuẩn',
            'bitrate': '128k',
            'format_type': 'mp3',
            'ext': 'mp3',
            'desc': 'Dung lượng nhẹ, phù hợp nghe hàng ngày'
        },
        {
            'id': 'aud_m4a',
            'label': 'M4A / AAC Gốc',
            'badge': 'Audio Gốc YouTube',
            'bitrate': 'auto',
            'format_type': 'm4a',
            'ext': 'm4a',
            'desc': 'Định dạng m4a nguyên bản từ luồng gốc'
        },
        {
            'id': 'aud_opus',
            'label': 'WEBM / OPUS Gốc',
            'badge': 'Hiệu suất cao',
            'bitrate': 'auto',
            'format_type': 'opus',
            'ext': 'webm',
            'desc': 'Codec Opus tiết kiệm dung lượng'
        },
        {
            'id': 'aud_wav',
            'label': 'WAV Lossless',
            'badge': 'Không nén',
            'bitrate': 'lossless',
            'format_type': 'wav',
            'ext': 'wav',
            'desc': 'Định dạng WAV không nén chuyên dùng dựng phim'
        }
    ]
    
    return {
        'url': url,
        'title': title,
        'thumbnail': thumbnail,
        'duration': duration_str,
        'uploader': uploader,
        'view_count': f"{view_count:,}" if view_count else "N/A",
        'audio_qualities': audio_qualities,
        'video_qualities': video_qualities
    }
