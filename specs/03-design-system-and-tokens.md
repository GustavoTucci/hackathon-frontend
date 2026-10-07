# 🎨 Especificação 03: Design System, Tokens & Estilos Visuais

O HemoVida utiliza um Design System em **Vanilla CSS** altamente polido, combinando a sobriedade médica com o dinamismo de um aplicativo de saúde de última geração.

---

## 1. Tokens de Cores (Paleta de Cores)

```css
:root {
  /* Vermelhos Principais (Identidade Hematológica) */
  --primary: #DC2626;         /* Vermelho Sangue Vivo */
  --primary-hover: #B91C1C;   /* Vermelho Escuro Hover */
  --primary-dark: #991B1B;    /* Vermelho Profundo */
  --primary-light: #FEE2E2;   /* Fundo Vermelho Suave */
  --primary-glow: rgba(220, 38, 38, 0.25);

  /* Status de Nível de Estoque */
  --status-critical: #EF4444;       /* Estoque Crítico (< 30%) */
  --status-critical-bg: #FEF2F2;
  --status-warning: #F59E0B;        /* Estoque em Alerta (< 60%) */
  --status-warning-bg: #FFFBEB;
  --status-safe: #10B981;           /* Estoque Estável / Apto (>= 60%) */
  --status-safe-bg: #ECFDF5;

  /* Neutros e Tipografia */
  --bg-main: #F8FAFC;        /* Fundo da Aplicação */
  --bg-surface: #FFFFFF;     /* Fundo de Cards e Modais */
  --bg-surface-elevated: #FFFFFF;
  --border-color: #E2E8F0;
  --border-hover: #CBD5E1;

  --text-primary: #0F172A;   /* Títulos e texto principal (Slate 900) */
  --text-secondary: #475569; /* Subtítulos e descrições (Slate 600) */
  --text-muted: #94A3B8;     /* Textos secundários / placeholders (Slate 400) */
  --text-inverse: #FFFFFF;

  /* Efeitos e Sombras */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-card: 0 10px 25px -5px rgba(220, 38, 38, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.05);

  /* Bordas Arredondadas */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 18px;
  --radius-full: 9999px;

  /* Transições Suaves */
  --transition-fast: 0.15s ease;
  --transition-normal: 0.25s ease-in-out;
}
```

---

## 2. Tipografia
* **Fonte Primária:** `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
* **Hierarquia:**
  * `h1`: 2.25rem (36px) — Peso: 800 (Extra Bold)
  * `h2`: 1.75rem (28px) — Peso: 700 (Bold)
  * `h3`: 1.25rem (20px) — Peso: 600 (Semi Bold)
  * `body`: 1rem (16px) — Peso: 400 (Regular)
  * `caption`: 0.875rem (14px) — Peso: 500 (Medium)

---

## 3. Componentes Centrais de UI

### Botões
* `.btn-primary`: Fundo vermelho com sombra suave e leve transição de escala (`transform: translateY(-2px)`).
* `.btn-secondary`: Borda sutil com fundo transparente ou branco elevado.
* `.btn-accent`: Fundo esmeralda para confirmações de agendamento ou aptidão.
* `.btn-danger`: Vermelho intenso para alertas ou cancelamentos.

### Cards com Efeito de Vidro & Borda Suave
* `.card`: Fundo branco elevado, raio de 16px, borda sutil de 1px e padding confortável de 24px.
* Efeito hover com leve elevação de sombra para incentivar a interação.

### Medidor de Estoque (`BloodMeter`)
* Representação em bolsa de sangue ou tubo graduado com animação de enchimento líquido em CSS:
  ```css
  @keyframes pulseAlert {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.85; transform: scale(1.03); }
  }
  ```

### Carteirinha Virtual
* Cartão com gradiente estilizado (`linear-gradient(135deg, #991B1B 0%, #DC2626 50%, #7F1D1D 100%)`), cantos arredondados de 16px, proporção padrão de cartão bancário e detalhes em prateado/dourado.

---

## 4. Diretrizes de Responsividade (Breakpoints)
* **Mobile (< 768px):** Menu inferior ou hambúrguer colapsável, grids em 1 coluna, botões com área de toque mínima de 44px x 44px.
* **Tablet (768px a 1024px):** Grids em 2 colunas, navegação compacta no topo.
* **Desktop (> 1024px):** Layout amplo com container centralizado de no máximo 1200px, grids de 3 ou 4 colunas para tipos sanguíneos e cards de hemocentros.
