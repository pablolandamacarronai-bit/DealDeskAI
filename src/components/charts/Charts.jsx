import { useState, useEffect } from 'react';

export function DonutChart({ data, size = 168, thickness = 22 }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const [prog, setProg] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setProg(1), 80);
    return () => clearTimeout(t);
  }, []);

  let offset = 0;
  const active = data.filter((d) => d.value > 0);

  return (
    <div className="donut-wrap">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flex: 'none' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-2)" strokeWidth={thickness} />
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          {active.map((d) => {
            const frac = d.value / total;
            const len = c * frac * prog;
            const seg = (
              <circle
                key={d.name}
                cx={size / 2} cy={size / 2} r={r}
                fill="none"
                stroke={d.color}
                strokeWidth={thickness}
                strokeLinecap="butt"
                strokeDasharray={`${len} ${c - len}`}
                strokeDashoffset={-offset * prog}
                style={{ transition: 'stroke-dasharray .9s cubic-bezier(.2,.8,.2,1), stroke-dashoffset .9s cubic-bezier(.2,.8,.2,1)' }}
              />
            );
            offset += c * frac;
            return seg;
          })}
        </g>
        <text x="50%" y="46%" textAnchor="middle" fill="var(--text)" fontSize="30" fontWeight="780"
          style={{ fontVariantNumeric: 'tabular-nums' }}>{total}</text>
        <text x="50%" y="60%" textAnchor="middle" fill="var(--text-dim)" fontSize="11" fontWeight="600"
          letterSpacing=".04em">DEALS</text>
      </svg>
      <div className="donut-legend">
        {data.map((d) => (
          <div className="dleg" key={d.name}>
            <i style={{ background: d.color }} />
            <span className="dleg-name">{d.name}</span>
            <span className="dleg-val">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnimatedFill({ pct, color }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(pct), 100);
    return () => clearTimeout(t);
  }, [pct]);
  return <div className="bfill" style={{ width: w + '%', background: color }} />;
}

export function BarChart({ data, max }) {
  const top = max || Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="bars">
      {data.map((d) => (
        <div className="barrow" key={d.label}>
          <span className="blabel">{d.label}</span>
          <div className="btrack">
            <AnimatedFill pct={(d.value / top) * 100} color={d.color} />
          </div>
          <span className="bval">{d.value}</span>
        </div>
      ))}
    </div>
  );
}
