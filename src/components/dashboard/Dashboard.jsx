import Icon from '../common/Icon';
import { DonutChart, BarChart } from '../charts/Charts';
import UnifiedCalendar from '../calendar/UnifiedCalendar';
import { PHASES, ALERTS } from '../../data/seedData';
import { MESES, MESES_LARGO, daysUntil, TODAY } from '../../utils/dateUtils';

function StatCard({ label, value, meta, icon, accent, ico_bg, ico_fg, delay = 0 }) {
  return (
    <div className="card stat fade-up" style={{ animationDelay: delay + 'ms' }}>
      <div className="stat-accent" style={{ background: accent }} />
      <div className="stat-ico" style={{ background: ico_bg, color: ico_fg }}>
        <Icon name={icon} size={19} />
      </div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-meta">{meta}</div>
    </div>
  );
}

function DashboardEmpty() {
  return (
    <div className="page">
      <div className="page-head"><div className="page-title">Panel de control</div></div>
      <div className="empty-state card">
        <div className="empty-art"><Icon name="dashboard" size={36} /></div>
        <div className="empty-title">Tu panel está listo para empezar</div>
        <div className="empty-sub">
          Añade tu primera operación de M&A o una sociedad en seguimiento y verás aquí el calendario unificado, los gráficos y las alertas de toda tu práctica.
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
          <button className="btn btn-primary"><Icon name="plus" size={15} />Nuevo deal</button>
          <button className="btn btn-ghost"><Icon name="plus" size={15} />Nueva sociedad</button>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard({ deals, societies, events, onEventClick, onOpenAlert, empty }) {
  if (empty) return <DashboardEmpty />;

  const active = deals.filter((d) => d.phase !== 'fin');

  const donutData = PHASES.filter((p) => p.id !== 'fin').map((p) => ({
    name: p.name,
    value: deals.filter((d) => d.phase === p.id).length,
    color: p.color,
  })).filter((d) => d.value > 0);

  const allTasks = societies.flatMap((s) => s.tasks);
  const barData = [
    { label: 'Pendiente', value: allTasks.filter((t) => t.status === 'Pendiente').length, color: '#6b7280' },
    { label: 'En curso', value: allTasks.filter((t) => t.status === 'En curso').length, color: 'var(--mna)' },
    { label: 'Completado', value: allTasks.filter((t) => t.status === 'Completado').length, color: 'var(--ok)' },
  ];

  const todayStr = `${['lunes','martes','miércoles','jueves','viernes','sábado','domingo'][(new Date().getDay() + 6) % 7]}, ${TODAY.getDate()} de ${MESES_LARGO[TODAY.getMonth()]} de ${TODAY.getFullYear()}`;

  const urgentCount = ALERTS.filter((a) => a.level === 'red').length;

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="page-title">Buenos días, Marta</div>
          <div className="page-sub">
            {todayStr.charAt(0).toUpperCase() + todayStr.slice(1)} · {urgentCount} asuntos requieren tu atención hoy
          </div>
        </div>
      </div>

      <div className="stats">
        <StatCard
          label="Operaciones M&A activas" value={active.length} icon="handshake"
          accent="var(--mna)" ico_bg="var(--mna-soft)" ico_fg="#bcd4ff" delay={0}
          meta={
            <><Icon name="trending" size={13} color="var(--ok)" />
              <span style={{ color: 'var(--text-mid)' }}>
                {deals.filter((d) => ['firma', 'closing'].includes(d.phase)).length} en fase de firma o closing
              </span></>
          }
        />
        <StatCard
          label="Sociedades en seguimiento" value={societies.length} icon="building"
          accent="var(--corp)" ico_bg="var(--corp-soft)" ico_fg="#f6cd83" delay={60}
          meta={
            <><span className="pdot" style={{ width: 7, height: 7, borderRadius: 9, background: 'var(--danger)', display: 'inline-block' }} />
              <span style={{ color: 'var(--text-mid)' }}>
                {societies.filter((s) => s.status === 'urgente').length} urgente · {societies.filter((s) => s.status === 'atencion').length} requieren atención
              </span></>
          }
        />
        <StatCard
          label="Próximo deadline"
          value={events.filter((e) => daysUntil(e.date) >= 0).sort((a, b) => a.date - b.date)[0]?.refName || '—'}
          icon="clock"
          accent="var(--danger)" ico_bg="var(--danger-soft)" ico_fg="#fca5a5" delay={120}
          meta={
            <><Icon name="calendar" size={13} color="var(--danger)" />
              <span style={{ color: 'var(--text-mid)' }}>
                {(() => {
                  const next = events.filter((e) => daysUntil(e.date) >= 0).sort((a, b) => a.date - b.date)[0];
                  return next ? `${next.title} · ${next.date.getDate()} ${MESES[next.date.getMonth()]}` : 'Sin deadlines próximos';
                })()}
              </span></>
          }
        />
      </div>

      <UnifiedCalendar events={events} onEventClick={onEventClick} title="Calendario unificado" defaultView="mes" />

      <div className="dash-charts">
        <div className="card card-pad fade-up">
          <div className="card-title" style={{ marginBottom: 18 }}>
            <Icon name="layers" size={17} />Operaciones M&A por fase
          </div>
          <DonutChart data={donutData} />
        </div>
        <div className="card card-pad fade-up">
          <div className="card-title" style={{ marginBottom: 8 }}>
            <Icon name="list" size={17} />Tareas corporativas por estado
          </div>
          <div className="page-sub" style={{ marginBottom: 14 }}>
            Agregado de las {societies.length} sociedades
          </div>
          <BarChart data={barData} />
        </div>
      </div>

      <div className="dash-lower">
        <div className="card card-pad fade-up">
          <div className="card-title" style={{ marginBottom: 4 }}>
            <Icon name="alert" size={17} color="var(--danger)" />Alertas y urgencias
          </div>
          <div className="page-sub" style={{ marginBottom: 16 }}>
            Los {ALERTS.length} asuntos más críticos entre ambos módulos
          </div>
          <div className="alerts">
            {ALERTS.map((a, i) => (
              <div key={i} className={'alert ' + a.level} onClick={() => onOpenAlert(a)}>
                <div className="a-ico" style={{
                  background: a.level === 'red' ? 'var(--danger-soft)' : 'var(--warn-soft)',
                  color: a.level === 'red' ? '#fca5a5' : '#fbd38d',
                }}>
                  <Icon name={a.level === 'red' ? 'alert' : 'clock'} size={16} />
                </div>
                <div className="a-main">
                  <div className="a-title">{a.title}</div>
                  <div className="a-sub">{a.sub}</div>
                </div>
                <span className="a-tag" style={{
                  background: a.tag === 'M&A' ? 'var(--mna-soft)' : 'var(--corp-soft)',
                  color: a.tag === 'M&A' ? '#bcd4ff' : '#f6cd83',
                }}>{a.tag}</span>
                <div className="a-when" style={{ color: a.level === 'red' ? 'var(--danger)' : 'var(--warn)' }}>
                  {a.when}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card card-pad fade-up">
          <div className="card-title" style={{ marginBottom: 16 }}>
            <Icon name="calendar" size={17} />Próximos hitos
          </div>
          <div>
            {[...events]
              .filter((e) => daysUntil(e.date) >= 0)
              .sort((a, b) => a.date - b.date)
              .slice(0, 5)
              .map((ev) => (
                <div key={ev.id} className="deadrow" onClick={() => onEventClick(ev)} style={{ cursor: 'pointer' }}>
                  <div className="dr-date">
                    <div className="dr-d" style={{ color: ev.kind === 'mna' ? 'var(--mna)' : 'var(--corp)' }}>
                      {ev.date.getDate()}
                    </div>
                    <div className="dr-m">{MESES[ev.date.getMonth()]}</div>
                  </div>
                  <div className="dr-main">
                    <div className="dr-title">{ev.title}</div>
                    <div className="dr-sub">{ev.refName}</div>
                  </div>
                  <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--text-dim)', whiteSpace: 'nowrap' }}>
                    {daysUntil(ev.date) === 0 ? 'Hoy' : 'en ' + daysUntil(ev.date) + 'd'}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
