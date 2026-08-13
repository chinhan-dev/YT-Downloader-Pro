// Cấu hình Quảng cáo Adsterra cho YT Downloader Pro

/**
 * LƯU Ý BẮT BUỘC:
 * 1. Thay DIRECT_LINK_URL bên dưới bằng URL Direct Link thực tế tạo trong Adsterra Dashboard
 *    (Vào Adsterra Publisher -> Direct Links -> Add Direct Link -> Copy link dạng: https://www.highratecpm.com/xxxxxx hoặc https://www.profitablecpmrate.com/xxxxxx)
 * 2. KHÔNG DÙNG link file script JS (.js) vào window.open!
 */
export const DIRECT_LINK_URL = 'https://www.effectivecpmnetwork.com/eycyfdp1s?key=22562deccfe5aaecf34c142246e7ca3f'; // Thay URL Direct Link thật vào đây

export const ADSTERRA_SCRIPTS = [
  'https://pl30777109.effectivecpmnetwork.com/7f/14/af/7f14af5b2a3a515b9fee932c1e10d68c.js',
  'https://pl30777110.effectivecpmnetwork.com/ce/98/bb/ce98bb4a80ddfa7e8b20ca532e1a69be.js'
];

/**
 * Đảm bảo các script Popunder / Social Bar Adsterra được nạp vào trang
 */
export function injectAdsterraScripts() {
  if (typeof document === 'undefined') return;
  
  ADSTERRA_SCRIPTS.forEach((src) => {
    if (!document.querySelector(`script[src="${src}"]`)) {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.head.appendChild(script);
    }
  });
}

/**
 * Mở Direct Link Quảng cáo khi người dùng thực hiện thao tác (Tìm kiếm hoặc Tải về)
 */
export function triggerAdsterraAd(urlOrType) {
  let targetUrl = DIRECT_LINK_URL;
  if (typeof urlOrType === 'string' && urlOrType.startsWith('http')) {
    targetUrl = urlOrType;
  }

  if (!targetUrl || targetUrl.endsWith('.js') || targetUrl.includes('DIRECT_LINK_HERE')) {
    console.warn('[Adsterra] Vui lòng cập nhật DIRECT_LINK_URL trong src/config/ads.js bằng link Direct Link từ Adsterra!');
    return;
  }

  try {
    const adWin = window.open(targetUrl, '_blank');
    if (adWin) {
      try {
        adWin.blur();
        window.focus();
      } catch (e) {}
    }
  } catch (err) {
    console.log('[Adsterra] Direct link trigger blocked by browser:', err);
  }
}

