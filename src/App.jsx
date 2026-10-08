import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminHeader from './components/AdminHeader';
import AppointmentModal from './components/AppointmentModal';
import Toast from './components/Toast';
import Home from './pages/Home';
import BloodStock from './pages/BloodStock';
import QuizEligibility from './pages/QuizEligibility';
import HemocentrosList from './pages/HemocentrosList';
import ScheduleDonation from './pages/ScheduleDonation';
import DigitalCard from './pages/DigitalCard';
import Gamification from './pages/Gamification';
import UrgentAppeals from './pages/UrgentAppeals';
import CompatibilityGuide from './pages/CompatibilityGuide';
import AdminHemocenter from './pages/AdminHemocenter';
import { getStocks, saveStocks, getHemocentros, getAppeals, saveAppeals, resetAllData } from './utils/storage';
import { INITIAL_BLOOD_STOCKS } from './data/initialStock';
import { INITIAL_APPEALS } from './data/urgentAppeals';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [stocks, setStocks] = useState(getStocks);
  const [appeals, setAppeals] = useState(getAppeals);
  const [hemocentros] = useState(getHemocentros);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [appointmentDefaults, setAppointmentDefaults] = useState({});
  const [toast, setToast] = useState(null);

  // Update stocks in storage whenever they change
  useEffect(() => {
    saveStocks(stocks);
  }, [stocks]);

  // Update appeals in storage whenever they change
  useEffect(() => {
    saveAppeals(appeals);
  }, [appeals]);

  const handleOpenAppointment = (defaults = {}) => {
    setAppointmentDefaults(defaults);
    setIsAppointmentOpen(true);
  };

  const handleAppointmentSuccess = (message) => {
    setToast({
      type: 'success',
      title: 'Doação Agendada!',
      message
    });
  };

  const handleShowToast = (data) => {
    if (typeof data === 'string') {
      setToast({
        type: 'success',
        title: 'HemoVida',
        message: data
      });
    } else if (data && typeof data === 'object') {
      setToast(data);
    }
  };

  const handleAdminUpdateStock = (bloodType, newPercentage) => {
    setStocks(prev => {
      const updated = prev.map(item => {
        if (item.type === bloodType) {
          let newStatus = 'safe';
          let newStatusLabel = 'Adequado';
          if (newPercentage < 30) {
            newStatus = 'critical';
            newStatusLabel = 'Crítico';
          } else if (newPercentage < 60) {
            newStatus = 'warning';
            newStatusLabel = 'Alerta';
          }
          return {
            ...item,
            percentage: newPercentage,
            status: newStatus,
            statusLabel: newStatusLabel,
            bagsAvailable: Math.round(newPercentage * 2.1),
            lastUpdated: 'Ajustado via Painel Admin'
          };
        }
        return item;
      });
      return updated;
    });
  };

  const handleResetBaseline = () => {
    resetAllData();
    setStocks(INITIAL_BLOOD_STOCKS);
    setAppeals(INITIAL_APPEALS);
    setToast({
      type: 'success',
      title: 'Baseline Restaurado!',
      message: 'Estoques e dados do pitch foram redefinidos para os padrões da ANVISA/SUS.'
    });
  };

  const handleAddAppeal = (newAppeal) => {
    setAppeals(prev => [newAppeal, ...prev]);
  };

  // Simulation of stock variations in real time
  const handleUpdateStockSimulation = () => {
    setStocks((prevStocks) => {
      const updated = prevStocks.map((item) => {
        // Random fluctuation +- 4%
        const delta = Math.floor(Math.random() * 9) - 4;
        let newPct = Math.max(8, Math.min(95, item.percentage + delta));
        let newStatus = 'safe';
        let newStatusLabel = 'Adequado';

        if (newPct < 30) {
          newStatus = 'critical';
          newStatusLabel = 'Crítico';
        } else if (newPct < 60) {
          newStatus = 'warning';
          newStatusLabel = 'Alerta';
        }

        return {
          ...item,
          percentage: newPct,
          status: newStatus,
          statusLabel: newStatusLabel,
          bagsAvailable: Math.round(newPct * 2.1),
          lastUpdated: 'Atualizado agora'
        };
      });

      setToast({
        type: 'warning',
        title: 'Estoque Atualizado',
        message: 'Barramento SUS sincronizou novas bolsas dos hemocentros!'
      });

      return updated;
    });
  };

  const criticalTypes = stocks.filter(s => s.status === 'critical').map(s => s.type);
  const isAdminMode = currentTab === 'admin';

  return (
    <div className={`min-h-screen flex flex-col font-sans antialiased ${isAdminMode ? 'bg-slate-950 text-slate-100' : 'bg-surface text-on-surface'}`}>
      {/* Dynamic Header: Dedicated Admin Header vs Regular Public Donor Header */}
      {isAdminMode ? (
        <AdminHeader
          onExitAdmin={() => setCurrentTab('home')}
          onResetBaseline={handleResetBaseline}
        />
      ) : (
        <Header
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          onOpenAppointment={handleOpenAppointment}
          criticalTypes={criticalTypes}
        />
      )}

      {/* Main Page Area with Dynamic SPA Rendering */}
      <main className={`flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-12 ${isAdminMode ? 'pt-36 md:pt-32' : 'pt-32 md:pt-36'}`}>
        {/* PUBLIC DONOR VIEWS */}
        {!isAdminMode && (
          <>
            {currentTab === 'home' && (
              <Home
                onNavigate={setCurrentTab}
                onOpenAppointment={handleOpenAppointment}
                stocks={stocks}
              />
            )}

            {currentTab === 'estoque' && (
              <BloodStock
                stocks={stocks}
                onOpenAppointment={handleOpenAppointment}
                onUpdateStock={handleUpdateStockSimulation}
              />
            )}

            {currentTab === 'quiz' && (
              <QuizEligibility
                onNavigate={setCurrentTab}
                onOpenAppointment={handleOpenAppointment}
              />
            )}

            {currentTab === 'hemocentros' && (
              <HemocentrosList
                hemocentros={hemocentros}
                onOpenAppointment={handleOpenAppointment}
              />
            )}

            {currentTab === 'agendamento' && (
              <ScheduleDonation
                onNavigate={setCurrentTab}
                showToast={handleShowToast}
              />
            )}

            {currentTab === 'carteirinha' && (
              <DigitalCard
                onNavigate={setCurrentTab}
                showToast={handleShowToast}
              />
            )}

            {currentTab === 'gamificacao' && (
              <Gamification
                onNavigate={setCurrentTab}
                showToast={handleShowToast}
              />
            )}

            {currentTab === 'pedidos-urgentes' && (
              <UrgentAppeals
                appeals={appeals}
                onSaveAppeal={handleAddAppeal}
                onNavigate={setCurrentTab}
                onOpenAppointment={handleOpenAppointment}
                showToast={handleShowToast}
              />
            )}

            {currentTab === 'compatibilidade' && (
              <CompatibilityGuide
                onNavigate={setCurrentTab}
                onOpenAppointment={handleOpenAppointment}
                showToast={handleShowToast}
              />
            )}
          </>
        )}

        {/* DEDICATED ADMIN / HOSPITAL ENVIRONMENT (Reusing AdminHemocenter component) */}
        {isAdminMode && (
          <AdminHemocenter
            stocks={stocks}
            onUpdateStock={handleAdminUpdateStock}
            onResetBaseline={handleResetBaseline}
            onAddAppeal={handleAddAppeal}
            onNavigate={setCurrentTab}
            showToast={handleShowToast}
          />
        )}
      </main>

      {/* Dynamic Footer: Dedicated Admin Backoffice Footer vs Regular Public Donor Footer */}
      {isAdminMode ? (
        <footer className="w-full bg-slate-900 border-t border-slate-800 text-slate-400 py-6 text-xs">
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-semibold text-slate-300">
                HemoVida Gestão • Sistema Hospitalar de Telemetria e Estoques RNDS / SUS
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-slate-500 hidden md:inline">Ambiente de Simulação e Crise</span>
              <button
                onClick={() => setCurrentTab('home')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-red-400 hover:text-red-300 font-bold border border-slate-700 transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                Retornar ao Portal do Doador
              </button>
            </div>
          </div>
        </footer>
      ) : (
        <Footer
          setCurrentTab={setCurrentTab}
          onOpenAppointment={handleOpenAppointment}
        />
      )}

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        hemocentros={hemocentros}
        defaultBloodType={appointmentDefaults.defaultBloodType || 'O-'}
        defaultHemocenterId={appointmentDefaults.defaultHemocenterId || ''}
        onSuccess={handleAppointmentSuccess}
      />

      {/* Floating Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
