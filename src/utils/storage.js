import { INITIAL_BLOOD_STOCKS } from '../data/initialStock';
import { INITIAL_HEMOCENTROS } from '../data/hemocentros';

const STORAGE_KEYS = {
  STOCKS: 'hemovida_stocks',
  DONOR: 'hemovida_donor',
  APPOINTMENTS: 'hemovida_appointments',
  HEMOCENTROS: 'hemovida_hemocentros'
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
  lastDonationDate: '2026-08-15',
  nextEligibleDate: '2026-10-14',
  level: 'Guardião da Vida (Nível 3)'
};

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
  } catch (e) {
    console.error('Erro ao salvar agendamento', e);
  }
  return updated;
};
