import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AppointmentModal from './components/AppointmentModal';
import Toast from './components/Toast';
import Home from './pages/Home';
import BloodStock from './pages/BloodStock';
import QuizEligibility from './pages/QuizEligibility';
import HemocentrosList from './pages/HemocentrosList';
import { getStocks, saveStocks, getHemocentros } from './utils/storage';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [stocks, setStocks] = useState(getStocks);
  const [hemocentros] = useState(getHemocentros);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [appointmentDefaults, setAppointmentDefaults] = useState({});
  const [toast, setToast] = useState(null);

  // Update stocks in storage whenever they change
  useEffect(() => {
    saveStocks(stocks);
  }, [stocks]);

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
