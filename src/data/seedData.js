const D = (y, m, d) => new Date(y, m, d);

export const PHASES = [
  { id: 'dd',      name: 'Due Diligence',   color: '#3b82f6' },
  { id: 'nego',    name: 'Negociación',     color: '#8b5cf6' },
  { id: 'firma',   name: 'Firma (SPA/APA)', color: '#06b6d4' },
  { id: 'closing', name: 'Closing',         color: '#10b981' },
  { id: 'post',    name: 'Post-closing',    color: '#f59e0b' },
  { id: 'pausa',   name: 'En pausa',        color: '#6b7280' },
  { id: 'fin',     name: 'Finalizado',      color: '#22c55e' },
];

export const ROLES = {
  comprador: { label: 'Asesor comprador', bg: 'rgba(59,130,246,.16)',  fg: '#bcd4ff' },
  vendedor:  { label: 'Asesor vendedor',  bg: 'rgba(139,92,246,.16)',  fg: '#d4c4ff' },
  dd:        { label: 'Solo DD',          bg: 'rgba(148,163,184,.15)', fg: '#cbd5e1' },
};

export const SOC_STATUS = {
  aldia:    { label: 'Al día',             color: 'var(--ok)',     bg: 'var(--ok-soft)',     fg: '#86efac' },
  atencion: { label: 'Atención requerida', color: 'var(--warn)',   bg: 'var(--warn-soft)',   fg: '#fbd38d' },
  urgente:  { label: 'Urgente',            color: 'var(--danger)', bg: 'var(--danger-soft)', fg: '#fca5a5' },
};

export const TASK_STATUS = {
  Pendiente:  { color: 'var(--text-dim)', bg: 'var(--surface-3)', fg: '#aeb6c8' },
  'En curso': { color: 'var(--mna)',      bg: 'var(--mna-soft)',  fg: '#bcd4ff' },
  Completado: { color: 'var(--ok)',       bg: 'var(--ok-soft)',   fg: '#86efac' },
};

