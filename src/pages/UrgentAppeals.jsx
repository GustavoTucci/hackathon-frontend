import React, { useState } from 'react';
import Modal from '../components/Modal';
import { AlertTriangle, PlusCircle, Share2, Heart, Clock, MapPin, CheckCircle2, UserPlus } from 'lucide-react';
import { toast } from '../utils/toast';

export default function UrgentAppeals({ appeals = [], onSaveAppeal, onNavigate }) {
  const [filter, setFilter] = useState('all'); // 'all', 'max', 'O-', 'A-', 'B-'
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New appeal form state
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [bloodType, setBloodType] = useState('O-');
  const [bagsTarget, setBagsTarget] = useState(6);
  const [hospital, setHospital] = useState('Hospital das Clínicas FMUSP');
  const [condition, setCondition] = useState('');
  const [urgencyLevel, setUrgencyLevel] = useState('Máxima');

  const filteredAppeals = appeals.filter(appeal => {
    if (filter === 'all') return true;
    if (filter === 'max') return appeal.urgencyLevel === 'Máxima';
    return appeal.bloodTypeNeeded === filter;
  });

  const handleShare = (appeal) => {
    const text = encodeURIComponent(
      `URGENTE: ${appeal.patientName} precisa de doação de sangue ${appeal.bloodTypeNeeded} no ${appeal.hospital}. Ajude ou compartilhe através do HemoVida!`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    toast.show('WhatsApp Aberto', 'Mensagem formatada com todos os dados clínicos de encaminhamento.');
  };

  const handleCreateAppeal = (e) => {
    e.preventDefault();
    const newAppeal = {
      id: `app-${Date.now()}`,
      patientName,
      age: parseInt(age, 10) || 30,
      condition: condition || 'Procedimento cirúrgico de urgência.',
      hospital,
      bloodTypeNeeded: bloodType,
      bagsTarget: parseInt(bagsTarget, 10),
      bagsCollected: 0,
      urgencyLevel,
      windowHours: urgencyLevel === 'Máxima' ? 24 : 48,
      photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      crm: 'CRM/SP Auditado pelo SUS',
      createdAt: new Date().toISOString().split('T')[0]
    };

    if (onSaveAppeal) {
      onSaveAppeal(newAppeal);
    }

    setIsModalOpen(false);
    toast.show('Pedido Publicado com Sucesso!', 'O apelo foi incluído no mural e emitido na rede.');
    // Reset
    setPatientName('');
    setAge('');
    setCondition('');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Bar */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-xl)',
        padding: '2.5rem 2rem',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ maxWidth: '680px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', backgroundColor: 'var(--status-critical-bg)', color: 'var(--status-critical)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              <span className="animate-pulse-alert" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--status-critical)' }} />
              SISTEMA DE EMERGÊNCIA SUS CONECTADO • TEMPO REAL
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
              Mural de Pedidos Urgentes de Sangue
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.375rem' }}>
              Casos clínicos prioritários internados na rede hospitalar que necessitam de doações com urgência máxima. Sua indicação direciona o estoque diretamente ao leito do paciente.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary btn-lg"
          >
            <PlusCircle size={20} />
            <span>+ Criar Novo Pedido de Sangue</span>
          </button>
        </div>

        {/* Filter Chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid #F1F5F9' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-secondary)', marginRight: '0.5rem' }}>
            Filtrar Apelos:
          </span>
          <button
            onClick={() => setFilter('all')}
            className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Todos os Casos ({appeals.length})
          </button>
          <button
            onClick={() => setFilter('max')}
            className={`btn btn-sm ${filter === 'max' ? 'btn-danger' : 'btn-secondary'}`}
          >
            Urgência Máxima
          </button>
          <button
            onClick={() => setFilter('O-')}
            className={`btn btn-sm ${filter === 'O-' ? 'btn-primary' : 'btn-secondary'}`}
          >
            O- Negativo
          </button>
          <button
            onClick={() => setFilter('A-')}
            className={`btn btn-sm ${filter === 'A-' ? 'btn-primary' : 'btn-secondary'}`}
          >
            A- Negativo
          </button>
          <button
            onClick={() => setFilter('B-')}
            className={`btn btn-sm ${filter === 'B-' ? 'btn-primary' : 'btn-secondary'}`}
          >
            B- Negativo
          </button>
        </div>
      </div>

      {/* Patient Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '1.5rem'
      }}>
        {filteredAppeals.map((appeal) => {
          const percent = Math.min(100, Math.round((appeal.bagsCollected / appeal.bagsTarget) * 100));
          const isMaxUrgency = appeal.urgencyLevel === 'Máxima';

          return (
            <div
              key={appeal.id}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                border: isMaxUrgency ? '1.5px solid var(--status-critical-border)' : '1px solid var(--border-color)'
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                backgroundColor: isMaxUrgency ? 'var(--status-critical)' : 'var(--status-warning)'
              }} />

              <div>
                {/* Header Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span className={`badge ${isMaxUrgency ? 'badge-critical' : 'badge-warning'}`}>
                    <AlertTriangle size={12} />
                    {appeal.urgencyLevel}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)' }}>
                    {appeal.createdAt}
                  </span>
                </div>

                {/* Patient Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1rem' }}>
                  <img
                    src={appeal.photo}
                    alt={appeal.patientName}
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: 'var(--radius-full)',
                      objectFit: 'cover',
                      border: '2px solid #FFFFFF',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                    }}
                  />
                  <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                      {appeal.patientName}, {appeal.age} anos
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      <MapPin size={14} color="var(--primary)" />
                      <span>{appeal.hospital}</span>
                    </div>
                  </div>
                </div>

                {/* Clinical Condition Callout */}
                <div style={{
                  backgroundColor: 'var(--bg-surface-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.875rem',
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '1rem',
                  lineHeight: 1.5
                }}>
                  <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>Quadro Clínico:</strong>
                  {appeal.condition}
                </div>

                {/* Blood Type Requirement Banner */}
                <div style={{
                  backgroundColor: 'var(--primary-light)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#991B1B', textTransform: 'uppercase' }}>Tipo Solicitado</span>
                    <div style={{ fontSize: '1.25rem', fontWeight: '900', color: 'var(--primary)' }}>{appeal.bloodTypeNeeded}</div>
                  </div>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--primary)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    fontWeight: '900'
                  }}>
                    {appeal.bloodTypeNeeded}
                  </div>
                </div>

                {/* Progress Goal */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '0.375rem' }}>
                    <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>
                      {appeal.bagsCollected} de {appeal.bagsTarget} bolsas arrecadadas
                    </span>
                    <span style={{ fontWeight: '800', color: 'var(--primary)' }}>{percent}% da meta</span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: '#E2E8F0',
                    borderRadius: 'var(--radius-full)',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${percent}%`,
                      height: '100%',
                      backgroundColor: 'var(--primary)',
                      borderRadius: 'var(--radius-full)'
                    }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.375rem' }}>
                    <span style={{ color: 'var(--status-critical)', fontWeight: '700' }}>
                      ⏳ Janela: {appeal.windowHours || 24}h restantes
                    </span>
                    <span>Faltam {appeal.bagsTarget - appeal.bagsCollected} bolsas</span>
                  </div>
                </div>
              </div>

              {/* Action CTAs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                <button
                  onClick={() => onNavigate('agendar-doacao')}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  <Heart size={16} />
                  <span>Vou Ajudar (Agendar para este Leito)</span>
                </button>
                <button
                  onClick={() => handleShare(appeal)}
                  className="btn btn-secondary"
                  style={{ width: '100%' }}
                >
                  <Share2 size={16} />
                  <span>Compartilhar Campanha no WhatsApp</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* New Appeal Modal Dialog */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Cadastrar Novo Pedido Urgente de Sangue"
        maxWidth="580px"
      >
        <form onSubmit={handleCreateAppeal} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.375rem' }}>Nome do Paciente</label>
            <input
              type="text"
              placeholder="Ex: Mariana Silveira"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border-color)' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.375rem' }}>Idade</label>
              <input
                type="number"
                placeholder="Ex: 34"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border-color)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.375rem' }}>Tipo Sanguíneo</label>
              <select
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border-color)', backgroundColor: '#FFFFFF', fontWeight: '700' }}
              >
                <option value="O-">O- (Doador Universal)</option>
                <option value="O+">O+</option>
                <option value="A-">A-</option>
                <option value="A+">A+</option>
                <option value="B-">B-</option>
                <option value="B+">B+</option>
                <option value="AB-">AB-</option>
                <option value="AB+">AB+</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.375rem' }}>Bolsas Necessárias</label>
              <input
                type="number"
                value={bagsTarget}
                onChange={(e) => setBagsTarget(e.target.value)}
                min="1"
                max="20"
                required
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border-color)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.375rem' }}>Grau de Urgência</label>
              <select
                value={urgencyLevel}
                onChange={(e) => setUrgencyLevel(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border-color)', backgroundColor: '#FFFFFF' }}
              >
                <option value="Máxima">Urgência Máxima (&lt; 24h)</option>
                <option value="Alta">Urgência Alta (&lt; 48h)</option>
                <option value="Moderada">Moderada (&lt; 72h)</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.375rem' }}>Hospital / Instituição de Referência</label>
            <input
              type="text"
              placeholder="Ex: Instituto do Coração (InCor) - HC FMUSP"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              required
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border-color)' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.375rem' }}>Quadro Clínico / Motivo</label>
            <textarea
              placeholder="Descreva brevemente a cirurgia ou tratamento..."
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              rows={3}
              required
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--border-color)', fontFamily: 'inherit' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="btn btn-secondary"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Publicar Pedido na Rede SUS
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
