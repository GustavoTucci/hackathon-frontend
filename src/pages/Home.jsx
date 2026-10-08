import React from 'react';

export default function Home({ onNavigate, onOpenAppointment, stocks = [] }) {
  const criticalStocks = stocks.filter(s => s.status === 'critical');

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* 1. Hero Section with Modern Depth & ODS 3 Theme */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-red-50/30 to-rose-50/50 p-6 md:p-12 border border-red-100 shadow-sm">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-red-200/40 blur-3xl pointer-events-none"></div>
        <div className="absolute right-1/4 -bottom-16 w-72 h-72 rounded-full bg-emerald-100/40 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold tracking-wide">
              <span className="material-symbols-outlined text-[16px] text-primary">vital_signs</span>
              <span>ODS 3 • SAÚDE & BEM-ESTAR (METAS 3.8 & 3.D)</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Cada gota conta. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose-600">
                Doe sangue, multiplique esperança.
              </span>
            </h1>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-xl">
              Conectamos você aos bancos de sangue mais próximos em tempo real. Uma única doação sua leva menos de 15 minutos e tem o poder biológico de salvar <strong>até 4 vidas</strong> em emergências, UTIs e cirurgias de alta complexidade.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onOpenAppointment()}
                className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm transition-all shadow-lg shadow-primary/30 flex items-center gap-2 hover:scale-102 active:scale-95"
              >
                <span className="material-symbols-outlined text-[20px]">calendar_add_on</span>
                Agendar Doação Agora
              </button>

              <button
                onClick={() => onNavigate('estoque')}
                className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm transition-all border border-slate-200 shadow-sm flex items-center gap-2 hover:border-slate-300"
              >
                <span className="material-symbols-outlined text-[20px] text-primary">analytics</span>
                Ver Estoques em Tempo Real
              </button>

              <button
                onClick={() => onNavigate('quiz')}
                className="px-5 py-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-sm transition-all border border-emerald-200 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px] text-emerald-600">quiz</span>
                Posso Doar? (Triagem)
              </button>
            </div>

            {/* Badges */}
            <div className="pt-2 flex items-center gap-6 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-emerald-600 text-[18px]">verified</span>
                100% Gratuito & Seguro
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[18px]">emergency</span>
                Rede RNDS SUS Integrada
              </span>
            </div>
          </div>

          {/* Right Hero Graphic / Quick Stats Card */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-red-100 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-600 animate-ping"></span>
                  <span className="font-bold text-xs uppercase tracking-wider text-red-700">Estado de Alerta Atual</span>
                </div>
                <span className="text-xs text-slate-400">Atualizado agora</span>
              </div>

              {/* Critical Stocks Pills */}
              <div className="space-y-2">
                <span className="text-xs text-slate-500 font-medium block">Tipos em situação crítica nos hemocentros:</span>
                <div className="grid grid-cols-2 gap-2">
                  {criticalStocks.slice(0, 2).map((item) => (
                    <div key={item.type} className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-red-600 text-white font-extrabold flex items-center justify-center text-sm">
                          {item.type}
                        </span>
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">{item.percentage}%</span>
                          <span className="text-[10px] text-red-600 font-semibold">{item.statusLabel}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => onOpenAppointment({ defaultBloodType: item.type })}
                        className="text-[11px] font-bold text-red-700 hover:underline"
                      >
                        Doar
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact Metric Summary */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 grid grid-cols-2 gap-3 text-center">
                <div className="border-r border-slate-200 pr-2">
                  <span className="text-2xl font-black text-primary block">+12.400</span>
                  <span className="text-[11px] text-slate-500 font-medium">Vidas impactadas</span>
                </div>
                <div>
                  <span className="text-2xl font-black text-emerald-600 block">4 Vidas</span>
                  <span className="text-[11px] text-slate-500 font-medium">Por doação individual</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('hemocentros')}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px]">location_on</span>
                Ver Hemocentros com Vagas Hoje
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ODS 3 Metrics & Social Context */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Indicadores Estruturais</span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">O Cenário da Doação no Brasil e a ODS 3</h2>
          </div>
          <p className="text-xs text-slate-500 max-w-md">
            Alinhamento estrito aos Objetivos de Desenvolvimento Sustentável da Organização das Nações Unidas (ONU).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: 1,6% vs OMS */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">pie_chart</span>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900">1,6%</span>
                <span className="text-xs font-semibold text-amber-600">da população doa</span>
              </div>
              <h3 className="font-bold text-sm text-slate-800 mt-1">Déficit Crítico Nacional</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                A OMS recomenda entre <strong>3% e 5%</strong> da população ativa como doadora regular para garantir a segurança transfusional estável.
              </p>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '32%' }}></div>
            </div>
            <span className="text-[11px] text-slate-400 block font-medium">Meta OMS: Mínimo 3% a 5%</span>
          </div>

          {/* Card 2: Meta 3.8 da ONU */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">health_and_safety</span>
            </div>
            <div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                Meta 3.8 da ONU
              </span>
              <h3 className="font-bold text-sm text-slate-800 mt-1.5">Cobertura Universal em Saúde</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Assegurar o acesso contínuo a medicamentos e produtos biológicos essenciais seguros e eficazes (sangue e hemoderivados) para todos os cidadãos sem barreiras financeiras.
              </p>
            </div>
            <div className="pt-2 text-xs font-bold text-emerald-700 flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              Acesso democrático e humanizado
            </div>
          </div>

          {/* Card 3: Meta 3.d & Resposta Rápida */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">notifications_active</span>
            </div>
            <div>
              <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-bold uppercase">
                Meta 3.d da ONU
              </span>
              <h3 className="font-bold text-sm text-slate-800 mt-1.5">Alerta Precoce & Gestão de Crises</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Reforçar a capacidade de mobilização em calamidades, acidentes de trânsito em massa e emergências de saúde através da notificação digital ativa de voluntários.
              </p>
            </div>
            <div className="pt-2 text-xs font-bold text-red-700 flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">bolt</span>
              Mobilização em menos de 15 minutos
            </div>
          </div>
        </div>
      </section>

      {/* 3. 3-Step Interactive Process */}
      <section className="p-8 rounded-3xl bg-slate-900 text-white space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-red-400">Jornada Simplificada</span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Como funciona a sua doação no HemoVida
          </h2>
          <p className="text-xs text-slate-400">
            Eliminamos a burocracia para você focar no que realmente importa: salvar vidas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div 
            onClick={() => onNavigate('quiz')}
            className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-red-500/50 cursor-pointer transition-all hover:-translate-y-1 group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 font-extrabold flex items-center justify-center text-lg group-hover:bg-red-500 group-hover:text-white transition-colors">
                1
              </span>
              <span className="material-symbols-outlined text-slate-500 group-hover:text-red-400 transition-colors">arrow_forward</span>
            </div>
            <h3 className="font-bold text-base text-white mb-2">Faça a Autoavaliação</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Responda a 6 perguntas rápidas de triagem conforme os protocolos da ANVISA RDC 34/2014 para saber se está apto antes de sair de casa.
            </p>
          </div>

          {/* Step 2 */}
          <div 
            onClick={() => onOpenAppointment()}
            className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-red-500/50 cursor-pointer transition-all hover:-translate-y-1 group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 font-extrabold flex items-center justify-center text-lg group-hover:bg-red-500 group-hover:text-white transition-colors">
                2
              </span>
              <span className="material-symbols-outlined text-slate-500 group-hover:text-red-400 transition-colors">arrow_forward</span>
            </div>
            <h3 className="font-bold text-base text-white mb-2">Agende em 2 Minutos</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Escolha o hemocentro mais próximo, selecione a data e o horário conveniente, e receba seu comprovante de atendimento prioritário.
            </p>
          </div>

          {/* Step 3 */}
          <div 
            onClick={() => onNavigate('hemocentros')}
            className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-red-500/50 cursor-pointer transition-all hover:-translate-y-1 group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 font-extrabold flex items-center justify-center text-lg group-hover:bg-red-500 group-hover:text-white transition-colors">
                3
              </span>
              <span className="material-symbols-outlined text-slate-500 group-hover:text-red-400 transition-colors">arrow_forward</span>
            </div>
            <h3 className="font-bold text-base text-white mb-2">Compareça e Salve Vidas</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Apresente o protocolo gerado, passe pela triagem rápida e faça sua doação com todo o suporte humanizado da equipe de saúde do hemocentro.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Direct Callout Banner */}
      <section className="p-8 rounded-3xl bg-gradient-to-r from-red-600 to-rose-700 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-red-600/20">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-2xl font-bold">Pronto para fazer a diferença hoje?</h2>
          <p className="text-xs text-red-100 max-w-lg">
            Os bancos de sangue de São Paulo, Rio e Belo Horizonte precisam do seu apoio para manter o atendimento a pacientes em tratamento intensivo.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onOpenAppointment()}
            className="px-6 py-3 rounded-xl bg-white text-red-700 hover:bg-red-50 font-extrabold text-sm transition-all shadow-md active:scale-95"
          >
            Agendar Minha Doação
          </button>
        </div>
      </section>
    </div>
  );
}
