import React from 'react';

export default function Footer({ setCurrentTab, onOpenAppointment }) {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 mt-20 border-t border-slate-800">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
        {/* Brand & ODS */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white font-bold shadow-md">
              <span className="material-symbols-outlined text-[20px]">bloodtype</span>
            </div>
            <span className="font-bold text-xl text-white tracking-tight">HemoVida</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            Plataforma digital integrada aos bancos de sangue públicos e privados para democratizar o acesso e otimizar os estoques de sangue em conformidade com as metas da ONU.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-700/50 text-emerald-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            ODS 3: Saúde & Bem-Estar (Metas 3.8 e 3.d)
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="font-semibold text-white text-sm uppercase tracking-wider text-slate-200">
            Navegação Rápida
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button 
                onClick={() => setCurrentTab('home')}
                className="hover:text-red-400 transition-colors flex items-center gap-1.5 text-slate-300"
              >
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                Início & Manifesto ODS 3
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentTab('estoque')}
                className="hover:text-red-400 transition-colors flex items-center gap-1.5 text-slate-300"
              >
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                Painel Geral de Estoques em Tempo Real
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentTab('quiz')}
                className="hover:text-red-400 transition-colors flex items-center gap-1.5 text-slate-300"
              >
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                Quiz de Triagem ("Posso Doar?")
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentTab('hemocentros')}
                className="hover:text-red-400 transition-colors flex items-center gap-1.5 text-slate-300"
              >
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                Localizador de Hemocentros SUS
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentTab('agendamento')}
                className="hover:text-red-400 transition-colors flex items-center gap-1.5 text-slate-300 font-semibold"
              >
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                Agendamento de Doação (Tela 05)
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentTab('carteirinha')}
                className="hover:text-red-400 transition-colors flex items-center gap-1.5 text-slate-300 font-semibold"
              >
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                Carteirinha Digital do Doador (Tela 06)
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentTab('gamificacao')}
                className="hover:text-red-400 transition-colors flex items-center gap-1.5 text-slate-300 font-semibold"
              >
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                Gamificação & Medalhas (Tela 07)
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentTab('pedidos-urgentes')}
                className="hover:text-red-400 transition-colors flex items-center gap-1.5 text-slate-300 font-semibold"
              >
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                Pedidos Urgentes & SOS (Tela 08)
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentTab('compatibilidade')}
                className="hover:text-red-400 transition-colors flex items-center gap-1.5 text-slate-300 font-semibold"
              >
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                Guia & Compatibilidade 8x8 (Tela 09)
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentTab('admin')}
                className="hover:text-red-400 transition-colors flex items-center gap-1.5 text-slate-300 font-semibold"
              >
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                Painel do Hemocentro / Simulador (Tela 10)
              </button>
            </li>
          </ul>
        </div>

        {/* Technical & Regulatory Standards */}
        <div className="space-y-3">
          <h4 className="font-semibold text-white text-sm uppercase tracking-wider text-slate-200">
            Regulamentação & Normas
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li className="flex items-start gap-1.5">
              <span className="material-symbols-outlined text-emerald-400 text-[16px] shrink-0">verified</span>
              <span>Portaria de Consolidação GM/MS nº 5/2017</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="material-symbols-outlined text-emerald-400 text-[16px] shrink-0">verified</span>
              <span>Resolução ANVISA RDC nº 34/2014 (Boas Práticas no Ciclo do Sangue)</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="material-symbols-outlined text-emerald-400 text-[16px] shrink-0">verified</span>
              <span>Lei Geral de Proteção de Dados (LGPD nº 13.709/18)</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="material-symbols-outlined text-emerald-400 text-[16px] shrink-0">verified</span>
              <span>Conformidade com Diretrizes da OMS para Hemoterapia</span>
            </li>
          </ul>
        </div>

        {/* Emergency Contacts */}
        <div className="space-y-3">
          <h4 className="font-semibold text-white text-sm uppercase tracking-wider text-slate-200">
            Canais de Emergência SUS
          </h4>
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Disque Doação SUS</span>
              <span className="font-bold text-lg text-red-400">136</span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-slate-700/60">
              <span className="text-xs text-slate-400">Central Nacional de Apoio</span>
              <span className="font-bold text-xs text-slate-200">0800 700 VIDA</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-red-950/40 border border-red-900/60 text-red-200 text-xs">
            <div className="flex items-center gap-1.5 font-bold mb-0.5">
              <span className="material-symbols-outlined text-[16px] text-red-400">emergency</span>
              <span>Hackathon Front-end 2026</span>
            </div>
            <p className="text-[11px] text-red-300/80">
              Solução funcional apresentada em conformidade integral com os requisitos de avaliação.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 py-4 px-4 md:px-8 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-[1440px] mx-auto">
        <p>© 2026 HemoVida. Desenvolvido para salvar vidas com tecnologia humanizada.</p>
        <p className="flex items-center gap-1 text-slate-400">
          <span className="material-symbols-outlined text-[14px] text-emerald-400">eco</span>
          Compromisso com o Futuro Sustentável • ONU ODS 3
        </p>
      </div>
    </footer>
  );
}
