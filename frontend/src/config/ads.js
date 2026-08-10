// Cấu hình Quảng cáo Adsterra cho YT Downloader Pro
export const ADSTERRA_SCRIPTS = [
  'https://pl30777109.effectivecpmnetwork.com/7f/14/af/7f14af5b2a3a515b9fee932c1e10d68c.js',
  'https://pl30777110.effectivecpmnetwork.com/ce/98/bb/ce98bb4a80ddfa7e8b20ca532e1a69be.js'
];

/**
 * Đảm bảo 2 mã script Popunder Adsterra được nạp vào trang web
 */
export function injectAdsterraScripts() {
  if (typeof document === 'undefined') return;
  
  ADSTERRA_SCRIPTS.forEach((src) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.head.appendChild(script);
  });
}

/**
 * Tự động mở Tab Quảng cáo khi bấm Tìm kiếm hoặc Tải bất kỳ file nào
 */
export function triggerAdsterraAd(type = 'default') {
  injectAdsterraScripts();
  try {
    // Chọn ngẫu nhiên 1 trong 2 mã Popunder Ads để nhảy tab quảng cáo khi bấm nút
    const targetAdScript = ADSTERRA_SCRIPTS[Math.floor(Math.random() * ADSTERRA_SCRIPTS.length)];
    const adWin = window.open(targetAdScript, '_blank');
    if (adWin) {
      try {
        adWin.blur();
        window.focus();
      } catch (e) {}
    }
  } catch (err) {
    console.log('Adsterra popunder trigger:', err);
  }
}
