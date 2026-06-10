import Icon from '../common/Icon';
import DealCard from './DealCard';
import DealPanel from './DealPanel';
import UnifiedCalendar from '../calendar/UnifiedCalendar';
import { PHASES } from '../../data/seedData';

function Kanban({ deals, cardStyle, onOpen }) {
  return (
    <div className="kanban">
      {PHASES.map((p) => {
        const pDeals = deals.filter((d) => d.phase === p.id);
        return (
          <div className="kcol" key={p.id}>
            <div className="kcol-head">
              <span className="kdot" style={{ background: p.color }} />
              <span className="kname">{p.name}</span>
              <span className="kcount">{pDeals.length}</span>
            </div>
            <div className={'kcol-body' + (pDeals.length === 0 ? ' empty' : '')}>
              {pDeals.length === 0
                ? <div className="kempty">Sin operaciones</div>
                : pDeals.map((d) => (
                    <DealCard key={d.id} deal={d} style={cardStyle} onClick={() => onOpen(d)} />
                  ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function MnaTracker({
  deals,
  cardStyle,
  events,
  onEventClick,
  onOpenDeal,
  openDeal,
  onClosePanel,
  empty,
}) {
  const mnaEvents = events.filter((e) => e.kind === 'mna');
  const activeDeals = deals.filter((d) => d.phase !== 'fin');

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="page-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 9, height: 9, borderRadius: 3, background: 'var(--mna)', display: 'inline-block' }} />
            M&A
          </div>
          <div className="page-sub">
            {activeDeals.length} operaciones activas · {deals.length} en total
          </div>
        </div>
        <div className="spacer" />
        <button className="btn btn-primary">
          <Icon name="plus" size={15} />Nuevo deal
        </button>
      </div>

      {empty ? (
        <div className="empty-state card">
          <div className="empty-art"><Icon name="handshake" size={36} /></div>
          <div className="empty-title">Aún no hay operaciones</div>
          <div className="empty-sub">
            Crea tu primer deal para empezar a seguir su due diligence, deadlines y closing checklist en el tablero.
          </div>
          <button className="btn btn-primary"><Icon name="plus" size={15} />Crear primer deal</button>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: 18 }}>
            <UnifiedCalendar
              events={mnaEvents}
              onEventClick={onEventClick}
              title="Semana M&A"
              defaultView="semana"
              allowMonth={false}
              showLegend={false}
            />
          </div>
          <Kanban deals={deals} cardStyle={cardStyle} onOpen={onOpenDeal} />
        </>
      )}

      <DealPanel deal={openDeal} open={!!openDeal} onClose={onClosePanel} />
    </div>
  );
}
