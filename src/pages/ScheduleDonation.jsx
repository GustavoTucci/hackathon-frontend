import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Building2,
  CheckCircle2,
  Lock,
  ChevronLeft,
  ChevronRight,
  Share2,
  BadgePercent,
  QrCode,
  FileCheck,
  User,
  Phone,
  Sparkles,
  AlertCircle,
  X
} from 'lucide-react';
import { INITIAL_HEMOCENTROS } from '../data/hemocentros';
import { Storage } from '../utils/storage';

export default function ScheduleDonation({ donor, onNavigateToCard, showToast }) {
  const [selectedHemo, setSelectedHemo] = useState(INITIAL_HEMOCENTROS[0]);
  const [isHemoModalOpen, setIsHemoModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(14);
  const [selectedTime, setSelectedTime] = useState('10:30');
  const [selectedBlood, setSelectedBlood] = useState(donor?.bloodType || 'O-');
  const [donorName, setDonorName] = useState(donor?.name || 'Gustavo Tucci');
  const [donorPhone, setDonorPhone] = useState('(11) 98765-4321');
  const [voucherModalOpen, setVoucherModalOpen] = useState(false);
  const [latestVoucherCode, setLatestVoucherCode] = useState('APPT-2026-0941');

  const morningSlots = [
    { time: '08:00', available: false },
    { time: '08:30', available: true },
    { time: '09:00', available: true },
    { time: '10:30', available: true },
    { time: '11:00', available: true }
  ];

  const afternoonSlots = [
    { time: '13:30', available: true },
    { time: '14:00', available: true },
    { time: '15:30', available: true },
    { time: '16:00', available: true }
  ];

  const calendarDays = [
    { day: 6, available: true },
    { day: 7, available: true },
    { day: 8, available: true },
    { day: 9, available: true },
    { day: 10, available: true },
    { day: 13, available: true },
    { day: 14, available: true },
    { day: 15, available: true },
    { day: 16, available: true },
    { day: 17, available: true },
    { day: 20, available: true },
    { day: 21, available: true },
    { day: 22, available: true },
    { day: 23, available: true },
    { day: 24, available: true },
    { day: 27, available: true },
    { day: 28, available: true },
    { day: 29, available: true },
    { day: 30, available: true }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const randomCode = `APPT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setLatestVoucherCode(randomCode);

    const newAppointment = {
      id: randomCode,
      hemocenterId: selectedHemo.id,
      hemocenterName: selectedHemo.name,
      hemocenterAddress: selectedHemo.address,
      date: `${selectedDay} de Abril de 2026`,
      time: selectedTime,
      donorName: donorName,
      bloodType: selectedBlood,
      phone: donorPhone,
      status: 'Confirmado',
      createdAt: new Date().toISOString()
    };

    Storage.addAppointment(newAppointment);

    setVoucherModalOpen(true);
    showToast({
      type: 'success',
      title: 'Agendamento Confirmado! 🎉',
      message: `Voucher ${randomCode} gerado com sucesso para ${selectedHemo.name}.`
    });
  };

  return (
    <div className="w-full max-w-[1120px] mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Contextual Hero Strip */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-50 via-slate-100 to-red-50/50 p-6 sm:p-8 border border-red-100 shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-600 text-white font-bold text-xs">
                <Sparkles className="w-3.5 h-3.5" /> Prioridade Ativa
              </span>
              <span className="text-slate-600 font-semibold text-xs">Protocolo Integrado RNDS / SUS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Agendamento Inteligente de Doação
            </h1>
            <p className="text-sm text-slate-600">
              Conectando seu tipo sanguíneo prioritário ao ponto de coleta com menor tempo de espera e confirmação imediata.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-3 rounded-xl shadow-sm border border-slate-200">
            <div className="w-10 h-10 rounded-full bg-red-100 border border-red-200 flex items-center justify-center text-red-700 font-black text-sm">
              {donor?.bloodType || 'O-'}
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 font-medium">Doador Identificado</span>
              <span className="text-sm font-bold text-slate-900">
                {donor?.name || 'Gustavo Tucci'} • Universal
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stepper Navigation Progress Header */}
      <section aria-label="Progresso do Agendamento" className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Step 1 */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] text-emerald-700 font-bold uppercase tracking-wider">Passo 1</span>
              <span className="text-sm font-bold text-slate-900 truncate">1. Hemocentro</span>
              <span className="text-[11px] text-emerald-700 truncate">{selectedHemo.name.split('—')[0]}</span>
            </div>
          </div>
          {/* Step 2 */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-red-500/20 animate-pulse">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] text-red-600 font-bold uppercase tracking-wider">Passo 2 • Ativo</span>
              <span className="text-sm font-bold text-slate-900 truncate">2. Data & Horário</span>
              <span className="text-[11px] text-red-600 truncate">{selectedDay} Abr, {selectedTime}</span>
            </div>
          </div>
          {/* Step 3 */}
          <div className="flex items-center gap-3 opacity-90">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200">
              <User className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Passo 3</span>
              <span className="text-sm font-bold text-slate-900 truncate">3. Dados do Doador</span>
              <span className="text-[11px] text-slate-500 truncate">Pré-preenchimento SUS</span>
            </div>
          </div>
          {/* Step 4 */}
          <div className="flex items-center gap-3 opacity-75">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200">
              <QrCode className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Passo 4</span>
              <span className="text-sm font-bold text-slate-900 truncate">4. Voucher Digital</span>
              <span className="text-[11px] text-slate-500 truncate">Check-in na recepção</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Booking Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Calendar & Time Slots */}
        <section className="lg:col-span-7 space-y-6">
          {/* Selected Center Banner */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 mt-0.5 border border-red-100">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-emerald-700 font-bold uppercase">Hemocentro Selecionado</span>
                  <span className="px-2 py-0.5 rounded text-[11px] bg-red-100 text-red-800 font-bold">
                    {selectedHemo.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{selectedHemo.name}</h3>
                <p className="text-xs text-slate-500">{selectedHemo.address}</p>
                <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1 pt-0.5">
                  <Clock className="w-3.5 h-3.5" /> Tempo de espera estimado: {selectedHemo.waitTime}
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsHemoModalOpen(true)}
              className="text-xs font-bold text-red-600 hover:text-red-700 underline whitespace-nowrap pt-1"
            >
              Alterar Posto
            </button>
          </div>

          {/* Month Navigation & Interactive Calendar */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-red-600" />
                <h2 className="text-lg font-bold text-slate-900">Abril de 2026</h2>
                <span className="text-xs text-slate-500 px-2 py-0.5 bg-slate-100 rounded-md">Horário de Brasília</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="space-y-2">
              <div className="grid grid-cols-7 text-center text-xs font-bold text-slate-500 py-1">
                <div>DOM</div>
                <div>SEG</div>
                <div>TER</div>
                <div>QUA</div>
                <div>QUI</div>
                <div>SEX</div>
                <div>SÁB</div>
              </div>

              <div className="grid grid-cols-7 gap-1.5 text-center text-sm font-medium">
                {/* Offset days */}
                <div className="p-2 text-slate-300">29</div>
                <div className="p-2 text-slate-300">30</div>
                <div className="p-2 text-slate-300">31</div>
                <div className="p-2 text-slate-400">1</div>
                <div className="p-2 text-slate-400">2</div>
                <div className="p-2 text-slate-400">3</div>
                <div className="p-2 text-slate-400">4</div>
                <div className="p-2 text-slate-400">5</div>

                {/* Days of month */}
                {[6, 7, 8, 9, 10].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDay(d)}
                    className={`p-2 rounded-lg transition-colors relative ${
                      selectedDay === d
                        ? 'bg-red-600 text-white font-bold shadow-md shadow-red-500/20'
                        : 'hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <span>{d}</span>
                    {selectedDay !== d && <span className="w-1 h-1 rounded-full bg-emerald-500 mx-auto mt-0.5 block"></span>}
                  </button>
                ))}

                <div className="p-2 text-slate-300">11</div>
                <div className="p-2 text-slate-300">12</div>

                {[13, 14, 15, 16, 17].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDay(d)}
                    className={`p-2 rounded-lg transition-colors relative ${
                      selectedDay === d
                        ? 'bg-red-600 text-white font-bold shadow-md shadow-red-500/20'
                        : 'hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <span>{d}</span>
                    {selectedDay !== d && <span className="w-1 h-1 rounded-full bg-emerald-500 mx-auto mt-0.5 block"></span>}
                  </button>
                ))}

                <div className="p-2 text-slate-300">18</div>
                <div className="p-2 text-slate-300">19</div>

                {[20, 21, 22, 23, 24].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDay(d)}
                    className={`p-2 rounded-lg transition-colors relative ${
                      selectedDay === d
                        ? 'bg-red-600 text-white font-bold shadow-md shadow-red-500/20'
                        : 'hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <span>{d}</span>
                    {selectedDay !== d && <span className="w-1 h-1 rounded-full bg-emerald-500 mx-auto mt-0.5 block"></span>}
                  </button>
                ))}

                <div className="p-2 text-slate-300">25</div>
                <div className="p-2 text-slate-300">26</div>

                {[27, 28, 29, 30].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDay(d)}
                    className={`p-2 rounded-lg transition-colors relative ${
                      selectedDay === d
                        ? 'bg-red-600 text-white font-bold shadow-md shadow-red-500/20'
                        : 'hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <span>{d}</span>
                    {selectedDay !== d && <span className="w-1 h-1 rounded-full bg-emerald-500 mx-auto mt-0.5 block"></span>}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 pt-2 bg-slate-50 px-4 py-2 rounded-xl">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                <span>Data Selecionada ({selectedDay} de Abril)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Vagas Abertas</span>
              </div>
            </div>
          </div>

          {/* Shift and Hour Slots */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-red-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Horários: {selectedDay} de Abril de 2026
                </h3>
              </div>
              <span className="text-xs text-slate-500">Duração média: 45 min</span>
            </div>

            {/* Morning */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Turno da Manhã
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {morningSlots.map((slot) => {
                  const isSelected = selectedTime === slot.time;
                  return (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold flex flex-col items-center transition-all ${
                        !slot.available
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          : isSelected
                          ? 'bg-red-600 text-white shadow-md shadow-red-500/20 scale-105'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                      }`}
                    >
                      <span className="text-sm font-bold">{slot.time}</span>
                      <span className={`text-[10px] ${isSelected ? 'text-white/90' : slot.available ? 'text-emerald-700' : 'text-slate-400'}`}>
                        {isSelected ? 'Selecionado' : slot.available ? 'Disponível' : 'Esgotado'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Afternoon */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Turno da Tarde
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {afternoonSlots.map((slot) => {
                  const isSelected = selectedTime === slot.time;
                  return (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold flex flex-col items-center transition-all ${
                        !slot.available
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          : isSelected
                          ? 'bg-red-600 text-white shadow-md shadow-red-500/20 scale-105'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                      }`}
                    >
                      <span className="text-sm font-bold">{slot.time}</span>
                      <span className={`text-[10px] ${isSelected ? 'text-white/90' : slot.available ? 'text-emerald-700' : 'text-slate-400'}`}>
                        {isSelected ? 'Selecionado' : slot.available ? 'Disponível' : 'Esgotado'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Donor Form & Real-Time Booking Trigger */}
        <section className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-5">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-red-600" />
                <h2 className="text-lg font-bold text-slate-900">Dados do Doador</h2>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Conectado SUS
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nome Completo</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 absolute right-3.5 top-3.5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">CPF (Validado SUS)</label>
                  <div className="relative">
                    <input
                      type="text"
                      readOnly
                      value="348.***.***-09"
                      className="w-full h-11 px-3.5 rounded-xl bg-slate-100 border border-slate-200 text-sm font-mono text-slate-600 cursor-not-allowed"
                    />
                    <Lock className="w-3.5 h-3.5 text-slate-400 absolute right-3.5 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tipo Sanguíneo</label>
                  <select
                    value={selectedBlood}
                    onChange={(e) => setSelectedBlood(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  >
                    <option value="O-">O- (Universal)</option>
                    <option value="A-">A- (Prioridade)</option>
                    <option value="B-">B-</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="A+">A+</option>
                    <option value="B+">B+</option>
                    <option value="AB+">AB+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp para Lembretes & Token</label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                  <Phone className="w-4 h-4 text-emerald-600 absolute right-3.5 top-3.5" />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Seu voucher digital será enviado instantaneamente por mensagem.</p>
              </div>

              {/* Checklist */}
              <div className="space-y-2 pt-1 text-xs text-slate-600">
                <label className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer hover:bg-slate-100/70">
                  <input type="checkbox" defaultChecked className="mt-0.5 rounded text-red-600 focus:ring-0" />
                  <span>Aceito receber lembretes via WhatsApp 24h e 2h antes com a rota até o hemocentro.</span>
                </label>
                <label className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer hover:bg-slate-100/70">
                  <input type="checkbox" defaultChecked className="mt-0.5 rounded text-red-600 focus:ring-0" />
                  <span>Declaro estar ciente dos requisitos de descanso (6h+), alimentação leve e hidratação.</span>
                </label>
              </div>

              {/* Summary box */}
              <div className="p-3.5 rounded-xl bg-slate-100 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Data & Hora:</span>
                  <span className="font-bold text-red-600">{selectedDay} de Abril de 2026 às {selectedTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Posto:</span>
                  <span className="font-bold text-slate-900 truncate max-w-[200px]">{selectedHemo.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Impacto Estimado:</span>
                  <span className="font-bold text-emerald-700">Até 4 vidas salvas</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md shadow-red-600/30 transition-all flex items-center justify-center gap-2"
              >
                <FileCheck className="w-5 h-5" />
                <span>Confirmar e Gerar Voucher Digital</span>
              </button>
            </form>
          </div>
        </section>
      </div>

      {/* Confirmation Voucher Section */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                Prévia Oficial
              </span>
              <h2 className="text-xl font-bold text-slate-900">Voucher Digital de Agendamento</h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Apresente este voucher no totem de autoatendimento ou direto na recepção do hemocentro.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Código Único:</span>
            <span className="text-sm font-mono font-bold text-red-600">{latestVoucherCode}</span>
          </div>
        </div>

        {/* Ticket Layout */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center text-center space-y-1.5 shrink-0 w-full md:w-56">
            <div className="w-36 h-36 bg-slate-50 rounded-lg flex items-center justify-center p-2 border border-slate-200">
              <QrCode className="w-28 h-28 text-slate-900" />
            </div>
            <span className="text-[11px] text-slate-500">Check-in Imediato no Totem</span>
            <span className="text-xs font-mono font-bold text-slate-900">{latestVoucherCode}</span>
          </div>

          <div className="flex-1 space-y-4 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-slate-500 block">Data & Horário Agendado</span>
                <span className="text-lg font-bold text-red-600">{selectedDay} de Abril de 2026</span>
                <span className="text-sm font-semibold text-slate-800 block">às {selectedTime} (Chegar 10min antes)</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Localização do Posto</span>
                <span className="text-sm font-bold text-slate-900 block">{selectedHemo.name}</span>
                <span className="text-xs text-slate-500 block">{selectedHemo.address}</span>
              </div>
            </div>

            {/* Checklist */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1.5">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Checklist de Preparação Recomendado
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  Documento com foto (RG/CNH)
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  Ingerir 500ml de água
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  Evitar fumar 2h antes
                </li>
              </ul>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={onNavigateToCard}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
              >
                <FileCheck className="w-4 h-4" />
                <span>Salvar na Carteirinha Digital</span>
              </button>
              <button
                type="button"
                onClick={() => showToast({ type: 'info', title: 'Calendário', message: 'Lembrete exportado para Google / Apple Calendar.' })}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-semibold text-xs border border-slate-200 transition-colors flex items-center gap-1.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Adicionar ao Calendário</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  const text = encodeURIComponent(`Agendei minha doação de sangue para ${selectedDay} de Abril às ${selectedTime} no posto ${selectedHemo.name}! Participe você também: https://hemovida.saude.gov.br`);
                  window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
                }}
                className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-600 font-semibold text-xs border border-slate-200 transition-colors flex items-center gap-1"
              >
                <Share2 className="w-4 h-4" />
                <span>Compartilhar</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Voucher Pop-up */}
      {voucherModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 relative border border-slate-200">
            <button
              onClick={() => setVoucherModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                Agendamento Confirmado!
              </span>
              <h3 className="text-xl font-extrabold text-slate-900">Seu Voucher Está Pronto</h3>
              <p className="text-xs text-slate-600">
                Enviamos os detalhes para seu WhatsApp <strong>{donorPhone}</strong> e sua vaga está reservada na <strong>{selectedHemo.name}</strong>.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl text-center space-y-1 border border-slate-200">
              <span className="text-xs text-slate-500">Código do Passe RNDS / SUS</span>
              <div className="text-2xl font-mono font-black text-red-600 tracking-wider">
                {latestVoucherCode}
              </div>
              <span className="text-xs font-bold text-slate-800">
                {selectedDay} de Abril de 2026 às {selectedTime}
              </span>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setVoucherModalOpen(false);
                  onNavigateToCard();
                }}
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md shadow-red-600/30 transition-all flex items-center justify-center gap-2"
              >
                <FileCheck className="w-4 h-4" />
                <span>Salvar & Ir para Carteirinha Digital</span>
              </button>
              <button
                type="button"
                onClick={() => setVoucherModalOpen(false)}
                className="w-full py-2.5 rounded-xl text-slate-600 font-semibold text-xs hover:bg-slate-100 transition-colors"
              >
                Fechar e Ver Resumo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Hemocentros */}
      {isHemoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white max-w-xl w-full rounded-3xl p-6 shadow-2xl space-y-4 relative max-h-[90vh] overflow-y-auto border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-red-600" />
                <h3 className="text-base font-bold text-slate-900">Escolha o Hemocentro de Coleta</h3>
              </div>
              <button
                onClick={() => setIsHemoModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {INITIAL_HEMOCENTROS.map((hemo) => {
                const isSelected = selectedHemo.id === hemo.id;
                return (
                  <div
                    key={hemo.id}
                    onClick={() => {
                      setSelectedHemo(hemo);
                      setIsHemoModalOpen(false);
                      showToast({
                        type: 'info',
                        title: 'Hemocentro Selecionado',
                        message: `Posto alterado para ${hemo.name}.`
                      });
                    }}
                    className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'border-red-600 bg-red-50/60 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-bold text-slate-900">{hemo.name}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            hemo.criticalStock ? 'bg-red-100 text-red-700' : 'bg-slate-200 text-slate-800'
                          }`}>
                            {hemo.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">{hemo.address}</p>
                        <div className="flex items-center gap-3 text-[11px] text-slate-600 pt-1">
                          <span className="font-semibold text-emerald-700">Tempo de espera: {hemo.waitTime}</span>
                          <span>•</span>
                          <span>Distância: {hemo.distance}</span>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-red-600 text-white' : 'border border-slate-300'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
