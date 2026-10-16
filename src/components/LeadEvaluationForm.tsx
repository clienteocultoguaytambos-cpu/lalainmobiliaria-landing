"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Flame,
  CloudSun,
  Snowflake,
  Send,
  MessageCircle,
  Building,
  TreePine,
  DollarSign,
  Clock,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { calculateLeadScore, ScoreResult } from "@/lib/scoring";

export default function LeadEvaluationForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<ScoreResult | null>(null);

  // Form fields
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "",
    purpose: "comprar_casa" as const,
    location: "ecuador_canar" as const,
    budget: "80k_160k" as const,
    payment: "contado_remesas" as const,
    urgency: "menos_30_dias" as const,
  });

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 4));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const scoreData = calculateLeadScore(formData);
    setResult(scoreData);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          score: scoreData.score,
          temperature: scoreData.temperature,
        }),
      });

      if (!res.ok) {
        console.warn("API response status:", res.status);
      }
    } catch (err) {
      console.error("Error submitting lead:", err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const getWhatsAppMessage = () => {
    const purposeText =
      formData.purpose === "comprar_casa"
        ? "comprar casa"
        : formData.purpose === "comprar_terreno"
        ? "comprar terreno"
        : formData.purpose === "vender_propiedad"
        ? "vender una propiedad"
        : "inversión";

    return `Hola José Elías, completé mi evaluación en LALAINMOBILIARIA.
Mi nombre es *${formData.fullName}* (${formData.city}).
Objetivo: *${purposeText}*
Presupuesto: *${formData.budget.replace("_", " a ")}*
Forma de pago: *${formData.payment.replace("_", " ")}*
Urgencia: *${formData.urgency.replace("_", " ")}*
Deseo agendar asesoría personalizada.`;
  };

  return (
    <section id="evaluacion" className="interactive-section py-20 bg-brand-dark relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-brand-gold/40 text-xs font-bold text-brand-gold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Calificador Inteligente de Inmueble y Crédito</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            Descubre las Opciones Ideales para tu Presupuesto
          </h2>
          <p className="text-sm text-emerald-200/80 mt-2">
            Responde 4 preguntas breves. Nuestro sistema evaluará tu perfil y te presentará las mejores propiedades en Cañar.
          </p>
        </div>

        {/* Card Box */}
        <div className="glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 border border-brand-gold/30 shadow-2xl">
          
          {/* Success Result View */}
          {isSubmitted && result ? (
            <div className="text-center py-6 space-y-6">
              
              {/* Badge based on temperature */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-bold shadow-lg"
                style={{
                  backgroundColor:
                    result.temperature === "hot"
                      ? "rgba(239, 68, 68, 0.15)"
                      : result.temperature === "warm"
                      ? "rgba(234, 179, 8, 0.15)"
                      : "rgba(59, 130, 246, 0.15)",
                  borderColor:
                    result.temperature === "hot"
                      ? "#ef4444"
                      : result.temperature === "warm"
                      ? "#eab308"
                      : "#3b82f6",
                  color:
                    result.temperature === "hot"
                      ? "#fca5a5"
                      : result.temperature === "warm"
                      ? "#fde047"
                      : "#93c5fd",
                }}
              >
                {result.temperature === "hot" ? (
                  <Flame className="w-4 h-4 text-red-400" />
                ) : result.temperature === "warm" ? (
                  <CloudSun className="w-4 h-4 text-yellow-400" />
                ) : (
                  <Snowflake className="w-4 h-4 text-blue-400" />
                )}
                <span>Perfil Calificado: {result.badge} ({result.score}/100 pts)</span>
              </div>

              <h3 className="text-2xl font-bold text-white">
                ¡Gracias por tu interés, {formData.fullName}!
              </h3>

              <p className="text-sm text-emerald-200/90 max-w-lg mx-auto">
                Tu perfil ha sido registrado con éxito. {result.priorityText}. Nuestro asesor José Elías Lala tiene seleccionadas propiedades que coinciden con tu criterio.
              </p>

              {/* Direct WhatsApp Action */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`https://wa.me/593998718159?text=${encodeURIComponent(getWhatsAppMessage())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold px-7 py-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider font-bold shadow-xl flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Hablar Ahora Mismo con José Elías</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setStep(1);
                  }}
                  className="text-xs text-emerald-300 hover:text-white underline py-2"
                >
                  Hacer otra consulta
                </button>
              </div>

              <div className="pt-6 border-t border-emerald-800/40 text-xs text-emerald-400/80 flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Tus datos se manejan con estricta confidencialidad y sin spam.</span>
              </div>
            </div>
          ) : (
            /* Multi-step Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Progress Steps Header */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-emerald-800/40 text-xs text-emerald-300">
                <span>Paso {step} de 4</span>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4].map((s) => (
                    <div
                      key={s}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        s === step
                          ? "w-8 bg-brand-gold"
                          : s < step
                          ? "w-4 bg-emerald-500"
                          : "w-4 bg-emerald-900"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* STEP 1: Objetivo */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white mb-2">
                    1. ¿Cuál es tu objetivo inmobiliario principal?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        value: "comprar_casa",
                        label: "Comprar Casa / Villa",
                        desc: "Para vivir con mi familia o para mi retiro.",
                        icon: Building,
                      },
                      {
                        value: "comprar_terreno",
                        label: "Comprar Terreno / Quinta",
                        desc: "Lote urbano o campestre para construir.",
                        icon: TreePine,
                      },
                      {
                        value: "vender_propiedad",
                        label: "Vender mi Propiedad",
                        desc: "Deseo vender una casa o lote en Cañar.",
                        icon: DollarSign,
                      },
                      {
                        value: "inversion",
                        label: "Inversión Rentera",
                        desc: "Propiedad para generar alquiler o plusvalía.",
                        icon: Sparkles,
                      },
                    ].map((item) => (
                      <button
                        type="button"
                        key={item.value}
                        onClick={() =>
                          setFormData({ ...formData, purpose: item.value as any })
                        }
                        className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${
                          formData.purpose === item.value
                            ? "bg-brand-gold/15 border-brand-gold text-white shadow-md"
                            : "bg-emerald-950/40 border-emerald-800/60 text-emerald-200 hover:border-emerald-700"
                        }`}
                      >
                        <item.icon className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-bold">{item.label}</div>
                          <div className="text-xs text-emerald-300/70">{item.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: Ubicación actual */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white mb-2">
                    2. ¿Dónde te encuentras actualmente?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        value: "ecuador_canar",
                        label: "En Cañar o Azuay",
                        desc: "Azogues, Biblián, Cuenca o cantones vecinos.",
                      },
                      {
                        value: "exterior_usa",
                        label: "En Estados Unidos (EE.UU.)",
                        desc: "Nueva York, Nueva Jersey, Connecticut u otro estado.",
                      },
                      {
                        value: "ecuador_otro",
                        label: "Otra provincia de Ecuador",
                        desc: "Guayas, Pichincha, Loja, etc.",
                      },
                      {
                        value: "exterior_otro",
                        label: "Otro país en el exterior",
                        desc: "España, Italia, Canadá, etc.",
                      },
                    ].map((item) => (
                      <button
                        type="button"
                        key={item.value}
                        onClick={() =>
                          setFormData({ ...formData, location: item.value as any })
                        }
                        className={`p-4 rounded-xl border text-left transition-all ${
                          formData.location === item.value
                            ? "bg-brand-gold/15 border-brand-gold text-white shadow-md"
                            : "bg-emerald-950/40 border-emerald-800/60 text-emerald-200 hover:border-emerald-700"
                        }`}
                      >
                        <div className="text-sm font-bold">{item.label}</div>
                        <div className="text-xs text-emerald-300/70 mt-1">{item.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: Presupuesto y Pago */}
              {step === 3 && (
                <div className="space-y-5">
                  <h3 className="text-lg font-bold text-white">
                    3. Presupuesto estimado y forma de pago
                  </h3>

                  <div>
                    <label className="text-xs font-semibold text-emerald-300 block mb-2">
                      Rango de Presupuesto:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { value: "menos_35k", label: "< $35,000 USD" },
                        { value: "35k_80k", label: "$35k - $80k USD" },
                        { value: "80k_160k", label: "$80k - $160k USD" },
                        { value: "mas_160k", label: "> $160,000 USD" },
                      ].map((b) => (
                        <button
                          type="button"
                          key={b.value}
                          onClick={() => setFormData({ ...formData, budget: b.value as any })}
                          className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all ${
                            formData.budget === b.value
                              ? "bg-brand-gold border-brand-gold text-brand-dark"
                              : "bg-emerald-950/40 border-emerald-800 text-emerald-200 hover:border-emerald-700"
                          }`}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-emerald-300 block mb-2">
                      Forma de Pago Prevista:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        {
                          value: "contado_remesas",
                          label: "Contado / Remesas Disponibles",
                          desc: "Fondos listos para compra inmediata.",
                        },
                        {
                          value: "credito_aprobado",
                          label: "Crédito Hipotecario Aprobado",
                          desc: "Con BIESS o entidad bancaria listo.",
                        },
                        {
                          value: "desea_evaluar_credito",
                          label: "Deseo Evaluar si Califico a Crédito",
                          desc: "Necesito asesoría para tramitarlo.",
                        },
                        {
                          value: "por_definir",
                          label: "Aún Evaluando Opciones",
                          desc: "En etapa de planificación inicial.",
                        },
                      ].map((p) => (
                        <button
                          type="button"
                          key={p.value}
                          onClick={() => setFormData({ ...formData, payment: p.value as any })}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            formData.payment === p.value
                              ? "bg-brand-gold/15 border-brand-gold text-white"
                              : "bg-emerald-950/40 border-emerald-800 text-emerald-200"
                          }`}
                        >
                          <div className="text-xs font-bold">{p.label}</div>
                          <div className="text-[11px] text-emerald-300/70">{p.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Urgencia y Datos de Contacto */}
              {step === 4 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white mb-2">
                    4. ¿En qué plazo te gustaría concretar y a dónde te contactamos?
                  </h3>

                  <div>
                    <label className="text-xs font-semibold text-emerald-300 block mb-2">
                      Urgencia de compra / decisión:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        { value: "menos_30_dias", label: "Menos de 30 días" },
                        { value: "1_a_3_meses", label: "1 a 3 meses" },
                        { value: "mas_3_meses", label: "Solo explorando" },
                      ].map((u) => (
                        <button
                          type="button"
                          key={u.value}
                          onClick={() => setFormData({ ...formData, urgency: u.value as any })}
                          className={`py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all ${
                            formData.urgency === u.value
                              ? "bg-brand-gold border-brand-gold text-brand-dark font-bold"
                              : "bg-emerald-950/40 border-emerald-800 text-emerald-200"
                          }`}
                        >
                          {u.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label htmlFor="lead-fullname" className="text-xs font-semibold text-emerald-200 block mb-1">
                        Nombre Completo *
                      </label>
                      <input
                        id="lead-fullname"
                        name="fullName"
                        autoComplete="name"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Ej. Luis Guamán"
                        className="w-full px-4 py-3 rounded-xl bg-emerald-950/70 border border-emerald-700/60 text-white text-sm focus:border-brand-gold focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:outline-none transition-shadow"
                      />
                    </div>

                    <div>
                      <label htmlFor="lead-phone" className="text-xs font-semibold text-emerald-200 block mb-1">
                        Teléfono / WhatsApp con Código *
                      </label>
                      <input
                        id="lead-phone"
                        name="phone"
                        autoComplete="tel"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Ej. +593 99... o +1 347..."
                        className="w-full px-4 py-3 rounded-xl bg-emerald-950/70 border border-emerald-700/60 text-white text-sm focus:border-brand-gold focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:outline-none transition-shadow"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="lead-city" className="text-xs font-semibold text-emerald-200 block mb-1">
                      Ciudad o Estado de Residencia *
                    </label>
                    <input
                      id="lead-city"
                      name="city"
                      autoComplete="address-level2"
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Ej. Azogues o Queens, NY"
                      className="w-full px-4 py-3 rounded-xl bg-emerald-950/70 border border-emerald-700/60 text-white text-sm focus:border-brand-gold focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:outline-none transition-shadow"
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="pt-6 border-t border-emerald-800/40 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-4 py-2.5 rounded-lg border border-emerald-700 text-xs font-semibold text-emerald-200 hover:text-white flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Anterior</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="btn-gold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider font-bold flex items-center gap-1.5"
                  >
                    <span>Siguiente</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.fullName || !formData.phone}
                    className="btn-gold px-8 py-3 rounded-xl text-xs sm:text-sm uppercase tracking-wider font-extrabold flex items-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? "Calculando Perfil..." : "Ver Mi Calificación y Opciones"}</span>
                  </button>
                )}
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
