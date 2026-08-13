import React, { useEffect, useRef } from 'react';

export default function AdsterraLeaderboardBanner() {
  const desktopBannerRef = useRef(null);
  const mobileBannerRef = useRef(null);

  useEffect(() => {
    // 728x90 Desktop Leaderboard
    if (desktopBannerRef.current) {
      desktopBannerRef.current.innerHTML = '';
      const confScript = document.createElement('script');
      confScript.type = 'text/javascript';
      confScript.text = `
        atOptions = {
          'key' : 'e8f8b49722870acd527de6f7eba62063',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
      `;
      const invokeScript = document.createElement('script');
      invokeScript.type = 'text/javascript';
      invokeScript.src = 'https://www.highperformanceformat.com/e8f8b49722870acd527de6f7eba62063/invoke.js';
      desktopBannerRef.current.appendChild(confScript);
      desktopBannerRef.current.appendChild(invokeScript);
    }

    // 320x50 Mobile Leaderboard
    if (mobileBannerRef.current) {
      mobileBannerRef.current.innerHTML = '';
      const confScriptM = document.createElement('script');
      confScriptM.type = 'text/javascript';
      confScriptM.text = `
        atOptions = {
          'key' : 'a94eaf70f745d874bbc31aa75687447d',
          'format' : 'iframe',
          'height' : 50,
          'width' : 320,
          'params' : {}
        };
      `;
      const invokeScriptM = document.createElement('script');
      invokeScriptM.type = 'text/javascript';
      invokeScriptM.src = 'https://www.highperformanceformat.com/a94eaf70f745d874bbc31aa75687447d/invoke.js';
      mobileBannerRef.current.appendChild(confScriptM);
      mobileBannerRef.current.appendChild(invokeScriptM);
    }
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center my-4">
      {/* Desktop 728x90 Banner */}
      <div className="hidden md:flex justify-center items-center w-[728px] h-[90px] overflow-hidden">
        <div ref={desktopBannerRef} className="w-[728px] h-[90px]" />
      </div>

      {/* Mobile 320x50 Banner */}
      <div className="flex md:hidden justify-center items-center w-[320px] h-[50px] overflow-hidden">
        <div ref={mobileBannerRef} className="w-[320px] h-[50px]" />
      </div>
    </div>
  );
}
