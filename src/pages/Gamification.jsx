import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Trophy, 
  Shield, 
  Heart, 
  Droplet, 
  Share2, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  Calendar, 
  Flame, 
  ExternalLink, 
  Download, 
  Camera, 
  School, 
  Building2, 
  Users, 
  ChevronRight, 
  X,
  Megaphone,
  AlertTriangle,
  Check
} from 'lucide-react';
import { Storage } from '../utils/storage';

export default function Gamification({ onNavigate, showToast }) {
  const [donor, setDonor] = useState(() => Storage.getDonor());
  const [badges, setBadges] = useState(() => Storage.getBadges());
  const [filter, setFilter] = useState('all'); // 'all' | 'unlocked' | 'locked'
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [showStoryModal, setShowStoryModal] = useState(false);

  useEffect(() => {
    const handleDonorUpdate = (e) => setDonor(e.detail || Storage.getDonor());
    const handleBadgesUpdate = (e) => setBadges(e.detail || Storage.getBadges());

    window.addEventListener("hemovida_donor_updated", handleDonorUpdate);
    window.addEventListener("hemovida_badges_updated", handleBadgesUpdate);

    return () => {
      window.removeEventListener("hemovida_donor_updated", handleDonorUpdate);
      window.removeEventListener("hemovida_badges_updated", handleBadgesUpdate);
    };
  }, []);

  // Filtrar medalhas
  const filteredBadges = badges.filter((b) => {
    if (filter === 'unlocked') return b.unlocked;
    if (filter === 'locked') return !b.unlocked;
    return true;
  });

  const unlockedCount = badges.filter(b => b.unlocked).length;
  const lockedCount = badges.filter(b => !b.unlocked).length;

  // Desbloqueia Embaixador Solidário ao compartilhar
  const unlockAmbassadorBadge = () => {
    const ambassador = badges.find(b => b.id === "badge-ambassador");
    if (ambassador && !ambassador.unlocked) {
      const updated = badges.map(b => {
        if (b.id === "badge-ambassador") {
          return {
            ...b,
            unlocked: true,
            unlockedAt: new Date().toLocaleDateString("pt-BR")
          };
        }
        return b;
      });
      Storage.saveBadges(updated);
      setBadges(updated);

      // Concede XP extra ao doador
      const updatedDonor = {
        ...donor,
        xp: Math.min(donor.maxXp, donor.xp + 150)
      };
      Storage.saveDonor(updatedDonor);
      setDonor(updatedDonor);

      if (showToast) {
        showToast("📢 Conquista Desbloqueada: Embaixador Solidário (+150 XP)!");
      }
    }
  };

  const handleShareWhatsApp = () => {
    unlockAmbassadorBadge();
    const text = encodeURIComponent(
      `Sou doador voluntário de sangue no HemoVida com ${donor.totalDonations} doações e mais de ${donor.livesSaved} vidas salvas! Junte-se a nós para salvar vidas: https://hemovida.saude.gov.br`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    if (showToast) {
      showToast("Link de conscientização compartilhado no WhatsApp!");
    }
  };

  const handleDownloadCertificate = () => {
    if (showToast) {
      showToast("Certificado Oficial de Doador Benemérito gerado em PDF!");
    }
  };

  // Renderizador de Ícones de Medalhas
  const renderBadgeIcon = (iconName, isUnlocked) => {
    const className = `w-7 h-7 ${isUnlocked ? 'text-primary' : 'text-on-surface-variant/40'}`;
    switch (iconName) {
      case "Droplets":
        return <Droplet className={`${className} fill-current`} />;
      case "Heart":
        return <Heart className={`${className} fill-current`} />;
      case "Award":
        return <Award className={className} />;
      case "Shield":
        return <Shield className={className} />;
      case "Megaphone":
        return <Megaphone className={className} />;
      case "AlertTriangle":
        return <AlertTriangle className={className} />;
      default:
        return <Trophy className={className} />;
    }
  };

  const xpPercent = Math.min(100, Math.round((donor.xp / donor.maxXp) * 100));
  const xpRemaining = Math.max(0, donor.maxXp - donor.xp);

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-10">
      {/* Top Diagnostic & Recognition Status Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-surface-container-low shadow-xs border border-outline-variant/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold shadow-sm">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-on-surface-variant font-bold block">
              Registro Nacional de Fidelização SUS
            </span>
            <h1 className="text-xl font-extrabold text-on-surface tracking-tight">
              Gamificação Solidária & Reconhecimento Cívico
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
          <span className="px-3 py-1.5 rounded-full bg-surface-container-lowest text-primary text-xs font-bold shadow-xs flex items-center gap-1.5 border border-outline-variant/20">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            Doador Ativo • RNDS #BR-94821
          </span>
        </div>
      </div>

      {/* Section 1: Hero Header & Donor Tier Profile Card */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Main Profile & Tier Card (8 cols) */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-64 h-64 bg-primary-fixed/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-2xl shadow-md border-2 border-white">
                    GT
                  </div>
                  <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-md bg-primary text-white text-[10px] font-bold shadow-xs">
                    {donor.bloodType}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-black text-on-surface">{donor.name}</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold">
                      Nível {donor.tierLevel || 2}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant flex items-center gap-1.5 mt-0.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    {donor.totalDonations} Doações Realizadas • {donor.livesSaved} Vidas Potencialmente Impactadas
                  </p>
                </div>
              </div>

              <div className="px-4 py-2.5 rounded-xl bg-surface-container flex items-center gap-2.5">
                <span className="text-2xl">🔥</span>
                <div>
                  <div className="text-xs font-bold text-on-surface">Sequência de 2 Anos Ativo</div>
                  <div className="text-[11px] text-on-surface-variant">Doações semestrais ininterruptas</div>
                </div>
              </div>
            </div>

            {/* Tier Progress Box */}
            <div className="p-5 rounded-xl bg-surface-container-low space-y-3 border border-outline-variant/20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-sm font-bold text-on-surface">
                    Nível {donor.tierLevel || 2} — {donor.level || "Doador Frequente"}
                  </span>
                  <span className="text-xs text-on-surface-variant font-medium">
                    ➔ Rumo a Nível 3 — Doador Honorário
                  </span>
                </div>
                <span className="text-xs font-bold text-primary">
                  {donor.xp} / {donor.maxXp} XP
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 rounded-full bg-surface-container overflow-hidden">
                <div 
                  className="h-full bg-primary-container rounded-full transition-all duration-700 ease-out" 
                  style={{ width: `${xpPercent}%` }}
                ></div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-on-surface-variant pt-1 gap-1">
                <span>
                  Faltam <strong className="text-on-surface">{xpRemaining} XP</strong> para alcançar o status Ouro
                </span>
                <span className="text-emerald-700 font-bold">+100 XP por doação regular</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 flex flex-wrap items-center justify-between gap-4 text-xs text-on-surface-variant border-t border-surface-container">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-on-surface-variant" />
              <span>Próxima doação liberada: <strong className="text-on-surface">{donor.nextEligibleDate || "15/04/2026"}</strong></span>
            </div>
            <button
              onClick={() => onNavigate && onNavigate('schedule')}
              className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-secondary transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Agendar Próxima Doação</span>
            </button>
          </div>
        </div>

        {/* Tier Privileges & Shield Showcase Card (4 cols) */}
        <div className="lg:col-span-4 p-6 sm:p-8 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-on-surface-variant uppercase tracking-wider font-bold">
                Insígnia de Honra
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface text-xs font-medium">
                Prata Razoada
              </span>
            </div>

            <div className="flex flex-col items-center justify-center py-4 text-center">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-surface-container to-surface-container-highest flex items-center justify-center shadow-inner relative mb-3">
                <Shield className="w-16 h-16 text-primary drop-shadow" />
                <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold text-xs shadow-xs">
                  2
                </div>
              </div>
              <h3 className="text-lg font-bold text-on-surface">Escudo da Solidariedade</h3>
              <p className="text-xs text-on-surface-variant max-w-xs mt-1">
                Concedido aos voluntários com compromisso clínico contínuo e histórico sanitário exemplar.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-on-surface uppercase tracking-wider block">
                Benefícios Cívicos Ativos:
              </span>
              <ul className="space-y-2 text-xs text-on-surface-variant">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Isenção de taxa em concursos públicos estaduais</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Atendimento prioritário na triagem clínica</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Canal direto via WhatsApp para plantão de urgência</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-4 mt-4 bg-surface-container-low p-3.5 rounded-xl flex items-center justify-between border border-outline-variant/20">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-on-surface">Próximo Nível: Doador Honorário</span>
            </div>
            <span className="text-xs font-bold text-primary">500 XP</span>
          </div>
        </div>
      </section>

      {/* Section 2: Solidarity Badges Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-primary-fixed text-on-primary-fixed text-xs font-bold uppercase tracking-wider">
                Galeria de Mérito
              </span>
              <h2 className="text-2xl font-black text-on-surface">Medalhas de Impacto Solidário</h2>
            </div>
            <p className="text-xs text-on-surface-variant mt-1">
              Conquistas oficiais homologadas pelo HemoVida em parceria com a rede SUS e hemocentros credenciados.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-container">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filter === 'all' ? 'bg-surface-container-lowest text-primary shadow-xs' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              Todas ({badges.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('unlocked')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filter === 'unlocked' ? 'bg-surface-container-lowest text-primary shadow-xs' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              Desbloqueadas ({unlockedCount})
            </button>
            <button
              type="button"
              onClick={() => setFilter('locked')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filter === 'locked' ? 'bg-surface-container-lowest text-primary shadow-xs' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              Bloqueadas ({lockedCount})
            </button>
          </div>
        </div>

        {/* Badges Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBadges.map((badge) => (
            <div
              key={badge.id}
              onClick={() => setSelectedBadge(badge)}
              className={`cursor-pointer p-6 rounded-2xl shadow-sm transition-all flex flex-col justify-between group border ${
                badge.unlocked 
                  ? 'bg-surface-container-lowest hover:shadow-md border-outline-variant/30 hover:border-primary/40' 
                  : 'bg-surface-container-low opacity-90 border-outline-variant/20'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center relative shadow-xs transition-transform group-hover:scale-105 ${
                    badge.unlocked ? 'bg-primary-fixed/50' : 'bg-surface-container'
                  }`}>
                    {renderBadgeIcon(badge.icon, badge.unlocked)}
                    {badge.unlocked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 absolute -bottom-1 -right-1 bg-surface-container-lowest rounded-full" />
                    ) : (
                      <Lock className="w-4 h-4 text-on-surface-variant/70 absolute -bottom-1 -right-1 bg-surface-container rounded-full p-0.5" />
                    )}
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 ${
                    badge.unlocked 
                      ? 'bg-surface-container text-emerald-700' 
                      : 'bg-surface-container-high text-on-surface-variant'
                  }`}>
                    {badge.unlocked ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        Desbloqueada
                      </>
                    ) : (
                      <>
                        <Lock className="w-3 h-3" />
                        Bloqueada
                      </>
                    )}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-on-surface">{badge.title}</h3>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                    {badge.description}
                  </p>
                </div>

                {/* Progress bar for locked badges */}
                {!badge.unlocked && badge.requiredDonations > 0 && (
                  <div className="space-y-1.5 pt-2">
                    <div className="flex items-center justify-between text-[11px] text-on-surface-variant">
                      <span>Progresso: {donor.totalDonations} de {badge.requiredDonations} doações</span>
                      <span className="font-bold">{Math.min(100, Math.round((donor.totalDonations / badge.requiredDonations) * 100))}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                      <div 
                        className="h-full bg-primary-container rounded-full" 
                        style={{ width: `${Math.min(100, (donor.totalDonations / badge.requiredDonations) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 bg-surface-container-low -mx-6 -mb-6 p-4 rounded-b-2xl flex items-center justify-between border-t border-surface-container">
                <span className="text-[11px] text-on-surface-variant">
                  {badge.unlocked ? `Desbloqueado em ${badge.unlockedAt || "14/02/2026"}` : `Requer ${badge.requiredDonations || 1} doações`}
                </span>
                <span className={`text-xs font-bold ${badge.unlocked ? 'text-primary' : 'text-on-surface-variant'}`}>
                  +{badge.xp} XP
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Social Share & Community Impact Action Bar */}
      <section className="p-6 sm:p-8 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <Share2 className="w-3.5 h-3.5" />
              Multiplicador de Solidariedade
            </div>
            <h2 className="text-2xl font-black text-on-surface tracking-tight">
              Compartilhe suas conquistas e inspire novos doadores!
            </h2>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Cada compartilhamento com certificado ou status ativo gera conscientização e incentiva até 3 novos cadastros de doadores voluntários.
            </p>
          </div>

          {/* Social Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="px-4 py-3 rounded-xl bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 transition-all flex items-center gap-2 shadow-sm"
            >
              <Share2 className="w-4 h-4" />
              <span>Compartilhar no WhatsApp</span>
            </button>
            <button
              type="button"
              onClick={() => setShowStoryModal(true)}
              className="px-4 py-3 rounded-xl bg-secondary-fixed text-on-secondary-fixed font-bold text-xs hover:bg-secondary-fixed-dim transition-all flex items-center gap-2 shadow-sm"
            >
              <Camera className="w-4 h-4" />
              <span>Gerar Story para Instagram</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadCertificate}
              className="px-4 py-3 rounded-xl bg-surface-container text-on-surface font-bold text-xs hover:bg-surface-container-high transition-all flex items-center gap-2 shadow-sm border border-outline-variant/30"
            >
              <Download className="w-4 h-4 text-primary" />
              <span>Baixar Certificado (PDF)</span>
            </button>
          </div>
        </div>

        {/* Certificate Banner Callout */}
        <div className="p-5 rounded-xl bg-surface-container-low flex flex-col md:flex-row items-center justify-between gap-4 border border-outline-variant/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-bold shadow-xs">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-on-surface">Certificado Oficial de Doador Benemérito</div>
              <div className="text-xs text-on-surface-variant">Autenticado com carimbo digital ICP-Brasil e código de validação SUS #HV-2026-94821</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-on-surface-variant font-medium">Validado em 14/02/2026</span>
            <span className="px-3 py-1 rounded-full bg-surface-container-lowest text-emerald-700 text-xs font-bold shadow-xs border border-emerald-200">
              Autêntico
            </span>
          </div>
        </div>
      </section>

      {/* Section 4: Community Leaderboard */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-secondary-fixed text-on-secondary-fixed text-xs font-bold uppercase tracking-wider">
                Impacto Coletivo
              </span>
              <h2 className="text-2xl font-black text-on-surface">Ranking de Mobilização Solidária • São Paulo</h2>
            </div>
            <p className="text-xs text-on-surface-variant mt-1">
              Gincana humanitária interinstitucional de doação de sangue no estado de São Paulo.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-on-surface">
            <span>Região Metropolitana & Interior</span>
          </div>
        </div>

        {/* Leaderboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Category 1: Universidades */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-surface-container text-xs font-bold text-on-surface flex items-center gap-1.5">
                  <School className="w-4 h-4 text-primary" />
                  Universidades
                </span>
                <span className="text-xs text-on-surface-variant font-medium">Top 3</span>
              </div>
              <h3 className="text-lg font-bold text-on-surface">Troféu Trote Solidário</h3>
              <p className="text-xs text-on-surface-variant">Calouros e veteranos mobilizados pela vida.</p>
            </div>

            <div className="space-y-2.5">
              <div className="p-3.5 rounded-xl bg-surface-container-low flex items-center justify-between border border-outline-variant/20">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center">1º</span>
                  <div>
                    <div className="text-xs font-bold text-on-surface">Medicina USP / HC</div>
                    <div className="text-[11px] text-on-surface-variant">420 bolsas coletadas</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700">+1.680 vidas</span>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-container-lowest shadow-xs flex items-center justify-between border border-outline-variant/20">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center">2º</span>
                  <div>
                    <div className="text-xs font-bold text-on-surface">Poli-USP</div>
                    <div className="text-[11px] text-on-surface-variant">315 bolsas coletadas</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700">+1.260 vidas</span>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-container-lowest shadow-xs flex items-center justify-between border border-outline-variant/20">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-50 text-amber-700 font-bold text-xs flex items-center justify-center">3º</span>
                  <div>
                    <div className="text-xs font-bold text-on-surface">Unicamp Campinas</div>
                    <div className="text-[11px] text-on-surface-variant">288 bolsas coletadas</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700">+1.152 vidas</span>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button 
                type="button" 
                onClick={() => { if (showToast) showToast("Tabela universitária completa em fase de atualização."); }}
                className="text-xs text-primary font-bold hover:underline inline-flex items-center gap-1"
              >
                Ver classificação completa <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Category 2: Empresas & ESG */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-surface-container text-xs font-bold text-on-surface flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-primary" />
                  Empresas & ESG
                </span>
                <span className="text-xs text-on-surface-variant font-medium">Top 3</span>
              </div>
              <h3 className="text-lg font-bold text-on-surface">Selo Empresa Cidadã</h3>
              <p className="text-xs text-on-surface-variant">Corredores corporativos salvando estoques.</p>
            </div>

            <div className="space-y-2.5">
              <div className="p-3.5 rounded-xl bg-surface-container-low flex items-center justify-between border border-outline-variant/20">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center">1º</span>
                  <div>
                    <div className="text-xs font-bold text-on-surface">Banco Itaú Solidário</div>
                    <div className="text-[11px] text-on-surface-variant">540 colaboradores</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700">+2.160 vidas</span>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-container-lowest shadow-xs flex items-center justify-between border border-outline-variant/20">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center">2º</span>
                  <div>
                    <div className="text-xs font-bold text-on-surface">Ambev Polo SP</div>
                    <div className="text-[11px] text-on-surface-variant">390 colaboradores</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700">+1.560 vidas</span>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-container-lowest shadow-xs flex items-center justify-between border border-outline-variant/20">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-50 text-amber-700 font-bold text-xs flex items-center justify-center">3º</span>
                  <div>
                    <div className="text-xs font-bold text-on-surface">Embraer Gavião Peixoto</div>
                    <div className="text-[11px] text-on-surface-variant">275 colaboradores</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700">+1.100 vidas</span>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button 
                type="button" 
                onClick={() => { if (showToast) showToast("Formulário de cadastro corporativo enviado para análise."); }}
                className="text-xs text-primary font-bold hover:underline inline-flex items-center gap-1"
              >
                Cadastrar sua empresa <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Category 3: Comunidades de Bairro */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-surface-container text-xs font-bold text-on-surface flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-primary" />
                  Comunidades
                </span>
                <span className="text-xs text-on-surface-variant font-medium">Top 3</span>
              </div>
              <h3 className="text-lg font-bold text-on-surface">Bairros Unidos pela Vida</h3>
              <p className="text-xs text-on-surface-variant">Coletivos locais e associações de moradores.</p>
            </div>

            <div className="space-y-2.5">
              <div className="p-3.5 rounded-xl bg-surface-container-low flex items-center justify-between border border-outline-variant/20">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center">1º</span>
                  <div>
                    <div className="text-xs font-bold text-on-surface">Mooca & Brás Sangue Bom</div>
                    <div className="text-[11px] text-on-surface-variant">260 doadores ativos</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700">+1.040 vidas</span>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-container-lowest shadow-xs flex items-center justify-between border border-outline-variant/20">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center">2º</span>
                  <div>
                    <div className="text-xs font-bold text-on-surface">Coletivo Vila Madalena</div>
                    <div className="text-[11px] text-on-surface-variant">210 doadores ativos</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700">+840 vidas</span>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-container-lowest shadow-xs flex items-center justify-between border border-outline-variant/20">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-50 text-amber-700 font-bold text-xs flex items-center justify-center">3º</span>
                  <div>
                    <div className="text-xs font-bold text-on-surface">Amigos de Santana / Znorte</div>
                    <div className="text-[11px] text-on-surface-variant">195 doadores ativos</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700">+780 vidas</span>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button 
                type="button" 
                onClick={() => { if (showToast) showToast("Iniciativa de bairro registrada com sucesso!"); }}
                className="text-xs text-primary font-bold hover:underline inline-flex items-center gap-1"
              >
                Criar grupo de bairro <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal: Detalhes da Medalha */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 max-w-sm w-full space-y-5 shadow-2xl border border-outline-variant/30 animate-in fade-in zoom-in-95 duration-200 text-center">
            <div className="flex justify-end -mt-2 -mr-2">
              <button
                type="button"
                onClick={() => setSelectedBadge(null)}
                className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center shadow-inner ${
              selectedBadge.unlocked ? 'bg-primary-fixed' : 'bg-surface-container'
            }`}>
              {renderBadgeIcon(selectedBadge.icon, selectedBadge.unlocked)}
            </div>

            <div>
              <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                selectedBadge.unlocked ? 'bg-emerald-50 text-emerald-800' : 'bg-surface-container text-on-surface-variant'
              }`}>
                {selectedBadge.unlocked ? 'Conquista Desbloqueada' : 'Conquista Bloqueada'}
              </span>
              <h3 className="text-xl font-black text-on-surface mt-2">{selectedBadge.title}</h3>
              <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                {selectedBadge.description}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-container-low text-xs text-on-surface-variant space-y-1">
              <div>Recompensa: <strong className="text-primary">+{selectedBadge.xp} XP</strong></div>
              {selectedBadge.unlocked && (
                <div>Conquistada em: <strong className="text-on-surface">{selectedBadge.unlockedAt || "14/02/2026"}</strong></div>
              )}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedBadge(null)}
                className="w-full py-2.5 rounded-xl border border-outline-variant text-on-surface text-xs font-semibold hover:bg-surface-container"
              >
                Fechar
              </button>
              {selectedBadge.unlocked && (
                <button
                  type="button"
                  onClick={() => {
                    handleShareWhatsApp();
                    setSelectedBadge(null);
                  }}
                  className="w-full py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-secondary flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Compartilhar</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Instagram Story Simulator */}
      {showStoryModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-3xl p-6 max-w-sm w-full space-y-5 shadow-2xl relative border border-outline-variant/30">
            <button
              type="button"
              onClick={() => setShowStoryModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-container text-on-surface flex items-center justify-center hover:bg-surface-container-high transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-1">
              <span className="text-xs text-primary font-bold uppercase tracking-wider">Prévia do Story 9:16</span>
              <h3 className="text-lg font-black text-on-surface">Seu Card Instagram</h3>
            </div>

            {/* Simulated Story Canvas */}
            <div className="w-full aspect-[9/16] rounded-2xl bg-gradient-to-b from-primary to-primary-container p-6 text-white flex flex-col justify-between shadow-inner relative overflow-hidden">
              <div className="absolute -right-12 -top-12 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none"></div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-sm tracking-tight">HemoVida</span>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">SUS</span>
                </div>
                <span className="text-[11px] font-bold opacity-90">14/02/2026</span>
              </div>

              <div className="space-y-3 text-center my-auto">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg">
                  <Heart className="w-8 h-8 text-white fill-white" />
                </div>
                <div className="text-xs uppercase tracking-widest font-semibold opacity-90">
                  Doador Frequente • Nível 2
                </div>
                <div className="text-2xl font-black leading-tight">
                  {donor.name} salvou até {donor.livesSaved} vidas!
                </div>
                <p className="text-[11px] opacity-80 max-w-xs mx-auto">
                  Sangue {donor.bloodType} doado no hemocentro. Seja também um herói anônimo.
                </p>
              </div>

              <div className="text-center pt-2 border-t border-white/20">
                <span className="text-[10px] tracking-wider uppercase opacity-90 font-bold">
                  hemovida.saude.gov.br • Doe Sangue
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  unlockAmbassadorBadge();
                  if (showToast) showToast("Story 9:16 exportado em alta resolução!");
                  setShowStoryModal(false);
                }}
                className="w-full py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-secondary flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Salvar Imagem</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
