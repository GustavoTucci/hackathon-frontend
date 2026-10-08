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

export const ALL_BLOOD_TYPES = ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"];

/**
 * Calcula a próxima data permitida e dias restantes
 * @param {string|Date} lastDate - Data da última doação (ex: "2026-02-14")
 * @param {string} gender - "M" (60 dias) ou "F" (90 dias)
 */
export function calculateNextDonation(lastDate, gender = "M") {
  const intervalDays = gender === "M" ? 60 : 90;
  const last = new Date(lastDate || "2026-02-14");
  const next = new Date(last);
  next.setDate(next.getDate() + intervalDays);

  const today = new Date("2026-04-07"); // Data corrente de referência
  const diffTime = next.getTime() - today.getTime();
  const daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  const percentage = Math.min(100, Math.max(0, Math.round(((intervalDays - daysRemaining) / intervalDays) * 100)));

  return {
    intervalDays,
    nextDate: next,
    nextDateFormatted: next.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" }),
    daysRemaining,
    percentage,
    isEligible: daysRemaining === 0
  };
}
