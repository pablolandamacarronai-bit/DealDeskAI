import { useState, useRef } from 'react';
import Icon from './Icon';

export default function Accordion({ icon, title, count, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  const ref = useRef(null);

  return (
    <div className={'accord' + (open ? ' open' : '')}>
      <button className="accord-head" onClick={() => setOpen((o) => !o)}>
        <span className="ah-ico"><Icon name={icon} size={17} /></span>
        <span className="ah-title">{title}</span>
        {count != null && <span className="ah-count">{count}</span>}
        <span className="chev"><Icon name="chevronRight" size={16} /></span>
      </button>
      <div
        className="accord-body"
        style={{
          maxHeight: open ? (ref.current ? ref.current.scrollHeight + 40 : 1200) : 0,
          transition: 'max-height .28s ease',
        }}
      >
        <div className="accord-inner" ref={ref}>{children}</div>
      </div>
    </div>
  );
}
