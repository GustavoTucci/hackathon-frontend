import React from 'react';
import { Droplets, Heart, ShieldCheck, Award, Share2, Flame, Lock } from 'lucide-react';

const ICONS_MAP = {
  Droplets: Droplets,
  Heart: Heart,
  ShieldCheck: ShieldCheck,
  Award: Award,
  Share2: Share2,
  Flame: Flame
};

export default function BadgeCard({ badge }) {
  const IconComponent = ICONS_MAP[badge.icon] || Award;
  const isUnlocked = badge.unlocked;

  return (
    <div
      className="card"
      style={{
        backgroundColor: isUnlocked ? 'var(--bg-surface)' : '#F8FAFC',
        border: `1.5px solid ${isUnlocked ? '#FCD34D' : 'var(--border-color)'}`,
        opacity: isUnlocked ? 1 : 0.65,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '1.75rem 1.25rem',
        position: 'relative'
      }}
    >
      {/* Badge Tier Chip */}
      <span
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          fontSize: '0.6875rem',
          fontWeight: '700',
          padding: '2px 8px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: isUnlocked ? '#FEF3C7' : '#E2E8F0',
          color: isUnlocked ? '#92400E' : '#64748B'
        }}
      >
        {badge.tier || 'Conquista'}
      </span>

      {/* Badge Icon Circle */}
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: isUnlocked ? 'linear-gradient(135deg, #FDE68A, #F59E0B)' : '#E2E8F0',
          background: isUnlocked ? 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 50%, #F59E0B 100%)' : '#E2E8F0',
          color: isUnlocked ? '#B45309' : '#94A3B8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
          boxShadow: isUnlocked ? '0 8px 16px rgba(245, 158, 11, 0.25)' : 'none'
        }}
      >
        {isUnlocked ? <IconComponent size={32} /> : <Lock size={28} />}
      </div>

      <h4 style={{ fontSize: '1.0625rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.375rem' }}>
        {badge.title}
      </h4>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', flex: 1 }}>
        {badge.description}
      </p>

      {isUnlocked ? (
        <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--status-safe)' }}>
          Desbloqueado em {badge.unlockedAt || '2026-10-07'}
        </span>
      ) : (
        <span style={{ fontSize: '0.75rem', fontWeight: '500', color: 'var(--text-muted)' }}>
          Bloqueado • Realize ações para liberar
        </span>
      )}
    </div>
  );
}
