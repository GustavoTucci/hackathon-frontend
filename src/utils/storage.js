import { INITIAL_BLOOD_STOCKS } from '../data/initialStock';
import { INITIAL_HEMOCENTROS } from '../data/hemocentros';
import { INITIAL_BADGES } from '../data/badges';
import { INITIAL_APPEALS } from '../data/urgentAppeals';

const STORAGE_KEYS = {
  STOCKS: 'hemovida_stocks',
  DONOR: 'hemovida_donor',
  APPOINTMENTS: 'hemovida_appointments',
  HEMOCENTROS: 'hemovida_hemocentros',
  BADGES: 'hemovida_badges',
  HISTORY: 'hemovida_history',
  APPEALS: 'hemovida_appeals'
};

const DEFAULT_DONOR = {
  id: 'donor-001',
  name: 'Gustavo Tucci',
  email: 'gustavo.tucci@email.com',
  gender: 'M',
  bloodType: 'O-',
  rhFactor: 'Negativo',
  donorNumber: 'HV-88492-SP',
  totalDonations: 4,
  livesSaved: 16,
  volumeMl: 1800,
  xp: 450,
  maxXp: 600,
  level: 3,
  rankTitle: 'Guardião da Vida',
  lastDonationDate: '2026-02-14',
  nextEligibleDate: '2026-04-15'
};

const DEFAULT_HISTORY = [
  {
    id: "HIST-04",
    date: "14/02/2026",
    protocol: "#BR-SP-26-8849",
    hemocenter: "Fundação Pró-Sangue Clínicas",
    unit: "Posto Clínicas - São Paulo/SP",
    type: "Sangue Total",
    volume: "450 ml",
    statusBadge: "Bolsa Liberada e Transfundida",
    statusClass: "bg-emerald-50 text-emerald-800 border-emerald-200"
  },
  {
    id: "HIST-03",
    date: "10/12/2025",
    protocol: "#BR-SP-25-7712",
    hemocenter: "Fundação Pró-Sangue Clínicas",
    unit: "Posto Dante Pazzanese - SP",
    type: "Sangue Total",
    volume: "450 ml",
    statusBadge: "Bolsa Liberada e Transfundida",
    statusClass: "bg-emerald-50 text-emerald-800 border-emerald-200"
  },
  {
    id: "HIST-02",
    date: "15/09/2025",
    protocol: "#BR-SP-25-5431",
    hemocenter: "Hemocentro da Santa Casa de SP",
    unit: "Unidade Central",
    type: "Sangue Total",
    volume: "450 ml",
    statusBadge: "Bolsa Liberada e Transfundida",
    statusClass: "bg-emerald-50 text-emerald-800 border-emerald-200"
  },
  {
    id: "HIST-01",
    date: "20/06/2025",
    protocol: "#BR-SP-25-3120",
    hemocenter: "Fundação Pró-Sangue Clínicas",
    unit: "Posto Clínicas - São Paulo/SP",
    type: "Sangue Total",
    volume: "450 ml",
    statusBadge: "Bolsa Liberada e Transfundida",
    statusClass: "bg-emerald-50 text-emerald-800 border-emerald-200"
  }
];

export const getStocks = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.STOCKS);
    return data ? JSON.parse(data) : INITIAL_BLOOD_STOCKS;
  } catch {
    return INITIAL_BLOOD_STOCKS;
  }
};

export const saveStocks = (stocks) => {
  try {
    localStorage.setItem(STORAGE_KEYS.STOCKS, JSON.stringify(stocks));
  } catch (e) {
    console.error('Erro ao salvar estoques no localStorage', e);
  }
};

export const getDonorProfile = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.DONOR);
    return data ? JSON.parse(data) : DEFAULT_DONOR;
  } catch {
    return DEFAULT_DONOR;
  }
};

export const saveDonorProfile = (donor) => {
  try {
    localStorage.setItem(STORAGE_KEYS.DONOR, JSON.stringify(donor));
    window.dispatchEvent(new CustomEvent('hemovida_donor_updated', { detail: donor }));
  } catch (e) {
    console.error('Erro ao salvar perfil do doador', e);
  }
};

export const getHemocentros = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.HEMOCENTROS);
    return data ? JSON.parse(data) : INITIAL_HEMOCENTROS;
  } catch {
    return INITIAL_HEMOCENTROS;
  }
};

export const getAppointments = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    return data ? JSON.parse(data) : [
      {
        id: 'APPT-2026-0842',
        hemocenterName: 'Fundação Pró-Sangue — Posto Clínicas',
        date: '2026-10-14',
        time: '09:30',
        donorName: 'Gustavo Tucci',
        bloodType: 'O-',
        status: 'Agendado'
      }
    ];
  } catch {
    return [];
  }
};

export const saveAppointment = (appointment) => {
  const current = getAppointments();
  const updated = [appointment, ...current];
  try {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('hemovida_appointments_updated', { detail: updated }));
  } catch (e) {
    console.error('Erro ao salvar agendamento', e);
  }
  return updated;
};

export const getBadges = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.BADGES);
    return data ? JSON.parse(data) : INITIAL_BADGES;
  } catch {
    return INITIAL_BADGES;
  }
};

export const saveBadges = (badges) => {
  try {
    localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(badges));
    window.dispatchEvent(new CustomEvent('hemovida_badges_updated', { detail: badges }));
  } catch (e) {
    console.error('Erro ao salvar medalhas', e);
  }
};

export const getHistory = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return data ? JSON.parse(data) : DEFAULT_HISTORY;
  } catch {
    return DEFAULT_HISTORY;
  }
};

export const addHistory = (item) => {
  const current = getHistory();
  const updated = [item, ...current];
  try {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('hemovida_history_updated', { detail: updated }));
  } catch (e) {
    console.error('Erro ao adicionar histórico', e);
  }
  return updated;
};

export const getAppeals = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.APPEALS);
    return data ? JSON.parse(data) : INITIAL_APPEALS;
  } catch {
    return INITIAL_APPEALS;
  }
};

export const saveAppeals = (appeals) => {
  try {
    localStorage.setItem(STORAGE_KEYS.APPEALS, JSON.stringify(appeals));
    window.dispatchEvent(new CustomEvent('hemovida_appeals_updated', { detail: appeals }));
  } catch (e) {
    console.error('Erro ao salvar apelos de sangue', e);
  }
};

export const addAppeal = (appeal) => {
  const current = getAppeals();
  const updated = [appeal, ...current];
  saveAppeals(updated);
  return updated;
};

export const resetAllData = () => {
  saveStocks(INITIAL_BLOOD_STOCKS);
  saveDonorProfile(DEFAULT_DONOR);
  saveBadges(INITIAL_BADGES);
  saveAppeals(INITIAL_APPEALS);
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(DEFAULT_HISTORY));
  window.dispatchEvent(new CustomEvent('hemovida_reset_all'));
};

// Unified Storage helper object for full interoperability across all screens
export const Storage = {
  getStocks,
  saveStocks,
  getDonor: getDonorProfile,
  saveDonor: saveDonorProfile,
  getDonorProfile,
  saveDonorProfile,
  getHemocentros,
  getAppointments,
  addAppointment: saveAppointment,
  saveAppointment,
  getBadges,
  saveBadges,
  getHistory,
  addHistory,
  getAppeals,
  saveAppeals,
  addAppeal,
  resetAllData
};
