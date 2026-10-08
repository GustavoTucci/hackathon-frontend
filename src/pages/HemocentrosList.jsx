import React, { useState } from 'react';

export default function HemocentrosList({ hemocentros, onOpenAppointment }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [onlyOpen, setOnlyOpen] = useState(false);

  const filteredHemocentros = hemocentros.filter((h) => {
    if (onlyOpen && !h.isOpen) return false;
    if (selectedRegion !== 'all' && !h.region.toLowerCase().includes(selectedRegion.toLowerCase())) return false;
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      const matchName = h.name.toLowerCase().includes(term);
      const matchAddr = h.address.toLowerCase().includes(term);
      const matchRegion = h.region.toLowerCase().includes(term);
      return matchName || matchAddr || matchRegion;
    }
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Header & Search Area */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wide">
                Rede Credenciada SUS
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                24 Unidades Integradas
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Localizador de Hemocentros e Postos de Coleta
            </h1>
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              Consulte a unidade mais conveniente com tempo de espera estimado e tipos sanguíneos prioritários.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-red-50 border border-red-200 px-4 py-2.5 rounded-xl self-start md:self-auto">
            <span className="material-symbols-outlined text-[24px] text-primary">pin_drop</span>
            <div className="flex flex-col text-xs">
              <span className="font-bold text-slate-900">Doação Próxima</span>
              <span className="text-slate-500">Agendamento sem filas pelo SUS</span>
            </div>
          </div>
        </div>

        {/* 2. Interactive Search & Filters Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <span className="material-symbols-outlined text-[20px] text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por hospital, endereço, bairro ou cidade..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-slate-400"
            />
          </div>

          {/* Region Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs md:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">Todas as Regiões</option>
              <option value="são paulo">São Paulo (Capital)</option>
              <option value="campinas">Campinas & Interior</option>
              <option value="belo horizonte">Belo Horizonte (MG)</option>
              <option value="rio de janeiro">Rio de Janeiro (RJ)</option>
            </select>
          </div>

          {/* Toggle Filter */}
          <div className="md:col-span-3 flex items-center justify-end gap-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200 w-full justify-center">
              <input
                type="checkbox"
                checked={onlyOpen}
                onChange={(e) => setOnlyOpen(e.target.checked)}
                className="rounded text-primary focus:ring-primary"
              />
              <span>Apenas Abertos Agora</span>
            </label>
          </div>
        </div>
      </div>

      {/* 3. Hemocentros List / Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredHemocentros.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-md transition-all space-y-5 flex flex-col justify-between"
          >
            {/* Top Info */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold text-[10px] uppercase">
                      {item.region}
                    </span>
                    {item.isReference && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">star</span>
                        Referência
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-snug">
                    {item.name}
                  </h3>
                </div>

                <div className="text-right shrink-0">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    {item.status}
                  </span>
                  <span className="block text-[11px] text-slate-500 mt-1 font-medium">
                    Espera: <strong>{item.waitTime}</strong>
                  </span>
                </div>
              </div>

              {/* Address & Transport */}
              <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5">location_on</span>
                  <span>{item.address}</span>
                </div>
                {item.metro && (
                  <div className="flex items-center gap-2 text-slate-500">
                    <span className="material-symbols-outlined text-[16px] text-slate-400 shrink-0">train</span>
                    <span>{item.metro}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-slate-500 pt-1 border-t border-slate-200/60 mt-1">
                  <span className="material-symbols-outlined text-[16px] text-slate-400 shrink-0">schedule</span>
                  <span>{item.hours}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <span className="material-symbols-outlined text-[16px] text-slate-400 shrink-0">call</span>
                  <span>{item.phone}</span>
                </div>
              </div>

              {/* Critical Needs Tags */}
              {item.criticalNeeds && item.criticalNeeds.length > 0 && (
                <div className="flex items-center gap-2 pt-1 flex-wrap">
                  <span className="text-[11px] font-bold text-red-700 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-red-600">priority_high</span>
                    Necessidade Urgente Hoje:
                  </span>
                  {item.criticalNeeds.map((type) => (
                    <span
                      key={type}
                      className="px-2 py-0.5 rounded-md bg-red-100 text-red-800 font-extrabold text-xs shadow-xs"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => onOpenAppointment({ defaultHemocenterId: item.id })}
                className="flex-1 py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-1.5 active:scale-95"
              >
                <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                Agendar Neste Posto
              </button>

              <a
                href={item.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px] text-slate-500">directions</span>
                Ver Rota
              </a>
            </div>
          </div>
        ))}

        {filteredHemocentros.length === 0 && (
          <div className="col-span-full p-12 text-center rounded-2xl bg-white border border-slate-200 space-y-3">
            <span className="material-symbols-outlined text-[48px] text-slate-300">search_off</span>
            <h4 className="font-bold text-base text-slate-700">Nenhum hemocentro encontrado</h4>
            <p className="text-xs text-slate-400">Tente ajustar seus termos de pesquisa ou remover os filtros aplicados.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedRegion('all');
                setOnlyOpen(false);
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200 transition-colors"
            >
              Limpar Filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
