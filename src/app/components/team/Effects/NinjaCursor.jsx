import React, { useEffect, useState } from 'react';
import { usePointer } from '../../../team-assets/hooks/usePointer';
import { lerp, clamp } from '../../../team-assets/utils/math';

export default function NinjaCursor() {
  const { pointerRef, isClicking } = usePointer();
  const [style, setStyle] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2, rot: 0 });

  useEffect(() => {
    let animationFrameId;
    let cx = pointerRef.current.x;
    let cy = pointerRef.current.y;
    let crot = 0;

    const tick = () => {
      const p = pointerRef.current;
      const vel = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      
      cx = lerp(cx, p.x, 0.35);
      cy = lerp(cy, p.y, 0.35);
      crot += clamp(vel * 0.8 + 2, 2, 25);

      setStyle({ x: cx, y: cy, rot: crot });
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, [pointerRef]);

  return (
    <>
      <div 
        id="cursor" 
        className="fixed top-0 left-0 w-[32px] h-[32px] pointer-events-none z-[9999] hidden md:block"
        style={{
          transform: `translate(calc(-50% + ${style.x}px), calc(-50% + ${style.y}px)) rotate(${style.rot}deg) scale(${isClicking ? 0.75 : 1.0})`,
          transition: isClicking ? 'transform 0.05s ease' : 'transform 0.18s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
      >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_8px_rgba(197,57,75,0.7)]">
          <path d="M50 5 L58 35 L88 45 L58 55 L50 88 L42 55 L12 45 L42 35 Z" fill="#800000" stroke="#FFF" strokeWidth="3" strokeLinejoin="round"/>
          <circle cx="50" cy="50" r="10" fill="#1f1a1a" stroke="#FFD700" strokeWidth="2"/>
        </svg>
      </div>
      <div 
        id="cursor-trail"
        className="fixed top-0 left-0 w-[8px] h-[8px] rounded-full bg-fire-orange pointer-events-none z-[9998] blur-[2px] opacity-0 hidden md:block transition-transform duration-100 ease-out"
        style={{
          transform: `translate(calc(-50% + ${style.x}px), calc(-50% + ${style.y}px))`,
          opacity: 0.65
        }}
      ></div>
    </>
  );
}
