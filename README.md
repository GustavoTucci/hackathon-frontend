# 🩸 HemoVida — Rede Inteligente de Doação de Sangue e Hemocentros

> Uma plataforma web moderna, humanizada e interativa que conecta doadores voluntários a hemocentros, monitora estoques de sangue em tempo real, descomplica a triagem e mobiliza a sociedade para salvar vidas.

---

## 📋 Definição do Problema (Entrega da Etapa 1)

```text
ODS escolhido: ODS 3 — Saúde e Bem-Estar (Metas 3.8, 3.d e 3.6)
Problema: Escassez crônica e imprevisibilidade dos estoques de sangue nos hemocentros brasileiros (menos de 1,6% da população é doadora regular), desinformação sobre critérios de triagem e ausência de canais em tempo real para conscientização e agendamento.
Público-alvo: Cidadãos aptos a doar (16 a 69 anos, foco em jovens de 18 a 35 anos), familiares de pacientes hospitalizados e instituições (hemocentros e bancos de sangue).
Necessidade: Plataforma centralizada e transparente para monitorar estoques em tempo real, realizar pré-triagem médica instantânea ("Posso Doar?"), agendar coletas e acompanhar o histórico pessoal com lembretes dos intervalos legais de doação.
Objetivo da solução: Desenvolver uma aplicação Front-end em React + Vite interativa, moderna e acessível que conecte doadores a postos de coleta, aumente a previsibilidade dos bancos de sangue, reduza o cancelamento de cirurgias e engaje a comunidade através de gamificação e alertas urgentes.
```

---

## 📌 ODS (Objetivo de Desenvolvimento Sustentável)

* **ODS Selecionado:** **ODS 3 — Saúde e Bem-Estar**
* **Metas Prioritárias da ONU Vinculadas:**
  * **Meta 3.8:** *"Alcançar a cobertura universal de saúde, incluindo proteção financeira, acesso a serviços essenciais de saúde de qualidade e acesso a medicamentos e produtos biológicos essenciais (como sangue e hemoderivados) seguros, eficazes e de qualidade para todos."*
  * **Meta 3.d:** *"Reforçar a capacidade de todos os países, particularmente os países em desenvolvimento, para o alerta precoce, redução de riscos e gestão de riscos nacionais e globais de saúde (suporte a urgências, cirurgias de alta complexidade e calamidades)."*
  * **Meta 3.6:** Apoio crucial na redução de fatalidades decorrentes de acidentes de trânsito e traumas graves que dependem de transfusões imediatas de sangue.

---

## 🔍 Problema

No Brasil e em diversos países, menos de **1,6% da população é doadora regular de sangue**, quando a taxa ideal recomendada pela OMS (Organização Mundial da Saúde) é de 3% a 5%.

* **Cenário Atual:** Hemocentros frequentemente operam no "nível crítico" ou "alerta vermelho", especialmente para tipos com fator Rh negativo (como O- e A-). Cirurgias eletivas são desmarcadas, leitos de UTI ficam desprotegidos e pacientes oncológicos enfrentam atrasos em seus tratamentos por falta de bolsas de sangue.
* **A Dor Central:** A maioria das pessoas só doa em momentos de comoção familiar (quando um conhecido adoece), pois faltam canais centralizados e intuitivos que informem **quais tipos sanguíneos estão em falta hoje**, onde doar e quando a pessoa já está liberada para sua próxima doação.
* **Barreiras Identificadas:**
  * Falta de transparência visual sobre os níveis de estoque nos hemocentros locais;
  * Dúvidas comuns e mitos sobre quem está apto ou inapto para doar (tatuagens, peso, medicamentos, sono);
  * Dificuldade de agendamento e falta de lembrete dos intervalos mínimos legais (60 dias para homens, 90 dias para mulheres);
  * Ausência de incentivo contínuo e reconhecimento ao doador frequente.

---

## 🎯 Público-Alvo

