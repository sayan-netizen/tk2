import { useEffect, useRef } from "react";

export default function CTA() {
  const revealRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.15 },
    );

    if (revealRef.current) observer.observe(revealRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="page-section" id="page-cta">
      <div className="slide-overlay" />
      <div className="cta-slide-inner reveal" ref={revealRef}>
        <p className="cta-line">The void accepts your presence.</p>
        <h3 className="cta-line-2">Vanish or Train.</h3>
        <button className="begin-btn">Strike to Begin</button>
      </div>
      <footer>
        TECH KURUKSHETRA — SHADOW DOJO. Move the cursor to disturb the embers. Click anywhere to perform a ninja slash.
      </footer>
    </section>
  );
}
