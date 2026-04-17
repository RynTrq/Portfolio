import { useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_@#$%';

export default function GlitchText({
  text,
  className = '',
  scrambleDuration = 1200,
  delay = 0,
}) {
  const [displayed, setDisplayed] = useState(text);
  const frameRef = useRef(null);
  const activeRef = useRef(false);

  const scramble = () => {
    if (activeRef.current) {
      return;
    }

    activeRef.current = true;
    const start = Date.now() + delay;

    const tick = () => {
      const now = Date.now();

      if (now < start) {
        frameRef.current = requestAnimationFrame(tick);
        return;
      }

      const progress = Math.min((now - start) / scrambleDuration, 1);
      const revealedCount = Math.floor(progress * text.length);
      const scrambled = text
        .split('')
        .map((char, index) => {
          if (char === ' ') {
            return ' ';
          }

          if (index < revealedCount) {
            return char;
          }

          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');

      setDisplayed(scrambled);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
        return;
      }

      setDisplayed(text);
      activeRef.current = false;
    };

    frameRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    setDisplayed(text);
    scramble();

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      activeRef.current = false;
    };
  }, [delay, scrambleDuration, text]);

  return (
    <span
      data-magnetic
      className={`relative inline-block whitespace-pre cursor-default select-none ${className}`}
      onMouseEnter={scramble}
    >
      <span className="invisible whitespace-pre">{text}</span>
      <span className="absolute inset-0 whitespace-pre">
        {displayed}
      </span>
    </span>
  );
}
