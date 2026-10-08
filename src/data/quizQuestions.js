export const QUIZ_QUESTIONS = [
  {
    id: 1,
    title: "Qual é a sua faixa etária atual?",
    description: "Norma técnica estabelece critérios rígidos de idade para preservar a segurança biológica do doador e do receptor.",
    icon: "badge",
    options: [
      {
        text: "Entre 18 e 60 anos (ou até 69 se já doou antes)",
        isEligible: true,
        feedback: "Perfeito! Você está dentro da faixa plena de doação voluntária.",
      },
      {
        text: "16 ou 17 anos (com consentimento formal dos responsáveis)",
        isEligible: true,
        feedback: "Apto com autorização: Jovens de 16 e 17 anos podem doar mediante formulário assinado por pais ou responsáveis legais.",
      },
      {
        text: "Menor de 16 anos ou 60+ anos sem doação prévia",
        isEligible: false,
        feedback: "Inapto: Pela legislação brasileira, menores de 16 anos não podem doar. Maiores de 60 anos só podem doar se a primeira doação tiver ocorrido antes dos 60 anos.",
      }
    ]
  },
  {
    id: 2,
    title: "Qual é o seu peso corporal aproximado?",
    description: "O volume de sangue coletado (cerca de 450 ml) é proporcional ao volume corporal seguro para evitar hipotensão.",
    icon: "monitor_weight",
    options: [
      {
        text: "Pelo menos 50 kg (ou mais)",
        isEligible: true,
        feedback: "Excelente! Peso compatível com o volume padrão de coleta de bolsa de sangue e anticoagulante.",
      },
      {
        text: "Menos de 50 kg",
        isEligible: false,
        feedback: "Inapto temporário: Pessoas com peso inferior a 50 kg não podem realizar a doação de sangue total por risco de mal-estar hemodinâmico.",
      }
    ]
  },
  {
    id: 3,
    title: "Como foi o seu descanso nas últimas 24 horas?",
    description: "O repouso adequado é indispensável para a estabilidade hemodinâmica durante a triagem e o procedimento.",
    icon: "bedtime",
    options: [
      {
        text: "Dormi pelo menos 6 horas contínuas na noite anterior",
        isEligible: true,
        feedback: "Ótimo! O descanso mínimo previne reações vasovagais ou tonturas após a coleta.",
      },
      {
        text: "Dormi menos de 6 horas ou trabalhei em plantão noturno sem repouso",
        isEligible: false,
        feedback: "Inapto temporário: É obrigatório ter dormido no mínimo 6 horas nas últimas 24 horas. Descanse hoje e doe amanhã!",
      }
    ]
  },
  {
    id: 4,
    title: "Como está sua alimentação no dia de hoje?",
    description: "Nunca doe em jejum prolongado nem logo após refeições com alto teor de gorduras.",
    icon: "restaurant",
    options: [
      {
        text: "Estou alimentado com refeições leves e saudáveis (sem jejum e sem gordura pesada)",
        isEligible: true,
        feedback: "Correto! Alimentação equilibrada e hidratação garantem um plasma límpido e doação tranquila.",
      },
      {
        text: "Estou em jejum há mais de 4 horas ou ingeri comida muito gordurosa (feijoada, frituras)",
        isEligible: false,
        feedback: "Inapto momentâneo: Não se deve doar em jejum nem após comida gordurosa nas 3 horas que antecedem. Faça um lanche leve e aguarde.",
      }
    ]
  },
  {
    id: 5,
    title: "Fez tatuagem, maquiagem definitiva ou piercing nos últimos 12 meses?",
    description: "Período de janela imunológica recomendado pelo Ministério da Saúde e OMS.",
    icon: "brush",
    options: [
      {
        text: "Não fiz nenhum desses procedimentos nos últimos 12 meses (ou fiz há mais de 1 ano)",
        isEligible: true,
        feedback: "Aprovado! Janela imunológica superada com total segurança biológica.",
      },
      {
        text: "Sim, fiz tatuagem ou piercing há menos de 12 meses (ou 6 meses se em estúdio fiscalizado)",
        isEligible: false,
        feedback: "Inapto temporário: Aguarde completar 12 meses (ou 6 meses se o estúdio possui alvará sanitário conforme regras locais do hemocentro).",
      }
    ]
  },
  {
    id: 6,
    title: "Apresentou sintomas gripais, febre, resfriado ou infecções recentes?",
    description: "Triagem para garantir que o receptor não receba patógenos durante o tratamento.",
    icon: "coronavirus",
    options: [
      {
        text: "Não, estou em perfeito estado de saúde e sem sintomas há mais de 15 dias",
        isEligible: true,
        feedback: "Maravilhoso! Seu organismo está saudável e pronto para renovar a vida de até 4 pessoas.",
      },
      {
        text: "Sim, tive febre, sintomas de gripe, COVID-19 ou usei antibióticos recentemente",
        isEligible: false,
        feedback: "Inapto temporário: Aguarde 10 a 14 dias após o término completo dos sintomas ou encerramento de antibióticos para realizar a doação.",
      }
    ]
  }
];
