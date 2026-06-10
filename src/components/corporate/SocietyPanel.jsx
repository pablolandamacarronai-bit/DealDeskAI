import { useState, useEffect } from 'react';
import SlidePanel from '../common/SlidePanel';
import Icon from '../common/Icon';
import Pill from '../common/Pill';
import Accordion from '../common/Accordion';
import { SOC_STATUS, TASK_STATUS } from '../../data/seedData';
import { MESES, fmtDate, daysUntil } from '../../utils/dateUtils';
import { updateSociety } from '../../firebase/db';

export default function SocietyPanel({ soc, open, onClose }) {
  const [notes, setNotes] = useState('');
  const [taskStatuses, setTaskStatuses] = useState([]);

  useEffect(() => {
    if (soc) {
      setNotes(soc.notes || '');
      setTaskStatuses(soc.tasks.map((t) => t.status));
    }
  }, [soc]);

  if (!soc) return null;
  const st = SOC_STATUS[soc.status];

  const cycle = (i) => {
    const order = ['Pendiente', 'En curso', 'Completado'];
    setTaskStatuses((ts) => {
      const next = ts.map((s, j) => j === i ? order[(order.indexOf(s) + 1) % 3] : s);
      const updatedTasks = soc.tasks.map((t, j) => ({ ...t, status: next[j] }));
      updateSociety(soc.id, { tasks: updatedTasks }).catch(console.error);
      return next;
    });
  };

  const editNotes = (v) => {
    setNotes(v);
    updateSociety(soc.id, { notes: v }).catch(console.error);
  };

  return (
    <SlidePanel open={open} onClose={onClose}>
      <div className="panel-head">
        <div className="ph-main">
          <div className="ph-title">{soc.name}</div>
          <div className="ph-sub">
            <Pill bg={st.bg} fg={st.fg} dot={st.color}>{st.label}</Pill>
            <span>· {soc.cif}</span>
          </div>
        </div>
        <button className="panel-close" onClick={onClose}><Icon name="x" size={18} /></button>
      </div>
      <div className="panel-body">
        <Accordion icon="building" title="Datos de la sociedad" defaultOpen>
          <dl className="kv">
            <dt>Denominación</dt><dd>{soc.name}</dd>
            <dt>CIF</dt><dd>{soc.cif}</dd>
            <dt>Domicilio social</dt><dd>{soc.address}</dd>
            <dt>Órgano de admin.</dt><dd>{soc.admin}</dd>
            <dt>Secretario</dt><dd>{soc.secretary}</dd>
          </dl>
        </Accordion>

        <Accordion icon="list" title="Tareas societarias" count={taskStatuses.length} defaultOpen>
          <div className="page-sub" style={{ marginBottom: 6, paddingLeft: 0 }}>
            Pulsa el estado para avanzarlo
          </div>
          {soc.tasks.map((t, i) => {
            const status = taskStatuses[i] || t.status;
            const ts = TASK_STATUS[status];
            const d = t.d instanceof Date ? t.d : new Date(t.d);
            const dd = daysUntil(d);
            return (
              <div className="task-row" key={i}>
                <div className="dr-date" style={{ width: 52, flex: 'none', textAlign: 'center' }}>
                  <div className="dr-d" style={{ color: 'var(--corp)', fontSize: 16 }}>{d.getDate()}</div>
                  <div className="dr-m">{MESES[d.getMonth()]}</div>
                </div>
                <div className="task-main">
                  <div className="task-type">{t.type}</div>
                  <div className="task-sub">{t.notes}</div>
                </div>
                <button onClick={() => cycle(i)} title="Cambiar estado">
                  <Pill bg={ts.bg} fg={ts.fg} dot={ts.color}>{status}</Pill>
                </button>
              </div>
            );
          })}
        </Accordion>

        <Accordion icon="folder" title="Documentos" count={soc.docs.length}>
          {soc.docs.map((d, i) => (
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
            placeholder="Añade notas sobre esta sociedad..."
          />
        </Accordion>
      </div>
    </SlidePanel>
  );
}
