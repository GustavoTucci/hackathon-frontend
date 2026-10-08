import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
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

  return (
    <div className="min-h-screen flex flex-col bg-surface font-sans text-on-surface antialiased">
      {/* Persistent Global Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenAppointment={handleOpenAppointment}
        criticalTypes={criticalTypes}
      />

      {/* Main Page Area with Dynamic SPA Rendering */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-8 pt-32 md:pt-36 pb-12">
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

        {currentTab === 'admin' && (
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

      {/* Global Footer */}
      <Footer
        setCurrentTab={setCurrentTab}
        onOpenAppointment={handleOpenAppointment}
      />

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
