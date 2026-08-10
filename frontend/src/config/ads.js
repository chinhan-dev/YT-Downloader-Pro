// Cấu hình Quảng cáo Adsterra cho YT Downloader Pro
export const ADSTERRA_SCRIPTS = [
  'https://pl30777109.effectivecpmnetwork.com/7f/14/af/7f14af5b2a3a515b9fee932c1e10d68c.js',
  'https://pl30777110.effectivecpmnetwork.com/ce/98/bb/ce98bb4a80ddfa7e8b20ca532e1a69be.js'
];

/**
 * Đảm bảo 2 mã script Adsterra được nạp vào trang web
 */
export function injectAdsterraScripts() {
  if (typeof document === 'undefined') return;
  
  ADSTERRA_SCRIPTS.forEach((src) => {
    if (!document.querySelector(`script[src="${src}"]`)) {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    }
  });
}

/**
 * Tự động kích hoạt nạp/mở quảng cáo khi tìm kiếm hoặc tải về
 */
export function triggerAdsterraAd(type = 'default') {
  injectAdsterraScripts();
}
