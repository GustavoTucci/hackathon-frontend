import React from 'react';

export default function AdminHeader({ onExitAdmin, onResetBaseline }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-surface-container-high/50 text-on-surface">
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Brand & Area Title */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-white shadow-md shadow-primary/20">
            <span className="material-symbols-outlined text-[24px]">tune</span>
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-extrabold text-xl tracking-tight text-primary">HemoVida Gestão</span>
              <span className="px-2 py-0.5 rounded-full bg-red-50 border border-red-200 text-red-700 font-bold text-[10px] uppercase tracking-wider">
                Área Restrita do Hemocentro
              </span>
            </div>
            <p className="text-xs text-on-surface-variant font-medium hidden sm:block">
              Simulador Operacional de Estoques, Alertas de Crise & Barramento RNDS / SUS
            </p>
          </div>
        </div>

        {/* Status Indicators & Exit Action */}
        <div className="flex items-center flex-wrap gap-2.5 sm:gap-3">
          {/* Connection Pulse */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            <span className="font-medium hidden md:inline">RNDS Conectada:</span>
            <span className="text-emerald-700 font-bold">SP-CLÍNICAS #01</span>
          </div>

          {/* Quick Baseline Reset */}
          {onResetBaseline && (
            <button
              onClick={onResetBaseline}
              className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 hover:border-slate-300 text-xs font-semibold transition-all flex items-center gap-1.5"
              title="Restaurar estoques padrão para o roteiro de pitch do Hackathon"
            >
              <span className="material-symbols-outlined text-[16px] text-amber-600">restart_alt</span>
              <span className="hidden lg:inline">Restaurar Baseline</span>
            </button>
          )}

          {/* Return to Public Donor Portal */}
          <button
            onClick={onExitAdmin}
            className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs md:text-sm font-bold shadow-md shadow-primary/25 hover:shadow-lg transition-all flex items-center gap-2 active:scale-95 ml-auto sm:ml-0"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Voltar ao Portal do Doador</span>
          </button>
        </div>
      </div>

      {/* Hospital System Sub-bar */}
      <div className="bg-slate-50 border-t border-slate-100 px-4 md:px-8 py-1.5 text-[11px] text-slate-600">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-700 font-medium">
              <span className="material-symbols-outlined text-[14px] text-primary">domain</span>
              Ambiente Hospitalar de Triagem e Distribuição
            </span>
            <span className="hidden md:inline text-slate-300">•</span>
            <span className="hidden md:inline text-slate-500">
              Módulo de Contingência & Teste de Stress de Bolsas Transfusionais
            </span>
          </div>
          <span className="text-amber-700 font-semibold">
            Simulações alteram estoques públicos em tempo real
          </span>
        </div>
      </div>
    </header>
  );
}
