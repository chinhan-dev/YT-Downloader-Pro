import React, { useEffect, useRef } from 'react';

export default function Adsterra468x60Banner() {
  const bannerRef = useRef(null);

  useEffect(() => {
    if (!bannerRef.current) return;

    bannerRef.current.innerHTML = '';

    const confScript = document.createElement('script');
    confScript.type = 'text/javascript';
    confScript.text = `
      atOptions = {
        'key' : '2527436513f91747abb3648c9eb63eeb',
        'format' : 'iframe',
        'height' : 60,
        'width' : 468,
        'params' : {}
      };
    `;

    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = 'https://www.highperformanceformat.com/2527436513f91747abb3648c9eb63eeb/invoke.js';

    bannerRef.current.appendChild(confScript);
    bannerRef.current.appendChild(invokeScript);
  }, []);

  return (
    <div className="flex justify-center items-center my-3 overflow-hidden max-w-full">
      <div ref={bannerRef} className="w-[468px] h-[60px] flex justify-center items-center overflow-hidden" />
    </div>
  );
}
