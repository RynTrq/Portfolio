import { useEffect, useRef } from 'react';

export default function GridOverlay() {
  const rootRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return undefined;
    }

    const handleMove = (event) => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth) * 100;
        const y = (event.clientY / window.innerHeight) * 100;
        const shiftX = (event.clientX / window.innerWidth - 0.5) * 26;
        const shiftY = (event.clientY / window.innerHeight - 0.5) * 18;

        root.style.setProperty('--grid-x', `${x}%`);
        root.style.setProperty('--grid-y', `${y}%`);
        root.style.setProperty('--grid-shift-x', `${shiftX}px`);
        root.style.setProperty('--grid-shift-y', `${shiftY}px`);
      });
    };

    window.addEventListener('mousemove', handleMove);

    return () => {
      window.removeEventListener('mousemove', handleMove);

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  /** @type {import('react').CSSProperties & Record<string, string>} */
  const gridStyle = {
    '--grid-x': '50%',
    '--grid-y': '50%',
    '--grid-shift-x': '0px',
    '--grid-shift-y': '0px',
  };

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={gridStyle}
    >
      <div
        className="absolute inset-0 grid-overlay opacity-70 sm:opacity-45"
        style={{ transform: 'translate3d(var(--grid-shift-x), var(--grid-shift-y), 0)' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(216,255,68,0.16),transparent_30%),radial-gradient(circle_at_84%_14%,rgba(116,230,255,0.14),transparent_24%),radial-gradient(circle_at_20%_82%,rgba(134,251,168,0.11),transparent_26%)] sm:bg-[radial-gradient(circle_at_12%_18%,rgba(216,255,68,0.12),transparent_28%),radial-gradient(circle_at_84%_14%,rgba(116,230,255,0.1),transparent_22%),radial-gradient(circle_at_20%_82%,rgba(134,251,168,0.08),transparent_24%)]" />
      <div
        className="absolute inset-0 opacity-100 sm:opacity-80"
        style={{
          background:
            'radial-gradient(circle at var(--grid-x) var(--grid-y), rgba(216,255,68,0.18) 0%, rgba(116,230,255,0.1) 10%, transparent 24%)',
        }}
      />
      <div
        className="absolute -top-20 right-[-6rem] h-80 w-80 rounded-full bg-primary/10 blur-[90px]"
        style={{ transform: 'translate3d(calc(var(--grid-shift-x) * -0.8), calc(var(--grid-shift-y) * -0.8), 0)' }}
      />
      <div
        className="absolute bottom-[-8rem] left-[-4rem] h-72 w-72 rounded-full bg-cyan-400/10 blur-[90px]"
        style={{ transform: 'translate3d(calc(var(--grid-shift-x) * 0.7), calc(var(--grid-shift-y) * 0.7), 0)' }}
      />
      <div className="absolute inset-0 noise-overlay opacity-[0.05]" />
    </div>
  );
}
