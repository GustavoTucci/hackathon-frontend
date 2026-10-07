# 📐 Especificação 01: Arquitetura & Stack Tecnológica

## 1. Visão Geral da Arquitetura
A aplicação **HemoVida** é uma Single Page Application (SPA) desenvolvida em **React 18** com **Vite**, focada em altíssima performance, responsividade e usabilidade. Não possui dependência obrigatória de backend remoto, utilizando a **Web Storage API (`localStorage`)** para persistência de dados do usuário (perfil, agendamentos, doações simuladas e estados de estoque).

## 2. Tecnologias & Bibliotecas
* **Framework:** React 18 (Hooks: `useState`, `useEffect`, `useMemo`, `useCallback`)
* **Build Tool:** Vite (compilação rápida via ES modules, bundle ultra-otimizado)
* **Linguagem:** JavaScript Moderno (ESNext / JSX)
* **Ícones:** `lucide-react` (ícones SVG leves, modernos e acessíveis)
* **Estilização:** CSS Moderno nativo (Design System com Variáveis CSS, Flexbox, CSS Grid, Glassmorphism e Animações fluidas)
* **Persistência:** `localStorage` do navegador com sincronização reativa

## 3. Estrutura de Diretórios Recomendada
```text
hackathon-frontend/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── Hackathon.md
├── specs/
│   ├── 01-architecture-and-stack.md
│   ├── 02-screens-and-navigation.md
│   ├── 03-design-system-and-tokens.md
│   ├── 04-data-models-and-storage.md
│   └── 05-commit-and-kanban-roadmap.md
└── src/
    ├── main.jsx                 # Ponto de entrada do React
    ├── App.jsx                  # Roteador SPA e layout mestre
    ├── index.css                # Variáveis CSS globais, reset e utilitários
    ├── data/                    # Dados iniciais ricos (mock seeds)
    │   ├── initialStock.js      # Estoques dos 8 tipos sanguíneos
    │   ├── hemocentros.js       # Lista de postos de coleta com detalhes
    │   ├── urgentAppeals.js     # Pedidos emergenciais de pacientes
    │   ├── quizQuestions.js     # Perguntas e regras de triagem médica
    │   └── badges.js            # Conquistas e medalhas de gamificação
    ├── utils/                   # Funções de cálculo e storage
    │   ├── storage.js           # Getters/Setters com fallback do localStorage
    │   ├── bloodCalculator.js   # Regras de compatibilidade e cálculo de próxima doação
    │   └── toast.js             # Gerenciamento de alertas de feedback
    ├── components/              # Componentes reutilizáveis
    │   ├── Header.jsx           # Barra superior com logo, atalhos e badge SOS
    │   ├── Footer.jsx           # Rodapé institucional e créditos ODS 3
    │   ├── BloodMeter.jsx       # Barra animada de nível de estoque por tipo sanguíneo
    │   ├── Modal.jsx            # Modal reutilizável com foco e acessibilidade
    │   ├── Toast.jsx            # Notificação flutuante de sucesso/aviso
    │   └── BadgeCard.jsx        # Card de conquista gamificada
    └── pages/                   # As 10 telas funcionais da aplicação
        ├── Home.jsx             # Tela 1: Manifesto de impacto e ODS 3
        ├── BloodStock.jsx       # Tela 2: Painel de estoques em tempo real
        ├── QuizEligibility.jsx  # Tela 3: Quiz de triagem "Posso Doar?"
        ├── HemocentrosList.jsx  # Tela 4: Localizador de bancos de sangue
        ├── ScheduleDonation.jsx # Tela 5: Agendamento com comprovante
        ├── DigitalCard.jsx      # Tela 6: Carteirinha digital e vidas salvas
        ├── Gamification.jsx     # Tela 7: Medalhas e mural de conquistas
        ├── UrgentAppeals.jsx    # Tela 8: Feed de pedidos urgentes de pacientes
        ├── CompatibilityGuide.jsx # Tela 9: Tabela quem doa pra quem e guia pré/pós
        └── AdminHemocenter.jsx  # Tela 10: Painel de simulação do hemocentro
```

## 4. Diretrizes de Código & Clean Architecture
1. **Sem Bibliotecas Pesadas Desnecessárias:** Manter o bundle leve para carregamento imediato (< 1,5s).
2. **Componentização Estrita:** Cada tela e componente deve ser autocontido, importando estilos ou classes utilitárias bem definidas.
3. **Persistência Imediata:** Ao agendar uma doação, registrar uma nova doação ou atualizar o estoque no Admin, o estado deve persistir no `localStorage` e atualizar todas as telas correspondentes em tempo real.
4. **Semântica HTML5:** Utilizar `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>` e `<footer>` para pontuação máxima em acessibilidade e SEO.