export const SEED_DEALS = [
  {
    id: 'humanis', name: 'Project Humanis', phase: 'dd', role: 'comprador', urgency: 'red',
    buyer: 'Veridian Capital Partners', seller: 'Grupo Sanitario Humanis, S.A.',
    sector: 'Healthcare / Clínicas', value: '€48M', deadline: D(2026,5,12),
    deadlineLabel: 'Cierre Data Room', checklist: { done: 4, total: 11 },
    deadlines: [
      { d: D(2026,5,12), title: 'Cierre del Data Room', sub: 'Acceso vendor-side hasta 18:00' },
      { d: D(2026,5,19), title: 'Entrega informe DD legal', sub: 'Borrador a Veridian' },
      { d: D(2026,6,3),  title: 'Q&A management session', sub: 'Sesión con dirección' },
    ],
    closing: [
      { t: 'Carta de mandato firmada', done: true },
      { t: 'NDA con vendedor', done: true },
      { t: 'Acceso al Data Room', done: true },
      { t: 'Revisión societaria', done: true },
      { t: 'Revisión laboral', done: false },
      { t: 'Revisión contractual (top 20)', done: false },
      { t: 'Análisis litigios pendientes', done: false },
      { t: 'Revisión inmobiliaria', done: false },
      { t: 'Informe preliminar DD', done: false },
      { t: 'Lista de red flags', done: false },
      { t: 'Reunión de hallazgos', done: false },
    ],
    docs: [
      { n: 'NDA_Humanis_ejecutado.pdf', m: 'PDF · 1,2 MB' },
      { n: 'Carta_mandato_Veridian.pdf', m: 'PDF · 480 KB' },
      { n: 'Índice_DataRoom_v3.xlsx', m: 'XLSX · 92 KB' },
    ],
    notes: 'Vendedor con cierta urgencia por motivos fiscales (cierre antes de fin de ejercicio). Atención a contingencias laborales en la filial de Levante.',
  },
  {
    id: 'tower', name: 'Project Tower', phase: 'nego', role: 'comprador', urgency: 'red',
    buyer: 'Northbridge Real Estate', seller: 'Inmobiliaria Castellana 200, S.L.',
    sector: 'Real Estate', value: '€72M', deadline: D(2026,5,23),
    deadlineLabel: 'Entrega markup SPA', checklist: { done: 7, total: 12 },
    deadlines: [
      { d: D(2026,5,23), title: 'Entrega markup del SPA', sub: 'Respuesta a contraparte' },
      { d: D(2026,6,1),  title: 'Sesión de negociación', sub: 'Oficinas notaría · 10:00' },
      { d: D(2026,6,15), title: 'Cláusulas de earn-out', sub: 'Cierre estructura precio' },
    ],
    closing: [
      { t: 'Term sheet firmado', done: true },
      { t: 'Estructura de la operación', done: true },
      { t: 'Borrador SPA recibido', done: true },
      { t: 'Primera ronda de comentarios', done: true },
      { t: 'Disclosure schedules', done: true },
      { t: 'Reps & warranties', done: true },
      { t: 'W&I insurance — broker', done: true },
      { t: 'Cláusulas precio / earn-out', done: false },
      { t: 'Condiciones suspensivas', done: false },
      { t: 'Garantías y avales', done: false },
      { t: 'Pacto de socios anexo', done: false },
      { t: 'Versión cuasi-final SPA', done: false },
    ],
    docs: [
      { n: 'SPA_Tower_v4_markup.docx', m: 'DOCX · 640 KB' },
      { n: 'Term_Sheet_firmado.pdf', m: 'PDF · 320 KB' },
      { n: 'Estructura_operación.pptx', m: 'PPTX · 2,1 MB' },
      { n: 'W&I_indicativa_broker.pdf', m: 'PDF · 510 KB' },
    ],
    notes: 'Punto caliente: ajuste de precio por deuda neta y working capital. Northbridge no acepta cap inferior a 15%. Coordinar con fiscal el tratamiento del earn-out.',
  },
  {
    id: 'alhambra', name: 'Project Alhambra', phase: 'firma', role: 'vendedor', urgency: 'amber',
    buyer: 'Fondo MedTech Iberia', seller: 'Familia Granados (CentralFarma)',
    sector: 'Pharma / Distribución', value: '€31M', deadline: D(2026,5,28),
    deadlineLabel: 'Firma SPA ante notario', checklist: { done: 9, total: 11 },
    deadlines: [
      { d: D(2026,5,28), title: 'Firma del SPA', sub: 'Notaría Mejías · 11:30' },
      { d: D(2026,6,5),  title: 'Notificación a CNMC', sub: 'Si aplica control concentraciones' },
    ],
    closing: [
      { t: 'SPA cerrado entre partes', done: true },
      { t: 'Disclosure letter final', done: true },
      { t: 'Certificados societarios', done: true },
      { t: 'Poderes para firma', done: true },
      { t: 'Reserva notaría', done: true },
      { t: 'Cálculo precio provisional', done: true },
      { t: 'Cuentas de garantía (escrow)', done: true },
      { t: 'Documentación condición CNMC', done: true },
      { t: 'Minuta notarial revisada', done: true },
      { t: 'Provisión de fondos', done: false },
      { t: 'Firma y elevación a público', done: false },
    ],
    docs: [
      { n: 'SPA_Alhambra_FINAL.pdf', m: 'PDF · 1,8 MB' },
      { n: 'Disclosure_Letter.pdf', m: 'PDF · 720 KB' },
      { n: 'Poderes_firma.pdf', m: 'PDF · 240 KB' },
    ],
    notes: 'Operación familiar, sensibilidad alta. El vendedor quiere que conste expresamente la permanencia del equipo directivo 24 meses.',
  },
  {
    id: 'delta', name: 'Project Delta', phase: 'firma', role: 'comprador', urgency: 'green',
    buyer: 'Aurelia Industrial, S.A.', seller: 'Mecanizados del Norte, S.L.',
    sector: 'Industrial / Manufacturing', value: '€19M', deadline: D(2026,6,9),
    deadlineLabel: 'Bring-down due diligence', checklist: { done: 6, total: 9 },
    deadlines: [
      { d: D(2026,6,9),  title: 'Bring-down DD', sub: 'Confirmación sin cambios materiales' },
      { d: D(2026,6,18), title: 'Firma prevista', sub: 'Pendiente confirmar notaría' },
    ],
    closing: [
      { t: 'DD confirmatoria', done: true },
      { t: 'SPA negociado', done: true },
      { t: 'Estructura de financiación', done: true },
      { t: 'Compromiso bancario', done: true },
      { t: 'Disclosure schedules', done: true },
      { t: 'Reps & warranties', done: true },
      { t: 'Bring-down DD', done: false },
      { t: 'Condiciones suspensivas', done: false },
      { t: 'Firma', done: false },
    ],
    docs: [
      { n: 'SPA_Delta_v3.docx', m: 'DOCX · 580 KB' },
      { n: 'Commitment_Letter_banco.pdf', m: 'PDF · 410 KB' },
    ],
    notes: 'Financiación bancaria confirmada. Sin incidencias relevantes en DD.',
  },
  {
    id: 'barrica', name: 'Project Barrica', phase: 'closing', role: 'vendedor', urgency: 'amber',
    buyer: 'Iberian Spirits Group', seller: 'La Barrica de Siempre, S.L.',
    sector: 'Alimentación & Bebidas', value: '€14M', deadline: D(2026,6,13),
    deadlineLabel: 'Closing & desembolso', checklist: { done: 10, total: 12 },
    deadlines: [
      { d: D(2026,6,13), title: 'Closing', sub: 'Desembolso y entrega de acciones' },
      { d: D(2026,6,16), title: 'Comunicación a empleados', sub: 'Post-signing' },
    ],
    closing: [
      { t: 'SPA firmado', done: true },
      { t: 'Condiciones suspensivas cumplidas', done: true },
      { t: 'Autorización CNMC', done: true },
      { t: 'Certificado de cargas', done: true },
      { t: 'Cancelación garantías existentes', done: true },
      { t: 'Escrow constituido', done: true },
      { t: 'Cálculo precio definitivo', done: true },
      { t: 'Funds flow memorandum', done: true },
      { t: 'Resoluciones del órgano', done: true },
      { t: 'Title transfer documents', done: true },
      { t: 'Provisión de fondos confirmada', done: false },
      { t: 'Closing & firma actas', done: false },
    ],
    docs: [
      { n: 'Funds_Flow_Memo.xlsx', m: 'XLSX · 88 KB' },
      { n: 'Closing_Checklist.pdf', m: 'PDF · 360 KB' },
      { n: 'Autorización_CNMC.pdf', m: 'PDF · 1,1 MB' },
    ],
    notes: 'Closing simultáneo. Confirmar con banco la valuta del desembolso para evitar desfase.',
  },
  {
    id: 'modellica', name: 'Project Modellica', phase: 'post', role: 'comprador', urgency: 'green',
    buyer: 'TechBridge Ventures', seller: 'GDS-Modellica, S.L.',
    sector: 'Software / SaaS', value: '€26M', deadline: D(2026,6,30),
    deadlineLabel: 'Integración post-closing', checklist: { done: 5, total: 8 },
    deadlines: [
      { d: D(2026,6,30), title: 'Cierre ajuste de precio', sub: 'Working capital definitivo' },
      { d: D(2026,7,15), title: 'Liberación 1er tramo escrow', sub: 'Según calendario' },
    ],
    closing: [
      { t: 'Closing ejecutado', done: true },
      { t: 'Inscripción cambio titularidad', done: true },
      { t: 'Comunicaciones a terceros', done: true },
      { t: 'Plan de integración', done: true },
      { t: 'Ajuste working capital — borrador', done: true },
      { t: 'Ajuste working capital — cierre', done: false },
      { t: 'Liberación tramos escrow', done: false },
      { t: 'Cierre garantías W&I', done: false },
    ],
    docs: [
      { n: 'Closing_Memorandum.pdf', m: 'PDF · 920 KB' },
      { n: 'Plan_integración.pptx', m: 'PPTX · 3,4 MB' },
    ],
    notes: 'Pendiente únicamente el ajuste final de precio. Relación con vendedor muy buena.',
  },
  {
    id: 'atlas', name: 'Project Atlas', phase: 'pausa', role: 'dd', urgency: 'amber',
    buyer: 'Cliente confidencial', seller: 'Logística Atlas Sur, S.A.',
    sector: 'Logística / Transporte', value: '€38M', deadline: D(2026,6,25),
    deadlineLabel: 'Reactivación prevista', checklist: { done: 3, total: 10 },
    deadlines: [
      { d: D(2026,6,25), title: 'Decisión de reactivación', sub: 'El cliente revisa apetito' },
    ],
    closing: [
      { t: 'Encargo de DD legal', done: true },
      { t: 'Acceso parcial al Data Room', done: true },
      { t: 'Revisión preliminar societaria', done: true },
      { t: 'Resto de áreas DD', done: false },
      { t: 'Informe DD', done: false },
    ],
    docs: [
      { n: 'Encargo_DD_Atlas.pdf', m: 'PDF · 290 KB' },
    ],
    notes: 'EN PAUSA a petición del cliente — pendiente de claridad sobre financiación del comprador. Mantener acceso al Data Room activo.',
  },
  {
    id: 'mistral', name: 'Project Mistral', phase: 'fin', role: 'vendedor', urgency: 'green',
    buyer: 'Solaris Energy Holding', seller: 'Parques Eólicos Mistral, S.L.',
    sector: 'Energía / Renovables', value: '€55M', deadline: D(2026,4,28),
    deadlineLabel: 'Operación cerrada', checklist: { done: 14, total: 14 },
    deadlines: [
      { d: D(2026,4,28), title: 'Closing completado', sub: 'Operación finalizada' },
    ],
    closing: [
      { t: 'SPA firmado', done: true },
      { t: 'Condiciones suspensivas', done: true },
      { t: 'Closing', done: true },
      { t: 'Inscripción registral', done: true },
      { t: 'Liquidación de honorarios', done: true },
    ],
    docs: [
      { n: 'Closing_Memorandum_Mistral.pdf', m: 'PDF · 1,4 MB' },
      { n: 'Factura_honorarios.pdf', m: 'PDF · 120 KB' },
    ],
    notes: 'Operación cerrada con éxito. Archivar expediente.',
  },
];

