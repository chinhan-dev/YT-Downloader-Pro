// Cấu hình Quảng cáo Adsterra cho YT Downloader Pro
export const ADS_CONFIG = {
  // Bật/Tắt quảng cáo (true = Bật, false = Tắt)
  enabled: true,

  // Direct Link từ Adsterra (Được tạo từ https://beta.publishers.adsterra.com/websites)
  directLinkUrl: 'https://www.effectivecpmnetwork.com/y9a4e12qyu?key=6a5928c',

  // Bật/Tắt mở quảng cáo ở từng thao tác
  triggerOnSearch: true,    // Mở tab quảng cáo khi bấm nút "Tìm kiếm"
  triggerOnDownload: true,  // Mở tab quảng cáo khi bấm nút "Tải Âm Thanh" hoặc "Tải Video"
};

/**
 * Hàm kích hoạt mở tab quảng cáo Adsterra
 */
export function triggerAdsterraAd(type = 'default') {
  if (!ADS_CONFIG.enabled || !ADS_CONFIG.directLinkUrl) return;

  if (type === 'search' && !ADS_CONFIG.triggerOnSearch) return;
  if (type === 'download' && !ADS_CONFIG.triggerOnDownload) return;

  try {
    window.open(ADS_CONFIG.directLinkUrl, '_blank', 'noopener,noreferrer');
  } catch (err) {
    console.warn('Adsterra ad popup was blocked by browser:', err);
  }
}
