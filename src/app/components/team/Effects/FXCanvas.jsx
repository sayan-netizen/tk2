import { useEffect, useRef } from 'react';
import { rand, lerp } from '../../../team-assets/utils/math';

export default function FXCanvas({ pointerRef, burstOrigin, hoveredTorii, currentTeam, isMobile }) {
  const canvasRef = useRef(null);
  
  // Particle state arrays
  const embersRef = useRef([]);
  const slashesRef = useRef([]);
  const sparksRef = useRef([]);
  const toriiBurstsRef = useRef([]);
  
  // Ooze accumulator
  const oozeAccumRef = useRef(0);

  // Physics state refs
  const floatStatesRef = useRef([]);
  const fogFxRef = useRef(0);
  const fogFyRef = useRef(0);
  
  const cxRef = useRef(0);
  const cyRef = useRef(0);
  const bx2Ref = useRef(0);
  const by2Ref = useRef(0);
  const bx3Ref = useRef(0);
  const by3Ref = useRef(0);

  useEffect(() => {
    // Re-build float states when team changes or component mounts
    // Use setTimeout to ensure DOM has updated with the new team members
    setTimeout(() => {
      floatStatesRef.current = Array.from(document.querySelectorAll('.member-card')).map(el => {
        const seed = parseInt(el.dataset.floatSeed || '0', 10);
        return {
          el,
          freqY:  0.00075 + (seed % 6) * 0.0001,
          freqX:  0.00045 + (seed % 4) * 0.00008,
          ampY:   7  + (seed % 4) * 2.8,
          ampX:   2.8 + (seed % 3) * 1.8,
          phaseY: (seed * 1.25) % (Math.PI * 2),
          phaseX: (seed * 2.2) % (Math.PI * 2),
          rotAmp: 1.1 + (seed % 3) * 0.35,
          rotFreq: 0.00055 + (seed % 4) * 0.00009,
          parallaxX: 0, parallaxY: 0,
          curX: 0, curY: 0, curRot: 0
        };
      });
    }, 50);
  }, [currentTeam]);

  // Initialize embers once
  useEffect(() => {
    const MAX_EMBERS = isMobile ? 150 : 450;
    const embers = [];
    for(let i = 0; i < MAX_EMBERS; i++) {
      const isYellow = Math.random() < 0.4;
      const color = isYellow 
        ? (Math.random() < 0.5 ? '255, 215, 0' : '255, 185, 20')
        : (Math.random() < 0.5 ? '255, 80, 20' : '220, 50, 20');
      embers.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: rand(0.6, 1.8),
        vx: rand(-0.4, 0.4),
        vy: rand(-0.2, -0.9),
        life: rand(0, Math.PI * 2),
        speed: rand(0.01, 0.045),
        color
      });
    }
    embersRef.current = embers;
  }, []);

  // Listen for bursts
  useEffect(() => {
    if (burstOrigin) {
      const { x, y } = burstOrigin;
      const COUNT = 110;
      for (let i = 0; i < COUNT; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() < 0.3 ? rand(0.4, 2.5) : rand(2.5, 11.5);
        const isGold   = Math.random() < 0.25;
        const isWhite  = Math.random() < 0.12;
        const isCrimson= !isGold && !isWhite && Math.random() < 0.35;
        const color = isGold    ? '255, 215, 0'
                    : isWhite   ? '255, 245, 220'
                    : isCrimson ? '210, 40, 20'
                    :              '255, 90, 25';
        const r = isGold ? rand(2.2, 5.5) : rand(1.2, 3.8);
        toriiBurstsRef.current.push({
          x: x + rand(-18, 18),
          y: y + rand(-18, 18),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - rand(0.5, 2.5),
          life: rand(0.75, 1.0),
          decay: rand(0.008, 0.022),
          r, color,
          trail: Math.random() < 0.4,
          px: x, py: y,
          isOoze: false
        });
      }
      for (let i = 0; i < 28; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = rand(0.2, 1.8);
        toriiBurstsRef.current.push({
          x: x + rand(-8, 8),
          y: y + rand(-8, 8),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - rand(0.1, 0.6),
          life: rand(0.9, 1.0),
          decay: rand(0.003, 0.010),
          r: rand(3, 8),
          color: Math.random() < 0.5 ? '255, 215, 0' : '255, 80, 20',
          trail: false,
          px: x, py: y,
          isOoze: false
        });
      }
    }
  }, [burstOrigin]);

  // Global mouse down for slashes
  useEffect(() => {
    const handleMouseDown = (e) => {
      if (e.target.closest('.torii-frame')) return;
      
      const x = e.clientX;
      const y = e.clientY;
      
      for (let k = 0; k < 2; k++) {
        const baseAngle = k === 0 ? -0.7 : 0.7;
        const angle = baseAngle + rand(-0.25, 0.25);
        slashesRef.current.push({
          x, y, angle,
          length: rand(30, 50),
          maxLength: rand(110, 160),
          width: rand(3.5, 6),
          life: 1.0,
          decay: rand(0.05, 0.08)
        });
      }

      const count = 60;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = rand(4, 14);
        sparksRef.current.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1.0,
          decay: rand(0.02, 0.045),
          r: rand(1.0, 2.8),
          color: Math.random() < 0.45 ? '255, 215, 0' : (Math.random() < 0.5 ? '255, 90, 20' : '230, 40, 20')
        });
      }
    };

    window.addEventListener('mousedown', handleMouseDown);
    return () => window.removeEventListener('mousedown', handleMouseDown);
  }, []);

  // Main render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let fW = window.innerWidth;
    let fH = window.innerHeight;
    canvas.width = fW;
    canvas.height = fH;

    const handleResize = () => {
      fW = window.innerWidth;
      fH = window.innerHeight;
      canvas.width = fW;
      canvas.height = fH;
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId;

    const tick = () => {
      // Hover ooze
      if (hoveredTorii) {
        oozeAccumRef.current += 1.3;
        while (oozeAccumRef.current >= 1) {
          const portrait = hoveredTorii.querySelector('.portrait-symbol-container');
          const target = portrait || hoveredTorii;
          const rect = target.getBoundingClientRect();
          const fcx = rect.left + rect.width / 2;
          const halfW = rect.width * 0.52;
          const ex = fcx + rand(-halfW, halfW);
          const ey = rect.top + rand(-3, 5);
          
          const spread = 0.45;
          const angle  = -Math.PI / 2 + rand(-spread, spread);
          const speed  = rand(0.2, 0.9);
      
          const isGold    = Math.random() < 0.30;
          const isCrimson = !isGold && Math.random() < 0.28;
          const color = isGold    ? '255, 215, 0'
                      : isCrimson ? '200, 35, 15'
                      :              '255, 85, 20';
          const r = isGold ? rand(2.5, 5.2) : rand(1.4, 3.5);
      
          toriiBurstsRef.current.push({
            x: ex, y: ey,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: rand(0.75, 1.0),
            decay: rand(0.003, 0.010),
            r, color,
            trail: Math.random() < 0.35,
            px: ex, py: ey,
            isOoze: true
          });
          oozeAccumRef.current -= 1;
        }
      } else {
        oozeAccumRef.current = 0;
      }

      ctx.clearRect(0, 0, fW, fH);
      
      const p = pointerRef.current;

      // Draw embers
      ctx.shadowBlur = 6;
      ctx.shadowColor = '#FF4400';
      embersRef.current.forEach(e => {
        e.x += e.vx;
        e.y += e.vy;
        e.life += e.speed;
        
        const dx = e.x - p.x, dy = e.y - p.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 140 && dist > 0.1) {
          e.x += (dx/dist) * 4;
          e.y += (dy/dist) * 4;
        }

        if (e.y < -10 || e.x < -20 || e.x > fW + 20) {
          e.y = fH + 10;
          e.x = Math.random() * fW;
        }

        const alpha = 0.5 + Math.sin(e.life) * 0.4;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(${e.color}, ${alpha})`;
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      // Draw slashes
      if (slashesRef.current.length > 0) {
        ctx.shadowBlur = 16;
        ctx.shadowColor = '#FF2200';
        for (let i = slashesRef.current.length - 1; i >= 0; i--) {
          const s = slashesRef.current[i];
          s.length = lerp(s.length, s.maxLength, 0.35);
          s.life -= s.decay;
          if (s.life <= 0) { slashesRef.current.splice(i, 1); continue; }

          const halfL = s.length / 2;
          const x1 = s.x - Math.cos(s.angle) * halfL;
          const y1 = s.y - Math.sin(s.angle) * halfL;
          const x2 = s.x + Math.cos(s.angle) * halfL;
          const y2 = s.y + Math.sin(s.angle) * halfL;

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = `rgba(255, 235, 190, ${s.life})`;
          ctx.lineWidth = s.width * s.life;
          ctx.lineCap = 'round';
          ctx.stroke();
        }
      }

      // Draw sparks
      if (sparksRef.current.length > 0) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#FF6600';
        for (let i = sparksRef.current.length - 1; i >= 0; i--) {
          const spark = sparksRef.current[i];
          spark.x += spark.vx;
          spark.y += spark.vy;
          spark.vx *= 0.90;
          spark.vy *= 0.90;
          spark.vy += 0.12;
          spark.life -= spark.decay;
          if (spark.life <= 0) { sparksRef.current.splice(i, 1); continue; }
          ctx.beginPath();
          ctx.arc(spark.x, spark.y, spark.r * spark.life, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${spark.color}, ${spark.life})`;
          ctx.fill();
        }
      }

      // Draw torii bursts
      if (toriiBurstsRef.current.length > 0) {
        for (let i = toriiBurstsRef.current.length - 1; i >= 0; i--) {
          const d = toriiBurstsRef.current[i];
          d.px = d.x;
          d.py = d.y;
          d.x  += d.vx;
          d.y  += d.vy;
          d.vx *= 0.972;
          d.vy *= 0.972;
          if (!d.isOoze) d.vy += 0.04;
          d.life -= d.decay;
          if (d.life <= 0) { toriiBurstsRef.current.splice(i, 1); continue; }

          const alpha = Math.min(d.life, 0.92);
          const radius = d.r * (0.4 + d.life * 0.6);

          ctx.shadowBlur = 14;
          ctx.shadowColor = `rgba(${d.color}, ${alpha * 0.9})`;

          if (d.trail && d.life > 0.2) {
            ctx.beginPath();
            ctx.moveTo(d.px, d.py);
            ctx.lineTo(d.x, d.y);
            ctx.strokeStyle = `rgba(${d.color}, ${alpha * 0.45})`;
            ctx.lineWidth = radius * 0.6;
            ctx.lineCap = 'round';
            ctx.stroke();
          }

          const grad = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, radius);
          grad.addColorStop(0, `rgba(255, 255, 240, ${alpha})`);
          grad.addColorStop(0.35, `rgba(${d.color}, ${alpha * 0.95})`);
          grad.addColorStop(1, `rgba(${d.color}, 0)`);
          ctx.beginPath();
          ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }
      }
      ctx.shadowBlur = 0;

      // --- DOM PHYSICS ANIMATIONS ---
      const t = performance.now();
      const normMx = (p.x / window.innerWidth - 0.5) || 0;
      const normMy = (p.y / window.innerHeight - 0.5) || 0;

      // 1. Tick Float (Member Cards) - Desktop only
      if (!isMobile) {
        floatStatesRef.current.forEach(s => {
          const fY = Math.sin(t * s.freqY + s.phaseY) * s.ampY;
          const fX = Math.cos(t * s.freqX + s.phaseX) * s.ampX;
          const fRot = Math.sin(t * s.rotFreq + s.phaseX) * s.rotAmp;

          const targetPX = normMx * -15;
          const targetPY = normMy * -10;
          s.parallaxX = lerp(s.parallaxX, targetPX, 0.03);
          s.parallaxY = lerp(s.parallaxY, targetPY, 0.03);

          s.curX = lerp(s.curX, fX + s.parallaxX, 0.05);
          s.curY = lerp(s.curY, fY + s.parallaxY, 0.05);
          s.curRot = lerp(s.curRot, fRot, 0.05);

          s.el.style.transform = `translateX(${s.curX}px) translateY(${s.curY}px) rotate(${s.curRot}deg)`;
        });
      }

      // 2. Tick Fog
      fogFxRef.current = lerp(fogFxRef.current, normMx, 0.035);
      fogFyRef.current = lerp(fogFyRef.current, normMy, 0.035);
      const fogs = document.querySelectorAll('.fog');
      fogs.forEach((f, i) => {
        const depth = (i + 1) * 15;
        f.style.transform = `translate(${fogFxRef.current * depth}px, ${fogFyRef.current * depth}px)`;
      });

      // 3. Tick Gooey Bg
      const blob1 = document.querySelector('.blob-1');
      const blob2 = document.querySelector('.blob-2');
      const blob3 = document.querySelector('.blob-3');

      if (blob1 && blob2 && blob3) {
        cxRef.current = lerp(cxRef.current, p.x, 0.35);
        cyRef.current = lerp(cyRef.current, p.y, 0.35);
        const cx = cxRef.current;
        const cy = cyRef.current;

        blob1.style.transform = `translate3d(${cx - 160}px, ${cy - 160}px, 0)`;

        bx2Ref.current = lerp(bx2Ref.current, cx - 110, 0.2);
        by2Ref.current = lerp(by2Ref.current, cy - 110, 0.2);
        blob2.style.transform = `translate3d(${bx2Ref.current}px, ${by2Ref.current}px, 0)`;

        const timeNow = Date.now() * 0.002;
        const offsetX = Math.sin(timeNow) * 20;
        const offsetY = Math.cos(timeNow) * 20;
        bx3Ref.current = lerp(bx3Ref.current, cx - 90 + offsetX, 0.1);
        by3Ref.current = lerp(by3Ref.current, cy - 90 + offsetY, 0.1);
        blob3.style.transform = `translate3d(${bx3Ref.current}px, ${by3Ref.current}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [pointerRef, hoveredTorii, isMobile]);

  return (
    <canvas 
      id="fx-canvas" 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-[100vw] h-[100vh] pointer-events-none z-[999999]"
    />
  );
}
