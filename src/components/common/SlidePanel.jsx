import { useState, useEffect } from 'react';

function useBodyScrollLock(active) {
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [active]);
}

export default function SlidePanel({ open, onClose, children }) {
  const [mounted, setMounted] = useState(open);
  const [shown, setShown] = useState(false);
  useBodyScrollLock(open);

  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
    } else {
      setShown(false);
      const t = setTimeout(() => setMounted(false), 340);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!mounted) return null;

  return (
    <>
      <div className={'scrim' + (shown ? ' show' : '')} onClick={onClose} />
      <aside className={'panel' + (shown ? ' show' : '')} role="dialog" aria-modal="true">
        {children}
      </aside>
    </>
  );
}
