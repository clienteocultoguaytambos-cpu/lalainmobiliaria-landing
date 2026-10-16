"use client";

import React from "react";
import { 
  FileCheck2, 
  Landmark, 
  Globe2, 
  BadgeDollarSign, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

export default function ClosingGuarantees() {
  const guarantees = [
    {
      icon: FileCheck2,
      badge: "Certeza Notarial",
      title: "Documentación y Escrituras al Día",
      description:
        "Títulos legalizados, certificados de gravámenes actualizados en el Registro de la Propiedad y líneas de fábrica verificadas antes de cualquier transacción.",
      bullets: [
        "Revisión de historial de dominio",
        "Libre de litigios o hipotecas",
        "Minutas notariales supervisadas",
      ],
    },
    {
      icon: Landmark,
      badge: "Financiamiento",
      title: "Asesoría en Crédito BIESS y Bancos",
      description:
        "Guiamos tu proceso de financiamiento desde la precalificación de tu capacidad de endeudamiento hasta el desembolso final de tu crédito hipotecario.",
      bullets: [
        "Acompañamiento con BIESS y Banca",
        "Optimización de carpeta crediticia",
        "Gestión con Cooperativas locales",
      ],
    },
    {
      icon: Globe2,
      badge: "Comunidad USA",
      title: "Trámites Consulares para Migrantes",
      description:
        "Solución integral para compatriotas en Estados Unidos. Compra tu propiedad en Cañar con poderes consulares sin necesidad de viajar inmediatamente.",
      bullets: [
        "Coordinación de poder consular",
        "Transmisiones en vivo de la propiedad",
        "Seguimiento legal para tu familia",
      ],
    },
    {
      icon: BadgeDollarSign,
      badge: "Sin Letra Chica",
      title: "Precios Transparentes sin Sorpresas",
      description:
        "Avalúos realistas basados en el mercado actual de Azogues, Biblián y Cañar. Negociación directa con propietarios, sin márgenes ocultos.",
      bullets: [
        "Valoraciones justas por m²",
        "Desglose claro de gastos notariales",
        "Cero sobreprecios especulativos",
      ],
    },
  ];

  return (
    <section 
      id="garantias" 
      className="interactive-section py-20 bg-brand-dark/90 relative overflow-hidden border-t border-emerald-900/60"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/60 border border-brand-gold/30 text-xs font-bold text-brand-gold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
            <span>Compromiso y Seguridad Total</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            Nuestros 4 Pilares de{" "}
            <span className="text-gold-gradient">Garantía Inmobiliaria</span>
          </h2>

          <p className="text-sm sm:text-base text-emerald-100/80 mt-3 font-normal leading-relaxed">
            Trasladamos la tranquilidad a cada etapa de tu inversión. Esto es lo que respalda cada casa, departamento o terreno gestionado por LALAINMOBILIARIA:
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-card glass-card-hover p-6 rounded-2xl border border-emerald-800/40 hover:border-brand-gold/50 flex flex-col justify-between group transition-all duration-300 relative overflow-hidden"
              >
                {/* Subtle top indicator bar */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Badge & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-900/70 border border-brand-gold/30 flex items-center justify-center text-brand-gold group-hover:scale-105 group-hover:bg-brand-gold group-hover:text-brand-dark transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-brand-gold uppercase tracking-wider bg-emerald-950/70 px-2.5 py-1 rounded-full border border-brand-gold/20">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-brand-goldLight transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-emerald-200/80 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Bullets List */}
                <div className="pt-3 border-t border-emerald-800/40 space-y-2">
                  {item.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2 text-[11px] text-emerald-300/90">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold flex-shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Banner below guarantees */}
        <div className="mt-12 glass-panel p-6 sm:p-8 rounded-2xl border border-brand-gold/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-white">
              ¿Listo para dar el siguiente paso con respaldo legal completo?
            </h4>
            <p className="text-xs sm:text-sm text-emerald-200/80">
              Evalúa tu perfil de crédito o solicita un análisis preliminar de la propiedad que te interesa en Cañar.
            </p>
          </div>

          <a
            href="#evaluacion"
            className="btn-gold px-6 py-3 rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center gap-2 whitespace-nowrap shadow-lg flex-shrink-0"
          >
            <span>Evaluar Mi Perfil Ahora</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
