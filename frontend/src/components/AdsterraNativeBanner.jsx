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
    <div className="w-full max-w-4xl mx-auto my-6 px-4">
      <div className="glass-panel-light rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col items-center justify-center bg-white/90 backdrop-blur-md transition-all duration-300 min-h-[110px]">
        <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-slate-100/80">
          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Tài trợ</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">Adsterra Native</span>
        </div>
        <div ref={containerRef} className="w-full flex justify-center items-center overflow-x-auto min-h-[80px]" />
      </div>
    </div>
  );
}
