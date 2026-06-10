import Icon from '../common/Icon';
import Pill from '../common/Pill';
import ProgressBar from '../common/ProgressBar';
import { ROLES } from '../../data/seedData';
import { fmtDate, daysUntil } from '../../utils/dateUtils';

export default function DealCard({ deal, style, onClick }) {
  const role = ROLES[deal.role];
  const urgColor = deal.urgency === 'red' ? 'var(--danger)' : deal.urgency === 'amber' ? 'var(--warn)' : 'var(--ok)';
  const cl = deal.checklist;
  const deadline = deal.deadline instanceof Date ? deal.deadline : new Date(deal.deadline);
  const dd = daysUntil(deadline);
  const ddText = deal.phase === 'fin' ? 'Cerrado' : dd === 0 ? 'Hoy' : dd < 0 ? 'Vencido' : 'en ' + dd + 'd';

  const inner = (
    <>
      <div className="dc-top">
        <span className="dc-name">{deal.name}</span>
        <Pill bg={role.bg} fg={role.fg} style={{ flex: 'none' }}>{role.label}</Pill>
      </div>
      <div className="dc-parties">
        <div><b>Comprador:</b> {deal.buyer}</div>
        <div><b>Vendedor:</b> {deal.seller}</div>
      </div>
      <div className="dc-foot">
        <span className="dc-deadline" style={{ color: deal.phase === 'fin' ? 'var(--text-dim)' : urgColor }}>
          <Icon name="calendar" size={13} />{fmtDate(deadline)}
        </span>
        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: 4 }}>
          <Icon name="clock" size={12} />{ddText}
        </span>
      </div>
      <div className="dc-checklist">
        <ProgressBar value={cl.done} max={cl.total} color={urgColor} />
        <span className="cl-num">{cl.done}/{cl.total}</span>
      </div>
    </>
  );

  if (style === 'c') {
    return (
      <div className={'dealcard style-c u-' + deal.urgency} onClick={onClick}>
        <div className="dc-banner" style={{ background: urgColor }} />
        <div className="dc-cover">{inner}</div>
      </div>
    );
  }

  return (
    <div className={'dealcard u-' + deal.urgency + (style === 'b' ? ' style-b' : '')} onClick={onClick}>
      {inner}
    </div>
  );
}
