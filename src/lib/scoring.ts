export interface LeadData {
  fullName: string;
  phone: string;
  email?: string;
  city: string;
  purpose: "comprar_casa" | "comprar_terreno" | "vender_propiedad" | "inversion";
  location: "ecuador_canar" | "ecuador_otro" | "exterior_usa" | "exterior_otro";
  budget: "menos_35k" | "35k_80k" | "80k_160k" | "mas_160k";
  payment: "contado_remesas" | "credito_aprobado" | "desea_evaluar_credito" | "por_definir";
  urgency: "menos_30_dias" | "1_a_3_meses" | "mas_3_meses";
  notes?: string;
}

export interface ScoreResult {
  score: number;
  temperature: "hot" | "warm" | "cold";
  badge: string;
  priorityText: string;
}

export function calculateLeadScore(lead: Partial<LeadData>): ScoreResult {
  let score = 0;

  // 1. Capacidad Financiera (Max: 35 pts)
  switch (lead.payment) {
    case "contado_remesas":
      score += 35;
      break;
    case "credito_aprobado":
      score += 30;
      break;
    case "desea_evaluar_credito":
      score += 20;
      break;
    default:
      score += 5;
  }

  // 2. Urgencia de Compra (Max: 35 pts)
  switch (lead.urgency) {
    case "menos_30_dias":
      score += 35;
      break;
    case "1_a_3_meses":
      score += 20;
      break;
    default:
      score += 5;
  }

  // 3. Ubicación y Poder Adquisitivo (Max: 20 pts)
  switch (lead.location) {
    case "exterior_usa":
      score += 20;
      break;
    case "ecuador_canar":
      score += 15;
      break;
    case "exterior_otro":
      score += 12;
      break;
    default:
      score += 10;
  }

  // 4. Claridad en Tipo de Inmueble (Max: 10 pts)
  if (lead.purpose && lead.purpose !== "inversion") {
    score += 10;
  } else {
    score += 5;
  }

  // Asegurar rango 0 - 100
  score = Math.min(100, Math.max(0, score));

  // Clasificación de temperatura
  let temperature: "hot" | "warm" | "cold";
  let badge: string;
  let priorityText: string;

  if (score >= 80) {
    temperature = "hot";
    badge = "🔥 CALIENTE";
    priorityText = "Prioridad Máxima: Contactar en los primeros 15 minutos";
  } else if (score >= 50) {
    temperature = "warm";
    badge = "⛅ TIBIO";
    priorityText = "Prioridad Media: Contactar en menos de 24 horas";
  } else {
    temperature = "cold";
    badge = "❄️ FRÍO";
    priorityText = "Informativo: Seguimiento secundario o nutrición";
  }

  return {
    score,
    temperature,
    badge,
    priorityText,
  };
}