export const SEED_SOCIETIES = [
  {
    id: 'greenpark', name: 'Greenpark Retiro, S.L.', cif: 'B-87654321', status: 'urgente',
    address: 'C/ Alcalá 142, 28009 Madrid', admin: 'Consejo de Administración', secretary: 'L. Vidal Soler (no consejero)',
    tasks: [
      { type: 'Depósito cuentas', status: 'Pendiente', d: D(2026,6,12), notes: 'Ejercicio 2025 — plazo improrrogable' },
      { type: 'Acta Junta', status: 'En curso', d: D(2026,6,15), notes: 'Aprobación cuentas anuales' },
      { type: 'Inscripción RM', status: 'Pendiente', d: D(2026,6,22), notes: 'Cambio domicilio social' },
    ],
    events: [
      { d: D(2026,6,12), title: 'Límite depósito de cuentas', kind: 'corp', type: 'Depósito cuentas' },
      { d: D(2026,6,15), title: 'Junta General Ordinaria', kind: 'corp', type: 'Acta Junta' },
    ],
    docs: [{ n: 'Cuentas_anuales_2025.pdf', m: 'PDF · 2,3 MB' }, { n: 'Escritura_constitución.pdf', m: 'PDF · 4,1 MB' }],
    notes: 'URGENTE: el depósito de cuentas vence el 12/06. Confirmar firma del administrador esta semana.',
  },
  {
    id: 'centralfarma', name: 'CentralFarma, S.L.', cif: 'B-12398745', status: 'atencion',
    address: 'Avda. Diagonal 405, 08008 Barcelona', admin: 'Admin. solidarios (2)', secretary: '—',
    tasks: [
      { type: 'Renovación cargo', status: 'En curso', d: D(2026,6,18), notes: 'Renovación administrador solidario' },
      { type: 'Acta Consejo', status: 'Pendiente', d: D(2026,6,26), notes: 'Aprobación operación Alhambra' },
    ],
    events: [
      { d: D(2026,6,18), title: 'Caducidad cargo administrador', kind: 'corp', type: 'Renovación cargo' },
      { d: D(2026,6,26), title: 'Consejo extraordinario', kind: 'corp', type: 'Acta Consejo' },
    ],
    docs: [{ n: 'Estatutos_vigentes.pdf', m: 'PDF · 1,9 MB' }, { n: 'Nombramientos_2022.pdf', m: 'PDF · 540 KB' }],
    notes: 'Vinculada a Project Alhambra. Coordinar la renovación del cargo antes de la firma del SPA.',
  },
  {
    id: 'barrica-soc', name: 'La Barrica de Siempre, S.L.', cif: 'B-45612378', status: 'atencion',
    address: 'C/ Logroño 28, 26001 Logroño', admin: 'Administrador único', secretary: '—',
    tasks: [
      { type: 'Elevar a público', status: 'En curso', d: D(2026,6,13), notes: 'Acuerdos de venta — closing' },
      { type: 'Poder', status: 'Pendiente', d: D(2026,6,16), notes: 'Poder para representación post-venta' },
    ],
    events: [
      { d: D(2026,6,13), title: 'Elevación a público acuerdos', kind: 'corp', type: 'Elevar a público' },
    ],
    docs: [{ n: 'Libro_actas.pdf', m: 'PDF · 3,2 MB' }],
    notes: 'Sociedad objeto de Project Barrica. Coordinar elevación a público con el closing del 13/06.',
  },
  {
    id: 'modellica-soc', name: 'GDS-Modellica, S.L.', cif: 'B-99001122', status: 'aldia',
    address: 'Parque Tecnológico, Ed. 3, 41092 Sevilla', admin: 'Consejo de Administración', secretary: 'M. Reyes Pérez',
    tasks: [
      { type: 'Inscripción RM', status: 'En curso', d: D(2026,6,28), notes: 'Cambio de titularidad post-closing' },
      { type: 'Acta Consejo', status: 'Completado', d: D(2026,5,20), notes: 'Aprobación de la venta' },
    ],
    events: [
      { d: D(2026,6,28), title: 'Inscripción cambio titularidad', kind: 'corp', type: 'Inscripción RM' },
    ],
    docs: [{ n: 'Acta_Consejo_venta.pdf', m: 'PDF · 680 KB' }],
    notes: 'Post-closing de Project Modellica. Todo en plazo.',
  },
  {
    id: 'olivar', name: 'Olivar del Sur Agroindustrial, S.A.', cif: 'A-23456789', status: 'aldia',
    address: 'Ctra. Jaén km 12, 23700 Linares', admin: 'Consejo de Administración', secretary: 'J. Romero Lara',
    tasks: [
      { type: 'Acta Consejo', status: 'Completado', d: D(2026,5,28), notes: 'Consejo ordinario Q2' },
      { type: 'Depósito cuentas', status: 'Completado', d: D(2026,5,30), notes: 'Ejercicio 2025 — presentado' },
    ],
    events: [
      { d: D(2026,7,2), title: 'Consejo de Administración Q3', kind: 'corp', type: 'Acta Consejo' },
    ],
    docs: [{ n: 'Cuentas_2025_depositadas.pdf', m: 'PDF · 2,0 MB' }],
    notes: 'Sociedad al día. Próximo hito en julio.',
  },
  {
    id: 'navarro', name: 'Bodegas Navarro Hermanos, S.L.', cif: 'B-34567812', status: 'aldia',
    address: 'Camino de la Vega s/n, 31500 Tudela', admin: 'Administrador único', secretary: '—',
    tasks: [
      { type: 'Acta Junta', status: 'Completado', d: D(2026,5,12), notes: 'Junta ordinaria' },
      { type: 'Renovación cargo', status: 'Pendiente', d: D(2026,7,10), notes: 'Renovación administrador único' },
    ],
    events: [
      { d: D(2026,7,10), title: 'Renovación administrador único', kind: 'corp', type: 'Renovación cargo' },
    ],
    docs: [{ n: 'Acta_Junta_2026.pdf', m: 'PDF · 720 KB' }],
    notes: 'Sin urgencias. Preparar renovación de cargo para julio.',
  },
];

export const ALERTS = [
  { level: 'red',   title: 'Project Humanis — cierre Data Room', sub: 'Due Diligence · vence hoy', when: 'Hoy', tag: 'M&A', module: 'mna', ref: 'humanis' },
  { level: 'red',   title: 'Greenpark Retiro — depósito de cuentas', sub: 'Plazo improrrogable', when: '12 jun', tag: 'Corp', module: 'corporate', ref: 'greenpark' },
  { level: 'red',   title: 'Project Barrica — closing & desembolso', sub: 'Confirmar provisión de fondos', when: '13 jun', tag: 'M&A', module: 'mna', ref: 'barrica' },
  { level: 'amber', title: 'La Barrica de Siempre — elevación a público', sub: 'Coordinar con closing', when: '13 jun', tag: 'Corp', module: 'corporate', ref: 'barrica-soc' },
  { level: 'amber', title: 'CentralFarma — caducidad cargo administrador', sub: 'Renovar antes de firma Alhambra', when: '18 jun', tag: 'Corp', module: 'corporate', ref: 'centralfarma' },
];
