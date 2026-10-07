# 🖥️ Especificação 02: As 10 Telas & Fluxo de Navegação

O HemoVida possui **10 telas principais**, integradas por um sistema de roteamento dinâmico SPA controlado por abas e botões de chamada com estado central no `App.jsx`.

---

### 1. Tela 1 — Home / Manifesto de Conscientização (`Home.jsx`)
* **Objetivo:** Engajar o usuário, apresentar a relevância da ODS 3 e demonstrar o impacto do ato de doar sangue.
* **Componentes & Seções:**
  * **Hero Section:** Título impactante *"Uma gota sua pode salvar até 4 vidas"*, chamada para ação primária *"Agendar Doação"* e secundária *"Ver Nível de Estoque"*.
  * **Banner de Alerta Ativo:** Exibe badge dinâmico se algum tipo sanguíneo estiver em estado crítico.
  * **Métricas da ODS 3:** Cards com estatísticas:
    * *1,6%* de doadores no Brasil (ideal da OMS: 3% a 5%).
    * *Meta 3.8 & 3.d* da ONU explicadas de forma didática.
    * *+12.400 vidas salvas* mobilizadas pela comunidade HemoVida.
  * **Passo a Passo Rápido:** Infográfico de 3 etapas: (1) Faça o quiz de aptidão, (2) Agende em 2 minutos, (3) Salve vidas no hemocentro mais próximo.

---

### 2. Tela 2 — Painel Geral de Estoques em Tempo Real (`BloodStock.jsx`)
* **Objetivo:** Exibir com máxima clareza o nível de disponibilidade dos 8 tipos sanguíneos.
* **Componentes & Seções:**
  * **Grid dos 8 Tipos Sanguíneos:** (A+, A-, B+, B-, AB+, AB-, O+, O-).
  * **Visualizador em Bolsa / Barra de Nível:**
    * **Crítico (0% a 29%):** Fundo vermelho com badge pulsante *"Urgente"*.
    * **Alerta (30% a 59%):** Fundo âmbar/amarelo com badge *"Atenção"*.
    * **Estável (60% a 100%):** Fundo verde-esmeralda com badge *"Adequado"*.
  * **Filtro por Hemocentro:** Seleção para consultar estoque geral estadual ou de um hospital específico.
  * **Botão de Chamada Direta:** Clicar em um tipo com estoque crítico direciona para o agendamento pré-preenchendo a tipagem.

---

### 3. Tela 3 — Quiz Interativo "Posso Doar?" (`QuizEligibility.jsx`)
* **Objetivo:** Eliminar dúvidas médicas antes do deslocamento físico até o posto de coleta.
* **Componentes & Seções:**
  * **Formulário Passo a Passo (Stepper):**
    1. Idade (16 a 69 anos; menores com autorização).
    2. Peso mínimo (mínimo de 50 kg).
    3. Descanso nas últimas 24h (mínimo de 6 horas de sono).
    4. Alimentação recente (não estar em jejum prolongado e sem alimentos gordurosos).
    5. Tatuagem ou piercing recente (últimos 12 meses).
    6. Sintomas gripais ou febre nos últimos 14 dias.
  * **Feedback Médico Imediato:**
    * *Apto:* Card verde comemorativo com botão *"Agendar Agora"*.
    * *Inapto Temporário:* Explicação amigável do motivo, com data estimada em que estará liberado.

---

### 4. Tela 4 — Localizador & Lista de Hemocentros (`HemocentrosList.jsx`)
* **Objetivo:** Fornecer dados precisos de postos de coleta e bancos de sangue.
* **Componentes & Seções:**
  * **Barra de Pesquisa & Filtro de Bairro/Região.**
  * **Cards de Postos:**
    * Nome da instituição (ex.: Fundação Pró-Sangue, Hemocentro Central, Hospital das Clínicas).
    * Endereço completo com botão "Abrir no Mapa / Rota".
    * Horário de funcionamento (Seg a Sáb, 7h às 18h).
    * Telefone para contato e botão para agendar diretamente no posto selecionado.
    * Indicador de tempo médio de espera no dia.

---

### 5. Tela 5 — Agendamento de Doação (`ScheduleDonation.jsx`)
* **Objetivo:** Permitir ao usuário escolher dia, turno e confirmar a doação sem atritos.
* **Componentes & Seções:**
  * **Etapa 1:** Escolha do Hemocentro credenciado.
  * **Etapa 2:** Seleção de data (calendário interativo respeitando dias úteis).
  * **Etapa 3:** Escolha de horário/turno (Manhã: 08:00, 09:30, 11:00 / Tarde: 13:30, 15:00, 16:30).
  * **Etapa 4:** Dados do doador (Nome, CPF fictício/formatado, Tipo Sanguíneo).
  * **Comprovante Gerado:** Modal/Card de confirmação com código de agendamento, resumo e botão "Salvar na Carteirinha".

