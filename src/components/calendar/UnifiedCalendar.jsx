import { useState } from 'react';
import Icon from '../common/Icon';
import { TODAY, MESES, MESES_LARGO, DOW, sameDay, startOfWeek, addDays } from '../../utils/dateUtils';

function eventsForDay(events, day) {
  return events
    .filter((e) => sameDay(e.date, day))
    .sort((a, b) => (a.kind > b.kind ? 1 : -1));
}

function MonthGrid({ cursor, events, onEventClick }) {
  const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const startWd = (first.getDay() + 6) % 7;
  const gridStart = addDays(first, -startWd);
  const cells = Array.from({ length: 42 }, (_, i) => addDays(gridStart, i));
  const usedCells = cells.filter((d, i) => {
    if (i < 35) return true;
    return cells.slice(35).some((c) => c.getMonth() === cursor.getMonth());
  });

  return (
    <div className="cal-grid">
      {DOW.map((d) => <div className="cal-dow" key={d}>{d}</div>)}
      {usedCells.map((day, i) => {
        const inMonth = day.getMonth() === cursor.getMonth();
        const today = sameDay(day, TODAY);
        const dayEvents = eventsForDay(events, day);
        const shown = dayEvents.slice(0, 3);
        const extra = dayEvents.length - shown.length;
        return (
          <div key={i} className={'cal-cell' + (inMonth ? '' : ' muted-cell') + (today ? ' today' : '')}>
            <div className="cal-daynum">{day.getDate()}</div>
            <div className="cal-events">
              {shown.map((ev) => (
                <div
                  key={ev.id}
                  className={'cal-ev ' + ev.kind}
                  onClick={() => onEventClick(ev)}
                  title={ev.title + ' — ' + ev.refName}
                >
                  <i className="evdot" style={{ background: ev.kind === 'mna' ? 'var(--mna)' : 'var(--corp)' }} />
                  <span className="evtxt">{ev.title}</span>
                </div>
              ))}
              {extra > 0 && (
                <div className="cal-more" onClick={() => onEventClick(dayEvents[shown.length])}>
                  +{extra} más
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function WeekStrip({ cursor, events, onEventClick }) {
  const start = startOfWeek(cursor);
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));

  return (
    <div className="weekstrip">
      {days.map((day, i) => {
        const today = sameDay(day, TODAY);
        const dayEvents = eventsForDay(events, day);
        return (
          <div key={i} className={'wcol' + (today ? ' today' : '')}>
            <div className="wcol-head">
              <span className="wcol-dow">{DOW[i]}</span>
              <span className="wcol-num">{day.getDate()}</span>
            </div>
            <div className="wcol-events">
              {dayEvents.map((ev) => (
                <div key={ev.id} className={'wev ' + ev.kind} onClick={() => onEventClick(ev)}>
                  {ev.time && <div className="wev-time">{ev.time}</div>}
                  <div>{ev.title}</div>
                </div>
              ))}
              {dayEvents.length === 0 && (
                <div style={{ fontSize: 11, color: 'var(--text-faint)', paddingTop: 4 }}>—</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function UnifiedCalendar({
  events,
  onEventClick,
  showLegend = true,
  defaultView = 'mes',
  allowMonth = true,
  title,
}) {
  const [view, setView] = useState(defaultView);
  const [cursor, setCursor] = useState(new Date(TODAY));
  const isMonth = view === 'mes' && allowMonth;

  const step = (dir) => {
    setCursor((c) => {
      const x = new Date(c);
      if (isMonth) x.setMonth(x.getMonth() + dir);
      else x.setDate(x.getDate() + dir * 7);
      return x;
    });
  };

  const label = isMonth
    ? `${MESES_LARGO[cursor.getMonth()]} ${cursor.getFullYear()}`
    : (() => {
        const s = startOfWeek(cursor);
        const e = addDays(s, 6);
        return s.getMonth() === e.getMonth()
          ? `${s.getDate()}–${e.getDate()} ${MESES[s.getMonth()]}`
          : `${s.getDate()} ${MESES[s.getMonth()]} – ${e.getDate()} ${MESES[e.getMonth()]}`;
      })();

  return (
    <div className="card card-pad fade-up">
      <div className="cal-toolbar">
        {title && (
          <div className="card-title" style={{ marginRight: 6 }}>
            <Icon name="calendar" size={17} />{title}
          </div>
        )}
        <button className="navbtn" onClick={() => step(-1)} aria-label="Anterior">
          <Icon name="chevronLeft" size={16} />
        </button>
        <button className="navbtn" onClick={() => step(1)} aria-label="Siguiente">
          <Icon name="chevronRight" size={16} />
        </button>
        <div className="cal-month">{label}</div>
        <button className="btn btn-ghost" style={{ padding: '6px 12px' }} onClick={() => setCursor(new Date(TODAY))}>
          Hoy
        </button>
        <div className="spacer" />
        {showLegend && (
          <div className="legend">
            <span><i style={{ background: 'var(--mna)' }} />M&A</span>
            <span><i style={{ background: 'var(--corp)' }} />Corporate</span>
          </div>
        )}
        {allowMonth && (
          <div className="seg">
            <button className={view === 'semana' ? 'on' : ''} onClick={() => setView('semana')}>Semana</button>
            <button className={view === 'mes' ? 'on' : ''} onClick={() => setView('mes')}>Mes</button>
          </div>
        )}
      </div>
      {isMonth
        ? <MonthGrid cursor={cursor} events={events} onEventClick={onEventClick} />
        : <WeekStrip cursor={cursor} events={events} onEventClick={onEventClick} />}
    </div>
  );
}
