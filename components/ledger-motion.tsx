'use client';

import { useEffect, useRef, useState } from 'react';

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/** Adds `is-in` to every `.reveal` element as it scrolls into view. */
export function useReveal(key: number) {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('.reveal:not(.is-in)');
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-in'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [key]);
}

/** True once the element has been seen; charts use it to start their draw. */
export function useInView<T extends Element>() {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      const frame = requestAnimationFrame(() => setSeen(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return [ref, seen] as const;
}

/** Counts from 0 to `value` once it scrolls into view. */
export function CountUp({
  value,
  duration = 1400,
}: {
  value: number;
  duration?: number;
}) {
  const [ref, seen] = useInView<HTMLSpanElement>();
  const [progress, setProgress] = useState<number | null>(null);
  useEffect(() => {
    if (!seen || prefersReducedMotion()) return;
    let frame = 0;
    const start = performance.now();
    const tick = (time: number) => {
      const p = Math.min(1, (time - start) / duration);
      setProgress(p);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [seen, duration]);
  const shown =
    progress === null
      ? value
      : Math.round(value * (1 - Math.pow(1 - progress, 3)));
  return <span ref={ref}>{shown}</span>;
}

export type TickerItem = {
  id: string;
  org: string;
  role: string;
  signal: string;
  urgent: boolean;
  fresh: boolean;
};

/** A stock-tape style strip of live openings. Pauses on hover. */
export function LedgerTicker({
  items,
  onPick,
}: {
  items: TickerItem[];
  onPick: (id: string) => void;
}) {
  if (!items.length) return null;
  const row = (copy: number) =>
    items.map((item) => (
      <button
        type="button"
        key={copy + item.id}
        className="tick"
        tabIndex={copy ? -1 : 0}
        aria-hidden={copy ? true : undefined}
        onClick={() => onPick(item.id)}
      >
        <span className={item.urgent ? 'tick-arrow down' : 'tick-arrow'}>
          {item.urgent ? '▼' : '▲'}
        </span>
        <strong>{item.org}</strong>
        <span className="tick-role">{item.role}</span>
        <span className={item.urgent ? 'tick-signal urgent' : 'tick-signal'}>
          {item.signal}
        </span>
        {item.fresh ? <span className="tick-new">NEW</span> : null}
      </button>
    ));
  return (
    <div className="ledger-ticker" aria-label="Live openings">
      <span className="ticker-label">
        <i /> LIVE
      </span>
      <div className="ticker-window">
        <div className="ticker-track">
          <div className="ticker-set">{row(0)}</div>
          <div className="ticker-set">{row(1)}</div>
        </div>
      </div>
    </div>
  );
}
