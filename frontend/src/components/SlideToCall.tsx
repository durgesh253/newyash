import { useEffect, useRef } from 'react';

const SlideToCall = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    const sliderBtn = buttonRef.current;
    if (!slider || !sliderBtn) return;

    let isDragging = false;
    let startX = 0;
    let offsetX = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.clientX;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      offsetX = e.clientX - startX;
      const maxOffset = slider.offsetWidth - sliderBtn.offsetWidth;
      offsetX = Math.max(0, Math.min(offsetX, maxOffset));
      sliderBtn.style.left = offsetX + 'px';
    };

    const handleMouseUp = () => {
      if (!isDragging) return;
      isDragging = false;
      const maxOffset = slider.offsetWidth - sliderBtn.offsetWidth;

      if (offsetX > maxOffset - 10) {
        window.location.href = "tel:+1234567890";
        slider.innerHTML = `<div style="color:white; font-weight:600; text-align:center; width:100%">⏳ Calling... <span id="countdown">300</span>s</div>`;
        
        let seconds = 300;
        const countdown = document.getElementById("countdown");
        const timer = setInterval(() => {
          seconds--;
          if (countdown) countdown.textContent = seconds.toString();
          if (seconds <= 0) {
            clearInterval(timer);
          }
        }, 1000);
      } else {
        sliderBtn.style.left = '0px';
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      isDragging = true;
      startX = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      offsetX = e.touches[0].clientX - startX;
      const maxOffset = slider.offsetWidth - sliderBtn.offsetWidth;
      offsetX = Math.max(0, Math.min(offsetX, maxOffset));
      sliderBtn.style.left = offsetX + 'px';
    };

    const handleTouchEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      const maxOffset = slider.offsetWidth - sliderBtn.offsetWidth;

      if (offsetX > maxOffset - 10) {
        window.location.href = "tel:+1234567890";
        slider.innerHTML = `<div style="color:white; font-weight:600; text-align:center; width:100%">⏳ Calling... <span id="countdown">300</span>s</div>`;
        
        let seconds = 300;
        const countdown = document.getElementById("countdown");
        const timer = setInterval(() => {
          seconds--;
          if (countdown) countdown.textContent = seconds.toString();
          if (seconds <= 0) {
            clearInterval(timer);
          }
        }, 1000);
      } else {
        sliderBtn.style.left = '0px';
      }
    };

    sliderBtn.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    sliderBtn.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      sliderBtn.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      sliderBtn.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div 
      ref={sliderRef}
      className="call-slider-container relative h-16 bg-gradient-to-r from-slate-700/80 to-slate-600/80 rounded-full overflow-hidden my-5 border border-slate-500/30"
    >
      <div 
        ref={buttonRef}
        className="slider-button absolute left-1 top-1 w-14 h-14 bg-white rounded-full flex items-center justify-center cursor-pointer shadow-lg"
      >
        <img 
          src="/lovable-uploads/74cedcde-85af-466b-9a40-831e188e7293.png" 
          alt="Phone" 
          className="w-8 h-8"
        />
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white pointer-events-none text-sm font-medium tracking-wider">
        → SLIDE TO CALL
      </div>
    </div>
  );
};

export default SlideToCall;