* **Segmento Primário (Doadores e Potenciais Doadores):** Cidadãos entre 16 e 69 anos, especialmente jovens universitários e trabalhadores (18 a 35 anos) que têm familiaridade digital e buscam exercer cidadania ativa e voluntariado.
* **Segmento Secundário (Pessoas em Busca de Ajuda):** Familiares e amigos de pacientes hospitalizados que precisam lançar apelos urgentes de reposição de sangue.
* **Segmento Terciário (Institucional):** Hemocentros, bancos de sangue, postos de coleta municipais e hospitais que necessitam de um canal ágil e moderno de divulgação de seus estoques e campanhas.

---

## 💎 Proposta de Valor

### 1. Qual problema resolvemos?
A escassez crônica e a imprevisibilidade dos estoques de sangue nos hemocentros, aliada ao esquecimento dos doadores e à falta de informação simples sobre os critérios de doação.

### 2. Para quem?
Para cidadãos que desejam salvar vidas de forma rápida e consciente, e para hemocentros que precisam manter estoques regulares e previsíveis.

### 3. Como nossa solução ajuda?
* Mostrando um **painel visual em tempo real** dos níveis de estoque de cada tipo sanguíneo (A+, A-, B+, B-, AB+, AB-, O+, O-);
* Oferecendo um **Quiz interativo de Triagem ("Posso Doar?")** em menos de 1 minuto;
* Disponibilizando **Carteirinha Digital do Doador** com histórico e calculadora automática da data da próxima doação liberada;
* Permitindo o **Agendamento simplificado** de visitas a hemocentros credenciados;
* Criando uma **Rede de Alertas Urgentes** e sistema de **Gamificação e Conquistas** para valorizar cada vida salva.

### 4. Qual valor ela entrega?
**Segurança biológica e solidariedade conectada:** transforma um ato esporádico em um hábito contínuo, reduz o desperdício de tempo nos postos e garante que nenhum paciente fique sem atendimento transfusional.

---

## 📊 Benchmarking

Análise comparativa de **5 soluções existentes no mercado**:

| # | Solução | Funcionalidades Principais | Público-Alvo | Pontos Positivos | Pontos Negativos | Características Usadas como Referência no HemoVida |
|---|---|---|---|---|---|---|
| **1** | **Hemovida / ConecteSUS (Ministério da Saúde)** | Visualização de dados de doação vinculados ao CPF. | Cidadãos cadastrados no SUS. | Base de dados oficial do governo federal; confiabilidade dos dados. | Aplicativo lento, navegação burocrática, instabilidade constante e sem painel visual do estoque de sangue em tempo real. | Estrutura de dados da carteirinha oficial do doador e respeito às normas de intervalos do Ministério da Saúde. |
| **2** | **Red Cross Blood Donor App (Cruz Vermelha Americana)** | Agendamento, rastreamento da bolsa de sangue ("onde meu sangue foi parar"), badges e desafios. | População dos EUA. | Gamificação impecável, rastreamento emocional da bolsa doada e excelente UI/UX. | Não atende o Brasil; regras médicas específicas do FDA e língua inglesa. | Sistema de badges/conquistas, cálculo de vidas salvas e interface engajadora. |
| **3** | **DoeSangue.me** | Plataforma colaborativa para divulgação de pedidos de doação de parentes. | Familiares de pacientes internados. | Alta capacidade de mobilização social e compartilhamento em redes sociais. | Interface desatualizada, sem integração com status de hemocentros e sem ferramenta de pré-triagem. | Feed de pedidos urgentes comunitários com botão de compartilhamento instantâneo. |
| **4** | **Aplicativo Fundação Pró-Sangue SP** | Consulta de postos de coleta em SP, requisitos e agendamento básico. | População da Grande São Paulo. | Informações médicas confiáveis e atualizadas para o estado de SP. | Restrito apenas a SP, interface pouco intuitiva e sem versão web interativa rica para desktop. | Indicadores de nível de estoque por hemocentro e tabela de compatibilidade sanguínea. |
| **5** | **Ferramenta de Doação de Sangue do Facebook (Meta)** | Notificações de alerta quando um hemocentro parceiro solicita voluntários na região. | Usuários da rede social. | Grande alcance geográfico e alertas proativos para milhões de pessoas. | Não possui acompanhamento pessoal, não gerencia histórico de doações nem faz pré-triagem médica. | Alertas de emergência por tipo sanguíneo crítico ("Tipo O- em estado crítico"). |

