"use client";

import { useEffect, useRef, useState } from "react";

interface StatItem {
  prefix?: string;
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}

const stats: StatItem[] = [
  { value: 7,   suffix: " Years+", label: "EXPERIENCE" },
  { value: 161, suffix: "K+",      label: "MEMBERS" },
  { value: 10,  suffix: "+",       label: "MASTER COURSES &\nEBOOKS" },
  { value: 4.8, suffix: " ★★★★★", label: "TRAINEES RATING", decimals: 1 },
];

function useCountUp(target: number, duration = 1800, decimals = 0, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const startTime = performance.now();

    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      setCount(parseFloat(current.toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }, [active, target, duration, decimals]);

  return count;
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const count = useCountUp(stat.value, 1800 + index * 100, stat.decimals ?? 0, active);
  const displayed = stat.decimals ? count.toFixed(stat.decimals) : Math.round(count);

  return (
    <div className="stats__card" ref={ref}>
      <h2 className="stats__value">
        {stat.prefix ?? ""}{displayed}{stat.suffix}
      </h2>
      <p className="stats__label" style={{ whiteSpace: "pre-line" }}>
        {stat.label}
      </p>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="stats">
      {stats.map((stat, i) => (
        <StatCard key={i} stat={stat} index={i} />
      ))}
    </section>
  );
}
