import { useState, useEffect } from 'react';
import Dashboard from './components/dashboard/Dashboard';
import MnaTracker from './components/mna/MnaTracker';
import Corporate from './components/corporate/Corporate';
import EventDetail from './components/calendar/EventDetail';
import Toast from './components/common/Toast';
import Icon from './components/common/Icon';
import { subscribeDeals, subscribeSocieties, seedIfEmpty } from './firebase/db';
import { buildEvents } from './utils/dateUtils';
import { ALERTS, SEED_DEALS, SEED_SOCIETIES } from './data/seedData';

const NAV = [
  { id: 'dashboard', label: 'Panel', icon: 'dashboard' },
  { id: 'mna', label: 'M&A', icon: 'handshake' },
  { id: 'corporate', label: 'Corporate', icon: 'building' },
];

const FIREBASE_CONFIGURED = !!(
  import.meta.env.VITE_FIREBASE_API_KEY &&
  import.meta.env.VITE_FIREBASE_PROJECT_ID
);

export default function App() {
  const [route, setRoute] = useState('dashboard');
  const [deals, setDeals] = useState(FIREBASE_CONFIGURED ? [] : SEED_DEALS);
  const [societies, setSocieties] = useState(FIREBASE_CONFIGURED ? [] : SEED_SOCIETIES);
  const [loading, setLoading] = useState(FIREBASE_CONFIGURED);
  const [syncError, setSyncError] = useState(!FIREBASE_CONFIGURED);
  const [toast, setToast] = useState(null);
  const [eventDetail, setEventDetail] = useState(null);
  const [openDeal, setOpenDeal] = useState(null);
  const [openSoc, setOpenSoc] = useState(null);

  useEffect(() => {
    if (!FIREBASE_CONFIGURED) return;

    let unsubDeals, unsubSocs;

    // Fallback: if Firebase doesn't respond in 6s, use local data
    const timeout = setTimeout(() => {
      console.warn('Firebase timeout — using local data');
      setSyncError(true);
      setDeals(SEED_DEALS);
      setSocieties(SEED_SOCIETIES);
      setLoading(false);
    }, 15000);

    seedIfEmpty()
      .then(() => {
        unsubDeals = subscribeDeals((data) => {
          clearTimeout(timeout);
          setDeals(data);
          setLoading(false);
        });
        unsubSocs = subscribeSocieties((data) => {
          setSocieties(data);
        });
      })
      .catch((err) => {
        clearTimeout(timeout);
        console.error('Firebase error:', err);
        setSyncError(true);
        setDeals(SEED_DEALS);
        setSocieties(SEED_SOCIETIES);
        setLoading(false);
      });

    return () => {
      clearTimeout(timeout);
      unsubDeals?.();
      unsubSocs?.();
    };
  }, []);

  const events = buildEvents(deals, societies);

  const openEventRef = (ev) => {
    setEventDetail(null);
    if (ev.kind === 'mna') {
      const d = deals.find((x) => x.id === ev.ref);
      setRoute('mna');
      setTimeout(() => setOpenDeal(d), 60);
    } else {
      const s = societies.find((x) => x.id === ev.ref);
      setRoute('corporate');
      setTimeout(() => setOpenSoc(s), 60);
    }
  };

  const openAlert = (a) => {
    if (a.module === 'mna') {
      const d = deals.find((x) => x.id === a.ref);
      setRoute('mna');
      setTimeout(() => setOpenDeal(d), 60);
    } else {
      const s = societies.find((x) => x.id === a.ref);
      setRoute('corporate');
      setTimeout(() => setOpenSoc(s), 60);
    }
  };

  const go = (r) => { setRoute(r); window.scrollTo({ top: 0 }); };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <div style={{ color: 'var(--text-dim)', fontSize: 14 }}>Cargando DealDesk...</div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">D</div>
          <b>DealDesk</b>
          <span style={{ fontWeight: 500 }}>·</span>
          <span>Despacho</span>
        </div>
        <nav className="nav">
          {NAV.map((n) => (
            <button
              key={n.id}
              className={'nav-link' + (route === n.id ? ' active' : '')}
              onClick={() => go(n.id)}
            >
              <span className="ico"><Icon name={n.icon} size={17} /></span>{n.label}
            </button>
          ))}
        </nav>
        <div className="topbar-right">
          <div className="sync-indicator">
            <span className={'sync-dot' + (syncError ? ' syncing' : '')} />
            <span>{syncError ? 'Modo local' : 'Sincronizado'}</span>
          </div>
          <button className="iconbtn" onClick={() => setToast('Buscar — próximamente')} aria-label="Buscar">
            <Icon name="search" size={18} />
          </button>
          <button className="iconbtn" onClick={() => setToast('3 notificaciones nuevas')} aria-label="Notificaciones">
            <Icon name="bell" size={18} />
            <span className="dot" />
          </button>
          <div className="user-chip">
            <div style={{ textAlign: 'right' }}>
              <div className="uname">Marta Ruiz</div>
              <div className="urole">Socia · M&A</div>
            </div>
            <div className="avatar">MR</div>
          </div>
        </div>
      </header>

      {route === 'dashboard' && (
        <Dashboard
          deals={deals}
          societies={societies}
          events={events}
          onEventClick={setEventDetail}
          onOpenAlert={openAlert}
          empty={false}
        />
      )}
      {route === 'mna' && (
        <MnaTracker
          deals={deals}
          cardStyle="a"
          events={events}
          onEventClick={setEventDetail}
          onOpenDeal={setOpenDeal}
          openDeal={openDeal}
          onClosePanel={() => setOpenDeal(null)}
          empty={false}
        />
      )}
      {route === 'corporate' && (
        <Corporate
          societies={societies}
          events={events}
          onEventClick={setEventDetail}
          onOpenSoc={setOpenSoc}
          openSoc={openSoc}
          onClosePanel={() => setOpenSoc(null)}
          empty={false}
        />
      )}

      {eventDetail && (
        <EventDetail ev={eventDetail} onClose={() => setEventDetail(null)} onOpenRef={openEventRef} />
      )}

      <nav className="mobnav">
        {NAV.map((n) => (
          <a key={n.id} className={route === n.id ? 'active' : ''} onClick={() => go(n.id)}>
            <Icon name={n.icon} size={20} />{n.label}
          </a>
        ))}
      </nav>

      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
    </div>
  );
}
