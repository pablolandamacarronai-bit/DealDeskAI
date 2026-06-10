import { useState, useEffect } from 'react';

export default function ProgressBar({ value, max, color = 'var(--accent)', animate = true }) {
  const [w, setW] = useState(animate ? 0 : (value / max) * 100);

  useEffect(() => {
    if (!animate) { setW((value / max) * 100); return; }
    const t = setTimeout(() => setW((value / max) * 100), 60);
    return () => clearTimeout(t);
  }, [value, max, animate]);

  return (
    <div className="bar">
      <i style={{ width: w + '%', background: color }} />
    </div>
  );
}
