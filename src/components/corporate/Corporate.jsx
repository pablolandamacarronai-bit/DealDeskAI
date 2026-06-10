import { useState } from 'react';
import Icon from '../common/Icon';
import Pill from '../common/Pill';
import ProgressBar from '../common/ProgressBar';
import SocietyPanel from './SocietyPanel';
import UnifiedCalendar from '../calendar/UnifiedCalendar';
import { SOC_STATUS } from '../../data/seedData';
import { fmtDate } from '../../utils/dateUtils';

function SocietyCard({ soc, onClick }) {
  const st = SOC_STATUS[soc.status];
  const nextTask = [...soc.tasks]
    .filter((t) => t.status !== 'Completado')
    .sort((a, b) => {
      const da = a.d instanceof Date ? a.d : new Date(a.d);
      const db = b.d instanceof Date ? b.d : new Date(b.d);
      return da - db;
    })[0];
  const done = soc.tasks.filter((t) => t.status === 'Completado').length;

  return (
    <div className="card soccard" onClick={onClick} style={{ borderTop: `3px solid ${st.color}` }}>
      <div className="sc-top">
        <div>
          <div className="sc-name">{soc.name}</div>
          <div className="sc-cif">{soc.cif}</div>
        </div>
        <Pill bg={st.bg} fg={st.fg} dot={st.color} style={{ flex: 'none' }}>{st.label}</Pill>
      </div>
      <div className="sc-meta">
        <Icon name="users" size={14} color="var(--text-dim)" />{soc.admin}
      </div>
      <div className="sc-next">
        <Icon name="clock" size={14} color="var(--text-faint)" />
        {nextTask
          ? <span>Próximo: <span style={{ color: 'var(--text-mid)' }}>{nextTask.type}</span> · {fmtDate(nextTask.d instanceof Date ? nextTask.d : new Date(nextTask.d))}</span>
          : <span>Sin tareas pendientes</span>}
      </div>
      <div className="sc-prog">
        <div className="sc-prog-head">
          <span className="muted">Tareas completadas</span>
          <span style={{ fontWeight: 700 }}>{done}/{soc.tasks.length}</span>
        </div>
        <ProgressBar value={done} max={soc.tasks.length} color={st.color} />
      </div>
    </div>
  );
}

export default function Corporate({
  societies,
  events,
  onEventClick,
  onOpenSoc,
  openSoc,
  onClosePanel,
  empty,
}) {
  const [filter, setFilter] = useState('todas');
  const corpEvents = events.filter((e) => e.kind === 'corp');

  const filtered = filter === 'todas' ? societies : societies.filter((s) => s.status === filter);
  const counts = {
    todas: societies.length,
    urgente: societies.filter((s) => s.status === 'urgente').length,
    atencion: societies.filter((s) => s.status === 'atencion').length,
    aldia: societies.filter((s) => s.status === 'aldia').length,
  };

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="page-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 9, height: 9, borderRadius: 3, background: 'var(--corp)', display: 'inline-block' }} />
            Secretaría Corporativa
          </div>
          <div className="page-sub">
            {societies.length} sociedades en seguimiento · {counts.urgente} urgente · {counts.atencion} requieren atención
          </div>
        </div>
        <div className="spacer" />
        <button className="btn btn-primary"><Icon name="plus" size={15} />Nueva sociedad</button>
      </div>

      {empty ? (
        <div className="empty-state card">
          <div className="empty-art"><Icon name="building" size={36} /></div>
          <div className="empty-title">Aún no hay sociedades</div>
          <div className="empty-sub">
            Añade una sociedad para llevar el control de actas, cargos, inscripciones y depósitos de cuentas, con avisos en el calendario unificado.
          </div>
          <button className="btn btn-primary"><Icon name="plus" size={15} />Añadir primera sociedad</button>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: 18 }}>
            <UnifiedCalendar
              events={corpEvents}
              onEventClick={onEventClick}
              title="Vencimientos corporativos"
              defaultView="mes"
              showLegend={false}
            />
          </div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
            {[['todas', 'Todas'], ['urgente', 'Urgentes'], ['atencion', 'Atención'], ['aldia', 'Al día']].map(([k, lbl]) => (
              <button
                key={k}
                className={'btn ' + (filter === k ? 'btn-primary' : 'btn-ghost')}
                onClick={() => setFilter(k)}
              >
                {lbl} <span style={{ opacity: .7, fontWeight: 700 }}>{counts[k]}</span>
              </button>
            ))}
          </div>

          <div className="soc-grid">
            {filtered.map((s) => (
              <SocietyCard key={s.id} soc={s} onClick={() => onOpenSoc(s)} />
            ))}
          </div>
        </>
      )}

      <SocietyPanel soc={openSoc} open={!!openSoc} onClose={onClosePanel} />
    </div>
  );
}
