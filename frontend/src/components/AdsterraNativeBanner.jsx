import React, { useEffect, useRef } from 'react';

export default function AdsterraNativeBanner() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://pl30777168.effectivecpmnetwork.com/3a6d16b6e81bf06b606736c95bb173de/invoke.js';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');

    const adDiv = document.createElement('div');
    adDiv.id = 'container-3a6d16b6e81bf06b606736c95bb173de';

    containerRef.current.appendChild(script);
    containerRef.current.appendChild(adDiv);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto my-4 flex justify-center items-center overflow-x-auto">
      <div ref={containerRef} className="w-full flex justify-center items-center min-h-[60px]" />
    </div>
  );
}
