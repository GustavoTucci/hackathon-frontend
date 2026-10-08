export const INITIAL_BADGES = [
  {
    id: "badge-first",
    title: "Primeira Gota",
    description: "Completou a primeira doação voluntária no HemoVida.",
    icon: "Droplets",
    category: "bronze",
    xp: 100,
    requiredDonations: 1,
    unlocked: true,
    unlockedAt: "15/09/2025"
  },
  {
    id: "badge-generous",
    title: "Coração Generoso",
    description: "Realizou 3 ou mais doações registradas no ecossistema.",
    icon: "Heart",
    category: "silver",
    xp: 150,
    requiredDonations: 3,
    unlocked: true,
    unlockedAt: "14/02/2026"
  },
  {
    id: "badge-universal",
    title: "Herói Universal",
    description: "Doador O- com sangue compatível com todos os pacientes do Brasil.",
    icon: "Award",
    category: "gold",
    xp: 200,
    requiredDonations: 1,
    specialCondition: "bloodType_O-",
    unlocked: true,
    unlockedAt: "14/02/2026"
  },
  {
    id: "badge-guardian",
    title: "Guardião da Vida",
    description: "Alcance 5 doações de sangue para desbloquear este status nobre.",
    icon: "Shield",
    category: "diamond",
    xp: 250,
    requiredDonations: 5,
    unlocked: false,
    unlockedAt: null
  },
  {
    id: "badge-ambassador",
    title: "Embaixador Solidário",
    description: "Compartilhe um pedido urgente de sangue e motive pessoas a doarem.",
    icon: "Megaphone",
    category: "special",
    xp: 150,
    requiredDonations: 0,
    specialCondition: "share_campaign",
    unlocked: false,
    unlockedAt: null
  },
  {
    id: "badge-emergency",
    title: "Vigilante das Emergências",
    description: "Respondeu a uma notificação SOS de estoque crítico em menos de 48 horas.",
    icon: "AlertTriangle",
    category: "special",
    xp: 180,
    requiredDonations: 2,
    unlocked: true,
    unlockedAt: "10/12/2025"
  }
];