### 🎯 Síntese de Diferenciais Adotados no HemoVida
O **HemoVida** combina a **transparência visual de estoques** dos hemocentros com a **gamificação vibrante** da Cruz Vermelha, o **feed social solidário** do DoeSangue.me e um **quiz ágil de triagem médica** acessível em qualquer navegador, sem necessidade de baixar aplicativos pesados.

---

## 📝 Requisitos

### Requisitos Funcionais (RF)
* **RF01:** O sistema deve exibir um painel interativo de estoques de sangue em tempo real categorizado pelos 8 tipos sanguíneos (A+, A-, B+, B-, AB+, AB-, O+, O-), com níveis visuais (Crítico, Alerta, Estável).
* **RF02:** O sistema deve disponibilizar um Quiz Interativo de Triagem ("Posso Doar?") com validações de idade, peso, repouso, tatuagens recentes, medicamentos e alimentação.
* **RF03:** O sistema deve disponibilizar uma Carteirinha Digital do Doador com tipo sanguíneo, fator Rh, código de identificação, total de doações e vidas salvas estimadas.
* **RF04:** O sistema deve calcular automaticamente a data em que o usuário estará liberado para a próxima doação com base no gênero e na data da última doação (60 dias/4x ao ano para homens; 90 dias/3x ao ano para mulheres).
* **RF05:** O sistema deve permitir o agendamento de doação em um hemocentro selecionado, escolhendo data, turno e gerando um comprovante digital de agendamento.
* **RF06:** O sistema deve listar hemocentros e pontos de coleta com endereço, horário de atendimento, telefone, status de funcionamento e mapa interativo de localização.
* **RF07:** O sistema deve conter um Feed de Pedidos Urgentes de Sangue, permitindo visualizar campanhas ativas para pacientes hospitalizados e filtrar por tipo sanguíneo.
* **RF08:** O sistema deve possuir um Módulo de Gamificação com conquistas e medalhas desbloqueáveis (ex.: "Primeira Gota", "Amigo O Negativo", "Super Doador", "Mobilizador").
* **RF09:** O sistema deve fornecer um Guia Completo Pré e Pós-Doação com orientações claras sobre hidratação, alimentação recomendada, repouso e tabela visual de compatibilidade sanguínea (quem doa para quem).
* **RF10:** O sistema deve disponibilizar uma Área Administrativa/Hemocentro para simular a atualização dos níveis de estoque e publicação de chamados urgentes.

