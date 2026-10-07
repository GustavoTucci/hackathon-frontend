# 💾 Especificação 04: Modelos de Dados & Persistência Local

Todos os dados da aplicação funcionam com **dados iniciais de demonstração (seeds)** ricos e realistas, que são salvos e sincronizados no `localStorage` do navegador para manter o estado persistente entre recarregamentos de página.

---

## 1. Chaves de Armazenamento (`localStorage`)
* `hemovida_stocks`: Array com os níveis dos 8 tipos sanguíneos.
* `hemovida_donor`: Objeto contendo o perfil do doador logado/atual.
* `hemovida_appointments`: Array com os agendamentos realizados.
* `hemovida_appeals`: Array com pedidos urgentes de doação.
* `hemovida_hemocentros`: Lista de postos de coleta.
* `hemovida_badges`: Lista de conquistas desbloqueadas.

---

## 2. Estrutura dos Modelos de Dados

### Modelo 1: Estoque de Sangue (`BloodStock`)
```javascript
{
  type: "O-",                 // Tipo sanguíneo (A+, A-, B+, B-, AB+, AB-, O+, O-)
  percentage: 18,             // 0 a 100%
  status: "critical",         // "critical" (<30%), "warning" (30-59%), "safe" (>=60%)
  bagsAvailable: 14,          // Quantidade aproximada de bolsas
  daysOfReserve: 2,           // Dias de autonomia estimada
  lastUpdated: "2026-10-07"
}
```

### Modelo 2: Posto de Coleta / Hemocentro (`Hemocenter`)
```javascript
{
  id: "hemo-01",
  name: "Fundação Pró-Sangue — Posto Clínicas",
  city: "São Paulo - SP",
  address: "Av. Dr. Enéas Carvalho de Aguiar, 155 - Cerqueira César",
  hours: "Segunda a Sexta: 07h às 18h | Sábado: 08h às 16h",
  phone: "(11) 4573-7800",
  waitTime: "Aprox. 20 min",
  distance: "2.4 km",
  badge: "Central de Referência"
}
```

### Modelo 3: Perfil do Doador (`DonorProfile`)
```javascript
{
  id: "donor-001",
  name: "Gustavo Tucci",
  email: "gustavo.tucci@email.com",
  gender: "M",               // "M" (intervalo 60 dias) ou "F" (intervalo 90 dias)
  bloodType: "O-",           // Doador Universal
  rhFactor: "Negativo",
  donorNumber: "HV-88492-SP",
  totalDonations: 4,
  livesSaved: 16,            // Total x 4
  lastDonationDate: "2026-08-15",
  nextEligibleDate: "2026-10-14",
  level: "Guardião da Vida"
}
```

### Modelo 4: Agendamento de Doação (`Appointment`)
```javascript
{
  id: "APPT-2026-0941",
  hemocenterId: "hemo-01",
  hemocenterName: "Fundação Pró-Sangue — Posto Clínicas",
  date: "2026-10-15",
  time: "09:30",
  donorName: "Gustavo Tucci",
  bloodType: "O-",
  status: "Confirmado",      // "Confirmado", "Realizado", "Cancelado"
  createdAt: "2026-10-07T19:40:00"
}
```

### Modelo 5: Pedido Urgente de Sangue (`UrgentAppeal`)
```javascript
{
  id: "app-01",
  patientName: "Lucas Mendes da Silva",
  age: 28,
  condition: "Acidente de trânsito — Cirurgia ortopédica de urgência",
  hospital: "Hospital das Clínicas da FMUSP",
  bloodTypeNeeded: "O-",
  bagsTarget: 8,
  bagsCollected: 3,
  urgencyLevel: "Máxima",    // "Máxima", "Alta", "Moderada"
  createdAt: "2026-10-06"
}
```

### Modelo 6: Conquistas / Gamificação (`Badge`)
```javascript
{
  id: "badge-first",
  title: "Primeira Gota",
  description: "Realizou o primeiro agendamento ou doação no HemoVida.",
  icon: "Droplets",
  unlocked: true,
  unlockedAt: "2026-10-07"
}
```

---

## 3. Utilitários de Lógica de Negócio (`bloodCalculator.js`)

### Regra de Intervalos do Ministério da Saúde:
* **Homens:** Podem doar até 4 vezes ao ano, com intervalo mínimo de **60 dias**.
* **Mulheres:** Podem doar até 3 vezes ao ano, com intervalo mínimo de **90 dias**.

### Regra de Compatibilidade Sanguínea:
```javascript
export const BLOOD_COMPATIBILITY = {
  "O-":  { donateTo: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], receiveFrom: ["O-"] },
  "O+":  { donateTo: ["A+", "B+", "AB+", "O+"], receiveFrom: ["O+", "O-"] },
  "A-":  { donateTo: ["A+", "A-", "AB+", "AB-"], receiveFrom: ["A-", "O-"] },
  "A+":  { donateTo: ["A+", "AB+"], receiveFrom: ["A+", "A-", "O+", "O-"] },
  "B-":  { donateTo: ["B+", "B-", "AB+", "AB-"], receiveFrom: ["B-", "O-"] },
  "B+":  { donateTo: ["B+", "AB+"], receiveFrom: ["B+", "B-", "O+", "O-"] },
  "AB-": { donateTo: ["AB+", "AB-"], receiveFrom: ["AB-", "A-", "B-", "O-"] },
  "AB+": { donateTo: ["AB+"], receiveFrom: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] }
};
```
