# 🚀 Especificação 05: Roadmap de Commits & Execução dos 50 Cards

Para atender com nota máxima à rubrica de avaliação do Hackathon, o desenvolvimento deve seguir um roteiro estrito de **pelo menos 30 commits significativos** e a execução dos **50 cards de Kanban**.

---

## 📌 Guia de Execução dos Commits Semânticos (Padrão: `0.0.X - tipo: mensagem`)

Todos os commits devem seguir rigorosamente o padrão versionado semântico:
**`0.0.X - tipo: descrição`**

1. `0.0.1 - docs: add README.md`
2. `0.0.2 - docs: adiciona especificacoes tecnicas do projeto HemoVida na pasta specs`
3. `0.0.3 - chore: inicializa projeto React com Vite e configuracao de dependencias`
4. `0.0.4 - style: implementa tokens globais de cores, tipografia e reset no index.css`
5. `0.0.5 - feat: adiciona modelos de dados iniciais de estoques e hemocentros em src/data`
6. `0.0.6 - feat: cria utilitarios de persistencia local e calculo de compatibilidade sanguinea`
7. `0.0.7 - feat: implementa componente de Layout Base com Header e Footer responsivo`
8. `0.0.8 - feat: cria componente BloodMeter com barra animada de nivel de estoque`
9. `0.0.9 - feat: implementa componente de notificacao Toast para feedbacks do usuario`
10. `0.0.10 - feat: cria componente Modal reutilizavel e acessivel`
11. `0.0.11 - feat: implementa Tela 1 - Home com manifesto da ODS 3 e metricas de impacto`
12. `0.0.12 - feat: implementa Tela 2 - Painel Geral de Estoques dos 8 tipos sanguineos`
13. `0.0.13 - feat: adiciona badges de status critico, alerta e adequado no painel de estoques`
14. `0.0.14 - feat: implementa Tela 3 - Quiz de Triagem 'Posso Doar?' com logica passo a passo`
15. `0.0.15 - feat: adiciona feedbacks medicos instantaneos de aptidao ao finalizar quiz`
16. `0.0.16 - feat: implementa Tela 4 - Localizador e lista de Hemocentros com filtros`
17. `0.0.17 - feat: implementa Tela 5 - Formulario de agendamento de doacao com seletor de turno`
18. `0.0.18 - feat: adiciona geracao de comprovante digital de agendamento com persistencia`
19. `0.0.19 - feat: implementa Tela 6 - Carteirinha Digital do Doador com QR Code decorativo`
20. `0.0.20 - feat: implementa calculo automatico de contagem regressiva para proxima doacao`
21. `0.0.21 - feat: implementa Tela 7 - Modulo de Gamificacao com selos e medalhas solidarias`
22. `0.0.22 - feat: implementa Tela 8 - Feed de Pedidos Urgentes de pacientes hospitalizados`
23. `0.0.23 - feat: adiciona funcionalidade de compartilhamento e apoio a pedidos de sangue`
24. `0.0.24 - feat: implementa Tela 9 - Guia Pre e Pos-Doacao com dicas de alimentacao`
25. `0.0.25 - feat: adiciona matriz interativa de compatibilidade sanguinea 'Quem Doa pra Quem'`
26. `0.0.26 - feat: implementa Tela 10 - Painel do Hemocentro para simulacao de alteracao de estoque`
27. `0.0.27 - feat: adiciona funcionalidade de emissao de alerta emergencial no simulador`
28. `0.0.28 - style: aprimora responsividade para telas mobile de 360px a 480px`
29. `0.0.29 - style: adiciona micro-animacoes de hover e transicoes fluidas de pagina`
30. `0.0.30 - fix: corrige validacao de campos vazios no agendamento e sincronizacao de dados`
31. `0.0.31 - test: valida fluxos completos das 10 telas e integridade de renderizacao`
32. `0.0.32 - docs: atualiza README.md final com instrucoes de execucao e conclusao`

---

## 📋 Mapeamento dos 50 Cards no Kanban

| Fase | Range de Cards | Foco Principal |
|---|---|---|
| **Etapa 1** | CARD-01 a CARD-08 | Planejamento, Definição do Problema, Metas ODS 3 e Benchmarking de 5 soluções |
| **Etapa 2** | CARD-09 a CARD-16 | Engenharia de Requisitos (10 RF, 10 RNF), User Stories e Critérios de Aceitação |
| **Etapa 3** | CARD-17 a CARD-22 | Setup do ambiente React + Vite, index.css, Storage e Layout Base |
| **Etapa 4** | CARD-23 a CARD-36 | Desenvolvimento intensivo das 10 Telas Funcionais e Componentes Reutilizáveis |
| **Etapa 5** | CARD-37 a CARD-43 | Design Refinement, Responsividade Mobile/Tablet, Acessibilidade WCAG e Toasts |
| **Etapa 6** | CARD-44 a CARD-50 | Validação dos 10 fluxos, Teste de Build de Produção, Deploy, 30+ Commits e Fechamento |
