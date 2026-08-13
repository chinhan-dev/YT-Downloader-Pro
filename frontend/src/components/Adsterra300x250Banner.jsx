import React, { useEffect, useRef } from 'react';

export default function Adsterra300x250Banner() {
  const bannerRef = useRef(null);

  useEffect(() => {
    if (!bannerRef.current) return;

    bannerRef.current.innerHTML = '';

    const confScript = document.createElement('script');
    confScript.type = 'text/javascript';
    confScript.text = `
      atOptions = {
        'key' : '03f3968306c99e571229734046f0e00c',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
      };
    `;

    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = 'https://www.highperformanceformat.com/03f3968306c99e571229734046f0e00c/invoke.js';

    bannerRef.current.appendChild(confScript);
    bannerRef.current.appendChild(invokeScript);
  }, []);

  return (
    <div className="flex justify-center items-center my-4 overflow-hidden">
      <div ref={bannerRef} className="w-[300px] h-[250px] flex justify-center items-center overflow-hidden" />
    </div>
  );
}
