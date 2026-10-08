import React from 'react';

export default function Header({ currentTab, setCurrentTab, onOpenAppointment, criticalTypes = [] }) {
  const navItems = [
    { id: 'home', label: 'Início', icon: 'home' },
    { id: 'estoque', label: 'Estoque em Tempo Real', icon: 'bloodtype' },
    { id: 'quiz', label: 'Posso Doar? (Triagem)', icon: 'fact_check' },
    { id: 'hemocentros', label: 'Hemocentros', icon: 'local_hospital' },
    { id: 'agendamento', label: 'Agendar Doação', icon: 'calendar_month' },
    { id: 'carteirinha', label: 'Carteirinha Digital', icon: 'badge' },
    { id: 'gamificacao', label: 'Conquistas & Ranking', icon: 'emoji_events' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-surface-container-high/50">
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 flex flex-col justify-between pt-3 pb-2">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Slogan */}
          <div 
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">bloodtype</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl md:text-2xl text-primary tracking-tight">HemoVida</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[11px] tracking-wide">
                  SUS Conectado • ODS 3
                </span>
              </div>
              <span className="text-xs text-on-surface-variant hidden sm:inline font-medium">
                Rede Inteligente de Hemocentros e Doação
              </span>
            </div>
          </div>

          {/* Right Action & User */}
          <div className="flex items-center gap-3">
            {/* SOS Badge */}
            <div 
              onClick={() => setCurrentTab('estoque')}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100/80 text-red-700 cursor-pointer hover:bg-red-200/80 transition-colors"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
              </span>
              <span className="text-xs font-bold">
                SOS Sangue: {criticalTypes.length > 0 ? criticalTypes.join(' e ') : 'O- e A-'} Críticos
              </span>
            </div>

            {/* Quick Schedule Button */}
            <button
              onClick={() => onOpenAppointment()}
              className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold text-sm transition-all flex items-center gap-1.5 shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/35 active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">event</span>
              <span className="hidden sm:inline">+ Agendar Agora</span>
              <span className="sm:hidden">Agendar</span>
            </button>

            {/* User Profile Pill */}
            <div 
              onClick={() => setCurrentTab('carteirinha')}
              className="flex items-center gap-2 pl-2 border-l border-slate-200 cursor-pointer hover:opacity-80 transition-opacity"
              title="Ver Carteirinha Digital"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs ring-2 ring-primary/20">
                GT
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-bold text-on-surface leading-tight">Gustavo T.</span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-red-50 text-red-700 font-semibold text-[10px]">
                  O- Universal
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center gap-1 overflow-x-auto pb-1 mt-3 scrollbar-none border-t border-slate-100 pt-2">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-red-50 text-primary font-bold shadow-sm ring-1 ring-red-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium'
                }`}
              >
                <span className={`material-symbols-outlined text-[18px] ${isActive ? 'text-primary' : 'text-slate-500'}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Emergency Alert Banner */}
      <div className="w-full bg-red-600 text-white py-1.5 px-4 md:px-8 text-xs font-medium">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-3 text-center md:text-left">
          <div className="flex items-center gap-2 mx-auto md:mx-0">
            <span className="material-symbols-outlined text-[18px] text-amber-200 animate-pulse">warning</span>
            <p>
              <strong className="font-bold underline decoration-red-300">Alerta Rede Hemominas & Grande SP:</strong> Reservas de O- estão em 18% da capacidade ideal. Se você é O- ou A-, sua doação é urgente hoje!
            </p>
          </div>
          <button
            onClick={() => onOpenAppointment({ defaultBloodType: 'O-' })}
            className="hidden md:inline-flex items-center gap-1 font-bold text-amber-200 hover:text-white hover:underline whitespace-nowrap"
          >
            Agendar Prioridade
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </header>
  );
}
