export const TODAY = new Date();

export const MESES = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
export const MESES_LARGO = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
export const DOW = ["lun","mar","mié","jue","vie","sáb","dom"];

export const fmtDate = (d) => `${d.getDate()} ${MESES[d.getMonth()]}`;
export const sameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
export const startOfWeek = (d) => {
  const x = new Date(d);
  const wd = (x.getDay() + 6) % 7;
  x.setDate(x.getDate() - wd);
  x.setHours(0, 0, 0, 0);
  return x;
};
export const addDays = (d, n) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};
export const daysUntil = (d) => {
  const t = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate());
  const target = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  return Math.round((target - t) / 86400000);
};

export function buildEvents(deals, societies) {
  const evs = [];
  deals.forEach((deal) => {
    (deal.deadlines || []).forEach((dl, i) => {
      const date = dl.d instanceof Date ? dl.d : new Date(dl.d);
      evs.push({
        id: deal.id + '-d' + i,
        date,
        title: dl.title,
        kind: 'mna',
        ref: deal.id,
        refName: deal.name,
        sub: dl.sub,
        urgency: deal.urgency,
        time: i === 0 ? null : '10:00',
      });
    });
  });
  societies.forEach((soc) => {
    (soc.events || []).forEach((ev, i) => {
      const date = ev.d instanceof Date ? ev.d : new Date(ev.d);
      evs.push({
        id: soc.id + '-e' + i,
        date,
        title: ev.title,
        kind: 'corp',
        ref: soc.id,
        refName: soc.name,
        sub: ev.type,
        urgency: soc.status === 'urgente' ? 'red' : soc.status === 'atencion' ? 'amber' : 'green',
        time: null,
      });
    });
  });
  return evs;
}