---

### 6. Tela 6 — Carteirinha Digital do Doador (`DigitalCard.jsx`)
* **Objetivo:** Engajar o doador habitual com um documento virtual moderno e contagem regressiva.
* **Componentes & Seções:**
  * **Cartão Visual do Doador:** Efeito elegante de cartão de crédito com degradê vermelho escuro, chip visual, QR Code, nome do doador, tipo sanguíneo em destaque e registro de doador.
  * **Calculadora de Próxima Doação:**
    * Contador regressivo: *"Você poderá doar novamente em X dias"*.
    * Respeita a regra médica do Ministério da Saúde (homens 60 dias / mulheres 90 dias).
  * **Métricas Pessoais:** Total de doações realizadas e número estimado de vidas impactadas (*Doações x 4*).
  * **Botão "Registrar Nova Doação Realizada"** para simular o ciclo e atualizar a contagem.

---

### 7. Tela 7 — Gamificação & Conquistas Solidárias (`Gamification.jsx`)
* **Objetivo:** Estimular a retenção do doador através de metas e recompensas simbólicas.
* **Componentes & Seções:**
  * **Nível do Doador:** Nível atual (ex.: *Nível 2 — Doador Frequente*) com barra de progresso para o próximo nível.
  * **Grade de Medalhas/Badges:**
    * 🥉 *Primeira Gota:* Concedido ao realizar o 1º agendamento/doação.
    * 🥈 *Coração Generoso:* Concedido após 3 doações.
    * 🥇 *Guardião da Vida:* Concedido após 5 doações.
    * 🩸 *Herói Universal:* Para doadores do tipo O negativo.
    * 📢 *Embaixador Solidário:* Compartilhar uma campanha urgente nas redes.
  * **Status das Medalhas:** Bloqueadas (tons de cinza com cadeado) ou Desbloqueadas (douradas/coloridas com data da conquista).

---

### 8. Tela 8 — Feed de Pedidos Urgentes (`UrgentAppeals.jsx`)
* **Objetivo:** Conectar pessoas necessitadas de sangue a voluntários dispostos a ajudar.
* **Componentes & Seções:**
  * **Filtro por Tipo Sanguíneo Necessário:** Botões para filtrar apenas pedidos do tipo do usuário.
  * **Cards de Campanhas de Pacientes:**
    * Nome do paciente (ex.: Mariana Silveira - Cirurgia Cardíaca).
    * Hospital / Hemocentro de referência.
    * Quantidade de bolsas necessárias vs. arrecadadas (barra de progresso).
    * Botão "Vou Ajudar" (leva ao agendamento) e botão "Compartilhar no WhatsApp/Redes".
  * **Botão para Criar Novo Pedido:** Formulário rápido para cadastrar um paciente em necessidade.

---

### 9. Tela 9 — Guia Completo & Matriz de Compatibilidade (`CompatibilityGuide.jsx`)
* **Objetivo:** Educar a população sobre biologia da doação e desmistificar procedimentos.
* **Componentes & Seções:**
  * **Matriz Interativa "Quem Doa para Quem":**
    * Seletor de tipo de sangue (ex.: selecione "A+"): o sistema ilumina automaticamente para quem ele pode doar (A+, AB+) e de quem pode receber (A+, A-, O+, O-).
    * Destaque educativo para o Doador Universal (O-) e Receptor Universal (AB+).
  * **Guia de Cuidados:**
    * *Antes de Doar:* Hidratação extra, café da manhã leve, evitar gordura, dormir 6h+.
    * *Depois de Doar:* Não fumar por 2h, não fazer esforço físico intenso no dia, manter curativo por 4h.
  * **Mitos e Verdades:** Sanar dúvidas (tatuagem impede para sempre? doar engrossa ou afina o sangue?).

---

### 10. Tela 10 — Painel do Hemocentro / Simulador Admin (`AdminHemocenter.jsx`)
* **Objetivo:** Permitir ao avaliador do Hackathon testar a dinamicidade do sistema alterando estados.
* **Componentes & Seções:**
  * **Controles de Estoque:** Sliders ou botões de +/- para alterar a porcentagem de qualquer um dos 8 tipos sanguíneos.
  * **Botão de "Emitir Alerta Vermelho":** Simula uma emergência no banco de sangue que ativa banners na Home e notificação toast.
  * **Publicação de Pedido Urgente:** Adicionar um novo paciente ao feed de urgências.
  * **Botão "Resetar Dados para Padrão":** Restaura os dados originais a qualquer momento.
