import { useState, useEffect } from 'react';
import SlidePanel from '../common/SlidePanel';
import Icon from '../common/Icon';
import Pill from '../common/Pill';
import ProgressBar from '../common/ProgressBar';
import Accordion from '../common/Accordion';
import { ROLES, PHASES } from '../../data/seedData';
import { MESES, fmtDate, daysUntil } from '../../utils/dateUtils';
import { updateDeal } from '../../firebase/db';

export default function DealPanel({ deal, open, onClose }) {
  const [checklist, setChecklist] = useState([]);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (deal) {
      setChecklist(deal.closing.map((c) => c.done));
      setNotes(deal.notes || '');
    }
  }, [deal]);

  if (!deal) return null;

  const toggleCheck = (i) => {
    setChecklist((cl) => {
      const next = cl.map((v, j) => (j === i ? !v : v));
      const updatedClosing = deal.closing.map((c, j) => ({ ...c, done: next[j] }));
      updateDeal(deal.id, {
        closing: updatedClosing,
        checklist: { done: next.filter(Boolean).length, total: next.length },
      }).catch(console.error);
      return next;
    });
  };

  const editNotes = (v) => {
    setNotes(v);
    updateDeal(deal.id, { notes: v }).catch(console.error);
  };

  const role = ROLES[deal.role];
  const phase = PHASES.find((p) => p.id === deal.phase);
  const doneCount = checklist.filter(Boolean).length;

  return (
    <SlidePanel open={open} onClose={onClose}>
      <div className="panel-head">
        <div className="ph-main">
          <div className="ph-title">{deal.name}</div>
          <div className="ph-sub">
            <Pill bg={role.bg} fg={role.fg}>{role.label}</Pill>
            <Pill bg="var(--surface-2)" fg="var(--text-mid)" dot={phase.color}>{phase.name}</Pill>
            <span>· {deal.sector}</span>
          </div>
        </div>
        <button className="panel-close" onClick={onClose}><Icon name="x" size={18} /></button>
      </div>
      <div className="panel-body">
        <Accordion icon="hash" title="Identificación" defaultOpen>
          <dl className="kv">
            <dt>Codename</dt><dd>{deal.name}</dd>
            <dt>Sector</dt><dd>{deal.sector}</dd>
            <dt>Valor operación</dt><dd>{deal.value}</dd>
            <dt>Rol del despacho</dt><dd>{role.label}</dd>
            <dt>Fase actual</dt><dd>{phase.name}</dd>
          </dl>
        </Accordion>

        <Accordion icon="users" title="Partes" defaultOpen>
          <dl className="kv">
            <dt>Comprador</dt><dd>{deal.buyer}</dd>
            <dt>Vendedor</dt><dd>{deal.seller}</dd>
          </dl>
        </Accordion>

        <Accordion icon="calendar" title="Deadlines clave" count={deal.deadlines.length} defaultOpen>
          {deal.deadlines.map((dl, i) => {
            const d = dl.d instanceof Date ? dl.d : new Date(dl.d);
            const dd = daysUntil(d);
            return (
              <div className="deadrow" key={i}>
                <div className="dr-date">
                  <div className="dr-d" style={{ color: 'var(--mna)' }}>{d.getDate()}</div>
                  <div className="dr-m">{MESES[d.getMonth()]}</div>
                </div>
                <div className="dr-main">
                  <div className="dr-title">{dl.title}</div>
                  <div className="dr-sub">{dl.sub}</div>
                </div>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: dd < 0 ? 'var(--text-dim)' : dd <= 3 ? 'var(--danger)' : 'var(--text-dim)', whiteSpace: 'nowrap' }}>
                  {dd === 0 ? 'Hoy' : dd < 0 ? 'Pasado' : 'en ' + dd + 'd'}
                </div>
              </div>
            );
          })}
        </Accordion>

        <Accordion icon="check" title="Closing checklist" count={`${doneCount}/${checklist.length}`} defaultOpen>
          <div style={{ marginBottom: 12 }}>
            <ProgressBar value={doneCount} max={checklist.length} color="var(--mna)" animate={false} />
          </div>
          {deal.closing.map((c, i) => (
            <div key={i} className={'check-item' + (checklist[i] ? ' is-done' : '')}>
              <div
                className={'check-box' + (checklist[i] ? ' done' : '')}
                onClick={() => toggleCheck(i)}
              >
                {checklist[i] && <Icon name="check" size={13} color="#fff" sw={3} />}
              </div>
              <span className="check-label">{c.t}</span>
            </div>
          ))}
        </Accordion>

        <Accordion icon="folder" title="Documentos clave" count={deal.docs.length}>
          {deal.docs.map((d, i) => (
            <div className="doc-item" key={i}>
              <div className="doc-ico"><Icon name="file" size={15} /></div>
              <span className="doc-name">{d.n}</span>
              <span className="doc-meta">{d.m}</span>
            </div>
          ))}
        </Accordion>

        <Accordion icon="pen" title="Notas">
          <textarea
            className="notes-field"
            value={notes}
            onChange={(e) => editNotes(e.target.value)}
            placeholder="Añade notas sobre este deal..."
          />
        </Accordion>
      </div>
    </SlidePanel>
  );
}
