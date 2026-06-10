export default function Pill({ children, bg, fg, dot, style }) {
  return (
    <span className="pill" style={{ background: bg, color: fg, ...style }}>
      {dot && <i className="pdot" style={{ background: dot }} />}
      {children}
    </span>
  );
}
