import { useEffect } from 'react';
import Icon from './Icon';

export default function Toast({ msg, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="toast">
      <Icon name="sparkle" size={15} color="var(--accent)" />
      {msg}
    </div>
  );
}
