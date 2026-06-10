import Icon from '../common/Icon';
import Pill from '../common/Pill';
import { MESES_LARGO } from '../../utils/dateUtils';

export default function EventDetail({ ev, onClose, onOpenRef }) {
  if (!ev) return null;
  const isMna = ev.kind === 'mna';

  return (
    <div
      className="scrim show"
      style={{ display: 'grid', placeItems: 'center', padding: 20 }}
      onClick={onClose}
    >
      <div
        className="card"
        style={{ width: 380, maxWidth: '100%', padding: 0, overflow: 'hidden', animation: 'pop .2s both' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ height: 4, background: isMna ? 'var(--mna)' : 'var(--corp)' }} />
        <div style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
            <Pill
              bg={isMna ? 'var(--mna-soft)' : 'var(--corp-soft)'}
              fg={isMna ? '#bcd4ff' : '#f6cd83'}
              dot={isMna ? 'var(--mna)' : 'var(--corp)'}
            >
              {isMna ? 'M&A' : 'Corporate'}
            </Pill>
            <button className="panel-close" style={{ width: 44, height: 44 }} onClick={onClose}>
              <Icon name="x" size={16} />
            </button>
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 740, margin: '14px 0 6px', letterSpacing: '-.02em' }}>
            {ev.title}
          </h3>
          <div style={{ color: 'var(--text-dim)', fontSize: 13.5 }}>{ev.sub}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 16, fontSize: 13.5, color: 'var(--text-mid)' }}>
            <Icon name="calendar" size={15} color="var(--text-dim)" />
            {ev.date.getDate()} {MESES_LARGO[ev.date.getMonth()]} {ev.date.getFullYear()}
            {ev.time && <span style={{ color: 'var(--text-dim)' }}>· {ev.time}</span>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 10, fontSize: 13.5, color: 'var(--text-mid)' }}>
            <Icon name={isMna ? 'handshake' : 'building'} size={15} color="var(--text-dim)" />
            {ev.refName}
          </div>
          <button
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: 20 }}
            onClick={() => onOpenRef(ev)}
          >
            Abrir {isMna ? 'deal' : 'sociedad'} <Icon name="chevronRight" size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
