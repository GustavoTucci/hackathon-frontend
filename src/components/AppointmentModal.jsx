import React, { useState } from 'react';
import { saveAppointment } from '../utils/storage';

export default function AppointmentModal({ isOpen, onClose, hemocentros, defaultBloodType = 'O-', defaultHemocenterId = '', onSuccess }) {
  const [bloodType, setBloodType] = useState(defaultBloodType);
  const [hemocenterId, setHemocenterId] = useState(defaultHemocenterId || (hemocentros[0]?.id || ''));
  const [donorName, setDonorName] = useState('Gustavo Tucci');
  const [donorCpf, setDonorCpf] = useState('***.849.208-**');
  const [date, setDate] = useState('2026-10-15');
  const [time, setTime] = useState('09:30');
  const [confirmedData, setConfirmedData] = useState(null);

  if (!isOpen) return null;

  const bloodTypes = ['O-', 'A-', 'B-', 'AB-', 'O+', 'A+', 'B+', 'AB+'];
  const timeSlots = ['08:00', '09:00', '09:30', '10:30', '11:00', '13:30', '14:30', '15:30', '16:30'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedHemo = hemocentros.find(h => h.id === hemocenterId) || hemocentros[0];
    const newAppointment = {
      id: `HV-${Math.floor(100000 + Math.random() * 900000)}`,
      hemocenterId: selectedHemo.id,
      hemocenterName: selectedHemo.name,
      address: selectedHemo.address,
      date,
      time,
      donorName,
      bloodType,
      status: 'Confirmado',
      createdAt: new Date().toISOString()
    };

    saveAppointment(newAppointment);
    setConfirmedData(newAppointment);
    if (onSuccess) {
      onSuccess(`Agendamento #${newAppointment.id} confirmado para ${date} às ${time}!`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/70 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-primary flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[22px]">calendar_month</span>
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">Agendar Doação de Sangue</h3>
              <p className="text-xs text-slate-500">Procedimento rápido e seguro credenciado pelo SUS</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        {confirmedData ? (
          <div className="p-6 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>

            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
                Agendamento Confirmado com Sucesso
              </span>
              <h4 className="text-xl font-extrabold text-slate-900">
                Obrigado por salvar vidas!
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Apresente o protocolo abaixo na recepção do hemocentro no dia agendado.
              </p>
            </div>

            {/* Receipt Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Protocolo SUS</span>
                <span className="font-mono font-bold text-sm text-primary">{confirmedData.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Doador(a)</span>
                <span className="font-semibold text-slate-800">{confirmedData.donorName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Tipo Sanguíneo</span>
                <span className="px-2 py-0.5 rounded font-bold bg-red-100 text-primary">{confirmedData.bloodType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Unidade</span>
                <span className="font-semibold text-slate-800 text-right max-w-[240px] truncate">{confirmedData.hemocenterName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Data e Horário</span>
                <span className="font-bold text-slate-900">{confirmedData.date} às {confirmedData.time}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs text-left flex items-start gap-2">
              <span className="material-symbols-outlined text-[18px] text-amber-600 shrink-0">info</span>
              <div>
                <strong>Lembrete importante:</strong> Não venha em jejum, durma bem na noite anterior e traga documento oficial com foto.
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  setConfirmedData(null);
                  onClose();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm transition-colors shadow-md shadow-primary/20"
              >
                Concluir & Fechar
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm">
            {/* Hemocenter */}
            <div>
              <label className="block font-semibold text-xs text-slate-700 mb-1.5">
                Escolha o Hemocentro / Unidade SUS *
              </label>
              <select
                value={hemocenterId}
                onChange={(e) => setHemocenterId(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-xs"
                required
              >
                {hemocentros.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.name} ({h.region})
                  </option>
                ))}
              </select>
            </div>

            {/* Blood Type Grid */}
            <div>
              <label className="block font-semibold text-xs text-slate-700 mb-1.5">
                Tipo Sanguíneo do Doador
              </label>
              <div className="grid grid-cols-4 gap-2">
                {bloodTypes.map((type) => {
                  const isSelected = bloodType === type;
                  return (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setBloodType(type)}
                      className={`py-2 rounded-lg text-xs font-bold transition-all border ${
                        isSelected
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-xs text-slate-700 mb-1.5">
                  Data da Doação *
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min="2026-10-08"
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-xs"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-xs text-slate-700 mb-1.5">
                  Horário Disponível *
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-xs"
                  required
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot} h
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Donor Personal Data */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block font-semibold text-xs text-slate-700 mb-1.5">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-xs"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-xs text-slate-700 mb-1.5">
                  Documento / CPF
                </label>
                <input
                  type="text"
                  value={donorCpf}
                  onChange={(e) => setDonorCpf(e.target.value)}
                  placeholder="000.000.000-00"
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-xs"
                  required
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="py-2.5 px-6 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold transition-all shadow-md shadow-primary/20 flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">check</span>
                Confirmar Agendamento
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
