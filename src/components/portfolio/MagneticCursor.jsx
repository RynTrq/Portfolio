import { useEffect, useRef, useState } from 'react';

const INTERACTIVE_SELECTOR = [
  '[data-magnetic]',
  'button',
  'a',
  '[role="button"]',
  'input',
  'textarea',
  'select',
].join(', ');

export default function MagneticCursor() {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const glowRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const hoverRef = useRef(false);
  const frameRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(pointer: fine)');
    const syncEnabled = () => setEnabled(mediaQuery.matches);

    syncEnabled();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', syncEnabled);
      return () => mediaQuery.removeEventListener('change', syncEnabled);
    }

    mediaQuery.addListener(syncEnabled);
    return () => mediaQuery.removeListener(syncEnabled);
  }, []);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const onMove = (event) => {
      targetRef.current = { x: event.clientX, y: event.clientY };
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    const onEnter = (event) => {
      if (event.target.closest(INTERACTIVE_SELECTOR)) {
        hoverRef.current = true;
        setIsHovering(true);
      }
    };

    const onLeave = (event) => {
      if (event.target.closest(INTERACTIVE_SELECTOR)) {
        hoverRef.current = false;
        setIsHovering(false);
      }
    };

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const ease = hoverRef.current ? 0.16 : 0.12;
      posRef.current.x += (targetRef.current.x - posRef.current.x) * ease;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * ease;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${targetRef.current.x - 5}px, ${targetRef.current.y - 5}px, 0)`;
      }

      if (trailRef.current) {
        const trailSize = hoverRef.current ? 60 : 40;
        trailRef.current.style.transform = `translate3d(${posRef.current.x - trailSize / 2}px, ${posRef.current.y - trailSize / 2}px, 0)`;
      }

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${posRef.current.x - 80}px, ${posRef.current.y - 80}px, 0)`;
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);
    animate();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-[9997] rounded-full opacity-80 mix-blend-screen will-change-transform"
        style={{
          width: '160px',
          height: '160px',
          background:
            'radial-gradient(circle, rgba(216,255,68,0.16) 0%, rgba(116,230,255,0.08) 42%, rgba(216,255,68,0) 75%)',
          filter: 'blur(10px)',
        }}
      />
      <div
        ref={trailRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full will-change-transform"
        style={{
          width: isHovering ? '60px' : '40px',
          height: isHovering ? '60px' : '40px',
          border: `1px solid ${isHovering ? 'rgba(216,255,68,0.9)' : 'rgba(216,255,68,0.38)'}`,
          opacity: isHovering ? 0.95 : 0.55,
          boxShadow: isHovering
            ? '0 0 28px rgba(216,255,68,0.24), inset 0 0 16px rgba(116,230,255,0.12)'
            : '0 0 18px rgba(216,255,68,0.1)',
          transition:
            'width 0.28s cubic-bezier(0.22, 1, 0.36, 1), height 0.28s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease',
        }}
      />
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full will-change-transform"
        style={{
          width: isClicking ? '10px' : '12px',
          height: isClicking ? '10px' : '12px',
          background: 'linear-gradient(135deg, rgba(216,255,68,1), rgba(116,230,255,0.95))',
          boxShadow:
            '0 0 12px rgba(216,255,68,0.9), 0 0 24px rgba(116,230,255,0.3), 0 0 40px rgba(216,255,68,0.18)',
          transition: 'width 0.14s ease, height 0.14s ease',
        }}
      />
    </>
  );
}
