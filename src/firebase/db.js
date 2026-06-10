import {
  collection, doc, getDocs, setDoc, updateDoc,
  onSnapshot, writeBatch, serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';
import { SEED_DEALS, SEED_SOCIETIES } from '../data/seedData';

// Collections
const DEALS_COL = 'deals';
const SOCIETIES_COL = 'societies';
const PREFS_COL = 'prefs';

// Serialize/deserialize Dates (Firestore stores as Timestamps)
function serializeDate(d) {
  if (d instanceof Date) return d.toISOString();
  return d;
}
function serializeDeep(obj) {
  if (obj === null || obj === undefined) return obj;
  if (obj instanceof Date) return serializeDate(obj);
  if (Array.isArray(obj)) return obj.map(serializeDeep);
  if (typeof obj === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(obj)) out[k] = serializeDeep(v);
    return out;
  }
  return obj;
}
function deserializeDate(s) {
  if (typeof s === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(s)) return new Date(s);
  if (s && typeof s.toDate === 'function') return s.toDate();
  return s;
}
function deserializeDeep(obj) {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(obj)) return deserializeDate(obj);
  if (Array.isArray(obj)) return obj.map(deserializeDeep);
  if (typeof obj === 'object' && !obj.toDate) {
    const out = {};
    for (const [k, v] of Object.entries(obj)) out[k] = deserializeDeep(v);
    return out;
  }
  if (obj && typeof obj.toDate === 'function') return obj.toDate();
  return obj;
}

// Seed initial data if collection is empty
export async function seedIfEmpty() {
  const dealsSnap = await getDocs(collection(db, DEALS_COL));
  if (!dealsSnap.empty) return;

  const batch = writeBatch(db);

  for (const deal of SEED_DEALS) {
    const ref = doc(db, DEALS_COL, deal.id);
    batch.set(ref, { ...serializeDeep(deal), _seeded: true, _updatedAt: serverTimestamp() });
  }
  for (const soc of SEED_SOCIETIES) {
    const ref = doc(db, SOCIETIES_COL, soc.id);
    batch.set(ref, { ...serializeDeep(soc), _seeded: true, _updatedAt: serverTimestamp() });
  }

  await batch.commit();
}

// Subscribe to deals (real-time)
export function subscribeDeals(callback) {
  return onSnapshot(collection(db, DEALS_COL), (snap) => {
    const deals = snap.docs.map((d) => deserializeDeep({ id: d.id, ...d.data() }));
    callback(deals);
  });
}

// Subscribe to societies (real-time)
export function subscribeSocieties(callback) {
  return onSnapshot(collection(db, SOCIETIES_COL), (snap) => {
    const socs = snap.docs.map((d) => deserializeDeep({ id: d.id, ...d.data() }));
    callback(socs);
  });
}

// Update deal fields
export async function updateDeal(id, patch) {
  const ref = doc(db, DEALS_COL, id);
  await updateDoc(ref, { ...serializeDeep(patch), _updatedAt: serverTimestamp() });
}

// Update society fields
export async function updateSociety(id, patch) {
  const ref = doc(db, SOCIETIES_COL, id);
  await updateDoc(ref, { ...serializeDeep(patch), _updatedAt: serverTimestamp() });
}

// Add new deal
export async function addDeal(deal) {
  const ref = doc(collection(db, DEALS_COL));
  await setDoc(ref, { ...serializeDeep(deal), _updatedAt: serverTimestamp() });
  return ref.id;
}

// Add new society
export async function addSociety(soc) {
  const ref = doc(collection(db, SOCIETIES_COL));
  await setDoc(ref, { ...serializeDeep(soc), _updatedAt: serverTimestamp() });
  return ref.id;
}

// Preferences
export async function savePrefs(prefs) {
  const ref = doc(db, PREFS_COL, 'user');
  await setDoc(ref, prefs, { merge: true });
}

export function subscribePrefs(callback) {
  return onSnapshot(doc(db, PREFS_COL, 'user'), (snap) => {
    if (snap.exists()) callback(snap.data());
  });
}
