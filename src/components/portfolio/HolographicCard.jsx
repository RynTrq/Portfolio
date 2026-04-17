import { useRef } from 'react';

export default function HolographicCard({
  children,
  className = '',
  intensity = 1,
  style = {},
  ...props
}) {
  const cardRef = useRef(null);

  const handlePointerMove = (event) => {
    if (!window.matchMedia?.('(pointer: fine)').matches) {
      return;
    }

    const card = cardRef.current;

    if (!card) {
      return;
    }

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;
    const rotateX = (0.5 - py) * 14 * intensity;
    const rotateY = (px - 0.5) * 14 * intensity;
    const lift = 6 + intensity * 2;

    card.style.transition =
      'transform 110ms ease-out, box-shadow 110ms ease-out, border-color 160ms ease-out';
    card.style.transform =
      `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-${lift}px) scale3d(1.01, 1.01, 1.01)`;
    card.style.boxShadow =
      '0 28px 70px rgba(0,0,0,0.3), 0 0 0 1px rgba(216,255,68,0.08), inset 0 0 30px rgba(116,230,255,0.05)';
    card.style.setProperty('--gloss-x', `${px * 100}%`);
    card.style.setProperty('--gloss-y', `${py * 100}%`);
    card.style.setProperty('--gloss-opacity', `${Math.min(0.14 + intensity * 0.06, 0.26)}`);
    card.style.setProperty('--edge-opacity', `${Math.min(0.16 + intensity * 0.08, 0.34)}`);
  };

  const resetCard = () => {
    if (!window.matchMedia?.('(pointer: fine)').matches) {
      return;
    }

    const card = cardRef.current;

    if (!card) {
      return;
    }

    card.style.transition =
      'transform 650ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 300ms ease, border-color 300ms ease';
    card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)';
    card.style.boxShadow = '0 18px 50px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(216,255,68,0.06)';
    card.style.setProperty('--gloss-x', '50%');
    card.style.setProperty('--gloss-y', '50%');
    card.style.setProperty('--gloss-opacity', '0');
    card.style.setProperty('--edge-opacity', '0.08');
  };

  /** @type {import('react').CSSProperties & Record<string, string | number>} */
  const cardStyle = {
    transform:
      'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)',
    transformStyle: 'preserve-3d',
    boxShadow: '0 18px 50px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(216,255,68,0.06)',
    '--gloss-x': '50%',
    '--gloss-y': '50%',
    '--gloss-opacity': '0',
    '--edge-opacity': '0.08',
    ...style,
  };

  return (
    <div
      ref={cardRef}
      data-magnetic
      onMouseMove={handlePointerMove}
      onMouseLeave={resetCard}
      className={`group relative overflow-hidden will-change-transform ${className}`}
      style={cardStyle}
      {...props}
    >
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            'radial-gradient(circle at var(--gloss-x) var(--gloss-y), rgba(216,255,68,var(--gloss-opacity)) 0%, rgba(116,230,255,calc(var(--gloss-opacity) * 0.66)) 26%, transparent 64%)',
          borderRadius: 'inherit',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(135deg, rgba(216,255,68,0.1) 0%, rgba(116,230,255,0.06) 35%, transparent 72%)',
          borderRadius: 'inherit',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          boxShadow:
            'inset 0 0 0 1px rgba(216,255,68,var(--edge-opacity)), inset 0 1px 0 rgba(255,255,255,0.04)',
          borderRadius: 'inherit',
        }}
      />
      <div className="pointer-events-none absolute inset-x-6 top-0 z-10 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      {children}
    </div>
  );
}
