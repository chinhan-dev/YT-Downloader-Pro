import React, { useEffect, useRef } from 'react';

export default function AdsterraSidebarBanner() {
  const bannerRef = useRef(null);

  useEffect(() => {
    if (!bannerRef.current) return;

    bannerRef.current.innerHTML = '';

    const confScript = document.createElement('script');
    confScript.type = 'text/javascript';
    confScript.text = `
      atOptions = {
        'key' : '54e459a6b96db2905a010909d6ece87e',
        'format' : 'iframe',
        'height' : 300,
        'width' : 160,
        'params' : {}
      };
    `;

    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = 'https://www.highperformanceformat.com/54e459a6b96db2905a010909d6ece87e/invoke.js';

    bannerRef.current.appendChild(confScript);
    bannerRef.current.appendChild(invokeScript);
  }, []);

  return (
    <div className="glass-panel-light rounded-2xl p-4 border border-emerald-200/80 shadow-sm flex flex-col items-center justify-center bg-white/80 backdrop-blur-md">
      <div className="text-[11px] font-semibold text-slate-600 mb-2 text-center leading-snug">
        🙏 Quảng cáo kinh phí duy trì Web 24/7
      </div>
      <div ref={bannerRef} className="w-[160px] h-[300px] flex justify-center items-center rounded-xl overflow-hidden bg-slate-50" />
    </div>
  );
}