### Requisitos Não Funcionais (RNF)
* **RNF01 (Responsividade):** A aplicação deve ser 100% responsiva em dispositivos móveis (360px+), tablets (768px+) e telas de desktop (1024px+).
* **RNF02 (Desempenho):** O tempo de carregamento da aplicação deve ser inferior a 1,5 segundos (First Contentful Paint otimizado).
* **RNF03 (Acessibilidade - WCAG):** O design deve cumprir as diretrizes WCAG 2.1 nível AA, garantindo contraste mínimo de 4.5:1, rótulos textuais acessíveis para ícones e navegação estruturada via teclado.
* **RNF04 (Design Humanizado & Psicologia das Cores):** Uso de paleta profissional baseada em tons de vermelho hematológico (#DC2626 / #991B1B) equilibrados com fundos claros, cinzas neutros e acentos de verde e azul, transmitindo seriedade médica e acolhimento sem alarmismo visual.
* **RNF05 (Persistência & Privacidade):** Os dados do doador, histórico de doações e agendamentos devem ser armazenados com segurança localmente via `localStorage`, sem exposição indevida de dados sensíveis.
* **RNF06 (Arquitetura Componentizada):** O código deve seguir arquitetura modular em React com componentes isolados e reutilizáveis (botões, cards, modais, medidores de estoque).
* **RNF07 (Disponibilidade):** A aplicação deve ser compilada para deploy contínuo em servidor estático de alta disponibilidade (Vercel/Netlify/GitHub Pages).
* **RNF08 (Feedback Visual Instantâneo):** Ações de agendamento, resposta de quiz e simulação de doação devem fornecer feedback com micro-animações e alertas do tipo toast em menos de 100ms.
* **RNF09 (Compatibilidade com Navegadores):** Suporte garantido nos principais navegadores modernos (Google Chrome, Safari, Mozilla Firefox, Microsoft Edge).
* **RNF10 (Clean Code e Manutenibilidade):** Código limpo, padronizado, livre de linter warnings e documentado com comentários pertinentes.

---

## 👤 User Stories

### US01 — Verificação Imediata de Estoques Críticos
* **Como** cidadão consciente,
* **Quero** visualizar rapidamente o nível de estoque de cada tipo sanguíneo na minha região,
* **Para** saber com urgência se o meu sangue está fazendo falta e me mobilizar para doar.
* **Critérios de Aceitação:**
  * O painel deve exibir os 8 tipos sanguíneos em barras ou bolsas com porcentagem clara.
  * Tipos abaixo de 30% devem ter destaque em vermelho com selo "Crítico".
  * Deve permitir filtrar estoques por hemocentro ou ver média geral.

### US02 — Pré-Triagem Rápida ("Posso Doar?")
* **Como** potencial doador que tem dúvidas sobre regras médicas,
* **Quero** responder a um questionário rápido e objetivo de 5 a 6 perguntas,
* **Para** descobrir se estou apto antes de me deslocar fisicamente até o hemocentro.
* **Critérios de Aceitação:**
  * Perguntas simples de sim/não sobre idade, peso mínimo (50kg), tatuagens nos últimos 12 meses, febre recente e sono.
  * Ao final, o sistema deve emitir um parecer amigável ("Você está apto!" ou "Aguarde um período...") com orientações educativas.

### US03 — Acompanhamento na Carteirinha Digital
* **Como** doador habitual,
* **Quero** ter uma carteirinha digital com meu tipo sanguíneo e a data em que posso doar novamente,
* **Para** não perder o prazo de intervalo legal e manter a constância nas doações.
* **Critérios de Aceitação:**
  * Exibição visual no formato de cartão virtual elegante com nome, tipo sanguíneo, total de doações e vidas salvas estimadas (1 doação = até 4 vidas).
  * Contador regressivo de dias até a próxima data de doação liberada.

### US04 — Agendamento Descomplicado
* **Como** usuário com rotina corrida de trabalho/estudos,
* **Quero** selecionar um hemocentro próximo, escolher a data e o melhor turno,
* **Para** garantir atendimento ágil sem filas excessivas.
* **Critérios de Aceitação:**
  * Seleção do posto de coleta, escolha de data no calendário e seleção de horário.
  * Geração instantânea de comprovante com detalhes de endereço e orientações para o dia.

### US05 — Mobilização em Pedidos Urgentes
* **Como** familiar de uma pessoa que precisa de reposição de sangue para cirurgia,
* **Quero** ver o pedido de sangue publicado no feed e poder compartilhar os dados,
* **Para** sensibilizar amigos e a comunidade a comparecerem ao hospital.
* **Critérios de Aceitação:**
  * Cards de apelo com nome do paciente/hospital, tipo sanguíneo necessário e botão de "Quero Ajudar" ou "Compartilhar".

---

## ✨ Funcionalidades Principais

1. **Dashboard Central HemoVida:** Resumo dos estoques em tempo real, vidas salvas na plataforma e acesso imediato aos fluxos prioritários.
2. **Painel Interativo de Estoques:** Monitoramento visual das 8 tipagens sanguíneas com barras animadas e status dinâmico (Crítico, Alerta, Adequado).
3. **Quiz "Posso Doar?":** Ferramenta interativa de triagem com feedbacks médicos imediatos baseados nos critérios da ANVISA/Ministério da Saúde.
4. **Localizador de Hemocentros:** Guia detalhado de postos de coleta com endereço, horário, rotas e contato telefônico.
5. **Agendamento de Doação Online:** Fluxo completo de agendamento com escolha de dia, horário e emissão de comprovante.
6. **Carteirinha Digital do Doador:** Cartão visual estilizado com contador de vidas salvas e data do próximo agendamento liberado.
7. **Gamificação & Conquistas:** Sistema de selos e medalhas virtuais (Gota Bronze, Prata, Ouro, Embaixador da Vida) que incentivam a recorrência.
8. **Mural de Pedidos Urgentes:** Feed de campanhas emergenciais para pacientes hospitalizados com filtros por tipo sanguíneo.
9. **Guia e Tabela de Compatibilidade:** Matriz interativa de doador universal (O-) e receptor universal (AB+), orientações alimentares pré e pós-doação.
10. **Painel do Hemocentro (Simulador Admin):** Área de gestão que permite simular a alteração de estoques e postar novos alertas urgentes.

---

## 💻 Tecnologias Utilizadas

* **Linguagem Principal:** TypeScript / JavaScript Moderno (ESNext)
* **Framework Front-end:** **React 18**
* **Build Tool:** **Vite** (inicialização instantânea e bundles de alta performance)
* **Estilização:** CSS Moderno (Vanilla CSS com Design System baseado em Variáveis CSS, Glassmorphism, Micro-animações e layout fluido Flexbox/CSS Grid)
* **Ícones:** Lucide React (ícones vetoriais com alta semântica e acessibilidade)
* **Gerenciamento de Estado:** React Hooks nativos (`useState`, `useEffect`, `useMemo`, `useCallback`)
* **Armazenamento:** Web Storage API (`localStorage`) para persistência de doações, perfil do doador e agendamentos
* **Deploy & CI/CD:** Vercel / Netlify
* **Versionamento:** Git & GitHub

---

## 🛠️ Framework Utilizado

Foi escolhido o **React 18 com Vite**.

**Justificativa Técnica:**
1. **Reatividade de Estoques em Tempo Real:** A arquitetura baseada em estado do React permite recalcular imediatamente os medidores de estoque e a compatibilidade sanguínea de forma fluida.
2. **Componentização Modular:** Facilidade em criar componentes reutilizáveis para os 8 tipos sanguíneos, cards de hemocentros, badges de gamificação e formulários de triagem.
3. **Desempenho e Velocidade com Vite:** O bundle ultraleve gerado pelo Vite assegura tempos de carregamento muito inferiores a 1,5s, garantindo pontuação máxima na rubrica de usabilidade.
4. **Fácil Integração e Deploy:** O projeto estático pode ser publicado em segundos em plataformas como Vercel ou Netlify sem complexidades de backend.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
* **Node.js** (versão 18.x ou superior)
* **npm** ou **yarn** instalado
* Navegador moderno

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/GustavoTucci/hackathon-frontend.git
   ```

2. **Acesse a pasta do projeto:**
   ```bash
   cd hackathon-frontend
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Acesse no navegador:**
   Abra `http://localhost:5173/` no seu navegador.

6. **Para compilar a versão final de produção:**
   ```bash
   npm run build
   npm run preview
   ```

---

## 📱 Protótipo & Estrutura das 10 Telas

A aplicação é composta por **10 visões/telas completas, ricas e navegáveis**:

1. **Tela 1 — Home / Manifesto de Conscientização:**
   * Destaque do impacto social da doação (1 bolsa salva até 4 vidas), estatísticas da ODS 3 no Brasil e chamada para ação rápida.
2. **Tela 2 — Painel Geral de Estoques em Tempo Real:**
   * Visão detalhada dos 8 tipos sanguíneos (A+, A-, B+, B-, AB+, AB-, O+, O-) com barras dinâmicas, porcentagem e indicador de urgência.
3. **Tela 3 — Quiz Interativo "Posso Doar?" (Triagem Rápida):**
   * Questionário passo a passo com critérios da ANVISA e feedback médico instantâneo de aptidão.
4. **Tela 4 — Localizador & Mapa de Hemocentros:**
   * Lista e cartões informativos dos hemocentros, endereços, horários de coleta, contatos e rotas.
5. **Tela 5 — Agendamento de Doação:**
   * Formulário intuitivo para selecionar o hemocentro, data, turno, confirmar dados e gerar comprovante.
6. **Tela 6 — Carteirinha Digital do Doador:**
   * Carteira virtual com QR code ilustrativo, tipo sanguíneo, histórico de doações, vidas salvas e data da próxima liberação.
7. **Tela 7 — Gamificação & Conquistas Solidárias:**
   * Mural de selos desbloqueados (Gota Solidária, Herói Anônimo, Salvando Vidas) com metas para os próximos níveis.
8. **Tela 8 — Feed de Pedidos Urgentes:**
   * Lista de apelos de emergência para pacientes em cirurgia ou UTI, com filtro por tipo de sangue e botão de compartilhamento.
9. **Tela 9 — Guia Completo & Matriz de Compatibilidade:**
   * Matriz interativa "Quem doa para quem", instruções do que comer antes e depois da doação e mitos comuns.
10. **Tela 10 — Painel do Hemocentro / Simulador Admin:**
    * Ferramenta para simular a atualização manual dos níveis de estoque de cada tipo sanguíneo e emissão de alertas vermelhos.

---

## 🌐 Aplicação

* **URL da Aplicação (Deploy):** https://hackathon-frontend-tucciz.vercel.app/
* **URL do Repositório GitHub:** https://github.com/GustavoTucci/hackathon-frontend
* **URL do Protótipo / Telas:** https://github.com/GustavoTucci/hackathon-frontend/tree/main/prototipo

---

## 📋 Processo de Desenvolvimento & Gestão do Projeto

* **Ferramenta de Gerenciamento Utilizada:** **GitHub Projects** (Quadro Kanban com acompanhamento de backlog, in progress e done)
* **Quantidade de Cards:** **50 cards de atividades reais** mapeados e executados durante o ciclo de 4 horas.

### 🗂️ Mapeamento dos 50 Cards de Atividades

#### Etapa 1: Planejamento, Definição & Benchmarking (Cards 01 a 08)
* `CARD-01` — Analisar edital do Hackathon, regras de entrega e rubrica de avaliação.
* `CARD-02` — Selecionar a ODS 3 e mapear as metas específicas (3.8 e 3.d).
* `CARD-03` — Levantar dados do Ministério da Saúde e OMS sobre escassez de sangue no Brasil.
* `CARD-04` — Definir a persona do doador jovem e as necessidades dos hemocentros.
* `CARD-05` — Executar benchmarking de 5 soluções (ConecteSUS, Red Cross, DoeSangue.me, Pró-Sangue, Facebook Blood).
* `CARD-06` — Analisar prós e contras das soluções existentes e extrair requisitos de referência.
* `CARD-07` — Elaborar a Proposta de Valor respondendo às 4 perguntas norteadoras.
* `CARD-08` — Definir a arquitetura da solução e planejar cronograma das 4 horas.

#### Etapa 2: Engenharia de Requisitos & User Stories (Cards 09 a 16)
* `CARD-09` — Especificar os 10 Requisitos Funcionais do HemoVida (RF01 a RF10).
* `CARD-10` — Especificar os 10 Requisitos Não Funcionais (RNF01 a RNF10).
* `CARD-11` — Redigir as User Stories completas focadas no doador e no hemocentro.
* `CARD-12` — Definir os critérios de aceitação para cada história de usuário.
* `CARD-13` — Estruturar o mapa de navegação das 10 telas e fluxos de usuário.
* `CARD-14` — Definir o Design System: paleta de cores (vermelho saúde, cinza suave), tipografia e bordas.
* `CARD-15` — Criar modelo de dados inicial dos estoques de sangue (A+, A-, B+, B-, AB+, AB-, O+, O-).
* `CARD-16` — Mapear perguntas e regras de validação para o Quiz de Triagem "Posso Doar?".

#### Etapa 3: Setup & Infraestrutura Inicial (Cards 17 a 22)
* `CARD-17` — Inicializar o projeto com React 18 e Vite.
* `CARD-18` — Instalar pacote de ícones (`lucide-react`).
* `CARD-19` — Configurar variáveis CSS globais e tokens de estilo (`index.css`).
* `CARD-20` — Criar utilitários de persistência e cálculo de intervalos no `localStorage`.
* `CARD-21` — Configurar repositório Git, branch principal e primeiro commit semântico.
* `CARD-22` — Criar componente de Layout Base (Header com navegação e Footer responsivo).

#### Etapa 4: Desenvolvimento das 10 Telas & Componentes (Cards 23 a 36)
* `CARD-23` — Implementar Tela 1: Home / Manifesto com estatísticas do ODS 3 e chamadas principais.
* `CARD-24` — Implementar Tela 2: Painel de Estoques de Sangue com medidores animados de porcentagem.
* `CARD-25` — Criar tags visuais de status (Crítico <30%, Alerta <60%, Estável >60%).
* `CARD-26` — Implementar Tela 3: Quiz de Triagem "Posso Doar?" com perguntas dinâmicas e resultado.
* `CARD-27` — Implementar Tela 4: Localizador de Hemocentros com cards de postos e rotas.
* `CARD-28` — Implementar Tela 5: Formulário de Agendamento de Doação com seleção de data e horário.
* `CARD-29` — Criar modal de confirmação e emissão de comprovante de agendamento.
* `CARD-30` — Implementar Tela 6: Carteirinha Digital do Doador com QR Code decorativo e badge de tipagem.
* `CARD-31` — Adicionar cálculo automático do intervalo de dias para a próxima doação na carteirinha.
* `CARD-32` — Implementar Tela 7: Módulo de Gamificação com selos e medalhas de vidas salvas.
* `CARD-33` — Implementar Tela 8: Feed de Pedidos Urgentes com botões de compartilhamento.
* `CARD-34` — Implementar Tela 9: Guia Pré/Pós Doação e matriz interativa de compatibilidade de sangue.
* `CARD-35` — Implementar Tela 10: Painel Administrativo do Hemocentro para atualização dos estoques.
* `CARD-36` — Integrar sistema de rotas dinâmicas SPA para navegação fluida entre todas as telas.

#### Etapa 5: Refinamento, Acessibilidade & Responsividade (Cards 37 a 43)
* `CARD-37` — Ajustar layout para dispositivos móveis compactos (360px a 480px).
* `CARD-38` — Otimizar visualização em tablets e dispositivos médios (768px).
* `CARD-39` — Validar contraste de cores de acordo com WCAG 2.1 AA.
* `CARD-40` — Adicionar micro-interações, hover effects e transições suaves nos botões.
* `CARD-41` — Implementar sistema de toasts para feedback de agendamentos e cadastros.
* `CARD-42` — Preencher dados de demonstração realistas para demonstração imediata do app.
* `CARD-43` — Verificar desempenho e carregamento no navegador.

#### Etapa 6: Testes, Deploy, Git & Documentação (Cards 44 a 50)
* `CARD-44` — Testar todos os 10 fluxos de navegação e validar integridade do estado no React.
* `CARD-45` — Corrigir inconsistências de formatação e responsividade nos modais.
* `CARD-46` — Realizar build de produção (`npm run build`) e validar integridade dos arquivos gerados.
* `CARD-47` — Configurar e realizar deploy da aplicação na Vercel.
* `CARD-48` — Organizar histórico de mais de 30 commits semânticos no Git.
* `CARD-49` — Finalizar documentação do README.md com todas as 12 seções exigidas pelo SENAI.
* `CARD-50` — Revisão final dos entregáveis do edital e entrega oficial do projeto.

---

## 🤖 12. Inteligência Artificial

A utilização de ferramentas de Inteligência Artificial foi um dos pilares estratégicos da equipe para acelerar o ciclo de entrega, garantir alta fidelidade visual e estruturar uma arquitetura Front-end moderna em **React + Vite** com 10 telas completas no prazo do Hackathon.

### 🛠️ Ferramentas Utilizadas

1. **Google Stitch (IA para Prototipação & Design UI/UX):**
   * Ferramenta de inteligência artificial generativa aplicada ao design de interfaces e prototipação rápida.
   * Utilizada para idealizar, gerar e iterar os protótipos de alta fidelidade das 10 telas da aplicação (`tela01` a `tela10`), definindo a hierarquia visual, fluxos de navegação e componentes de tela.

2. **Google Gemini 3.8 Flash & Antigravity IDE (IA para Engenharia de Software & Pair-Programming):**
   * Agente inteligente de desenvolvimento utilizado como copiloto técnico durante a implementação do código, arquitetura de componentes, revisão de lógica e documentação técnica.

---

### ⏱️ Etapas em que foram Utilizadas

| Etapa do Projeto | Ferramenta de IA | Atividades Realizadas |
|---|---|---|
| **1. Ideação & Prototipação UI/UX** | **Stitch** | Criação ágil dos protótipos de alta fidelidade das 10 telas; teste de layouts responsivos, cartões de apelo urgente, matriz 8×8 de compatibilidade e painel do hemocentro antes da escrita do código. |
| **2. Engenharia de Requisitos & ODS** | **Gemini (Antigravity)** | Alinhamento do produto com as metas 3.8 e 3.d da ODS 3 (Saúde e Bem-Estar); estruturação formal dos 10 Requisitos Funcionais, 10 Não Funcionais e User Stories com critérios de aceitação. |
| **3. Desenvolvimento Front-end (React + Vite)** | **Gemini (Antigravity)** | Conversão dos protótipos do Stitch em componentes modulares em **React 18** empacotados com **Vite**; implementação da lógica biológica de compatibilidade sanguínea (`bloodCalculator.js`), sistema de persistência com `localStorage` (`storage.js`) e roteamento SPA. |
| **4. Estilização & Design System** | **Stitch + Gemini** | Extração do guia de estilos do Stitch para variáveis CSS globais (`index.css`), garantindo micro-animações, design humanizado com paleta médica e acessibilidade WCAG 2.1 AA. |
| **5. Controle de Versão & Git** | **Gemini (Antigravity)** | Resolução de divergências entre branch local e remoto, organização de commits semânticos por tela e validação do build de produção (`npm run build`). |
| **6. Documentação & Gestão Ágil** | **Gemini (Antigravity)** | Elaboração do README.md completo nas 12 seções obrigatórias e estruturação dos 50 cards de atividades no fluxo Kanban. |

---

### 🚀 Como Contribuíram para o Desenvolvimento

* **Redução Drástica do Time-to-Market:** A prototipação ágil com o **Stitch** permitiu validar rapidamente a usabilidade das telas e a disposição dos componentes antes da implementação, eliminando retrabalho no desenvolvimento.
* **Aceleração da Codificação em React e Vite:** A transição do protótipo Stitch para código React funcional foi acelerada pela assistência de IA, que auxiliou na criação de componentes reutilizáveis e tipados, hooks customizados e gerenciamento de estado limpo no Vite sem sobrecarga de bibliotecas externas.
* **Precisão nas Regras de Negócio Médicas:** A IA auxiliou na modelagem fidedigna dos intervalos legais de doação de sangue do Ministério da Saúde (60 dias / 4x ao ano para homens; 90 dias / 3x ao ano para mulheres) e da matriz cruzada de compatibilidade para os 8 tipos sanguíneos.
* **Qualidade de Código e Resolução de Problemas:** Auxílio em refatorações, estruturação de estilos CSS coesos e resolução ágil de conflitos de versionamento no Git, garantindo que o bundle final compilasse sem qualquer erro.

---

### ⚖️ Declaração de Responsabilidade e Ética

Toda a concepção criativa, curadoria dos dados dos hemocentros, definição das diretrizes de negócio, validação dos fluxos de triagem e revisão minuciosa de cada linha de código gerada foram **estritamente conduzidas, avaliadas e assumidas pelos integrantes humanos da equipe**. As ferramentas de inteligência artificial atuaram como instrumentos de ampliação da produtividade técnica e criativa, mantendo a autoria e responsabilidade final integralmente sob controle da equipe.

---

## 👥 Integrantes da Equipe

1. **Integrante 1:** Gustavo Tucci
2. **Integrante 2:** Matheus Boff
3. **Integrante 3:** Vinicius Pereira
4. **Integrante 4:** Ryan Amorim

---
*Projeto desenvolvido para o Hackathon de Front-end — SENAI.*
