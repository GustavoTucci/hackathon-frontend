import React from 'react';
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

export default function BloodMeter({ type, percentage, bagsAvailable, capacity, daysOfReserve, description, onClick }) {
  const isCritical = percentage < 30;
  const isWarning = percentage >= 30 && percentage <= 60;
  const isSafe = percentage > 60;

  const barColor = isCritical ? 'var(--status-critical)' : isWarning ? 'var(--status-warning)' : 'var(--status-safe)';
  const statusBg = isCritical ? 'var(--status-critical-bg)' : isWarning ? 'var(--status-warning-bg)' : 'var(--status-safe-bg)';
  const statusBorder = isCritical ? 'var(--status-critical-border)' : isWarning ? 'var(--status-warning-border)' : 'var(--status-safe-border)';
  const statusLabel = isCritical ? 'Crítico' : isWarning ? 'Alerta' : 'Adequado';

  return (
    <div
      onClick={onClick}
      className="card"
      style={{
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden',
        border: `1.5px solid ${isCritical ? 'var(--status-critical-border)' : 'var(--border-color)'}`,
        backgroundColor: 'var(--bg-surface)'
      }}
    >
      {/* Indicator Accent Strip */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        backgroundColor: barColor
      }} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: isCritical ? 'var(--primary-light)' : '#F1F5F9',
            color: isCritical ? 'var(--primary)' : 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem',
            fontWeight: '900',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.08)'
          }}>
            {type}
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>Tipo {type}</h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{description || 'Concentrado de Hemácias'}</span>
          </div>
        </div>

        <span
          className={`badge ${isCritical ? 'badge-critical animate-pulse-alert' : isWarning ? 'badge-warning' : 'badge-safe'}`}
          style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
        >
          {isCritical ? <AlertCircle size={12} /> : isWarning ? <AlertTriangle size={12} /> : <CheckCircle size={12} />}
          {statusLabel}
        </span>
      </div>

      {/* Fluid Meter Bar */}
      <div style={{ marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.375rem' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Capacidade em Reserva</span>
          <span style={{ fontWeight: '800', color: barColor }}>{percentage}%</span>
        </div>
        <div style={{
          width: '100%',
          height: '10px',
          backgroundColor: '#E2E8F0',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: barColor,
            borderRadius: 'var(--radius-full)',
            transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
          }} />
        </div>
      </div>

      {/* Metrics Footer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '0.75rem',
        borderTop: '1px solid var(--border-color)',
        fontSize: '0.8125rem',
        color: 'var(--text-secondary)'
      }}>
        <span><strong>{bagsAvailable}</strong> / {capacity || 600} bolsas</span>
        <span style={{
          color: isCritical ? 'var(--status-critical)' : 'var(--text-secondary)',
          fontWeight: isCritical ? '700' : '500'
        }}>
          {daysOfReserve ? `Autonomia: ~${daysOfReserve} dias` : 'Estoque monitorado'}
        </span>
      </div>
    </div>
  );
}
