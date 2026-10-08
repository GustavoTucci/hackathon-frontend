import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Download, 
  Heart, 
  Droplet, 
  Share2, 
  ShieldCheck, 
  AlertCircle, 
  QrCode, 
  Award, 
  FileText, 
  PlusCircle, 
  Sparkles,
  ArrowRight,
  Gavel,
  Radio,
  ExternalLink
} from 'lucide-react';
import { Storage } from '../utils/storage';
import { calculateNextDonation } from '../utils/bloodCalculator';

export default function DigitalCard({ onNavigate, showToast }) {
  const [donor, setDonor] = useState(() => Storage.getDonor());
  const [history, setHistory] = useState(() => Storage.getHistory());
  const [genderFilter, setGenderFilter] = useState(donor.gender || "M");
  const [showSimulateModal, setShowSimulateModal] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Recarrega sempre que houver evento de atualização
  useEffect(() => {
    const handleDonorUpdate = (e) => setDonor(e.detail || Storage.getDonor());
    const handleHistoryUpdate = (e) => setHistory(e.detail || Storage.getHistory());

    window.addEventListener("hemovida_donor_updated", handleDonorUpdate);
    window.addEventListener("hemovida_history_updated", handleHistoryUpdate);

    return () => {
      window.removeEventListener("hemovida_donor_updated", handleDonorUpdate);
      window.removeEventListener("hemovida_history_updated", handleHistoryUpdate);
    };
  }, []);

  const nextCalc = calculateNextDonation(donor.lastDonationDate, genderFilter);

  // Simular uma nova doação realizada
  const handleRegisterDonation = () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
    const isoDate = today.toISOString().split("T")[0];

    const newTotal = donor.totalDonations + 1;
    const newLives = newTotal * 4;
    const newVolume = newTotal * 450;
    const newXp = Math.min(donor.maxXp, donor.xp + 100);

    const updatedDonor = {
      ...donor,
      totalDonations: newTotal,
      livesSaved: newLives,
      volumeMl: newVolume,
      lastDonationDate: isoDate,
      xp: newXp
    };

    // Atualizar no storage
    Storage.saveDonor(updatedDonor);
    setDonor(updatedDonor);

    // Adicionar ao histórico
    const newHistoryItem = {
      id: `HIST-${Date.now()}`,
      date: formattedDate,
      protocol: `#BR-SP-${today.getFullYear().toString().slice(-2)}-${Math.floor(1000 + Math.random() * 9000)}`,
      hemocenter: "Fundação Pró-Sangue Clínicas",
      unit: "Posto Central - São Paulo/SP",
      type: "Sangue Total",
      volume: "450 ml",
      statusBadge: "Bolsa Coletada e em Triagem Sorológica",
      statusClass: "bg-amber-50 text-amber-800 border-amber-200"
    };
    Storage.addHistory(newHistoryItem);
    setHistory(Storage.getHistory());

    // Checar desbloqueio de medalha Guardião da Vida (5 doações)
    if (newTotal >= 5) {
      const badges = Storage.getBadges();
      const guardian = badges.find(b => b.id === "badge-guardian");
      if (guardian && !guardian.unlocked) {
        guardian.unlocked = true;
        guardian.unlockedAt = formattedDate;
        Storage.saveBadges(badges);
        if (showToast) {
          showToast("🏆 Nova Conquista Desbloqueada: Guardião da Vida (+250 XP)!");
        }
      }
    }

    setShowSimulateModal(false);
    if (showToast) {
      showToast("🎉 Doação registrada com sucesso! +100 XP e +4 vidas impactadas.");
    }
  };

  const handleAppleWallet = () => {
    if (showToast) {
      showToast("Passe .pkpass gerado! Adicionado à Apple Wallet e Google Wallet.");
    }
  };

  const handleDownloadPdf = () => {
    if (showToast) {
      showToast("Baixando Carteira Digital oficial assinada digitalmente pelo SUS...");
    }
  };

  const handleCltCertificate = () => {
    if (showToast) {
      showToast("Comprovante oficial CLT emitido com hash de verificação ANVISA (Art. 473 CLT).");
    }
  };

  // SVG Circle calculation
  const radius = 50;
  const circumference = 2 * Math.PI * radius; // ~314.16
  const strokeDashoffset = circumference - (nextCalc.percentage / 100) * circumference;

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-10">
      {/* Top Identity / Title Strip */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              Registro Nacional SUS Conectado
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-xs font-medium">
              RDC 34 ANVISA
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">
            Carteira Digital do Doador
          </h1>
          <p className="text-on-surface-variant text-sm max-w-2xl">
            Identificação biométrica e passaporte de solidariedade para atendimento preferencial, liberação de ponto e check-in instantâneo em hemocentros.
          </p>
        </div>

        {/* Quick Export & Actions */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setShowSimulateModal(true)}
            className="px-4 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-secondary transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
            title="Registrar doação e simular o ciclo"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Registrar Doação Realizada</span>
          </button>
          <button
            onClick={handleAppleWallet}
            className="px-4 py-2.5 rounded-xl bg-surface-container text-on-surface font-semibold text-sm hover:bg-surface-container-high transition-all flex items-center gap-2 shadow-sm border border-outline-variant/30"
          >
            <CreditCard className="w-4 h-4 text-primary" />
            <span className="hidden sm:inline">Apple Wallet / Google Pay</span>
            <span className="sm:hidden">Wallet</span>
          </button>
          <button
            onClick={handleDownloadPdf}
            className="px-4 py-2.5 rounded-xl bg-surface-container text-on-surface font-semibold text-sm hover:bg-surface-container-high transition-all flex items-center gap-2 shadow-sm border border-outline-variant/30"
          >
            <Download className="w-4 h-4 text-primary" />
            <span className="hidden sm:inline">Baixar PDF</span>
          </button>
        </div>
      </div>

      {/* Centerpiece Split Grid: Luxury Card + Radial Interval Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Virtual Card Presentation (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          {/* Physical Card Container with Luxury Card Perspective */}
          <div 
            className="relative w-full rounded-2xl p-7 text-white shadow-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.01]"
            style={{
              background: 'linear-gradient(135deg, #5c0b11 0%, #871017 38%, #b70011 72%, #dc2626 100%)'
            }}
          >
            {/* Background Graphic Textures */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <svg className="w-full h-full object-cover" fill="none" preserveAspectRatio="none" viewBox="0 0 500 320">
                <path d="M-50,180 C100,80 200,290 350,160 C420,100 480,240 550,190" fill="none" stroke="white" strokeDasharray="4 4" strokeWidth="2.5"></path>
                <path d="M-30,220 C120,120 220,330 370,200 C440,140 500,280 570,230" fill="none" stroke="white" strokeWidth="1.5"></path>
                <circle cx="450" cy="50" fill="white" opacity="0.08" r="130"></circle>
                <circle cx="50" cy="280" fill="white" opacity="0.06" r="90"></circle>
              </svg>
            </div>
            {/* Glass Sheen */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>

            {/* Card Header: Title, Chip, Contactless */}
            <div className="relative z-10 flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center p-1 shadow-inner">
                    <Droplet className="w-5 h-5 text-white fill-white" />
                  </div>
                  <span className="text-base tracking-wider text-white font-black">HEMOVIDA</span>
                  <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-white/15 text-white/95 font-mono">Oficial</span>
                </div>
                <p className="text-[10px] tracking-widest uppercase text-white/80 font-medium">
                  Carteira Nacional do Doador de Sangue
                </p>
              </div>

              {/* Smart Chip Visual & NFC */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-8 rounded-md bg-gradient-to-br from-yellow-200 via-amber-300 to-yellow-500 shadow-inner border border-amber-200/50 relative overflow-hidden flex items-center justify-center">
                  <div className="w-full h-[1px] bg-amber-700/40 absolute top-2"></div>
                  <div className="w-full h-[1px] bg-amber-700/40 absolute bottom-2"></div>
                  <div className="w-[1px] h-full bg-amber-700/40 absolute left-3"></div>
                  <div className="w-[1px] h-full bg-amber-700/40 absolute right-3"></div>
                  <div className="w-2.5 h-2.5 rounded-full border border-amber-800/40 bg-amber-200/50"></div>
                </div>
                <Radio className="w-6 h-6 text-white/80" />
              </div>
            </div>

            {/* Card Body: Name, Universal Donor Badge & Large Blood Type */}
            <div className="relative z-10 my-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] tracking-widest uppercase text-white/70 block mb-0.5 font-medium">
                  Doador Voluntário Ativo
                </span>
                <p className="text-2xl font-black text-white uppercase drop-shadow-sm tracking-tight">
                  {donor.name}
                </p>
                <div className="flex items-center gap-2 mt-1.5 font-mono text-[11px] text-white/90">
                  <span>REG: {donor.donorNumber}</span>
                  <span>•</span>
                  <span>SUS: {donor.susCard}</span>
                </div>
              </div>

              {/* Blood Type Medallion */}
              <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-white/10">
                <span className="text-4xl leading-none font-black tracking-tight text-white drop-shadow">
                  {donor.bloodType}
                </span>
                <span className="text-[9px] tracking-widest uppercase text-amber-200 font-bold mt-1 text-center">
                  Rh {donor.rhFactor}
                </span>
                <span className="text-[8px] tracking-wider uppercase text-white/85">
                  Universal
                </span>
              </div>
            </div>

            {/* Card Footer: Totem QR Code, Security Barcode, Expiry */}
            <div className="relative z-10 flex items-end justify-between pt-2 border-t border-white/20">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-[11px] tracking-wider uppercase text-emerald-200 font-bold">
                    Status: Ativo / Apto para Doar
                  </span>
                </div>
                <p className="text-[11px] text-white/80 font-mono">
                  Validade Credencial: 12/2028
                </p>
              </div>

              {/* QR Code Totem Check-in */}
              <div className="flex items-center gap-3 bg-white p-2 rounded-xl text-on-surface shadow-md">
                <div className="w-12 h-12 bg-white flex items-center justify-center relative">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 100 100">
                    <rect fill="#131b2e" height="28" rx="4" width="28" x="5" y="5"></rect>
                    <rect fill="white" height="16" rx="2" width="16" x="11" y="11"></rect>
                    <rect fill="#b70011" height="8" width="8" x="15" y="15"></rect>
                    <rect fill="#131b2e" height="28" rx="4" width="28" x="67" y="5"></rect>
                    <rect fill="white" height="16" rx="2" width="16" x="73" y="11"></rect>
                    <rect fill="#b70011" height="8" width="8" x="77" y="15"></rect>
                    <rect fill="#131b2e" height="28" rx="4" width="28" x="5" y="67"></rect>
                    <rect fill="white" height="16" rx="2" width="16" x="11" y="73"></rect>
                    <rect fill="#b70011" height="8" width="8" x="15" y="77"></rect>
                    <rect fill="#131b2e" height="6" width="6" x="40" y="8"></rect>
                    <rect fill="#131b2e" height="6" width="6" x="50" y="8"></rect>
                    <rect fill="#131b2e" height="6" width="6" x="40" y="20"></rect>
                    <rect fill="#131b2e" height="6" width="6" x="52" y="24"></rect>
                    <rect fill="#131b2e" height="6" width="6" x="8" y="42"></rect>
                    <rect fill="#131b2e" height="6" width="6" x="22" y="48"></rect>
                    <rect fill="#b70011" height="16" rx="3" width="16" x="42" y="42"></rect>
                    <path d="M45,50 L48,50 L50,45 L52,55 L54,50 L55,50" fill="none" stroke="white" strokeWidth="1.5"></path>
                    <rect fill="#131b2e" height="6" width="6" x="68" y="42"></rect>
                    <rect fill="#131b2e" height="6" width="8" x="82" y="48"></rect>
                    <rect fill="#131b2e" height="6" width="6" x="40" y="68"></rect>
                    <rect fill="#131b2e" height="6" width="6" x="52" y="78"></rect>
                    <rect fill="#131b2e" height="6" width="8" x="70" y="70"></rect>
                    <rect fill="#131b2e" height="6" width="6" x="82" y="82"></rect>
                  </svg>
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-[10px] font-bold text-on-surface leading-tight">Check-in Rápido</span>
                  <span className="text-[9px] text-on-surface-variant">Totem Hemocentro</span>
                  <span className="text-[9px] text-primary font-bold mt-0.5">Sem fila de triagem</span>
                </div>
              </div>
            </div>
          </div>

          {/* Micro Info bar under card */}
          <div className="mt-4 flex items-center justify-between text-on-surface-variant text-xs px-2 flex-wrap gap-2">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Verificado por Autenticação Biométrica e-SUS
            </span>
            <span className="font-mono text-[11px] text-on-surface-variant">ID Criptografado SHA-256</span>
          </div>
        </div>

        {/* Radial Donation Interval Widget (5 cols) */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl p-7 shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                  <Clock className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-base font-bold text-on-surface">Ciclo Biológico</span>
                  <p className="text-xs text-on-surface-variant">
                    {genderFilter === "M" ? "Recuperação Eritropoiese (60 dias)" : "Recuperação Eritropoiese (90 dias)"}
                  </p>
                </div>
              </div>

              {/* Gender selector to inspect Ministry rule */}
              <div className="flex items-center bg-surface-container p-0.5 rounded-lg text-xs">
                <button
                  type="button"
                  onClick={() => setGenderFilter("M")}
                  className={`px-2 py-1 rounded-md font-semibold transition-all ${genderFilter === "M" ? "bg-surface-container-lowest text-primary shadow-xs" : "text-on-surface-variant hover:text-on-surface"}`}
                >
                  Homem (60d)
                </button>
                <button
                  type="button"
                  onClick={() => setGenderFilter("F")}
                  className={`px-2 py-1 rounded-md font-semibold transition-all ${genderFilter === "F" ? "bg-surface-container-lowest text-primary shadow-xs" : "text-on-surface-variant hover:text-on-surface"}`}
                >
                  Mulher (90d)
                </button>
              </div>
            </div>

            {/* Circular Countdown Graphic */}
            <div className="my-6 flex flex-col items-center justify-center relative">
              <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                  <circle 
                    className="text-surface-container" 
                    cx="60" 
                    cy="60" 
                    fill="transparent" 
                    r={radius} 
                    stroke="currentColor" 
                    strokeWidth="9"
                  />
                  <circle 
                    className="text-primary-container transition-all duration-1000 ease-out" 
                    cx="60" 
                    cy="60" 
                    fill="transparent" 
                    r={radius} 
                    stroke="currentColor" 
                    strokeDasharray={circumference} 
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round" 
                    strokeWidth="9"
                  />
                </svg>

                {/* Center Countdown Text */}
                <div className="absolute flex flex-col items-center text-center">
                  <span className="text-4xl leading-tight font-black text-on-surface">
                    {nextCalc.daysRemaining}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                    Dias Restantes
                  </span>
                  <span className="text-xs text-emerald-700 font-semibold mt-0.5">
                    {nextCalc.percentage}% Concluído
                  </span>
                </div>
              </div>

              <p className="text-xs text-center text-on-surface-variant mt-2 max-w-xs">
                Última doação registrada em <span className="font-bold text-on-surface">{donor.lastDonationDate}</span>. Seu organismo repôs {Math.min(95, nextCalc.percentage)}% da taxa de hemoglobina.
              </p>
            </div>
          </div>

          {/* Release Milestone & CTA */}
          <div className="space-y-3 pt-3 border-t border-surface-container">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-on-surface-variant font-medium">Próxima Doação Liberada:</span>
              <span className="font-bold text-primary flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {nextCalc.nextDateFormatted}
              </span>
            </div>
            <button
              onClick={() => onNavigate && onNavigate('schedule')}
              className="w-full py-3 px-4 rounded-xl bg-primary-container text-on-primary-container font-semibold text-sm hover:bg-primary transition-all flex items-center justify-center gap-2 shadow-sm text-center"
            >
              <Calendar className="w-4 h-4" />
              <span>Pré-Agendar para {nextCalc.nextDateFormatted}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real Impact Tracker: 3 Stat Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-on-surface">Seu Impacto Clínico Acumulado</h2>
            <p className="text-xs text-on-surface-variant">Estatísticas consolidadas nas redes hospitalares parceiras e RNDS</p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 text-emerald-700 font-semibold text-xs">
            <ShieldCheck className="w-4 h-4" /> Auditoria RNDS 2024-2026
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Doações */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Total Solidário</span>
              <span className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Heart className="w-5 h-5 fill-primary" />
              </span>
            </div>
            <div className="my-4">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-on-surface tracking-tight">{donor.totalDonations}</span>
                <span className="text-xl text-primary font-bold">Doações</span>
              </div>
              <p className="text-xs text-on-surface-variant mt-1">Histórico voluntário contínuo no SUS desde 2024.</p>
            </div>
            <div className="pt-3 border-t border-surface-container flex items-center justify-between text-xs">
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                100% Eficácia
              </span>
              <span className="text-on-surface-variant">Taxa de retorno: Regular</span>
            </div>
          </div>

          {/* Card 2: Vidas Salvas */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Vidas Transformadas</span>
              <span className="w-10 h-10 rounded-xl bg-error-container flex items-center justify-center text-error group-hover:scale-110 transition-transform relative">
                <Heart className="w-5 h-5 animate-pulse text-primary fill-primary" />
              </span>
            </div>
            <div className="my-4">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-primary tracking-tight">{donor.livesSaved}</span>
                <span className="text-xl text-on-surface font-bold">Vidas Estimadas</span>
              </div>
              <p className="text-xs text-on-surface-variant mt-1">
                Cada bolsa de sangue total beneficia até 4 pacientes por fracionamento hemoterápico.
              </p>
            </div>
            <div className="pt-3 border-t border-surface-container flex items-center gap-1.5 flex-wrap">
              <span className="px-2 py-0.5 rounded bg-surface-container text-[10px] font-medium text-on-surface">Plaquetas</span>
              <span className="px-2 py-0.5 rounded bg-surface-container text-[10px] font-medium text-on-surface">Hemácias</span>
              <span className="px-2 py-0.5 rounded bg-surface-container text-[10px] font-medium text-on-surface">Plasma</span>
              <span className="px-2 py-0.5 rounded bg-surface-container text-[10px] font-medium text-on-surface">Crioprecipitado</span>
            </div>
          </div>

          {/* Card 3: Volume Clínico */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Volume Clínico</span>
              <span className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                <Droplet className="w-5 h-5 text-secondary fill-secondary" />
              </span>
            </div>
            <div className="my-4">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-on-surface tracking-tight">{donor.volumeMl.toLocaleString('pt-BR')}</span>
                <span className="text-xl text-secondary font-bold">ml Doados</span>
              </div>
              <p className="text-xs text-on-surface-variant mt-1">
                Equivalente a {donor.totalDonations} ciclos transfusionais cirúrgicos completos.
              </p>
            </div>
            <div className="pt-3 border-t border-surface-container flex items-center justify-between text-xs">
              <span className="text-on-surface-variant">Padrão por coleta: 450ml</span>
              <span className="font-mono text-emerald-700 font-bold">100% Aproveitado</span>
            </div>
          </div>
        </div>
      </div>

      {/* Donation History Timeline & Medical Certificates */}
      <div className="bg-surface-container-lowest rounded-2xl p-7 shadow-sm border border-outline-variant/30 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-container pb-5">
          <div>
            <h2 className="text-xl font-bold text-on-surface">Histórico de Coletas & Rastreabilidade</h2>
            <p className="text-xs text-on-surface-variant">Acompanhe o percurso e destino hospitalar de cada bolsa coletada</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container text-on-surface text-xs font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Sigilo Clínico Preservado
            </span>
          </div>
        </div>

        {/* History Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container text-on-surface-variant text-xs font-semibold uppercase tracking-wider">
                <th className="py-3 px-4 rounded-l-lg">Data & Protocolo</th>
                <th className="py-3 px-4">Hemocentro / Unidade</th>
                <th className="py-3 px-4">Tipo & Volume</th>
                <th className="py-3 px-4">Rastreio Hemoterápico</th>
                <th className="py-3 px-4 text-right rounded-r-lg">Comprovante</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container text-sm text-on-surface">
              {history.map((row) => (
                <tr key={row.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="py-4 px-4 font-medium">
                    <div className="flex flex-col">
                      <span className="font-bold text-on-surface">{row.date}</span>
                      <span className="font-mono text-[11px] text-on-surface-variant">{row.protocol}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-primary-fixed/40 flex items-center justify-center text-primary">
                        <Droplet className="w-4 h-4" />
                      </span>
                      <div>
                        <span className="font-medium text-on-surface">{row.hemocenter}</span>
                        <span className="block text-[11px] text-on-surface-variant">{row.unit}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-bold">{row.type}</span>
                    <span className="text-on-surface-variant text-xs block">{row.volume}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${row.statusClass || "bg-surface-container text-on-surface-variant"}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {row.statusBadge}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => setSelectedCertificate(row)}
                      className="px-3 py-1.5 rounded-lg bg-surface-container text-primary text-xs font-semibold hover:bg-primary hover:text-white transition-colors inline-flex items-center gap-1.5 shadow-xs"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Atestado PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legal Information & CLT Benefit Callout */}
        <div className="p-4 rounded-xl bg-surface-container flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-on-surface">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary shadow-xs">
              <Gavel className="w-5 h-5" />
            </span>
            <div>
              <span className="text-sm font-bold block">Direito Trabalhista Assegurado (Art. 473 CLT)</span>
              <p className="text-xs text-on-surface-variant">
                O doador tem direito a 1 dia de folga a cada 12 meses de trabalho para doação voluntária de sangue comprovada por atestado oficial.
              </p>
            </div>
          </div>
          <button
            onClick={handleCltCertificate}
            className="px-4 py-2 rounded-xl bg-surface-container-lowest text-on-surface text-xs font-semibold hover:bg-surface-container-high transition-colors whitespace-nowrap shadow-xs border border-outline-variant/30"
          >
            Emitir Declaração CLT Consolidada
          </button>
        </div>
      </div>

      {/* Modal: Simular Nova Doação */}
      {showSimulateModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl border border-outline-variant/30 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-on-surface">Registrar Nova Doação</h3>
                <p className="text-xs text-on-surface-variant">Simulador do Ecossistema HemoVida</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface-container space-y-2 text-xs text-on-surface">
              <p>Ao registrar esta doação realizada hoje:</p>
              <ul className="space-y-1 list-disc list-inside text-on-surface-variant font-medium">
                <li>O contador de doações aumentará para <strong className="text-on-surface">{donor.totalDonations + 1} doações</strong></li>
                <li>Vidas impactadas aumentarão para <strong className="text-primary font-bold">{(donor.totalDonations + 1) * 4} vidas</strong></li>
                <li>Você receberá <strong className="text-emerald-700 font-bold">+100 XP</strong> no seu perfil de fidelidade</li>
                <li>O contador regressivo biológico será reiniciado para {genderFilter === "M" ? "60 dias" : "90 dias"}</li>
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSimulateModal(false)}
                className="px-4 py-2.5 rounded-xl border border-outline-variant text-on-surface text-sm font-semibold hover:bg-surface-container transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleRegisterDonation}
                className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-secondary transition-all shadow-md flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirmar Registro</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Visualizar Comprovante / Atestado */}
      {selectedCertificate && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl border border-outline-variant/30">
            <div className="flex items-center justify-between border-b border-surface-container pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-on-surface">Comprovante de Comparecimento</h3>
                  <span className="text-xs text-on-surface-variant font-mono">{selectedCertificate.protocol}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCertificate(null)}
                className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs bg-surface-container-low p-4 rounded-xl text-on-surface">
              <div className="flex justify-between py-1 border-b border-surface-container">
                <span className="text-on-surface-variant">Doador:</span>
                <span className="font-bold">{donor.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-surface-container">
                <span className="text-on-surface-variant">Documento / SUS:</span>
                <span className="font-mono">{donor.susCard}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-surface-container">
                <span className="text-on-surface-variant">Data da Coleta:</span>
                <span className="font-bold">{selectedCertificate.date}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-surface-container">
                <span className="text-on-surface-variant">Unidade Coletora:</span>
                <span>{selectedCertificate.hemocenter}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-surface-container">
                <span className="text-on-surface-variant">Procedimento:</span>
                <span>Doação Voluntária de {selectedCertificate.type} ({selectedCertificate.volume})</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-on-surface-variant">Amparo Legal:</span>
                <span className="font-semibold text-primary">Art. 473 da CLT • Folga Justificada</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setSelectedCertificate(null)}
                className="px-4 py-2 rounded-xl text-on-surface text-xs font-semibold hover:bg-surface-container"
              >
                Fechar
              </button>
              <button
                type="button"
                onClick={() => {
                  if (showToast) showToast("Download do atestado PDF autenticado iniciado.");
                  setSelectedCertificate(null);
                }}
                className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-secondary flex items-center gap-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar PDF Autenticado</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
