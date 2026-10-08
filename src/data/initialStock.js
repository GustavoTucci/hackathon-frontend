export const INITIAL_BLOOD_STOCKS = [
  {
    type: "O-",
    label: "Doador Universal",
    percentage: 18,
    status: "critical", // critical (<30%), warning (30-59%), safe (>=60%)
    statusLabel: "Crítico",
    bagsAvailable: 14,
    daysOfReserve: 1.5,
    lastUpdated: "Há 4 minutos",
    trend: "down",
    urgencyText: "Necessidade Imediata para Cirurgias de Emergência e Traumas"
  },
  {
    type: "A-",
    label: "Fator Negativo Raro",
    percentage: 24,
    status: "critical",
    statusLabel: "Crítico",
    bagsAvailable: 19,
    daysOfReserve: 2.1,
    lastUpdated: "Há 10 minutos",
    trend: "down",
    urgencyText: "Reposição prioritária para oncologia e UTIs pediátricas"
  },
  {
    type: "B-",
    label: "Estoque Baixo",
    percentage: 38,
    status: "warning",
    statusLabel: "Alerta",
    bagsAvailable: 31,
    daysOfReserve: 3.8,
    lastUpdated: "Há 14 minutos",
    trend: "stable",
    urgencyText: "Convocação preventiva para manter margem de segurança"
  },
  {
    type: "AB-",
    label: "O Mais Raro (0.5% Pop.)",
    percentage: 42,
    status: "warning",
    statusLabel: "Alerta",
    bagsAvailable: 12,
    daysOfReserve: 4.2,
    lastUpdated: "Há 18 minutos",
    trend: "stable",
    urgencyText: "Doadores agendados nos próximos 3 dias recomendados"
  },
  {
    type: "O+",
    label: "Mais Utilizado no Brasil",
    percentage: 65,
    status: "safe",
    statusLabel: "Adequado",
    bagsAvailable: 142,
    daysOfReserve: 6.5,
    lastUpdated: "Há 8 minutos",
    trend: "up",
    urgencyText: "Estoque estável, manter fluxo contínuo de doações"
  },
  {
    type: "A+",
    label: "Alta Demanda Hospitalar",
    percentage: 72,
    status: "safe",
    statusLabel: "Adequado",
    bagsAvailable: 168,
    daysOfReserve: 7.2,
    lastUpdated: "Há 12 minutos",
    trend: "up",
    urgencyText: "Nível satisfatório para cirurgias eletivas"
  },
  {
    type: "B+",
    label: "Fluxo Estável",
    percentage: 68,
    status: "safe",
    statusLabel: "Adequado",
    bagsAvailable: 78,
    daysOfReserve: 6.8,
    lastUpdated: "Há 15 minutos",
    trend: "up",
    urgencyText: "Demanda regular coberta para a semana"
  },
  {
    type: "AB+",
    label: "Receptor Universal",
    percentage: 84,
    status: "safe",
    statusLabel: "Adequado",
    bagsAvailable: 52,
    daysOfReserve: 8.4,
    lastUpdated: "Há 20 minutos",
    trend: "up",
    urgencyText: "Reserva plena para transfusões e hemoderivados"
  }
];
