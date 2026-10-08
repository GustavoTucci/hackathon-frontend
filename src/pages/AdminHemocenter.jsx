import React, { useState } from 'react';
import { Sliders, AlertTriangle, RotateCcw, Activity, PlusCircle, Terminal, CheckCircle2, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';
import { toast } from '../utils/toast';

export default function AdminHemocenter({ stocks = [], onUpdateStock, onResetBaseline, onAddAppeal, onNavigate }) {
  const [logs, setLogs] = useState([
    { id: 1, time: '14:30:12', tag: 'RNDS-INIT', text: 'Conexão bidirecional autenticada com Ministério da Saúde.', color: '#10B981' },
    { id: 2, time: '14:31:05', tag: 'AUDITORIA', text: 'Polling automático de bancos parceiros: Pró-Sangue (SP), Hemorio (RJ), Hemominas (MG).', color: '#94A3B8' },
    { id: 3, time: '14:32:00', tag: 'ALERTA', text: 'Tipo O- atingiu limite crítico (18%). Gatilho de push pré-ativado.', color: '#EF4444' }
  ]);

  const [isBroadcasting, setIsBroadcasting] = useState(false);

  // New patient modal simulation state
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [patientBlood, setPatientBlood] = useState('O-');
  const [patientBags, setPatientBags] = useState(4);
  const [patientHospital, setPatientHospital] = useState('Hospital das Clínicas FMUSP');

  const addLog = (tag, text, color = '#94A3B8') => {
    const time = new Date().toTimeString().split(' ')[0];
    setLogs(prev => [...prev, { id: Date.now(), time, tag, text, color }]);
  };

  const handleSliderChange = (bloodType, newPercent) => {
    if (onUpdateStock) {
      onUpdateStock(bloodType, parseInt(newPercent, 10));
    }
  };

  const handleStepChange = (bloodType, delta) => {
    const current = stocks.find(s => s.type === bloodType);
    if (!current) return;
    const newVal = Math.min(100, Math.max(0, current.percentage + delta));
    handleSliderChange(bloodType, newVal);
    addLog('SIMULADOR', `Ajuste manual no tipo ${bloodType}: agora em ${newVal}%.`);
  };

  const handleBroadcastAlert = () => {
    setIsBroadcasting(true);
    setTimeout(() => {
      setIsBroadcasting(false);
      addLog('BROADCAST', 'Alerta SOS disparado para 12.000 doadores (O-, A-, B-). Conexão RNDS confirmou envio.', '#DC2626');
      toast.show('🚨 Alerta SOS Disparado!', '12.000 doadores compatíveis notificados via Push e WhatsApp.');
    }, 1000);
  };

  const handleResetAll = () => {
    if (onResetBaseline) onResetBaseline();
    addLog('RESET', 'Valores de baseline restaurados para o roteiro de avaliação do Hackathon.', '#10B981');
    toast.show('Baseline Restaurado!', 'Estoques e dados do pitch foram redefinidos para o padrão inicial.');
  };

  const handlePatientSubmit = (e) => {
    e.preventDefault();
    if (onAddAppeal) {
      onAddAppeal({
        id: `app-${Date.now()}`,
        patientName,
        age: 35,
        condition: 'Cirurgia emergencial inserida pelo Painel do Hemocentro.',
        hospital: patientHospital,
        bloodTypeNeeded: patientBlood,
        bagsTarget: parseInt(patientBags, 10),
        bagsCollected: 0,
        urgencyLevel: 'Máxima',
        windowHours: 24,
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
        crm: 'CRM/SP 202.910 - Dr. Fernando Bastos',
        createdAt: new Date().toISOString().split('T')[0]
      });
    }

    // Deduct percentage from matching blood stock
    const target = stocks.find(s => s.type === patientBlood);
    if (target) {
      const deduction = Math.max(5, Math.round((patientBags / target.capacity) * 100));
      const newPct = Math.max(0, target.percentage - deduction);
      handleSliderChange(patientBlood, newPct);
    }

    addLog('TRANSFUSÃO', `Requisição cirúrgica prioritária: ${patientName} (${patientBags} bolsas ${patientBlood}) no ${patientHospital}.`, '#EF4444');
    setShowPatientModal(false);
    toast.show('Paciente Inserido na Fila!', `Estoque de ${patientBlood} recalculado automaticamente.`);
    setPatientName('');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Top Diagnostics Console Bar */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-xl)',
        padding: '2.5rem 2rem',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div style={{ maxWidth: '680px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
            <span className="badge badge-ods">Ambiente Avaliativo RNDS / SUS</span>
            <span className="badge badge-safe">Modo Hackathon: Ativo</span>
            <span className="badge" style={{ backgroundColor: '#F1F5F9', color: '#475569' }}>Latência: 24ms</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
            Simulador de Gestão Hospitalar & Auditoria Admin
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.375rem' }}>
            Console interativo para operadores de hemocentros clínicos e jurados do Hackathon testarem a reatividade de estoque, IA de despacho e alertas em tempo real.
          </p>
        </div>

        <div style={{
          backgroundColor: '#F8FAFC',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          border: '1px solid var(--border-color)',
          textAlign: 'right'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', justifyContent: 'flex-end', color: '#059669', fontWeight: '700', fontSize: '0.875rem' }}>
            <span className="animate-pulse-alert" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#059669' }} />
            <span>Cluster SP-01 Operacional</span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.25rem' }}>
            Sincronização SUS Contínua
          </span>
        </div>
      </div>

      {/* 3 Quick Action Triggers */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem'
      }}>
        {/* Trigger 1: Red Alert */}
        <div className="card" style={{
          backgroundColor: '#FEF2F2',
          border: '1.5px solid #FCA5A5',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#991B1B', marginBottom: '0.75rem' }}>
              <ShieldAlert size={24} />
              <h3 style={{ fontSize: '1.125rem', fontWeight: '800', margin: 0 }}>Disparar Alerta Vermelho SOS</h3>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#7F1D1D', marginBottom: '1.25rem', lineHeight: 1.5 }}>
              Emite notificação imediata via Push, WhatsApp e SMS para <strong>12.000 doadores</strong> compatíveis com os estoques críticos.
            </p>
          </div>
          <button
            onClick={handleBroadcastAlert}
            disabled={isBroadcasting}
            className="btn btn-danger btn-lg"
            style={{ width: '100%' }}
          >
            {isBroadcasting ? (
              <span>Disparando Convocação...</span>
            ) : (
              <>
                <AlertTriangle size={18} />
                <span>Emitir Alerta Vermelho Agora</span>
              </>
            )}
          </button>
        </div>

        {/* Trigger 2: New Patient Request */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', marginBottom: '0.75rem' }}>
              <PlusCircle size={24} />
              <h3 style={{ fontSize: '1.125rem', fontWeight: '800', margin: 0 }}>Lançar Pedido Urgente</h3>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
              Cadastre um paciente em cirurgia emergencial na fila SUS, reduzindo e recalculando automaticamente o nível de bolsas.
            </p>
          </div>
          <button
            onClick={() => setShowPatientModal(true)}
            className="btn btn-primary btn-lg"
            style={{ width: '100%' }}
          >
            <span>+ Cadastrar Paciente Prioritário</span>
          </button>
        </div>

        {/* Trigger 3: Reset Baseline */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#059669', marginBottom: '0.75rem' }}>
              <RotateCcw size={24} />
              <h3 style={{ fontSize: '1.125rem', fontWeight: '800', margin: 0 }}>Resetar Dados de Demonstração</h3>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
              Restaura instantaneamente os percentuais de estoque originais do benchmark (O- em 18%, A- em 22% e B- em 27%).
            </p>
          </div>
          <button
            onClick={handleResetAll}
            className="btn btn-secondary btn-lg"
            style={{ width: '100%' }}
          >
            <span>Restaurar Baseline Inicial</span>
          </button>
        </div>
      </div>

      {/* 8 Blood Sliders Bento Grid */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
              Controle Interativo de Estoque (8 Tipos Sanguíneos)
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Mova os controles deslizantes ou use os botões +/- 5% para observar a mudança de status e badges em tempo real.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem', fontWeight: '700' }}>
            <span className="badge badge-critical">&lt; 30% Crítico</span>
            <span className="badge badge-warning">30%-60% Alerta</span>
            <span className="badge badge-safe">&gt; 60% Seguro</span>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {stocks.map((stock) => {
            const isCrit = stock.percentage < 30;
            const isWarn = stock.percentage >= 30 && stock.percentage <= 60;
            const color = isCrit ? 'var(--status-critical)' : isWarn ? 'var(--status-warning)' : 'var(--status-safe)';
            const bagsCurrent = Math.round((stock.percentage / 100) * stock.capacity);

            return (
              <div key={stock.type} className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: isCrit ? 'var(--primary-light)' : '#F1F5F9',
                      color: isCrit ? 'var(--primary)' : 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '900',
                      fontSize: '1.125rem'
                    }}>
                      {stock.type}
                    </div>
                    <div>
                      <strong style={{ fontSize: '1rem', color: 'var(--text-primary)', display: 'block' }}>Tipo {stock.type}</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{stock.description}</span>
                    </div>
                  </div>
                  <span className={`badge ${isCrit ? 'badge-critical' : isWarn ? 'badge-warning' : 'badge-safe'}`}>
                    {isCrit ? 'Crítico' : isWarn ? 'Alerta' : 'Seguro'}
                  </span>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Nível de Reserva:</span>
                    <strong style={{ color: color, fontSize: '1.25rem' }}>{stock.percentage}%</strong>
                  </div>

                  {/* Range Slider */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={stock.percentage}
                    onChange={(e) => handleSliderChange(stock.type, e.target.value)}
                    style={{
                      width: '100%',
                      accentColor: color,
                      cursor: 'pointer',
                      height: '8px'
                    }}
                  />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                    <button
                      onClick={() => handleStepChange(stock.type, -5)}
                      className="btn btn-secondary btn-sm"
                    >
                      -5%
                    </button>
                    <span style={{ fontSize: '0.8125rem', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>
                      {bagsCurrent} / {stock.capacity} bolsas
                    </span>
                    <button
                      onClick={() => handleStepChange(stock.type, 5)}
                      className="btn btn-secondary btn-sm"
                    >
                      +5%
                    </button>
                  </div>
                </div>

                <div style={{
                  backgroundColor: 'var(--bg-surface-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.625rem 0.875rem',
                  fontSize: '0.75rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  color: 'var(--text-secondary)'
                }}>
                  <span>Autonomia: <strong>{(stock.percentage * 0.12).toFixed(1)} dias</strong></span>
                  <span style={{ color: isCrit ? 'var(--status-critical)' : 'inherit', fontWeight: isCrit ? '700' : 'normal' }}>
                    {isCrit ? '⚠ Alto risco cirúrgico' : 'Suporte estável'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Terminal Live Event Log Console */}
      <div style={{
        backgroundColor: '#0F172A',
        borderRadius: 'var(--radius-xl)',
        padding: '2rem',
        border: '1px solid #1E293B'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#FFFFFF' }}>
            <Terminal size={20} color="var(--primary)" />
            <h3 style={{ fontSize: '1.125rem', fontWeight: '700', margin: 0 }}>Terminal de Eventos & Auditoria RNDS</h3>
          </div>
          <button
            onClick={() => setLogs([])}
            style={{
              background: 'none',
              border: 'none',
              color: '#94A3B8',
              fontSize: '0.8125rem',
              cursor: 'pointer'
            }}
          >
            Limpar Console
          </button>
        </div>

        <div style={{
          backgroundColor: '#020617',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          fontFamily: 'monospace',
          fontSize: '0.8125rem',
          maxHeight: '220px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.375rem'
        }}>
          {logs.map((log) => (
            <div key={log.id} style={{ color: log.color, lineHeight: 1.4 }}>
              <span style={{ opacity: 0.6 }}>[{log.time}]</span> <strong>[{log.tag}]</strong> {log.text}
            </div>
          ))}
        </div>
      </div>

      {/* Patient Admission Modal */}
      {showPatientModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9000,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '2rem',
            maxWidth: '520px',
            width: '100%',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1.25rem' }}>
              Cadastrar Paciente Prioritário na Fila SUS
            </h3>

            <form onSubmit={handlePatientSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.25rem' }}>Nome Completo do Paciente</label>
                <input
                  type="text"
                  placeholder="Ex: Carlos Roberto Alencar"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  required
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border-color)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.25rem' }}>Tipo Sanguíneo</label>
                  <select
                    value={patientBlood}
                    onChange={(e) => setPatientBlood(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border-color)', backgroundColor: '#FFFFFF', fontWeight: '700' }}
                  >
                    {stocks.map(s => <option key={s.type} value={s.type}>{s.type}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.25rem' }}>Bolsas Solicitadas</label>
                  <input
                    type="number"
                    value={patientBags}
                    onChange={(e) => setPatientBags(e.target.value)}
                    min="1"
                    max="15"
                    required
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border-color)' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.25rem' }}>Hospital / Unidade Solicitante</label>
                <input
                  type="text"
                  value={patientHospital}
                  onChange={(e) => setPatientHospital(e.target.value)}
                  required
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border-color)' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setShowPatientModal(false)}
                  className="btn btn-secondary"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Inserir na Fila & Atualizar Estoque
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
